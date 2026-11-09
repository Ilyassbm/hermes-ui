# Hackathon submission — what to paste where

Everything here is prepared. The only steps that need your GitHub account are the ones marked **you**.

## 1. The catalog pull request **you**

Fork `NousResearch/hermes-agent`, add one file `plugin-catalog/hermes-ui.yaml`
(the content is in `docs/catalog-entry.yaml` in this repo), then open the PR.

Two things to replace in that file:

- `<SHA>` → the full 40-character SHA of the release commit (see `git rev-parse HEAD`).
- `version` stays `1.0.0` unless the code moved.

PR title:

```
plugin-catalog: add hermes-ui
```

PR body:

```markdown
Adds `hermes-ui`, a Desktop plugin that replaces the Hermes home with a
bespoke chat workspace.

What it does
- Bots rail: the pinned bot on top, then every other profile with the last thing
  it said and how long ago; conversations of the selected bot open as tabs.
- Live thread: streaming replies, a single activity line while the bot works
  ("thinking", "reads a file", "delegates 3 tasks") that folds into
  "Worked for 14s", reasoning folded as "Thought for 4s", approval cards in the
  thread, code, tables and inline widgets.
- Composer: per-bot model and effort with the provider logo, attachments by
  button, drag and drop or paste, slash commands that execute through the
  gateway, Enter or ⌘Enter to send.
- Right panel (collapsible): the bot's routines and the files this conversation
  touched.
- Usage meters at the foot of the rail (Claude and OpenCode Go, only when the
  gateway has them) that open the detail on click.
- Settings ▸ Plugins ▸ Hermes UI: appearance, chat defaults, shortcuts, about.
- Keybind actions in the app's own system: ⌥1…⌥9 bots, ⌘⌥N new conversation with
  a bot, ⌘⇧O new conversation with the current one, ⌘⌥K search, ⌘⌥B right panel.

Surfaces used
- Desktop plugin SDK only: `ctx.registerRoute`, `ctx.registerKeybind`,
  `ctx.registerPaletteCommand`, `ctx.registerSettingsPage`, `host.request`,
  `host.onEvent`, `ctx.rest`. No DOM reach into the app, no core override, no
  monkey-patching; `hermes plugins validate .` passes with no warning.
- A small dashboard backend served through the plugin host: `/api/plugins/hermes-ui/usage`
  and `/api/plugins/hermes-ui/bots`.

Disclosure (rule 13)
- No telemetry, no account, no third-party call from the page itself.
- `GET /usage` reads Anthropic subscription usage through Hermes's own reader,
  and calls `https://opencode.ai/zen/go/v1/usage` only when `OPENCODE_GO_API_KEY`
  is present in the gateway environment. The key never leaves the gateway and is
  never returned to the page.
- `GET /bots` reads each profile's `state.db` read-only to show the last message
  each bot produced. No write, no other file read.
- `/usage` answers are cached for 60 s; failures degrade to empty fields.

Language: English interface. License: MIT.

Screenshots are the four files in `docs/screenshots` of the plugin repo.
```

## 2. The demo video **you**

Under 90 seconds, screen recording, no intro card. Suggested shot list:

1. **0:00–0:08** — App open on the chat: point at the rail, the pinned bot, the
   team rows with their last message and age.
2. **0:08–0:18** — Click another bot, show its conversation tab, then click
   `⌘⌥N`, type `3`, land in a conversation with the third bot.
3. **0:18–0:32** — Send a prompt that makes the bot work: show the live activity
   line, the folded "Worked for Ns", the reasoning folded as "Thought for Ns".
4. **0:32–0:42** — Type `/` in the composer: the command list filters, run
   `/help`, the answer lands as a rendered note.
5. **0:42–0:55** — Open the model picker in the composer: provider logo, eight
   models, "All models…" with the filter, pick one, the effort tag updates.
6. **0:55–1:05** — Click a usage meter: the detail opens, resets and percentages,
   close it. Then `⌘⌥B` to fold the right panel.
7. **1:05–1:18** — Gear → Settings ▸ Plugins ▸ Hermes UI: switch theme to light,
   density to compact, come back to the chat, it applied.
8. **1:18–1:25** — Back to the chat in light mode over the same thread.

Keep the pointer moving slowly and never cut mid-animation.

## 3. Post on X **you**

Tag `@NousResearch`, attach or link the video, keep the copy short:

> I replaced the Hermes Desktop home with a chat workspace built as a plugin.
> Bots rail with what each one said last, live activity line, slash commands that
> actually run, per-bot model in the composer, and usage meters at the foot of the
> rail. Built on the Desktop plugin SDK, no DOM hacks. @NousResearch
> #HermesAgent

## 4. The form **you**

<https://form.typeform.com/to/FwJLvOln> — paste the PR URL and the post URL.

## Checks already green

- `hermes plugins validate .` → Validation passed, 0 warning.
- `npm run build`, `npm run lint`, and the ten repository gates.
- `npm run lint:ui` on the live page: 0 findings in dark and light at 1440×900
  (the app's titlebar and status bar are the host's chrome and are measured
  separately).
