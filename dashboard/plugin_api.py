"""hermes-ui backend: subscription usage and the bots' last output, for the chat rail.

GET /api/plugins/hermes-ui/usage
  Claude  -> Hermes' own Anthropic OAuth usage reader (agent.account_usage), no credential handled here.
  OpenCode Go -> https://opencode.ai/zen/go/v1/usage with OPENCODE_GO_API_KEY, read only through
                 agent.secret_scope under the calling profile (``?profile=``, sent by every desktop
                 ``ctx.rest`` call). A missing or unscoped key reads as not connected.

GET /api/plugins/hermes-ui/bots
  One row per Hermes profile (`default` plus every `<root>/profiles/<name>/` holding a config.yaml): the last open
  session and the last thing its assistant said, read from that profile's state.db in read-only mode.

Both cached, no credential returned, and errors reduced to null fields per row: the rail never waits on a broken
profile, and a bad database can never fail the whole request.
"""
from __future__ import annotations

import asyncio
import base64
import contextlib
import json
import mimetypes
import os
import re
import sqlite3
import time
from pathlib import Path
from typing import Any, Iterator

from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

_TEXT_MAX = 1024 * 1024
_BLOB_MAX = 8 * 1024 * 1024
# Core's own read denylist (agent.file_safety.get_read_block_error) runs first; these are the
# managed files and directories it does not cover by name, refused wherever they sit.
_SECRET_NAMES = (
    ".env", "auth.json", "auth.lock", "config.yaml", "credentials", ".git-credentials",
    "webhook_subscriptions.json", ".anthropic_oauth.json", ".netrc", ".pgpass", ".npmrc", ".pypirc",
)
_SECRET_PREFIXES = ("google_",)  # google_token.json, google_oauth.json, google_client_secret.json…
_SECRET_SUFFIXES = (".pem", ".key")
_SECRET_PARTS = (".ssh", "secrets", "mcp-tokens", "pairing", ".aws", ".gnupg")

_TTL_S = 60.0
_cache: dict[str, dict[str, Any]] = {}  # per profile: {"at", "body"}
_lock = asyncio.Lock()


def _iso(dt: Any) -> str | None:
    try:
        return dt.isoformat() if dt else None
    except Exception:
        return None


def _claude() -> dict:
    out: dict = {"id": "claude", "label": "Claude", "windows": []}
    try:
        from agent.account_usage import fetch_account_usage

        snap = fetch_account_usage("anthropic")
    except Exception as exc:  # pragma: no cover - depends on host auth
        out["error"] = type(exc).__name__
        return out
    if snap is None:
        out["error"] = "not_connected"
        return out
    if snap.unavailable_reason:
        out["error"] = "unavailable"
    for w in snap.windows:
        if w.used_percent is None:
            continue
        label = str(w.label or "")
        low = label.lower()
        wid = "session" if "session" in low or "5" in low else ("week" if "week" in low else low or "window")
        out["windows"].append({
            "id": wid,
            "label": "5 h" if wid == "session" else ("Semaine" if wid == "week" else label),
            "used": float(w.used_percent),
            "resetsAt": _iso(w.reset_at),
            "scope": w.scope,
        })
    return out


def _profile_home(profile: str) -> Path | None:
    """The calling profile's home, or None. The name comes from the query string, so it is
    matched against the profiles directory instead of joined: ``..``, a slash or a deleted
    profile resolve to nothing."""
    root = _hermes_root()
    raw = (profile or "").strip()
    if not raw or raw == "default":
        return root
    if raw.startswith(".") or "/" in raw or "\\" in raw:
        return None
    candidate = root / "profiles" / raw
    if not candidate.is_dir() or (root / "profiles" / ".deleted" / raw).exists():
        return None
    return candidate


@contextlib.contextmanager
def _profile_scope(profile: str) -> Iterator[bool]:
    """Install the calling profile's credential scope for one request; yields False when
    there is no such profile or no scope can be built (the caller then reads nothing)."""
    home = _profile_home(profile)
    if home is None:
        yield False
        return
    try:
        from agent.secret_scope import build_profile_secret_scope, reset_secret_scope, set_secret_scope

        token = set_secret_scope(build_profile_secret_scope(home), profile_home=str(home))
    except Exception:
        yield False
        return
    try:
        yield True
    finally:
        reset_secret_scope(token)


def _opencode_key() -> str:
    """OPENCODE_GO_API_KEY through ``agent.secret_scope.get_secret`` only (catalog rule 11).

    No ``get_env_value`` and no ``os.environ`` fallback: on a gateway serving several
    profiles either can return another profile's key. A missing key, an unscoped read
    (``UnscopedSecretError``) or any scope failure all mean "not connected".
    """
    try:
        from agent.secret_scope import get_secret

        return (get_secret("OPENCODE_GO_API_KEY") or "").strip()
    except Exception:
        return ""


