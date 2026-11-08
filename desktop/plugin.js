// Hermes UI — built from src/ by scripts/build.mjs. Do not edit by hand.

// src/plugin.jsx
import { host as host4, KEYBINDS_AREA, PALETTE_AREA, ROUTES_AREA, SIDEBAR_NAV_AREA } from "@hermes/plugin-sdk";

// src/ui/App.jsx
import { host as host3, useTheme, useValue } from "@hermes/plugin-sdk";
import { useEffect as useEffect6, useState as useState4 } from "react";

// src/styles.css
var styles_default = "/* Hermes UI \u2014 Glaze (OS v2) on Hermes Desktop. Every rule is scoped to .hui.\n   Tokens: values copied from ilyassbm/os components/glaze/tokens.css (dark = reference).\n   Motion: Emil Kowalski rules \u2014 transform/opacity only, strong ease-out, <= 220 ms,\n   hover gated to fine pointers, reduced motion keeps fades only. */\n\n.hui {\n  --frame: #f3f2ef;\n  --frame-glow: radial-gradient(900px 520px at 0% 0%, rgb(255 122 89 / 0.10), transparent 65%), radial-gradient(700px 480px at 100% 100%, rgb(120 110 255 / 0.05), transparent 60%);\n  --page: #ffffff;\n  --paper: #f8f7f5;\n  --paper-2: #ffffff;\n  --field: #ebeae7;\n  --raised: rgb(255 255 255 / 0.92);\n  --hover: rgb(20 18 15 / 0.045);\n  --pressed: rgb(20 18 15 / 0.07);\n  --text-1: #18171a;\n  --text-2: #68676d;\n  --text-3: #a3a2a8;\n  --line-faint: rgb(20 18 15 / 0.06);\n  --line: rgb(20 18 15 / 0.09);\n  --line-control: rgb(20 18 15 / 0.13);\n  --line-focus: rgb(234 88 52 / 0.6);\n  --focus: rgb(234 88 52 / 0.9);\n  --highlight: inset 0 1px 0 rgb(255 255 255 / 0.9);\n  --accent: #f26a48;\n  --accent-hover: #ff7a59;\n  --accent-press: #e2583a;\n  --accent-text: #d14a2b;\n  --accent-soft: rgb(242 106 72 / 0.10);\n  --on-accent: #1f0c06;\n  --ok: #059669;\n  --warn: #d97706;\n  --fail: #e11d48;\n  --fail-text: #be123c;\n  --fail-tint: rgb(225 29 72 / 0.10);\n  --warn-tint: rgb(217 119 6 / 0.10);\n  --nav-active: #ffffff;\n  --nav-active-shadow: 0 0 0 1px rgb(20 18 15 / 0.09), 0 1px 2px rgb(40 30 20 / 0.05);\n  --shadow-frame: 0 0 0 1px var(--line), 0 24px 48px -28px rgb(40 30 20 / 0.18), 0 2px 6px -2px rgb(40 30 20 / 0.06);\n  --shadow-card: 0 0 0 1px var(--line), 0 1px 2px rgb(40 30 20 / 0.05);\n  --shadow-overlay: 0 0 0 1px rgb(20 18 15 / 0.08), 0 24px 64px -16px rgb(40 30 20 / 0.22), 0 8px 20px -8px rgb(40 30 20 / 0.10);\n  --btn-secondary: #ffffff;\n  --btn-secondary-shadow: 0 0 0 1px var(--line), var(--highlight), 0 1px 2px rgb(40 30 20 / 0.06);\n  --code-bg: #ffffff;\n  --code-head: #fafafa;\n  --scrollbar-thumb: rgb(20 18 15 / 0.16);\n  --shimmer-a: #8a8990;\n  --shimmer-b: rgb(138 137 144 / 0.40);\n\n  --font-sans: 'Geist', 'Inter', ui-sans-serif, system-ui, -apple-system, 'SF Pro Text', 'Segoe UI', sans-serif;\n  --font-mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;\n  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);\n  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);\n  --dur-press: 100ms;\n  --dur-state: 120ms;\n  --dur-overlay: 160ms;\n  --dur-panel: 220ms;\n  --rail-w: 248px;\n  --aside-w: 288px;\n\n  position: absolute;\n  inset: 0;\n  display: grid;\n  grid-template-columns: var(--rail-w) minmax(0, 1fr) auto;\n  background-color: var(--frame);\n  background-image: var(--frame-glow);\n  color: var(--text-1);\n  font: 400 14px/22px var(--font-sans);\n  -webkit-font-smoothing: antialiased;\n  letter-spacing: 0;\n  overflow: hidden;\n  isolation: isolate;\n}\n\n.hui[data-theme='dark'] {\n  --frame: #0c0c0d;\n  --frame-glow: radial-gradient(900px 520px at 0% 0%, rgb(255 122 89 / 0.07), transparent 65%), radial-gradient(700px 480px at 100% 100%, rgb(120 110 255 / 0.04), transparent 60%);\n  --page: #141416;\n  --paper: #1a1a1d;\n  --paper-2: #202024;\n  --field: #26262a;\n  --raised: rgb(28 28 31 / 0.90);\n  --hover: rgb(255 255 255 / 0.05);\n  --pressed: rgb(255 255 255 / 0.08);\n  --text-1: #f4f4f5;\n  --text-2: #a1a1a8;\n  --text-3: #6c6c74;\n  --line-faint: rgb(255 255 255 / 0.06);\n  --line: rgb(255 255 255 / 0.08);\n  --line-control: rgb(255 255 255 / 0.10);\n  --line-focus: rgb(255 122 89 / 0.55);\n  --focus: rgb(255 122 89 / 0.9);\n  --highlight: inset 0 1px 0 rgb(255 255 255 / 0.05);\n  --accent: #ff7a59;\n  --accent-hover: #ff8f73;\n  --accent-press: #f26a48;\n  --accent-text: #ff9a80;\n  --accent-soft: rgb(255 122 89 / 0.14);\n  --ok: #34d399;\n  --warn: #fbbf24;\n  --fail: #f43f5e;\n  --fail-text: #fb7185;\n  --fail-tint: rgb(244 63 94 / 0.12);\n  --warn-tint: rgb(251 191 36 / 0.12);\n  --nav-active: rgb(255 255 255 / 0.07);\n  --nav-active-shadow: inset 0 1px 0 rgb(255 255 255 / 0.05), 0 0 0 1px rgb(255 255 255 / 0.06);\n  --shadow-frame: 0 0 0 1px var(--line), 0 24px 48px -24px rgb(0 0 0 / 0.7), 0 2px 6px -2px rgb(0 0 0 / 0.4), var(--highlight);\n  --shadow-card: 0 0 0 1px var(--line), 0 1px 2px rgb(0 0 0 / 0.3), var(--highlight);\n  --shadow-overlay: 0 0 0 1px rgb(255 255 255 / 0.09), 0 24px 64px -16px rgb(0 0 0 / 0.75), 0 8px 20px -8px rgb(0 0 0 / 0.5), var(--highlight);\n  --btn-secondary: rgb(255 255 255 / 0.06);\n  --btn-secondary-shadow: 0 0 0 1px var(--line), var(--highlight);\n  --code-bg: #18181b;\n  --code-head: #1e1e21;\n  --scrollbar-thumb: rgb(255 255 255 / 0.12);\n  --shimmer-a: #8b8b93;\n  --shimmer-b: rgb(139 139 147 / 0.38);\n}\n\n.hui *, .hui *::before, .hui *::after { box-sizing: border-box; }\n.hui button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }\n.hui :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; border-radius: 8px; }\n.hui ::selection { background: var(--accent-soft); }\n.hui .hui-scroll { overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) transparent; }\n.hui .tnum { font-variant-numeric: tabular-nums; }\n.hui .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }\n\n/* \u2500\u2500 Rail \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.hui-rail { display: flex; flex-direction: column; min-height: 0; padding: 12px 8px 8px 10px; gap: 8px; }\n.hui-brand { display: flex; align-items: center; gap: 8px; height: 28px; padding: 0 6px; }\n.hui-brand-mark { width: 20px; height: 20px; border-radius: 6px; background: linear-gradient(140deg, var(--accent-hover), var(--accent-press)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), 0 1px 2px rgb(0 0 0 / 0.3); flex: none; }\n.hui-brand-name { font: 600 13px/18px var(--font-sans); letter-spacing: -0.01em; }\n.hui-brand-spacer { flex: 1; }\n\n.hui-new { display: flex; align-items: center; gap: 8px; height: 32px; padding: 0 10px; border-radius: 10px; background: var(--btn-secondary); box-shadow: var(--btn-secondary-shadow); font: 500 13px/18px var(--font-sans); color: var(--text-1); transition: transform var(--dur-press) var(--ease-out); }\n.hui-new:active { transform: scale(0.97); }\n.hui-new kbd { margin-left: auto; font: 500 11px/14px var(--font-sans); color: var(--text-3); }\n\n.hui-section { margin: 12px 8px 4px; font: 500 11px/14px var(--font-sans); letter-spacing: 0.01em; color: var(--text-3); text-transform: none; }\n.hui-list { display: flex; flex-direction: column; gap: 1px; }\n.hui-row { position: relative; display: flex; align-items: center; gap: 8px; width: 100%; min-height: 30px; padding: 4px 8px; border-radius: 8px; text-align: left; font: 500 13px/18px var(--font-sans); color: var(--text-2); }\n.hui-row[aria-current='page'] { background: var(--nav-active); box-shadow: var(--nav-active-shadow); color: var(--text-1); }\n.hui-row .hui-row-label { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.hui-row .hui-row-meta { font: 400 11px/14px var(--font-sans); color: var(--text-3); flex: none; }\n.hui-row.is-conv { font-weight: 400; min-height: 28px; }\n.hui-pip { width: 6px; height: 6px; border-radius: 999px; background: var(--text-3); flex: none; }\n.hui-pip[data-tone='ok'] { background: var(--ok); }\n.hui-pip[data-tone='busy'] { background: var(--accent); animation: hui-breathe 1.6s var(--ease-in-out) infinite; }\n.hui-pip[data-tone='warn'] { background: var(--warn); }\n@keyframes hui-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }\n\n.hui-rail-scroll { flex: 1; min-height: 0; margin: 0 -4px; padding: 0 4px; }\n.hui-empty-line { padding: 4px 8px; font: 400 12px/16px var(--font-sans); color: var(--text-3); }\n\n.hui-foot { display: flex; flex-direction: column; gap: 8px; padding-top: 8px; border-top: 1px solid var(--line-faint); }\n.hui-usage { display: flex; flex-direction: column; gap: 8px; padding: 8px; border-radius: 10px; text-align: left; width: 100%; }\n.hui-usage-row { display: flex; flex-direction: column; gap: 5px; }\n.hui-usage-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }\n.hui-usage-name { font: 400 12px/16px var(--font-sans); color: var(--text-2); }\n.hui-usage-val { font: 500 11px/14px var(--font-sans); color: var(--text-1); font-variant-numeric: tabular-nums; }\n.hui-usage-val.is-off { color: var(--text-3); font-weight: 400; }\n.hui-track { position: relative; height: 4px; border-radius: 999px; background: var(--field); overflow: hidden; }\n.hui-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--accent); transform-origin: left center; transform: scaleX(var(--pct, 0)); transition: transform 400ms var(--ease-out); }\n.hui-fill[data-tone='warn'] { background: var(--warn); }\n.hui-fill[data-tone='fail'] { background: var(--fail); }\n.hui-usage-sub { display: flex; justify-content: space-between; font: 400 11px/14px var(--font-sans); color: var(--text-3); font-variant-numeric: tabular-nums; }\n\n.hui-foot-bar { display: flex; align-items: center; gap: 6px; padding: 0 2px; }\n.hui-engine { display: flex; align-items: center; gap: 6px; flex: 1; min-width: 0; padding: 0 6px; font: 400 12px/16px var(--font-sans); color: var(--text-2); }\n.hui-icon-btn { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; color: var(--text-2); flex: none; transition: transform var(--dur-press) var(--ease-out); }\n.hui-icon-btn:active { transform: scale(0.95); }\n.hui-icon-btn[aria-pressed='true'] { color: var(--text-1); background: var(--pressed); }\n\n/* \u2500\u2500 Card / thread \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.hui-card { position: relative; display: flex; flex-direction: column; min-width: 0; min-height: 0; margin: 8px 0 8px 0; border-radius: 16px; background: var(--page); box-shadow: var(--shadow-frame); overflow: hidden; }\n.hui[data-aside='closed'] .hui-card { margin-right: 8px; }\n.hui-head { display: flex; align-items: center; gap: 10px; height: 48px; padding: 0 12px 0 16px; border-bottom: 1px solid var(--line-faint); flex: none; }\n.hui-head-title { min-width: 0; flex: 1; display: flex; align-items: baseline; gap: 8px; }\n.hui-head-bot { font: 600 13px/18px var(--font-sans); color: var(--text-1); letter-spacing: -0.01em; white-space: nowrap; }\n.hui-head-conv { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 400 13px/18px var(--font-sans); color: var(--text-3); }\n.hui-chip { display: inline-flex; align-items: center; gap: 6px; height: 24px; padding: 0 8px; border-radius: 7px; background: var(--hover); font: 500 11px/14px var(--font-sans); color: var(--text-2); white-space: nowrap; }\n\n.hui-thread-scroll { flex: 1; min-height: 0; }\n.hui-thread { width: 100%; max-width: 760px; margin: 0 auto; padding: 28px 24px 24px; display: flex; flex-direction: column; gap: 28px; }\n\n.hui-turn { display: flex; min-width: 0; }\n.hui-turn[data-from='user'] { justify-content: flex-end; }\n.hui-arrive { animation: hui-arrive 220ms var(--ease-out) both; }\n@keyframes hui-arrive { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }\n\n.hui-user { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; max-width: min(560px, 85%); }\n.hui-bubble { padding: 9px 14px; border-radius: 18px 18px 6px 18px; background: var(--paper-2); box-shadow: 0 0 0 1px var(--line-faint); white-space: pre-wrap; overflow-wrap: anywhere; font: 400 14px/22px var(--font-sans); color: var(--text-1); }\n.hui-user-meta { display: flex; align-items: center; gap: 4px; height: 24px; opacity: 0; transition: opacity var(--dur-state) ease; }\n.hui-turn:hover .hui-user-meta, .hui-turn:focus-within .hui-user-meta { opacity: 1; }\n.hui-time { font: 400 12px/16px var(--font-sans); color: var(--text-3); font-variant-numeric: tabular-nums; }\n.hui-attach-chips { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px; }\n.hui-attach-chip { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 8px; background: var(--paper); box-shadow: 0 0 0 1px var(--line-faint); font: 500 12px/16px var(--font-sans); color: var(--text-2); }\n\n.hui-assistant { display: flex; flex-direction: column; gap: 8px; min-width: 0; width: 100%; }\n.hui-assistant-head { display: flex; align-items: center; gap: 8px; min-height: 28px; }\n.hui-assistant-name { font: 500 12px/16px var(--font-sans); color: var(--text-1); }\n.hui-assistant-model { font: 400 12px/16px var(--font-sans); color: var(--text-3); }\n.hui-assistant-body { padding-left: 36px; min-width: 0; }\n.hui-actions { display: flex; align-items: center; gap: 2px; padding-left: 32px; height: 28px; opacity: 0; transition: opacity var(--dur-state) ease; }\n.hui-turn:hover .hui-actions, .hui-turn:focus-within .hui-actions { opacity: 1; }\n\n/* Copy button: icon swap with a blur crossfade (Emil). */\n.hui-copy { position: relative; display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; color: var(--text-3); transition: transform var(--dur-press) var(--ease-out); }\n.hui-copy:active { transform: scale(0.95); }\n.hui-copy svg { grid-area: 1 / 1; transition: opacity 160ms var(--ease-out), transform 160ms var(--ease-out), filter 160ms var(--ease-out); }\n.hui-copy .is-check { opacity: 0; transform: scale(0.6); filter: blur(2px); color: var(--ok); }\n.hui-copy[data-copied='true'] .is-copy { opacity: 0; transform: scale(0.6); filter: blur(2px); }\n.hui-copy[data-copied='true'] .is-check { opacity: 1; transform: none; filter: none; }\n\n/* Prose \u2014 native renderer (MessageTextContent), restyled by element. */\n.hui-prose { min-width: 0; font: 400 14px/22px var(--font-sans); color: var(--text-1); overflow-wrap: anywhere; }\n.hui-prose > :first-child { margin-top: 0; }\n.hui-prose > :last-child { margin-bottom: 0; }\n.hui-prose p { margin: 0 0 12px; }\n.hui-prose h1, .hui-prose h2, .hui-prose h3 { margin: 20px 0 8px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.3; }\n.hui-prose h1 { font-size: 18px; } .hui-prose h2 { font-size: 16px; } .hui-prose h3 { font-size: 14px; }\n.hui-prose ul, .hui-prose ol { margin: 0 0 12px; padding-left: 20px; }\n.hui-prose li { margin: 3px 0; }\n.hui-prose a { color: var(--accent-text); text-decoration: none; }\n.hui-prose a:hover { text-decoration: underline; text-underline-offset: 2px; }\n.hui-prose strong { font-weight: 600; }\n.hui-prose blockquote { margin: 0 0 12px; padding: 2px 0 2px 12px; border-left: 2px solid var(--line-control); color: var(--text-2); }\n.hui-prose hr { border: 0; border-top: 1px solid var(--line); margin: 16px 0; }\n.hui-prose :not(pre) > code { padding: 1px 5px; border-radius: 5px; background: var(--hover); font: 400 0.86em/1.4 var(--font-mono); }\n/* aicss CodeBlock look */\n.hui-prose pre { margin: 0 0 12px; padding: 12px 16px; border-radius: 12px; background: var(--code-bg); box-shadow: 0 0 0 0.5px var(--line-control), 0 1px 2px rgb(0 0 0 / 0.08); overflow-x: auto; font: 400 12.5px/20px var(--font-mono); scrollbar-width: none; }\n.hui-prose pre::-webkit-scrollbar { display: none; }\n.hui-prose pre code { font: inherit; background: none; padding: 0; }\n/* aicss DataTable look. The native renderer wraps tables in .aui-md-table (border + 6px radius):\n   the wrapper becomes the card, the table stays flat inside it. */\n.hui .hui-prose .aui-md-table { margin: 4px 0 12px; border: 0; border-radius: 12px; overflow-x: auto; box-shadow: 0 0 0 0.5px var(--line-control), 0 1px 2px rgb(0 0 0 / 0.08); }\n.hui .hui-prose .aui-md-table table { margin: 0; box-shadow: none; border-radius: 0; }\n.hui-prose table { width: 100%; margin: 0 0 12px; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 0 0 0.5px var(--line-control), 0 1px 2px rgb(0 0 0 / 0.08); font-size: 13px; }\n.hui-prose thead th { background: var(--code-head); color: var(--text-3); font-weight: 500; text-align: left; padding: 7px 12px; }\n.hui-prose tbody td { background: var(--code-bg); padding: 9px 12px; border-top: 0.5px solid var(--line-control); }\n.hui-prose th:not(:last-child), .hui-prose td:not(:last-child) { border-right: 0.5px solid var(--line-control); }\n.hui-prose img { max-width: 100%; border-radius: 12px; }\n\n/* Reasoning \u2014 aicss ThinkingReasoning pattern: shimmer label, grid-rows collapse. */\n.hui-reason { display: flex; flex-direction: column; }\n.hui-reason-head { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; min-height: 22px; font: 500 13px/18px var(--font-sans); color: var(--text-3); }\n.hui-reason-head .verb { color: var(--text-2); }\n.hui-reason-chevron { width: 12px; height: 12px; color: var(--text-3); transform: rotate(180deg); transition: transform 220ms var(--ease-out); }\n.hui-reason-head[aria-expanded='true'] .hui-reason-chevron { transform: rotate(0deg); }\n.hui-reason-body { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 260ms var(--ease-out), opacity 180ms ease; }\n.hui-reason-body[data-open='true'] { grid-template-rows: 1fr; opacity: 1; }\n.hui-reason-inner { min-height: 0; overflow: hidden; }\n.hui-reason-text { margin-top: 6px; max-height: 220px; overflow-y: auto; padding: 2px 0 2px 12px; border-left: 2px solid var(--line); white-space: pre-wrap; font: 400 13px/20px var(--font-sans); color: var(--text-3); scrollbar-width: thin; }\n.hui-reason-text.is-live { -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 100%); mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 100%); }\n\n.hui-shimmer { color: transparent; -webkit-text-fill-color: transparent; background: linear-gradient(90deg, var(--shimmer-a) 0%, var(--shimmer-a) 30%, var(--shimmer-b) 45%, var(--shimmer-b) 55%, var(--shimmer-a) 70%, var(--shimmer-a) 100%); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; animation: hui-shine 2.25s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }\n@keyframes hui-shine { 0%, 18% { background-position: 100% 0; } 82%, 100% { background-position: 0% 0; } }\n\n/* Live activity line \u2014 one line, the verb crossfades in place. */\n.hui-live { display: flex; align-items: center; gap: 6px; min-height: 22px; font: 500 13px/18px var(--font-sans); color: var(--text-3); }\n.hui-live .sep { color: var(--text-3); opacity: 0.7; }\n.hui-live-verb { display: inline-block; animation: hui-verb 180ms var(--ease-out) both; }\n@keyframes hui-verb { from { opacity: 0; transform: translateY(3px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }\n.hui-elapsed { font: 400 12px/16px var(--font-sans); color: var(--text-3); font-variant-numeric: tabular-nums; }\n\n/* Approval card */\n.hui-approval { display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 14px; background: var(--paper); box-shadow: var(--shadow-card); animation: hui-pop 200ms var(--ease-out) both; transform-origin: top left; }\n@keyframes hui-pop { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: none; } }\n.hui-approval-title { display: flex; align-items: center; gap: 8px; font: 600 13px/18px var(--font-sans); }\n.hui-approval-title .dot { width: 8px; height: 8px; border-radius: 999px; background: var(--warn); box-shadow: 0 0 0 3px var(--warn-tint); }\n.hui-approval-desc { font: 400 13px/20px var(--font-sans); color: var(--text-2); }\n.hui-approval pre { margin: 0; padding: 10px 12px; border-radius: 10px; background: var(--code-bg); box-shadow: 0 0 0 0.5px var(--line-control); font: 400 12px/18px var(--font-mono); white-space: pre-wrap; overflow-wrap: anywhere; max-height: 160px; overflow-y: auto; }\n.hui-approval-actions { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }\n\n.hui-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 10px; font: 500 13px/18px var(--font-sans); transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-state) ease, box-shadow var(--dur-state) ease; }\n.hui-btn:active { transform: scale(0.97); }\n.hui-btn.primary { background: var(--accent); color: var(--on-accent); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), 0 1px 2px rgb(0 0 0 / 0.3); }\n.hui-btn.secondary { background: var(--btn-secondary); box-shadow: var(--btn-secondary-shadow); color: var(--text-1); }\n.hui-btn.ghost { color: var(--text-2); }\n.hui-btn.sm { height: 28px; padding: 0 10px; font-size: 12px; }\n\n.hui-fail { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: var(--fail-tint); color: var(--text-1); font: 500 13px/18px var(--font-sans); }\n.hui-fail .msg { flex: 1; min-width: 0; }\n\n/* Empty state */\n.hui-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 24px; text-align: center; }\n.hui-empty h1 { margin: 0; font: 600 24px/30px var(--font-sans); letter-spacing: -0.025em; color: var(--text-1); }\n.hui-empty p { margin: 0; max-width: 46ch; font: 400 13px/20px var(--font-sans); color: var(--text-3); }\n\n.hui-jump { position: absolute; left: 50%; bottom: 132px; transform: translateX(-50%); display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 999px; background: var(--raised); box-shadow: var(--shadow-overlay); color: var(--text-2); backdrop-filter: blur(24px) saturate(1.4); animation: hui-fade 160ms var(--ease-out) both; z-index: 3; }\n@keyframes hui-fade { from { opacity: 0; } to { opacity: 1; } }\n\n/* \u2500\u2500 Composer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.hui-composer-wrap { flex: none; padding: 0 24px 16px; }\n.hui-composer { width: 100%; max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 6px; padding: 10px 10px 8px 14px; border-radius: 18px; background: var(--raised); box-shadow: var(--shadow-overlay); backdrop-filter: blur(24px) saturate(1.4); transition: box-shadow var(--dur-state) ease; }\n.hui-composer:focus-within { box-shadow: 0 0 0 1px var(--line-control), var(--shadow-overlay); }\n.hui-composer textarea { width: 100%; min-height: 24px; max-height: 240px; resize: none; border: 0; outline: none; background: transparent; color: var(--text-1); font: 400 14px/22px var(--font-sans); padding: 2px 0; }\n.hui-composer textarea::placeholder { color: var(--text-3); }\n.hui-composer-bar { display: flex; align-items: center; gap: 4px; }\n.hui-composer-bar .grow { flex: 1; }\n.hui-pill { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 8px 0 10px; border-radius: 999px; font: 500 12px/16px var(--font-sans); color: var(--text-2); transition: transform var(--dur-press) var(--ease-out); }\n.hui-pill:active { transform: scale(0.97); }\n.hui-pill .eff { color: var(--text-3); font-weight: 400; }\n.hui-send { display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 999px; background: var(--accent); color: var(--on-accent); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), 0 1px 2px rgb(0 0 0 / 0.3); transition: transform var(--dur-press) var(--ease-out), opacity var(--dur-state) ease; }\n.hui-send:active { transform: scale(0.94); }\n.hui-send:disabled { opacity: 0.35; cursor: default; }\n.hui-send.is-stop { background: var(--text-1); color: var(--page); }\n.hui-files { display: flex; flex-wrap: wrap; gap: 6px; }\n.hui-file-chip { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 4px 0 10px; border-radius: 8px; background: var(--paper); box-shadow: 0 0 0 1px var(--line-faint); font: 500 12px/16px var(--font-sans); color: var(--text-2); animation: hui-pop 160ms var(--ease-out) both; }\n.hui-file-chip button { display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 5px; color: var(--text-3); }\n.hui-hint { text-align: center; margin-top: 8px; font: 400 11px/14px var(--font-sans); color: var(--text-3); }\n\n/* Model menu (popover) */\n.hui-pop { position: absolute; bottom: calc(100% + 8px); left: 0; z-index: 20; min-width: 280px; max-height: 360px; display: flex; flex-direction: column; padding: 6px; border-radius: 12px; background: var(--raised); box-shadow: var(--shadow-overlay); backdrop-filter: blur(24px) saturate(1.4); transform-origin: bottom left; animation: hui-pop-in 160ms var(--ease-out) both; }\n@keyframes hui-pop-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: none; } }\n.hui-pop-label { padding: 6px 8px 4px; font: 500 11px/14px var(--font-sans); color: var(--text-3); }\n.hui-pop-list { overflow-y: auto; scrollbar-width: thin; }\n.hui-pop-item { display: flex; align-items: center; gap: 8px; width: 100%; height: 30px; padding: 0 8px; border-radius: 7px; text-align: left; font: 400 13px/18px var(--font-sans); color: var(--text-1); }\n.hui-pop-item[aria-selected='true'] { background: var(--accent-soft); }\n.hui-pop-item .sub { margin-left: auto; font-size: 11px; color: var(--text-3); }\n.hui-seg { display: flex; gap: 2px; padding: 2px; margin: 4px 4px 2px; border-radius: 9px; background: var(--hover); }\n.hui-seg button { flex: 1; height: 26px; border-radius: 7px; font: 500 12px/16px var(--font-sans); color: var(--text-2); }\n.hui-seg button[aria-pressed='true'] { background: var(--page); color: var(--text-1); box-shadow: 0 0 0 1px var(--line), 0 1px 2px rgb(0 0 0 / 0.15); }\n\n/* Gear menu */\n.hui-menu { position: absolute; bottom: calc(100% + 6px); right: 0; z-index: 20; min-width: 208px; padding: 6px; border-radius: 12px; background: var(--raised); box-shadow: var(--shadow-overlay); backdrop-filter: blur(24px) saturate(1.4); transform-origin: bottom right; animation: hui-pop-in 160ms var(--ease-out) both; }\n.hui-menu button { display: flex; align-items: center; gap: 10px; width: 100%; height: 32px; padding: 0 10px; border-radius: 7px; text-align: left; font: 400 13px/18px var(--font-sans); color: var(--text-1); }\n.hui-menu button kbd { margin-left: auto; font: 500 11px/14px var(--font-sans); color: var(--text-3); }\n.hui-menu hr { border: 0; border-top: 1px solid var(--line-faint); margin: 4px 6px; }\n\n/* \u2500\u2500 Aside \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.hui-aside { width: var(--aside-w); display: flex; flex-direction: column; min-height: 0; padding: 12px 10px 8px 8px; gap: 4px; }\n.hui[data-aside='closed'] .hui-aside { display: none; }\n.hui-aside-head { display: flex; align-items: center; justify-content: space-between; height: 28px; padding: 0 6px; }\n.hui-aside-title { font: 600 12px/16px var(--font-sans); color: var(--text-2); }\n.hui-aside-block { display: flex; flex-direction: column; gap: 2px; margin-bottom: 14px; }\n.hui-routine { display: flex; flex-direction: column; gap: 2px; padding: 8px; border-radius: 10px; }\n.hui-routine-top { display: flex; align-items: center; gap: 8px; }\n.hui-routine-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 13px/18px var(--font-sans); color: var(--text-1); }\n.hui-routine-meta { padding-left: 14px; font: 400 12px/16px var(--font-sans); color: var(--text-3); font-variant-numeric: tabular-nums; }\n.hui-filerow { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 30px; padding: 4px 8px; border-radius: 8px; text-align: left; }\n.hui-filerow .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 13px/18px var(--font-sans); color: var(--text-1); }\n.hui-filerow .dir { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 400 11px/14px var(--font-mono); color: var(--text-3); }\n.hui-file-ico { display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: 7px; background: var(--hover); color: var(--text-2); flex: none; }\n.hui-aside-empty { padding: 10px 8px; border-radius: 10px; font: 400 12px/18px var(--font-sans); color: var(--text-3); }\n\n/* Bot avatar (aicss AiBotAvatar, CSS-module port) */\n.hui-bot { --bot-1: #66a6ff; --bot-2: #0059d4; --bot-face: #ffffff; --bot-ground: rgba(0, 0, 0, 0.05); --bot-ground-core: rgba(0, 0, 0, 0.095); --bot-heart: #ff4f7e; --bot-blush: rgba(255, 110, 150, 0.55); position: relative; display: inline-block; flex: none; width: var(--bot-size, 24px); height: var(--bot-size, 24px); vertical-align: middle; }\n.hui[data-theme='dark'] .hui-bot { --bot-face: #101010; --bot-ground: rgba(0, 0, 0, 0.2); --bot-ground-core: rgba(0, 0, 0, 0.3); }\n.hui-bot svg { position: absolute; inset: -25%; display: block; width: 150%; height: 150%; overflow: visible; }\n.hui-bot .stop1, .hui-bot .stop2 { transition: stop-color 450ms ease; }\n.hui-bot .stop1 { stop-color: var(--bot-1); }\n.hui-bot .stop2 { stop-color: var(--bot-2); }\n.hui-bot .face { fill: var(--bot-face); stroke: var(--bot-face); }\n.hui-bot .ground { fill: var(--bot-ground); }\n.hui-bot .core { fill: var(--bot-ground-core); }\n.hui-bot .blush { fill: var(--bot-blush); }\n.hui-bot .heart { fill: var(--bot-heart); }\n\n/* Pointer-gated hovers (touch fires false hovers). Rows are instant (0 ms). */\n@media (hover: hover) and (pointer: fine) {\n  .hui-row:hover:not([aria-current='page']) { background: var(--hover); color: var(--text-1); }\n  .hui-new:hover { background: var(--hover); }\n  .hui-icon-btn:hover, .hui-copy:hover { background: var(--hover); color: var(--text-1); }\n  .hui-pill:hover { background: var(--hover); color: var(--text-1); }\n  .hui-btn.primary:hover { background: var(--accent-hover); }\n  .hui-btn.secondary:hover, .hui-btn.ghost:hover { background: var(--hover); }\n  .hui-send:not(:disabled):hover { background: var(--accent-hover); }\n  .hui-send.is-stop:hover { background: var(--text-2); }\n  .hui-pop-item:hover, .hui-menu button:hover, .hui-filerow:hover, .hui-routine:hover, .hui-usage:hover { background: var(--hover); }\n  .hui-reason-head:hover, .hui-reason-head:hover .hui-reason-chevron { color: var(--text-2); }\n  .hui-jump:hover { color: var(--text-1); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .hui-arrive, .hui-approval, .hui-pop, .hui-menu, .hui-file-chip, .hui-live-verb { animation: hui-fade 120ms ease both; }\n  .hui-shimmer { animation: none; color: var(--text-3); -webkit-text-fill-color: currentColor; background: none; }\n  .hui-pip[data-tone='busy'] { animation: none; }\n  .hui-new:active, .hui-btn:active, .hui-send:active, .hui-pill:active, .hui-icon-btn:active, .hui-copy:active { transform: none; }\n  .hui-fill { transition: none; }\n}\n\n@media (max-width: 980px) {\n  .hui { --aside-w: 0px; }\n  .hui .hui-aside { display: none; }\n  .hui .hui-card { margin-right: 8px; }\n}\n@media (max-width: 720px) {\n  .hui { grid-template-columns: 0 minmax(0, 1fr) 0; }\n  .hui .hui-rail { display: none; }\n  .hui .hui-card { margin: 0; border-radius: 0; }\n}\n";

