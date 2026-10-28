"""Check live Nginx compression, content integrity and cache policy using curl.

Run on the server (curl must support Brotli), optionally with --resolve
kuminovvv.com:443:127.0.0.1 to separate delivery from internet latency.
"""

import argparse
import hashlib
import json
import subprocess
from pathlib import Path
from tempfile import TemporaryDirectory


def request(origin, path, encoding, resolve):
    with TemporaryDirectory(prefix="site-delivery-") as temporary:
        headers_path = Path(temporary) / "headers"
        body_path = Path(temporary) / "body"
        command = [
            "curl", "--silent", "--show-error", "--fail", "--compressed",
            "--max-time", "20", "--header", "Accept-Encoding: " + encoding,
            "--dump-header", str(headers_path), "--output", str(body_path),
            "--write-out", "%{json}", origin.rstrip("/") + path,
        ]
        if resolve:
            command.extend(["--noproxy", "*", "--resolve", resolve])
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        metrics = json.loads(result.stdout)
        headers = {}
        for line in headers_path.read_text().splitlines():
            if line.startswith("HTTP/"):
                headers = {}
            elif ":" in line:
                name, value = line.split(":", 1)
                name = name.lower()
                headers[name] = ", ".join(filter(None, [headers.get(name), value.strip()]))
        body = body_path.read_bytes()
        return {
            "accept": encoding,
            "encoding": headers.get("content-encoding", "identity"),
            "type": headers.get("content-type", "").split(";")[0],
            "cache": headers.get("cache-control", ""),
            "vary": headers.get("vary", ""),
            "security": {name: headers.get(name, "") for name in (
                "strict-transport-security", "x-content-type-options", "referrer-policy", "x-frame-options",
            )},
            "status": metrics["http_code"],
            "bytes": int(metrics["size_download"]),
            "decoded_bytes": len(body),
            "sha256": hashlib.sha256(body).hexdigest(),
            "ttfb_seconds": metrics["time_starttransfer"],
            "total_seconds": metrics["time_total"],
        }


def verify(path, results):
    assert len({result["sha256"] for result in results}) == 1, (path, "Decoded content differs")
    for result in results:
        assert result["security"] == {
            "strict-transport-security": "max-age=31536000",
            "x-content-type-options": "nosniff",
            "referrer-policy": "strict-origin-when-cross-origin",
            "x-frame-options": "DENY",
        }, (path, result)
        mime = result["type"]
        compressible = mime.startswith("text/") or mime in {
            "application/javascript", "application/json", "application/xml",
            "application/manifest+json", "image/svg+xml",
        }
        if compressible and result["decoded_bytes"] >= 1024:
            assert result["encoding"] == result["accept"], (path, result)
            assert "accept-encoding" in result["vary"].lower(), (path, result)
        elif mime.startswith(("image/", "font/")):
            assert result["encoding"] == "identity", (path, result)
        if path.startswith("/_next/static/"):
            assert "max-age=31536000" in result["cache"] and "immutable" in result["cache"], (path, result)
        elif mime.startswith(("image/", "font/")) or mime in {"text/css", "text/javascript", "application/javascript"}:
            assert "max-age=3600" in result["cache"], (path, result)
        else:
            assert "no-cache" in result["cache"], (path, result)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="+", help="Public paths, including one large JS and CSS asset")
    parser.add_argument("--origin", default="https://kuminovvv.com")
    parser.add_argument("--resolve")
    parser.add_argument("--mode", choices=("baseline", "gzip", "brotli"), default="brotli")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    encodings = ("identity", "gzip") if args.mode == "gzip" else ("identity", "gzip", "br")
    report = {}
    for path in args.paths:
        results = [request(args.origin, path, encoding, args.resolve) for encoding in encodings]
        if args.mode != "baseline":
            verify(path, results)
        report[path] = results
    formatted = json.dumps(report, indent=2)
    if args.output:
        args.output.write_text(formatted + "\n")
    print(formatted)


if __name__ == "__main__":
    main()
