"""Keep hashed Next.js assets from older releases accessible after deployment.

Nginx serves ROOT/current/_next/static with immutable browser caching. Browsers
may still request an older page's asset URLs during and after a new release.
Copy older assets into the active release without replacing newer files.
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path
import shutil
import tempfile


def preserve(site: Path) -> dict[str, int]:
    site = site.resolve(strict=True)
    releases = (site / "releases").resolve(strict=True)
    current_link = site / "current"
    if not current_link.is_symlink():
        raise ValueError("current must be a symlink to a release")
    current = current_link.resolve(strict=True)
    if current.parent != releases or not current.is_dir():
        raise ValueError("current must point to a release directory")

    target_root = current / "_next" / "static"
    if not target_root.is_dir() or target_root.is_symlink():
        raise ValueError("current release has no safe _next/static directory")

    copied = 0
    bytes_copied = 0
    for release in sorted(releases.iterdir()):
        if release == current or release.is_symlink() or not release.is_dir():
            continue
        source_root = release / "_next" / "static"
        if source_root.is_symlink() or not source_root.is_dir():
            continue
        for source in source_root.rglob("*"):
            if source.is_symlink() or not source.is_file():
                continue
            relative = source.relative_to(source_root)
            target = target_root / relative
            if target.is_symlink():
                raise ValueError(f"Refusing symlink destination: {target}")
            if target.exists():
                continue
            target.parent.mkdir(parents=True, exist_ok=True)
            # Files are published atomically, so Nginx never reads partial assets.
            fd, name = tempfile.mkstemp(prefix=f".{target.name}.", dir=target.parent)
            os.close(fd)
            temporary = Path(name)
            try:
                shutil.copy2(source, temporary)
                os.replace(temporary, target)
            finally:
                temporary.unlink(missing_ok=True)
            copied += 1
            bytes_copied += target.stat().st_size
    return {"files_copied": copied, "bytes_copied": bytes_copied}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site-root", type=Path, required=True)
    args = parser.parse_args()
    print(preserve(args.site_root))


if __name__ == "__main__":
    main()