// src/lib/hermes.js
import { host } from "@hermes/plugin-sdk";

// src/lib/store.js
import { useSyncExternalStore } from "react";
function createStore(initial) {
  let state = initial;
  const subs = /* @__PURE__ */ new Set();
  return {
    get: () => state,
    set(patch) {
      const next = typeof patch === "function" ? patch(state) : patch;
      if (!next) return;
      state = { ...state, ...next };
      subs.forEach((fn) => fn());
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
}
function useStore(store2, select) {
  return useSyncExternalStore(store2.subscribe, () => select(store2.get()), () => select(store2.get()));
}

// src/lib/hermes.js
var store = createStore({
  ready: false,
  bots: [],
  // [{ name, display_name, model, provider, description, connectionId, route }]
  bot: null,
  // selected profile name
  sessionsByBot: {},
  // name -> [{ id, title, at }]
  sid: null,
  // runtime session id of the open conversation (null = new conversation)
  storedId: null,
  loading: false,
  messages: [],
  // [{ id, role, text, reasoning, tools, model, at, status, thoughtMs }]
  live: null,
  // { phase, verb, subagents, startedAt, reasoning } while a turn runs
  approval: null,
  // { requestId, command, description, allowPermanent }
  info: { model: "", title: "" },
  files: [],
  // [{ path, at }]
  routines: [],
  usage: null,
  error: ""
});
var ctxRef = null;
var msgSeq = 0;
var nid = (p) => `${p}-${Date.now().toString(36)}-${(msgSeq++).toString(36)}`;
function textOf(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((part) => typeof part === "string" ? part : part?.text || "").filter(Boolean).join("\n");
  }
  return "";
}
function parseArgs(raw) {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
var FILE_TOOLS = /^(write_file|create_file|patch|edit_file|apply_patch)$/;
function filesFromTool(name, args) {
  if (!FILE_TOOLS.test(String(name || ""))) return [];
  const p = args?.path || args?.file_path || args?.target;
  return typeof p === "string" && p ? [p] : [];
}
function filesFromText(text) {
  const out = [];
  for (const m of String(text || "").matchAll(/MEDIA:\s*(\/[^\s)]+)/g)) out.push(m[1]);
  return out;
}
function addFiles(paths) {
  if (!paths.length) return;
  store.set((s) => {
    const seen = new Set(s.files.map((f) => f.path));
    const add = paths.filter((p) => !seen.has(p)).map((path) => ({ path, at: Date.now() }));
    return add.length ? { files: [...add, ...s.files] } : null;
  });
}
function toTurns(raw) {
  const turns = [];
  const files = [];
  let cur = null;
  for (const m of raw || []) {
    if (!m || m.display_kind === "hidden" || m.role === "system") continue;
    if (m.role === "user") {
      cur = null;
      const text = textOf(m.content);
      if (!text.trim()) continue;
      turns.push({ id: m.message_uid || nid("u"), role: "user", text, at: (m.timestamp || 0) * 1e3 });
      continue;
    }
    if (m.role === "assistant") {
      if (!cur) {
        cur = { id: m.message_uid || nid("a"), role: "assistant", text: "", reasoning: "", tools: [], at: (m.timestamp || 0) * 1e3, status: "done", model: m.model || "" };
        turns.push(cur);
      }
      const t = textOf(m.content);
      if (t.trim()) cur.text = cur.text ? `${cur.text}

${t}` : t;
      const r = m.reasoning || m.reasoning_content;
      if (r && typeof r === "string") cur.reasoning = cur.reasoning ? `${cur.reasoning}

${r}` : r;
      for (const tc of m.tool_calls || []) {
        const name = tc?.function?.name || tc?.name;
        const args = parseArgs(tc?.function?.arguments || tc?.arguments);
        cur.tools.push({ id: tc?.id || nid("t"), name, done: true });
        files.push(...filesFromTool(name, args));
      }
      files.push(...filesFromText(t));
      continue;
    }
  }
  return { turns: turns.filter((t) => t.role === "user" || t.text || t.tools.length), files: [...new Set(files)] };
}
async function loadBots() {
  let profiles = [];
  try {
    const res = await host.request("profiles.list", {});
    profiles = Array.isArray(res?.profiles) ? res.profiles : [];
  } catch (e) {
    store.set({ error: `Profils illisibles : ${e?.message || e}` });
  }
  let routes = [];
  try {
    routes = await host.profileRoutes() || [];
  } catch {
    routes = [];
  }
  const bots = profiles.map((p) => {
    const route = routes.find((r) => r.profile === p.name) || null;
    return {
      name: p.name,
      display_name: p.display_name || "",
      description: p.description || "",
      model: p.model || "",
      provider: p.provider || "",
      connectionId: route?.connectionId || null,
      route
    };
  });
  store.set({ bots });
  return bots;
}
async function loadSessions(botName) {
  const bot = store.get().bots.find((b) => b.name === botName);
  if (!bot) return;
  try {
    const res = await host.listPersistedSessions(bot.route, { profile: botName, limit: 60 });
    const rows = (res?.sessions || []).filter((r) => !r.hidden && !r.archived).map((r) => ({
      id: r.id,
      title: r.title || r.preview || "Conversation",
      at: (r.last_active || r.updated_at || r.started_at || 0) * 1e3
    })).sort((a, b) => b.at - a.at);
    store.set((s) => ({ sessionsByBot: { ...s.sessionsByBot, [botName]: rows } }));
  } catch (e) {
    store.set((s) => ({ sessionsByBot: { ...s.sessionsByBot, [botName]: s.sessionsByBot[botName] || [] } }));
  }
}
async function selectBot(botName, { keepConversation = false } = {}) {
  const bot = store.get().bots.find((b) => b.name === botName);
  if (!bot) return;
  ctxRef?.storage?.set("lastBot", botName);
  store.set({ bot: botName, ...keepConversation ? {} : blankConversation() });
  try {
    await host.ensureAgent(bot.connectionId, botName);
  } catch (e) {
    store.set({ error: `${botName} injoignable : ${e?.message || e}` });
  }
  void loadSessions(botName);
  void loadRoutines();
}
function blankConversation() {
  return { sid: null, storedId: null, messages: [], live: null, approval: null, files: [], info: { model: "", title: "" }, error: "" };
}
function newConversation() {
  store.set(blankConversation());
}
async function openConversation(storedId) {
  const { bot } = store.get();
  store.set({ ...blankConversation(), storedId, loading: true });
  try {
    const res = await host.request("session.resume", { session_id: storedId, cols: 96, source: "desktop", ...bot ? { profile: bot } : {} });
    const { turns, files } = toTurns(res?.messages);
    store.set({
      sid: res?.session_id || storedId,
      storedId: res?.stored_session_id || storedId,
      messages: turns,
      files: files.map((path) => ({ path, at: 0 })),
      loading: false,
      live: res?.running ? { phase: "thinking", verb: "", subagents: 0, startedAt: Date.now(), reasoning: "" } : null
    });
    if (res?.running) startApprovalPoll();
  } catch (e) {
    store.set({ loading: false, error: `Conversation illisible : ${e?.message || e}` });
  }
}
function prefsFor(botName) {
  const all = ctxRef?.storage?.get("prefs", {}) || {};
  return all[botName] || {};
}
function savePrefs(botName, patch) {
  const all = ctxRef?.storage?.get("prefs", {}) || {};
  all[botName] = { ...all[botName] || {}, ...patch };
  ctxRef?.storage?.set("prefs", all);
}
function fileToBase64(file) {
  return new Promise((resolve2, reject) => {
    const r = new FileReader();
    r.onload = () => resolve2(String(r.result || ""));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}
async function ensureSession() {
  const s = store.get();
  if (s.sid) return s.sid;
  const prefs = prefsFor(s.bot);
  const res = await host.request("session.create", {
    cols: 96,
    source: "desktop",
    ...s.bot ? { profile: s.bot } : {},
    ...prefs.model ? { model: prefs.model, ...prefs.provider ? { provider: prefs.provider } : {} } : {},
    ...prefs.effort ? { reasoning_effort: prefs.effort } : {},
    fast: false
  });
  const sid = res?.session_id;
  applied.set(sid, `${prefs.provider || ""}|${prefs.model || ""}|${prefs.effort || ""}`);
  store.set({ sid, storedId: res?.stored_session_id || sid });
  return sid;
}
var applied = /* @__PURE__ */ new Map();
async function applyPrefsToSession(sid) {
  const { bot } = store.get();
  const prefs = prefsFor(bot);
  const want = `${prefs.provider || ""}|${prefs.model || ""}|${prefs.effort || ""}`;
  const prev = applied.get(sid);
  if (prev === void 0) {
    applied.set(sid, want);
    return;
  }
  if (prev === want) return;
  applied.set(sid, want);
  const [pp, pm, pe] = prev.split("|");
  try {
    if (prefs.model && (prefs.model !== pm || (prefs.provider || "") !== pp)) {
      await host.request("slash.exec", { session_id: sid, command: `/model ${prefs.model}${prefs.provider ? ` --provider ${prefs.provider}` : ""}`, confirm_expensive_model: true });
    }
    if ((prefs.effort || "") !== pe && prefs.effort) {
      await host.request("slash.exec", { session_id: sid, command: `/reasoning ${prefs.effort}` });
    }
  } catch {
  }
}
async function send(text, attachments = []) {
  const body = String(text || "").trim();
  if (!body && !attachments.length) return;
  const s = store.get();
  if (s.live) return;
  store.set((st) => ({
    error: "",
    messages: [...st.messages, { id: nid("u"), role: "user", text: body, at: Date.now(), attachments: attachments.map((a) => ({ name: a.name, kind: a.type?.startsWith("image/") ? "image" : "file" })) }],
    live: { phase: "thinking", verb: "", subagents: 0, startedAt: Date.now(), reasoning: "" }
  }));
  try {
    const hadSession = Boolean(store.get().sid);
    const sid = await ensureSession();
    if (hadSession) await applyPrefsToSession(sid);
    const refs = [];
    for (const file of attachments) {
      const dataUrl = await fileToBase64(file);
      if (file.type?.startsWith("image/")) {
        await host.request("image.attach_bytes", { session_id: sid, content_base64: dataUrl.split(",")[1] || "", filename: file.name });
      } else {
        const r = await host.request("file.attach", { session_id: sid, name: file.name, data_url: dataUrl });
        if (r?.ref_text) refs.push(r.ref_text);
      }
    }
    const full = [body, ...refs].filter(Boolean).join("\n\n");
    await host.request("prompt.submit", { session_id: sid, text: full });
    startApprovalPoll();
  } catch (e) {
    failTurn(e?.message || String(e));
  }
}
async function stop() {
  const { sid } = store.get();
  if (!sid) return;
  try {
    await host.request("session.interrupt", { session_id: sid });
  } catch {
  }
}
async function retryLast() {
  const msgs = store.get().messages;
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].role === "user") {
      const text = msgs[i].text;
      store.set({ messages: msgs.slice(0, i), error: "" });
      return send(text);
    }
  }
}
function failTurn(reason) {
  store.set((s) => ({
    live: null,
    error: reason || "La r\xE9ponse n'est pas arriv\xE9e.",
    messages: s.messages.map((m) => m.status === "streaming" ? { ...m, status: m.text ? "done" : "failed" } : m)
  }));
  stopApprovalPoll();
}
var pollTimer = null;
function startApprovalPoll() {
  if (pollTimer) return;
  const tick = async () => {
    const { sid, live } = store.get();
    if (!sid || !live) return stopApprovalPoll();
    try {
      const res = await host.request("approval.pending", { session_id: sid });
      const list = res?.approvals || res?.pending || (Array.isArray(res) ? res : []);
      const first = list[0];
      store.set({
        approval: first ? {
          requestId: first.request_id || first.id || "",
          command: first.command || "",
          description: first.description || "",
          allowPermanent: first.allow_permanent !== false
        } : null
      });
    } catch {
    }
  };
  pollTimer = ctxRef ? ctxRef.setInterval(tick, 1500) : null;
  void tick();
}
function stopApprovalPoll() {
  if (typeof pollTimer === "function") pollTimer();
  pollTimer = null;
}
async function answerApproval(choice) {
  const { sid, approval } = store.get();
  if (!sid || !approval) return;
  store.set({ approval: null });
  try {
    await host.request("approval.respond", { session_id: sid, choice, ...approval.requestId ? { request_id: approval.requestId } : {} });
  } catch (e) {
    store.set({ error: `R\xE9ponse non transmise : ${e?.message || e}` });
  }
}
function draft(s) {
  const last = s.messages[s.messages.length - 1];
  if (last && last.role === "assistant" && last.status === "streaming") return [last, s.messages.slice(0, -1)];
  return [null, s.messages];
}
function patchDraft(fn) {
  store.set((s) => {
    let [d, rest] = draft(s);
    if (!d) {
      d = { id: nid("a"), role: "assistant", text: "", reasoning: "", tools: [], at: Date.now(), turnStart: s.live?.startedAt || Date.now(), status: "streaming", model: s.info.model };
      rest = s.messages;
    }
    const next = fn({ ...d, tools: [...d.tools] });
    return { messages: [...rest, next] };
  });
}
function setLive(patch) {
  store.set((s) => s.live ? { live: { ...s.live, ...patch } } : null);
}
function handleEvent(ev) {
  if (!ev || typeof ev.type !== "string") return;
  const s = store.get();
  const p = ev.payload || {};
  if (ev.type === "sessions.changed") {
    if (s.bot) void loadSessions(s.bot);
    return;
  }
  if (!s.sid || ev.session_id !== s.sid) return;
  switch (ev.type) {
    case "session.info":
      if (p.title || p.model) store.set({ info: { model: p.model || s.info.model, title: p.title || s.info.title } });
      return;
    case "message.start":
      if (!s.live) store.set({ live: { phase: "thinking", verb: "", subagents: 0, startedAt: Date.now(), reasoning: "" } });
      patchDraft((d) => d);
      return;
    case "reasoning.delta":
      if (typeof p.text === "string" && p.text) {
        patchDraft((d) => ({ ...d, reasoning: d.reasoning + p.text, thinkStart: d.thinkStart || Date.now() }));
        setLive({ phase: s.live?.phase === "tool" ? "tool" : "thinking" });
      }
      return;
    case "tool.generating":
      setLive({ phase: "tool", verb: "" });
      return;
    case "tool.start": {
      const name = p.tool_name || p.name;
      const args = p.args || {};
      patchDraft((d) => ({ ...d, tools: [...d.tools, { id: p.tool_id || nid("t"), name, done: false }], thinkEnd: d.thinkEnd || Date.now() }));
      if (name === "delegate_task") {
        const n = Array.isArray(args.tasks) ? args.tasks.length : 1;
        setLive({ phase: "delegating", subagents: Math.max(n, 1), toolName: name });
      } else {
        setLive({ phase: "tool", toolName: name });
      }
      return;
    }
    case "tool.complete": {
      const name = p.tool_name || p.name;
      patchDraft((d) => ({ ...d, tools: d.tools.map((t) => t.id === p.tool_id ? { ...t, done: true, error: !!p.is_error } : t) }));
      addFiles([...filesFromTool(name, p.args || {}), ...filesFromText(typeof p.result === "string" ? p.result : "")]);
      setLive({ phase: "thinking", toolName: "" });
      return;
    }
    case "subagent.start":
      setLive({ phase: "delegating", subagents: Math.max(1, store.get().live?.subagents || 0) });
      return;
    case "message.delta":
      if (typeof p.text === "string" && p.text) {
        patchDraft((d) => ({ ...d, text: d.text + p.text, thinkEnd: d.thinkEnd || Date.now() }));
        setLive({ phase: "writing" });
      }
      return;
    case "message.complete": {
      const text = typeof p.text === "string" ? p.text : textOf(p.content);
      const failed = p.status === "error" || p.outcome === "failed";
      patchDraft((d) => ({
        ...d,
        text: text || d.text,
        reasoning: d.reasoning || (typeof p.reasoning === "string" ? p.reasoning : ""),
        status: failed && !text ? "failed" : "done",
        thinkEnd: d.thinkEnd || Date.now(),
        model: store.get().info.model || d.model
      }));
      addFiles(filesFromText(text));
      store.set({ live: null, approval: null, ...failed && !text ? { error: p.error || "La r\xE9ponse n'est pas arriv\xE9e." } : {} });
      stopApprovalPoll();
      if (s.bot) void loadSessions(s.bot);
      return;
    }
    case "error":
    case "message.error":
      failTurn(p.message || p.error);
      return;
    default:
      if (ev.type.startsWith("approval.")) void startApprovalPoll();
  }
}
async function loadRoutines() {
  const { bot } = store.get();
  if (!bot) return;
  try {
    const res = await host.request("cron.manage", { action: "list", include_disabled: true, profile: bot });
    const jobs = Array.isArray(res?.jobs) ? res.jobs : [];
    const mine = jobs.filter((j) => {
      const tag = /^\[bot:([a-z0-9][a-z0-9_-]*)\]/i.exec(j.name || "");
      return !tag || tag[1].toLowerCase() === bot;
    });
    store.set({ routines: mine });
  } catch {
    store.set({ routines: [] });
  }
}
async function loadUsage(fresh = false) {
  if (!ctxRef) return;
  try {
    const res = await ctxRef.rest(`/usage${fresh ? "?fresh=1" : ""}`, { timeoutMs: 2e4 });
    store.set({ usage: res?.providers || [] });
  } catch {
    store.set({ usage: "off" });
  }
}
function bindContext(ctx) {
  ctxRef = ctx;
}
async function boot() {
  if (store.get().ready) return;
  const bots = await loadBots();
  const last = ctxRef?.storage?.get("lastBot", null);
  const active = host.state.profile.get();
  const pick = bots.find((b) => b.name === last) || bots.find((b) => b.name === active) || bots[0];
  store.set({ ready: true });
  if (pick) await selectBot(pick.name);
  void loadUsage();
}

