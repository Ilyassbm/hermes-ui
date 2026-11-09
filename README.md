# Hermes UI

A bespoke chat workspace for Hermes Desktop and the Webapp: it replaces the native home with a three-column page —
the bots rail, the conversation, the right panel — and leaves the rest of the app alone.

<p>
  <code>license: MIT</code>
  <code>requires_hermes: &gt;=0.23</code>
  <code>hermes plugins validate: passing</code>
</p>

## Screenshots

![The chat page: the bots rail with the pinned bot, the conversation and the right panel](docs/screenshots/01-chat.jpg)

*The chat page. The rail lists the pinned bot, then the team with the last line each bot said and how long ago; the
composer carries the model and the effort.*

![The model menu: effort on top, then the models of one provider](docs/screenshots/02-model.jpg)

*The model menu, opened from the composer. Low / Medium / High effort at the top, then the provider and its models.*

![The usage meters at the foot of the rail](docs/screenshots/03-usage.jpg)

*Usage meters at the foot of the rail: one compact row per provider, with the binding window and its percentage.*

![The Hermes UI settings page](docs/screenshots/04-settings.jpg)

*Settings ▸ Plugins ▸ Hermes UI: appearance, the chat defaults for the open bot, and the plugin's shortcuts.*

## What you get

- **Bots rail** with the pinned bot on top, then one row per bot: its last output and a relative time.
- **Conversation tabs**: several conversations open at once, one per bot or per thread.
- **Live activity line** — thinking, working, delegating — that folds into “Worked for 12s” when the turn ends.
- **Reasoning** folded under the reply as “Thought for 8s”, opened on demand.
- **Approval cards** for the commands and tools that ask before they run.
- **Streaming replies**, with the thread fading under the bot's badge instead of being cut off.
- **Rich replies**: tables, code blocks, images.
- **Slash commands** that execute — `/help`, `/model`, `/new` and the profile's own — from the composer.
- **Per-bot model and effort** in the composer, with provider logos and the full catalogue behind a submenu.
- **Right panel** with the bot's routines and the files the conversation touched.
- **Usage meters** for the subscriptions the gateway knows about.
- **Light / dark / system**, density, reading width and reduced motion, in Settings.

## Install

From the catalogue:

```bash
hermes plugins install Ilyassbm/hermes-ui --enable
```

From the desktop app: **Capabilities → Plugins → Install from Git**, and paste the repository URL.

From a local clone:

```bash
hermes plugins install file:///path/to/hermes-ui --enable
```

Then **restart the app** — desktop plugins load at launch. The page becomes the home: `#/hui` is what the app opens,
and the native chat routes redirect to it.

## Keyboard shortcuts

| Keys | Action |
| --- | --- |
| `⌥1` … `⌥9` | Go to bot 1 to 9, in the rail's order (pinned first) |
| `⌘⌥N` | New conversation with a bot… (type a digit 1–9 to pick one, Escape to close) |
| `⌘⇧O` | New conversation with the current bot |
| `⌘⌥K` | Search bots and conversations |
| `⌘⌥B` | Show or hide the right panel |
| `/` | Focus the composer and open the command list |
| `⌘J` / `` ⌃` `` | The desktop's own dev panes |

Every one of them is an ordinary keybind action, rebindable in **Settings ▸ Keyboard Shortcuts**. The plugin's own are
registered under `hermes-ui.*` (`hermes-ui.search`, `hermes-ui.newChatWithBot`, `hermes-ui.toggleAside`, …); the last
row is the desktop app's, not the plugin's. On Windows and Linux, `⌘` reads `Ctrl`.

## Settings

**Settings ▸ Plugins ▸ Hermes UI** hosts the page, and the gear in the rail opens it: **Appearance** (theme, density,
reading width, animations), **Chat** (the default model, effort, send key and activity line for the open bot),
**Shortcuts** (the plugin's bindings with the combo the app really dispatches) and **About** (version, repository,
licence, what the plugin reaches on the network).

## How it works

The plugin uses the Desktop plugin SDK only: `ctx.registerRoute` for `/hui`, `ctx.registerPaletteCommand` for the
palette entries, `ctx.registerKeybind` for the shortcuts, `ctx.registerSettingsPage` for **Settings ▸ Plugins**, and
`host.request` / `host.onEvent` for the gateway — a small dashboard backend served through the plugin host (`/usage`,
`/bots`) on top. The contributions go through the SDK's own areas (`ctx.registerMany`), so an older desktop ignores
what it does not know. There is no DOM reach into the app, no core override and no monkey-patching.

The interface is **Glaze** (design.how), with the components vendored in `src/components/glaze` and locked by lint —
`glaze/no-shadow` and `glaze/no-raw-color` — plus `scripts/check-css.mjs`, which refuses a global selector that
escaped `.glaze`.

## Privacy and network

No telemetry. The page talks to your own Hermes gateway and to nothing else.

`GET /api/plugins/hermes-ui/usage` reads your Anthropic subscription usage through Hermes's own reader and, **only if
`OPENCODE_GO_API_KEY` is set in the gateway environment**, calls `https://opencode.ai/zen/go/v1/usage`. The key never
leaves the gateway and is never returned to the page. `GET /bots` reads each profile's `state.db` read-only to show
the last line each bot said.

## Compatibility

Hermes Desktop and the Webapp, `>=0.23`. The page works with any provider and model the profile already has; the
per-bot model menu lists only the providers the profile is authenticated for.

## Development

```bash
npm ci
npm run build     # esbuild bundle + Tailwind + the checks
npm run lint
node scripts/build.mjs --install   # publish into a local Hermes home
```

`npm run build` runs the gates, in this order: `check-menus`, `check-menu-open`, `check-model-menu`, `check-slash`,
`check-keybinds`, `check-overlay-unmount`, `check-request-timeouts`, `check-css`, `check-bundle`, `check-surface`.
`desktop/plugin.js` is a committed artefact: the app loads it as-is, so it is rebuilt and committed with every change
under `src/`.

## Credits

- Glaze design system by design.how (MIT).
- aicss avatar engine (MIT, vendored with its LICENSE in `src/vendor/aicss`).
- Layout inspiration from OpenBot (no code copied, PolyForm Noncommercial).

## License

MIT — see [LICENSE](LICENSE).
