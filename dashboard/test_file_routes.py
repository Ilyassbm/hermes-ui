#!/usr/bin/env python3
"""The read-only file routes, against a throwaway Hermes home.

    /path/to/hermes/.venv/bin/python -I dashboard/test_file_routes.py

``HERMES_HOME`` and ``HOME`` point at a temporary tree built here, so the tests never read the
machine's real profiles and need nothing but a Hermes checkout on ``sys.path`` (``HERMES_ROOT``,
default ``/opt/hermes``). No gateway, no HTTP: the route functions are called directly, the same
ones FastAPI serves.

One test per class of refusal the routes promise: outside the allowed trees, what Hermes' own
``agent.file_safety.get_read_block_error`` refuses, each managed control file, the ``google_*``
token files, any ``mcp-tokens`` or ``pairing`` path component, cloud credentials under the user's
home, and private keys.
"""
from __future__ import annotations

import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO))
HERMES_ROOT = Path(os.environ.get("HERMES_ROOT", "/opt/hermes"))
if HERMES_ROOT.is_dir():
    sys.path.insert(1, str(HERMES_ROOT))

_TMP = tempfile.TemporaryDirectory(prefix="hermes-ui-test-")
USER_HOME = Path(_TMP.name) / "home"
ROOT = USER_HOME / ".hermes"
os.environ["HOME"] = str(USER_HOME)
os.environ["HERMES_HOME"] = str(ROOT)

from dashboard.plugin_api import _allowed_roots, _blob_payload, _file_payload, _resolve  # noqa: E402

TEXT_MAX = 1024 * 1024
PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 32


def write(path: Path, data: bytes | str = "x") -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data.encode() if isinstance(data, str) else data)
    return path


def body_of(result) -> dict:
    if isinstance(result, dict):
        return result
    return json.loads(bytes(result.body).decode("utf-8"))


def status_of(result) -> int:
    return getattr(result, "status_code", 200)


def _has_core(module: str) -> bool:
    try:
        __import__(module)
    except Exception:
        return False
    return True


NOTE = write(ROOT / "profiles" / "alpha" / "workspace" / "NOTE.md", "# A note\n\nhello\n")
SHOT = write(ROOT / "profiles" / "alpha" / "images" / "upload_1.png", PNG)
BIG = write(ROOT / "profiles" / "alpha" / "workspace" / "big.txt", "a" * (TEXT_MAX + 1))
write(ROOT / "profiles" / "alpha" / "config.yaml", "model: {}\n")


class Allowed(unittest.TestCase):
    def test_a_text_file_in_a_profile_workspace(self) -> None:
        payload = body_of(_file_payload(str(NOTE)))
        self.assertEqual(payload["kind"], "text")
        self.assertTrue(payload["text"].startswith("# A note"))

    def test_a_profile_upload_comes_back_as_a_data_url(self) -> None:
        self.assertIn(SHOT.parent.resolve(), _allowed_roots())
        payload = body_of(_blob_payload(str(SHOT)))
        self.assertEqual(payload["mime"], "image/png")
        self.assertTrue(payload["dataUrl"].startswith("data:image/png;base64,"))

    def test_missing_is_404_never_an_exception(self) -> None:
        result = _file_payload(str(NOTE.parent / "nope.md"))
        self.assertEqual((status_of(result), body_of(result)), (404, {"error": "missing"}))

    def test_too_large_carries_its_size(self) -> None:
        result = _file_payload(str(BIG))
        self.assertEqual(status_of(result), 413)
        self.assertEqual(body_of(result), {"error": "too_large", "size": BIG.stat().st_size})


class Refused(unittest.TestCase):
    def assertRefused(self, *paths: Path | str) -> None:
        for path in paths:
            real = Path(os.path.expanduser(str(path)))
            if not real.exists():
                write(real)
            self.assertIsNone(_resolve(str(path)), str(path))
            result = _file_payload(str(path))
            self.assertEqual((status_of(result), body_of(result)), (400, {"error": "refused"}), str(path))

    def test_outside_the_allowed_trees(self) -> None:
        self.assertIsNone(_resolve("/etc/passwd"))
        self.assertEqual(body_of(_file_payload("/etc/passwd")), {"error": "refused"})

    @unittest.skipUnless(_has_core("agent.file_safety"), "needs agent.file_safety from a Hermes checkout")
    def test_everything_core_refuses(self) -> None:
        # Paths only get_read_block_error knows about: no name in the plugin's own list matches them.
        self.assertRefused(ROOT / "vault" / "store.bin", ROOT / "browser-profile" / "Cookies",
                           ROOT / "skills" / ".hub" / "index.json")

    def test_dot_env_and_auth_json(self) -> None:
        self.assertRefused(ROOT / ".env", ROOT / "profiles" / "alpha" / ".env",
                           ROOT / ".env.local", ROOT / "auth.json")

    def test_config_yaml(self) -> None:
        self.assertRefused(ROOT / "config.yaml", ROOT / "profiles" / "alpha" / "config.yaml")

    def test_credentials_and_git_credentials(self) -> None:
        self.assertRefused(ROOT / "credentials", USER_HOME / ".git-credentials")

    def test_webhook_subscriptions(self) -> None:
        self.assertRefused(ROOT / "webhook_subscriptions.json",
                           ROOT / "profiles" / "alpha" / "webhook_subscriptions.json")

    def test_auth_lock(self) -> None:
        self.assertRefused(ROOT / "auth.lock")

    def test_anthropic_oauth(self) -> None:
        self.assertRefused(ROOT / ".anthropic_oauth.json")

    def test_google_token_files(self) -> None:
        self.assertRefused(ROOT / "google_token.json", ROOT / "auth" / "google_oauth.json",
                           ROOT / "profiles" / "alpha" / "google_client_secret.json")

    def test_any_mcp_tokens_component(self) -> None:
        self.assertRefused(ROOT / "mcp-tokens" / "github.json",
                           ROOT / "profiles" / "alpha" / "mcp-tokens" / "notes.txt")

    def test_any_pairing_component(self) -> None:
        self.assertRefused(ROOT / "pairing" / "telegram.json",
                           ROOT / "profiles" / "alpha" / "pairing" / "code.txt")

    def test_cloud_credentials_named_by_a_model_reply(self) -> None:
        # MEDIA:~/.aws/credentials — the user's home is an allowed tree, the file is not.
        self.assertRefused(USER_HOME / ".aws" / "credentials", "~/.aws/credentials")

    def test_private_keys(self) -> None:
        self.assertRefused(USER_HOME / ".ssh" / "id_ed25519", ROOT / "profiles" / "alpha" / "server.pem")


if __name__ == "__main__":
    unittest.main(verbosity=2)
