"""hermes-ui agent half: registers the Intelligent UI skill and ships the desktop page.

The package ships a desktop page (desktop/plugin.js), the skill a bot reads before drawing an interface
(skills/intelligent-ui/SKILL.md, generated from the catalogue by `npm run build`), and a small backend
(dashboard/plugin_api.py, mounted under /api/plugins/hermes-ui/).
"""

import logging
from pathlib import Path

log = logging.getLogger(__name__)

SKILL_PATH = Path(__file__).parent / "skills" / "intelligent-ui" / "SKILL.md"
SKILL_DESCRIPTION = (
    "Use when replying in the Hermes desktop app and the answer is clearer as an interactive card, "
    "chart, table, plan, form or choice than as plain text."
)


def register(ctx):
    """Registers the skill in every profile. A missing or unreadable file never breaks the plugin's load."""
    try:
        ctx.register_skill("intelligent-ui", SKILL_PATH, SKILL_DESCRIPTION)
    except Exception:  # noqa: BLE001 - the desktop page must load even if the skill cannot be registered
        log.exception("hermes-ui: could not register the intelligent-ui skill (%s)", SKILL_PATH)
