"""hermes-ui backend: subscription usage for the chat rail.

GET /api/plugins/hermes-ui/usage
  Claude  -> Hermes' own Anthropic OAuth usage reader (agent.account_usage), no credential handled here.
  OpenCode Go -> https://opencode.ai/zen/go/v1/usage with OPENCODE_GO_API_KEY from the gateway env.

Cached 60 s. Never returns or logs a credential; errors are reduced to a short reason code.
"""
from __future__ import annotations

import asyncio
import os
import time
from typing import Any

from fastapi import APIRouter

router = APIRouter()

_TTL_S = 60.0
_cache: dict[str, Any] = {"at": 0.0, "body": None}
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


def _opencode_key() -> str:
    key = (os.environ.get("OPENCODE_GO_API_KEY") or "").strip()
    if key:
        return key
    try:
        from hermes_cli.config import get_env_value

        return (get_env_value("OPENCODE_GO_API_KEY") or "").strip()
    except Exception:
        return ""


def _opencode() -> dict:
    out: dict = {"id": "opencode_go", "label": "OpenCode Go", "windows": []}
    key = _opencode_key()
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
async def usage(fresh: int = 0) -> dict:
    async with _lock:
        now = time.monotonic()
        if not fresh and _cache["body"] is not None and now - _cache["at"] < _TTL_S:
            return {**_cache["body"], "cached": True}
        claude, opencode = await asyncio.gather(asyncio.to_thread(_claude), asyncio.to_thread(_opencode))
        body = {"providers": [claude, opencode], "fetchedAt": time.time()}
        _cache.update(at=now, body=body)
        return body


@router.get("/health")
async def health() -> dict:
    return {"ok": True, "plugin": "hermes-ui"}
