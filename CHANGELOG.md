# Changelog

All notable changes to this project are documented here. The format is [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