def _opencode(profile: str = "") -> dict:
    out: dict = {"id": "opencode_go", "label": "OpenCode Go", "windows": []}
    with _profile_scope(profile) as scoped:
        key = _opencode_key() if scoped else ""
    if not key:
        out["error"] = "not_connected"
        return out
    try:
        import httpx

        resp = httpx.get(
            "https://opencode.ai/zen/go/v1/usage",
            headers={"Authorization": f"Bearer {key}", "Accept": "application/json"},
            timeout=8.0,
        )
    except Exception as exc:
        out["error"] = type(exc).__name__
        return out
    if resp.status_code in (401, 403):
        out["error"] = "key_rejected"
        return out
    if resp.status_code != 200:
        out["error"] = f"http_{resp.status_code}"
        return out
    try:
        body = resp.json()
    except Exception:
        out["error"] = "bad_json"
        return out
    usage: dict = {}
    if isinstance(body, dict) and isinstance(body.get("usage"), dict):
        usage = body["usage"]
    for wid, label in (("rolling", "5 h"), ("weekly", "Semaine"), ("monthly", "Mois")):
        raw = usage.get(wid)
        if not isinstance(raw, dict) or not isinstance(raw.get("percent"), (int, float)):
            continue
        reset = raw.get("resetsAt")
        out["windows"].append({
            "id": "session" if wid == "rolling" else wid,
            "label": label,
            "used": float(raw["percent"]),
            "resetsAt": reset if isinstance(reset, str) else None,
        })
    return out


@router.get("/usage")
async def usage(fresh: int = 0, profile: str = "") -> dict:
    key = (profile or "").strip() or "default"
    async with _lock:
        now = time.monotonic()
        entry = _cache.get(key)
        if not fresh and entry and now - entry["at"] < _TTL_S:
            return {**entry["body"], "cached": True}
        claude, opencode = await asyncio.gather(
            asyncio.to_thread(_claude), asyncio.to_thread(_opencode, profile))
        body = {"providers": [claude, opencode], "fetchedAt": time.time()}
        _cache[key] = {"at": now, "body": body}
        return body


@router.get("/health")
async def health() -> dict:
    return {"ok": True, "plugin": "hermes-ui"}


# ── bots: last output per profile ────────────────────────────────────────────

_BOTS_TTL_S = 15.0
_bots_cache: dict[str, Any] = {"at": 0.0, "root": "", "body": None}
_bots_lock = asyncio.Lock()


def _hermes_root() -> Path:
    """Where the profiles live, asked to Hermes rather than written here: `HERMES_HOME` when the gateway sets it."""
    try:
        from hermes_constants import get_default_hermes_root

        return Path(get_default_hermes_root())
    except Exception:
        env = (os.environ.get("HERMES_HOME") or "").strip()
        return Path(env).expanduser() if env else Path.home() / ".hermes"


def _profiles(root: Path) -> list[tuple[str, Path]]:
    """`default` (the root home) first, then every `<root>/profiles/<name>/` that carries a config.yaml."""
    out: list[tuple[str, Path]] = [("default", root)]
    try:
        names = sorted(p for p in (root / "profiles").iterdir() if p.is_dir() and (p / "config.yaml").is_file())
    except Exception:
        names = []
    out.extend((p.name, p) for p in names)
    return out


def _content_text(raw: Any) -> str:
    """A message body as text. The column holds plain text, or a JSON list of content blocks."""
    if isinstance(raw, (bytes, bytearray)):
        raw = raw.decode("utf-8", "replace")
    if not isinstance(raw, str):
        return ""
    text = raw.strip()
    if text[:1] in "[{":
        try:
            data = json.loads(text)
        except Exception:
            return raw
        if isinstance(data, list):
            parts = [
                part if isinstance(part, str) else part.get("text", "")
                for part in data
                if isinstance(part, (str, dict))
            ]
            joined = "\n".join(p for p in parts if isinstance(p, str) and p.strip())
            return joined or raw
        if isinstance(data, dict) and isinstance(data.get("text"), str):
            return data["text"]
    return raw


