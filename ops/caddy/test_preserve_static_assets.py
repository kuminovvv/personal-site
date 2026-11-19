import importlib.util
from pathlib import Path
import tempfile
import unittest


SCRIPT = Path(__file__).with_name("preserve-static-assets.py")
SPEC = importlib.util.spec_from_file_location("preserve_static_assets", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


class PreserveStaticAssetsTests(unittest.TestCase):
    def test_old_hashed_next_assets_remain_available(self):
        with tempfile.TemporaryDirectory() as directory:
            site = Path(directory)
            old = site / "releases" / "v3.0.0"
            new = site / "releases" / "v3.0.1"
            (old / "_next" / "static").mkdir(parents=True)
            (new / "_next" / "static").mkdir(parents=True)
            (old / "_next" / "static" / "old.hash.js").write_bytes(b"old")
            (new / "_next" / "static" / "new.hash.js").write_bytes(b"new")
            (site / "current").symlink_to(new, target_is_directory=True)

            first = MODULE.preserve(site)
            second = MODULE.preserve(site)
            self.assertEqual(first["files_copied"], 1)
            self.assertEqual(second["files_copied"], 0)
            self.assertEqual((new / "_next" / "static" / "old.hash.js").read_bytes(), b"old")
            self.assertEqual((new / "_next" / "static" / "new.hash.js").read_bytes(), b"new")


if __name__ == "__main__":
    unittest.main()
