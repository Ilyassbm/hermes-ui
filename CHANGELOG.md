# Changelog

All notable changes to this project are documented here. The format is [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
