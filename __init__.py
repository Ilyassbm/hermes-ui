"""hermes-ui agent half: nothing to register on the agent side.

The package ships a desktop page (desktop/plugin.js) and a small backend
(dashboard/plugin_api.py, mounted under /api/plugins/hermes-ui/).
"""


def register(ctx):  # noqa: D401 - Hermes plugin entry point
    return None
