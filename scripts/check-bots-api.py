#!/usr/bin/env python3
"""Prints what GET /api/plugins/hermes-ui/bots would answer, for a given Hermes root.

The lab root is only READ (state.db opened with `mode=ro`): no gateway, no writes, nothing outside the repo touched.

    HERMES_HOME=/opt/data/hui-lab/root /opt/hermes/.venv/bin/python -I scripts/check-bots-api.py
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO))

# -I drops the script's own directory from sys.path, so the repo is added above. The root is forced rather than
# defaulted: the shell running this may already export HERMES_HOME for the live home, and the lab is what we check.
os.environ["HERMES_HOME"] = sys.argv[1] if len(sys.argv) > 1 else "/opt/data/hui-lab/root"

from dashboard.plugin_api import _hermes_root, collect_bots  # noqa: E402


def main() -> int:
    root = _hermes_root()
    print(f"root: {root}")
    print(json.dumps(collect_bots(root), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