def _last_output(raw: Any, limit: int = 140) -> str:
    """One line for the rail: links keep their label, the markdown marks go, the spaces collapse, 140 characters max.

    Lot 23: media lines go too. `MEDIA:/opt/…` is a path the thread renders as an attachment, and the desktop
    uploader's `[Image attached at: …]` is the same marker for a person's own file — the rail's line says what the bot
    wrote, never where a file lives.
    """
    text = _content_text(raw)
    text = re.sub(r"(?i)media:\s*\S+", "", text)
    text = re.sub(r"(?i)\[image attached at:[^\]]*\]", "", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"[#*_`>]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text if len(text) <= limit else text[: limit - 1].rstrip() + "…"


def _bot_row(name: str, home: Path) -> dict:
    """The profile's last open session and its last assistant message. Any failure leaves the fields null."""
    row: dict[str, Any] = {"name": name, "last_session_id": None, "last_active": None, "last_output": None}
    db = home / "state.db"
    if not db.is_file():
        return row
    conn: sqlite3.Connection | None = None
    try:
        # Read-only and short: the gateway may hold the write lock, and the rail must never wait on it.
        conn = sqlite3.connect(f"file:{db}?mode=ro", uri=True, timeout=2)
        cols = {r[1] for r in conn.execute("PRAGMA table_info(sessions)")}
        if not cols:
            return row
        ts_cols = [c for c in ("last_activity_at", "started_at") if c in cols]
        order = ", ".join(f"COALESCE({c}, 0) DESC" for c in ts_cols) or "rowid DESC"
        where = ["1 = 1"]
        if "archived" in cols:
            where.append("COALESCE(archived, 0) = 0")
        if "hidden" in cols:
            where.append("COALESCE(hidden, 0) = 0")
        hit = conn.execute(
            f"SELECT id, {', '.join(f'COALESCE({c}, 0)' for c in ts_cols) or '0'} "
            f"FROM sessions WHERE {' AND '.join(where)} ORDER BY {order} LIMIT 1"
        ).fetchone()
        if not hit:
            return row
        session_id = str(hit[0])
        row["last_session_id"] = session_id
        # `last_activity_at` wins, `started_at` fills in: a session that never wrote a turn has the first one null.
        active = next((v for v in hit[1:] if v), None)

        mcols = {r[1] for r in conn.execute("PRAGMA table_info(messages)")}
        if not mcols:
            return row
        cond = ["session_id = ?", "role = 'assistant'", "content IS NOT NULL", "TRIM(content) <> ''"]
        if "display_kind" in mcols:
            cond.append("COALESCE(display_kind, '') NOT IN ('hidden', 'reasoning')")
        msg = conn.execute(
            f"SELECT content, timestamp FROM messages WHERE {' AND '.join(cond)} "
            f"ORDER BY COALESCE(timestamp, 0) DESC, id DESC LIMIT 1",
            (session_id,),
        ).fetchone()
        if msg:
            text = _last_output(msg[0])
            row["last_output"] = text or None
            if not active and msg[1]:
                active = msg[1]
        if active:
            row["last_active"] = int(float(active))
    except Exception:
        # A locked, missing or half-migrated database: the row keeps its nulls, never an exception to the client.
        pass
    finally:
        if conn is not None:
            try:
                conn.close()
            except Exception:
                pass
    return row


def collect_bots(root: Path | str | None = None) -> dict:
    """`{"bots": [...]}` for one Hermes root. Split out so scripts/check-bots-api.py can call it without a server."""
    home = Path(root) if root is not None else _hermes_root()
    return {"bots": [_bot_row(name, path) for name, path in _profiles(home)]}


@router.get("/bots")
async def bots(fresh: int = 0) -> dict:
    root = _hermes_root()
    async with _bots_lock:
        now = time.monotonic()
        cache = _bots_cache
        if (
            not fresh
            and cache["body"] is not None
            and cache["root"] == str(root)
            and now - cache["at"] < _BOTS_TTL_S
        ):
            return {**cache["body"], "cached": True}
        # sqlite work is blocking and touches another process's files: keep it off the event loop.
        body = await asyncio.to_thread(collect_bots, root)
        body["fetchedAt"] = time.time()
        cache.update(at=now, root=str(root), body=body)
        return body


# ── files: the right panel's read-only preview ───────────────────────────────
#
# Two reads, no writes: GET /file returns a text file (UTF-8, 1 MiB cap) and GET /blob returns an image as a data URL
# (8 MiB cap). Both refuse, before they read anything, a path that resolves outside the profile home and `~`, a
# symlink that lands outside them, and the secret names Hermes keeps in a profile. The error body is always
# {"error": "refused" | "missing" | "too_large"}; no traceback, no path echo beyond what the caller sent.

def _image_roots(root: Path) -> list[Path]:
    """`<root>/images`, and `<root>/profiles/<profil>/images` for every profile: the one folder a profile keeps its
    uploads in. Named one by one on purpose — never the root or a profile as a whole, so a profile that lives outside
    the root's subtree is still refused everywhere but its images."""
    out = [root / "images"]
    try:
        out.extend(p / "images" for p in sorted((root / "profiles").iterdir()) if p.is_dir())
    except Exception:
        pass
    return out


def _allowed_roots() -> list[Path]:
    """The profile home Hermes names, the user's own home, and each profile's images: the trees the panel may read."""
    roots: list[Path] = []
    try:
        roots.append(_hermes_root().expanduser().resolve())
    except Exception:
        pass
    env = (os.environ.get("HERMES_HOME") or "").strip()
    if env:
        try:
            roots.append(Path(env).expanduser().resolve())
        except Exception:
            pass
    try:
        roots.append(Path.home().resolve())
    except Exception:
        pass
    # The images folders are explicit: the panel serves a profile's uploads even when the profile itself sits out of
    # the root's tree, and nothing else of that profile.
    for base in list(roots):
        for images in _image_roots(base):
            try:
                roots.append(images.expanduser().resolve())
            except Exception:
                pass
    out: list[Path] = []
    for root in roots:
        if root not in out:
            out.append(root)
    return out


def _within(child: Path, root: Path) -> bool:
    try:
        child.relative_to(root)
        return True
    except ValueError:
        return False


def _core_refuses(path: Path) -> bool:
    """What Hermes itself refuses to read (credential stores, mcp-tokens/, vault/, .env…)."""
    try:
        from agent.file_safety import get_read_block_error
    except Exception:
        return False  # outside Hermes; the names below still apply
    try:
        return bool(get_read_block_error(str(path)))
    except Exception:
        return True  # a check that cannot answer is a refusal


def _secret(path: Path) -> bool:
    """The names the panel never serves, whatever the extension: Hermes credentials, its managed
    control files and private keys."""
    name = path.name.lower()
    if name in _SECRET_NAMES or name.startswith(".env."):
        return True
    if name.startswith(_SECRET_PREFIXES):
        return True
    if name.startswith("id_") or name.endswith(_SECRET_SUFFIXES):
        return True
    return any(part.lower() in _SECRET_PARTS for part in path.parts)


def _resolve(raw: str) -> Path | None:
    """`expanduser().resolve()`, then the two containment checks: a `None` means refused."""
    if not raw or "\x00" in raw:
        return None
    try:
        path = Path(os.path.expanduser(raw))
        if not path.is_absolute():
            # Shell tools name paths relative to the profile they run in; that is the base, not the gateway's cwd.
            path = _hermes_root() / path
        resolved = path.resolve()
    except Exception:
        return None
    roots = _allowed_roots()
    if not roots or not any(_within(resolved, root) for root in roots):
        return None
    if _secret(resolved) or _core_refuses(resolved):
        return None
    return resolved


def _refuse(code: str = "refused", status: int = 400, size: int | None = None) -> JSONResponse:
    body: dict[str, Any] = {"error": code}
    if size is not None:
        body["size"] = size
    return JSONResponse(body, status_code=status)


def _file_payload(raw: str) -> dict | JSONResponse:
    path = _resolve(raw)
    if path is None:
        return _refuse("refused", 400)
    try:
        if not path.exists():
            return _refuse("missing", 404)
        if not path.is_file():
            return _refuse("refused", 400)
        stat = path.stat()
        if stat.st_size > _TEXT_MAX:
            return _refuse("too_large", 413, int(stat.st_size))
        data = path.read_bytes()
    except FileNotFoundError:
        return _refuse("missing", 404)
    except (PermissionError, OSError):
        return _refuse("refused", 400)

    body: dict[str, Any] = {
        "path": str(path),
        "size": int(stat.st_size),
        "mtimeMs": int(stat.st_mtime * 1000),
        "kind": "binary",
    }
    if b"\x00" not in data:
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:
            text = None
        if text is not None:
            body["kind"] = "text"
            body["text"] = text
    return body


def _blob_payload(raw: str) -> dict | JSONResponse:
    path = _resolve(raw)
    if path is None:
        return _refuse("refused", 400)
    try:
        if not path.exists():
            return _refuse("missing", 404)
        if not path.is_file():
            return _refuse("refused", 400)
        stat = path.stat()
        if stat.st_size > _BLOB_MAX:
            return _refuse("too_large", 413, int(stat.st_size))
        data = path.read_bytes()
    except FileNotFoundError:
        return _refuse("missing", 404)
    except (PermissionError, OSError):
        return _refuse("refused", 400)

    mime = mimetypes.guess_type(str(path))[0] or "application/octet-stream"
    data_url = f"data:{mime};base64,{base64.b64encode(data).decode('ascii')}"
    return {"path": str(path), "mime": mime, "dataUrl": data_url}


@router.get("/file")
async def file_preview(path: str = ""):
    return await asyncio.to_thread(_file_payload, path)


@router.get("/blob")
async def blob_preview(path: str = ""):
    return await asyncio.to_thread(_blob_payload, path)
