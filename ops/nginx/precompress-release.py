"""Create atomic gzip/Brotli sidecars for a checked-out static release."""

from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile

EXTENSIONS = {".html", ".js", ".css", ".json", ".xml", ".svg", ".txt", ".webmanifest"}
MIN_SIZE = 1024
STATE_NAME = ".precompression-state.json"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--root", type=Path, help="Real release directory")
    group.add_argument("--site-root", type=Path, help="Site directory containing releases/ and current")
    return parser.parse_args()


def validate_root(root: Path) -> Path:
    resolved = root.resolve(strict=True)
    if not resolved.is_dir() or root.is_symlink():
        raise ValueError("--root must be a real directory")
    return resolved


def is_current(sidecar: Path, source: Path, verified: dict, source_digest: str) -> bool:
    if sidecar.is_symlink():
        raise ValueError(f"Refusing symlink sidecar: {sidecar}")
    try:
        return (sidecar.is_file() and sidecar.stat().st_size > 0
                and sidecar.stat().st_mtime_ns == source.stat().st_mtime_ns
                and verified.get("source") == source_digest
                and verified.get("sidecar") == hashlib.sha256(sidecar.read_bytes()).hexdigest())
    except FileNotFoundError:
        return False


def atomic_path(target: Path) -> Path:
    descriptor, name = tempfile.mkstemp(prefix=f".{target.name}.", dir=target.parent)
    os.close(descriptor)
    return Path(name)


def write_gzip(source: Path, target: Path) -> None:
    before = source.stat()
    temporary = atomic_path(target)
    try:
        with source.open("rb") as source_file, temporary.open("wb") as output:
            with gzip.GzipFile(fileobj=output, mode="wb", compresslevel=9, mtime=0, filename="") as compressed:
                shutil.copyfileobj(source_file, compressed)
        with gzip.open(temporary, "rb") as compressed:
            if hashlib.file_digest(compressed, "sha256").digest() != hashlib.sha256(source.read_bytes()).digest():
                raise ValueError(f"gzip verification failed: {source}")
        check_unchanged(source, before)
        os.chmod(temporary, 0o644)
        os.utime(temporary, ns=(before.st_atime_ns, before.st_mtime_ns))
        os.replace(temporary, target)
    finally:
        temporary.unlink(missing_ok=True)


def write_brotli(source: Path, target: Path) -> None:
    executable = shutil.which("brotli")
    if executable is None:
        raise RuntimeError("brotli CLI is required to create .br sidecars")
    before = source.stat()
    temporary = atomic_path(target)
    try:
        with temporary.open("wb") as output:
            subprocess.run([executable, "-q", "9", "--stdout", str(source)], stdout=output, check=True, timeout=60)
        decoded = subprocess.run([executable, "--decompress", "--stdout", str(temporary)],
                                 capture_output=True, check=True, timeout=60).stdout
        if hashlib.sha256(decoded).digest() != hashlib.sha256(source.read_bytes()).digest():
            raise ValueError(f"Brotli verification failed: {source}")
        check_unchanged(source, before)
        os.chmod(temporary, 0o644)
        os.utime(temporary, ns=(before.st_atime_ns, before.st_mtime_ns))
        os.replace(temporary, target)
    finally:
        temporary.unlink(missing_ok=True)


def check_unchanged(source: Path, before: os.stat_result) -> None:
    after = source.stat()
    if (before.st_size, before.st_mtime_ns, before.st_ino) != (after.st_size, after.st_mtime_ns, after.st_ino):
        raise ValueError(f"Source changed while compressing: {source}")


def precompress(root: Path) -> dict[str, int]:
    root = validate_root(root)
    state_path = root / STATE_NAME
    if state_path.is_symlink():
        raise ValueError("Refusing symlink verification state")
    try:
        state = json.loads(state_path.read_text())
        if not isinstance(state, dict):
            state = {}
    except (FileNotFoundError, ValueError):
        state = {}
    updated = dict(state)
    counts = {"files": 0, "gzip": 0, "brotli": 0, "bytes": 0}
    for source in root.rglob("*"):
        if source.name == STATE_NAME or source.is_symlink() or not source.is_file() or source.suffix.lower() not in EXTENSIONS:
            continue
        source.resolve(strict=True).relative_to(root)
        size = source.stat().st_size
        if size < MIN_SIZE:
            continue
        source_digest = hashlib.sha256(source.read_bytes()).hexdigest()
        counts["files"] += 1
        for suffix, writer, key in ((".gz", write_gzip, "gzip"), (".br", write_brotli, "brotli")):
            target = source.with_name(source.name + suffix)
            key_name = str(target.relative_to(root))
            verified = state.get(key_name, {})
            if isinstance(verified, dict) and is_current(target, source, verified, source_digest):
                continue
            writer(source, target)
            updated[key_name] = {"source": source_digest, "sidecar": hashlib.sha256(target.read_bytes()).hexdigest()}
            counts[key] += 1
            counts["bytes"] += target.stat().st_size
    if updated != state:
        temporary = atomic_path(state_path)
        try:
            temporary.write_text(json.dumps(updated, sort_keys=True) + "\n")
            os.chmod(temporary, 0o644)
            os.replace(temporary, state_path)
        finally:
            temporary.unlink(missing_ok=True)
    return counts


def main() -> int:
    args = parse_args()
    root = args.root
    if args.site_root:
        site = validate_root(args.site_root)
        releases = validate_root(site / "releases")
        root = (site / "current").resolve(strict=True)
        root.relative_to(releases)
        if root == releases:
            raise ValueError("current must point to one release, not the releases directory")
    print(json.dumps(precompress(root)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
