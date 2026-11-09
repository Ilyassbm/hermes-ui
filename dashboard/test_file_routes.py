#!/usr/bin/env python3
"""The read-only file routes, on this box's real paths: one allowed path, the profile's images, and the refusals.

    HERMES_HOME=/opt/data /opt/hermes/.venv/bin/python -I dashboard/test_file_routes.py

The two paths the lot had to prove are here: `MEDIA:/opt/data/profiles/dex/workspace/eng/delivery/SUBMIT.md` through
`/file`, and an upload in `/opt/data/profiles/dex/images` through `/blob`. The refusals are the ones the routes promise
(followed by the block's quiet card): outside the tree, a secret name, a missing file, over the 1 MiB text cap.

No gateway, no HTTP, no write: the route functions are called directly, the same ones FastAPI serves. `HERMES_HOME` is
forced rather than defaulted, because the shell running this may export the live home.
"""
from __future__ import annotations

import json
import os
import sys
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO))

# `-I` drops the script's own directory from sys.path (the insert above), and the root is pinned: the spec's case is
# HERMES_HOME=/opt/data, where every profile and every workspace of this box lives.
os.environ["HERMES_HOME"] = "/opt/data"

from dashboard.plugin_api import _allowed_roots, _blob_payload, _file_payload, _resolve  # noqa: E402

SUBMIT = Path("/opt/data/profiles/dex/workspace/eng/delivery/SUBMIT.md")
IMAGES = Path("/opt/data/profiles/dex/images")
TEXT_MAX = 1024 * 1024


def body_of(result) -> dict:
    """The JSON body of a refusal, or the payload itself when the route answered."""
    if isinstance(result, dict):
        return result
    return json.loads(bytes(result.body).decode("utf-8"))


def status_of(result) -> int:
    return getattr(result, "status_code", 200)


class FileRoutes(unittest.TestCase):
    def test_allowed_text_file(self) -> None:
        """THE allowed path: a MEDIA: file under the workspace, read as UTF-8 text."""
        self.assertTrue(SUBMIT.is_file(), f"{SUBMIT} is missing")
        payload = body_of(_file_payload(str(SUBMIT)))
        self.assertEqual(payload["kind"], "text")
        self.assertEqual(payload["size"], SUBMIT.stat().st_size)
        self.assertTrue(payload["text"].lstrip().startswith("#"), "SUBMIT.md should open on its title")

    def test_allowed_profile_image(self) -> None:
        """THE profile's images folder: an upload resolves and comes back as a data URL."""
        self.assertIn(IMAGES.resolve(), _allowed_roots())
        shots = sorted(p for p in IMAGES.glob("upload_*.png") if p.is_file())
        if not shots:
            self.skipTest(f"no uploaded image in {IMAGES}")
        payload = body_of(_blob_payload(str(shots[0])))
        self.assertEqual(payload["mime"], "image/png")
        self.assertTrue(payload["dataUrl"].startswith("data:image/png;base64,"))

    def test_refused_outside_the_tree(self) -> None:
        """THE refused path: /etc is not a root, so the route refuses before reading anything."""
        self.assertIsNone(_resolve("/etc/passwd"))
        for outside in ("/etc/passwd", "/root/.bashrc"):
            result = _file_payload(outside)
            self.assertEqual(status_of(result), 400, outside)
            self.assertEqual(body_of(result), {"error": "refused"}, outside)

    def test_refused_secret(self) -> None:
        """A secret name is refused even inside the profile home."""
        for secret in ("/opt/data/.env", "/opt/data/profiles/dex/.env", "/opt/data/profiles/dex/auth.json", "/opt/data/.ssh/id_ed25519"):
            self.assertIsNone(_resolve(secret), secret)

    def test_missing_file(self) -> None:
        """A path that resolves but is not there is `missing`, never an exception."""
        result = _file_payload(str(IMAGES / "does-not-exist.png"))
        self.assertEqual(status_of(result), 404)
        self.assertEqual(body_of(result), {"error": "missing"})

    def test_too_large_carries_its_size(self) -> None:
        """Over the 1 MiB text cap, the refusal names the size the card prints."""
        big = sorted(p for p in IMAGES.glob("upload_*.png") if p.is_file() and p.stat().st_size > TEXT_MAX)
        if not big:
            self.skipTest(f"no image over {TEXT_MAX} bytes in {IMAGES}")
        result = _file_payload(str(big[0]))
        self.assertEqual(status_of(result), 413)
        self.assertEqual(body_of(result), {"error": "too_large", "size": big[0].stat().st_size})


if __name__ == "__main__":
    unittest.main(verbosity=2)