// src/lib/labels.js
var TOOL_VERBS = [
  [/^read_file$/, "lit un fichier"],
  [/^(write_file|create_file)$/, "\xE9crit un fichier"],
  [/^(patch|edit_file|apply_patch)$/, "modifie un fichier"],
  [/^search_files$/, "cherche dans les fichiers"],
  [/^(terminal|shell|bash|process)/, "lance une commande"],
  [/^web_search$/, "cherche sur le web"],
  [/^web_extract$/, "lit une page web"],
  [/^(browser|browser_exec|drive_preview)/, "navigue sur le web"],
  [/^execute_code$/, "ex\xE9cute du code"],
  [/^vision_analyze$/, "regarde une image"],
  [/^image_generate$/, "g\xE9n\xE8re une image"],
  [/^text_to_speech$/, "pr\xE9pare un audio"],
  [/^skill_(view|manage)$|^skills_list$/, "consulte ses skills"],
  [/^memory$/, "met \xE0 jour sa m\xE9moire"],
  [/^session_search$/, "fouille ses conversations"],
  [/^(todo|todo_list)$/, "organise ses t\xE2ches"],
  [/^clarify$/, "te pose une question"],
  [/^(cronjob|cronjob_manage)$/, "planifie une t\xE2che"],
  [/^send_message$/, "envoie un message"],
  [/^tool_(search|describe|call)$/, "utilise un outil"],
  [/^connectors__([a-z0-9-]+)__/, (m) => `utilise ${cap(m[1])}`],
  [/^mcp__([a-z0-9-]+)__/, (m) => `utilise ${cap(m[1])}`]
];
function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
function toolVerb(name) {
  const n = String(name || "");
  for (const [re, verb] of TOOL_VERBS) {
    const m = re.exec(n);
    if (m) return typeof verb === "function" ? verb(m) : verb;
  }
  return n ? `utilise ${n.replace(/_/g, " ")}` : "travaille";
}
var LABELS = { default: "Branco" };
function botLabel(bot) {
  if (!bot) return "Hermes";
  const name = typeof bot === "string" ? bot : bot.name;
  const display = typeof bot === "object" ? (bot.display_name || "").trim() : "";
  if (display) return display;
  return LABELS[name] || cap(String(name || "hermes").replace(/[-_]+/g, " "));
}
var HUES = [
  ["#ff9b80", "#e2583a"],
  // coral
  ["#8fc2ff", "#2f6fe0"],
  // blue
  ["#c4b3ff", "#7c4ddb"],
  // violet
  ["#7ee8c4", "#0f9d74"],
  // green
  ["#ffd47a", "#d48a06"],
  // amber
  ["#ff9fd0", "#d63c8c"],
  // pink
  ["#86eadc", "#0f8a7e"],
  // teal
  ["#c3ccd8", "#5b6b80"]
  // slate
];
var SHAPES = ["pebble", "circle", "squircle", "flower", "blob"];
function hash(s) {
  let h = 2166136261;
  for (const ch of String(s || "")) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 16;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489909);
  h ^= h >>> 16;
  return h >>> 0;
}
var FIXED = {
  default: [0, "pebble"],
  dex: [1, "squircle"],
  preto: [3, "flower"],
  mint: [6, "blob"],
  prism: [2, "circle"],
  youtubot: [5, "pebble"],
  "bot-builder": [4, "squircle"]
};
function botLook(name) {
  const key = name || "default";
  if (FIXED[key]) return { colors: HUES[FIXED[key][0]], shape: FIXED[key][1] };
  const h = hash(key);
  return { colors: HUES[h % HUES.length], shape: SHAPES[(h >>> 5) % SHAPES.length] };
}
function shortModel(model) {
  const m = String(model || "").split("/").pop();
  return m.replace(/-\d{8}$/, "");
}
function hourOf(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
var CONV_GROUPS = ["Aujourd'hui", "Hier", "7 derniers jours", "Plus ancien"];
function convGroup(ts) {
  if (!ts) return "Plus ancien";
  const d = new Date(ts);
  const now = /* @__PURE__ */ new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  if (d.getTime() >= start) return CONV_GROUPS[0];
  if (d.getTime() >= start - 864e5) return CONV_GROUPS[1];
  if (d.getTime() >= start - 6 * 864e5) return CONV_GROUPS[2];
  return CONV_GROUPS[3];
}
function resetIn(iso) {
  if (!iso) return "";
  const ms = new Date(iso).getTime() - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return "";
  const h = Math.floor(ms / 36e5);
  const m = Math.round(ms % 36e5 / 6e4);
  if (h >= 24) return `dans ${Math.round(h / 24)} j`;
  if (h > 0) return `dans ${h} h ${String(m).padStart(2, "0")}`;
  return `dans ${m} min`;
}
function plural(n, one, many) {
  return `${n} ${n > 1 ? many : one}`;
}

// src/ui/Rail.jsx
import { useEffect as useEffect2, useRef as useRef2, useState } from "react";

// src/ui/BotAvatar.jsx
import { useEffect, useId, useRef } from "react";

// src/vendor/aicss/engine.ts
var R0 = 13.4;
var POINTS = 96;
var EYES = [-3.2, 3.2];
var EYE_Y = -2.6;
var EYE_W = 2.4;
var EYE_H = 5.4;
var MOUTH_Y = 4.4;
var MORPH_MS = 380;
var GROUND_Y = R0 + 0.5;
var HEARTS = 4;
var HEART_EVERY = 2800;
var HEART_LIFE = 2200;
var HEART = "M0 1C-0.6 0.55-1.3 0.1-1.3-0.45C-1.3-0.95-0.9-1.2-0.55-1.2C-0.25-1.2-0.05-1 0-0.8C0.05-1 0.25-1.2 0.55-1.2C0.9-1.2 1.3-0.95 1.3-0.45C1.3 0.1 0.6 0.55 0 1Z";
var smoothstep = (t) => t * t * (3 - 2 * t);
var clamp01 = (t) => Math.min(1, Math.max(0, t));
var easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
var easeOut = (t) => 1 - (1 - t) ** 3;
var bump = (t, a, b) => t <= a || t >= b ? 0 : Math.sin(Math.PI * (t - a) / (b - a));
var hold = (t, a, b, c, d) => t <= a || t >= d ? 0 : t < b ? smoothstep((t - a) / (b - a)) : t <= c ? 1 : 1 - smoothstep((t - c) / (d - c));
var hash2 = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
function radius(shape, th, t, level) {
  const c = Math.cos;
  switch (shape) {
    case "circle":
      return 0.97 + (0.012 + level * 0.03) * c(3 * th + t * 0.5) + 8e-3 * c(5 * th - t * 0.6);
    case "squircle": {
      const x = Math.abs(c(th));
      const y = Math.abs(Math.sin(th));
      return 0.9 / (x ** 4 + y ** 4) ** 0.25 + (8e-3 + level * 0.02) * c(4 * th + t * 0.6);
    }
    case "flower":
      return 0.95 + (0.075 + level * 0.03) * c(8 * th) + 0.012 * c(3 * th + t * 0.6);
    case "blob":
      return 0.97 + (0.05 + level * 0.025) * c(3 * th + 1.5 * Math.PI + 0.75 * Math.sin(t * 0.3) + 0.25 * Math.sin(t * 0.71)) + (0.022 + level * 0.012) * c(2 * th - t * 0.36) + 0.01 * c(5 * th + t * 0.5);
    default:
      return 1 + (0.038 + level * 0.03) * c(5 * th + 0.5 * Math.PI + 0.75 * Math.sin(t * 0.27) + 0.25 * Math.sin(t * 0.63)) + (0.02 + level * 0.02) * c(3 * th + t * 0.45) + 0.01 * c(7 * th - t * 0.6);
  }
}
function bodyPath(r) {
  let d = "";
  for (let i = 0; i < POINTS; i++) {
    const th = i / POINTS * Math.PI * 2;
    const k = r[i] * R0;
    d += `${i ? "L" : "M"}${(k * Math.cos(th)).toFixed(2)} ${(k * Math.sin(th)).toFixed(2)}`;
  }
  return `${d}Z`;
}
var ROUND_BODY = bodyPath(new Float32Array(POINTS).fill(1));
function eyePath(x, y, open, laugh, scale, lidL, lidR) {
  const a = EYE_W / 2 * scale;
  const b = Math.max(0.35, EYE_H / 2 * open * scale) * (4 / 3);
  const oval = [x - a, y, x - a, y - b * (1 - lidL), x + a, y - b * (1 - lidR), x + a, y, x + a, y + b, x - a, y + b];
  const cy = y + 0.4;
  const happy = [x - 1.7, cy + 1, x - 1.5, cy - 1.6, x + 1.5, cy - 1.6, x + 1.7, cy + 1, x + 1.1, cy - 0.3, x - 1.1, cy - 0.3];
  const p = oval.map((v, i) => (v + (happy[i] - v) * laugh).toFixed(2));
  return `M${p[0]} ${p[1]}C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}C${p[8]} ${p[9]} ${p[10]} ${p[11]} ${p[0]} ${p[1]}Z`;
}
function mouthPath(cx, cy, open, smile, width, skew, taper = 0) {
  const w = (2 + smile * 0.8 - open * 0.3) * width;
  const ends = cy - smile * 0.4;
  const curve = cy + 0.4 + smile * (smile < 0 ? 2.4 : 1.6);
  const low = curve + open * 1.8 + taper;
  const up = curve - open * 2.4 - taper;
  const f = (n) => n.toFixed(2);
  const l = ends + skew;
  const r = ends - skew;
  return `M${f(cx - w)} ${f(l)}Q${f(cx)} ${f(low)} ${f(cx + w)} ${f(r)}Q${f(cx)} ${f(up)} ${f(cx - w)} ${f(l)}Z`;
}
var BASE = {
  openL: 1,
  openR: 1,
  laughL: 0,
  laughR: 0,
  eyeScale: 1,
  eyeY: 0,
  heavy: 0,
  droop: 0,
  smile: 0.4,
  mouth: 0,
  mouthW: 1,
  mouthX: 0,
  skew: 0,
  taper: 0,
  blush: 0,
  gazeX: Number.NaN,
  gazeY: Number.NaN,
  wobble: 0,
  bob: 0,
  tilt: 0,
  spin: 1
};
var EXPRESSIONS = {
  neutral: BASE,
  // Real smiles reach the eyes: the cheeks push the lower lids up into a soft curve.
  happy: { ...BASE, openL: 0.9, openR: 0.9, laughL: 0.45, laughR: 0.45, smile: 1, wobble: 0.15, bob: -0.3 },
  // Lovestruck: soft, half-melted eyes drifting up and to the left, daydreaming, a full smile and flushed cheeks.
  love: {
    ...BASE,
    openL: 0.88,
    openR: 0.88,
    laughL: 0.55,
    laughR: 0.55,
    eyeScale: 1.03,
    smile: 1,
    mouthW: 0.9,
    blush: 1,
    gazeX: -0.6,
    gazeY: -0.7,
    wobble: 0.12,
    bob: -0.2,
    tilt: -3,
    spin: 0.7
  },
  laugh: { ...BASE, openL: 0.9, openR: 0.9, laughL: 0.5, laughR: 0.5, smile: 1, mouth: 0.1, wobble: 0.3, spin: 1.4 },
  surprised: {
    ...BASE,
    openL: 1.03,
    openR: 1.03,
    eyeScale: 1.07,
    eyeY: -0.5,
    smile: 0,
    mouth: 1,
    mouthW: 0.95,
    wobble: 0.12,
    bob: -0.6
  },
  sad: {
    ...BASE,
    openL: 0.75,
    openR: 0.75,
    eyeScale: 0.92,
    droop: 0.85,
    eyeY: 0.5,
    smile: -1,
    mouthW: 1.75,
    gazeX: 0,
    gazeY: 0.75,
    bob: 0.8,
    tilt: -4,
    spin: 0.35
  },
  thinking: {
    ...BASE,
    openL: 0.95,
    openR: 0.8,
    heavy: 0.2,
    smile: 0.1,
    mouthW: 0.6,
    mouthX: 0.9,
    skew: 0.5,
    tilt: 5,
    spin: 0.6
  },
  sleepy: {
    ...BASE,
    openL: 0.6,
    openR: 0.6,
    heavy: 0.65,
    eyeY: 0.5,
    smile: -0.04,
    mouthW: 0.8,
    taper: 0.3,
    gazeX: 0,
    gazeY: 0.6,
    bob: 0.5,
    spin: 0.3
  },
  wink: { ...BASE, smile: 0.9, skew: 0.1, tilt: 2, wobble: 0.1 }
};
var SETTLE = { surprised: 16, sad: 3.5, sleepy: 2.5 };
var KEYS = Object.keys(BASE);
var still = () => ({
  dy: 0,
  sy: 0,
  tilt: 0,
  faceY: 0,
  scale: 0,
  openL: 1,
  openR: 1,
  laughL: 0,
  laughR: 0,
  mouth: 0,
  smile: 0,
  width: 1,
  skew: 0,
  mouthX: 0,
  yawn: 0,
  blink: 0,
  steady: false,
  gaze: null
});
var PONDER = [
  [0.75, -0.85],
  [0.4, -1],
  [-0.35, -0.85]
];
function act(emotion, age, now) {
  const a = still();
  switch (emotion) {
    case "happy": {
      if (age < 520) a.dy = -1.6 * Math.abs(Math.sin(Math.PI * 2 * age / 520));
      a.tilt = 3 * Math.sin(Math.PI * 2 * age / 3600);
      const beam = hold(age % 3600, 1600, 1900, 2500, 2900);
      a.laughL = a.laughR = 0.3 * beam;
      a.mouth = 0.22 * beam;
      a.dy -= 0.6 * beam;
      break;
    }
    case "love": {
      if (age < 600) a.dy = -1.4 * bump(age, 0, 600);
      a.tilt = 5 * Math.sin(Math.PI * 2 * age / 4e3);
      const sigh = hold(age % 4e3, 1400, 1900, 2500, 3200);
      a.laughL = a.laughR = 0.3 * sigh;
      a.scale += 0.05 * sigh;
      a.sy += 0.03 * sigh;
      a.dy -= 0.8 * sigh;
      a.mouth += 0.1 * sigh;
      break;
    }
    case "laugh": {
      const L = 5600;
      const n = Math.floor(age / L);
      const c = age % L;
      const lean = hash2(n) < 0.5 ? -1 : 1;
      const inhale = bump(c, 0, 340);
      a.dy -= 1.2 * inhale;
      a.sy += 0.04 * inhale;
      a.scale += 0.1 * inhale;
      a.laughL = a.laughR = -0.5 * inhale;
      a.mouth += 0.25 * inhale;
      const shut = hold(c, 220, 380, 3e3, 3700);
      a.laughL += 0.5 * shut;
      a.laughR += 0.5 * shut;
      a.mouth += 0.25 * hold(c, 220, 400, 3400, 4400);
      if (c > 260 && c < 2900) {
        const q = (c - 260) / 2640;
        const phase = 15 * q - 3 * q * q;
        const ha = Math.abs(Math.sin(Math.PI * phase)) ** 0.8;
        const amp = (1 - 0.7 * q) * (0.6 + 0.4 * hash2(n * 17 + Math.floor(phase))) * smoothstep(Math.min(1, (c - 260) / 120));
        a.mouth += 0.6 * ha * amp;
        a.dy -= 1.4 * ha * amp;
        a.sy -= 0.035 * ha * amp;
        a.scale -= 0.1 * ha * amp;
        a.tilt += 2.5 * ha * amp * lean;
      } else if (c >= 2900 && c < 4300) {
        const q = (c - 2900) / 1400;
        const ha = Math.abs(Math.sin(Math.PI * q * 4.2));
        const amp = 0.4 * (1 - q);
        a.mouth += 0.4 * ha * amp;
        a.dy -= 0.8 * ha * amp;
      }
      a.tilt -= 7 * lean * hold(c, 260, 600, 1800, 2900);
      a.sy -= 0.02 * bump(c, 4300, 5300);
      if (c > 4300) a.gaze = [0, 0];
      a.steady = c < 3600;
      break;
    }
    case "surprised": {
      const startle = age < 900 ? age < 120 ? smoothstep(age / 120) : 1 - smoothstep((age - 120) / 780) : 0;
      a.scale += 0.12 * startle;
      a.dy -= 3 * bump(age, 0, 420);
      a.sy += 0.06 * bump(age, 0, 380);
      a.mouth += 0.3 * startle;
      a.steady = age < 1800;
      const g = age < 600 ? -1 : (age - 600) % 4200;
      const left = hold(g, 300, 380, 640, 720);
      const right = hold(g, 700, 780, 1090, 1170);
      a.gaze = g >= 300 && g < 700 ? [-0.85, -0.1] : g >= 700 && g < 1150 ? [0.85, -0.1] : [0, 0];
      a.tilt += -3 * left + 3 * right;
      a.blink = Math.max(bump(g, 1700, 1850), bump(g, 1950, 2100));
      const close = smoothstep(clamp01((age - 2600) / 900));
      a.mouth -= 0.45 * close;
      a.width *= 1 - 0.2 * close;
      break;
    }
    case "sad": {
      const c = age % 7e3;
      a.sy -= 0.045 * bump(c, 0, 1400);
      a.dy += 0.5 * hold(c, 700, 1100, 1800, 2400);
      const up = hold(c, 3e3, 3200, 3800, 4100);
      a.gaze = [0, 0.75 - 0.9 * up];
      a.openL = a.openR = 1 + 0.15 * up;
      a.dy -= 0.4 * up;
      const quiver = hold(c, 4400, 4600, 5300, 5600);
      a.skew += 0.12 * Math.sin(now / 40) * quiver;
      a.mouth += 0.05 * quiver;
      a.smile -= 0.15 * quiver;
      a.tilt += 1.5 * Math.sin(now / 2200);
      break;
    }
    case "thinking": {
      const c = age % 6400;
      a.gaze = c < 1200 ? PONDER[0] : c < 2400 ? PONDER[1] : PONDER[2];
      const hmm = hold(c, 1200, 1500, 2100, 2400);
      a.mouthX -= 1.8 * hmm;
      a.skew -= hmm;
      a.tilt -= 9 * hmm;
      const idea = hold(c, 4100, 4250, 5600, 6200);
      if (idea > 0.3) a.gaze = [0, 0];
      a.openL *= 1 + 0.2 * idea;
      a.openR *= 1 + 0.4 * idea;
      a.scale += 0.08 * idea;
      a.smile += 0.8 * idea;
      a.mouthX -= 0.9 * idea;
      a.skew -= 0.5 * idea;
      a.width *= 1 + 0.5 * idea;
      a.mouth += 0.15 * idea;
      a.tilt -= 5 * idea;
      a.dy -= 1.6 * bump(c, 4100, 4500);
      a.tilt += 1.5 * Math.sin(now / 900);
      break;
    }
    case "sleepy": {
      const c = age % 9200;
      const drift = c < 3e3 ? smoothstep(c / 3e3) : c < 3200 ? 1 - smoothstep((c - 3e3) / 200) : 0;
      a.openL = a.openR = 1 - 0.8 * drift;
      a.dy += 1.6 * drift;
      a.tilt += 6 * drift;
      a.gaze = [0, 0.6 + 0.4 * drift];
      const jolt = bump(c, 3e3, 3350);
      a.openL *= 1 + 0.9 * jolt;
      a.openR *= 1 + 0.9 * jolt;
      a.dy -= 1.4 * jolt;
      a.scale += 0.1 * jolt;
      if (c >= 3e3 && c < 4200) a.gaze = [0, 0];
      a.blink = Math.max(bump(c, 3550, 3780), bump(c, 3900, 4130));
      a.yawn = hold(c, 5400, 6200, 6800, 7600);
      a.tilt += 2 * Math.sin(now / 1700);
      a.steady = c < 3e3;
      break;
    }
    case "wink": {
      const c = age % 3200;
      let w = 0;
      if (c > 150 && c < 950) {
        const q = (c - 150) / 800;
        w = q < 0.2 ? smoothstep(q / 0.2) : q < 0.75 ? 1 : 1 - smoothstep((q - 0.75) / 0.25);
      }
      a.laughR += w;
      a.laughL += 0.25 * w;
      a.openL *= 1 - 0.12 * w;
      a.skew += 0.45 * w;
      a.smile += 0.1 * w;
      a.tilt += 5 * w;
      a.dy -= 0.9 * bump(c, 150, 450);
      if (w > 0) a.gaze = [0, 0];
      a.steady = w > 0;
      break;
    }
  }
  return a;
}
var MOTION_MS = {
  jump: 950,
  spin: 600,
  bounce: 1200,
  wiggle: 800,
  float: 2200
};
var FLOAT = 4.5;
var REST = { dy: 0, rot: 0, sx: 1, sy: 1, yaw: 0, joy: 0, gaze: null };
function pose(motion, ms) {
  const p = clamp01(ms / MOTION_MS[motion]);
  switch (motion) {
    case "jump": {
      if (ms < 160) {
        const q = smoothstep(ms / 160);
        return { ...REST, sx: 1 + 0.1 * q, sy: 1 - 0.14 * q, joy: q * 0.6 };
      }
      if (ms < 560) {
        const q = (ms - 160) / 400;
        const stretch = 0.09 * Math.abs(Math.cos(Math.PI * q));
        return { ...REST, dy: -11 * 4 * q * (1 - q), sx: 1 - stretch * 0.6, sy: 1 + stretch, joy: 1 };
      }
      const r = (ms - 560) / 390;
      const squash = 0.16 * Math.exp(-5 * r) * Math.cos(10 * r);
      return { ...REST, sx: 1 + squash * 0.7, sy: 1 - squash, joy: 1 - smoothstep(r) };
    }
    case "spin": {
      if (ms < 90) {
        const q = smoothstep(ms / 90);
        return { ...REST, yaw: -30 * q, sx: 1 + 0.06 * q, sy: 1 - 0.08 * q, joy: 0.3 * q, gaze: [-0.6 * q, 0] };
      }
      if (ms < 440) {
        const q = (ms - 90) / 350;
        const hop = Math.sin(Math.PI * q) ** 2;
        const crouch = 1 - smoothstep(Math.min(1, q * 4));
        return {
          ...REST,
          yaw: -30 + 390 * easeInOut(q),
          dy: -2.6 * hop,
          sx: 1 + 0.06 * crouch,
          sy: 1 - 0.08 * crouch + 0.04 * hop,
          joy: 0.8,
          gaze: [0.8 * hop, 0]
        };
      }
      const r = (ms - 440) / 160;
      const squash = 0.025 * Math.sin(Math.PI * r) * (1 - r);
      return { ...REST, yaw: 360, sx: 1 + squash * 0.7, sy: 1 - squash, joy: 0.8 * (1 - r) };
    }
    case "bounce": {
      const hop = Math.abs(Math.sin(Math.PI * 3 * p));
      const squash = 0.08 * (1 - hop) ** 6;
      return { ...REST, dy: -5 * hop, sx: 1 + squash * 0.8, sy: 1 - squash, joy: Math.sin(Math.PI * p) };
    }
    case "wiggle":
      return { ...REST, rot: 14 * Math.sin(Math.PI * 8 * p) * (1 - p), joy: 0.6 * Math.sin(Math.PI * p) };
    case "float": {
      const down = [0, 0.9];
      if (ms < 520) {
        const q = ms / 520;
        const s = 0.05 * Math.sin(Math.PI * q);
        return { ...REST, dy: -FLOAT * easeOut(q), sx: 1 - s * 0.6, sy: 1 + s, joy: 0.5 * q, gaze: q > 0.4 ? down : null };
      }
      if (ms < 1500) {
        const h = (ms - 520) / 980;
        return { ...REST, dy: -FLOAT + 0.8 * Math.sin(Math.PI * 3 * h), rot: 4 * Math.sin(Math.PI * 2 * h), joy: 0.5, gaze: down };
      }
      if (ms < 1820) {
        const q = (ms - 1500) / 320;
        return { ...REST, dy: -FLOAT * (1 - q * q), sx: 1 - 0.02 * q, sy: 1 + 0.04 * q, joy: 0.5, gaze: down };
      }
      const r = (ms - 1820) / 380;
      const squash = 0.12 * Math.exp(-5 * r) * Math.cos(10 * r) * (1 - r);
      return { ...REST, sx: 1 + squash * 0.7, sy: 1 - squash, joy: 0.5 * (1 - r) };
    }
  }
}
var AI_BOT_SVG = {
  viewBox: "-24 -24 48 48",
  body: ROUND_BODY,
  eyes: EYES.map((x) => eyePath(x, EYE_Y, 1, 0, 1, 0, 0)),
  blush: EYES.map((x) => ({ cx: x * 1.6, cy: EYE_Y + 4.6 })),
  mouth: mouthPath(0, MOUTH_Y, 0, 0.4, 1, 0),
  groundY: GROUND_Y,
  heart: HEART,
  hearts: HEARTS
};
var resolve = (o) => ({
  emotion: o.emotion ?? "neutral",
  activity: o.activity ?? "idle",
  shape: o.shape ?? "pebble",
  lookAround: o.lookAround ?? true,
  followCursor: o.followCursor ?? false,
  hoverGiggle: o.hoverGiggle ?? true
});
function createAiBot(els, options = {}) {
  const state = {
    config: resolve(options),
    playing: options.motion ? { name: options.motion, start: performance.now() } : null,
    morph: null,
    onMotionEnd: options.onMotionEnd,
    onTickle: options.onTickle,
    tickledAt: -Infinity,
    chuckledAt: -Infinity
  };
  const radii = new Float32Array(POINTS).fill(1);
  let shown = state.config.shape;
  let motionNow = options.motion ?? null;
  let motionKeyNow = options.motionKey ?? 0;
  let heard = options.chuckleKey ?? 0;
  const onEnter = () => {
    const now = performance.now();
    if (state.config.hoverGiggle && now - state.tickledAt > 1300) {
      state.tickledAt = now;
      state.onTickle?.();
    }
  };
  els.mover.addEventListener("pointerenter", onEnter);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pointer = null;
  const onMove = (e) => {
    pointer = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
  };
  const onLeave = () => {
    pointer = null;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  const cur = { ...EXPRESSIONS[state.config.emotion] };
  const phase = Math.random() * 1e3;
  let raf = 0;
  let last = performance.now();
  let gx = 0;
  let gy = 0;
  let tx = 0;
  let ty = 0;
  let nextGaze = last + 600 + Math.random() * 1800;
  let blinkAt = last + 800 + Math.random() * 2600;
  let blinkStart = -1;
  let second = false;
  let grinAt = -Infinity;
  let mgx = 0;
  let mgy = 0;
  let nextGrin = last + 4e3 + Math.random() * 4e3;
  let spin = Math.random() * 360;
  let seat = R0;
  let footX = 0;
  let footW = 7;
  let level = 0;
  let jaw = 0;
  let syllable = 0;
  let syllableRate = 5.5;
  let syllableAmp = 1;
  let vowel = 1;
  let wordEnds = 0;
  let gapEnds = 0;
  let wordsLeft = 6;
  let pausing = false;
  let stressAt = -Infinity;
  let nextNod = last + 900;
  let nodStart = -Infinity;
  let nods = 0;
  let felt = null;
  let feltAt = last;
  let lovedFrom = -Infinity;
  let lovedUntil = -Infinity;
  const frame = (now) => {
    const dt = Math.min(0.064, (now - last) / 1e3);
    last = now;
    const t = reduce ? 0 : now / 1e3 + phase;
    const cfg = state.config;
    if (cfg.emotion !== felt) {
      if (felt === "love") lovedUntil = now;
      felt = cfg.emotion;
      feltAt = now;
      if (felt === "love") {
        lovedFrom = now;
        lovedUntil = Infinity;
      }
    }
    const age = now - feltAt;
    const target = EXPRESSIONS[felt];
    const k = Math.min(1, dt * (SETTLE[felt] ?? 8));
    for (const key of KEYS) {
      const goal = target[key];
      if (Number.isNaN(goal)) cur[key] = Number.NaN;
      else if (Number.isNaN(cur[key])) cur[key] = goal;
      else cur[key] += (goal - cur[key]) * k;
    }
    const a = reduce ? still() : act(felt, age, now);
    let levelTarget = 0;
    let talkTarget = 0;
    if (cfg.activity === "speaking") {
      if (now > gapEnds && now > wordEnds) {
        wordEnds = now + 160 + Math.random() * 260;
        wordsLeft -= 1;
        pausing = wordsLeft <= 0;
        gapEnds = wordEnds + (pausing ? 520 + Math.random() * 420 : 60 + Math.random() * 120);
        if (pausing) wordsLeft = 4 + Math.floor(Math.random() * 5);
        if (Math.random() < 0.3) stressAt = now;
      }
      const inWord = now < wordEnds;
      levelTarget = inWord ? 0.55 + 0.35 * Math.abs(Math.sin(now / 70)) : 0;
      if (inWord) {
        syllable += dt * syllableRate * Math.PI * 2;
        if (syllable >= Math.PI * 2) {
          syllable -= Math.PI * 2;
          syllableRate = 4.6 + Math.random() * 2;
          syllableAmp = Math.random() < 0.18 ? 0.12 : 0.55 + Math.random() * 0.45;
          vowel = Math.random() < 0.4 ? 0.62 + Math.random() * 0.12 : 1 + Math.random() * 0.2;
        }
        talkTarget = Math.min(1, (0.35 + level) * syllableAmp * (0.5 - 0.5 * Math.cos(syllable)));
      } else {
        syllable = 0;
      }
      const stress = bump(now - stressAt, 0, 280);
      a.dy -= 0.7 * stress;
      a.scale += 0.06 * stress;
    } else if (cfg.activity === "listening") {
      levelTarget = 0.18 + 0.14 * Math.sin(now / 240) * Math.sin(now / 610);
    }
    level += (levelTarget - level) * Math.min(1, dt * 12);
    jaw += (talkTarget - jaw) * Math.min(1, dt * (talkTarget > jaw ? 30 : 20));
    let move = REST;
    const play = state.playing;
    if (play && !reduce) {
      const ms = now - play.start;
      if (ms >= MOTION_MS[play.name]) {
        state.playing = null;
        state.onMotionEnd?.(play.name);
      } else {
        move = pose(play.name, ms);
      }
    }
    const listening = cfg.activity === "listening" ? 1 : 0;
    if (listening && !play && now > nextNod) {
      nodStart = now;
      nods += 1;
      nextNod = now + 2400 + Math.random() * 1800;
    }
    if (listening && !reduce) {
      const n = now - nodStart;
      if (nods % 3 === 0) {
        const oh = hold(n, 0, 160, 700, 1e3);
        a.scale += 0.08 * oh;
        a.faceY -= 0.6 * oh;
        a.mouth += 0.18 * oh;
        a.smile -= 0.3 * oh;
        a.dy -= 0.5 * oh;
      } else {
        const dip = bump(n, 0, 300) + 0.7 * bump(n, 340, 640);
        a.dy += 1.6 * dip;
        a.faceY += 1.2 * dip;
        a.sy -= 0.02 * dip;
        a.openL *= 1 - 0.15 * dip;
        a.openR *= 1 - 0.15 * dip;
        a.smile += 0.1 * dip;
      }
      a.tilt += 4 + 1.5 * Math.sin(now / 2600);
    }
    let watching = false;
    const box = cfg.followCursor && pointer ? els.svg.getBoundingClientRect() : void 0;
    if (pointer && box && box.width > 0) {
      const dx = pointer.x - (box.left + box.width / 2);
      const dy2 = pointer.y - (box.top + box.height / 2);
      const reach = box.width * 0.9;
      watching = true;
      tx = dx / (Math.abs(dx) + reach);
      ty = dy2 / (Math.abs(dy2) + reach);
      nextGaze = now + 700;
    }
    const scripted = move.gaze ?? a.gaze;
    if (!watching) {
      if (scripted) {
        tx = scripted[0];
        ty = scripted[1];
      } else if (!Number.isNaN(cur.gazeX)) {
        tx = cur.gazeX;
        ty = cur.gazeY;
      } else if (now > nextGaze) {
        if (cfg.activity === "listening") {
          tx = (Math.random() - 0.5) * 0.3;
          ty = -0.05 + (Math.random() - 0.5) * 0.15;
        } else if (cfg.activity === "speaking") {
          tx = pausing ? Math.random() < 0.5 ? -0.7 : 0.7 : (Math.random() - 0.5) * 0.5;
          ty = pausing ? -0.5 : (Math.random() - 0.5) * 0.3;
        } else if (cfg.lookAround) {
          tx = [-1, -0.6, 0, 0, 0.6, 1][Math.floor(Math.random() * 6)];
          ty = (Math.random() - 0.5) * 1.2;
        } else {
          tx = 0;
          ty = 0;
        }
        nextGaze = now + (cfg.activity === "speaking" ? 500 + Math.random() * 900 : 900 + Math.random() * 2300);
      }
    }
    const ease = Math.min(1, dt * (watching ? 14 : 16));
    gx += (tx - gx) * ease;
    gy += (ty - gy) * ease;
    const lag = Math.min(1, dt * 5);
    mgx += (gx - mgx) * lag;
    mgy += (gy - mgy) * lag;
    if (a.steady && blinkStart < 0) blinkAt = Math.max(blinkAt, now + 400);
    if (blinkStart < 0 && now > blinkAt) blinkStart = now;
    let blink = 1;
    if (blinkStart >= 0) {
      const p = (now - blinkStart) / (felt === "sleepy" ? 460 : felt === "sad" ? 280 : 170);
      if (p >= 1) {
        blinkStart = -1;
        if (!second && Math.random() < 0.22) {
          second = true;
          blinkAt = now + 90;
        } else {
          second = false;
          blinkAt = now + 2e3 + Math.random() * 3200;
        }
      } else {
        blink = 1 - Math.sin(p * Math.PI) * 0.88;
      }
    }
    blink *= 1 - a.blink * 0.9;
    const since = now - state.tickledAt;
    let tickle = 0;
    let wiggle = 0;
    if (cfg.hoverGiggle && since < 1300) {
      tickle = since < 180 ? smoothstep(since / 180) : since < 800 ? 1 : 1 - smoothstep((since - 800) / 500);
      wiggle = Math.sin(since / 42) * Math.max(0, 1 - since / 520);
    }
    const heardFor = now - state.chuckledAt;
    const amused = heardFor > 0 && heardFor < 1700 ? 0.45 * hold(heardFor, 0, 260, 1e3, 1700) : 0;
    tickle = Math.max(tickle, amused);
    if (felt === "neutral" && cfg.activity === "idle" && now > nextGrin) {
      grinAt = now;
      nextGrin = now + 5e3 + Math.random() * 6e3;
    }
    const grinning = felt === "neutral" ? hold(now - grinAt, 0, 380, 1100, 1600) : 0;
    const sleepy = felt === "sleepy" ? 1 : 0;
    const yawn = a.yawn;
    const shapeNow = cfg.shape;
    const wob = cur.wobble + level * 0.6 + tickle * 0.25;
    const snap = shapeNow === "squircle" ? 90 : shapeNow === "blob" ? 120 : shapeNow === "pebble" ? 72 : 0;
    const rate = snap ? 0 : 3.5 + level * 18;
    spin = reduce ? spin : (spin + dt * rate * cur.spin) % 360;
    if (snap) spin += (Math.round(spin / snap) * snap - spin) * Math.min(1, dt * 4);
    const m = state.morph;
    const mix = m ? smoothstep(clamp01((now - m.start) / MORPH_MS)) : 1;
    const turn = spin * Math.PI / 180;
    const r = radii;
    for (let i = 0; i < POINTS; i++) {
      const live = radius(shapeNow, i / POINTS * Math.PI * 2 - turn, t, wob);
      r[i] = m && mix < 1 ? m.from[i] + (live - m.from[i]) * mix : live;
    }
    if (m && mix >= 1) state.morph = null;
    const breathe = reduce ? 0 : sleepy ? 0.03 * Math.sin(t / 1.1) : 0.015 * Math.sin(t / 0.9);
    const swell = 1 + breathe + level * 0.04;
    els.body.setAttribute("d", bodyPath(r));
    els.bodyGroup.setAttribute("transform", `scale(${swell.toFixed(4)})`);
    const yaw = move.yaw * Math.PI / 180;
    const bob = cur.bob + sleepy * 0.4 * Math.sin(now / 1100) - tickle * 0.5 + jaw * 0.25 - yawn * 0.5;
    const rot = cur.tilt + a.tilt + wiggle * 4 + move.rot;
    const dy = move.dy + bob + a.dy;
    const rise = Math.min(0, dy);
    const slump = 0.7 * Math.max(0, dy) / (2 * R0);
    const sy = move.sy * (1 + a.sy + yawn * 0.03) * (1 - slump);
    const sx = move.sx * (1 - (a.sy + yawn * 0.03) * 0.5) * (1 - 0.04 * Math.abs(Math.sin(yaw))) * (1 + slump * 0.5);
    const tilt = rot * Math.PI / 180;
    let low = 0;
    for (let i = 0; i < POINTS; i++) low = Math.max(low, r[i] * Math.sin(i / POINTS * Math.PI * 2 + tilt));
    low *= R0 * swell;
    let left = Infinity;
    let right = -Infinity;
    for (let i = 0; i < POINTS; i++) {
      const th = i / POINTS * Math.PI * 2 + tilt;
      const k2 = r[i] * R0 * swell;
      if (k2 * Math.sin(th) < low - 2.2) continue;
      left = Math.min(left, k2 * Math.cos(th));
      right = Math.max(right, k2 * Math.cos(th));
    }
    seat += (low - seat) * Math.min(1, dt * 12);
    els.mover.setAttribute(
      "transform",
      `translate(0 ${rise.toFixed(2)}) translate(0 ${R0}) scale(${sx.toFixed(4)} ${sy.toFixed(4)}) translate(0 ${(-seat).toFixed(2)}) rotate(${rot.toFixed(2)})`
    );
    const height = clamp01(-rise / 10);
    const foot = (right - left) / 2 * sx;
    const under = (left + right) / 2 * sx;
    footX += (under - footX) * Math.min(1, dt * 12);
    footW += (foot - footW) * Math.min(1, dt * 12);
    const ground = els.ground;
    if (ground) {
      ground.setAttribute("cx", (footX * (1 - height)).toFixed(2));
      ground.setAttribute("rx", ((footW + 3.2) * (1 + 0.25 * height)).toFixed(2));
      ground.setAttribute("ry", (2 * (1 + 0.2 * height)).toFixed(2));
      ground.setAttribute("opacity", ((1 - 0.65 * height) * (0.9 + 2 * slump)).toFixed(3));
    }
    const core = els.core;
    if (core) {
      core.setAttribute("cx", footX.toFixed(2));
      core.setAttribute("rx", (footW * 0.95 * (1 - 0.4 * height)).toFixed(2));
      core.setAttribute("ry", (0.85 * (1 - 0.3 * height)).toFixed(2));
      core.setAttribute("opacity", ((1 - height) ** 2 * (0.9 + 3 * slump)).toFixed(3));
    }
    const face = els.face;
    if (face) {
      const front = Math.cos(yaw);
      face.setAttribute(
        "transform",
        `translate(${(Math.sin(yaw) * R0 * 0.72).toFixed(2)} 0) scale(${Math.max(1e-3, Math.abs(front)).toFixed(3)} 1)`
      );
      face.setAttribute("opacity", smoothstep(clamp01((front + 0.1) / 0.35)).toFixed(3));
    }
    const gone = 1 - smoothstep(clamp01((now - lovedUntil) / 200));
    els.hearts.forEach((heart, i) => {
      if (!heart) return;
      const since2 = now - lovedFrom - 250 - i * (HEART_EVERY / HEARTS);
      const n = Math.floor(since2 / HEART_EVERY);
      const p = (since2 - n * HEART_EVERY) / HEART_LIFE;
      const born = lovedFrom + 250 + i * (HEART_EVERY / HEARTS) + n * HEART_EVERY;
      if (reduce || !(since2 >= 0 && since2 < Infinity) || p >= 1 || born > lovedUntil || gone <= 0) {
        heart.setAttribute("opacity", "0");
        return;
      }
      const side = (i + n) % 2 ? 1 : -1;
      const seed = hash2(n * HEARTS + i);
      const x = side * (12 + 1.5 * seed + 2 * p) + 0.9 * Math.sin(Math.PI * 2 * (1.1 * p + seed));
      const y = rise - 4 - seed * 2 - 14 * easeOut(p);
      const grow = (0.75 + 0.35 * seed) * (0.5 + 0.5 * smoothstep(clamp01(p / 0.18)));
      const sway = side * 10 + 14 * Math.sin(Math.PI * 2 * (0.9 * p + seed));
      heart.setAttribute(
        "transform",
        `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${sway.toFixed(1)}) scale(${grow.toFixed(3)})`
      );
      heart.setAttribute(
        "opacity",
        (gone * smoothstep(clamp01(p / 0.12)) * (1 - smoothstep(clamp01((p - 0.55) / 0.45)))).toFixed(3)
      );
    });
    const joy = Math.max(move.joy, grinning);
    const look = 1 - tickle;
    const base2 = Math.min(1, cur.smile + a.smile + (1 - cur.smile) * joy + listening * 0.15);
    const smile = Math.max(-1, (base2 + (1 - base2) * tickle) * (1 - yawn));
    const squint = 1 - 0.18 * Math.max(0, (smile - 0.6) / 0.4);
    const opens = [cur.openL * a.openL, cur.openR * a.openR];
    const laughs = [cur.laughL + a.laughL, cur.laughR + a.laughR];
    els.eyes.forEach((eye, i) => {
      if (!eye) return;
      const x = EYES[i] + gx * 1.8 * look;
      const y = EYE_Y + cur.eyeY + a.faceY + gy * 1.1 * look;
      const curl = clamp01(Math.max(laughs[i], tickle, move.joy * 0.8));
      const outer = Math.min(0.9, cur.heavy + cur.droop);
      const inner = Math.min(0.9, cur.heavy);
      const open = opens[i] * blink * squint * (1 - yawn * 0.85);
      eye.setAttribute(
        "d",
        eyePath(x, y, open, curl, cur.eyeScale + a.scale + listening * 0.04, i === 0 ? outer : inner, i === 0 ? inner : outer)
      );
      eye.setAttribute("stroke-width", (curl * 0.7).toFixed(2));
      const cheek = els.blush[i];
      if (cheek) {
        cheek.setAttribute("cx", (EYES[i] * 1.6 + gx * 1.2 * look).toFixed(2));
        cheek.setAttribute("cy", (EYE_Y + 4.6 + a.faceY + gy * 0.7 * look).toFixed(2));
        cheek.setAttribute("opacity", clamp01(cur.blush).toFixed(3));
      }
    });
    const giggle = tickle * (0.3 + 0.25 * Math.abs(Math.sin(now / 85)));
    const mouthW = cur.mouthW * a.width * (1 + (vowel - 1) * jaw) * (1 - yawn * 0.1);
    const lip = clamp01(-smile + cur.taper * (1 - yawn));
    const mouth = els.mouth;
    if (mouth) {
      mouth.setAttribute(
        "d",
        mouthPath(
          (cur.mouthX + a.mouthX) * (1 - yawn) + mgx * 1.2 * look,
          MOUTH_Y + cur.eyeY * 0.5 + a.faceY + mgy * 0.6 * look,
          Math.max(0, cur.mouth + a.mouth, jaw, giggle, move.joy * 0.35, yawn * 2.1),
          smile,
          mouthW,
          (cur.skew + a.skew) * (1 - yawn),
          0.9 * lip
        )
      );
      const fine = Math.min(1, 0.55 + 0.45 * mouthW);
      mouth.setAttribute("stroke-width", (1.4 * fine * (1 - 0.6 * lip)).toFixed(2));
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  const stop2 = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
  };
  return {
    update(next) {
      state.config = resolve(next);
      state.onMotionEnd = next.onMotionEnd;
      state.onTickle = next.onTickle;
      if (state.config.shape !== shown) {
        shown = state.config.shape;
        state.morph = { from: radii.slice(), start: performance.now() };
      }
      const motion = next.motion ?? null;
      const key = next.motionKey ?? 0;
      if (motion !== motionNow || key !== motionKeyNow) {
        motionNow = motion;
        motionKeyNow = key;
        state.playing = motion ? { name: motion, start: performance.now() } : null;
      }
      const chuckle = next.chuckleKey ?? 0;
      if (chuckle !== heard) {
        heard = chuckle;
        state.chuckledAt = performance.now() + 140 + Math.random() * 160;
      }
    },
    destroy() {
      stop2();
      els.mover.removeEventListener("pointerenter", onEnter);
    }
  };
}

// src/ui/BotAvatar.jsx
import { jsx, jsxs } from "react/jsx-runtime";
function BotAvatar({ colors, size = 24, label = "Agent", emotion = "neutral", activity = "idle", shape = "pebble", motion, motionKey, lookAround = false, hoverGiggle = true, className = "" }) {
  const gradId = `hui-bot-${useId().replace(/:/g, "")}`;
  const refs = {
    svg: useRef(null),
    mover: useRef(null),
    bodyGroup: useRef(null),
    body: useRef(null),
    face: useRef(null),
    mouth: useRef(null),
    ground: useRef(null),
    core: useRef(null)
  };
  const eyes = useRef([]);
  const blush = useRef([]);
  const hearts = useRef([]);
  const bot = useRef(null);
  const options = { emotion, activity, shape, lookAround, hoverGiggle, ...motion ? { motion, motionKey } : {} };
  const latest = useRef(options);
  useEffect(() => {
    latest.current = options;
    bot.current?.update?.(options);
  });
  useEffect(() => {
    const els = Object.fromEntries(Object.entries(refs).map(([k, r]) => [k, r.current]));
    if (Object.values(els).some((v) => !v)) return void 0;
    try {
      bot.current = createAiBot({ ...els, eyes: eyes.current, blush: blush.current, hearts: hearts.current }, latest.current);
    } catch {
      bot.current = null;
    }
    return () => {
      bot.current?.destroy?.();
      bot.current = null;
    };
  }, []);
  const style = { "--bot-size": `${size}px`, ...colors ? { "--bot-1": colors[0], "--bot-2": colors[1] } : null };
  return /* @__PURE__ */ jsx("span", { className: `hui-bot ${className}`, style, role: "img", "aria-label": label, children: /* @__PURE__ */ jsxs("svg", { ref: refs.svg, viewBox: AI_BOT_SVG.viewBox, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxs("defs", { children: [
      /* @__PURE__ */ jsxs("radialGradient", { id: gradId, gradientUnits: "userSpaceOnUse", cx: "-4.8", cy: "-6.4", r: "24", children: [
        /* @__PURE__ */ jsx("stop", { className: "stop1", offset: "0" }),
        /* @__PURE__ */ jsx("stop", { className: "stop2", offset: "1" })
      ] }),
      /* @__PURE__ */ jsx("filter", { id: `${gradId}-soft`, x: "-50%", y: "-300%", width: "200%", height: "700%", children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "1.3" }) }),
      /* @__PURE__ */ jsx("filter", { id: `${gradId}-core`, x: "-50%", y: "-300%", width: "200%", height: "700%", children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "0.8" }) }),
      /* @__PURE__ */ jsx("filter", { id: `${gradId}-blush`, x: "-100%", y: "-100%", width: "300%", height: "300%", children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "0.55" }) })
    ] }),
    /* @__PURE__ */ jsx("ellipse", { ref: refs.ground, className: "ground", cx: "0", cy: AI_BOT_SVG.groundY, rx: "10", ry: "2.1", filter: `url(#${gradId}-soft)` }),
    /* @__PURE__ */ jsx("ellipse", { ref: refs.core, className: "core", cx: "0", cy: AI_BOT_SVG.groundY, rx: "6.5", ry: "0.9", filter: `url(#${gradId}-core)` }),
    /* @__PURE__ */ jsxs("g", { ref: refs.mover, children: [
      /* @__PURE__ */ jsx("g", { ref: refs.bodyGroup, children: /* @__PURE__ */ jsx("path", { ref: refs.body, d: AI_BOT_SVG.body, fill: `url(#${gradId})` }) }),
      /* @__PURE__ */ jsxs("g", { ref: refs.face, children: [
        AI_BOT_SVG.blush.map((b, i) => /* @__PURE__ */ jsx("ellipse", { ref: (n) => {
          blush.current[i] = n;
        }, className: "blush", cx: b.cx, cy: b.cy, rx: "1.9", ry: "1.1", opacity: "0", filter: `url(#${gradId}-blush)` }, `b${i}`)),
        AI_BOT_SVG.eyes.map((d, i) => /* @__PURE__ */ jsx("path", { ref: (n) => {
          eyes.current[i] = n;
        }, className: "face", d, strokeWidth: 0, strokeLinejoin: "round" }, `e${i}`)),
        /* @__PURE__ */ jsx("path", { ref: refs.mouth, className: "face", d: AI_BOT_SVG.mouth, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" })
      ] })
    ] }),
    Array.from({ length: AI_BOT_SVG.hearts }, (_, i) => /* @__PURE__ */ jsx("path", { ref: (n) => {
      hearts.current[i] = n;
    }, className: "heart", d: AI_BOT_SVG.heart, opacity: "0" }, i))
  ] }) });
}

