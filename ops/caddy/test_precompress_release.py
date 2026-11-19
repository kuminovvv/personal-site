import gzip
import importlib.util
import os
from pathlib import Path
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch


SCRIPT = Path(__file__).with_name("precompress-release.py")
SPEC = importlib.util.spec_from_file_location("precompress_release", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


class PrecompressReleaseTests(unittest.TestCase):
    @staticmethod
    def fake_brotli(source, target):
        target.write_bytes(source.read_bytes())

    def test_gzip_is_valid_atomic_and_idempotent(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "page.html"
            source.write_text("x" * 2048, encoding="utf-8")
            with patch.object(MODULE, "write_brotli", side_effect=self.fake_brotli):
                first = MODULE.precompress(root)
                second = MODULE.precompress(root)
            self.assertEqual(first["gzip"], 1)
            self.assertEqual(second["gzip"], 0)
            self.assertEqual(gzip.decompress((root / "page.html.gz").read_bytes()), source.read_bytes())
            self.assertEqual(list(root.glob(".*.gz.*")), [])

    def test_symlink_is_not_compressed(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "source.html"
            source.write_text("x" * 2048, encoding="utf-8")
            link = root / "linked.html"
            try:
                link.symlink_to(source)
            except OSError as error:
                self.skipTest(f"symlink unavailable: {error}")
            with patch.object(MODULE, "write_brotli", side_effect=self.fake_brotli):
                result = MODULE.precompress(root)
            self.assertEqual(result["files"], 1)
            self.assertFalse((root / "linked.html.gz").exists())

    def test_brotli_failure_does_not_replace_existing_sidecar(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "page.css"
            source.write_text("x" * 2048, encoding="utf-8")
            target = root / "page.css.br"
            target.write_bytes(b"old")
            target.touch()
            with patch.object(MODULE.shutil, "which", return_value="brotli"), patch.object(
                MODULE.subprocess, "run", side_effect=RuntimeError("failed")
            ), self.assertRaises(RuntimeError):
                MODULE.write_brotli(source, target)
            self.assertEqual(target.read_bytes(), b"old")
            self.assertFalse(list(root.glob(".page.css.br.*")))

    def test_same_mtime_source_and_corrupt_sidecar_are_rebuilt(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "page.html"
            source.write_bytes(b"x" * 2048)
            with patch.object(MODULE, "write_brotli", side_effect=self.fake_brotli):
                MODULE.precompress(root)
                original_time = source.stat().st_mtime_ns
                source.write_bytes(b"y" * 2048)
                os.utime(source, ns=(original_time, original_time))
                rebuilt = MODULE.precompress(root)
                self.assertEqual(rebuilt["gzip"], 1)
                self.assertEqual(gzip.decompress((root / "page.html.gz").read_bytes()), source.read_bytes())
                (root / "page.html.gz").write_bytes(b"corrupt")
                os.utime(root / "page.html.gz", ns=(original_time, original_time))
                rebuilt = MODULE.precompress(root)
                self.assertEqual(rebuilt["gzip"], 1)
                self.assertEqual(gzip.decompress((root / "page.html.gz").read_bytes()), source.read_bytes())

    def test_site_root_rejects_current_outside_releases(self):
        with tempfile.TemporaryDirectory() as directory:
            site = Path(directory)
            (site / "releases").mkdir()
            outside = site / "outside"
            outside.mkdir()
            try:
                (site / "current").symlink_to(outside, target_is_directory=True)
            except OSError as error:
                self.skipTest(f"symlink unavailable: {error}")
            with patch.object(MODULE, "parse_args", return_value=SimpleNamespace(root=None, site_root=site)), self.assertRaises(ValueError):
                MODULE.main()


if __name__ == "__main__":
    unittest.main()
