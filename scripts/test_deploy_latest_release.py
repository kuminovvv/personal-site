import importlib.util
import io
from pathlib import Path
import tarfile
import tempfile
import unittest


SCRIPT = Path(__file__).with_name("deploy-latest-release.py")
SPEC = importlib.util.spec_from_file_location("deploy_latest_release", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


class UnpackTests(unittest.TestCase):
    def test_accepts_next_export_and_rejects_path_traversal(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            archive = root / "site.tar.gz"
            files = (
                "index.html", "projects/index.html", "contacts/index.html",
                "ru/index.html", "en/index.html", "404.html", "_next/static/test.hash.js",
            )
            with tarfile.open(archive, "w:gz") as package:
                for name in files:
                    content = b"ok"
                    entry = tarfile.TarInfo(name)
                    entry.size = len(content)
                    package.addfile(entry, io.BytesIO(content))
            target = root / "ok"
            target.mkdir()
            MODULE.unpack(archive, target)
            self.assertTrue((target / "_next" / "static" / "test.hash.js").is_file())

            with tarfile.open(archive, "w:gz") as package:
                entry = tarfile.TarInfo("../outside.txt")
                entry.size = 3
                package.addfile(entry, io.BytesIO(b"bad"))
            target = root / "bad"
            target.mkdir()
            with self.assertRaisesRegex(ValueError, "Unsafe archive member"):
                MODULE.unpack(archive, target)
            self.assertFalse((root / "outside.txt").exists())


if __name__ == "__main__":
    unittest.main()