// src/ui/icons.jsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var base = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
var IconPencil = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("path", { d: "M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" }),
  /* @__PURE__ */ jsx2("path", { d: "m13.5 6.5 4 4" })
] });
var IconGear = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "3" }),
  /* @__PURE__ */ jsx2("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })
] });
var IconCopy = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("rect", { x: "8", y: "8", width: "12", height: "12", rx: "2.5" }),
  /* @__PURE__ */ jsx2("path", { d: "M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" })
] });
var IconCheck = (p) => /* @__PURE__ */ jsx2("svg", { ...base, ...p, children: /* @__PURE__ */ jsx2("path", { d: "m5 12.5 4.5 4.5L19 7.5" }) });
var IconArrowUp = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, strokeWidth: 2, ...p, children: [
  /* @__PURE__ */ jsx2("path", { d: "M12 19V5" }),
  /* @__PURE__ */ jsx2("path", { d: "m6 11 6-6 6 6" })
] });
var IconArrowDown = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("path", { d: "M12 5v14" }),
  /* @__PURE__ */ jsx2("path", { d: "m6 13 6 6 6-6" })
] });
var IconStop = (p) => /* @__PURE__ */ jsx2("svg", { ...base, ...p, children: /* @__PURE__ */ jsx2("rect", { x: "7", y: "7", width: "10", height: "10", rx: "2", fill: "currentColor", stroke: "none" }) });
var IconPaperclip = (p) => /* @__PURE__ */ jsx2("svg", { ...base, ...p, children: /* @__PURE__ */ jsx2("path", { d: "m20 11.5-8.2 8.2a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" }) });
var IconChevron = (p) => /* @__PURE__ */ jsx2("svg", { ...base, ...p, children: /* @__PURE__ */ jsx2("path", { d: "m6 9 6 6 6-6" }) });
var IconCaretUp = (p) => /* @__PURE__ */ jsx2("svg", { ...base, ...p, children: /* @__PURE__ */ jsx2("path", { d: "m4.5 15.75 7.5-7.5 7.5 7.5" }) });
var IconX = (p) => /* @__PURE__ */ jsx2("svg", { ...base, ...p, children: /* @__PURE__ */ jsx2("path", { d: "M6 6l12 12M18 6 6 18" }) });
var IconPanelRight = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("rect", { x: "3", y: "4", width: "18", height: "16", rx: "3" }),
  /* @__PURE__ */ jsx2("path", { d: "M15 4v16" })
] });
var IconFile = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("path", { d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" }),
  /* @__PURE__ */ jsx2("path", { d: "M14 3v5h5" })
] });
var IconClock = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "8.5" }),
  /* @__PURE__ */ jsx2("path", { d: "M12 7.5V12l3 2" })
] });
var IconPlus = (p) => /* @__PURE__ */ jsx2("svg", { ...base, ...p, children: /* @__PURE__ */ jsx2("path", { d: "M12 5v14M5 12h14" }) });
var IconSliders = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("path", { d: "M4 7h10M18 7h2M4 17h4M12 17h8" }),
  /* @__PURE__ */ jsx2("circle", { cx: "16", cy: "7", r: "2" }),
  /* @__PURE__ */ jsx2("circle", { cx: "10", cy: "17", r: "2" })
] });
var IconChat = (p) => /* @__PURE__ */ jsx2("svg", { ...base, ...p, children: /* @__PURE__ */ jsx2("path", { d: "M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" }) });
var IconPlug = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("path", { d: "M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0z" }),
  /* @__PURE__ */ jsx2("path", { d: "M12 16v5" })
] });
var IconGrid = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("rect", { x: "4", y: "4", width: "7", height: "7", rx: "1.5" }),
  /* @__PURE__ */ jsx2("rect", { x: "13", y: "4", width: "7", height: "7", rx: "1.5" }),
  /* @__PURE__ */ jsx2("rect", { x: "4", y: "13", width: "7", height: "7", rx: "1.5" }),
  /* @__PURE__ */ jsx2("rect", { x: "13", y: "13", width: "7", height: "7", rx: "1.5" })
] });
var IconRefresh = (p) => /* @__PURE__ */ jsxs2("svg", { ...base, ...p, children: [
  /* @__PURE__ */ jsx2("path", { d: "M20 11a8 8 0 0 0-14.3-4.9L4 8" }),
  /* @__PURE__ */ jsx2("path", { d: "M4 4v4h4" }),
  /* @__PURE__ */ jsx2("path", { d: "M4 13a8 8 0 0 0 14.3 4.9L20 16" }),
  /* @__PURE__ */ jsx2("path", { d: "M20 20v-4h-4" })
] });

