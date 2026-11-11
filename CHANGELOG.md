# Changelog

All notable changes to this project are documented here. The format is [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.1] - 2026-11-11

### Fixed

- **One bubble per message.** An agentic turn writes several assistant rows — a note before each tool call, then the
  answer — and they were merged into one turn, so a whole turn printed as a single run-on block with its reasoning
  concatenated. Each row that carries words is now its own message, with its own folded reasoning and its own work row.
- **The model picker shows the provider's mark.** A DeepSeek served by OpenCode Go now carries the OpenCode Go logo in
  the composer: the house that bills and rate-limits the call, not the family of the model.
- **Pinned bots are centred** in the rail, and wrap to the next line when there are several.

### Removed

- Nothing in this repository is one person's data any more: the fixed per-profile avatar table is gone (a colour or a
  shape picked in Hermes' Bots roster wins, otherwise it is hashed), and the screenshots no longer show real
  subscription usage.

## [1.5.0] - 2026-11-11

### Changed

- **A visual language of its own** (`src/styles/theme.css`), replacing the component library's look: the platform's
  UI font (SF Pro on a Mac) at 15px, neutral greys with a clear step between page, rail and raised surfaces, solid
  controls instead of glass, a true green confirm and red destructive, soft elevation for menus, popovers, dialogs and
  the bot pill, rounder cards and roomier rows, a green on-switch, a raised segmented thumb. Light and dark both.
- Your own messages keep a quieter surface than the bot's bubble, with a hairline.
- Avatars use the colour and shape picked in Hermes' Bots roster; unknown bots no longer fall onto the same grey.

## [1.4.0] - 2026-11-11

A redesign after the Grok Bot desktop app, built view by view from a static mock-up.

### Changed

- **Rail**: search and new chat as round buttons at the top, the pinned bots as large tiles (the first one starred),
  the team grouped under the Bots roster's own sections, one "Name · Role" row per bot with its last line; usage,
  settings and the app menu (a grid button) at the foot.
- **Header**: the tab strip is gone. The open bot floats as a pill above the thread — avatar, name and role, the open
  conversation's title — and the pill opens every conversation of the bot, a new one first. New conversation and the
  panel's toggle are round buttons.
- **Thread**: the page itself, no sheet. The bot's answers sit in rounded bubbles; reasoning and work stay flat above
  them; the answering model moved next to the copy button.
- **Composer**: one rounded row — attach, text, model, send — that grows upward as the text wraps.
- **Bot panel**: the bot's card (avatar, name, model, skills), then Activity (its conversations, the running one live,
  and its routines with a switch that really pauses or resumes them through `cron.manage`) and Files.

## [1.3.12] - 2026-11-11

Everything since 1.0.0, grouped. Each patch release is tagged (`v1.1.0` … `v1.3.12`).

### Added

- Motion that follows Emil Kowalski's rules: transform and opacity only, ease-out, under 400 ms, hover guarded for
  pointer devices, reduced motion honoured — enforced by `scripts/check-motion.mjs`.
- Image attachments preview at once in the composer and the thread, open full screen, and are confirmed by the
  gateway before the prompt goes out.
- The last conversation of each bot reopens after a reload.
- `check-copy`, `check-motion`, `check-resume` and `check-iui` gates (16 in all), each one red on the code it guards.

### Changed

- Bot names and roles come from the profile — the Bots roster title, then the display name — and its description.
  Nothing is hard-coded to one team any more.
- One status per wait: the working line under the thread, with its clock. The extra "is thinking…" row is gone, and
  Settings ▸ Activity line now hides that line.
- Intelligent UI tables wrap long cells instead of cutting the last column.
- The slash list shows the gateway's description of each command instead of repeating its name.

### Fixed

- The page waits for the gateway socket on Desktop instead of failing with "gateway unavailable".
- Stored conversations load: deferred `session.resume`, `session.history`, and every transcript shape Hermes writes.
- The native sessions rail folds once when the page opens (measured from the page's own box).
- Reloaded turns: no empty "Thought for a moment" rows, no "Stopped before thinking" on finished turns, and tool
  calls keep their real duration instead of "0ms".
- A `<hui-ui>` block whose JSON is only short of its closing braces is repaired and drawn instead of vanishing.
- The approval card says why Hermes asked, and a card recovered after a reload reads "Run this command?".
- A failed tool no longer prints its output twice; folders and dot-folders stay out of the Files panel.
- Text in the page is selectable again; controls are not.

## [1.0.0] - 2026-11-09

### Added

- Settings page in **Settings ▸ Plugins ▸ Hermes UI**: appearance, chat defaults for the open bot, shortcuts and about.
- Per-bot model and reasoning effort in the composer, with provider logos and the full catalogue behind a submenu.
- Conversation tabs, and a right panel listing the bot's routines and the files the conversation touched.
- `GET /api/plugins/hermes-ui/bots`: the last line each profile's bot said, read from its `state.db`.
- Intelligent UI: a `<hui-ui>` block in a reply is rendered with Glaze components, and the matching skill is registered.

### Changed

- The whole interface is English, with every visible string in `src/app/strings.ts`.
- Bot shortcuts moved to `⌥1…⌥9`: the app already spends `⌘⌥1…⌘⌥9` on its own profile switching.
- Usage meters are one compact row per provider, the detail in a popover instead of two tall cards.
- Published as 1.0.0, with the manifest, README, licence and CI ready for the public catalogue.

### Fixed

- Escape, or a digit, no longer leaves the bot picker's scrim over the app.
- The model menu opens on click, and its first level stays small enough to keep it open.
- `session.resume`, `session.create` and `prompt.submit` ask for 60 s, so a cold backend no longer times out.
- The pinned tile takes the width of its role, so “Chief of Staff” is no longer cut.
- `data-slot` became `data-hui-part`, and no `document` selector reaches the app's markup any more.