// src/ui/Rail.jsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function BotRow({ bot, selected, busy }) {
  const look = botLook(bot.name);
  return /* @__PURE__ */ jsxs3("button", { type: "button", className: "hui-row", "aria-current": selected ? "page" : void 0, onClick: () => selectBot(bot.name), children: [
    /* @__PURE__ */ jsx3(BotAvatar, { size: 20, colors: look.colors, shape: look.shape, label: botLabel(bot), activity: busy ? "speaking" : "idle", emotion: busy ? "thinking" : "neutral", hoverGiggle: false }),
    /* @__PURE__ */ jsx3("span", { className: "hui-row-label", children: botLabel(bot) }),
    busy ? /* @__PURE__ */ jsx3("span", { className: "hui-pip", "data-tone": "busy", "aria-label": "En train de travailler" }) : null
  ] });
}
function Conversations() {
  const bot = useStore(store, (s) => s.bot);
  const rows = useStore(store, (s) => s.bot ? s.sessionsByBot[s.bot] : void 0);
  const storedId = useStore(store, (s) => s.storedId);
  if (!bot) return null;
  if (!rows) return /* @__PURE__ */ jsx3("p", { className: "hui-empty-line", children: "Chargement\u2026" });
  if (!rows.length) return /* @__PURE__ */ jsx3("p", { className: "hui-empty-line", children: "Aucune conversation pour l'instant." });
  const groups = CONV_GROUPS.map((label) => ({ label, rows: rows.filter((r) => convGroup(r.at) === label) })).filter((g) => g.rows.length);
  return groups.map((g) => /* @__PURE__ */ jsxs3("div", { children: [
    /* @__PURE__ */ jsx3("p", { className: "hui-section", children: g.label }),
    /* @__PURE__ */ jsx3("div", { className: "hui-list", children: g.rows.slice(0, 40).map((r) => /* @__PURE__ */ jsx3("button", { type: "button", className: "hui-row is-conv", "aria-current": r.id === storedId ? "page" : void 0, onClick: () => openConversation(r.id), title: r.title, children: /* @__PURE__ */ jsx3("span", { className: "hui-row-label", children: r.title }) }, r.id)) })
  ] }, g.label));
}
function tone(v) {
  if (v >= 95) return "fail";
  if (v >= 80) return "warn";
  return "accent";
}
function Usage() {
  const usage = useStore(store, (s) => s.usage);
  useEffect2(() => {
    const t = setInterval(() => loadUsage(), 12e4);
    return () => clearInterval(t);
  }, []);
  if (usage === "off") return null;
  const providers = Array.isArray(usage) ? usage : [{ id: "claude", label: "Claude", windows: [] }, { id: "opencode_go", label: "OpenCode Go", windows: [] }];
  return /* @__PURE__ */ jsx3("button", { type: "button", className: "hui-usage", onClick: () => loadUsage(true), title: "Usage des abonnements \u2014 cliquer pour rafra\xEEchir", children: providers.map((p) => {
    const session = p.windows?.find((w) => w.id === "session");
    const week = p.windows?.find((w) => w.id === "week" || w.id === "weekly");
    const pct = session ? Math.round(session.used) : null;
    return /* @__PURE__ */ jsxs3("span", { className: "hui-usage-row", children: [
      /* @__PURE__ */ jsxs3("span", { className: "hui-usage-head", children: [
        /* @__PURE__ */ jsx3("span", { className: "hui-usage-name", children: p.label }),
        pct === null ? /* @__PURE__ */ jsx3("span", { className: "hui-usage-val is-off", children: usage === null ? "\u2026" : "Non connect\xE9" }) : /* @__PURE__ */ jsxs3("span", { className: "hui-usage-val", children: [
          pct,
          " %"
        ] })
      ] }),
      /* @__PURE__ */ jsx3("span", { className: "hui-track", "aria-hidden": "true", children: /* @__PURE__ */ jsx3("span", { className: "hui-fill", "data-tone": pct === null ? "empty" : tone(pct), style: { "--pct": pct === null ? 0 : Math.min(100, pct) / 100 } }) }),
      pct !== null ? /* @__PURE__ */ jsxs3("span", { className: "hui-usage-sub", children: [
        /* @__PURE__ */ jsxs3("span", { children: [
          "5 h",
          session?.resetsAt ? ` \xB7 ${resetIn(session.resetsAt)}` : ""
        ] }),
        week ? /* @__PURE__ */ jsxs3("span", { children: [
          "Semaine ",
          Math.round(week.used),
          " %"
        ] }) : null
      ] }) : null
    ] }, p.id);
  }) });
}
function GearMenu({ ctx }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef2(null);
  useEffect2(() => {
    if (!open) return void 0;
    const onDown = (e) => {
      if (!wrap.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const go = (action) => {
    setOpen(false);
    void ctx.runAction(action);
  };
  return /* @__PURE__ */ jsxs3("div", { ref: wrap, style: { position: "relative" }, children: [
    /* @__PURE__ */ jsx3("button", { type: "button", className: "hui-icon-btn", "aria-label": "R\xE9glages et pages", "aria-haspopup": "menu", "aria-expanded": open, "aria-pressed": open, onClick: () => setOpen((o) => !o), children: /* @__PURE__ */ jsx3(IconGear, {}) }),
    open ? /* @__PURE__ */ jsxs3("div", { className: "hui-menu", role: "menu", children: [
      /* @__PURE__ */ jsxs3("button", { type: "button", role: "menuitem", onClick: () => go("nav.settings"), children: [
        /* @__PURE__ */ jsx3(IconSliders, {}),
        "R\xE9glages",
        /* @__PURE__ */ jsx3("kbd", { children: "\u2318," })
      ] }),
      /* @__PURE__ */ jsxs3("button", { type: "button", role: "menuitem", onClick: () => go("nav.capabilities"), children: [
        /* @__PURE__ */ jsx3(IconGrid, {}),
        "Capabilities"
      ] }),
      /* @__PURE__ */ jsxs3("button", { type: "button", role: "menuitem", onClick: () => go("nav.messaging"), children: [
        /* @__PURE__ */ jsx3(IconChat, {}),
        "Messaging"
      ] }),
      /* @__PURE__ */ jsxs3("button", { type: "button", role: "menuitem", onClick: () => go("nav.artifacts"), children: [
        /* @__PURE__ */ jsx3(IconFile, {}),
        "Artifacts"
      ] }),
      /* @__PURE__ */ jsxs3("button", { type: "button", role: "menuitem", onClick: () => go("nav.cron"), children: [
        /* @__PURE__ */ jsx3(IconClock, {}),
        "T\xE2ches planifi\xE9es"
      ] }),
      /* @__PURE__ */ jsx3("hr", {}),
      /* @__PURE__ */ jsxs3("button", { type: "button", role: "menuitem", onClick: () => go("nav.agents"), children: [
        /* @__PURE__ */ jsx3(IconPlug, {}),
        "Agents et connexions"
      ] }),
      /* @__PURE__ */ jsxs3("button", { type: "button", role: "menuitem", onClick: () => go("keybinds.openPanel"), children: [
        /* @__PURE__ */ jsx3(IconSliders, {}),
        "Raccourcis",
        /* @__PURE__ */ jsx3("kbd", { children: "\u2318/" })
      ] })
    ] }) : null
  ] });
}
function Rail({ ctx }) {
  const bots = useStore(store, (s) => s.bots);
  const bot = useStore(store, (s) => s.bot);
  const busy = useStore(store, (s) => Boolean(s.live));
  const gatewayOk = useStore(store, (s) => s.ready);
  return /* @__PURE__ */ jsxs3("nav", { className: "hui-rail", "aria-label": "Bots et conversations", children: [
    /* @__PURE__ */ jsxs3("div", { className: "hui-brand", children: [
      /* @__PURE__ */ jsx3("span", { className: "hui-brand-mark", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx3("span", { className: "hui-brand-name", children: "Hermes" })
    ] }),
    /* @__PURE__ */ jsxs3("button", { type: "button", className: "hui-new", onClick: () => newConversation(), children: [
      /* @__PURE__ */ jsx3(IconPencil, {}),
      /* @__PURE__ */ jsx3("span", { children: "Nouvelle conversation" }),
      /* @__PURE__ */ jsx3("kbd", { children: "\u21E7\u2318O" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "hui-rail-scroll hui-scroll", children: [
      /* @__PURE__ */ jsx3("p", { className: "hui-section", children: "Bots" }),
      /* @__PURE__ */ jsx3("div", { className: "hui-list", children: bots.map((b) => /* @__PURE__ */ jsx3(BotRow, { bot: b, selected: b.name === bot, busy: busy && b.name === bot }, b.name)) }),
      /* @__PURE__ */ jsx3(Conversations, {})
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "hui-foot", children: [
      /* @__PURE__ */ jsx3(Usage, {}),
      /* @__PURE__ */ jsxs3("div", { className: "hui-foot-bar", children: [
        /* @__PURE__ */ jsxs3("span", { className: "hui-engine", children: [
          /* @__PURE__ */ jsx3("span", { className: "hui-pip", "data-tone": gatewayOk ? "ok" : "warn" }),
          gatewayOk ? "Moteur connect\xE9" : "Connexion\u2026"
        ] }),
        /* @__PURE__ */ jsx3(GearMenu, { ctx })
      ] })
    ] })
  ] });
}

// src/ui/Thread.jsx
import { MessageTextContent } from "@hermes/plugin-sdk";
import { memo, useEffect as useEffect3, useLayoutEffect, useRef as useRef3, useState as useState2 } from "react";
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function CopyButton({ text, label }) {
  const [copied, setCopied] = useState2(false);
  const timer = useRef3(null);
  useEffect3(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text || "");
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1400);
  };
  return /* @__PURE__ */ jsxs4("button", { type: "button", className: "hui-copy", "data-copied": copied, onClick: copy, "aria-label": copied ? "Copi\xE9" : `Copier ${label}`, title: copied ? "Copi\xE9" : "Copier", children: [
    /* @__PURE__ */ jsx4(IconCopy, { className: "is-copy", width: 15, height: 15 }),
    /* @__PURE__ */ jsx4(IconCheck, { className: "is-check", width: 15, height: 15 })
  ] });
}
function useBotMeta() {
  const botName = useStore(store, (s) => s.bot);
  const bots = useStore(store, (s) => s.bots);
  const bot = bots.find((b) => b.name === botName);
  return { name: botName, label: botLabel(bot || botName), look: botLook(botName || "default"), bot };
}
function seconds(ms) {
  return Math.max(1, Math.round(ms / 1e3));
}
function Reasoning({ text, live, startedAt, endedAt }) {
  const [open, setOpen] = useState2(false);
  const body = useRef3(null);
  useLayoutEffect(() => {
    if (live && open && body.current) body.current.scrollTop = body.current.scrollHeight;
  }, [text, live, open]);
  if (!text && !live) return null;
  const dur = startedAt && endedAt ? seconds(endedAt - startedAt) : null;
  return /* @__PURE__ */ jsxs4("div", { className: "hui-reason", children: [
    /* @__PURE__ */ jsxs4("button", { type: "button", className: "hui-reason-head", "aria-expanded": open, onClick: () => setOpen((o) => !o), disabled: !text, children: [
      live ? /* @__PURE__ */ jsx4("span", { className: "hui-shimmer", children: "R\xE9fl\xE9chit\u2026" }) : /* @__PURE__ */ jsxs4("span", { children: [
        /* @__PURE__ */ jsx4("span", { className: "verb", children: "A r\xE9fl\xE9chi" }),
        dur ? ` ${dur} s` : ""
      ] }),
      text ? /* @__PURE__ */ jsx4(IconCaretUp, { className: "hui-reason-chevron" }) : null
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "hui-reason-body", "data-open": open && Boolean(text), children: /* @__PURE__ */ jsx4("div", { className: "hui-reason-inner", children: /* @__PURE__ */ jsx4("div", { ref: body, className: `hui-reason-text${live ? " is-live" : ""}`, children: text }) }) })
  ] });
}
var AssistantTurn = memo(function AssistantTurn2({ m, label, look, defaultModel }) {
  const model = shortModel(m.model || defaultModel);
  if (m.status === "failed" && !m.text) return null;
  return /* @__PURE__ */ jsx4("div", { className: "hui-turn hui-arrive", "data-from": "assistant", children: /* @__PURE__ */ jsxs4("div", { className: "hui-assistant", children: [
    /* @__PURE__ */ jsxs4("div", { className: "hui-assistant-head", children: [
      /* @__PURE__ */ jsx4(BotAvatar, { size: 24, colors: look.colors, shape: look.shape, label }),
      /* @__PURE__ */ jsx4("span", { className: "hui-assistant-name", children: label }),
      model ? /* @__PURE__ */ jsxs4("span", { className: "hui-assistant-model", children: [
        "\xB7 ",
        model
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "hui-assistant-body", children: [
      m.reasoning ? /* @__PURE__ */ jsx4(Reasoning, { text: m.reasoning, live: false, startedAt: m.turnStart || m.thinkStart, endedAt: m.thinkEnd }) : null,
      m.text ? /* @__PURE__ */ jsx4("div", { className: "hui-prose", children: /* @__PURE__ */ jsx4(MessageTextContent, { text: m.text }) }) : null
    ] }),
    m.text ? /* @__PURE__ */ jsx4("div", { className: "hui-actions", children: /* @__PURE__ */ jsx4(CopyButton, { text: m.text, label: "la r\xE9ponse" }) }) : null
  ] }) });
});
var UserTurn = memo(function UserTurn2({ m }) {
  return /* @__PURE__ */ jsx4("div", { className: "hui-turn hui-arrive", "data-from": "user", children: /* @__PURE__ */ jsxs4("div", { className: "hui-user", children: [
    m.attachments?.length ? /* @__PURE__ */ jsx4("div", { className: "hui-attach-chips", children: m.attachments.map((a, i) => /* @__PURE__ */ jsx4("span", { className: "hui-attach-chip", children: a.name }, i)) }) : null,
    m.text ? /* @__PURE__ */ jsx4("div", { className: "hui-bubble", children: m.text }) : null,
    /* @__PURE__ */ jsxs4("div", { className: "hui-user-meta", children: [
      m.at ? /* @__PURE__ */ jsx4("time", { className: "hui-time", children: hourOf(m.at) }) : null,
      /* @__PURE__ */ jsx4(CopyButton, { text: m.text, label: "le message" })
    ] })
  ] }) });
});
function Elapsed({ since }) {
  const [now, setNow] = useState2(() => Date.now());
  useEffect3(() => {
    const t = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor((now - since) / 1e3);
  if (s < 20) return null;
  return /* @__PURE__ */ jsxs4("span", { className: "hui-elapsed", children: [
    "\xB7 ",
    s,
    " s"
  ] });
}
function LiveTurn({ label, look }) {
  const live = useStore(store, (s) => s.live);
  const d = useStore(store, (s) => {
    const last = s.messages[s.messages.length - 1];
    return last && last.role === "assistant" && last.status === "streaming" ? last : null;
  });
  if (!live) return null;
  const phase = live.phase;
  let verb = null;
  if (phase === "tool" && live.toolName) verb = toolVerb(live.toolName);
  if (phase === "delegating") verb = plural(live.subagents || 1, "t\xE2che", "t\xE2ches");
  const head = phase === "delegating" ? `${label} d\xE9l\xE8gue` : phase === "tool" ? `${label} travaille` : phase === "writing" ? `${label} \xE9crit` : `${label} r\xE9fl\xE9chit\u2026`;
  const writing = phase === "writing" && d?.text;
  return /* @__PURE__ */ jsx4("div", { className: "hui-turn", "data-from": "assistant", "aria-live": "polite", children: /* @__PURE__ */ jsxs4("div", { className: "hui-assistant", children: [
    /* @__PURE__ */ jsxs4("div", { className: "hui-assistant-head", children: [
      /* @__PURE__ */ jsx4(BotAvatar, { size: 24, colors: look.colors, shape: look.shape, label, activity: writing ? "speaking" : "idle", emotion: writing ? "happy" : "thinking", lookAround: true }),
      !writing ? /* @__PURE__ */ jsxs4("span", { className: "hui-live", children: [
        /* @__PURE__ */ jsx4("span", { className: "hui-shimmer", children: head }),
        verb ? /* @__PURE__ */ jsxs4(Fragment, { children: [
          /* @__PURE__ */ jsx4("span", { className: "sep", children: "\xB7" }),
          /* @__PURE__ */ jsx4("span", { className: "hui-live-verb", children: verb }, verb)
        ] }) : null,
        /* @__PURE__ */ jsx4(Elapsed, { since: live.startedAt })
      ] }) : /* @__PURE__ */ jsx4("span", { className: "hui-assistant-name", children: label })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "hui-assistant-body", children: [
      d?.reasoning ? /* @__PURE__ */ jsx4(Reasoning, { text: d.reasoning, live: !d.text, startedAt: d.turnStart || d.thinkStart, endedAt: d.thinkEnd }) : null,
      d?.text ? /* @__PURE__ */ jsx4("div", { className: "hui-prose", children: /* @__PURE__ */ jsx4(MessageTextContent, { text: d.text }) }) : null
    ] })
  ] }) });
}
function ApprovalCard() {
  const a = useStore(store, (s) => s.approval);
  if (!a) return null;
  return /* @__PURE__ */ jsx4("div", { className: "hui-turn", "data-from": "assistant", children: /* @__PURE__ */ jsxs4("div", { className: "hui-approval", role: "alertdialog", "aria-label": "Autorisation requise", style: { width: "100%" }, children: [
    /* @__PURE__ */ jsxs4("div", { className: "hui-approval-title", children: [
      /* @__PURE__ */ jsx4("span", { className: "dot" }),
      "Autorisation requise"
    ] }),
    a.description ? /* @__PURE__ */ jsx4("div", { className: "hui-approval-desc", children: a.description }) : null,
    a.command ? /* @__PURE__ */ jsx4("pre", { children: a.command }) : null,
    /* @__PURE__ */ jsxs4("div", { className: "hui-approval-actions", children: [
      /* @__PURE__ */ jsx4("button", { type: "button", className: "hui-btn ghost", onClick: () => answerApproval("deny"), children: "Refuser" }),
      a.allowPermanent ? /* @__PURE__ */ jsx4("button", { type: "button", className: "hui-btn secondary", onClick: () => answerApproval("always"), children: "Toujours autoriser" }) : null,
      /* @__PURE__ */ jsx4("button", { type: "button", className: "hui-btn primary", onClick: () => answerApproval("once"), autoFocus: true, children: "Autoriser" })
    ] })
  ] }) });
}
function FailNotice() {
  const error = useStore(store, (s) => s.error);
  const live = useStore(store, (s) => Boolean(s.live));
  if (!error || live) return null;
  return /* @__PURE__ */ jsxs4("div", { className: "hui-fail", role: "alert", children: [
    /* @__PURE__ */ jsx4("span", { className: "msg", children: error }),
    /* @__PURE__ */ jsx4("button", { type: "button", className: "hui-btn ghost sm", onClick: () => retryLast(), children: "R\xE9essayer" })
  ] });
}
function Empty({ label, look }) {
  return /* @__PURE__ */ jsxs4("div", { className: "hui-empty", children: [
    /* @__PURE__ */ jsx4(BotAvatar, { size: 72, colors: look.colors, shape: look.shape, label, lookAround: true, emotion: "happy" }),
    /* @__PURE__ */ jsxs4("h1", { children: [
      "Que fait-on avec ",
      label,
      " ?"
    ] })
  ] });
}
function Thread() {
  const { label, look } = useBotMeta();
  const messages = useStore(store, (s) => s.messages);
  const loading = useStore(store, (s) => s.loading);
  const live = useStore(store, (s) => Boolean(s.live));
  const defaultModel = useStore(store, (s) => s.info.model);
  const scroller = useRef3(null);
  const pinned = useRef3(true);
  const [showJump, setShowJump] = useState2(false);
  const shown = live ? messages.filter((m, i) => !(i === messages.length - 1 && m.role === "assistant" && m.status === "streaming")) : messages;
  useLayoutEffect(() => {
    const el = scroller.current;
    if (el && pinned.current) el.scrollTop = el.scrollHeight;
  });
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    pinned.current = atBottom;
    setShowJump(!atBottom);
  };
  if (!messages.length && !loading && !live) return /* @__PURE__ */ jsx4(Empty, { label, look });
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsx4("div", { ref: scroller, className: "hui-thread-scroll hui-scroll", onScroll, children: /* @__PURE__ */ jsxs4("div", { className: "hui-thread", children: [
      loading ? /* @__PURE__ */ jsx4("p", { className: "hui-empty-line", children: "Chargement de la conversation\u2026" }) : null,
      shown.map((m) => m.role === "user" ? /* @__PURE__ */ jsx4(UserTurn, { m }, m.id) : /* @__PURE__ */ jsx4(AssistantTurn, { m, label, look, defaultModel }, m.id)),
      /* @__PURE__ */ jsx4(LiveTurn, { label, look }),
      /* @__PURE__ */ jsx4(ApprovalCard, {}),
      /* @__PURE__ */ jsx4(FailNotice, {})
    ] }) }),
    showJump ? /* @__PURE__ */ jsx4("button", { type: "button", className: "hui-jump", "aria-label": "Revenir en bas", onClick: () => {
      pinned.current = true;
      const el = scroller.current;
      if (el) el.scrollTo({ top: el.scrollHeight });
    }, children: /* @__PURE__ */ jsx4(IconArrowDown, {}) }) : null
  ] });
}

// src/ui/Composer.jsx
import { host as host2 } from "@hermes/plugin-sdk";
import { useEffect as useEffect4, useRef as useRef4, useState as useState3 } from "react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var EFFORTS = [
  ["low", "Bas"],
  ["medium", "Moyen"],
  ["high", "\xC9lev\xE9"]
];
var catalogCache = null;
async function loadCatalog() {
  if (catalogCache) return catalogCache;
  try {
    const res = await host2.request("model.options", {});
    catalogCache = (res?.providers || []).filter((p) => p.authenticated !== false && Array.isArray(p.models) && p.models.length);
  } catch {
    catalogCache = [];
  }
  return catalogCache;
}
function ModelMenu({ botName, current, onClose }) {
  const [catalog, setCatalog] = useState3(catalogCache || []);
  const prefs = prefsFor(botName);
  const [effort, setEffort] = useState3(prefs.effort || "");
  const ref = useRef4(null);
  useEffect4(() => {
    let alive = true;
    loadCatalog().then((c) => alive && setCatalog(c));
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) onClose();
    };
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      alive = false;
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  const pick = (provider, model) => {
    savePrefs(botName, { model, provider });
    store.set((s) => ({ info: { ...s.info } }));
    onClose();
  };
  const pickEffort = (value) => {
    const next = effort === value ? "" : value;
    setEffort(next);
    savePrefs(botName, { effort: next });
    store.set((s) => ({ info: { ...s.info } }));
  };
  return /* @__PURE__ */ jsxs5("div", { ref, className: "hui-pop", role: "dialog", "aria-label": "Mod\xE8le et effort", children: [
    /* @__PURE__ */ jsx5("div", { className: "hui-pop-label", children: "Effort de raisonnement" }),
    /* @__PURE__ */ jsx5("div", { className: "hui-seg", children: EFFORTS.map(([v, l]) => /* @__PURE__ */ jsx5("button", { type: "button", "aria-pressed": effort === v, onClick: () => pickEffort(v), children: l }, v)) }),
    /* @__PURE__ */ jsxs5("div", { className: "hui-pop-list", children: [
      catalog.length === 0 ? /* @__PURE__ */ jsx5("div", { className: "hui-pop-label", children: "Chargement des mod\xE8les\u2026" }) : null,
      catalog.map((p) => /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx5("div", { className: "hui-pop-label", children: p.name }),
        p.models.slice(0, 24).map((m) => /* @__PURE__ */ jsxs5("button", { type: "button", className: "hui-pop-item", "aria-selected": current === m, onClick: () => pick(p.slug, m), children: [
          /* @__PURE__ */ jsx5("span", { children: shortModel(m) }),
          p.is_current && current === m ? /* @__PURE__ */ jsx5("span", { className: "sub", children: "actuel" }) : null
        ] }, `${p.slug}:${m}`))
      ] }, p.slug))
    ] })
  ] });
}
function Composer() {
  const botName = useStore(store, (s) => s.bot);
  const bots = useStore(store, (s) => s.bots);
  const live = useStore(store, (s) => Boolean(s.live));
  useStore(store, (s) => s.info);
  const bot = bots.find((b) => b.name === botName);
  const prefs = prefsFor(botName);
  const model = prefs.model || bot?.model || "";
  const [text, setText] = useState3("");
  const [files, setFiles] = useState3([]);
  const [menu, setMenu] = useState3(false);
  const area = useRef4(null);
  const picker = useRef4(null);
  useEffect4(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(240, el.scrollHeight)}px`;
  }, [text]);
  useEffect4(() => {
    area.current?.focus();
  }, [botName]);
  const submit = () => {
    if (live) return;
    const t = text;
    const f = files;
    if (!t.trim() && !f.length) return;
    setText("");
    setFiles([]);
    void send(t, f);
  };
  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      submit();
    }
  };
  const onPaste = (e) => {
    const imgs = [...e.clipboardData?.files || []].filter((f) => f.type.startsWith("image/"));
    if (imgs.length) {
      e.preventDefault();
      setFiles((fs) => [...fs, ...imgs]);
    }
  };
  const canSend = !live && (text.trim() || files.length);
  const effortLabel = { low: "bas", medium: "moyen", high: "\xE9lev\xE9" }[prefs.effort] || "";
  return /* @__PURE__ */ jsx5("div", { className: "hui-composer-wrap", children: /* @__PURE__ */ jsxs5("div", { className: "hui-composer", onDragOver: (e) => e.preventDefault(), onDrop: (e) => {
    e.preventDefault();
    const f = [...e.dataTransfer?.files || []];
    if (f.length) setFiles((fs) => [...fs, ...f]);
  }, children: [
    files.length ? /* @__PURE__ */ jsx5("div", { className: "hui-files", children: files.map((f, i) => /* @__PURE__ */ jsxs5("span", { className: "hui-file-chip", children: [
      f.name,
      /* @__PURE__ */ jsx5("button", { type: "button", "aria-label": `Retirer ${f.name}`, onClick: () => setFiles((fs) => fs.filter((_, j) => j !== i)), children: /* @__PURE__ */ jsx5(IconX, { width: 12, height: 12 }) })
    ] }, `${f.name}-${i}`)) }) : null,
    /* @__PURE__ */ jsx5(
      "textarea",
      {
        ref: area,
        value: text,
        rows: 1,
        placeholder: `\xC9cris \xE0 ${botLabel(bot || botName)}\u2026`,
        onChange: (e) => setText(e.target.value),
        onKeyDown: onKey,
        onPaste,
        "aria-label": "Message"
      }
    ),
    /* @__PURE__ */ jsxs5("div", { className: "hui-composer-bar", children: [
      /* @__PURE__ */ jsx5("button", { type: "button", className: "hui-icon-btn", "aria-label": "Joindre un fichier", onClick: () => picker.current?.click(), children: /* @__PURE__ */ jsx5(IconPaperclip, {}) }),
      /* @__PURE__ */ jsx5("input", { ref: picker, type: "file", multiple: true, hidden: true, onChange: (e) => {
        const f = [...e.target.files || []];
        if (f.length) setFiles((fs) => [...fs, ...f]);
        e.target.value = "";
      } }),
      /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ jsxs5("button", { type: "button", className: "hui-pill", "aria-haspopup": "dialog", "aria-expanded": menu, onClick: () => setMenu((m) => !m), children: [
          /* @__PURE__ */ jsx5("span", { children: model ? shortModel(model) : "Mod\xE8le par d\xE9faut" }),
          effortLabel ? /* @__PURE__ */ jsxs5("span", { className: "eff", children: [
            "\xB7 ",
            effortLabel
          ] }) : null,
          /* @__PURE__ */ jsx5(IconChevron, { width: 13, height: 13 })
        ] }),
        menu ? /* @__PURE__ */ jsx5(ModelMenu, { botName, current: model, onClose: () => setMenu(false) }) : null
      ] }),
      /* @__PURE__ */ jsx5("span", { className: "grow" }),
      live ? /* @__PURE__ */ jsx5("button", { type: "button", className: "hui-send is-stop", "aria-label": "Arr\xEAter", onClick: () => stop(), children: /* @__PURE__ */ jsx5(IconStop, {}) }) : /* @__PURE__ */ jsx5("button", { type: "button", className: "hui-send", "aria-label": "Envoyer", disabled: !canSend, onClick: submit, children: /* @__PURE__ */ jsx5(IconArrowUp, {}) })
    ] })
  ] }) });
}

// src/ui/Aside.jsx
import { useEffect as useEffect5 } from "react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function nextRun(job) {
  const raw = job.next_run_at || job.next_run || job.nextRunAt;
  if (!raw) return "";
  const d = new Date(typeof raw === "number" ? raw * (raw < 1e12 ? 1e3 : 1) : raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("fr-FR", { weekday: "short", hour: "2-digit", minute: "2-digit" });
}
function scheduleText(job) {
  const s = job.schedule_display || job.schedule || job.cron || "";
  return typeof s === "string" ? s : s?.display || s?.expr || "";
}
function Routines({ ctx }) {
  const routines = useStore(store, (s) => s.routines);
  const bot = useStore(store, (s) => s.bot);
  useEffect5(() => {
    const t = setInterval(() => loadRoutines(), 6e4);
    return () => clearInterval(t);
  }, [bot]);
  return /* @__PURE__ */ jsxs6("div", { className: "hui-aside-block", children: [
    /* @__PURE__ */ jsxs6("div", { className: "hui-aside-head", children: [
      /* @__PURE__ */ jsx6("span", { className: "hui-aside-title", children: "Routines" }),
      /* @__PURE__ */ jsxs6("span", { style: { display: "flex", gap: 2 }, children: [
        /* @__PURE__ */ jsx6("button", { type: "button", className: "hui-icon-btn", "aria-label": "Rafra\xEEchir les routines", onClick: () => loadRoutines(), children: /* @__PURE__ */ jsx6(IconRefresh, { width: 14, height: 14 }) }),
        /* @__PURE__ */ jsx6("button", { type: "button", className: "hui-icon-btn", "aria-label": "Nouvelle routine", onClick: () => ctx.runAction("nav.cron"), children: /* @__PURE__ */ jsx6(IconPlus, { width: 14, height: 14 }) })
      ] })
    ] }),
    routines.length === 0 ? /* @__PURE__ */ jsx6("div", { className: "hui-aside-empty", children: "Aucune routine pour ce bot." }) : routines.map((job) => {
      const enabled = job.enabled !== false && job.state !== "paused";
      const name = String(job.name || "Routine").replace(/^\[bot:[^\]]+\]\s*/i, "");
      const next = nextRun(job);
      return /* @__PURE__ */ jsxs6("button", { type: "button", className: "hui-routine", style: { textAlign: "left" }, onClick: () => ctx.runAction("nav.cron"), title: job.prompt_preview || name, children: [
        /* @__PURE__ */ jsxs6("span", { className: "hui-routine-top", children: [
          /* @__PURE__ */ jsx6("span", { className: "hui-pip", "data-tone": enabled ? "ok" : void 0 }),
          /* @__PURE__ */ jsx6("span", { className: "hui-routine-name", children: name })
        ] }),
        /* @__PURE__ */ jsx6("span", { className: "hui-routine-meta", children: [scheduleText(job), next ? `prochaine : ${next}` : enabled ? "" : "en pause"].filter(Boolean).join(" \xB7 ") })
      ] }, job.id || job.job_id || name);
    })
  ] });
}
function Files({ ctx }) {
  const files = useStore(store, (s) => s.files);
  const reveal = async (path) => {
    const ok = await ctx.os?.revealPath?.(path);
    if (!ok) await ctx.os?.writeClipboard?.(path);
  };
  return /* @__PURE__ */ jsxs6("div", { className: "hui-aside-block", children: [
    /* @__PURE__ */ jsx6("div", { className: "hui-aside-head", children: /* @__PURE__ */ jsx6("span", { className: "hui-aside-title", children: "Fichiers" }) }),
    files.length === 0 ? /* @__PURE__ */ jsx6("div", { className: "hui-aside-empty", children: "Les fichiers cr\xE9\xE9s ou modifi\xE9s dans cette conversation s'affichent ici." }) : files.slice(0, 30).map((f) => {
      const parts = f.path.split("/");
      const name = parts.pop();
      return /* @__PURE__ */ jsxs6("button", { type: "button", className: "hui-filerow", onClick: () => reveal(f.path), title: `${f.path}
Cliquer : afficher (ou copier le chemin)`, children: [
        /* @__PURE__ */ jsx6("span", { className: "hui-file-ico", children: /* @__PURE__ */ jsx6(IconFile, { width: 14, height: 14 }) }),
        /* @__PURE__ */ jsxs6("span", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ jsx6("span", { className: "name", style: { display: "block" }, children: name }),
          /* @__PURE__ */ jsx6("span", { className: "dir", children: parts.join("/") || "/" })
        ] })
      ] }, f.path);
    })
  ] });
}
function Aside({ ctx }) {
  return /* @__PURE__ */ jsxs6("aside", { className: "hui-aside hui-scroll", "aria-label": "Routines et fichiers", children: [
    /* @__PURE__ */ jsx6(Routines, { ctx }),
    /* @__PURE__ */ jsx6(Files, { ctx })
  ] });
}

// src/ui/App.jsx
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var STYLE_ID = "hermes-ui-style";
function useScopedStyle() {
  useEffect6(() => {
    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = styles_default;
    return () => el.remove();
  }, []);
}
var chromeQuieted = false;
function useQuietChrome(ctx) {
  useEffect6(() => {
    if (chromeQuieted) return;
    chromeQuieted = true;
    const t = setTimeout(() => {
      try {
        const sidebar = host3.paneVisibility?.("sessions");
        if (sidebar?.get?.()) void ctx.runAction("view.toggleSidebar");
      } catch {
      }
    }, 300);
    return () => clearTimeout(t);
  }, [ctx]);
}
function Header({ asideOpen, onToggleAside }) {
  const botName = useStore(store, (s) => s.bot);
  const bots = useStore(store, (s) => s.bots);
  const title = useStore(store, (s) => s.info.title);
  const sessionModel = useStore(store, (s) => s.info.model);
  const storedId = useStore(store, (s) => s.storedId);
  const rows = useStore(store, (s) => s.bot ? s.sessionsByBot[s.bot] : void 0);
  const bot = bots.find((b) => b.name === botName);
  const look = botLook(botName || "default");
  const convTitle = title || rows?.find((r) => r.id === storedId)?.title || (storedId ? "Conversation" : "Nouvelle conversation");
  const model = sessionModel || bot?.model;
  return /* @__PURE__ */ jsxs7("header", { className: "hui-head", children: [
    /* @__PURE__ */ jsx7(BotAvatar, { size: 22, colors: look.colors, shape: look.shape, label: botLabel(bot || botName) }),
    /* @__PURE__ */ jsxs7("div", { className: "hui-head-title", children: [
      /* @__PURE__ */ jsx7("span", { className: "hui-head-bot", children: botLabel(bot || botName) }),
      /* @__PURE__ */ jsx7("span", { className: "hui-head-conv", children: convTitle })
    ] }),
    model ? /* @__PURE__ */ jsx7("span", { className: "hui-chip", children: shortModel(model) }) : null,
    /* @__PURE__ */ jsx7("button", { type: "button", className: "hui-icon-btn", "aria-label": asideOpen ? "Masquer le panneau" : "Afficher le panneau", "aria-pressed": asideOpen, onClick: onToggleAside, title: "Routines et fichiers", children: /* @__PURE__ */ jsx7(IconPanelRight, {}) })
  ] });
}
function App({ ctx }) {
  useScopedStyle();
  useQuietChrome(ctx);
  const { resolvedMode } = useTheme();
  const gateway = useValue(host3.state.gateway);
  const [asideOpen, setAsideOpen] = useState4(() => ctx.storage.get("asideOpen", true));
  const ready = useStore(store, (s) => s.ready);
  useEffect6(() => {
    if (gateway === "open") void boot();
  }, [gateway]);
  const toggleAside = () => {
    setAsideOpen((v) => {
      ctx.storage.set("asideOpen", !v);
      return !v;
    });
  };
  return /* @__PURE__ */ jsx7("div", { style: { position: "relative", width: "100%", height: "100%", minHeight: 0 }, children: /* @__PURE__ */ jsxs7("div", { className: "hui", "data-theme": resolvedMode === "light" ? "light" : "dark", "data-aside": asideOpen ? "open" : "closed", children: [
    /* @__PURE__ */ jsx7(Rail, { ctx }),
    /* @__PURE__ */ jsxs7("main", { className: "hui-card", children: [
      /* @__PURE__ */ jsx7(Header, { asideOpen, onToggleAside: toggleAside }),
      ready ? /* @__PURE__ */ jsx7(Thread, {}) : /* @__PURE__ */ jsx7("div", { className: "hui-empty", children: /* @__PURE__ */ jsx7("p", { children: "Connexion \xE0 Hermes\u2026" }) }),
      /* @__PURE__ */ jsx7(Composer, {})
    ] }),
    /* @__PURE__ */ jsx7(Aside, { ctx })
  ] }) });
}

// src/plugin.jsx
import { jsx as jsx8 } from "react/jsx-runtime";
var PATH = "/hui";
var plugin_default = {
  id: "hermes-ui",
  name: "Hermes UI",
  register(ctx) {
    bindContext(ctx);
    ctx.onEvent("*", (ev) => {
      try {
        handleEvent(ev);
      } catch (e) {
        console.warn("[hermes-ui] event", ev?.type, e);
      }
    });
    ctx.registerMany([
      { id: "page", area: ROUTES_AREA, data: { path: PATH }, render: () => /* @__PURE__ */ jsx8(App, { ctx }) },
      { id: "nav", area: SIDEBAR_NAV_AREA, data: { path: PATH, label: "Hermes UI", codicon: "comment-discussion" } },
      {
        id: "open",
        area: PALETTE_AREA,
        data: { id: "hermes-ui.open", label: "Ouvrir Hermes UI", keywords: ["hermes", "ui", "chat", "bots"], run: () => host4.navigate(PATH) }
      },
      {
        id: "new",
        area: KEYBINDS_AREA,
        data: {
          id: "hermes-ui.newConversation",
          label: "Hermes UI : nouvelle conversation",
          category: "view",
          defaults: ["mod+shift+o"],
          run: () => {
            host4.navigate(PATH);
            newConversation();
          }
        }
      }
    ]);
  }
};
export {
  plugin_default as default
};
