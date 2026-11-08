// Hermes UI — built from src/ by scripts/build.mjs. Do not edit by hand.
var jR=Object.defineProperty;var ua=(e,t)=>{for(var o in t)jR(e,o,{get:t[o],enumerable:!0})};import{host as $R,KEYBINDS_AREA as QL,PALETTE_AREA as JL,ROUTES_AREA as WR,SIDEBAR_NAV_AREA as eN}from"@hermes/plugin-sdk";import{host as j2,useTheme as jS,useValue as KS}from"@hermes/plugin-sdk";import{useEffect as jg,useState as YS}from"react";var Zb=`/* Hermes UI — Glaze (OS v2) on Hermes Desktop. Every rule is scoped to .hui.
   Tokens: values copied from ilyassbm/os components/glaze/tokens.css (dark = reference).
   Motion: Emil Kowalski rules — transform/opacity only, strong ease-out, <= 220 ms,
   hover gated to fine pointers, reduced motion keeps fades only. */

.hui {
  --frame: #f3f2ef;
  --frame-glow: radial-gradient(900px 520px at 0% 0%, rgb(255 122 89 / 0.10), transparent 65%), radial-gradient(700px 480px at 100% 100%, rgb(120 110 255 / 0.05), transparent 60%);
  --page: #ffffff;
  --paper: #f8f7f5;
  --paper-2: #ffffff;
  --field: #ebeae7;
  --raised: rgb(255 255 255 / 0.92);
  --hover: rgb(20 18 15 / 0.045);
  --pressed: rgb(20 18 15 / 0.07);
  --text-1: #18171a;
  --text-2: #68676d;
  --text-3: #a3a2a8;
  --line-faint: rgb(20 18 15 / 0.06);
  --line: rgb(20 18 15 / 0.09);
  --line-control: rgb(20 18 15 / 0.13);
  --line-focus: rgb(234 88 52 / 0.6);
  --focus: rgb(234 88 52 / 0.9);
  --highlight: inset 0 1px 0 rgb(255 255 255 / 0.9);
  --accent: #f26a48;
  --accent-hover: #ff7a59;
  --accent-press: #e2583a;
  --accent-text: #d14a2b;
  --accent-soft: rgb(242 106 72 / 0.10);
  --on-accent: #1f0c06;
  --ok: #059669;
  --warn: #d97706;
  --fail: #e11d48;
  --fail-text: #be123c;
  --fail-tint: rgb(225 29 72 / 0.10);
  --warn-tint: rgb(217 119 6 / 0.10);
  --nav-active: #ffffff;
  --nav-active-shadow: 0 0 0 1px rgb(20 18 15 / 0.09), 0 1px 2px rgb(40 30 20 / 0.05);
  --shadow-frame: 0 0 0 1px var(--line), 0 24px 48px -28px rgb(40 30 20 / 0.18), 0 2px 6px -2px rgb(40 30 20 / 0.06);
  --shadow-card: 0 0 0 1px var(--line), 0 1px 2px rgb(40 30 20 / 0.05);
  --shadow-overlay: 0 0 0 1px rgb(20 18 15 / 0.08), 0 24px 64px -16px rgb(40 30 20 / 0.22), 0 8px 20px -8px rgb(40 30 20 / 0.10);
  --btn-secondary: #ffffff;
  --btn-secondary-shadow: 0 0 0 1px var(--line), var(--highlight), 0 1px 2px rgb(40 30 20 / 0.06);
  --code-bg: #ffffff;
  --code-head: #fafafa;
  --scrollbar-thumb: rgb(20 18 15 / 0.16);
  --shimmer-a: #8a8990;
  --shimmer-b: rgb(138 137 144 / 0.40);

  --font-sans: 'Geist', 'Inter', ui-sans-serif, system-ui, -apple-system, 'SF Pro Text', 'Segoe UI', sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --dur-press: 100ms;
  --dur-state: 120ms;
  --dur-overlay: 160ms;
  --dur-panel: 220ms;
  --rail-w: 248px;
  --aside-w: 288px;

  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: var(--rail-w) minmax(0, 1fr) auto;
  background-color: var(--frame);
  background-image: var(--frame-glow);
  color: var(--text-1);
  font: 400 14px/22px var(--font-sans);
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0;
  overflow: hidden;
  isolation: isolate;
}

.hui[data-theme='dark'] {
  --frame: #0c0c0d;
  --frame-glow: radial-gradient(900px 520px at 0% 0%, rgb(255 122 89 / 0.07), transparent 65%), radial-gradient(700px 480px at 100% 100%, rgb(120 110 255 / 0.04), transparent 60%);
  --page: #141416;
  --paper: #1a1a1d;
  --paper-2: #202024;
  --field: #26262a;
  --raised: rgb(28 28 31 / 0.90);
  --hover: rgb(255 255 255 / 0.05);
  --pressed: rgb(255 255 255 / 0.08);
  --text-1: #f4f4f5;
  --text-2: #a1a1a8;
  --text-3: #6c6c74;
  --line-faint: rgb(255 255 255 / 0.06);
  --line: rgb(255 255 255 / 0.08);
  --line-control: rgb(255 255 255 / 0.10);
  --line-focus: rgb(255 122 89 / 0.55);
  --focus: rgb(255 122 89 / 0.9);
  --highlight: inset 0 1px 0 rgb(255 255 255 / 0.05);
  --accent: #ff7a59;
  --accent-hover: #ff8f73;
  --accent-press: #f26a48;
  --accent-text: #ff9a80;
  --accent-soft: rgb(255 122 89 / 0.14);
  --ok: #34d399;
  --warn: #fbbf24;
  --fail: #f43f5e;
  --fail-text: #fb7185;
  --fail-tint: rgb(244 63 94 / 0.12);
  --warn-tint: rgb(251 191 36 / 0.12);
  --nav-active: rgb(255 255 255 / 0.07);
  --nav-active-shadow: inset 0 1px 0 rgb(255 255 255 / 0.05), 0 0 0 1px rgb(255 255 255 / 0.06);
  --shadow-frame: 0 0 0 1px var(--line), 0 24px 48px -24px rgb(0 0 0 / 0.7), 0 2px 6px -2px rgb(0 0 0 / 0.4), var(--highlight);
  --shadow-card: 0 0 0 1px var(--line), 0 1px 2px rgb(0 0 0 / 0.3), var(--highlight);
  --shadow-overlay: 0 0 0 1px rgb(255 255 255 / 0.09), 0 24px 64px -16px rgb(0 0 0 / 0.75), 0 8px 20px -8px rgb(0 0 0 / 0.5), var(--highlight);
  --btn-secondary: rgb(255 255 255 / 0.06);
  --btn-secondary-shadow: 0 0 0 1px var(--line), var(--highlight);
  --code-bg: #18181b;
  --code-head: #1e1e21;
  --scrollbar-thumb: rgb(255 255 255 / 0.12);
  --shimmer-a: #8b8b93;
  --shimmer-b: rgb(139 139 147 / 0.38);
}

.hui *, .hui *::before, .hui *::after { box-sizing: border-box; }
/* Zero-specificity reset so every component class (.hui-btn, .hui-row…) wins over it. */
:where(.hui) :where(button) { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
.hui :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; border-radius: 8px; }
.hui ::selection { background: var(--accent-soft); }
.hui .hui-scroll { overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) transparent; }
.hui .tnum { font-variant-numeric: tabular-nums; }
.hui .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* ── Rail ─────────────────────────────────────────────────────────────── */
.hui-rail { display: flex; flex-direction: column; min-height: 0; padding: 12px 8px 8px 10px; gap: 8px; }
.hui-brand { display: flex; align-items: center; gap: 8px; height: 28px; padding: 0 6px; }
.hui-brand-mark { width: 20px; height: 20px; border-radius: 6px; background: linear-gradient(140deg, var(--accent-hover), var(--accent-press)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), 0 1px 2px rgb(0 0 0 / 0.3); flex: none; }
.hui-brand-name { font: 600 13px/18px var(--font-sans); letter-spacing: -0.01em; }
.hui-brand-spacer { flex: 1; }

.hui-new { display: flex; align-items: center; gap: 8px; height: 32px; padding: 0 10px; border-radius: 10px; background: var(--btn-secondary); box-shadow: var(--btn-secondary-shadow); font: 500 13px/18px var(--font-sans); color: var(--text-1); transition: transform var(--dur-press) var(--ease-out); }
.hui-new:active { transform: scale(0.97); }
.hui-new kbd { margin-left: auto; font: 500 11px/14px var(--font-sans); color: var(--text-3); }

.hui-section { margin: 12px 8px 4px; font: 500 11px/14px var(--font-sans); letter-spacing: 0.01em; color: var(--text-3); text-transform: none; }
.hui-list { display: flex; flex-direction: column; gap: 1px; }
.hui-row { position: relative; display: flex; align-items: center; gap: 8px; width: 100%; min-height: 30px; padding: 4px 8px; border-radius: 8px; text-align: left; font: 500 13px/18px var(--font-sans); color: var(--text-2); }
.hui-row[aria-current='page'] { background: var(--nav-active); box-shadow: var(--nav-active-shadow); color: var(--text-1); }
.hui-row .hui-row-label { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hui-row .hui-row-meta { font: 400 11px/14px var(--font-sans); color: var(--text-3); flex: none; }
.hui-row.is-conv { font-weight: 400; min-height: 28px; }
.hui-pip { width: 6px; height: 6px; border-radius: 999px; background: var(--text-3); flex: none; }
.hui-pip[data-tone='ok'] { background: var(--ok); }
.hui-pip[data-tone='busy'] { background: var(--accent); animation: hui-breathe 1.6s var(--ease-in-out) infinite; }
.hui-pip[data-tone='warn'] { background: var(--warn); }
@keyframes hui-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

.hui-rail-scroll { flex: 1; min-height: 0; margin: 0 -4px; padding: 0 4px; }
.hui-empty-line { padding: 4px 8px; font: 400 12px/16px var(--font-sans); color: var(--text-3); }

.hui-foot { display: flex; flex-direction: column; gap: 8px; padding-top: 8px; border-top: 1px solid var(--line-faint); }
.hui-usage { display: flex; flex-direction: column; gap: 8px; padding: 8px; border-radius: 10px; text-align: left; width: 100%; }
.hui-usage-row { display: flex; flex-direction: column; gap: 5px; }
.hui-usage-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hui-usage-name { font: 400 12px/16px var(--font-sans); color: var(--text-2); }
.hui-usage-val { font: 500 11px/14px var(--font-sans); color: var(--text-1); font-variant-numeric: tabular-nums; }
.hui-usage-val.is-off { color: var(--text-3); font-weight: 400; }
.hui-track { position: relative; height: 4px; border-radius: 999px; background: var(--field); overflow: hidden; }
.hui-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--accent); transform-origin: left center; transform: scaleX(var(--pct, 0)); transition: transform 400ms var(--ease-out); }
.hui-fill[data-tone='warn'] { background: var(--warn); }
.hui-fill[data-tone='fail'] { background: var(--fail); }
.hui-usage-sub { display: flex; justify-content: space-between; font: 400 11px/14px var(--font-sans); color: var(--text-3); font-variant-numeric: tabular-nums; }

.hui-foot-bar { display: flex; align-items: center; gap: 6px; padding: 0 2px; }
.hui-engine { display: flex; align-items: center; gap: 6px; flex: 1; min-width: 0; padding: 0 6px; font: 400 12px/16px var(--font-sans); color: var(--text-2); }
.hui-icon-btn { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; color: var(--text-2); flex: none; transition: transform var(--dur-press) var(--ease-out); }
.hui-icon-btn:active { transform: scale(0.95); }
.hui-icon-btn[aria-pressed='true'] { color: var(--text-1); background: var(--pressed); }

/* ── Card / thread ─────────────────────────────────────────────────────── */
.hui-card { position: relative; display: flex; flex-direction: column; min-width: 0; min-height: 0; margin: 8px 0 8px 0; border-radius: 16px; background: var(--page); box-shadow: var(--shadow-frame); overflow: hidden; }
.hui[data-aside='closed'] .hui-card { margin-right: 8px; }
.hui-head { display: flex; align-items: center; gap: 10px; height: 48px; padding: 0 12px 0 16px; border-bottom: 1px solid var(--line-faint); flex: none; }
.hui-head-title { min-width: 0; flex: 1; display: flex; align-items: baseline; gap: 8px; }
.hui-head-bot { font: 600 13px/18px var(--font-sans); color: var(--text-1); letter-spacing: -0.01em; white-space: nowrap; }
.hui-head-conv { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 400 13px/18px var(--font-sans); color: var(--text-3); }
.hui-chip { display: inline-flex; align-items: center; gap: 6px; height: 24px; padding: 0 8px; border-radius: 7px; background: var(--hover); font: 500 11px/14px var(--font-sans); color: var(--text-2); white-space: nowrap; }

.hui-thread-scroll { flex: 1; min-height: 0; }
.hui-thread { width: 100%; max-width: 760px; margin: 0 auto; padding: 28px 24px 24px; display: flex; flex-direction: column; gap: 28px; }

.hui-turn { display: flex; min-width: 0; }
.hui-turn[data-from='user'] { justify-content: flex-end; }
.hui-arrive { animation: hui-arrive 220ms var(--ease-out) both; }
@keyframes hui-arrive { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

.hui-user { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; max-width: min(560px, 85%); }
.hui-bubble { padding: 9px 14px; border-radius: 18px 18px 6px 18px; background: var(--paper-2); box-shadow: 0 0 0 1px var(--line-faint); white-space: pre-wrap; overflow-wrap: anywhere; font: 400 14px/22px var(--font-sans); color: var(--text-1); }
.hui-user-meta { display: flex; align-items: center; gap: 4px; height: 24px; opacity: 0; transition: opacity var(--dur-state) ease; }
.hui-turn:hover .hui-user-meta, .hui-turn:focus-within .hui-user-meta { opacity: 1; }
.hui-time { font: 400 12px/16px var(--font-sans); color: var(--text-3); font-variant-numeric: tabular-nums; }
.hui-attach-chips { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px; }
.hui-attach-chip { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 8px; background: var(--paper); box-shadow: 0 0 0 1px var(--line-faint); font: 500 12px/16px var(--font-sans); color: var(--text-2); }

.hui-assistant { display: flex; flex-direction: column; gap: 8px; min-width: 0; width: 100%; }
.hui-assistant-head { display: flex; align-items: center; gap: 8px; min-height: 28px; }
.hui-assistant-name { font: 500 12px/16px var(--font-sans); color: var(--text-1); }
.hui-assistant-model { font: 400 12px/16px var(--font-sans); color: var(--text-3); }
.hui-assistant-body { padding-left: 36px; min-width: 0; }
.hui-actions { display: flex; align-items: center; gap: 2px; padding-left: 32px; height: 28px; opacity: 0; transition: opacity var(--dur-state) ease; }
.hui-turn:hover .hui-actions, .hui-turn:focus-within .hui-actions { opacity: 1; }

/* Copy button: icon swap with a blur crossfade (Emil). */
.hui-copy { position: relative; display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; color: var(--text-3); transition: transform var(--dur-press) var(--ease-out); }
.hui-copy:active { transform: scale(0.95); }
.hui-copy svg { grid-area: 1 / 1; transition: opacity 160ms var(--ease-out), transform 160ms var(--ease-out), filter 160ms var(--ease-out); }
.hui-copy .is-check { opacity: 0; transform: scale(0.6); filter: blur(2px); color: var(--ok); }
.hui-copy[data-copied='true'] .is-copy { opacity: 0; transform: scale(0.6); filter: blur(2px); }
.hui-copy[data-copied='true'] .is-check { opacity: 1; transform: none; filter: none; }

/* Prose — native renderer (MessageTextContent), restyled by element. */
.hui-prose { min-width: 0; font: 400 14px/22px var(--font-sans); color: var(--text-1); overflow-wrap: anywhere; }
.hui-prose > :first-child { margin-top: 0; }
.hui-prose > :last-child { margin-bottom: 0; }
.hui-prose p { margin: 0 0 12px; }
.hui-prose h1, .hui-prose h2, .hui-prose h3 { margin: 20px 0 8px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.3; }
.hui-prose h1 { font-size: 18px; } .hui-prose h2 { font-size: 16px; } .hui-prose h3 { font-size: 14px; }
.hui-prose ul, .hui-prose ol { margin: 0 0 12px; padding-left: 20px; }
.hui-prose li { margin: 3px 0; }
.hui-prose a { color: var(--accent-text); text-decoration: none; }
.hui-prose a:hover { text-decoration: underline; text-underline-offset: 2px; }
.hui-prose strong { font-weight: 600; }
.hui-prose blockquote { margin: 0 0 12px; padding: 2px 0 2px 12px; border-left: 2px solid var(--line-control); color: var(--text-2); }
.hui-prose hr { border: 0; border-top: 1px solid var(--line); margin: 16px 0; }
.hui-prose :not(pre) > code { padding: 1px 5px; border-radius: 5px; background: var(--hover); font: 400 0.86em/1.4 var(--font-mono); }
/* aicss CodeBlock look */
.hui-prose pre { margin: 0 0 12px; padding: 12px 16px; border-radius: 12px; background: var(--code-bg); box-shadow: 0 0 0 0.5px var(--line-control), 0 1px 2px rgb(0 0 0 / 0.08); overflow-x: auto; font: 400 12.5px/20px var(--font-mono); scrollbar-width: none; }
.hui-prose pre::-webkit-scrollbar { display: none; }
.hui-prose pre code { font: inherit; background: none; padding: 0; }
/* The native renderer wraps code in [data-slot=code-card] (copy button, expander, nested shiki <pre>s):
   the card carries the aicss look, the inner <pre>s go flat. */
.hui .hui-prose [data-slot='code-card'] { margin: 4px 0 12px; border-radius: 12px; background: var(--code-bg); box-shadow: 0 0 0 0.5px var(--line-control), 0 1px 2px rgb(0 0 0 / 0.08); padding: 10px 14px; }
.hui .hui-prose [data-slot='code-card'] pre { margin: 0; padding: 0; border-radius: 0; background: transparent; box-shadow: none; overflow: visible; font: 400 12.5px/20px var(--font-mono); }
.hui .hui-prose [data-slot='code-card'] .shiki { background: transparent !important; }
/* aicss DataTable look. The native renderer wraps tables in .aui-md-table (border + 6px radius):
   the wrapper becomes the card, the table stays flat inside it. */
.hui .hui-prose .aui-md-table { margin: 4px 0 12px; border: 0; border-radius: 12px; overflow-x: auto; box-shadow: 0 0 0 0.5px var(--line-control), 0 1px 2px rgb(0 0 0 / 0.08); }
.hui .hui-prose .aui-md-table table { margin: 0; box-shadow: none; border-radius: 0; }
.hui-prose table { width: 100%; margin: 0 0 12px; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 0 0 0.5px var(--line-control), 0 1px 2px rgb(0 0 0 / 0.08); font-size: 13px; }
.hui-prose thead th { background: var(--code-head); color: var(--text-3); font-weight: 500; text-align: left; padding: 7px 12px; }
.hui-prose tbody td { background: var(--code-bg); padding: 9px 12px; border-top: 0.5px solid var(--line-control); }
.hui-prose th:not(:last-child), .hui-prose td:not(:last-child) { border-right: 0.5px solid var(--line-control); }
.hui-prose img { max-width: 100%; border-radius: 12px; }

/* Reasoning — aicss ThinkingReasoning pattern: shimmer label, grid-rows collapse. */
.hui-reason { display: flex; flex-direction: column; }
.hui-reason-head { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; min-height: 22px; font: 500 13px/18px var(--font-sans); color: var(--text-3); }
.hui-reason-head .verb { color: var(--text-2); }
.hui-reason-chevron { width: 12px; height: 12px; color: var(--text-3); transform: rotate(180deg); transition: transform 220ms var(--ease-out); }
.hui-reason-head[aria-expanded='true'] .hui-reason-chevron { transform: rotate(0deg); }
.hui-reason-body { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 260ms var(--ease-out), opacity 180ms ease; }
.hui-reason-body[data-open='true'] { grid-template-rows: 1fr; opacity: 1; }
.hui-reason-inner { min-height: 0; overflow: hidden; }
.hui-reason-text { margin-top: 6px; max-height: 220px; overflow-y: auto; padding: 2px 0 2px 12px; border-left: 2px solid var(--line); white-space: pre-wrap; font: 400 13px/20px var(--font-sans); color: var(--text-3); scrollbar-width: thin; }
.hui-reason-text.is-live { -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 100%); mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 100%); }

.hui-shimmer { color: transparent; -webkit-text-fill-color: transparent; background: linear-gradient(90deg, var(--shimmer-a) 0%, var(--shimmer-a) 30%, var(--shimmer-b) 45%, var(--shimmer-b) 55%, var(--shimmer-a) 70%, var(--shimmer-a) 100%); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; animation: hui-shine 2.25s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }
@keyframes hui-shine { 0%, 18% { background-position: 100% 0; } 82%, 100% { background-position: 0% 0; } }

/* Live activity line — one line, the verb crossfades in place. */
.hui-live { display: flex; align-items: center; gap: 6px; min-height: 22px; font: 500 13px/18px var(--font-sans); color: var(--text-3); }
.hui-live .sep { color: var(--text-3); opacity: 0.7; }
.hui-live-verb { display: inline-block; animation: hui-verb 180ms var(--ease-out) both; }
@keyframes hui-verb { from { opacity: 0; transform: translateY(3px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }
.hui-elapsed { font: 400 12px/16px var(--font-sans); color: var(--text-3); font-variant-numeric: tabular-nums; }

/* Approval card */
.hui-approval { display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 14px; background: var(--paper); box-shadow: var(--shadow-card); animation: hui-pop 200ms var(--ease-out) both; transform-origin: top left; }
@keyframes hui-pop { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: none; } }
.hui-approval-title { display: flex; align-items: center; gap: 8px; font: 600 13px/18px var(--font-sans); }
.hui-approval-title .dot { width: 8px; height: 8px; border-radius: 999px; background: var(--warn); box-shadow: 0 0 0 3px var(--warn-tint); }
.hui-approval-desc { font: 400 13px/20px var(--font-sans); color: var(--text-2); }
.hui-approval pre { margin: 0; padding: 10px 12px; border-radius: 10px; background: var(--code-bg); box-shadow: 0 0 0 0.5px var(--line-control); font: 400 12px/18px var(--font-mono); white-space: pre-wrap; overflow-wrap: anywhere; max-height: 160px; overflow-y: auto; }
.hui-approval-actions { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }

.hui-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 10px; font: 500 13px/18px var(--font-sans); transition: transform var(--dur-press) var(--ease-out), background-color var(--dur-state) ease, box-shadow var(--dur-state) ease; }
.hui-btn:active { transform: scale(0.97); }
.hui-btn.primary { background: var(--accent); color: var(--on-accent); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), 0 1px 2px rgb(0 0 0 / 0.3); }
.hui-btn.secondary { background: var(--btn-secondary); box-shadow: var(--btn-secondary-shadow); color: var(--text-1); }
.hui-btn.ghost { color: var(--text-2); }
.hui-btn.sm { height: 28px; padding: 0 10px; font-size: 12px; }

.hui-fail { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: var(--fail-tint); color: var(--text-1); font: 500 13px/18px var(--font-sans); }
.hui-fail .msg { flex: 1; min-width: 0; }

/* Empty state */
.hui-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 24px; text-align: center; }
.hui-empty h1 { margin: 0; font: 600 24px/30px var(--font-sans); letter-spacing: -0.025em; color: var(--text-1); }
.hui-empty p { margin: 0; max-width: 46ch; font: 400 13px/20px var(--font-sans); color: var(--text-3); }

.hui-jump { position: absolute; left: 50%; bottom: 132px; transform: translateX(-50%); display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 999px; background: var(--raised); box-shadow: var(--shadow-overlay); color: var(--text-2); backdrop-filter: blur(24px) saturate(1.4); animation: hui-fade 160ms var(--ease-out) both; z-index: 3; }
@keyframes hui-fade { from { opacity: 0; } to { opacity: 1; } }

/* ── Composer ──────────────────────────────────────────────────────────── */
.hui-composer-wrap { flex: none; padding: 0 24px 16px; }
.hui-composer { width: 100%; max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 6px; padding: 10px 10px 8px 14px; border-radius: 18px; background: var(--raised); box-shadow: var(--shadow-overlay); backdrop-filter: blur(24px) saturate(1.4); transition: box-shadow var(--dur-state) ease; }
.hui-composer:focus-within { box-shadow: 0 0 0 1px var(--line-control), var(--shadow-overlay); }
.hui-composer textarea { width: 100%; min-height: 24px; max-height: 240px; resize: none; border: 0; outline: none; background: transparent; color: var(--text-1); font: 400 14px/22px var(--font-sans); padding: 2px 0; }
.hui-composer textarea::placeholder { color: var(--text-3); }
.hui-composer-bar { display: flex; align-items: center; gap: 4px; }
.hui-composer-bar .grow { flex: 1; }
.hui-pill { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 8px 0 10px; border-radius: 999px; font: 500 12px/16px var(--font-sans); color: var(--text-2); transition: transform var(--dur-press) var(--ease-out); }
.hui-pill:active { transform: scale(0.97); }
.hui-pill .eff { color: var(--text-3); font-weight: 400; }
.hui-send { display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 999px; background: var(--accent); color: var(--on-accent); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), 0 1px 2px rgb(0 0 0 / 0.3); transition: transform var(--dur-press) var(--ease-out), opacity var(--dur-state) ease; }
.hui-send:active { transform: scale(0.94); }
.hui-send:disabled { opacity: 0.35; cursor: default; }
.hui-send.is-stop { background: var(--text-1); color: var(--page); }
.hui-files { display: flex; flex-wrap: wrap; gap: 6px; }
.hui-file-chip { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 4px 0 10px; border-radius: 8px; background: var(--paper); box-shadow: 0 0 0 1px var(--line-faint); font: 500 12px/16px var(--font-sans); color: var(--text-2); animation: hui-pop 160ms var(--ease-out) both; }
.hui-file-chip button { display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 5px; color: var(--text-3); }
.hui-hint { text-align: center; margin-top: 8px; font: 400 11px/14px var(--font-sans); color: var(--text-3); }

/* Model menu (popover) */
.hui-pop { position: absolute; bottom: calc(100% + 8px); left: 0; z-index: 20; min-width: 280px; max-height: 360px; display: flex; flex-direction: column; padding: 6px; border-radius: 12px; background: var(--raised); box-shadow: var(--shadow-overlay); backdrop-filter: blur(24px) saturate(1.4); transform-origin: bottom left; animation: hui-pop-in 160ms var(--ease-out) both; }
@keyframes hui-pop-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: none; } }
.hui-pop-label { padding: 6px 8px 4px; font: 500 11px/14px var(--font-sans); color: var(--text-3); }
.hui-pop-list { overflow-y: auto; scrollbar-width: thin; }
.hui-pop-item { display: flex; align-items: center; gap: 8px; width: 100%; height: 30px; padding: 0 8px; border-radius: 7px; text-align: left; font: 400 13px/18px var(--font-sans); color: var(--text-1); }
.hui-pop-item[aria-selected='true'] { background: var(--accent-soft); }
.hui-pop-item .sub { margin-left: auto; font-size: 11px; color: var(--text-3); }
.hui-seg { display: flex; gap: 2px; padding: 2px; margin: 4px 4px 2px; border-radius: 9px; background: var(--hover); }
.hui-seg button { flex: 1; height: 26px; border-radius: 7px; font: 500 12px/16px var(--font-sans); color: var(--text-2); }
.hui-seg button[aria-pressed='true'] { background: var(--page); color: var(--text-1); box-shadow: 0 0 0 1px var(--line), 0 1px 2px rgb(0 0 0 / 0.15); }

/* Gear menu */
.hui-menu { position: absolute; bottom: calc(100% + 6px); right: 0; z-index: 20; min-width: 208px; padding: 6px; border-radius: 12px; background: var(--raised); box-shadow: var(--shadow-overlay); backdrop-filter: blur(24px) saturate(1.4); transform-origin: bottom right; animation: hui-pop-in 160ms var(--ease-out) both; }
.hui-menu button { display: flex; align-items: center; gap: 10px; width: 100%; height: 32px; padding: 0 10px; border-radius: 7px; text-align: left; font: 400 13px/18px var(--font-sans); color: var(--text-1); }
.hui-menu button kbd { margin-left: auto; font: 500 11px/14px var(--font-sans); color: var(--text-3); }
.hui-menu hr { border: 0; border-top: 1px solid var(--line-faint); margin: 4px 6px; }

/* ── Aside ─────────────────────────────────────────────────────────────── */
.hui-aside { width: var(--aside-w); display: flex; flex-direction: column; min-height: 0; padding: 12px 10px 8px 8px; gap: 4px; }
.hui[data-aside='closed'] .hui-aside { display: none; }
.hui-aside-head { display: flex; align-items: center; justify-content: space-between; height: 28px; padding: 0 6px; }
.hui-aside-title { font: 600 12px/16px var(--font-sans); color: var(--text-2); }
.hui-aside-block { display: flex; flex-direction: column; gap: 2px; margin-bottom: 14px; }
.hui-routine { display: flex; flex-direction: column; gap: 2px; padding: 8px; border-radius: 10px; }
.hui-routine-top { display: flex; align-items: center; gap: 8px; }
.hui-routine-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 13px/18px var(--font-sans); color: var(--text-1); }
.hui-routine-meta { padding-left: 14px; font: 400 12px/16px var(--font-sans); color: var(--text-3); font-variant-numeric: tabular-nums; }
.hui-filerow { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 30px; padding: 4px 8px; border-radius: 8px; text-align: left; }
.hui-filerow .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 13px/18px var(--font-sans); color: var(--text-1); }
.hui-filerow .dir { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 400 11px/14px var(--font-mono); color: var(--text-3); }
.hui-file-ico { display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: 7px; background: var(--hover); color: var(--text-2); flex: none; }
.hui-aside-empty { padding: 10px 8px; border-radius: 10px; font: 400 12px/18px var(--font-sans); color: var(--text-3); }

/* Bot avatar (aicss AiBotAvatar, CSS-module port) */
.hui-bot { --bot-1: #66a6ff; --bot-2: #0059d4; --bot-face: #ffffff; --bot-ground: rgba(0, 0, 0, 0.05); --bot-ground-core: rgba(0, 0, 0, 0.095); --bot-heart: #ff4f7e; --bot-blush: rgba(255, 110, 150, 0.55); position: relative; display: inline-block; flex: none; width: var(--bot-size, 24px); height: var(--bot-size, 24px); vertical-align: middle; }
.hui[data-theme='dark'] .hui-bot { --bot-face: #101010; --bot-ground: rgba(0, 0, 0, 0.2); --bot-ground-core: rgba(0, 0, 0, 0.3); }
.hui-bot svg { position: absolute; inset: -25%; display: block; width: 150%; height: 150%; overflow: visible; }
.hui-bot .stop1, .hui-bot .stop2 { transition: stop-color 450ms ease; }
.hui-bot .stop1 { stop-color: var(--bot-1); }
.hui-bot .stop2 { stop-color: var(--bot-2); }
.hui-bot .face { fill: var(--bot-face); stroke: var(--bot-face); }
.hui-bot .ground { fill: var(--bot-ground); }
.hui-bot .core { fill: var(--bot-ground-core); }
.hui-bot .blush { fill: var(--bot-blush); }
.hui-bot .heart { fill: var(--bot-heart); }

/* Pointer-gated hovers (touch fires false hovers). Rows are instant (0 ms). */
@media (hover: hover) and (pointer: fine) {
  .hui-row:hover:not([aria-current='page']) { background: var(--hover); color: var(--text-1); }
  .hui-new:hover { background: var(--hover); }
  .hui-icon-btn:hover, .hui-copy:hover { background: var(--hover); color: var(--text-1); }
  .hui-pill:hover { background: var(--hover); color: var(--text-1); }
  .hui-btn.primary:hover { background: var(--accent-hover); }
  .hui-btn.secondary:hover, .hui-btn.ghost:hover { background: var(--hover); }
  .hui-send:not(:disabled):hover { background: var(--accent-hover); }
  .hui-send.is-stop:hover { background: var(--text-2); }
  .hui-pop-item:hover, .hui-menu button:hover, .hui-filerow:hover, .hui-routine:hover, .hui-usage:hover { background: var(--hover); }
  .hui-reason-head:hover, .hui-reason-head:hover .hui-reason-chevron { color: var(--text-2); }
  .hui-jump:hover { color: var(--text-1); }
}

@media (prefers-reduced-motion: reduce) {
  .hui-arrive, .hui-approval, .hui-pop, .hui-menu, .hui-file-chip, .hui-live-verb { animation: hui-fade 120ms ease both; }
  .hui-shimmer { animation: none; color: var(--text-3); -webkit-text-fill-color: currentColor; background: none; }
  .hui-pip[data-tone='busy'] { animation: none; }
  .hui-new:active, .hui-btn:active, .hui-send:active, .hui-pill:active, .hui-icon-btn:active, .hui-copy:active { transform: none; }
  .hui-fill { transition: none; }
}

@media (max-width: 980px) {
  .hui { --aside-w: 0px; }
  .hui .hui-aside { display: none; }
  .hui .hui-card { margin-right: 8px; }
}
@media (max-width: 720px) {
  .hui { grid-template-columns: 0 minmax(0, 1fr) 0; }
  .hui .hui-rail { display: none; }
  .hui .hui-card { margin: 0; border-radius: 0; }
}
`;import{host as Jo}from"@hermes/plugin-sdk";import{useSyncExternalStore as YR}from"react";function Gb(e){let t=e,o=new Set;return{get:()=>t,set(a){let r=typeof a=="function"?a(t):a;r&&(t={...t,...r},o.forEach(n=>n()))},subscribe(a){return o.add(a),()=>o.delete(a)}}}function Ye(e,t){return YR(e.subscribe,()=>t(e.get()),()=>t(e.get()))}var pe=Gb({ready:!1,bots:[],bot:null,sessionsByBot:{},sid:null,storedId:null,loading:!1,messages:[],live:null,approval:null,info:{model:"",title:""},files:[],routines:[],usage:null,error:""}),Sr=null,XR=0,Gs=e=>`${e}-${Date.now().toString(36)}-${(XR++).toString(36)}`;function Tg(e){return typeof e=="string"?e:Array.isArray(e)?e.map(t=>typeof t=="string"?t:t?.text||"").filter(Boolean).join(`
`):""}function QR(e){if(!e)return{};if(typeof e=="object")return e;try{return JSON.parse(e)}catch{return{}}}var JR=/^(write_file|create_file|patch|edit_file|apply_patch)$/;function $b(e,t){if(!JR.test(String(e||"")))return[];let o=t?.path||t?.file_path||t?.target;return typeof o=="string"&&o?[o]:[]}function Ag(e){let t=[];for(let o of String(e||"").matchAll(/MEDIA:\s*(\/[^\s)]+)/g))t.push(o[1]);return t}function Ub(e){e.length&&pe.set(t=>{let o=new Set(t.files.map(r=>r.path)),a=e.filter(r=>!o.has(r)).map(r=>({path:r,at:Date.now()}));return a.length?{files:[...a,...t.files]}:null})}function eS(e){let t=[],o=[],a=null;for(let r of e||[])if(!(!r||r.display_kind==="hidden"||r.role==="system")){if(r.role==="user"){a=null;let n=Tg(r.content);if(!n.trim())continue;t.push({id:r.message_uid||Gs("u"),role:"user",text:n,at:(r.timestamp||0)*1e3});continue}if(r.role==="assistant"){a||(a={id:r.message_uid||Gs("a"),role:"assistant",text:"",reasoning:"",tools:[],at:(r.timestamp||0)*1e3,status:"done",model:r.model||""},t.push(a));let n=Tg(r.content);n.trim()&&(a.text=a.text?`${a.text}

${n}`:n);let s=r.reasoning||r.reasoning_content;s&&typeof s=="string"&&(a.reasoning=a.reasoning?`${a.reasoning}

${s}`:s);for(let i of r.tool_calls||[]){let l=i?.function?.name||i?.name,c=QR(i?.function?.arguments||i?.arguments);a.tools.push({id:i?.id||Gs("t"),name:l,done:!0}),o.push(...$b(l,c))}o.push(...Ag(n));continue}}return{turns:t.filter(r=>r.role==="user"||r.text||r.tools.length),files:[...new Set(o)]}}async function tS(){let e=[];try{let a=await Jo.request("profiles.list",{});e=Array.isArray(a?.profiles)?a.profiles:[]}catch(a){pe.set({error:`Profils illisibles : ${a?.message||a}`})}let t=[];try{t=await Jo.profileRoutes()||[]}catch{t=[]}let o=e.map(a=>{let r=t.find(n=>n.profile===a.name)||null;return{name:a.name,display_name:a.display_name||"",description:a.description||"",model:a.model||"",provider:a.provider||"",connectionId:r?.connectionId||null,route:r}});return pe.set({bots:o}),o}async function zg(e){let t=pe.get().bots.find(o=>o.name===e);if(t)try{let a=((await Jo.listPersistedSessions(t.route,{profile:e,limit:60}))?.sessions||[]).filter(r=>!r.hidden&&!r.archived).map(r=>({id:r.id,title:r.title||r.preview||"Conversation",at:(r.last_active||r.updated_at||r.started_at||0)*1e3})).sort((r,n)=>n.at-r.at);pe.set(r=>({sessionsByBot:{...r.sessionsByBot,[e]:a}}))}catch{pe.set(a=>({sessionsByBot:{...a.sessionsByBot,[e]:a.sessionsByBot[e]||[]}}))}}async function Lg(e,{keepConversation:t=!1}={}){let o=pe.get().bots.find(a=>a.name===e);if(o){Sr?.storage?.set("lastBot",e),pe.set({bot:e,...t?{}:Ng()});try{await Jo.ensureAgent(o.connectionId,e)}catch(a){pe.set({error:`${e} injoignable : ${a?.message||a}`})}zg(e),Kc()}}function Ng(){return{sid:null,storedId:null,messages:[],live:null,approval:null,files:[],info:{model:"",title:""},error:""}}function qc(){pe.set(Ng())}async function Wb(e){let{bot:t}=pe.get();pe.set({...Ng(),storedId:e,loading:!0});try{let o=await Jo.request("session.resume",{session_id:e,cols:96,source:"desktop",...t?{profile:t}:{}}),{turns:a,files:r}=eS(o?.messages);pe.set({sid:o?.session_id||e,storedId:o?.stored_session_id||e,messages:a,files:r.map(n=>({path:n,at:0})),loading:!1,live:o?.running?{phase:"thinking",verb:"",subagents:0,startedAt:Date.now(),reasoning:""}:null}),o?.running&&Og()}catch(o){pe.set({loading:!1,error:`Conversation illisible : ${o?.message||o}`})}}function el(e){return(Sr?.storage?.get("prefs",{})||{})[e]||{}}function Fg(e,t){let o=Sr?.storage?.get("prefs",{})||{};o[e]={...o[e]||{},...t},Sr?.storage?.set("prefs",o)}function oS(e){return new Promise((t,o)=>{let a=new FileReader;a.onload=()=>t(String(a.result||"")),a.onerror=()=>o(a.error),a.readAsDataURL(e)})}async function aS(){let e=pe.get();if(e.sid)return e.sid;let t=el(e.bot),o=await Jo.request("session.create",{cols:96,source:"desktop",...e.bot?{profile:e.bot}:{},...t.model?{model:t.model,...t.provider?{provider:t.provider}:{}}:{},...t.effort?{reasoning_effort:t.effort}:{},fast:!1}),a=o?.session_id;return Wc.set(a,`${t.provider||""}|${t.model||""}|${t.effort||""}`),pe.set({sid:a,storedId:o?.stored_session_id||a}),a}var Wc=new Map;async function rS(e){let{bot:t}=pe.get(),o=el(t),a=`${o.provider||""}|${o.model||""}|${o.effort||""}`,r=Wc.get(e);if(r===void 0){Wc.set(e,a);return}if(r===a)return;Wc.set(e,a);let[n,s,i]=r.split("|");try{o.model&&(o.model!==s||(o.provider||"")!==n)&&await Jo.request("slash.exec",{session_id:e,command:`/model ${o.model}${o.provider?` --provider ${o.provider}`:""}`,confirm_expensive_model:!0}),(o.effort||"")!==i&&o.effort&&await Jo.request("slash.exec",{session_id:e,command:`/reasoning ${o.effort}`})}catch{}}async function Dg(e,t=[]){let o=String(e||"").trim();if(!(!o&&!t.length||pe.get().live)){pe.set(r=>({error:"",messages:[...r.messages,{id:Gs("u"),role:"user",text:o,at:Date.now(),attachments:t.map(n=>({name:n.name,kind:n.type?.startsWith("image/")?"image":"file"}))}],live:{phase:"thinking",verb:"",subagents:0,startedAt:Date.now(),reasoning:""}}));try{let r=!!pe.get().sid,n=await aS();r&&await rS(n);let s=[];for(let l of t){let c=await oS(l);if(l.type?.startsWith("image/"))await Jo.request("image.attach_bytes",{session_id:n,content_base64:c.split(",")[1]||"",filename:l.name});else{let u=await Jo.request("file.attach",{session_id:n,name:l.name,data_url:c});u?.ref_text&&s.push(u.ref_text)}}let i=[o,...s].filter(Boolean).join(`

`);await Jo.request("prompt.submit",{session_id:n,text:i}),Og()}catch(r){Kb(r?.message||String(r))}}}async function qb(){let{sid:e}=pe.get();if(e)try{await Jo.request("session.interrupt",{session_id:e})}catch{}}async function jb(){let e=pe.get().messages;for(let t=e.length-1;t>=0;t--)if(e[t].role==="user"){let o=e[t].text;return pe.set({messages:e.slice(0,t),error:""}),Dg(o)}}function Kb(e){pe.set(t=>({live:null,error:e||"La réponse n'est pas arrivée.",messages:t.messages.map(o=>o.status==="streaming"?{...o,status:o.text?"done":"failed"}:o)})),Hg()}var Ji=null;function Og(){if(Ji)return;let e=async()=>{let{sid:t,live:o}=pe.get();if(!t||!o)return Hg();try{let a=await Jo.request("approval.pending",{session_id:t}),n=(a?.approvals||a?.pending||(Array.isArray(a)?a:[]))[0];pe.set({approval:n?{requestId:n.request_id||n.id||"",command:n.command||"",description:n.description||"",allowPermanent:n.allow_permanent!==!1}:null})}catch{}};Ji=Sr?Sr.setInterval(e,1500):null,e()}function Hg(){typeof Ji=="function"&&Ji(),Ji=null}async function jc(e){let{sid:t,approval:o}=pe.get();if(!(!t||!o)){pe.set({approval:null});try{await Jo.request("approval.respond",{session_id:t,choice:e,...o.requestId?{request_id:o.requestId}:{}})}catch(a){pe.set({error:`Réponse non transmise : ${a?.message||a}`})}}}function nS(e){let t=e.messages[e.messages.length-1];return t&&t.role==="assistant"&&t.status==="streaming"?[t,e.messages.slice(0,-1)]:[null,e.messages]}function Zs(e){pe.set(t=>{let[o,a]=nS(t);o||(o={id:Gs("a"),role:"assistant",text:"",reasoning:"",tools:[],at:Date.now(),turnStart:t.live?.startedAt||Date.now(),status:"streaming",model:t.info.model},a=t.messages);let r=e({...o,tools:[...o.tools]});return{messages:[...a,r]}})}function Qn(e){pe.set(t=>t.live?{live:{...t.live,...e}}:null)}function Yb(e){if(!e||typeof e.type!="string")return;let t=pe.get(),o=e.payload||{};if(e.type==="sessions.changed"){t.bot&&zg(t.bot);return}if(!(!t.sid||e.session_id!==t.sid))switch(e.type){case"session.info":(o.title||o.model)&&pe.set({info:{model:o.model||t.info.model,title:o.title||t.info.title}});return;case"message.start":t.live||pe.set({live:{phase:"thinking",verb:"",subagents:0,startedAt:Date.now(),reasoning:""}}),Zs(a=>a);return;case"reasoning.delta":typeof o.text=="string"&&o.text&&(Zs(a=>({...a,reasoning:a.reasoning+o.text,thinkStart:a.thinkStart||Date.now()})),Qn({phase:t.live?.phase==="tool"?"tool":"thinking"}));return;case"tool.generating":Qn({phase:"tool",verb:""});return;case"tool.start":{let a=o.tool_name||o.name,r=o.args||{};if(Zs(n=>({...n,tools:[...n.tools,{id:o.tool_id||Gs("t"),name:a,done:!1}],thinkEnd:n.thinkEnd||Date.now()})),a==="delegate_task"){let n=Array.isArray(r.tasks)?r.tasks.length:1;Qn({phase:"delegating",subagents:Math.max(n,1),toolName:a})}else Qn({phase:"tool",toolName:a});return}case"tool.complete":{let a=o.tool_name||o.name;Zs(r=>({...r,tools:r.tools.map(n=>n.id===o.tool_id?{...n,done:!0,error:!!o.is_error}:n)})),Ub([...$b(a,o.args||{}),...Ag(typeof o.result=="string"?o.result:"")]),Qn({phase:"thinking",toolName:""});return}case"subagent.start":Qn({phase:"delegating",subagents:Math.max(1,pe.get().live?.subagents||0)});return;case"message.delta":typeof o.text=="string"&&o.text&&(Zs(a=>({...a,text:a.text+o.text,thinkEnd:a.thinkEnd||Date.now()})),Qn({phase:"writing"}));return;case"message.complete":{let a=typeof o.text=="string"?o.text:Tg(o.content),r=o.status==="error"||o.outcome==="failed";Zs(n=>({...n,text:a||n.text,reasoning:n.reasoning||(typeof o.reasoning=="string"?o.reasoning:""),status:r&&!a?"failed":"done",thinkEnd:n.thinkEnd||Date.now(),model:pe.get().info.model||n.model})),Ub(Ag(a)),pe.set({live:null,approval:null,...r&&!a?{error:o.error||"La réponse n'est pas arrivée."}:{}}),Hg(),t.bot&&zg(t.bot);return}case"error":case"message.error":Kb(o.message||o.error);return;default:e.type.startsWith("approval.")&&Og()}}async function Kc(){let{bot:e}=pe.get();if(e)try{let t=await Jo.request("cron.manage",{action:"list",include_disabled:!0,profile:e}),a=(Array.isArray(t?.jobs)?t.jobs:[]).filter(r=>{let n=/^\[bot:([a-z0-9][a-z0-9_-]*)\]/i.exec(r.name||"");return!n||n[1].toLowerCase()===e});pe.set({routines:a})}catch{pe.set({routines:[]})}}async function Yc(e=!1){if(Sr)try{let t=await Sr.rest(`/usage${e?"?fresh=1":""}`,{timeoutMs:2e4});pe.set({usage:t?.providers||[]})}catch{pe.set({usage:"off"})}}function Xb(e){Sr=e}async function Qb(){if(pe.get().ready)return;let e=await tS(),t=Sr?.storage?.get("lastBot",null),o=Jo.state.profile.get(),a=e.find(r=>r.name===t)||e.find(r=>r.name===o)||e[0];pe.set({ready:!0}),a&&await Lg(a.name),Yc()}var sS=[[/^read_file$/,"lit un fichier"],[/^(write_file|create_file)$/,"écrit un fichier"],[/^(patch|edit_file|apply_patch)$/,"modifie un fichier"],[/^search_files$/,"cherche dans les fichiers"],[/^(terminal|shell|bash|process)/,"lance une commande"],[/^web_search$/,"cherche sur le web"],[/^web_extract$/,"lit une page web"],[/^(browser|browser_exec|drive_preview)/,"navigue sur le web"],[/^execute_code$/,"exécute du code"],[/^vision_analyze$/,"regarde une image"],[/^image_generate$/,"génère une image"],[/^text_to_speech$/,"prépare un audio"],[/^skill_(view|manage)$|^skills_list$/,"consulte ses skills"],[/^memory$/,"met à jour sa mémoire"],[/^session_search$/,"fouille ses conversations"],[/^(todo|todo_list)$/,"organise ses tâches"],[/^clarify$/,"te pose une question"],[/^(cronjob|cronjob_manage)$/,"planifie une tâche"],[/^send_message$/,"envoie un message"],[/^tool_(search|describe|call)$/,"utilise un outil"],[/^connectors__([a-z0-9-]+)__/,e=>`utilise ${_g(e[1])}`],[/^mcp__([a-z0-9-]+)__/,e=>`utilise ${_g(e[1])}`]];function _g(e){return e&&e.charAt(0).toUpperCase()+e.slice(1)}function e2(e){let t=String(e||"");for(let[o,a]of sS){let r=o.exec(t);if(r)return typeof a=="function"?a(r):a}return t?`utilise ${t.replace(/_/g," ")}`:"travaille"}var iS={default:"Branco"};function kr(e){if(!e)return"Hermes";let t=typeof e=="string"?e:e.name,o=typeof e=="object"?(e.display_name||"").trim():"";return o||iS[t]||_g(String(t||"hermes").replace(/[-_]+/g," "))}var Vg=[["#ff9b80","#e2583a"],["#8fc2ff","#2f6fe0"],["#c4b3ff","#7c4ddb"],["#7ee8c4","#0f9d74"],["#ffd47a","#d48a06"],["#ff9fd0","#d63c8c"],["#86eadc","#0f8a7e"],["#c3ccd8","#5b6b80"]],Jb=["pebble","circle","squircle","flower","blob"];function lS(e){let t=2166136261;for(let o of String(e||""))t^=o.charCodeAt(0),t=Math.imul(t,16777619);return t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16,t>>>0}var Bg={default:[0,"pebble"],dex:[1,"squircle"],preto:[3,"flower"],mint:[6,"blob"],prism:[2,"circle"],youtubot:[5,"pebble"],"bot-builder":[4,"squircle"]};function $s(e){let t=e||"default";if(Bg[t])return{colors:Vg[Bg[t][0]],shape:Bg[t][1]};let o=lS(t);return{colors:Vg[o%Vg.length],shape:Jb[(o>>>5)%Jb.length]}}function Jn(e){return String(e||"").split("/").pop().replace(/-\d{8}$/,"")}function t2(e){return e?new Date(e).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}):""}var Us=["Aujourd'hui","Hier","7 derniers jours","Plus ancien"];function o2(e){if(!e)return"Plus ancien";let t=new Date(e),o=new Date,a=new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime();return t.getTime()>=a?Us[0]:t.getTime()>=a-864e5?Us[1]:t.getTime()>=a-6*864e5?Us[2]:Us[3]}function a2(e){if(!e)return"";let t=new Date(e).getTime()-Date.now();if(!Number.isFinite(t)||t<=0)return"";let o=Math.floor(t/36e5),a=Math.round(t%36e5/6e4);return o>=24?`dans ${Math.round(o/24)} j`:o>0?`dans ${o} h ${String(a).padStart(2,"0")}`:`dans ${a} min`}function r2(e,t,o){return`${e} ${e>1?o:t}`}import{useEffect as N2,useRef as CS,useState as RS}from"react";import{useEffect as g2,useId as IS,useRef as Pa}from"react";var Qc=[-3.2,3.2],Jc=-2.6,cS=2.4,uS=5.4,i2=4.4,dS=380,pS=13.4+.5,Xc=4,tl=2800,mS=2200,fS="M0 1C-0.6 0.55-1.3 0.1-1.3-0.45C-1.3-0.95-0.9-1.2-0.55-1.2C-0.25-1.2-0.05-1 0-0.8C0.05-1 0.25-1.2 0.55-1.2C0.9-1.2 1.3-0.95 1.3-0.45C1.3 0.1 0.6 0.55 0 1Z",Ot=e=>e*e*(3-2*e),Za=e=>Math.min(1,Math.max(0,e)),gS=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,l2=e=>1-(1-e)**3,ea=(e,t,o)=>e<=t||e>=o?0:Math.sin(Math.PI*(e-t)/(o-t)),ta=(e,t,o,a,r)=>e<=t||e>=r?0:e<o?Ot((e-t)/(o-t)):e<=a?1:1-Ot((e-a)/(r-a)),Ug=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function hS(e,t,o,a){let r=Math.cos;switch(e){case"circle":return .97+(.012+a*.03)*r(3*t+o*.5)+.008*r(5*t-o*.6);case"squircle":{let n=Math.abs(r(t)),s=Math.abs(Math.sin(t));return .9/(n**4+s**4)**.25+(.008+a*.02)*r(4*t+o*.6)}case"flower":return .95+(.075+a*.03)*r(8*t)+.012*r(3*t+o*.6);case"blob":return .97+(.05+a*.025)*r(3*t+1.5*Math.PI+.75*Math.sin(o*.3)+.25*Math.sin(o*.71))+(.022+a*.012)*r(2*t-o*.36)+.01*r(5*t+o*.5);default:return 1+(.038+a*.03)*r(5*t+.5*Math.PI+.75*Math.sin(o*.27)+.25*Math.sin(o*.63))+(.02+a*.02)*r(3*t+o*.45)+.01*r(7*t-o*.6)}}function c2(e){let t="";for(let o=0;o<96;o++){let a=o/96*Math.PI*2,r=e[o]*13.4;t+=`${o?"L":"M"}${(r*Math.cos(a)).toFixed(2)} ${(r*Math.sin(a)).toFixed(2)}`}return`${t}Z`}var bS=c2(new Float32Array(96).fill(1));function u2(e,t,o,a,r,n,s){let i=cS/2*r,l=Math.max(.35,uS/2*o*r)*(4/3),c=[e-i,t,e-i,t-l*(1-n),e+i,t-l*(1-s),e+i,t,e+i,t+l,e-i,t+l],u=t+.4,d=[e-1.7,u+1,e-1.5,u-1.6,e+1.5,u-1.6,e+1.7,u+1,e+1.1,u-.3,e-1.1,u-.3],p=c.map((f,m)=>(f+(d[m]-f)*a).toFixed(2));return`M${p[0]} ${p[1]}C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}C${p[8]} ${p[9]} ${p[10]} ${p[11]} ${p[0]} ${p[1]}Z`}function d2(e,t,o,a,r,n,s=0){let i=(2+a*.8-o*.3)*r,l=t-a*.4,c=t+.4+a*(a<0?2.4:1.6),u=c+o*1.8+s,d=c-o*2.4-s,p=v=>v.toFixed(2),f=l+n,m=l-n;return`M${p(e-i)} ${p(f)}Q${p(e)} ${p(u)} ${p(e+i)} ${p(m)}Q${p(e)} ${p(d)} ${p(e-i)} ${p(f)}Z`}var Mr={openL:1,openR:1,laughL:0,laughR:0,eyeScale:1,eyeY:0,heavy:0,droop:0,smile:.4,mouth:0,mouthW:1,mouthX:0,skew:0,taper:0,blush:0,gazeX:Number.NaN,gazeY:Number.NaN,wobble:0,bob:0,tilt:0,spin:1},n2={neutral:Mr,happy:{...Mr,openL:.9,openR:.9,laughL:.45,laughR:.45,smile:1,wobble:.15,bob:-.3},love:{...Mr,openL:.88,openR:.88,laughL:.55,laughR:.55,eyeScale:1.03,smile:1,mouthW:.9,blush:1,gazeX:-.6,gazeY:-.7,wobble:.12,bob:-.2,tilt:-3,spin:.7},laugh:{...Mr,openL:.9,openR:.9,laughL:.5,laughR:.5,smile:1,mouth:.1,wobble:.3,spin:1.4},surprised:{...Mr,openL:1.03,openR:1.03,eyeScale:1.07,eyeY:-.5,smile:0,mouth:1,mouthW:.95,wobble:.12,bob:-.6},sad:{...Mr,openL:.75,openR:.75,eyeScale:.92,droop:.85,eyeY:.5,smile:-1,mouthW:1.75,gazeX:0,gazeY:.75,bob:.8,tilt:-4,spin:.35},thinking:{...Mr,openL:.95,openR:.8,heavy:.2,smile:.1,mouthW:.6,mouthX:.9,skew:.5,tilt:5,spin:.6},sleepy:{...Mr,openL:.6,openR:.6,heavy:.65,eyeY:.5,smile:-.04,mouthW:.8,taper:.3,gazeX:0,gazeY:.6,bob:.5,spin:.3},wink:{...Mr,smile:.9,skew:.1,tilt:2,wobble:.1}},yS={surprised:16,sad:3.5,sleepy:2.5},wS=Object.keys(Mr),p2=()=>({dy:0,sy:0,tilt:0,faceY:0,scale:0,openL:1,openR:1,laughL:0,laughR:0,mouth:0,smile:0,width:1,skew:0,mouthX:0,yawn:0,blink:0,steady:!1,gaze:null}),Zg=[[.75,-.85],[.4,-1],[-.35,-.85]];function xS(e,t,o){let a=p2();switch(e){case"happy":{t<520&&(a.dy=-1.6*Math.abs(Math.sin(Math.PI*2*t/520))),a.tilt=3*Math.sin(Math.PI*2*t/3600);let r=ta(t%3600,1600,1900,2500,2900);a.laughL=a.laughR=.3*r,a.mouth=.22*r,a.dy-=.6*r;break}case"love":{t<600&&(a.dy=-1.4*ea(t,0,600)),a.tilt=5*Math.sin(Math.PI*2*t/4e3);let r=ta(t%4e3,1400,1900,2500,3200);a.laughL=a.laughR=.3*r,a.scale+=.05*r,a.sy+=.03*r,a.dy-=.8*r,a.mouth+=.1*r;break}case"laugh":{let n=Math.floor(t/5600),s=t%5600,i=Ug(n)<.5?-1:1,l=ea(s,0,340);a.dy-=1.2*l,a.sy+=.04*l,a.scale+=.1*l,a.laughL=a.laughR=-.5*l,a.mouth+=.25*l;let c=ta(s,220,380,3e3,3700);if(a.laughL+=.5*c,a.laughR+=.5*c,a.mouth+=.25*ta(s,220,400,3400,4400),s>260&&s<2900){let u=(s-260)/2640,d=15*u-3*u*u,p=Math.abs(Math.sin(Math.PI*d))**.8,f=(1-.7*u)*(.6+.4*Ug(n*17+Math.floor(d)))*Ot(Math.min(1,(s-260)/120));a.mouth+=.6*p*f,a.dy-=1.4*p*f,a.sy-=.035*p*f,a.scale-=.1*p*f,a.tilt+=2.5*p*f*i}else if(s>=2900&&s<4300){let u=(s-2900)/1400,d=Math.abs(Math.sin(Math.PI*u*4.2)),p=.4*(1-u);a.mouth+=.4*d*p,a.dy-=.8*d*p}a.tilt-=7*i*ta(s,260,600,1800,2900),a.sy-=.02*ea(s,4300,5300),s>4300&&(a.gaze=[0,0]),a.steady=s<3600;break}case"surprised":{let r=t<900?t<120?Ot(t/120):1-Ot((t-120)/780):0;a.scale+=.12*r,a.dy-=3*ea(t,0,420),a.sy+=.06*ea(t,0,380),a.mouth+=.3*r,a.steady=t<1800;let n=t<600?-1:(t-600)%4200,s=ta(n,300,380,640,720),i=ta(n,700,780,1090,1170);a.gaze=n>=300&&n<700?[-.85,-.1]:n>=700&&n<1150?[.85,-.1]:[0,0],a.tilt+=-3*s+3*i,a.blink=Math.max(ea(n,1700,1850),ea(n,1950,2100));let l=Ot(Za((t-2600)/900));a.mouth-=.45*l,a.width*=1-.2*l;break}case"sad":{let r=t%7e3;a.sy-=.045*ea(r,0,1400),a.dy+=.5*ta(r,700,1100,1800,2400);let n=ta(r,3e3,3200,3800,4100);a.gaze=[0,.75-.9*n],a.openL=a.openR=1+.15*n,a.dy-=.4*n;let s=ta(r,4400,4600,5300,5600);a.skew+=.12*Math.sin(o/40)*s,a.mouth+=.05*s,a.smile-=.15*s,a.tilt+=1.5*Math.sin(o/2200);break}case"thinking":{let r=t%6400;a.gaze=r<1200?Zg[0]:r<2400?Zg[1]:Zg[2];let n=ta(r,1200,1500,2100,2400);a.mouthX-=1.8*n,a.skew-=n,a.tilt-=9*n;let s=ta(r,4100,4250,5600,6200);s>.3&&(a.gaze=[0,0]),a.openL*=1+.2*s,a.openR*=1+.4*s,a.scale+=.08*s,a.smile+=.8*s,a.mouthX-=.9*s,a.skew-=.5*s,a.width*=1+.5*s,a.mouth+=.15*s,a.tilt-=5*s,a.dy-=1.6*ea(r,4100,4500),a.tilt+=1.5*Math.sin(o/900);break}case"sleepy":{let r=t%9200,n=r<3e3?Ot(r/3e3):r<3200?1-Ot((r-3e3)/200):0;a.openL=a.openR=1-.8*n,a.dy+=1.6*n,a.tilt+=6*n,a.gaze=[0,.6+.4*n];let s=ea(r,3e3,3350);a.openL*=1+.9*s,a.openR*=1+.9*s,a.dy-=1.4*s,a.scale+=.1*s,r>=3e3&&r<4200&&(a.gaze=[0,0]),a.blink=Math.max(ea(r,3550,3780),ea(r,3900,4130)),a.yawn=ta(r,5400,6200,6800,7600),a.tilt+=2*Math.sin(o/1700),a.steady=r<3e3;break}case"wink":{let r=t%3200,n=0;if(r>150&&r<950){let s=(r-150)/800;n=s<.2?Ot(s/.2):s<.75?1:1-Ot((s-.75)/.25)}a.laughR+=n,a.laughL+=.25*n,a.openL*=1-.12*n,a.skew+=.45*n,a.smile+=.1*n,a.tilt+=5*n,a.dy-=.9*ea(r,150,450),n>0&&(a.gaze=[0,0]),a.steady=n>0;break}}return a}var m2={jump:950,spin:600,bounce:1200,wiggle:800,float:2200},Gg=4.5,Ea={dy:0,rot:0,sx:1,sy:1,yaw:0,joy:0,gaze:null};function vS(e,t){let o=Za(t/m2[e]);switch(e){case"jump":{if(t<160){let n=Ot(t/160);return{...Ea,sx:1+.1*n,sy:1-.14*n,joy:n*.6}}if(t<560){let n=(t-160)/400,s=.09*Math.abs(Math.cos(Math.PI*n));return{...Ea,dy:-44*n*(1-n),sx:1-s*.6,sy:1+s,joy:1}}let a=(t-560)/390,r=.16*Math.exp(-5*a)*Math.cos(10*a);return{...Ea,sx:1+r*.7,sy:1-r,joy:1-Ot(a)}}case"spin":{if(t<90){let n=Ot(t/90);return{...Ea,yaw:-30*n,sx:1+.06*n,sy:1-.08*n,joy:.3*n,gaze:[-.6*n,0]}}if(t<440){let n=(t-90)/350,s=Math.sin(Math.PI*n)**2,i=1-Ot(Math.min(1,n*4));return{...Ea,yaw:-30+390*gS(n),dy:-2.6*s,sx:1+.06*i,sy:1-.08*i+.04*s,joy:.8,gaze:[.8*s,0]}}let a=(t-440)/160,r=.025*Math.sin(Math.PI*a)*(1-a);return{...Ea,yaw:360,sx:1+r*.7,sy:1-r,joy:.8*(1-a)}}case"bounce":{let a=Math.abs(Math.sin(Math.PI*3*o)),r=.08*(1-a)**6;return{...Ea,dy:-5*a,sx:1+r*.8,sy:1-r,joy:Math.sin(Math.PI*o)}}case"wiggle":return{...Ea,rot:14*Math.sin(Math.PI*8*o)*(1-o),joy:.6*Math.sin(Math.PI*o)};case"float":{let a=[0,.9];if(t<520){let s=t/520,i=.05*Math.sin(Math.PI*s);return{...Ea,dy:-Gg*l2(s),sx:1-i*.6,sy:1+i,joy:.5*s,gaze:s>.4?a:null}}if(t<1500){let s=(t-520)/980;return{...Ea,dy:-Gg+.8*Math.sin(Math.PI*3*s),rot:4*Math.sin(Math.PI*2*s),joy:.5,gaze:a}}if(t<1820){let s=(t-1500)/320;return{...Ea,dy:-Gg*(1-s*s),sx:1-.02*s,sy:1+.04*s,joy:.5,gaze:a}}let r=(t-1820)/380,n=.12*Math.exp(-5*r)*Math.cos(10*r)*(1-r);return{...Ea,sx:1+n*.7,sy:1-n,joy:.5*(1-r)}}}}var Er={viewBox:"-24 -24 48 48",body:bS,eyes:Qc.map(e=>u2(e,Jc,1,0,1,0,0)),blush:Qc.map(e=>({cx:e*1.6,cy:Jc+4.6})),mouth:d2(0,i2,0,.4,1,0),groundY:pS,heart:fS,hearts:Xc},s2=e=>({emotion:e.emotion??"neutral",activity:e.activity??"idle",shape:e.shape??"pebble",lookAround:e.lookAround??!0,followCursor:e.followCursor??!1,hoverGiggle:e.hoverGiggle??!0});function f2(e,t={}){let o={config:s2(t),playing:t.motion?{name:t.motion,start:performance.now()}:null,morph:null,onMotionEnd:t.onMotionEnd,onTickle:t.onTickle,tickledAt:-1/0,chuckledAt:-1/0},a=new Float32Array(96).fill(1),r=o.config.shape,n=t.motion??null,s=t.motionKey??0,i=t.chuckleKey??0,l=()=>{let J=performance.now();o.config.hoverGiggle&&J-o.tickledAt>1300&&(o.tickledAt=J,o.onTickle?.())};e.mover.addEventListener("pointerenter",l);let c=window.matchMedia("(prefers-reduced-motion: reduce)").matches,u=null,d=J=>{u=J.pointerType==="mouse"?{x:J.clientX,y:J.clientY}:null},p=()=>{u=null};window.addEventListener("pointermove",d,{passive:!0}),document.documentElement.addEventListener("pointerleave",p);let f={...n2[o.config.emotion]},m=Math.random()*1e3,v=0,h=performance.now(),y=0,x=0,g=0,b=0,w=h+600+Math.random()*1800,C=h+800+Math.random()*2600,R=-1,I=!1,S=-1/0,M=0,T=0,V=h+4e3+Math.random()*4e3,F=Math.random()*360,L=13.4,P=0,H=7,D=0,N=0,A=0,E=5.5,G=1,z=1,oe=0,X=0,Z=6,U=!1,ae=-1/0,we=h+900,j=-1/0,Y=0,q=null,re=h,ge=-1/0,ee=-1/0,Me=J=>{let ce=Math.min(.064,(J-h)/1e3);h=J;let ie=c?0:J/1e3+m,he=o.config;he.emotion!==q&&(q==="love"&&(ee=J),q=he.emotion,re=J,q==="love"&&(ge=J,ee=1/0));let le=J-re,We=n2[q],Oe=Math.min(1,ce*(yS[q]??8));for(let Pe of wS){let k=We[Pe];Number.isNaN(k)?f[Pe]=Number.NaN:Number.isNaN(f[Pe])?f[Pe]=k:f[Pe]+=(k-f[Pe])*Oe}let xe=c?p2():xS(q,le,J),$=0,Q=0;if(he.activity==="speaking"){J>X&&J>oe&&(oe=J+160+Math.random()*260,Z-=1,U=Z<=0,X=oe+(U?520+Math.random()*420:60+Math.random()*120),U&&(Z=4+Math.floor(Math.random()*5)),Math.random()<.3&&(ae=J));let Pe=J<oe;$=Pe?.55+.35*Math.abs(Math.sin(J/70)):0,Pe?(A+=ce*E*Math.PI*2,A>=Math.PI*2&&(A-=Math.PI*2,E=4.6+Math.random()*2,G=Math.random()<.18?.12:.55+Math.random()*.45,z=Math.random()<.4?.62+Math.random()*.12:1+Math.random()*.2),Q=Math.min(1,(.35+D)*G*(.5-.5*Math.cos(A)))):A=0;let k=ea(J-ae,0,280);xe.dy-=.7*k,xe.scale+=.06*k}else he.activity==="listening"&&($=.18+.14*Math.sin(J/240)*Math.sin(J/610));D+=($-D)*Math.min(1,ce*12),N+=(Q-N)*Math.min(1,ce*(Q>N?30:20));let Ee=Ea,ue=o.playing;if(ue&&!c){let Pe=J-ue.start;Pe>=m2[ue.name]?(o.playing=null,o.onMotionEnd?.(ue.name)):Ee=vS(ue.name,Pe)}let be=he.activity==="listening"?1:0;if(be&&!ue&&J>we&&(j=J,Y+=1,we=J+2400+Math.random()*1800),be&&!c){let Pe=J-j;if(Y%3===0){let k=ta(Pe,0,160,700,1e3);xe.scale+=.08*k,xe.faceY-=.6*k,xe.mouth+=.18*k,xe.smile-=.3*k,xe.dy-=.5*k}else{let k=ea(Pe,0,300)+.7*ea(Pe,340,640);xe.dy+=1.6*k,xe.faceY+=1.2*k,xe.sy-=.02*k,xe.openL*=1-.15*k,xe.openR*=1-.15*k,xe.smile+=.1*k}xe.tilt+=4+1.5*Math.sin(J/2600)}let bt=!1,ct=he.followCursor&&u?e.svg.getBoundingClientRect():void 0;if(u&&ct&&ct.width>0){let Pe=u.x-(ct.left+ct.width/2),k=u.y-(ct.top+ct.height/2),K=ct.width*.9;bt=!0,g=Pe/(Math.abs(Pe)+K),b=k/(Math.abs(k)+K),w=J+700}let ut=Ee.gaze??xe.gaze;bt||(ut?(g=ut[0],b=ut[1]):Number.isNaN(f.gazeX)?J>w&&(he.activity==="listening"?(g=(Math.random()-.5)*.3,b=-.05+(Math.random()-.5)*.15):he.activity==="speaking"?(g=U?Math.random()<.5?-.7:.7:(Math.random()-.5)*.5,b=U?-.5:(Math.random()-.5)*.3):he.lookAround?(g=[-1,-.6,0,0,.6,1][Math.floor(Math.random()*6)],b=(Math.random()-.5)*1.2):(g=0,b=0),w=J+(he.activity==="speaking"?500+Math.random()*900:900+Math.random()*2300)):(g=f.gazeX,b=f.gazeY));let ot=Math.min(1,ce*(bt?14:16));y+=(g-y)*ot,x+=(b-x)*ot;let yt=Math.min(1,ce*5);M+=(y-M)*yt,T+=(x-T)*yt,xe.steady&&R<0&&(C=Math.max(C,J+400)),R<0&&J>C&&(R=J);let Qo=1;if(R>=0){let Pe=(J-R)/(q==="sleepy"?460:q==="sad"?280:170);Pe>=1?(R=-1,!I&&Math.random()<.22?(I=!0,C=J+90):(I=!1,C=J+2e3+Math.random()*3200)):Qo=1-Math.sin(Pe*Math.PI)*.88}Qo*=1-xe.blink*.9;let Ct=J-o.tickledAt,kt=0,Sa=0;he.hoverGiggle&&Ct<1300&&(kt=Ct<180?Ot(Ct/180):Ct<800?1:1-Ot((Ct-800)/500),Sa=Math.sin(Ct/42)*Math.max(0,1-Ct/520));let Dt=J-o.chuckledAt,Do=Dt>0&&Dt<1700?.45*ta(Dt,0,260,1e3,1700):0;kt=Math.max(kt,Do),q==="neutral"&&he.activity==="idle"&&J>V&&(S=J,V=J+5e3+Math.random()*6e3);let Va=q==="neutral"?ta(J-S,0,380,1100,1600):0,ka=q==="sleepy"?1:0,ko=xe.yawn,Bo=he.shape,nr=f.wobble+D*.6+kt*.25,_e=Bo==="squircle"?90:Bo==="blob"?120:Bo==="pebble"?72:0,Rt=_e?0:3.5+D*18;F=c?F:(F+ce*Rt*f.spin)%360,_e&&(F+=(Math.round(F/_e)*_e-F)*Math.min(1,ce*4));let Ie=o.morph,Re=Ie?Ot(Za((J-Ie.start)/dS)):1,Ke=F*Math.PI/180,Tt=a;for(let Pe=0;Pe<96;Pe++){let k=hS(Bo,Pe/96*Math.PI*2-Ke,ie,nr);Tt[Pe]=Ie&&Re<1?Ie.from[Pe]+(k-Ie.from[Pe])*Re:k}Ie&&Re>=1&&(o.morph=null);let ha=1+(c?0:ka?.03*Math.sin(ie/1.1):.015*Math.sin(ie/.9))+D*.04;e.body.setAttribute("d",c2(Tt)),e.bodyGroup.setAttribute("transform",`scale(${ha.toFixed(4)})`);let wt=Ee.yaw*Math.PI/180,_o=f.bob+ka*.4*Math.sin(J/1100)-kt*.5+N*.25-ko*.5,vr=f.tilt+xe.tilt+Sa*4+Ee.rot,sr=Ee.dy+_o+xe.dy,Ba=Math.min(0,sr),ir=.7*Math.max(0,sr)/(2*13.4),Yn=Ee.sy*(1+xe.sy+ko*.03)*(1-ir),fn=Ee.sx*(1-(xe.sy+ko*.03)*.5)*(1-.04*Math.abs(Math.sin(wt)))*(1+ir*.5),Hs=vr*Math.PI/180,gn=0;for(let Pe=0;Pe<96;Pe++)gn=Math.max(gn,Tt[Pe]*Math.sin(Pe/96*Math.PI*2+Hs));gn*=13.4*ha;let Ir=1/0,Vs=-1/0;for(let Pe=0;Pe<96;Pe++){let k=Pe/96*Math.PI*2+Hs,K=Tt[Pe]*13.4*ha;K*Math.sin(k)<gn-2.2||(Ir=Math.min(Ir,K*Math.cos(k)),Vs=Math.max(Vs,K*Math.cos(k)))}L+=(gn-L)*Math.min(1,ce*12),e.mover.setAttribute("transform",`translate(0 ${Ba.toFixed(2)}) translate(0 ${13.4}) scale(${fn.toFixed(4)} ${Yn.toFixed(4)}) translate(0 ${(-L).toFixed(2)}) rotate(${vr.toFixed(2)})`);let Cr=Za(-Ba/10),Wi=(Vs-Ir)/2*fn,Eg=(Ir+Vs)/2*fn;P+=(Eg-P)*Math.min(1,ce*12),H+=(Wi-H)*Math.min(1,ce*12);let Xn=e.ground;Xn&&(Xn.setAttribute("cx",(P*(1-Cr)).toFixed(2)),Xn.setAttribute("rx",((H+3.2)*(1+.25*Cr)).toFixed(2)),Xn.setAttribute("ry",(2*(1+.2*Cr)).toFixed(2)),Xn.setAttribute("opacity",((1-.65*Cr)*(.9+2*ir)).toFixed(3)));let Rr=e.core;Rr&&(Rr.setAttribute("cx",P.toFixed(2)),Rr.setAttribute("rx",(H*.95*(1-.4*Cr)).toFixed(2)),Rr.setAttribute("ry",(.85*(1-.3*Cr)).toFixed(2)),Rr.setAttribute("opacity",((1-Cr)**2*(.9+3*ir)).toFixed(3)));let qi=e.face;if(qi){let Pe=Math.cos(wt);qi.setAttribute("transform",`translate(${(Math.sin(wt)*13.4*.72).toFixed(2)} 0) scale(${Math.max(.001,Math.abs(Pe)).toFixed(3)} 1)`),qi.setAttribute("opacity",Ot(Za((Pe+.1)/.35)).toFixed(3))}let Gc=1-Ot(Za((J-ee)/200));e.hearts.forEach((Pe,k)=>{if(!Pe)return;let K=J-ge-250-k*(tl/Xc),te=Math.floor(K/tl),se=(K-te*tl)/mS,dt=ge+250+k*(tl/Xc)+te*tl;if(c||!(K>=0&&K<1/0)||se>=1||dt>ee||Gc<=0){Pe.setAttribute("opacity","0");return}let et=(k+te)%2?1:-1,pt=Ug(te*Xc+k),It=et*(12+1.5*pt+2*se)+.9*Math.sin(Math.PI*2*(1.1*se+pt)),_a=Ba-4-pt*2-14*l2(se),_s=(.75+.35*pt)*(.5+.5*Ot(Za(se/.18))),Pg=et*10+14*Math.sin(Math.PI*2*(.9*se+pt));Pe.setAttribute("transform",`translate(${It.toFixed(2)} ${_a.toFixed(2)}) rotate(${Pg.toFixed(1)}) scale(${_s.toFixed(3)})`),Pe.setAttribute("opacity",(Gc*Ot(Za(se/.12))*(1-Ot(Za((se-.55)/.45)))).toFixed(3))});let ji=Math.max(Ee.joy,Va),ca=1-kt,Ki=Math.min(1,f.smile+xe.smile+(1-f.smile)*ji+be*.15),Yi=Math.max(-1,(Ki+(1-Ki)*kt)*(1-ko)),hn=1-.18*Math.max(0,(Yi-.6)/.4),Ma=[f.openL*xe.openL,f.openR*xe.openR],Uc=[f.laughL+xe.laughL,f.laughR+xe.laughR];e.eyes.forEach((Pe,k)=>{if(!Pe)return;let K=Qc[k]+y*1.8*ca,te=Jc+f.eyeY+xe.faceY+x*1.1*ca,se=Za(Math.max(Uc[k],kt,Ee.joy*.8)),dt=Math.min(.9,f.heavy+f.droop),et=Math.min(.9,f.heavy),pt=Ma[k]*Qo*hn*(1-ko*.85);Pe.setAttribute("d",u2(K,te,pt,se,f.eyeScale+xe.scale+be*.04,k===0?dt:et,k===0?et:dt)),Pe.setAttribute("stroke-width",(se*.7).toFixed(2));let It=e.blush[k];It&&(It.setAttribute("cx",(Qc[k]*1.6+y*1.2*ca).toFixed(2)),It.setAttribute("cy",(Jc+4.6+xe.faceY+x*.7*ca).toFixed(2)),It.setAttribute("opacity",Za(f.blush).toFixed(3)))});let $c=kt*(.3+.25*Math.abs(Math.sin(J/85))),Xi=f.mouthW*xe.width*(1+(z-1)*N)*(1-ko*.1),Qi=Za(-Yi+f.taper*(1-ko)),Bs=e.mouth;if(Bs){Bs.setAttribute("d",d2((f.mouthX+xe.mouthX)*(1-ko)+M*1.2*ca,i2+f.eyeY*.5+xe.faceY+T*.6*ca,Math.max(0,f.mouth+xe.mouth,N,$c,Ee.joy*.35,ko*2.1),Yi,Xi,(f.skew+xe.skew)*(1-ko),.9*Qi));let Pe=Math.min(1,.55+.45*Xi);Bs.setAttribute("stroke-width",(1.4*Pe*(1-.6*Qi)).toFixed(2))}v=requestAnimationFrame(Me)};v=requestAnimationFrame(Me);let ne=()=>{cancelAnimationFrame(v),window.removeEventListener("pointermove",d),document.documentElement.removeEventListener("pointerleave",p)};return{update(J){o.config=s2(J),o.onMotionEnd=J.onMotionEnd,o.onTickle=J.onTickle,o.config.shape!==r&&(r=o.config.shape,o.morph={from:a.slice(),start:performance.now()});let ce=J.motion??null,ie=J.motionKey??0;(ce!==n||ie!==s)&&(n=ce,s=ie,o.playing=ce?{name:ce,start:performance.now()}:null);let he=J.chuckleKey??0;he!==i&&(i=he,o.chuckledAt=performance.now()+140+Math.random()*160)},destroy(){ne(),e.mover.removeEventListener("pointerenter",l)}}}import{jsx as Zo,jsxs as ol}from"react/jsx-runtime";function bn({colors:e,size:t=24,label:o="Agent",emotion:a="neutral",activity:r="idle",shape:n="pebble",motion:s,motionKey:i,lookAround:l=!1,hoverGiggle:c=!0,className:u=""}){let d=`hui-bot-${IS().replace(/:/g,"")}`,p={svg:Pa(null),mover:Pa(null),bodyGroup:Pa(null),body:Pa(null),face:Pa(null),mouth:Pa(null),ground:Pa(null),core:Pa(null)},f=Pa([]),m=Pa([]),v=Pa([]),h=Pa(null),y={emotion:a,activity:r,shape:n,lookAround:l,hoverGiggle:c,...s?{motion:s,motionKey:i}:{}},x=Pa(y);g2(()=>{x.current=y,h.current?.update?.(y)}),g2(()=>{let b=Object.fromEntries(Object.entries(p).map(([w,C])=>[w,C.current]));if(!Object.values(b).some(w=>!w)){try{h.current=f2({...b,eyes:f.current,blush:m.current,hearts:v.current},x.current)}catch{h.current=null}return()=>{h.current?.destroy?.(),h.current=null}}},[]);let g={"--bot-size":`${t}px`,...e?{"--bot-1":e[0],"--bot-2":e[1]}:null};return Zo("span",{className:`hui-bot ${u}`,style:g,role:"img","aria-label":o,children:ol("svg",{ref:p.svg,viewBox:Er.viewBox,"aria-hidden":"true",children:[ol("defs",{children:[ol("radialGradient",{id:d,gradientUnits:"userSpaceOnUse",cx:"-4.8",cy:"-6.4",r:"24",children:[Zo("stop",{className:"stop1",offset:"0"}),Zo("stop",{className:"stop2",offset:"1"})]}),Zo("filter",{id:`${d}-soft`,x:"-50%",y:"-300%",width:"200%",height:"700%",children:Zo("feGaussianBlur",{stdDeviation:"1.3"})}),Zo("filter",{id:`${d}-core`,x:"-50%",y:"-300%",width:"200%",height:"700%",children:Zo("feGaussianBlur",{stdDeviation:"0.8"})}),Zo("filter",{id:`${d}-blush`,x:"-100%",y:"-100%",width:"300%",height:"300%",children:Zo("feGaussianBlur",{stdDeviation:"0.55"})})]}),Zo("ellipse",{ref:p.ground,className:"ground",cx:"0",cy:Er.groundY,rx:"10",ry:"2.1",filter:`url(#${d}-soft)`}),Zo("ellipse",{ref:p.core,className:"core",cx:"0",cy:Er.groundY,rx:"6.5",ry:"0.9",filter:`url(#${d}-core)`}),ol("g",{ref:p.mover,children:[Zo("g",{ref:p.bodyGroup,children:Zo("path",{ref:p.body,d:Er.body,fill:`url(#${d})`})}),ol("g",{ref:p.face,children:[Er.blush.map((b,w)=>Zo("ellipse",{ref:C=>{m.current[w]=C},className:"blush",cx:b.cx,cy:b.cy,rx:"1.9",ry:"1.1",opacity:"0",filter:`url(#${d}-blush)`},`b${w}`)),Er.eyes.map((b,w)=>Zo("path",{ref:C=>{f.current[w]=C},className:"face",d:b,strokeWidth:0,strokeLinejoin:"round"},`e${w}`)),Zo("path",{ref:p.mouth,className:"face",d:Er.mouth,strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round"})]})]}),Array.from({length:Er.hearts},(b,w)=>Zo("path",{ref:C=>{v.current[w]=C},className:"heart",d:Er.heart,opacity:"0"},w))]})})}import{jsx as Ze,jsxs as Ga}from"react/jsx-runtime";var Mo={width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},h2=e=>Ga("svg",{...Mo,...e,children:[Ze("path",{d:"M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z"}),Ze("path",{d:"m13.5 6.5 4 4"})]}),b2=e=>Ga("svg",{...Mo,...e,children:[Ze("circle",{cx:"12",cy:"12",r:"3"}),Ze("path",{d:"M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"})]}),y2=e=>Ga("svg",{...Mo,...e,children:[Ze("rect",{x:"8",y:"8",width:"12",height:"12",rx:"2.5"}),Ze("path",{d:"M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"})]}),w2=e=>Ze("svg",{...Mo,...e,children:Ze("path",{d:"m5 12.5 4.5 4.5L19 7.5"})}),x2=e=>Ga("svg",{...Mo,strokeWidth:2,...e,children:[Ze("path",{d:"M12 19V5"}),Ze("path",{d:"m6 11 6-6 6 6"})]}),v2=e=>Ga("svg",{...Mo,...e,children:[Ze("path",{d:"M12 5v14"}),Ze("path",{d:"m6 13 6 6 6-6"})]}),I2=e=>Ze("svg",{...Mo,...e,children:Ze("rect",{x:"7",y:"7",width:"10",height:"10",rx:"2",fill:"currentColor",stroke:"none"})}),C2=e=>Ze("svg",{...Mo,...e,children:Ze("path",{d:"m20 11.5-8.2 8.2a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8"})}),R2=e=>Ze("svg",{...Mo,...e,children:Ze("path",{d:"m6 9 6 6 6-6"})}),S2=e=>Ze("svg",{...Mo,...e,children:Ze("path",{d:"m4.5 15.75 7.5-7.5 7.5 7.5"})}),k2=e=>Ze("svg",{...Mo,...e,children:Ze("path",{d:"M6 6l12 12M18 6 6 18"})}),M2=e=>Ga("svg",{...Mo,...e,children:[Ze("rect",{x:"3",y:"4",width:"18",height:"16",rx:"3"}),Ze("path",{d:"M15 4v16"})]}),eu=e=>Ga("svg",{...Mo,...e,children:[Ze("path",{d:"M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"}),Ze("path",{d:"M14 3v5h5"})]}),E2=e=>Ga("svg",{...Mo,...e,children:[Ze("circle",{cx:"12",cy:"12",r:"8.5"}),Ze("path",{d:"M12 7.5V12l3 2"})]}),P2=e=>Ze("svg",{...Mo,...e,children:Ze("path",{d:"M12 5v14M5 12h14"})}),$g=e=>Ga("svg",{...Mo,...e,children:[Ze("path",{d:"M4 7h10M18 7h2M4 17h4M12 17h8"}),Ze("circle",{cx:"16",cy:"7",r:"2"}),Ze("circle",{cx:"10",cy:"17",r:"2"})]}),T2=e=>Ze("svg",{...Mo,...e,children:Ze("path",{d:"M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"})}),A2=e=>Ga("svg",{...Mo,...e,children:[Ze("path",{d:"M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0z"}),Ze("path",{d:"M12 16v5"})]}),z2=e=>Ga("svg",{...Mo,...e,children:[Ze("rect",{x:"4",y:"4",width:"7",height:"7",rx:"1.5"}),Ze("rect",{x:"13",y:"4",width:"7",height:"7",rx:"1.5"}),Ze("rect",{x:"4",y:"13",width:"7",height:"7",rx:"1.5"}),Ze("rect",{x:"13",y:"13",width:"7",height:"7",rx:"1.5"})]}),L2=e=>Ga("svg",{...Mo,...e,children:[Ze("path",{d:"M20 11a8 8 0 0 0-14.3-4.9L4 8"}),Ze("path",{d:"M4 4v4h4"}),Ze("path",{d:"M4 13a8 8 0 0 0 14.3 4.9L20 16"}),Ze("path",{d:"M20 20v-4h-4"})]});import{jsx as Xe,jsxs as At}from"react/jsx-runtime";function SS({bot:e,selected:t,busy:o}){let a=$s(e.name);return At("button",{type:"button",className:"hui-row","aria-current":t?"page":void 0,onClick:()=>Lg(e.name),children:[Xe(bn,{size:20,colors:a.colors,shape:a.shape,label:kr(e),activity:o?"speaking":"idle",emotion:o?"thinking":"neutral",hoverGiggle:!1}),Xe("span",{className:"hui-row-label",children:kr(e)}),o?Xe("span",{className:"hui-pip","data-tone":"busy","aria-label":"En train de travailler"}):null]})}function kS(){let e=Ye(pe,r=>r.bot),t=Ye(pe,r=>r.bot?r.sessionsByBot[r.bot]:void 0),o=Ye(pe,r=>r.storedId);return e?t?t.length?Us.map(r=>({label:r,rows:t.filter(n=>o2(n.at)===r)})).filter(r=>r.rows.length).map(r=>At("div",{children:[Xe("p",{className:"hui-section",children:r.label}),Xe("div",{className:"hui-list",children:r.rows.slice(0,40).map(n=>Xe("button",{type:"button",className:"hui-row is-conv","aria-current":n.id===o?"page":void 0,onClick:()=>Wb(n.id),title:n.title,children:Xe("span",{className:"hui-row-label",children:n.title})},n.id))})]},r.label)):Xe("p",{className:"hui-empty-line",children:"Aucune conversation pour l'instant."}):Xe("p",{className:"hui-empty-line",children:"Chargement…"}):null}function MS(e){return e>=95?"fail":e>=80?"warn":"accent"}function ES(){let e=Ye(pe,o=>o.usage);if(N2(()=>{let o=setInterval(()=>Yc(),12e4);return()=>clearInterval(o)},[]),e==="off")return null;let t=Array.isArray(e)?e:[{id:"claude",label:"Claude",windows:[]},{id:"opencode_go",label:"OpenCode Go",windows:[]}];return Xe("button",{type:"button",className:"hui-usage",onClick:()=>Yc(!0),title:"Usage des abonnements — cliquer pour rafraîchir",children:t.map(o=>{let a=o.windows?.find(s=>s.id==="session"),r=o.windows?.find(s=>s.id==="week"||s.id==="weekly"),n=a?Math.round(a.used):null;return At("span",{className:"hui-usage-row",children:[At("span",{className:"hui-usage-head",children:[Xe("span",{className:"hui-usage-name",children:o.label}),n===null?Xe("span",{className:"hui-usage-val is-off",children:e===null?"…":"Non connecté"}):At("span",{className:"hui-usage-val",children:[n," %"]})]}),Xe("span",{className:"hui-track","aria-hidden":"true",children:Xe("span",{className:"hui-fill","data-tone":n===null?"empty":MS(n),style:{"--pct":n===null?0:Math.min(100,n)/100}})}),n!==null?At("span",{className:"hui-usage-sub",children:[At("span",{children:["5 h",a?.resetsAt?` · ${a2(a.resetsAt)}`:""]}),r?At("span",{children:["Semaine ",Math.round(r.used)," %"]}):null]}):null]},o.id)})})}function PS({ctx:e}){let[t,o]=RS(!1),a=CS(null);N2(()=>{if(!t)return;let n=i=>{a.current?.contains(i.target)||o(!1)},s=i=>{i.key==="Escape"&&o(!1)};return document.addEventListener("pointerdown",n),document.addEventListener("keydown",s),()=>{document.removeEventListener("pointerdown",n),document.removeEventListener("keydown",s)}},[t]);let r=n=>{o(!1),e.runAction(n)};return At("div",{ref:a,style:{position:"relative"},children:[Xe("button",{type:"button",className:"hui-icon-btn","aria-label":"Réglages et pages","aria-haspopup":"menu","aria-expanded":t,"aria-pressed":t,onClick:()=>o(n=>!n),children:Xe(b2,{})}),t?At("div",{className:"hui-menu",role:"menu",children:[At("button",{type:"button",role:"menuitem",onClick:()=>r("nav.settings"),children:[Xe($g,{}),"Réglages",Xe("kbd",{children:"⌘,"})]}),At("button",{type:"button",role:"menuitem",onClick:()=>r("nav.capabilities"),children:[Xe(z2,{}),"Capabilities"]}),At("button",{type:"button",role:"menuitem",onClick:()=>r("nav.messaging"),children:[Xe(T2,{}),"Messaging"]}),At("button",{type:"button",role:"menuitem",onClick:()=>r("nav.artifacts"),children:[Xe(eu,{}),"Artifacts"]}),At("button",{type:"button",role:"menuitem",onClick:()=>r("nav.cron"),children:[Xe(E2,{}),"Tâches planifiées"]}),Xe("hr",{}),At("button",{type:"button",role:"menuitem",onClick:()=>r("nav.agents"),children:[Xe(A2,{}),"Agents et connexions"]}),At("button",{type:"button",role:"menuitem",onClick:()=>r("keybinds.openPanel"),children:[Xe($g,{}),"Raccourcis",Xe("kbd",{children:"⌘/"})]})]}):null]})}function F2({ctx:e}){let t=Ye(pe,n=>n.bots),o=Ye(pe,n=>n.bot),a=Ye(pe,n=>!!n.live),r=Ye(pe,n=>n.ready);return At("nav",{className:"hui-rail","aria-label":"Bots et conversations",children:[At("div",{className:"hui-brand",children:[Xe("span",{className:"hui-brand-mark","aria-hidden":"true"}),Xe("span",{className:"hui-brand-name",children:"Hermes"})]}),At("button",{type:"button",className:"hui-new",onClick:()=>qc(),children:[Xe(h2,{}),Xe("span",{children:"Nouvelle conversation"}),Xe("kbd",{children:"⇧⌘O"})]}),At("div",{className:"hui-rail-scroll hui-scroll",children:[Xe("p",{className:"hui-section",children:"Bots"}),Xe("div",{className:"hui-list",children:t.map(n=>Xe(SS,{bot:n,selected:n.name===o,busy:a&&n.name===o},n.name))}),Xe(kS,{})]}),At("div",{className:"hui-foot",children:[Xe(ES,{}),At("div",{className:"hui-foot-bar",children:[At("span",{className:"hui-engine",children:[Xe("span",{className:"hui-pip","data-tone":r?"ok":"warn"}),r?"Moteur connecté":"Connexion…"]}),Xe(PS,{ctx:e})]})]})]})}import{MessageTextContent as D2}from"@hermes/plugin-sdk";import{memo as O2,useEffect as H2,useLayoutEffect as V2,useRef as tu,useState as ou}from"react";import{Fragment as G2,jsx as Ne,jsxs as zt}from"react/jsx-runtime";function B2({text:e,label:t}){let[o,a]=ou(!1),r=tu(null);return H2(()=>()=>clearTimeout(r.current),[]),zt("button",{type:"button",className:"hui-copy","data-copied":o,onClick:async()=>{try{await navigator.clipboard.writeText(e||"")}catch{return}a(!0),clearTimeout(r.current),r.current=setTimeout(()=>a(!1),1400)},"aria-label":o?"Copié":`Copier ${t}`,title:o?"Copié":"Copier",children:[Ne(y2,{className:"is-copy",width:15,height:15}),Ne(w2,{className:"is-check",width:15,height:15})]})}function TS(){let e=Ye(pe,a=>a.bot),o=Ye(pe,a=>a.bots).find(a=>a.name===e);return{name:e,label:kr(o||e),look:$s(e||"default"),bot:o}}function AS(e){return Math.max(1,Math.round(e/1e3))}function _2({text:e,live:t,startedAt:o,endedAt:a}){let[r,n]=ou(!1),s=tu(null);if(V2(()=>{t&&r&&s.current&&(s.current.scrollTop=s.current.scrollHeight)},[e,t,r]),!e&&!t)return null;let i=o&&a?AS(a-o):null;return zt("div",{className:"hui-reason",children:[zt("button",{type:"button",className:"hui-reason-head","aria-expanded":r,onClick:()=>n(l=>!l),disabled:!e,children:[t?Ne("span",{className:"hui-shimmer",children:"Réfléchit…"}):zt("span",{children:[Ne("span",{className:"verb",children:"A réfléchi"}),i?` ${i} s`:""]}),e?Ne(S2,{className:"hui-reason-chevron"}):null]}),Ne("div",{className:"hui-reason-body","data-open":r&&!!e,children:Ne("div",{className:"hui-reason-inner",children:Ne("div",{ref:s,className:`hui-reason-text${t?" is-live":""}`,children:e})})})]})}var zS=O2(function({m:t,label:o,look:a,defaultModel:r}){let n=Jn(t.model||r);return t.status==="failed"&&!t.text?null:Ne("div",{className:"hui-turn hui-arrive","data-from":"assistant",children:zt("div",{className:"hui-assistant",children:[zt("div",{className:"hui-assistant-head",children:[Ne(bn,{size:24,colors:a.colors,shape:a.shape,label:o}),Ne("span",{className:"hui-assistant-name",children:o}),n?zt("span",{className:"hui-assistant-model",children:["· ",n]}):null]}),zt("div",{className:"hui-assistant-body",children:[t.reasoning?Ne(_2,{text:t.reasoning,live:!1,startedAt:t.turnStart||t.thinkStart,endedAt:t.thinkEnd}):null,t.text?Ne("div",{className:"hui-prose",children:Ne(D2,{text:t.text})}):null]}),t.text?Ne("div",{className:"hui-actions",children:Ne(B2,{text:t.text,label:"la réponse"})}):null]})})}),LS=O2(function({m:t}){return Ne("div",{className:"hui-turn hui-arrive","data-from":"user",children:zt("div",{className:"hui-user",children:[t.attachments?.length?Ne("div",{className:"hui-attach-chips",children:t.attachments.map((o,a)=>Ne("span",{className:"hui-attach-chip",children:o.name},a))}):null,t.text?Ne("div",{className:"hui-bubble",children:t.text}):null,zt("div",{className:"hui-user-meta",children:[t.at?Ne("time",{className:"hui-time",children:t2(t.at)}):null,Ne(B2,{text:t.text,label:"le message"})]})]})})});function NS({since:e}){let[t,o]=ou(()=>Date.now());H2(()=>{let r=setInterval(()=>o(Date.now()),1e3);return()=>clearInterval(r)},[]);let a=Math.floor((t-e)/1e3);return a<20?null:zt("span",{className:"hui-elapsed",children:["· ",a," s"]})}function FS({label:e,look:t}){let o=Ye(pe,l=>l.live),a=Ye(pe,l=>{let c=l.messages[l.messages.length-1];return c&&c.role==="assistant"&&c.status==="streaming"?c:null});if(!o)return null;let r=o.phase,n=null;r==="tool"&&o.toolName&&(n=e2(o.toolName)),r==="delegating"&&(n=r2(o.subagents||1,"tâche","tâches"));let s=r==="delegating"?`${e} délègue`:r==="tool"?`${e} travaille`:r==="writing"?`${e} écrit`:`${e} réfléchit…`,i=r==="writing"&&a?.text;return Ne("div",{className:"hui-turn","data-from":"assistant","aria-live":"polite",children:zt("div",{className:"hui-assistant",children:[zt("div",{className:"hui-assistant-head",children:[Ne(bn,{size:24,colors:t.colors,shape:t.shape,label:e,activity:i?"speaking":"idle",emotion:i?"happy":"thinking",lookAround:!0}),i?Ne("span",{className:"hui-assistant-name",children:e}):zt("span",{className:"hui-live",children:[Ne("span",{className:"hui-shimmer",children:s}),n?zt(G2,{children:[Ne("span",{className:"sep",children:"·"}),Ne("span",{className:"hui-live-verb",children:n},n)]}):null,Ne(NS,{since:o.startedAt})]})]}),zt("div",{className:"hui-assistant-body",children:[a?.reasoning?Ne(_2,{text:a.reasoning,live:!a.text,startedAt:a.turnStart||a.thinkStart,endedAt:a.thinkEnd}):null,a?.text?Ne("div",{className:"hui-prose",children:Ne(D2,{text:a.text})}):null]})]})})}function DS(){let e=Ye(pe,t=>t.approval);return e?Ne("div",{className:"hui-turn","data-from":"assistant",children:zt("div",{className:"hui-approval",role:"alertdialog","aria-label":"Autorisation requise",style:{width:"100%"},children:[zt("div",{className:"hui-approval-title",children:[Ne("span",{className:"dot"}),"Autorisation requise"]}),e.description?Ne("div",{className:"hui-approval-desc",children:e.description}):null,e.command?Ne("pre",{children:e.command}):null,zt("div",{className:"hui-approval-actions",children:[Ne("button",{type:"button",className:"hui-btn ghost",onClick:()=>jc("deny"),children:"Refuser"}),e.allowPermanent?Ne("button",{type:"button",className:"hui-btn secondary",onClick:()=>jc("always"),children:"Toujours autoriser"}):null,Ne("button",{type:"button",className:"hui-btn primary",onClick:()=>jc("once"),autoFocus:!0,children:"Autoriser"})]})]})}):null}function OS(){let e=Ye(pe,o=>o.error),t=Ye(pe,o=>!!o.live);return!e||t?null:zt("div",{className:"hui-fail",role:"alert",children:[Ne("span",{className:"msg",children:e}),Ne("button",{type:"button",className:"hui-btn ghost sm",onClick:()=>jb(),children:"Réessayer"})]})}function HS({label:e,look:t}){return zt("div",{className:"hui-empty",children:[Ne(bn,{size:72,colors:t.colors,shape:t.shape,label:e,lookAround:!0,emotion:"happy"}),zt("h1",{children:["Que fait-on avec ",e," ?"]})]})}function Z2(){let{label:e,look:t,bot:o}=TS(),a=Ye(pe,m=>m.messages),r=Ye(pe,m=>m.loading),n=Ye(pe,m=>!!m.live),i=Ye(pe,m=>m.info.model)||o?.model||"",l=tu(null),c=tu(!0),[u,d]=ou(!1),p=n?a.filter((m,v)=>!(v===a.length-1&&m.role==="assistant"&&m.status==="streaming")):a;V2(()=>{let m=l.current;m&&c.current&&(m.scrollTop=m.scrollHeight)});let f=()=>{let m=l.current;if(!m)return;let v=m.scrollHeight-m.scrollTop-m.clientHeight<80;c.current=v,d(!v)};return!a.length&&!r&&!n?Ne(HS,{label:e,look:t}):zt(G2,{children:[Ne("div",{ref:l,className:"hui-thread-scroll hui-scroll",onScroll:f,children:zt("div",{className:"hui-thread",children:[r?Ne("p",{className:"hui-empty-line",children:"Chargement de la conversation…"}):null,p.map(m=>m.role==="user"?Ne(LS,{m},m.id):Ne(zS,{m,label:e,look:t,defaultModel:i},m.id)),Ne(FS,{label:e,look:t}),Ne(DS,{}),Ne(OS,{})]})}),u?Ne("button",{type:"button",className:"hui-jump","aria-label":"Revenir en bas",onClick:()=>{c.current=!0;let m=l.current;m&&m.scrollTo({top:m.scrollHeight})},children:Ne(v2,{})}):null]})}import{host as VS}from"@hermes/plugin-sdk";import{useEffect as Wg,useRef as qg,useState as al}from"react";import{jsx as Lt,jsxs as Pr}from"react/jsx-runtime";var BS=[["low","Bas"],["medium","Moyen"],["high","Élevé"]],Ws=null;async function _S(){if(Ws)return Ws;try{Ws=((await VS.request("model.options",{}))?.providers||[]).filter(t=>t.authenticated!==!1&&Array.isArray(t.models)&&t.models.length)}catch{Ws=[]}return Ws}function ZS({botName:e,current:t,onClose:o}){let[a,r]=al(Ws||[]),n=el(e),[s,i]=al(n.effort||""),l=qg(null);Wg(()=>{let d=!0;_S().then(m=>d&&r(m));let p=m=>{l.current?.contains(m.target)||o()},f=m=>{m.key==="Escape"&&o()};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",f),()=>{d=!1,document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",f)}},[o]);let c=(d,p)=>{Fg(e,{model:p,provider:d}),pe.set(f=>({info:{...f.info}})),o()},u=d=>{let p=s===d?"":d;i(p),Fg(e,{effort:p}),pe.set(f=>({info:{...f.info}}))};return Pr("div",{ref:l,className:"hui-pop",role:"dialog","aria-label":"Modèle et effort",children:[Lt("div",{className:"hui-pop-label",children:"Effort de raisonnement"}),Lt("div",{className:"hui-seg",children:BS.map(([d,p])=>Lt("button",{type:"button","aria-pressed":s===d,onClick:()=>u(d),children:p},d))}),Pr("div",{className:"hui-pop-list",children:[a.length===0?Lt("div",{className:"hui-pop-label",children:"Chargement des modèles…"}):null,a.map(d=>Pr("div",{children:[Lt("div",{className:"hui-pop-label",children:d.name}),d.models.slice(0,24).map(p=>Pr("button",{type:"button",className:"hui-pop-item","aria-selected":t===p,onClick:()=>c(d.slug,p),children:[Lt("span",{children:Jn(p)}),d.is_current&&t===p?Lt("span",{className:"sub",children:"actuel"}):null]},`${d.slug}:${p}`))]},d.slug))]})]})}function U2(){let e=Ye(pe,g=>g.bot),t=Ye(pe,g=>g.bots),o=Ye(pe,g=>!!g.live);Ye(pe,g=>g.info);let a=t.find(g=>g.name===e),r=el(e),n=r.model||a?.model||"",[s,i]=al(""),[l,c]=al([]),[u,d]=al(!1),p=qg(null),f=qg(null);Wg(()=>{let g=p.current;g&&(g.style.height="0px",g.style.height=`${Math.min(240,g.scrollHeight)}px`)},[s]),Wg(()=>{p.current?.focus()},[e]);let m=()=>{if(o)return;let g=s,b=l;!g.trim()&&!b.length||(i(""),c([]),Dg(g,b))},v=g=>{g.key==="Enter"&&!g.shiftKey&&!g.isComposing&&(g.preventDefault(),m())},h=g=>{let b=[...g.clipboardData?.files||[]].filter(w=>w.type.startsWith("image/"));b.length&&(g.preventDefault(),c(w=>[...w,...b]))},y=!o&&(s.trim()||l.length),x={low:"bas",medium:"moyen",high:"élevé"}[r.effort]||"";return Lt("div",{className:"hui-composer-wrap",children:Pr("div",{className:"hui-composer",onDragOver:g=>g.preventDefault(),onDrop:g=>{g.preventDefault();let b=[...g.dataTransfer?.files||[]];b.length&&c(w=>[...w,...b])},children:[l.length?Lt("div",{className:"hui-files",children:l.map((g,b)=>Pr("span",{className:"hui-file-chip",children:[g.name,Lt("button",{type:"button","aria-label":`Retirer ${g.name}`,onClick:()=>c(w=>w.filter((C,R)=>R!==b)),children:Lt(k2,{width:12,height:12})})]},`${g.name}-${b}`))}):null,Lt("textarea",{ref:p,value:s,rows:1,placeholder:`Écris à ${kr(a||e)}…`,onChange:g=>i(g.target.value),onKeyDown:v,onPaste:h,"aria-label":"Message"}),Pr("div",{className:"hui-composer-bar",children:[Lt("button",{type:"button",className:"hui-icon-btn","aria-label":"Joindre un fichier",onClick:()=>f.current?.click(),children:Lt(C2,{})}),Lt("input",{ref:f,type:"file",multiple:!0,hidden:!0,onChange:g=>{let b=[...g.target.files||[]];b.length&&c(w=>[...w,...b]),g.target.value=""}}),Pr("div",{style:{position:"relative"},children:[Pr("button",{type:"button",className:"hui-pill","aria-haspopup":"dialog","aria-expanded":u,onClick:()=>d(g=>!g),children:[Lt("span",{children:n?Jn(n):"Modèle par défaut"}),x?Pr("span",{className:"eff",children:["· ",x]}):null,Lt(R2,{width:13,height:13})]}),u?Lt(ZS,{botName:e,current:n,onClose:()=>d(!1)}):null]}),Lt("span",{className:"grow"}),o?Lt("button",{type:"button",className:"hui-send is-stop","aria-label":"Arrêter",onClick:()=>qb(),children:Lt(I2,{})}):Lt("button",{type:"button",className:"hui-send","aria-label":"Envoyer",disabled:!y,onClick:m,children:Lt(x2,{})})]})]})})}import{useEffect as GS}from"react";import{jsx as Oo,jsxs as Xr}from"react/jsx-runtime";function US(e){let t=e.next_run_at||e.next_run||e.nextRunAt;if(!t)return"";let o=new Date(typeof t=="number"?t*(t<1e12?1e3:1):t);return Number.isNaN(o.getTime())?"":o.toLocaleString("fr-FR",{weekday:"short",hour:"2-digit",minute:"2-digit"})}function $S(e){let t=e.schedule_display||e.schedule||e.cron||"";return typeof t=="string"?t:t?.display||t?.expr||""}function WS({ctx:e}){let t=Ye(pe,a=>a.routines),o=Ye(pe,a=>a.bot);return GS(()=>{let a=setInterval(()=>Kc(),6e4);return()=>clearInterval(a)},[o]),Xr("div",{className:"hui-aside-block",children:[Xr("div",{className:"hui-aside-head",children:[Oo("span",{className:"hui-aside-title",children:"Routines"}),Xr("span",{style:{display:"flex",gap:2},children:[Oo("button",{type:"button",className:"hui-icon-btn","aria-label":"Rafraîchir les routines",onClick:()=>Kc(),children:Oo(L2,{width:14,height:14})}),Oo("button",{type:"button",className:"hui-icon-btn","aria-label":"Nouvelle routine",onClick:()=>e.runAction("nav.cron"),children:Oo(P2,{width:14,height:14})})]})]}),t.length===0?Oo("div",{className:"hui-aside-empty",children:"Aucune routine pour ce bot."}):t.map(a=>{let r=a.enabled!==!1&&a.state!=="paused",n=String(a.name||"Routine").replace(/^\[bot:[^\]]+\]\s*/i,""),s=US(a);return Xr("button",{type:"button",className:"hui-routine",style:{textAlign:"left"},onClick:()=>e.runAction("nav.cron"),title:a.prompt_preview||n,children:[Xr("span",{className:"hui-routine-top",children:[Oo("span",{className:"hui-pip","data-tone":r?"ok":void 0}),Oo("span",{className:"hui-routine-name",children:n})]}),Oo("span",{className:"hui-routine-meta",children:[$S(a),s?`prochaine : ${s}`:r?"":"en pause"].filter(Boolean).join(" · ")})]},a.id||a.job_id||n)})]})}function qS({ctx:e}){let t=Ye(pe,a=>a.files),o=async a=>{await e.os?.revealPath?.(a)||await e.os?.writeClipboard?.(a)};return Xr("div",{className:"hui-aside-block",children:[Oo("div",{className:"hui-aside-head",children:Oo("span",{className:"hui-aside-title",children:"Fichiers"})}),t.length===0?Oo("div",{className:"hui-aside-empty",children:"Les fichiers créés ou modifiés dans cette conversation s'affichent ici."}):t.slice(0,30).map(a=>{let r=a.path.split("/"),n=r.pop();return Xr("button",{type:"button",className:"hui-filerow",onClick:()=>o(a.path),title:`${a.path}
Cliquer : afficher (ou copier le chemin)`,children:[Oo("span",{className:"hui-file-ico",children:Oo(eu,{width:14,height:14})}),Xr("span",{style:{minWidth:0,flex:1},children:[Oo("span",{className:"name",style:{display:"block"},children:n}),Oo("span",{className:"dir",children:r.join("/")||"/"})]})]},a.path)})]})}function $2({ctx:e}){return Xr("aside",{className:"hui-aside hui-scroll","aria-label":"Routines et fichiers",children:[Oo(WS,{ctx:e}),Oo(qS,{ctx:e})]})}import{jsx as ba,jsxs as au}from"react/jsx-runtime";var W2="hermes-ui-style";function XS(){jg(()=>{let e=document.getElementById(W2);return e||(e=document.createElement("style"),e.id=W2,document.head.appendChild(e)),e.textContent=Zb,()=>e.remove()},[])}var q2=!1;function QS(e){jg(()=>{if(q2)return;q2=!0;let t=setTimeout(()=>{try{j2.paneVisibility?.("sessions")?.get?.()&&e.runAction("view.toggleSidebar")}catch{}},300);return()=>clearTimeout(t)},[e])}function JS({asideOpen:e,onToggleAside:t}){let o=Ye(pe,p=>p.bot),a=Ye(pe,p=>p.bots),r=Ye(pe,p=>p.info.title),n=Ye(pe,p=>p.info.model),s=Ye(pe,p=>p.storedId),i=Ye(pe,p=>p.bot?p.sessionsByBot[p.bot]:void 0),l=a.find(p=>p.name===o),c=$s(o||"default"),u=r||i?.find(p=>p.id===s)?.title||(s?"Conversation":"Nouvelle conversation"),d=n||l?.model;return au("header",{className:"hui-head",children:[ba(bn,{size:22,colors:c.colors,shape:c.shape,label:kr(l||o)}),au("div",{className:"hui-head-title",children:[ba("span",{className:"hui-head-bot",children:kr(l||o)}),ba("span",{className:"hui-head-conv",children:u})]}),d?ba("span",{className:"hui-chip",children:Jn(d)}):null,ba("button",{type:"button",className:"hui-icon-btn","aria-label":e?"Masquer le panneau":"Afficher le panneau","aria-pressed":e,onClick:t,title:"Routines et fichiers",children:ba(M2,{})})]})}function K2({ctx:e}){XS(),QS(e);let{resolvedMode:t}=jS(),o=KS(j2.state.gateway),[a,r]=YS(()=>e.storage.get("asideOpen",!0)),n=Ye(pe,i=>i.ready);return jg(()=>{o==="open"&&Qb()},[o]),ba("div",{style:{position:"relative",width:"100%",height:"100%",minHeight:0},children:au("div",{className:"hui","data-theme":t==="light"?"light":"dark","data-aside":a?"open":"closed",children:[ba(F2,{ctx:e}),au("main",{className:"hui-card",children:[ba(JS,{asideOpen:a,onToggleAside:()=>{r(i=>(e.storage.set("asideOpen",!i),!i))}}),n?ba(Z2,{}):ba("div",{className:"hui-empty",children:ba("p",{children:"Connexion à Hermes…"})}),ba(U2,{})]}),ba($2,{ctx:e})]})})}import{useEffect as GR,useRef as VR,useState as UL}from"react";var Y2=`/*! tailwindcss v4.3.5 | MIT License | https://tailwindcss.com */
@layer properties;
[data-system="glaze"], .glaze {
  --page: #fbfbfa;
  --paper: #ffffff;
  --shell: #f1f1f0;
  --field: #efefef;
  --code-surface: var(--paper);
  --hover: rgb(5 5 5 / 0.06);
  --hover-row: rgb(5 5 5 / 0.035);
  --pressed: rgb(5 5 5 / 0.10);
  --scrim: rgb(5 5 5 / 0.24);
  --ink: #050505;
  --ink-80: rgb(5 5 5 / 0.80);
  --ink-60: rgb(5 5 5 / 0.60);
  --ink-45: rgb(5 5 5 / 0.45);
  --ink-32: rgb(5 5 5 / 0.32);
  --ink-15: rgb(5 5 5 / 0.15);
  --ink-10: rgb(5 5 5 / 0.10);
  --ink-06: rgb(5 5 5 / 0.06);
  --ink-03: rgb(5 5 5 / 0.03);
  --text-1: rgb(5 5 5 / 0.80);
  --text-2: rgb(5 5 5 / 0.60);
  --text-3: rgb(5 5 5 / 0.45);
  --text-disabled: rgb(5 5 5 / 0.32);
  --text-inverse: #ffffff;
  --line-faint: rgb(5 5 5 / 0.06);
  --line: rgb(5 5 5 / 0.10);
  --line-control: rgb(5 5 5 / 0.15);
  --line-focus: rgb(5 5 5 / 0.32);
  --line-strong: rgb(5 5 5 / 0.45);
  --focus: rgb(5 5 5 / 0.80);
  --ok: #2c9a59;
  --ok-text: #1a7640;
  --ok-tint: #e6f4ea;
  --warn: #d98a0b;
  --warn-text: #8a5a00;
  --warn-tint: #fbf0d9;
  --fail: #e35e49;
  --fail-text: #b23c29;
  --fail-tint: #fbe9e5;
  --glass-ink-base: rgb(0 0 0 / 0.66);
  --glass-ink-text: rgb(255 255 255 / 0.90);
  --glass-ink-ring: rgb(0 0 0 / 0.56);
  --glass-coral-base: rgb(150 34 18 / 0.88);
  --glass-coral-text: rgb(255 255 255 / 0.90);
  --glass-coral-ring: rgb(110 24 12 / 0.56);
  --glass-green-base: rgb(6 86 40 / 0.88);
  --glass-green-text: rgb(255 255 255 / 0.90);
  --glass-green-ring: rgb(4 64 28 / 0.56);
  --glass-sheen: 0.12;
  --glass-sheen-hover: 0.16;
  --glass-core: 0.32;
  --glass-core-held: 0.44;
  --glass-rim: 0.24;
  --glass-glaze: 0.06;
  --glass-gloss: 0.28;
  --glass-blur: 6px;
  --gloss-inset: 0.28;
  --gloss-top: 1.5px;
  --gloss-height: 44%;
  --flat-bg: var(--paper);
  --flat-ring: var(--line-faint);
  --flat-text: var(--text-1);
  --flat-hover: #f8f8f8;
  --switch-off: rgb(5 5 5 / 0.10);
  --switch-knob: #ffffff;
  --switch-mark: rgb(5 5 5 / 0.60);
  --glaze-sm-top: #6b6b6b;
  --glaze-sm-mid: #3d3d3d;
  --glaze-sm-bottom: #232323;
  --glaze-sm-highlight: rgb(255 255 255 / 0.30);
  --glaze-sm-rim: rgb(0 0 0 / 0.55);
  --glaze-sm-text: rgb(255 255 255 / 0.92);
  --shadow-none: none;
  --font-sans: "Glaze Sans", "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "Glaze Mono", "Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --mono-scale: 0.8;
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --type-title: 500 28px/1.2 var(--font-sans);
  --type-heading: 500 20px/1.3 var(--font-sans);
  --type-heading-sm: 500 16px/1.35 var(--font-sans);
  --type-body: 400 14px/1.5 var(--font-sans);
  --type-body-sm: 400 13px/1.5 var(--font-sans);
  --type-label: 500 13px/1.35 var(--font-sans);
  --type-label-sm: 500 12px/1.35 var(--font-sans);
  --type-label-lg: 500 14px/1.35 var(--font-sans);
  --type-caption: 400 12px/1.35 var(--font-sans);
  --type-code: 400 calc(14px * var(--mono-scale))/1.5 var(--font-mono);
  --type-code-sm: 400 calc(13px * var(--mono-scale))/1.5 var(--font-mono);
  --type-code-xs: 400 calc(12px * var(--mono-scale))/1.35 var(--font-mono);
  --type-code-block: 400 12px/20px var(--font-mono);
  --tracking-heading: -0.025em;
  --tracking-body: 0em;
  --tracking-label: 0.02em;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-1-5: 6px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --shell-inset: 3px;
  --shell-foot-inset: 6px;
  --control-sm: 26px;
  --control: 32px;
  --control-lg: 36px;
  --row: 36px;
  --icon-sm: 12px;
  --icon: 14px;
  --icon-lg: 16px;
  --radius-pill: 999px;
  --radius-shell: 14px;
  --radius-panel: 11px;
  --radius-overlay: 10px;
  --radius-row-focus: calc(var(--radius-panel) - var(--line-width));
  --radius-tag: 6px;
  --line-width: 1px;
  --focus-width: 2px;
  --focus-offset: 2px;
  --focus-width-sm: 1.5px;
  --focus-offset-sm: 1px;
  --dur-press: 120ms;
  --dur-glass-press: 50ms;
  --dur-glass-release: 200ms;
  --dur-state: 160ms;
  --dur-overlay: 200ms;
  --overlay-shift: 4px;
  --scale-overlay: 0.97;
  --dur-spin: 800ms;
  --dur-slide: 200ms;
  --dur-sweep: 1400ms;
  --wait-show: 150ms;
  --wait-hold: 400ms;
  --stale: 0.6;
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --scale-press-flat: 0.99;
  --scale-press: 0.97;
  --scale-press-glass: 0.99;
  --z-raised: 10;
  --z-sticky: 20;
  --z-overlay: 50;
  --overlay-sm: 400px;
  --overlay: 480px;
  --overlay-lg: 640px;
  --popover: 288px;
  --toast: 360px;
  --menu-min: 192px;
  --menu-row: 32px;
  --menu-row-sm: 28px;
  --popup-max: 320px;
  --tooltip-max: 256px;
  --label-col: 160px;
  --progress-bar-sm: 4px;
  --progress-bar: 6px;
  --progress-bar-lg: 8px;
  --progress-sweep: 32%;
  --measure: 68ch;
  --measure-hint: 60ch;
  --scrollbar-thumb: rgb(5 5 5 / 0.20);
  --scrollbar-size: 10px;
  --scrollbar-gap: 2px;
}
[data-system="glaze"][data-theme="dark"], .glaze[data-theme="dark"], [data-theme="dark"] [data-system="glaze"], [data-theme="dark"] .glaze {
  --page: #0c0c0c;
  --paper: #1f1f1f;
  --shell: #161616;
  --field: #2a2a2a;
  --hover: rgb(244 244 243 / 0.06);
  --hover-row: rgb(244 244 243 / 0.04);
  --pressed: rgb(244 244 243 / 0.10);
  --scrim: rgb(0 0 0 / 0.64);
  --ink: #f4f4f3;
  --ink-80: #f4f4f3;
  --ink-60: rgb(244 244 243 / 0.60);
  --ink-45: rgb(244 244 243 / 0.45);
  --ink-32: rgb(244 244 243 / 0.34);
  --ink-15: rgb(244 244 243 / 0.15);
  --ink-10: rgb(244 244 243 / 0.10);
  --ink-06: rgb(244 244 243 / 0.06);
  --ink-03: rgb(244 244 243 / 0.03);
  --text-1: #f4f4f3;
  --text-2: rgb(244 244 243 / 0.60);
  --text-3: rgb(244 244 243 / 0.45);
  --text-disabled: rgb(244 244 243 / 0.34);
  --text-inverse: #050505;
  --line-faint: rgb(244 244 243 / 0.06);
  --line: rgb(244 244 243 / 0.10);
  --line-control: rgb(244 244 243 / 0.15);
  --line-focus: rgb(244 244 243 / 0.34);
  --line-strong: rgb(244 244 243 / 0.45);
  --focus: #f4f4f3;
  --ok: #3fbf75;
  --ok-text: #6fd69a;
  --ok-tint: #13261a;
  --warn: #f0a531;
  --warn-text: #f5c065;
  --warn-tint: #2a2010;
  --fail: #ec6f5a;
  --fail-text: #f2917f;
  --fail-tint: #2c1714;
  --glass-ink-base: rgb(255 255 255 / 0.62);
  --glass-ink-text: rgb(5 5 5 / 0.90);
  --glass-ink-ring: rgb(255 255 255 / 0.24);
  --glass-coral-base: rgb(245 140 120 / 0.86);
  --glass-coral-text: rgb(5 5 5 / 0.90);
  --glass-coral-ring: rgb(245 140 120 / 0.40);
  --glass-green-base: rgb(110 215 150 / 0.86);
  --glass-green-text: rgb(5 5 5 / 0.90);
  --glass-green-ring: rgb(110 215 150 / 0.40);
  --glass-sheen: 0.16;
  --glass-sheen-hover: 0.24;
  --glass-core: 0;
  --glass-core-held: 0.06;
  --glass-rim: 0.4;
  --glass-glaze: 0.14;
  --glass-gloss: 0.6;
  --flat-hover: #262626;
  --switch-off: rgb(244 244 243 / 0.15);
  --switch-knob: #e8e8e7;
  --switch-mark: rgb(5 5 5 / 0.60);
  --glaze-sm-top: #fbfbfa;
  --glaze-sm-mid: #dcdcdb;
  --glaze-sm-bottom: #bdbdbc;
  --glaze-sm-highlight: rgb(255 255 255 / 0.90);
  --glaze-sm-rim: rgb(255 255 255 / 0.22);
  --glaze-sm-text: rgb(5 5 5 / 0.88);
  --scrollbar-thumb: rgb(244 244 243 / 0.20);
}
@media (prefers-reduced-motion: reduce) {
  [data-system="glaze"], .glaze {
    --dur-press: 0ms;
    --dur-state: 0ms;
    --dur-overlay: 0ms;
    --scale-press: 1;
    --scale-press-flat: 1;
    --scale-press-glass: 1;
    --dur-glass-press: 0ms;
    --dur-glass-release: 0ms;
    --dur-slide: 0ms;
  }
}
[data-system="glaze"], .glaze {
  background: var(--page);
  color: var(--text-1);
  font: var(--type-body);
  letter-spacing: var(--tracking-body);
  text-wrap: pretty;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color-scheme: light;
}
[data-system="glaze"][data-theme="dark"], .glaze[data-theme="dark"], [data-theme="dark"] [data-system="glaze"], [data-theme="dark"] .glaze {
  color-scheme: dark;
}
@layer base {
  .glaze :where(*, ::before, ::after), [data-system="glaze"] :where(*, ::before, ::after) {
    box-sizing: border-box;
    border: 0 solid var(--line-faint);
    margin: 0;
    padding: 0;
  }
  .glaze :where(h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd, pre) {
    margin: 0;
    font: inherit;
  }
  .glaze :where(ul, ol) {
    list-style: none;
  }
  .glaze :where(a) {
    color: inherit;
    text-decoration: inherit;
  }
  .glaze :where(button, input, select, textarea) {
    font: inherit;
    letter-spacing: inherit;
    color: inherit;
    background: transparent;
  }
  .glaze :where(button, [role="button"]) {
    cursor: pointer;
  }
  .glaze :where(button:disabled, [aria-disabled="true"]) {
    cursor: not-allowed;
  }
  .glaze :where(img, video, canvas, svg) {
    display: block;
    max-width: 100%;
  }
  .glaze :where(table) {
    border-collapse: collapse;
  }
  .glaze :where(code, kbd, samp) {
    font-family: var(--font-mono);
    font-size: calc(1em * var(--mono-scale));
    letter-spacing: 0;
  }
  .glaze :where(pre) {
    font-family: var(--font-mono);
  }
  .glaze :where(td, th, time, data, output) {
    font-variant-numeric: tabular-nums;
  }
  .glaze :where(a, button, summary, input, select, textarea, label, [role="button"], [role="tab"], [role="menuitem"], [role="option"], [role="switch"], [role="checkbox"], [role="radio"]) {
    transition-property: color, background-color, border-color, opacity;
    transition-duration: var(--dur-state);
    transition-timing-function: var(--ease-out);
  }
  .glaze :where(*, ::before, ::after), [data-system="glaze"] :where(*, ::before, ::after) {
    outline-color: var(--focus);
  }
}
.glaze ::selection {
  background: var(--ink-15);
  color: var(--text-1);
}
.glaze :where(*):is(:focus-visible, [data-force-focus-visible]) {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: var(--focus-offset);
}
@supports selector(::-webkit-scrollbar) {
  @layer base {
    .glaze, .glaze *, [data-system="glaze"], [data-system="glaze"] * {
      scrollbar-color: auto;
    }
  }
}
.glaze ::-webkit-scrollbar, .glaze::-webkit-scrollbar, [data-system="glaze"] ::-webkit-scrollbar {
  width: var(--scrollbar-size);
  height: var(--scrollbar-size);
  background: transparent;
}
.glaze ::-webkit-scrollbar-thumb, .glaze::-webkit-scrollbar-thumb, [data-system="glaze"] ::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  background-clip: padding-box;
  border: var(--scrollbar-gap) solid transparent;
  border-radius: var(--radius-pill);
}
.glaze ::-webkit-scrollbar-track, .glaze ::-webkit-scrollbar-corner, [data-system="glaze"] ::-webkit-scrollbar-track, [data-system="glaze"] ::-webkit-scrollbar-corner {
  background: transparent;
}
.glaze ::-webkit-scrollbar-button, [data-system="glaze"] ::-webkit-scrollbar-button {
  display: none;
}
@supports not selector(::-webkit-scrollbar) {
  .glaze, .glaze *, [data-system="glaze"], [data-system="glaze"] * {
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) transparent;
  }
}
@media (pointer: coarse) {
  .glaze input:not([type="checkbox"], [type="radio"], [type="range"], [type="button"], [type="submit"], [type="file"]), .glaze textarea, .glaze select {
    font-size: max(16px, 1em);
  }
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/field-group {
  container-type: inline-size;
  container-name: field-group;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/item {
  container-type: inline-size;
  container-name: item;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/prompt-toolbar {
  container-type: inline-size;
  container-name: prompt-toolbar;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/queue-row {
  container-type: inline-size;
  container-name: queue-row;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/reasoning {
  container-type: inline-size;
  container-name: reasoning;
}
:where(.glaze, [data-system="glaze"]) .glass {
  --gl-sheen: var(--glass-sheen);
  --gl-sheen-hover: var(--glass-sheen-hover);
  --gl-core: var(--glass-core);
  --gl-core-held: var(--glass-core-held);
  --gl-rim: var(--glass-rim);
  --gl-rim-a: #ffffff;
  --gl-rim-b: #999999;
  --gl-glaze-hi: var(--glass-glaze);
  --gl-gloss: var(--glass-gloss);
  --gl-base: var(--glass-base, var(--glass-ink-base));
  --gl-text: var(--glass-text, var(--glass-ink-text));
  --gl-ring: var(--glass-ring, var(--glass-ink-ring));
  --gl-ring-w: 0.75px;
  --gl-sheen-now: var(--gl-sheen);
  --gl-core-now: var(--gl-core);
  --gl-glint-now: var(--gl-glint, 0);
  --gl-tint-now: var(--gl-tint, 0);
  position: relative;
  isolation: isolate;
  color: var(--gl-text);
  background-color: var(--gl-base);
  background-image: linear-gradient(99deg, transparent 27.7%, rgb(255 255 255 / var(--gl-glint-now, 0)) 60.19%, transparent 86.06%), radial-gradient(65.62% 65.62% at 50% 50%, rgb(0 0 0 / var(--gl-core-now)), transparent), linear-gradient(rgb(255 255 255 / var(--gl-sheen-now)), transparent), linear-gradient(rgb(255 255 255 / var(--gl-glaze-hi, 0)) 0%, rgb(255 255 255 / calc(var(--gl-glaze-hi, 0) * 0.4)) 50%, rgb(0 0 0 / var(--gl-glaze-lo, 0)) 50%, rgb(0 0 0 / var(--gl-glaze-lo, 0)) 100%), linear-gradient(rgb(0 0 0 / var(--gl-tint-now, 0)), rgb(0 0 0 / var(--gl-tint-now, 0)));
  box-shadow: inset 0 -12px 16px 0 rgb(255 255 255 / 0.06), inset 0 4px 16px 0 rgb(255 255 255 / 0.16), inset 0 0.75px 0.25px 0 rgb(255 255 255 / 0.12), inset 0 0.25px 0.25px 0 rgb(255 255 255 / 0.32), 0 0 0 var(--gl-ring-w) var(--gl-ring);
  -webkit-backdrop-filter: blur(var(--glass-blur));
  backdrop-filter: blur(var(--glass-blur));
  -webkit-tap-highlight-color: transparent;
  transition-property: scale, color, opacity;
  transition-duration: var(--dur-glass-release);
  transition-timing-function: var(--ease-out);
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
    inset: 0;
    padding: var(--line-width);
    border-radius: inherit;
    background-image: linear-gradient(var(--gl-rim-a) 0%, var(--gl-rim-b) 55%, var(--gl-rim-a) 80%, var(--gl-rim-b) 95%);
    opacity: var(--gl-rim);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  }
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
    inset-inline: calc(var(--glass-h, var(--control)) * var(--gloss-inset));
    top: var(--gloss-top);
    height: var(--gloss-height);
    border-radius: var(--radius-pill);
    background-image: linear-gradient(rgb(255 255 255 / var(--gl-gloss)), transparent);
    transition-property: opacity;
    transition-duration: var(--dur-glass-release);
  }
  @media (hover: hover) {
    &:hover:not(:disabled, [data-disabled], [aria-busy="true"]) {
      --gl-sheen-now: var(--gl-sheen-hover);
      --gl-tint-now: var(--gl-tint-hover, 0);
    }
  }
  &[data-force-hover]:not(:disabled, [data-disabled]) {
    --gl-sheen-now: var(--gl-sheen-hover);
    --gl-tint-now: var(--gl-tint-hover, 0);
  }
  &:is(:active, [data-force-active]):not(:disabled, [data-disabled]) {
    --gl-sheen-now: 0;
    --gl-core-now: var(--gl-core-held);
    --gl-glint-now: 0;
    --gl-tint-now: var(--gl-tint-held, 0);
    scale: var(--scale-press-glass);
    transition-duration: var(--dur-glass-press);
  }
  &:is(:active, [data-force-active]):not(:disabled, [data-disabled])::after {
    opacity: 0.6;
    transition-duration: var(--dur-glass-press);
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]):not([aria-busy="true"]) {
    background-image: none;
    background-color: var(--field);
    box-shadow: 0 0 0 var(--line-width) var(--line-faint);
    color: var(--text-disabled);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]):not([aria-busy="true"])::before {
    display: none;
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]):not([aria-busy="true"])::after {
    display: none;
  }
  @media (forced-colors: active) {
    background-image: none;
    box-shadow: none;
    border: var(--line-width) solid ButtonText;
    &::before, &::after {
      display: none;
    }
  }
}
:where(.glaze, [data-system="glaze"]) .pointer-events-none {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .collapse {
  visibility: collapse;
}
:where(.glaze, [data-system="glaze"]) .invisible {
  visibility: hidden;
}
:where(.glaze, [data-system="glaze"]) .visible {
  visibility: visible;
}
:where(.glaze, [data-system="glaze"]) .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
}
:where(.glaze, [data-system="glaze"]) .absolute {
  position: absolute;
}
:where(.glaze, [data-system="glaze"]) .fixed {
  position: fixed;
}
:where(.glaze, [data-system="glaze"]) .relative {
  position: relative;
}
:where(.glaze, [data-system="glaze"]) .static {
  position: static;
}
:where(.glaze, [data-system="glaze"]) .sticky {
  position: sticky;
}
:where(.glaze, [data-system="glaze"]) .inset-0 {
  inset: 0px;
}
:where(.glaze, [data-system="glaze"]) .inset-x-0 {
  inset-inline: 0px;
}
:where(.glaze, [data-system="glaze"]) .inset-x-3 {
  inset-inline: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .inset-y-0\\.5 {
  inset-block: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .start-0 {
  inset-inline-start: calc(var(--space-1) * 0);
}
:where(.glaze, [data-system="glaze"]) .start-2 {
  inset-inline-start: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .end-1 {
  inset-inline-end: calc(var(--space-1) * 1);
}
:where(.glaze, [data-system="glaze"]) .end-3 {
  inset-inline-end: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .end-4 {
  inset-inline-end: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .top-0 {
  top: 0px;
}
:where(.glaze, [data-system="glaze"]) .top-1\\.5 {
  top: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .top-1\\/2 {
  top: calc(1 / 2 * 100%);
}
:where(.glaze, [data-system="glaze"]) .bottom-0 {
  bottom: 0px;
}
:where(.glaze, [data-system="glaze"]) .bottom-4 {
  bottom: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .bottom-6 {
  bottom: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .left-0 {
  left: 0px;
}
:where(.glaze, [data-system="glaze"]) .isolate {
  isolation: isolate;
}
:where(.glaze, [data-system="glaze"]) .z-\\(--z-overlay\\) {
  z-index: var(--z-overlay);
}
:where(.glaze, [data-system="glaze"]) .z-\\(--z-raised\\) {
  z-index: var(--z-raised);
}
:where(.glaze, [data-system="glaze"]) .order-last {
  order: 9999;
}
:where(.glaze, [data-system="glaze"]) .col-start-1 {
  grid-column-start: 1;
}
:where(.glaze, [data-system="glaze"]) .col-start-2 {
  grid-column-start: 2;
}
:where(.glaze, [data-system="glaze"]) .row-span-2 {
  grid-row: span 2 / span 2;
}
:where(.glaze, [data-system="glaze"]) .row-start-1 {
  grid-row-start: 1;
}
:where(.glaze, [data-system="glaze"]) .container {
  width: 100%;
  @media (width >= 640px) {
    max-width: 640px;
  }
  @media (width >= 768px) {
    max-width: 768px;
  }
  @media (width >= 1024px) {
    max-width: 1024px;
  }
  @media (width >= 1280px) {
    max-width: 1280px;
  }
}
:where(.glaze, [data-system="glaze"]) .-mx-1 {
  margin-inline: calc(var(--space-1) * -1);
}
:where(.glaze, [data-system="glaze"]) .-mx-1\\.5 {
  margin-inline: calc(var(--space-1) * -1.5);
}
:where(.glaze, [data-system="glaze"]) .-mx-2 {
  margin-inline: calc(var(--space-1) * -2);
}
:where(.glaze, [data-system="glaze"]) .-mx-3 {
  margin-inline: calc(var(--space-1) * -3);
}
:where(.glaze, [data-system="glaze"]) .mx-4 {
  margin-inline: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .mx-auto {
  margin-inline: auto;
}
:where(.glaze, [data-system="glaze"]) .mx-px {
  margin-inline: 1px;
}
:where(.glaze, [data-system="glaze"]) .-my-0\\.5 {
  margin-block: calc(var(--space-1) * -0.5);
}
:where(.glaze, [data-system="glaze"]) .-my-1 {
  margin-block: calc(var(--space-1) * -1);
}
:where(.glaze, [data-system="glaze"]) .my-1 {
  margin-block: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .-ms-2 {
  margin-inline-start: calc(var(--space-1) * -2);
}
:where(.glaze, [data-system="glaze"]) .ms-2 {
  margin-inline-start: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .ms-auto {
  margin-inline-start: auto;
}
:where(.glaze, [data-system="glaze"]) .-me-2 {
  margin-inline-end: calc(var(--space-1) * -2);
}
:where(.glaze, [data-system="glaze"]) .me-1 {
  margin-inline-end: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .mt-0\\.5 {
  margin-top: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .mt-1 {
  margin-top: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .-mb-2 {
  margin-bottom: calc(var(--space-1) * -2);
}
:where(.glaze, [data-system="glaze"]) .mb-\\(--shell-inset\\) {
  margin-bottom: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .field {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  height: var(--field-h, var(--control));
  padding-inline: var(--space-3);
  background-color: var(--paper);
  border: var(--line-width) solid var(--line-control);
  border-radius: var(--radius-pill);
  color: var(--text-1);
  font: var(--type-body-sm);
  letter-spacing: var(--tracking-body);
  transition-property: border-color, background-color, color;
  transition-duration: var(--dur-state);
  transition-timing-function: var(--ease-out);
  &::placeholder, & ::placeholder {
    color: var(--text-3);
  }
  &:is(:focus-visible, [data-force-focus-visible]) {
    outline: none;
  }
  &:is(:focus-within, [data-force-focus], [data-force-focus-visible]) {
    border-color: var(--line-focus);
  }
  &:is([aria-invalid="true"], :has([aria-invalid="true"])) {
    border-color: var(--fail);
  }
  &:is(:disabled, [data-disabled], :has(:disabled)) {
    background-color: var(--field);
    color: var(--text-disabled);
  }
}
:where(.glaze, [data-system="glaze"]) .shell-foot {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  min-height: calc(var(--control-sm) + 2 * var(--shell-foot-inset) - var(--shell-inset));
  padding-block: var(--shell-foot-inset) calc(var(--shell-foot-inset) - var(--shell-inset));
  padding-inline: calc(var(--space-3) + var(--line-width)) calc(var(--shell-foot-inset) - var(--shell-inset));
  font: var(--type-caption);
  letter-spacing: var(--tracking-body);
  color: var(--text-2);
  :where(& > :not(button, [data-slot="button"])) {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
:where(.glaze, [data-system="glaze"]) .shell {
  display: grid;
  min-width: 0;
  background-color: var(--shell);
  border: var(--line-width) solid var(--line-faint);
  border-radius: var(--radius-shell);
  padding: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
:where(.glaze, [data-system="glaze"]) .\\!inline {
  display: inline !important;
}
:where(.glaze, [data-system="glaze"]) .block {
  display: block;
}
:where(.glaze, [data-system="glaze"]) .contents {
  display: contents;
}
:where(.glaze, [data-system="glaze"]) .flex {
  display: flex;
}
:where(.glaze, [data-system="glaze"]) .grid {
  display: grid;
}
:where(.glaze, [data-system="glaze"]) .hidden {
  display: none;
}
:where(.glaze, [data-system="glaze"]) .inline {
  display: inline;
}
:where(.glaze, [data-system="glaze"]) .inline-block {
  display: inline-block;
}
:where(.glaze, [data-system="glaze"]) .inline-flex {
  display: inline-flex;
}
:where(.glaze, [data-system="glaze"]) .table {
  display: table;
}
:where(.glaze, [data-system="glaze"]) .table-caption {
  display: table-caption;
}
:where(.glaze, [data-system="glaze"]) .table-cell {
  display: table-cell;
}
:where(.glaze, [data-system="glaze"]) .table-row {
  display: table-row;
}
:where(.glaze, [data-system="glaze"]) .field-sizing-content {
  field-sizing: content;
}
:where(.glaze, [data-system="glaze"]) .aspect-square {
  aspect-ratio: 1 / 1;
}
:where(.glaze, [data-system="glaze"]) .size-\\(--action-h\\) {
  width: var(--action-h);
  height: var(--action-h);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--attachment-media\\) {
  width: var(--attachment-media);
  height: var(--attachment-media);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--control\\) {
  width: var(--control);
  height: var(--control);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--control-lg\\) {
  width: var(--control-lg);
  height: var(--control-lg);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--control-sm\\) {
  width: var(--control-sm);
  height: var(--control-sm);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--icon\\) {
  width: var(--icon);
  height: var(--icon);
}
:where(.glaze, [data-system="glaze"]) .size-1\\.5 {
  width: calc(var(--space-1) * 1.5);
  height: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .size-2 {
  width: calc(var(--space-1) * 2);
  height: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .size-3 {
  width: calc(var(--space-1) * 3);
  height: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .size-4 {
  width: calc(var(--space-1) * 4);
  height: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .size-4\\.5 {
  width: calc(var(--space-1) * 4.5);
  height: calc(var(--space-1) * 4.5);
}
:where(.glaze, [data-system="glaze"]) .size-5 {
  width: calc(var(--space-1) * 5);
  height: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .size-6 {
  width: calc(var(--space-1) * 6);
  height: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .size-8 {
  width: calc(var(--space-1) * 8);
  height: calc(var(--space-1) * 8);
}
:where(.glaze, [data-system="glaze"]) .size-\\[calc\\(var\\(--control-sm\\)-2\\*var\\(--shell-inset\\)-2\\*var\\(--line-width\\)\\)\\] {
  width: calc(var(--control-sm) - 2 * var(--shell-inset) - 2 * var(--line-width));
  height: calc(var(--control-sm) - 2 * var(--shell-inset) - 2 * var(--line-width));
}
:where(.glaze, [data-system="glaze"]) .size-full {
  width: 100%;
  height: 100%;
}
:where(.glaze, [data-system="glaze"]) .h-\\(--action-h\\) {
  height: var(--action-h);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--control\\) {
  height: var(--control);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--control-lg\\) {
  height: var(--control-lg);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--control-sm\\) {
  height: var(--control-sm);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--live\\) {
  height: var(--live);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--menu-row\\) {
  height: var(--menu-row);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--menu-row-sm\\) {
  height: var(--menu-row-sm);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--row\\) {
  height: var(--row);
}
:where(.glaze, [data-system="glaze"]) .h-0\\.5 {
  height: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .h-1\\/2 {
  height: calc(1 / 2 * 100%);
}
:where(.glaze, [data-system="glaze"]) .h-2 {
  height: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .h-4 {
  height: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .h-5 {
  height: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .h-8 {
  height: calc(var(--space-1) * 8);
}
:where(.glaze, [data-system="glaze"]) .h-\\[max\\(var\\(--control\\)\\,calc\\(1lh\\+var\\(--space-2\\)\\)\\)\\] {
  height: max(var(--control), calc(1lh + var(--space-2)));
}
:where(.glaze, [data-system="glaze"]) .h-\\[max\\(var\\(--control-lg\\)\\,calc\\(1lh\\+var\\(--space-2\\)\\)\\)\\] {
  height: max(var(--control-lg), calc(1lh + var(--space-2)));
}
:where(.glaze, [data-system="glaze"]) .h-\\[max\\(var\\(--control-sm\\)\\,calc\\(1lh\\+var\\(--space-2\\)\\)\\)\\] {
  height: max(var(--control-sm), calc(1lh + var(--space-2)));
}
:where(.glaze, [data-system="glaze"]) .h-auto {
  height: auto;
}
:where(.glaze, [data-system="glaze"]) .h-dvh {
  height: 100dvh;
}
:where(.glaze, [data-system="glaze"]) .h-full {
  height: 100%;
}
:where(.glaze, [data-system="glaze"]) .h-lh {
  height: 1lh;
}
:where(.glaze, [data-system="glaze"]) .h-max {
  height: max-content;
}
:where(.glaze, [data-system="glaze"]) .h-px {
  height: 1px;
}
:where(.glaze, [data-system="glaze"]) .max-h-\\(--code-max\\) {
  max-height: var(--code-max);
}
:where(.glaze, [data-system="glaze"]) .max-h-\\(--popup-max\\) {
  max-height: var(--popup-max);
}
:where(.glaze, [data-system="glaze"]) .max-h-40 {
  max-height: calc(var(--space-1) * 40);
}
:where(.glaze, [data-system="glaze"]) .max-h-60 {
  max-height: calc(var(--space-1) * 60);
}
:where(.glaze, [data-system="glaze"]) .max-h-\\[min\\(var\\(--popup-max\\)\\,var\\(--available-height\\)\\)\\] {
  max-height: min(var(--popup-max), var(--available-height));
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--control\\) {
  min-height: var(--control);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--control-sm\\) {
  min-height: var(--control-sm);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--menu-item-h\\) {
  min-height: var(--menu-item-h);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--menu-row\\) {
  min-height: var(--menu-row);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--menu-row-sm\\) {
  min-height: var(--menu-row-sm);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--row\\) {
  min-height: var(--row);
}
:where(.glaze, [data-system="glaze"]) .min-h-0 {
  min-height: 0px;
}
:where(.glaze, [data-system="glaze"]) .min-h-4 {
  min-height: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .min-h-5 {
  min-height: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .min-h-6 {
  min-height: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .min-h-11 {
  min-height: calc(var(--space-1) * 11);
}
:where(.glaze, [data-system="glaze"]) .min-h-full {
  min-height: 100%;
}
:where(.glaze, [data-system="glaze"]) .min-h-lh {
  min-height: 1lh;
}
:where(.glaze, [data-system="glaze"]) .w-\\(--action-h\\) {
  width: var(--action-h);
}
:where(.glaze, [data-system="glaze"]) .w-\\(--gutter\\) {
  width: var(--gutter);
}
:where(.glaze, [data-system="glaze"]) .w-\\(--pct\\) {
  width: var(--pct);
}
:where(.glaze, [data-system="glaze"]) .w-\\(--seg-w\\) {
  width: var(--seg-w);
}
:where(.glaze, [data-system="glaze"]) .w-0\\.5 {
  width: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .w-1\\/2 {
  width: calc(1 / 2 * 100%);
}
:where(.glaze, [data-system="glaze"]) .w-1\\/3 {
  width: calc(1 / 3 * 100%);
}
:where(.glaze, [data-system="glaze"]) .w-2 {
  width: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .w-2\\/3 {
  width: calc(2 / 3 * 100%);
}
:where(.glaze, [data-system="glaze"]) .w-3\\/4 {
  width: calc(3 / 4 * 100%);
}
:where(.glaze, [data-system="glaze"]) .w-4 {
  width: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .w-10 {
  width: calc(var(--space-1) * 10);
}
:where(.glaze, [data-system="glaze"]) .w-12 {
  width: calc(var(--space-1) * 12);
}
:where(.glaze, [data-system="glaze"]) .w-14 {
  width: calc(var(--space-1) * 14);
}
:where(.glaze, [data-system="glaze"]) .w-16 {
  width: calc(var(--space-1) * 16);
}
:where(.glaze, [data-system="glaze"]) .w-22 {
  width: calc(var(--space-1) * 22);
}
:where(.glaze, [data-system="glaze"]) .w-24 {
  width: calc(var(--space-1) * 24);
}
:where(.glaze, [data-system="glaze"]) .w-auto {
  width: auto;
}
:where(.glaze, [data-system="glaze"]) .w-fit {
  width: fit-content;
}
:where(.glaze, [data-system="glaze"]) .w-full {
  width: 100%;
}
:where(.glaze, [data-system="glaze"]) .w-max {
  width: max-content;
}
:where(.glaze, [data-system="glaze"]) .max-w-\\(--available-width\\) {
  max-width: var(--available-width);
}
:where(.glaze, [data-system="glaze"]) .max-w-\\(--measure\\) {
  max-width: var(--measure);
}
:where(.glaze, [data-system="glaze"]) .max-w-\\(--measure-hint\\) {
  max-width: var(--measure-hint);
}
:where(.glaze, [data-system="glaze"]) .max-w-\\(--tooltip-max\\) {
  max-width: var(--tooltip-max);
}
:where(.glaze, [data-system="glaze"]) .max-w-1\\/2 {
  max-width: calc(1 / 2 * 100%);
}
:where(.glaze, [data-system="glaze"]) .max-w-64 {
  max-width: calc(var(--space-1) * 64);
}
:where(.glaze, [data-system="glaze"]) .max-w-\\[calc\\(100\\%\\+var\\(--space-4\\)\\)\\] {
  max-width: calc(100% + var(--space-4));
}
:where(.glaze, [data-system="glaze"]) .max-w-\\[min\\(var\\(--popover\\)\\,var\\(--available-width\\)\\)\\] {
  max-width: min(var(--popover), var(--available-width));
}
:where(.glaze, [data-system="glaze"]) .max-w-full {
  max-width: 100%;
}
:where(.glaze, [data-system="glaze"]) .max-w-measure {
  max-width: var(--measure);
}
:where(.glaze, [data-system="glaze"]) .panel {
  min-width: 0;
  overflow: clip;
  background-color: var(--paper);
  border: var(--line-width) solid var(--line-faint);
  border-radius: var(--radius-panel);
}
:where(.glaze, [data-system="glaze"]) .min-w-\\(--anchor-width\\) {
  min-width: var(--anchor-width);
}
:where(.glaze, [data-system="glaze"]) .min-w-\\(--menu-min\\) {
  min-width: var(--menu-min);
}
:where(.glaze, [data-system="glaze"]) .min-w-0 {
  min-width: 0px;
}
:where(.glaze, [data-system="glaze"]) .min-w-1 {
  min-width: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .min-w-4 {
  min-width: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .min-w-5 {
  min-width: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .min-w-6 {
  min-width: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .min-w-8 {
  min-width: calc(var(--space-1) * 8);
}
:where(.glaze, [data-system="glaze"]) .min-w-12 {
  min-width: calc(var(--space-1) * 12);
}
:where(.glaze, [data-system="glaze"]) .min-w-32 {
  min-width: calc(var(--space-1) * 32);
}
:where(.glaze, [data-system="glaze"]) .min-w-40 {
  min-width: calc(var(--space-1) * 40);
}
:where(.glaze, [data-system="glaze"]) .min-w-48 {
  min-width: calc(var(--space-1) * 48);
}
:where(.glaze, [data-system="glaze"]) .min-w-full {
  min-width: 100%;
}
:where(.glaze, [data-system="glaze"]) .min-w-px {
  min-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .flex-1 {
  flex: 1;
}
:where(.glaze, [data-system="glaze"]) .shrink {
  flex-shrink: 1;
}
:where(.glaze, [data-system="glaze"]) .shrink-0 {
  flex-shrink: 0;
}
:where(.glaze, [data-system="glaze"]) .grow {
  flex-grow: 1;
}
:where(.glaze, [data-system="glaze"]) .basis-0 {
  flex-basis: 0px;
}
:where(.glaze, [data-system="glaze"]) .basis-40 {
  flex-basis: calc(var(--space-1) * 40);
}
:where(.glaze, [data-system="glaze"]) .basis-48 {
  flex-basis: calc(var(--space-1) * 48);
}
:where(.glaze, [data-system="glaze"]) .basis-full {
  flex-basis: 100%;
}
:where(.glaze, [data-system="glaze"]) .caption-bottom {
  caption-side: bottom;
}
:where(.glaze, [data-system="glaze"]) .border-separate {
  border-collapse: separate;
}
:where(.glaze, [data-system="glaze"]) .border-spacing-0 {
  --tw-border-spacing-x: 0px;
  --tw-border-spacing-y: 0px;
  border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);
}
:where(.glaze, [data-system="glaze"]) .-translate-x-1\\/2 {
  --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .translate-x-\\(--seg-x\\) {
  --tw-translate-x: var(--seg-x);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .-translate-y-1\\/2 {
  --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .overlay-motion {
  transition-property: opacity, translate, scale;
  transition-duration: var(--dur-overlay);
  transition-timing-function: var(--ease-out);
  &:is([data-starting-style], [data-ending-style]) {
    opacity: 0;
  }
  &[data-ending-style] {
    transition-duration: var(--dur-state);
    transition-timing-function: var(--ease-in);
  }
  &:is([data-side="bottom"]):is([data-starting-style], [data-ending-style]) {
    translate: 0 calc(var(--overlay-shift) * -1);
  }
  &:is([data-side="top"]):is([data-starting-style], [data-ending-style]) {
    translate: 0 var(--overlay-shift);
  }
  &:is([data-side="right"], [data-side="inline-end"]):is([data-starting-style], [data-ending-style]) {
    translate: calc(var(--overlay-shift) * -1) 0;
  }
  &:is([data-side="left"], [data-side="inline-start"]):is([data-starting-style], [data-ending-style]) {
    translate: var(--overlay-shift) 0;
  }
  &:is([data-side="inline-end"]):dir(rtl):is([data-starting-style], [data-ending-style]) {
    translate: var(--overlay-shift) 0;
  }
  &:is([data-side="inline-start"]):dir(rtl):is([data-starting-style], [data-ending-style]) {
    translate: calc(var(--overlay-shift) * -1) 0;
  }
  &:not([data-side]):is([data-starting-style], [data-ending-style]) {
    scale: var(--scale-overlay);
  }
}
:where(.glaze, [data-system="glaze"]) .flat {
  color: var(--flat-text);
  background-color: var(--flat-bg);
  box-shadow: 0 0 0 var(--line-width) var(--flat-ring);
  -webkit-tap-highlight-color: transparent;
  transition-property: background-image, scale, color;
  transition-duration: var(--dur-press);
  transition-timing-function: var(--ease-out);
  @media (hover: hover) {
    &:hover:not(:disabled, [data-disabled], [aria-busy="true"]) {
      background-image: linear-gradient(var(--hover), var(--hover));
    }
  }
  &[data-force-hover]:not(:disabled, [data-disabled]) {
    background-image: linear-gradient(var(--hover), var(--hover));
  }
  &:is(:active, [data-force-active]):not(:disabled, [data-disabled]) {
    background-image: linear-gradient(var(--pressed), var(--pressed));
    scale: var(--scale-press-flat);
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]):not([aria-busy="true"]) {
    background-color: var(--field);
    box-shadow: 0 0 0 var(--line-width) var(--line-faint);
    color: var(--text-disabled);
  }
  @media (forced-colors: active) {
    box-shadow: none;
    border: var(--line-width) solid ButtonText;
  }
}
:where(.glaze, [data-system="glaze"]) .transform {
  transform: var(--tw-rotate-x, ) var(--tw-rotate-y, ) var(--tw-rotate-z, ) var(--tw-skew-x, ) var(--tw-skew-y, );
}
:where(.glaze, [data-system="glaze"]) .animate-spin {
  animation: glaze-spin var(--dur-spin) linear infinite;
}
:where(.glaze, [data-system="glaze"]) .cursor-crosshair {
  cursor: crosshair;
}
:where(.glaze, [data-system="glaze"]) .cursor-default {
  cursor: default;
}
:where(.glaze, [data-system="glaze"]) .cursor-not-allowed {
  cursor: not-allowed;
}
:where(.glaze, [data-system="glaze"]) .cursor-pointer {
  cursor: pointer;
}
:where(.glaze, [data-system="glaze"]) .cursor-progress {
  cursor: progress;
}
:where(.glaze, [data-system="glaze"]) .cursor-text {
  cursor: text;
}
:where(.glaze, [data-system="glaze"]) .resize {
  resize: both;
}
:where(.glaze, [data-system="glaze"]) .resize-none {
  resize: none;
}
:where(.glaze, [data-system="glaze"]) .resize-y {
  resize: vertical;
}
:where(.glaze, [data-system="glaze"]) .snap-x {
  scroll-snap-type: x var(--tw-scroll-snap-strictness);
}
:where(.glaze, [data-system="glaze"]) .scroll-py-1 {
  scroll-padding-block: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .\\[scrollbar-width\\:none\\] {
  scrollbar-width: none;
}
:where(.glaze, [data-system="glaze"]) .\\[scrollbar-gutter\\:stable\\] {
  scrollbar-gutter: stable;
}
:where(.glaze, [data-system="glaze"]) .appearance-none {
  appearance: none;
}
:where(.glaze, [data-system="glaze"]) .grid-cols-\\[max-content_minmax\\(0\\,1fr\\)\\] {
  grid-template-columns: max-content minmax(0,1fr);
}
:where(.glaze, [data-system="glaze"]) .grid-cols-\\[minmax\\(0\\,1fr\\)_auto\\] {
  grid-template-columns: minmax(0,1fr) auto;
}
:where(.glaze, [data-system="glaze"]) .grid-rows-\\[minmax\\(0\\,1fr\\)\\] {
  grid-template-rows: minmax(0,1fr);
}
:where(.glaze, [data-system="glaze"]) .flex-col {
  flex-direction: column;
}
:where(.glaze, [data-system="glaze"]) .flex-row {
  flex-direction: row;
}
:where(.glaze, [data-system="glaze"]) .flex-row-reverse {
  flex-direction: row-reverse;
}
:where(.glaze, [data-system="glaze"]) .flex-wrap {
  flex-wrap: wrap;
}
:where(.glaze, [data-system="glaze"]) .place-items-center {
  place-items: center;
}
:where(.glaze, [data-system="glaze"]) .items-baseline {
  align-items: baseline;
}
:where(.glaze, [data-system="glaze"]) .items-center {
  align-items: center;
}
:where(.glaze, [data-system="glaze"]) .items-end {
  align-items: flex-end;
}
:where(.glaze, [data-system="glaze"]) .items-start {
  align-items: flex-start;
}
:where(.glaze, [data-system="glaze"]) .items-stretch {
  align-items: stretch;
}
:where(.glaze, [data-system="glaze"]) .justify-between {
  justify-content: space-between;
}
:where(.glaze, [data-system="glaze"]) .justify-center {
  justify-content: center;
}
:where(.glaze, [data-system="glaze"]) .justify-end {
  justify-content: flex-end;
}
:where(.glaze, [data-system="glaze"]) .justify-items-end {
  justify-items: end;
}
:where(.glaze, [data-system="glaze"]) .justify-items-start {
  justify-items: start;
}
:where(.glaze, [data-system="glaze"]) .gap-0 {
  gap: 0px;
}
:where(.glaze, [data-system="glaze"]) .gap-0\\.5 {
  gap: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .gap-1 {
  gap: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .gap-1\\.5 {
  gap: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .gap-2 {
  gap: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .gap-3 {
  gap: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .gap-4 {
  gap: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .gap-6 {
  gap: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .gap-px {
  gap: 1px;
}
:where(.glaze, [data-system="glaze"]) .gap-x-2\\.5 {
  column-gap: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .gap-x-3 {
  column-gap: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .gap-y-0\\.5 {
  row-gap: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .gap-y-1 {
  row-gap: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .self-center {
  align-self: center;
}
:where(.glaze, [data-system="glaze"]) .self-end {
  align-self: flex-end;
}
:where(.glaze, [data-system="glaze"]) .self-start {
  align-self: flex-start;
}
:where(.glaze, [data-system="glaze"]) .self-stretch {
  align-self: stretch;
}
:where(.glaze, [data-system="glaze"]) .truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:where(.glaze, [data-system="glaze"]) .overflow-auto {
  overflow: auto;
}
:where(.glaze, [data-system="glaze"]) .overflow-hidden {
  overflow: hidden;
}
:where(.glaze, [data-system="glaze"]) .overflow-visible {
  overflow: visible;
}
:where(.glaze, [data-system="glaze"]) .overflow-x-auto {
  overflow-x: auto;
}
:where(.glaze, [data-system="glaze"]) .overflow-y-auto {
  overflow-y: auto;
}
:where(.glaze, [data-system="glaze"]) .overscroll-contain {
  overscroll-behavior: contain;
}
:where(.glaze, [data-system="glaze"]) .overscroll-x-contain {
  overscroll-behavior-x: contain;
}
:where(.glaze, [data-system="glaze"]) .overlay {
  background-color: var(--paper);
  border: var(--line-width) solid var(--line);
  border-radius: var(--radius-overlay);
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .rounded-\\[1\\.5px\\] {
  border-radius: 1.5px;
}
:where(.glaze, [data-system="glaze"]) .rounded-\\[inherit\\] {
  border-radius: inherit;
}
:where(.glaze, [data-system="glaze"]) .rounded-overlay {
  border-radius: var(--radius-overlay);
}
:where(.glaze, [data-system="glaze"]) .rounded-pill {
  border-radius: var(--radius-pill);
}
:where(.glaze, [data-system="glaze"]) .rounded-shell {
  border-radius: var(--radius-shell);
}
:where(.glaze, [data-system="glaze"]) .rounded-tag {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .rounded-b-none {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
:where(.glaze, [data-system="glaze"]) .border {
  border-style: var(--tw-border-style);
  border-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .border-0 {
  border-style: var(--tw-border-style);
  border-width: 0px;
}
:where(.glaze, [data-system="glaze"]) .rule-row {
  border-block-end: var(--line-width) solid var(--line-faint);
  &:last-child {
    border-block-end-width: 0;
  }
}
:where(.glaze, [data-system="glaze"]) .border-t {
  border-top-style: var(--tw-border-style);
  border-top-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .border-b {
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .border-ink {
  border-color: var(--ink);
}
:where(.glaze, [data-system="glaze"]) .border-line {
  border-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .border-line-control {
  border-color: var(--line-control);
}
:where(.glaze, [data-system="glaze"]) .border-line-faint {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .border-line-focus {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .border-text-inverse\\/20 {
  border-color: var(--text-inverse);
  @supports (color: color-mix(in lab, red, red)) {
    border-color: color-mix(in oklab, var(--text-inverse) 20%, transparent);
  }
}
:where(.glaze, [data-system="glaze"]) .border-transparent {
  border-color: transparent;
}
:where(.glaze, [data-system="glaze"]) .glaze-sm {
  color: var(--glaze-sm-text);
  background-color: var(--glaze-sm-mid);
  background-image: linear-gradient(var(--gz-dir, 180deg),var(--glaze-sm-top), var(--glaze-sm-mid) 50%, var(--glaze-sm-bottom));
  box-shadow: inset 0 var(--line-width) 0 var(--glaze-sm-highlight), 0 0 0 0.5px var(--glaze-sm-rim);
  -webkit-tap-highlight-color: transparent;
  &:is(:active, [data-force-active]):not(:disabled, [data-disabled], [data-readonly]) {
    box-shadow: 0 0 0 0.5px var(--glaze-sm-rim);
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]) {
    background-image: none;
    background-color: var(--field);
    box-shadow: 0 0 0 var(--line-width) var(--line-faint);
    color: var(--text-disabled);
  }
  @media (forced-colors: active) {
    background-image: none;
    box-shadow: none;
  }
}
:where(.glaze, [data-system="glaze"]) .code-surface {
  background-color: var(--code-surface);
  border: var(--line-width) solid var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .bg-code-surface {
  background-color: var(--code-surface);
}
:where(.glaze, [data-system="glaze"]) .bg-current {
  background-color: currentcolor;
}
:where(.glaze, [data-system="glaze"]) .bg-fail {
  background-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .bg-fail-tint {
  background-color: var(--fail-tint);
}
:where(.glaze, [data-system="glaze"]) .bg-field {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .bg-ink {
  background-color: var(--ink);
}
:where(.glaze, [data-system="glaze"]) .bg-line {
  background-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .bg-line-faint {
  background-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .bg-line-strong {
  background-color: var(--line-strong);
}
:where(.glaze, [data-system="glaze"]) .bg-ok-tint {
  background-color: var(--ok-tint);
}
:where(.glaze, [data-system="glaze"]) .bg-page {
  background-color: var(--page);
}
:where(.glaze, [data-system="glaze"]) .bg-paper {
  background-color: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .bg-pressed {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .bg-scrim {
  background-color: var(--scrim);
}
:where(.glaze, [data-system="glaze"]) .bg-text-2 {
  background-color: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .bg-text-inverse\\/15 {
  background-color: var(--text-inverse);
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--text-inverse) 15%, transparent);
  }
}
:where(.glaze, [data-system="glaze"]) .bg-transparent {
  background-color: transparent;
}
:where(.glaze, [data-system="glaze"]) .bg-warn {
  background-color: var(--warn);
}
:where(.glaze, [data-system="glaze"]) .bg-warn-tint {
  background-color: var(--warn-tint);
}
:where(.glaze, [data-system="glaze"]) .well {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .fill-current {
  fill: currentcolor;
}
:where(.glaze, [data-system="glaze"]) .fill-hover {
  fill: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .fill-paper {
  fill: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .fill-text-2 {
  fill: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .stroke-current {
  stroke: currentcolor;
}
:where(.glaze, [data-system="glaze"]) .stroke-line {
  stroke: var(--line);
}
:where(.glaze, [data-system="glaze"]) .stroke-line-faint {
  stroke: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .stroke-line-strong {
  stroke: var(--line-strong);
}
:where(.glaze, [data-system="glaze"]) .stroke-none {
  stroke: none;
}
:where(.glaze, [data-system="glaze"]) .stroke-paper {
  stroke: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .object-cover {
  object-fit: cover;
}
:where(.glaze, [data-system="glaze"]) .p-0 {
  padding: 0px;
}
:where(.glaze, [data-system="glaze"]) .p-0\\.5 {
  padding: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .p-1 {
  padding: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .p-1\\.5 {
  padding: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .p-3 {
  padding: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .p-4 {
  padding: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .px-0 {
  padding-inline: 0px;
}
:where(.glaze, [data-system="glaze"]) .px-1 {
  padding-inline: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .px-1\\.5 {
  padding-inline: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .px-2 {
  padding-inline: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .px-2\\.5 {
  padding-inline: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .px-3 {
  padding-inline: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .px-3\\.5 {
  padding-inline: calc(var(--space-1) * 3.5);
}
:where(.glaze, [data-system="glaze"]) .px-4 {
  padding-inline: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .py-1 {
  padding-block: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .py-1\\.5 {
  padding-block: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .py-2 {
  padding-block: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .py-3 {
  padding-block: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .py-4 {
  padding-block: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .py-5 {
  padding-block: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .py-6 {
  padding-block: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .ps-0\\.5 {
  padding-inline-start: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .ps-2 {
  padding-inline-start: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .ps-2\\.5 {
  padding-inline-start: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .ps-3 {
  padding-inline-start: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .ps-4 {
  padding-inline-start: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .ps-5 {
  padding-inline-start: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .ps-6 {
  padding-inline-start: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .ps-7 {
  padding-inline-start: calc(var(--space-1) * 7);
}
:where(.glaze, [data-system="glaze"]) .pe-\\(--avatar-covered\\) {
  padding-inline-end: var(--avatar-covered);
}
:where(.glaze, [data-system="glaze"]) .pe-\\(--shell-inset\\) {
  padding-inline-end: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .pe-0 {
  padding-inline-end: 0px;
}
:where(.glaze, [data-system="glaze"]) .pe-1 {
  padding-inline-end: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .pe-1\\.5 {
  padding-inline-end: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .pe-2 {
  padding-inline-end: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .pe-3 {
  padding-inline-end: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .pe-8 {
  padding-inline-end: calc(var(--space-1) * 8);
}
:where(.glaze, [data-system="glaze"]) .pt-\\(--shell-inset\\) {
  padding-top: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .pt-0\\.5 {
  padding-top: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .pt-1 {
  padding-top: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .pt-2 {
  padding-top: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .pt-2\\.5 {
  padding-top: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .pb-1 {
  padding-bottom: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .pb-2 {
  padding-bottom: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .pb-3 {
  padding-bottom: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .text-center {
  text-align: center;
}
:where(.glaze, [data-system="glaze"]) .text-end {
  text-align: end;
}
:where(.glaze, [data-system="glaze"]) .text-start {
  text-align: start;
}
:where(.glaze, [data-system="glaze"]) .align-bottom {
  vertical-align: bottom;
}
:where(.glaze, [data-system="glaze"]) .align-middle {
  vertical-align: middle;
}
:where(.glaze, [data-system="glaze"]) .align-top {
  vertical-align: top;
}
:where(.glaze, [data-system="glaze"]) .mono {
  font-family: var(--font-mono);
  font-size: calc(1em * var(--mono-scale));
  letter-spacing: 0;
}
:where(.glaze, [data-system="glaze"]) .font-\\[inherit\\] {
  font-family: inherit;
}
:where(.glaze, [data-system="glaze"]) .leading-none {
  --tw-leading: 1;
  line-height: 1;
}
:where(.glaze, [data-system="glaze"]) .font-normal {
  --tw-font-weight: var(--weight-normal);
  font-weight: var(--weight-normal);
}
:where(.glaze, [data-system="glaze"]) .font-semibold {
  --tw-font-weight: var(--weight-semibold);
  font-weight: var(--weight-semibold);
}
:where(.glaze, [data-system="glaze"]) .type-caption {
  font: var(--type-caption);
  letter-spacing: var(--tracking-body);
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-code {
  font: var(--type-code);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-code-block {
  font: var(--type-code-block);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-code-sm {
  font: var(--type-code-sm);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-code-xs {
  font: var(--type-code-xs);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-body {
  font: var(--type-body);
  letter-spacing: var(--tracking-body);
}
:where(.glaze, [data-system="glaze"]) .type-body-sm {
  font: var(--type-body-sm);
  letter-spacing: var(--tracking-body);
}
:where(.glaze, [data-system="glaze"]) .type-heading {
  font: var(--type-heading);
  letter-spacing: var(--tracking-heading);
}
:where(.glaze, [data-system="glaze"]) .type-heading-sm {
  font: var(--type-heading-sm);
  letter-spacing: var(--tracking-heading);
}
:where(.glaze, [data-system="glaze"]) .type-label {
  font: var(--type-label);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .type-label-lg {
  font: var(--type-label-lg);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .type-label-sm {
  font: var(--type-label-sm);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .text-pretty {
  text-wrap: pretty;
}
:where(.glaze, [data-system="glaze"]) .\\[overflow-wrap\\:anywhere\\] {
  overflow-wrap: anywhere;
}
:where(.glaze, [data-system="glaze"]) .break-words {
  overflow-wrap: break-word;
}
:where(.glaze, [data-system="glaze"]) .break-all {
  word-break: break-all;
}
:where(.glaze, [data-system="glaze"]) .whitespace-normal {
  white-space: normal;
}
:where(.glaze, [data-system="glaze"]) .whitespace-nowrap {
  white-space: nowrap;
}
:where(.glaze, [data-system="glaze"]) .whitespace-pre {
  white-space: pre;
}
:where(.glaze, [data-system="glaze"]) .whitespace-pre-wrap {
  white-space: pre-wrap;
}
:where(.glaze, [data-system="glaze"]) .text-\\(--glaze-sm-text\\) {
  color: var(--glaze-sm-text);
}
:where(.glaze, [data-system="glaze"]) .text-fail {
  color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .text-fail-text {
  color: var(--fail-text);
}
:where(.glaze, [data-system="glaze"]) .text-field {
  color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .text-inherit {
  color: inherit;
}
:where(.glaze, [data-system="glaze"]) .text-ok {
  color: var(--ok);
}
:where(.glaze, [data-system="glaze"]) .text-ok-text {
  color: var(--ok-text);
}
:where(.glaze, [data-system="glaze"]) .text-text-1 {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .text-text-2 {
  color: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .text-text-3 {
  color: var(--text-3);
}
:where(.glaze, [data-system="glaze"]) .text-text-disabled {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .text-text-inverse {
  color: var(--text-inverse);
}
:where(.glaze, [data-system="glaze"]) .text-text-inverse\\/60 {
  color: var(--text-inverse);
  @supports (color: color-mix(in lab, red, red)) {
    color: color-mix(in oklab, var(--text-inverse) 60%, transparent);
  }
}
:where(.glaze, [data-system="glaze"]) .text-text-inverse\\/70 {
  color: var(--text-inverse);
  @supports (color: color-mix(in lab, red, red)) {
    color: color-mix(in oklab, var(--text-inverse) 70%, transparent);
  }
}
:where(.glaze, [data-system="glaze"]) .text-warn {
  color: var(--warn);
}
:where(.glaze, [data-system="glaze"]) .text-warn-text {
  color: var(--warn-text);
}
:where(.glaze, [data-system="glaze"]) .tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal, ) var(--tw-slashed-zero, ) var(--tw-numeric-figure, ) var(--tw-numeric-spacing, ) var(--tw-numeric-fraction, );
}
:where(.glaze, [data-system="glaze"]) .data {
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .line-through {
  text-decoration-line: line-through;
}
:where(.glaze, [data-system="glaze"]) .no-underline {
  text-decoration-line: none;
}
:where(.glaze, [data-system="glaze"]) .underline {
  text-decoration-line: underline;
}
:where(.glaze, [data-system="glaze"]) .decoration-1 {
  text-decoration-thickness: 1px;
}
:where(.glaze, [data-system="glaze"]) .underline-offset-4 {
  text-underline-offset: 4px;
}
:where(.glaze, [data-system="glaze"]) .opacity-\\(--stale\\) {
  opacity: var(--stale);
}
:where(.glaze, [data-system="glaze"]) .opacity-0 {
  opacity: 0%;
}
:where(.glaze, [data-system="glaze"]) .opacity-40 {
  opacity: 40%;
}
:where(.glaze, [data-system="glaze"]) .opacity-70 {
  opacity: 70%;
}
:where(.glaze, [data-system="glaze"]) .ring {
  --tw-ring-shadow: var(--tw-ring-inset, ) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}
:where(.glaze, [data-system="glaze"]) .outline {
  outline-style: var(--tw-outline-style);
  outline-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .outline-2 {
  outline-style: var(--tw-outline-style);
  outline-width: 2px;
}
:where(.glaze, [data-system="glaze"]) .outline-\\(--avatar-cutout\\) {
  outline-color: var(--avatar-cutout);
}
:where(.glaze, [data-system="glaze"]) .filter {
  filter: var(--tw-blur, ) var(--tw-brightness, ) var(--tw-contrast, ) var(--tw-grayscale, ) var(--tw-hue-rotate, ) var(--tw-invert, ) var(--tw-saturate, ) var(--tw-sepia, ) var(--tw-drop-shadow, );
}
:where(.glaze, [data-system="glaze"]) .transition {
  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\,border-color\\,color\\,scale\\] {
  transition-property: background-color,border-color,color,scale;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\,border-color\\] {
  transition-property: background-color,border-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\,color\\,scale\\] {
  transition-property: background-color,color,scale;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\,color\\] {
  transition-property: background-color,color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\] {
  transition-property: background-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[border-color\\,background-color\\,color\\] {
  transition-property: border-color,background-color,color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[border-color\\,background-color\\] {
  transition-property: border-color,background-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[color\\,background-color\\] {
  transition-property: color,background-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[height\\] {
  transition-property: height;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[rotate\\] {
  transition-property: rotate;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[text-decoration-color\\,outline-color\\] {
  transition-property: text-decoration-color,outline-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[translate\\,width\\] {
  transition-property: translate,width;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-colors {
  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-opacity {
  transition-property: opacity;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .tick-draw {
  clip-path: inset(0);
  transition: clip-path var(--dur-state) var(--ease-out);
  &[data-starting-style] {
    clip-path: inset(0 100% 0 0);
  }
  &:dir(rtl)[data-starting-style] {
    clip-path: inset(0 0 0 100%);
  }
  &[data-ending-style] {
    transition-duration: 0ms;
  }
}
:where(.glaze, [data-system="glaze"]) .duration-\\(--dur-overlay\\) {
  --tw-duration: var(--dur-overlay);
  transition-duration: var(--dur-overlay);
}
:where(.glaze, [data-system="glaze"]) .duration-\\(--dur-press\\) {
  --tw-duration: var(--dur-press);
  transition-duration: var(--dur-press);
}
:where(.glaze, [data-system="glaze"]) .duration-\\(--dur-slide\\) {
  --tw-duration: var(--dur-slide);
  transition-duration: var(--dur-slide);
}
:where(.glaze, [data-system="glaze"]) .duration-\\(--dur-state\\) {
  --tw-duration: var(--dur-state);
  transition-duration: var(--dur-state);
}
:where(.glaze, [data-system="glaze"]) .ease-out {
  --tw-ease: var(--ease-out);
  transition-timing-function: var(--ease-out);
}
:where(.glaze, [data-system="glaze"]) .\\[contain\\:inline-size\\] {
  contain: inline-size;
}
:where(.glaze, [data-system="glaze"]) .glass-coral {
  --glass-base: var(--glass-coral-base);
  --glass-text: var(--glass-coral-text);
  --glass-ring: var(--glass-coral-ring);
}
:where(.glaze, [data-system="glaze"]) .glass-green {
  --glass-base: var(--glass-green-base);
  --glass-text: var(--glass-green-text);
  --glass-ring: var(--glass-green-ring);
}
:where(.glaze, [data-system="glaze"]) .glass-ink {
  --glass-base: var(--glass-ink-base);
  --glass-text: var(--glass-ink-text);
  --glass-ring: var(--glass-ink-ring);
}
:where(.glaze, [data-system="glaze"]) .focus-sm {
  --focus-width: var(--focus-width-sm);
  --focus-offset: var(--focus-offset-sm);
}
:where(.glaze, [data-system="glaze"]) .outline-none {
  --tw-outline-style: none;
  outline-style: none;
}
:where(.glaze, [data-system="glaze"]) .select-all {
  -webkit-user-select: all;
  user-select: all;
}
:where(.glaze, [data-system="glaze"]) .select-none {
  -webkit-user-select: none;
  user-select: none;
}
:where(.glaze, [data-system="glaze"]) .\\[--action-h\\:calc\\(var\\(--input-h\\)-2\\*var\\(--shell-inset\\)-2\\*var\\(--line-width\\)\\)\\] {
  --action-h: calc(var(--input-h) - 2 * var(--shell-inset) - 2 * var(--line-width));
}
:where(.glaze, [data-system="glaze"]) .\\[--attachment-media\\:var\\(--row\\)\\] {
  --attachment-media: var(--row);
}
:where(.glaze, [data-system="glaze"]) .\\[--attachment-media\\:var\\(--space-6\\)\\] {
  --attachment-media: var(--space-6);
}
:where(.glaze, [data-system="glaze"]) .\\[--avatar-cutout\\:var\\(--paper\\)\\] {
  --avatar-cutout: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .\\[--avatar-overlap\\:var\\(--space-0-5\\)\\] {
  --avatar-overlap: var(--space-0-5);
}
:where(.glaze, [data-system="glaze"]) .\\[--avatar-overlap\\:var\\(--space-1\\)\\] {
  --avatar-overlap: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .\\[--field-h\\:auto\\] {
  --field-h: auto;
}
:where(.glaze, [data-system="glaze"]) .\\[--field-h\\:max\\(var\\(--input-h\\)\\,calc\\(1lh\\+var\\(--space-2\\)\\)\\)\\] {
  --field-h: max(var(--input-h), calc(1lh + var(--space-2)));
}
:where(.glaze, [data-system="glaze"]) .\\[--input-h\\:var\\(--control\\)\\] {
  --input-h: var(--control);
}
:where(.glaze, [data-system="glaze"]) .\\[--input-h\\:var\\(--control-lg\\)\\] {
  --input-h: var(--control-lg);
}
:where(.glaze, [data-system="glaze"]) .\\[--input-h\\:var\\(--control-sm\\)\\] {
  --input-h: var(--control-sm);
}
:where(.glaze, [data-system="glaze"]) .\\[--menu-item-h\\:var\\(--menu-row\\)\\] {
  --menu-item-h: var(--menu-row);
}
:where(.glaze, [data-system="glaze"]) .\\[-webkit-tap-highlight-color\\:transparent\\] {
  -webkit-tap-highlight-color: transparent;
}
:where(.glaze, [data-system="glaze"]) .\\[contain-intrinsic-size\\:auto_160px\\] {
  contain-intrinsic-size: auto 160px;
}
:where(.glaze, [data-system="glaze"]) .\\[content-visibility\\:auto\\] {
  content-visibility: auto;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-area\\:c\\] {
  grid-area: c;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-area\\:stack\\] {
  grid-area: stack;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-template-areas\\:\\'c\\'\\] {
  grid-template-areas: 'c';
}
:where(.glaze, [data-system="glaze"]) .\\[grid-template-areas\\:\\'stack\\'\\] {
  grid-template-areas: 'stack';
}
:where(.glaze, [data-system="glaze"]) .\\[overflow-anchor\\:none\\] {
  overflow-anchor: none;
}
:where(.glaze, [data-system="glaze"]) .\\[unicode-bidi\\:plaintext\\] {
  unicode-bidi: plaintext;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:inline-flex > *) {
  display: inline-flex;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:h-5 > *) {
  height: calc(var(--space-1) * 5);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:flex-1 > *) {
  flex: 1;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:flex-none > *) {
  flex: none;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:snap-start > *) {
  scroll-snap-align: start;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:items-center > *) {
  align-items: center;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:gap-1 > *) {
  gap: var(--space-1);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:rounded-tag > *) {
  border-radius: var(--radius-tag);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:border > *) {
  border-style: var(--tw-border-style);
  border-width: 1px;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:border-line-control > *) {
  border-color: var(--line-control);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:px-1\\.5 > *) {
  padding-inline: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .not-first\\:border-t:not(:first-child) {
  border-top-style: var(--tw-border-style);
  border-top-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .not-first\\:border-line-faint:not(:first-child) {
  border-color: var(--line-faint);
}
:is(:where(.group\\/row):focus-within :is(:where(.glaze, [data-system="glaze"]) .group-focus-within\\/row\\:opacity-0)) {
  opacity: 0%;
}
:is(:where(.group\\/row):focus-within :is(:where(.glaze, [data-system="glaze"]) .group-focus-within\\/row\\:opacity-100)) {
  opacity: 100%;
}
@media (hover: hover) {
  :is(:where(.group\\/row):hover :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/row\\:opacity-0)) {
    opacity: 0%;
  }
}
:is(:where(.group\\/row)[data-force-hover] :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/row\\:opacity-0)) {
  opacity: 0%;
}
@media (hover: hover) {
  :is(:where(.group\\/row):hover :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/row\\:opacity-100)) {
    opacity: 100%;
  }
}
:is(:where(.group\\/row)[data-force-hover] :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/row\\:opacity-100)) {
  opacity: 100%;
}
@media (hover: hover) {
  :is(:where(.group\\/sort):hover :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/sort\\:opacity-100)) {
    opacity: 100%;
  }
}
:is(:where(.group\\/sort)[data-force-hover] :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/sort\\:opacity-100)) {
  opacity: 100%;
}
:is(:where(.group\\/sort):focus-visible :is(:where(.glaze, [data-system="glaze"]) .group-focus-visible\\/sort\\:opacity-100)) {
  opacity: 100%;
}
:is(:where(.group\\/sort)[data-force-focus-visible] :is(:where(.glaze, [data-system="glaze"]) .group-focus-visible\\/sort\\:opacity-100)) {
  opacity: 100%;
}
:is(:where(.group\\/native):has(:disabled) :is(:where(.glaze, [data-system="glaze"]) .group-has-disabled\\/native\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/item):has([data-slot="item-description"]) :is(:where(.glaze, [data-system="glaze"]) .group-has-data-\\[slot\\=item-description\\]\\/item\\:mt-0\\.5)) {
  margin-top: calc(var(--space-1) * 0.5);
}
:is(:where(.group\\/item):has([data-slot="item-description"]) :is(:where(.glaze, [data-system="glaze"]) .group-has-data-\\[slot\\=item-description\\]\\/item\\:self-start)) {
  align-self: flex-start;
}
:is(:where(.group\\/message):has(:is([data-slot=message-status]:is([data-state=live], [data-state=waiting]))) :is(:where(.glaze, [data-system="glaze"]) .group-has-\\[\\[data-slot\\=message-status\\]\\:is\\(\\[data-state\\=live\\]\\,\\[data-state\\=waiting\\]\\)\\]\\/message\\:hidden)) {
  display: none;
}
:is(:where(.group\\/attachment-drop)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/attachment-drop\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/field)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/field\\:cursor-not-allowed)) {
  cursor: not-allowed;
}
:is(:where(.group\\/field)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/field\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/input)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/input\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/item)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/item\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/prompt)[data-focused] :is(:where(.glaze, [data-system="glaze"]) .group-data-focused\\/prompt\\:border-line-focus)) {
  border-color: var(--line-focus);
}
:is(:where(.group\\/prompt)[data-force-focus] :is(:where(.glaze, [data-system="glaze"]) .group-data-force-focus\\/prompt\\:border-line-focus)) {
  border-color: var(--line-focus);
}
:is(:where(.group\\/actions)[data-open] :is(:where(.glaze, [data-system="glaze"]) .group-data-open\\/actions\\:opacity-0)) {
  opacity: 0%;
}
:is(:where(.group\\/actions)[data-open] :is(:where(.glaze, [data-system="glaze"]) .group-data-open\\/actions\\:opacity-100)) {
  opacity: 100%;
}
:is(:where(.group\\/row)[data-panel-open] :is(:where(.glaze, [data-system="glaze"]) .group-data-panel-open\\/row\\:rotate-90)) {
  rotate: 90deg;
}
:is(:where(.group\\/table)[data-sticky-header] :is(:where(.glaze, [data-system="glaze"]) .group-data-sticky-header\\/table\\:sticky)) {
  position: sticky;
}
:is(:where(.group\\/table)[data-sticky-header] :is(:where(.glaze, [data-system="glaze"]) .group-data-sticky-header\\/table\\:top-0)) {
  top: 0px;
}
:is(:where(.group\\/table)[data-sticky-header] :is(:where(.glaze, [data-system="glaze"]) .group-data-sticky-header\\/table\\:z-\\(--z-raised\\))) {
  z-index: var(--z-raised);
}
:is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=agent\\]\\/message\\:gap-2)) {
  gap: calc(var(--space-1) * 2);
}
:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:max-w-\\[85\\%\\])) {
  max-width: 85%;
}
:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:flex-none)) {
  flex: none;
}
:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:items-end)) {
  align-items: flex-end;
}
:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:gap-1)) {
  gap: var(--space-1);
}
:is(:where(.group\\/prompt)[data-mode="shell"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[mode\\=shell\\]\\/prompt\\:bg-field)) {
  background-color: var(--field);
}
:is(:where(.group\\/empty)[data-reason="empty"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=empty\\]\\/empty\\:block)) {
  display: block;
}
:is(:where(.group\\/empty)[data-reason="error"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=error\\]\\/empty\\:block)) {
  display: block;
}
:is(:where(.group\\/empty)[data-reason="error"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=error\\]\\/empty\\:text-fail-text)) {
  color: var(--fail-text);
}
:is(:where(.group\\/empty)[data-reason="no-access"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=no-access\\]\\/empty\\:block)) {
  display: block;
}
:is(:where(.group\\/empty)[data-reason="no-results"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=no-results\\]\\/empty\\:block)) {
  display: block;
}
:is(:where(.group\\/avatar)[data-size="lg"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=lg\\]\\/avatar\\:type-label)) {
  font: var(--type-label);
  letter-spacing: var(--tracking-label);
}
:is(:where(.group\\/attachment)[data-size="sm"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=sm\\]\\/attachment\\:hidden)) {
  display: none;
}
:is(:where(.group\\/attachment)[data-size="sm"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=sm\\]\\/attachment\\:type-label-sm)) {
  font: var(--type-label-sm);
  letter-spacing: var(--tracking-label);
}
:is(:where(.group\\/empty)[data-size="sm"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=sm\\]\\/empty\\:size-8)) {
  width: calc(var(--space-1) * 8);
  height: calc(var(--space-1) * 8);
}
:is(:where(.group\\/empty)[data-size="sm"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=sm\\]\\/empty\\:gap-2)) {
  gap: calc(var(--space-1) * 2);
}
:is(:where(.group\\/prompt)[data-state="disabled"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[state\\=disabled\\]\\/prompt\\:bg-field)) {
  background-color: var(--field);
}
:is(:where(.group\\/attachment)[data-state="error"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[state\\=error\\]\\/attachment\\:text-fail-text)) {
  color: var(--fail-text);
}
:is(:where(.group\\/attachment)[data-state="processing"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[state\\=processing\\]\\/attachment\\:opacity-60)) {
  opacity: 60%;
}
:is(:where(.group\\/attachment)[data-state="uploading"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[state\\=uploading\\]\\/attachment\\:opacity-60)) {
  opacity: 60%;
}
:is(:where(.group\\/avatar)[data-type="agent"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[type\\=agent\\]\\/avatar\\:text-text-2)) {
  color: var(--text-2);
}
:is(:where(.group\\/avatar)[data-type="source"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[type\\=source\\]\\/avatar\\:object-contain)) {
  object-fit: contain;
}
:is(:where(.group\\/avatar)[data-type="source"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[type\\=source\\]\\/avatar\\:text-text-2)) {
  color: var(--text-2);
}
:is(:where(.group\\/attachment-drop)[data-variant="zone"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[variant\\=zone\\]\\/attachment-drop\\:-mt-2)) {
  margin-top: calc(var(--space-1) * -2);
}
:is(:where(.peer):disabled ~ :is(:where(.glaze, [data-system="glaze"]) .peer-disabled\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .file\\:me-2::file-selector-button {
  margin-inline-end: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .file\\:cursor-pointer::file-selector-button {
  cursor: pointer;
}
:where(.glaze, [data-system="glaze"]) .file\\:rounded-pill::file-selector-button {
  border-radius: var(--radius-pill);
}
:where(.glaze, [data-system="glaze"]) .file\\:bg-field::file-selector-button {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .file\\:px-2::file-selector-button {
  padding-inline: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .file\\:type-label-sm::file-selector-button {
  font: var(--type-label-sm);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .file\\:text-text-1::file-selector-button {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .placeholder\\:text-text-3::placeholder {
  color: var(--text-3);
}
:where(.glaze, [data-system="glaze"]) .before\\:sr-only::before {
  content: var(--tw-content);
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
}
:where(.glaze, [data-system="glaze"]) .before\\:h-px::before {
  content: var(--tw-content);
  height: 1px;
}
:where(.glaze, [data-system="glaze"]) .before\\:min-w-4::before {
  content: var(--tw-content);
  min-width: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .before\\:flex-1::before {
  content: var(--tw-content);
  flex: 1;
}
:where(.glaze, [data-system="glaze"]) .before\\:bg-line::before {
  content: var(--tw-content);
  background-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .before\\:content-\\[\\'Highlighted\\:_\\'\\]::before {
  --tw-content: 'Highlighted: ';
  content: var(--tw-content);
}
:where(.glaze, [data-system="glaze"]) .before\\:content-\\[\\'hidden_secret\\'\\]::before {
  --tw-content: 'hidden secret';
  content: var(--tw-content);
}
:where(.glaze, [data-system="glaze"]) .after\\:pointer-events-none::after {
  content: var(--tw-content);
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .after\\:absolute::after {
  content: var(--tw-content);
  position: absolute;
}
:where(.glaze, [data-system="glaze"]) .after\\:-inset-1::after {
  content: var(--tw-content);
  inset: calc(var(--space-1) * -1);
}
:where(.glaze, [data-system="glaze"]) .after\\:inset-0::after {
  content: var(--tw-content);
  inset: 0px;
}
:where(.glaze, [data-system="glaze"]) .after\\:h-px::after {
  content: var(--tw-content);
  height: 1px;
}
:where(.glaze, [data-system="glaze"]) .after\\:min-w-4::after {
  content: var(--tw-content);
  min-width: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .after\\:flex-1::after {
  content: var(--tw-content);
  flex: 1;
}
:where(.glaze, [data-system="glaze"]) .after\\:rounded-\\[inherit\\]::after {
  content: var(--tw-content);
  border-radius: inherit;
}
:where(.glaze, [data-system="glaze"]) .after\\:rounded-shell::after {
  content: var(--tw-content);
  border-radius: var(--radius-shell);
}
:where(.glaze, [data-system="glaze"]) .after\\:border::after {
  content: var(--tw-content);
  border-style: var(--tw-border-style);
  border-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .after\\:border-line::after {
  content: var(--tw-content);
  border-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .after\\:bg-line::after {
  content: var(--tw-content);
  background-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .after\\:bg-line-faint::after {
  content: var(--tw-content);
  background-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .after\\:content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}
:where(.glaze, [data-system="glaze"]) .first\\:ps-0:first-child {
  padding-inline-start: 0px;
}
:where(.glaze, [data-system="glaze"]) .read-only\\:cursor-default:read-only {
  cursor: default;
}
:where(.glaze, [data-system="glaze"]) .empty\\:hidden:empty {
  display: none;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:bg-hover:hover {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:bg-hover[data-force-hover] {
  background-color: var(--hover);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:text-text-1:hover {
    color: var(--text-1);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:text-text-1[data-force-hover] {
  color: var(--text-1);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:underline:hover {
    text-decoration-line: underline;
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:underline[data-force-hover] {
  text-decoration-line: underline;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:decoration-1:hover {
    text-decoration-thickness: 1px;
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:decoration-1[data-force-hover] {
  text-decoration-thickness: 1px;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:decoration-2:hover {
    text-decoration-thickness: 2px;
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:decoration-2[data-force-hover] {
  text-decoration-thickness: 2px;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:underline-offset-2:hover {
    text-underline-offset: 2px;
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:underline-offset-2[data-force-hover] {
  text-underline-offset: 2px;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-disabled\\:bg-hover:hover:not(:disabled) {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-disabled\\:bg-hover[data-force-hover]:not(:disabled) {
  background-color: var(--hover);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-disabled\\:text-text-1:hover:not(:disabled) {
    color: var(--text-1);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-disabled\\:text-text-1[data-force-hover]:not(:disabled) {
  color: var(--text-1);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:border-line-focus:hover:not([data-disabled]) {
    border-color: var(--line-focus);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:border-line-focus[data-force-hover]:not([data-disabled]) {
  border-color: var(--line-focus);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:bg-\\(--flat-hover\\):hover:not([data-disabled]) {
    background-color: var(--flat-hover);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:bg-\\(--flat-hover\\)[data-force-hover]:not([data-disabled]) {
  background-color: var(--flat-hover);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:bg-hover:hover:not([data-disabled]) {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:bg-hover[data-force-hover]:not([data-disabled]) {
  background-color: var(--hover);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:text-text-1:hover:not([data-disabled]) {
    color: var(--text-1);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:text-text-1[data-force-hover]:not([data-disabled]) {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .focus\\:not-aria-invalid\\:border-line-focus:focus:not([aria-invalid="true"]) {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus\\:not-aria-invalid\\:border-line-focus[data-force-focus]:not([aria-invalid="true"]) {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:rounded-tag:focus-visible {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:rounded-tag[data-force-focus-visible] {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:border-line-focus:focus-visible {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:border-line-focus[data-force-focus-visible] {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:focus-ring-inset:focus-visible {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: calc(var(--focus-width) * -1);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:focus-ring-inset[data-force-focus-visible] {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: calc(var(--focus-width) * -1);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:outline-offset-0:focus-visible {
  outline-offset: 0px;
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:outline-offset-0[data-force-focus-visible] {
  outline-offset: 0px;
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:not-aria-invalid\\:border-line-focus:focus-visible:not([aria-invalid="true"]) {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:not-aria-invalid\\:border-line-focus[data-force-focus-visible]:not([aria-invalid="true"]) {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .active\\:bg-pressed:active {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:bg-pressed[data-force-active] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:duration-\\(--dur-press\\):active {
  --tw-duration: var(--dur-press);
  transition-duration: var(--dur-press);
}
:where(.glaze, [data-system="glaze"]) .active\\:duration-\\(--dur-press\\)[data-force-active] {
  --tw-duration: var(--dur-press);
  transition-duration: var(--dur-press);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-disabled\\:bg-pressed:active:not(:disabled) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-disabled\\:bg-pressed[data-force-active]:not(:disabled) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:scale-\\(--scale-press\\):active:not([data-disabled]) {
  scale: var(--scale-press);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:scale-\\(--scale-press\\)[data-force-active]:not([data-disabled]) {
  scale: var(--scale-press);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:bg-hover:active:not([data-disabled]) {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:bg-hover[data-force-active]:not([data-disabled]) {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:bg-pressed:active:not([data-disabled]) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:bg-pressed[data-force-active]:not([data-disabled]) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}
:where(.glaze, [data-system="glaze"]) .disabled\\:border-line-faint:disabled {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .disabled\\:bg-field:disabled {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .disabled\\:text-text-disabled:disabled {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .disabled\\:placeholder\\:text-text-disabled:disabled::placeholder {
  color: var(--text-disabled);
}
:where([data-size="sm"]) :is(:where(.glaze, [data-system="glaze"]) .in-data-\\[size\\=sm\\]\\:type-label-sm) {
  font: var(--type-label-sm);
  letter-spacing: var(--tracking-label);
}
:where([data-slot="item-group"]) :is(:where(.glaze, [data-system="glaze"]) .in-data-\\[slot\\=item-group\\]\\:rule-row) {
  border-block-end: var(--line-width) solid var(--line-faint);
  &:last-child {
    border-block-end-width: 0;
  }
}
:where(.glaze, [data-system="glaze"]) .has-aria-expanded\\:bg-hover-row:has([aria-expanded="true"]) {
  background-color: var(--hover-row);
}
:where(.glaze, [data-system="glaze"]) .has-data-\\[slot\\=item-description\\]\\:py-2:has([data-slot="item-description"]) {
  padding-block: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .has-data-\\[slot\\=tooltip-shortcut\\]\\:pe-1:has([data-slot="tooltip-shortcut"]) {
  padding-inline-end: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .has-data-\\[type\\=agent\\]\\:rounded-tag:has([data-type="agent"]) {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .has-data-\\[type\\=source\\]\\:rounded-tag:has([data-type="source"]) {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\[data-slot\\=card-link\\]\\:focus-visible\\]\\:focus-ring:has(:is([data-slot=card-link]:focus-visible)) {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: var(--focus-offset);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\[data-slot\\=item-link\\]\\:active\\]\\:bg-pressed:has(:is([data-slot=item-link]:active)) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\[data-slot\\=item-link\\]\\:focus-visible\\]\\:focus-ring-row:has(:is([data-slot=item-link]:focus-visible)) {
  outline: var(--focus-width-sm) solid var(--focus);
  outline-offset: calc((var(--focus-width-sm) + var(--focus-offset-sm)) * -1);
  border-radius: var(--radius-row-focus);
  &:is(tr) {
    outline: none;
  }
  &:is(tr) > * {
    box-shadow: inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
  }
  &:is(tr) > :first-child {
    box-shadow: inset var(--focus-width-sm) 0 var(--focus), inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
    border-start-start-radius: var(--radius-row-focus);
    border-end-start-radius: var(--radius-row-focus);
  }
  &:is(tr) > :last-child {
    box-shadow: inset calc(var(--focus-width-sm) * -1) 0 var(--focus), inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
    border-start-end-radius: var(--radius-row-focus);
    border-end-end-radius: var(--radius-row-focus);
  }
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\[data-slot\\=item-link\\]\\:hover\\]\\:not-data-selected\\:bg-hover-row:has(:is([data-slot=item-link]:hover)):not([data-selected]) {
  background-color: var(--hover-row);
}
:where(.glaze, [data-system="glaze"]) .has-\\[input\\:focus-visible\\]\\:text-text-2:has(:is(input:focus-visible)) {
  color: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=attachment-actions\\]\\]\\:pe-1:has( > [data-slot=attachment-actions]) {
  padding-inline-end: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=checkbox-group\\]\\]\\:gap-3:has( > [data-slot=checkbox-group]) {
  gap: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:items-start:has( > [data-slot=field-content]) {
  align-items: flex-start;
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=field-set\\]\\]\\:gap-6:has( > [data-slot=field-set]) {
  gap: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input-action\\]\\:first-child\\]\\:-ms-\\[calc\\(var\\(--space-3\\)-var\\(--shell-inset\\)\\)\\]:has( > [data-slot=input-action]:first-child) {
  margin-inline-start: calc(calc(var(--space-3) - var(--shell-inset)) * -1);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input-action\\]\\:last-child\\]\\:-me-\\[calc\\(var\\(--space-3\\)-var\\(--shell-inset\\)\\)\\]:has( > [data-slot=input-action]:last-child) {
  margin-inline-end: calc(calc(var(--space-3) - var(--shell-inset)) * -1);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input\\]\\]\\:gap-4:has( > [data-slot=input]) {
  gap: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=radio-group\\]\\]\\:gap-3:has( > [data-slot=radio-group]) {
  gap: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:items-start:has( > [data-slot=textarea]) {
  align-items: flex-start;
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:gap-4:has( > [data-slot=textarea]) {
  gap: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .aria-busy\\:cursor-progress[aria-busy="true"] {
  cursor: progress;
}
:where(.glaze, [data-system="glaze"]) .aria-disabled\\:text-text-disabled[aria-disabled="true"] {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .aria-invalid\\:border-fail[aria-invalid="true"] {
  border-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .aria-pressed\\:text-text-1[aria-pressed="true"] {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .data-all\\:max-h-96[data-all] {
  max-height: calc(var(--space-1) * 96);
}
:where(.glaze, [data-system="glaze"]) .data-all\\:overflow-y-auto[data-all] {
  overflow-y: auto;
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:cursor-not-allowed[data-disabled] {
  cursor: not-allowed;
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:border-line-faint[data-disabled] {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:bg-field[data-disabled] {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:text-text-disabled[data-disabled] {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:not-aria-busy\\:text-text-disabled[data-disabled]:not([aria-busy="true"]) {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .data-ending-style\\:opacity-0[data-ending-style] {
  opacity: 0%;
}
:where(.glaze, [data-system="glaze"]) .data-ending-style\\:duration-\\(--dur-state\\)[data-ending-style] {
  --tw-duration: var(--dur-state);
  transition-duration: var(--dur-state);
}
:where(.glaze, [data-system="glaze"]) .data-highlighted\\:bg-hover[data-highlighted] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .data-inset\\:ps-7[data-inset] {
  padding-inline-start: calc(var(--space-1) * 7);
}
:where(.glaze, [data-system="glaze"]) .data-instant\\:duration-0[data-instant] {
  --tw-duration: 0ms;
  transition-duration: 0ms;
}
:where(.glaze, [data-system="glaze"]) .data-instant\\:data-ending-style\\:duration-0[data-instant][data-ending-style] {
  --tw-duration: 0ms;
  transition-duration: 0ms;
}
:where(.glaze, [data-system="glaze"]) .data-invalid\\:border-fail[data-invalid] {
  border-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .data-last\\:w-\\(--last\\)[data-last] {
  width: var(--last);
}
:where(.glaze, [data-system="glaze"]) .data-missing\\:border-line-faint[data-missing] {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .data-missing\\:text-text-2[data-missing] {
  color: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .data-missing\\:line-through[data-missing] {
  text-decoration-line: line-through;
}
:where(.glaze, [data-system="glaze"]) .data-missing\\:decoration-1[data-missing] {
  text-decoration-thickness: 1px;
}
:where(.glaze, [data-system="glaze"]) .data-open\\:bg-pressed[data-open] {
  background-color: var(--pressed);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .data-open\\:hover\\:bg-pressed[data-open]:hover {
    background-color: var(--pressed);
  }
}
:where(.glaze, [data-system="glaze"]) .data-open\\:hover\\:bg-pressed[data-open][data-force-hover] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .data-placeholder\\:text-text-3[data-placeholder] {
  color: var(--text-3);
}
:where(.glaze, [data-system="glaze"]) .data-popup-open\\:border-line-focus[data-popup-open] {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .data-popup-open\\:bg-hover[data-popup-open] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .data-popup-open\\:bg-pressed[data-popup-open] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .data-pressed\\:border-line-focus[data-pressed] {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .data-pressed\\:bg-pressed[data-pressed] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .data-readonly\\:cursor-default[data-readonly] {
  cursor: default;
}
:where(.glaze, [data-system="glaze"]) .data-readonly\\:not-focus-within\\:border-line-faint[data-readonly]:not(:focus-within) {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .data-selected\\:bg-pressed[data-selected] {
  background-color: var(--pressed);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .data-selected\\:hover\\:bg-pressed[data-selected]:hover {
    background-color: var(--pressed);
  }
}
:where(.glaze, [data-system="glaze"]) .data-selected\\:hover\\:bg-pressed[data-selected][data-force-hover] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .data-sorted\\:text-text-1[data-sorted] {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .data-stale\\:opacity-\\(--stale\\)[data-stale] {
  opacity: var(--stale);
}
:where(.glaze, [data-system="glaze"]) .data-starting-style\\:opacity-0[data-starting-style] {
  opacity: 0%;
}
:where(.glaze, [data-system="glaze"]) .data-\\[active\\=false\\]\\:pointer-events-none[data-active="false"] {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .data-\\[active\\=false\\]\\:opacity-0[data-active="false"] {
  opacity: 0%;
}
:where(.glaze, [data-system="glaze"]) .data-\\[size\\=sm\\]\\:\\[--menu-item-h\\:var\\(--menu-row-sm\\)\\][data-size="sm"] {
  --menu-item-h: var(--menu-row-sm);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=field-label\\]\\:flex-auto > *)[data-slot="field-label"] {
  flex: auto;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=field-label\\]\\:shrink-0 > *)[data-slot="field-label"] {
  flex-shrink: 0;
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:w-\\(--label-col\\):has( > [data-slot=input]) > *)[data-slot="field-label"] {
  width: var(--label-col);
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:flex-none:has( > [data-slot=input]) > *)[data-slot="field-label"] {
  flex: none;
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:w-\\(--label-col\\):has( > [data-slot=textarea]) > *)[data-slot="field-label"] {
  width: var(--label-col);
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:flex-none:has( > [data-slot=textarea]) > *)[data-slot="field-label"] {
  flex: none;
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:pt-1\\.5:has( > [data-slot=textarea]) > *)[data-slot="field-label"] {
  padding-top: calc(var(--space-1) * 1.5);
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input\\]\\]\\:\\*\\:data-\\[slot\\=input\\]\\:flex-1:has( > [data-slot=input]) > *)[data-slot="input"] {
  flex: 1;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:border-fail > *)[data-slot="message-bubble-content"] {
  border-color: var(--fail);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:border-line-control > *)[data-slot="message-bubble-content"] {
  border-color: var(--line-control);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:border-line-faint > *)[data-slot="message-bubble-content"] {
  border-color: var(--line-faint);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:bg-paper > *)[data-slot="message-bubble-content"] {
  background-color: var(--paper);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:bg-shell > *)[data-slot="message-bubble-content"] {
  background-color: var(--shell);
}
:is(:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:\\*\\:data-\\[slot\\=message-header\\]\\:sr-only)) > *)[data-slot="message-header"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-meta\\]\\:ms-auto > *)[data-slot="message-meta"] {
  margin-inline-start: auto;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-model\\]\\:ms-auto > *)[data-slot="message-model"] {
  margin-inline-start: auto;
}
:where(.glaze, [data-system="glaze"]) .data-\\[state\\=error\\]\\:border-fail[data-state="error"] {
  border-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .data-\\[status\\=fail\\]\\:border-fail[data-status="fail"] {
  border-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .data-\\[status\\=fail\\]\\:bg-fail-tint[data-status="fail"] {
  background-color: var(--fail-tint);
}
:where(.glaze, [data-system="glaze"]) .data-\\[status\\=fail\\]\\:text-fail-text[data-status="fail"] {
  color: var(--fail-text);
}
:where(.glaze, [data-system="glaze"]) .data-\\[status\\=ok\\]\\:text-ok-text[data-status="ok"] {
  color: var(--ok-text);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=destructive\\]\\:text-fail-text[data-variant="destructive"] {
  color: var(--fail-text);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=destructive\\]\\:data-highlighted\\:bg-fail-tint[data-variant="destructive"][data-highlighted] {
  background-color: var(--fail-tint);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=label\\]\\:type-label[data-variant="label"] {
  font: var(--type-label);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=legend\\]\\:type-heading-sm[data-variant="legend"] {
  font: var(--type-heading-sm);
  letter-spacing: var(--tracking-heading);
}
@media (prefers-reduced-motion: reduce) {
  :where(.glaze, [data-system="glaze"]) .motion-reduce\\:h-\\(--rest\\) {
    height: var(--rest);
  }
}
:where(.glaze, [data-system="glaze"]) .motion-reduce\\:h-\\(--rest\\):where([data-force-reduced-motion], [data-force-reduced-motion] *) {
  height: var(--rest);
}
@media (prefers-reduced-motion: reduce) {
  :where(.glaze, [data-system="glaze"]) .motion-reduce\\:animate-none {
    animation: none;
  }
}
:where(.glaze, [data-system="glaze"]) .motion-reduce\\:animate-none:where([data-force-reduced-motion], [data-force-reduced-motion] *) {
  animation: none;
}
@media (prefers-reduced-motion: reduce) {
  :where(.glaze, [data-system="glaze"]) .motion-reduce\\:transition-none {
    transition-property: none;
  }
}
:where(.glaze, [data-system="glaze"]) .motion-reduce\\:transition-none:where([data-force-reduced-motion], [data-force-reduced-motion] *) {
  transition-property: none;
}
@media (width < 640px) {
  :where(.glaze, [data-system="glaze"]) .max-sm\\:overflow-visible {
    overflow: visible;
  }
  :where(.glaze, [data-system="glaze"]) .max-sm\\:\\[overflow-wrap\\:anywhere\\] {
    overflow-wrap: anywhere;
  }
  :where(.glaze, [data-system="glaze"]) .max-sm\\:whitespace-normal {
    white-space: normal;
  }
}
@media (width >= 640px) {
  :where(.glaze, [data-system="glaze"]) .sm\\:block {
    display: block;
  }
}
@container item (width < 28rem) {
  :where(.glaze, [data-system="glaze"]) .\\@max-md\\/item\\:hidden {
    display: none;
  }
}
@container queue-row (width >= 20rem) {
  :where(.glaze, [data-system="glaze"]) .\\@xs\\/queue-row\\:not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip-path: none;
    white-space: normal;
  }
  :where(.glaze, [data-system="glaze"]) .\\@xs\\/queue-row\\:w-18 {
    width: calc(var(--space-1) * 18);
  }
  :where(.glaze, [data-system="glaze"]) .\\@xs\\/queue-row\\:ps-20\\.5 {
    padding-inline-start: calc(var(--space-1) * 20.5);
  }
}
@container prompt-toolbar (width >= 24rem) {
  :where(.glaze, [data-system="glaze"]) .\\@sm\\/prompt-toolbar\\:order-none {
    order: 0;
  }
  :where(.glaze, [data-system="glaze"]) .\\@sm\\/prompt-toolbar\\:shrink {
    flex-shrink: 1;
  }
  :where(.glaze, [data-system="glaze"]) .\\@sm\\/prompt-toolbar\\:basis-auto {
    flex-basis: auto;
  }
}
@container field-group (width >= 28rem) {
  :where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:flex-row {
    flex-direction: row;
  }
  :where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:items-center {
    align-items: center;
  }
  :where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:gap-6 {
    gap: calc(var(--space-1) * 6);
  }
  :is(:where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:\\*\\:data-\\[slot\\=field-content\\]\\:flex-auto > *)[data-slot="field-content"] {
    flex: auto;
  }
  :is(:where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:\\*\\:data-\\[slot\\=field-label\\]\\:w-40 > *)[data-slot="field-label"] {
    width: calc(var(--space-1) * 40);
  }
  :is(:where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:\\*\\:data-\\[slot\\=field-label\\]\\:shrink-0 > *)[data-slot="field-label"] {
    flex-shrink: 0;
  }
}
:where(.glaze, [data-system="glaze"]) .rtl\\:translate-x-1\\/2:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
  --tw-translate-x: calc(1 / 2 * 100%);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .rtl\\:-scale-x-100:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
  --tw-scale-x: calc(100% * -1);
  scale: var(--tw-scale-x) var(--tw-scale-y);
}
:is(:where(.group\\/row)[data-panel-open] :is(:where(.glaze, [data-system="glaze"]) .rtl\\:group-data-panel-open\\/row\\:-rotate-90:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *))) {
  rotate: calc(90deg * -1);
}
@starting-style {
  :where(.glaze, [data-system="glaze"]) .starting\\:opacity-0 {
    opacity: 0%;
  }
}
@media (forced-colors: active) {
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border-dashed {
    --tw-border-style: dashed;
    border-style: dashed;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border-solid {
    --tw-border-style: solid;
    border-style: solid;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border-\\[ButtonText\\] {
    border-color: ButtonText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border-\\[CanvasText\\] {
    border-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:bg-\\[CanvasText\\] {
    background-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:bg-\\[Canvas\\] {
    background-color: Canvas;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:bg-\\[GrayText\\] {
    background-color: GrayText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:bg-\\[Highlight\\] {
    background-color: Highlight;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:fill-\\[CanvasText\\] {
    fill: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:stroke-\\[CanvasText\\] {
    stroke: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:stroke-\\[GrayText\\] {
    stroke: GrayText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:text-\\[HighlightText\\] {
    color: HighlightText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:outline-1 {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:-outline-offset-1 {
    outline-offset: calc(1px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:outline-\\[CanvasText\\] {
    outline-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:\\[forced-color-adjust\\:none\\] {
    forced-color-adjust: none;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:outline-solid {
    --tw-outline-style: solid;
    outline-style: solid;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:before\\:bg-\\[CanvasText\\]::before {
    content: var(--tw-content);
    background-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:after\\:bg-\\[CanvasText\\]::after {
    content: var(--tw-content);
    background-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-disabled\\:text-\\[GrayText\\][data-disabled] {
    color: GrayText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-highlighted\\:outline-2[data-highlighted] {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-highlighted\\:-outline-offset-2[data-highlighted] {
    outline-offset: calc(2px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-highlighted\\:outline-solid[data-highlighted] {
    --tw-outline-style: solid;
    outline-style: solid;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-open\\:outline-2[data-open] {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-open\\:-outline-offset-2[data-open] {
    outline-offset: calc(2px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-open\\:outline-\\[Highlight\\][data-open] {
    outline-color: Highlight;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-popup-open\\:outline-1[data-popup-open] {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-popup-open\\:-outline-offset-1[data-popup-open] {
    outline-offset: calc(1px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-popup-open\\:outline-solid[data-popup-open] {
    --tw-outline-style: solid;
    outline-style: solid;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-pressed\\:border-2[data-pressed] {
    border-style: var(--tw-border-style);
    border-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:outline[data-selected] {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:outline-1[data-selected] {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:outline-2[data-selected] {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:-outline-offset-1[data-selected] {
    outline-offset: calc(1px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:-outline-offset-2[data-selected] {
    outline-offset: calc(2px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:outline-\\[Highlight\\][data-selected] {
    outline-color: Highlight;
  }
}
@media (pointer: coarse) {
  :where(.glaze, [data-system="glaze"]) .pointer-coarse\\:hidden {
    display: none;
  }
  :where(.glaze, [data-system="glaze"]) .pointer-coarse\\:min-h-11 {
    min-height: calc(var(--space-1) * 11);
  }
  :where(.glaze, [data-system="glaze"]) .pointer-coarse\\:opacity-0 {
    opacity: 0%;
  }
  :where(.glaze, [data-system="glaze"]) .pointer-coarse\\:opacity-100 {
    opacity: 100%;
  }
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_\\[data-mention-type\\=paste\\]\\]\\:cursor-pointer [data-mention-type=paste] {
  cursor: pointer;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_\\[data-menu-target-open\\]\\]\\:bg-pressed [data-menu-target-open] {
  background-color: var(--pressed);
}
@media (forced-colors: active) {
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:\\[\\&_\\[data-menu-target-open\\]\\]\\:outline-2 [data-menu-target-open] {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:\\[\\&_\\[data-menu-target-open\\]\\]\\:-outline-offset-2 [data-menu-target-open] {
    outline-offset: calc(2px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:\\[\\&_\\[data-menu-target-open\\]\\]\\:outline-solid [data-menu-target-open] {
    --tw-outline-style: solid;
    outline-style: solid;
  }
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_\\[data-slot\\=mention\\]\\]\\:mx-px [data-slot=mention] {
  margin-inline: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:text-text-1 a {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:underline a {
  text-decoration-line: underline;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:decoration-1 a {
  text-decoration-thickness: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:underline-offset-2 a {
  text-underline-offset: 2px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:underline-offset-4 a {
  text-underline-offset: 4px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_img\\]\\:size-full img {
  width: 100%;
  height: 100%;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_img\\]\\:object-cover img {
  object-fit: cover;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:pointer-events-none svg {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:size-\\(--icon\\) svg {
  width: var(--icon);
  height: var(--icon);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:size-\\(--icon-lg\\) svg {
  width: var(--icon-lg);
  height: var(--icon-lg);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:size-\\(--icon-sm\\) svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:shrink-0 svg {
  flex-shrink: 0;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:text-current svg {
  color: currentcolor;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:text-text-1 svg {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:text-text-1\\! svg {
  color: var(--text-1) !important;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:text-text-3 svg {
  color: var(--text-3);
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:\\[\\&_svg\\]\\:text-text-disabled[data-disabled] svg {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .data-pressed\\:\\[\\&_svg\\]\\:text-text-1[data-pressed] svg {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=destructive\\]\\:\\[\\&_svg\\]\\:text-fail-text[data-variant="destructive"] svg {
  color: var(--fail-text);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\+\\[data-slot\\=card-content\\]\\:not\\(\\[data-flush\\]\\)\\]\\:pt-0 + [data-slot=card-content]:not([data-flush]) {
  padding-top: 0px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:\\:-webkit-search-cancel-button\\]\\:appearance-none::-webkit-search-cancel-button {
  appearance: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:w-10:has([role=checkbox]) {
  width: calc(var(--space-1) * 10);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .\\[a\\]\\:hover\\:bg-hover:is(a):hover {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .\\[a\\]\\:hover\\:bg-hover:is(a)[data-force-hover] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .\\[a\\,button\\]\\:cursor-pointer:is(a, button) {
  cursor: pointer;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .\\[button\\]\\:hover\\:bg-hover:is(button):hover {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .\\[button\\]\\:hover\\:bg-hover:is(button)[data-force-hover] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:text-start:is(button, a) {
  text-align: start;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:transition-colors:is(button, a) {
  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:duration-\\(--dur-state\\):is(button, a) {
  --tw-duration: var(--dur-state);
  transition-duration: var(--dur-state);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:hover\\:bg-hover:is(button, a):hover {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:hover\\:bg-hover:is(button, a)[data-force-hover] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\*\\+\\*\\]\\:-ms-\\(--avatar-overlap\\) > * + * {
  margin-inline-start: calc(var(--avatar-overlap) * -1);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\*\\:first-child\\]\\:min-w-0 > :first-child {
  min-width: 0px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\*\\:first-child\\]\\:truncate > :first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:\\[--avatar-covered\\:calc\\(var\\(--avatar-overlap\\)\\+var\\(--space-0-5\\)\\)\\] > :not(:last-child) {
  --avatar-covered: calc(var(--avatar-overlap) + var(--space-0-5));
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\:disabled\\]\\:pointer-events-none > :disabled {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\:first-child\\]\\:me-auto > :first-child {
  margin-inline-end: auto;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-disabled\\]\\]\\:pointer-events-none > [data-disabled] {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:transition-opacity > [data-slot$=button] {
  transition-property: opacity;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:duration-\\(--dur-state\\) > [data-slot$=button] {
  --tw-duration: var(--dur-state);
  transition-duration: var(--dur-state);
}
@media (pointer: fine) {
  :is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .pointer-fine\\:group-data-\\[from\\=agent\\]\\/message\\:\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:opacity-0)) > [data-slot$=button] {
    opacity: 0%;
  }
  @media (hover: hover) {
    :is(:where(.group\\/message):hover :is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .pointer-fine\\:group-data-\\[from\\=agent\\]\\/message\\:group-hover\\/message\\:\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:opacity-100))) > [data-slot$=button] {
      opacity: 100%;
    }
  }
  :is(:where(.group\\/message)[data-force-hover] :is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .pointer-fine\\:group-data-\\[from\\=agent\\]\\/message\\:group-hover\\/message\\:\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:opacity-100))) > [data-slot$=button] {
    opacity: 100%;
  }
  :is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .pointer-fine\\:group-data-\\[from\\=agent\\]\\/message\\:has-\\[\\:focus-visible\\,\\[data-force-focus-visible\\]\\]\\:\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:opacity-100)):has(:is(:focus-visible, [data-force-focus-visible])) > [data-slot$=button] {
    opacity: 100%;
  }
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\=card-meta\\]\\:first-child\\]\\:me-auto > [data-slot=card-meta]:first-child {
  margin-inline-end: auto;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\=card-meta\\]\\:last-child\\]\\:pe-3 > [data-slot=card-meta]:last-child {
  padding-inline-end: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\=message-model\\]\\+\\[data-slot\\=message-meta\\]\\]\\:ms-3 > [data-slot=message-model] + [data-slot=message-meta] {
  margin-inline-start: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\=panel\\]\\~\\[data-slot\\=panel\\]\\]\\:mt-\\(--shell-inset\\) > [data-slot=panel] ~ [data-slot=panel] {
  margin-top: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>option\\]\\:bg-paper > option {
  background-color: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>option\\]\\:text-text-1 > option {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>svg\\]\\:pointer-events-none > svg {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>svg\\]\\:size-\\(--icon-sm\\) > svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>svg\\]\\:shrink-0 > svg {
  flex-shrink: 0;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>\\*\\]\\:border-b > tr:not(:last-child) > * {
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>\\*\\]\\:border-line-faint > tr:not(:last-child) > * {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>td\\]\\:border-b > tr:not(:last-child) > td {
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>td\\]\\:border-line-faint > tr:not(:last-child) > td {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>th\\]\\:border-b > tr:not(:last-child) > th {
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>th\\]\\:border-line-faint > tr:not(:last-child) > th {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\>td\\]\\:border-t > tr > td {
  border-top-style: var(--tw-border-style);
  border-top-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\>td\\]\\:border-line-faint > tr > td {
  border-color: var(--line-faint);
}
[data-slot=message-status] ~ :is(:where(.glaze, [data-system="glaze"]) .\\[\\[data-slot\\=message-status\\]\\~\\&\\]\\:ms-0) {
  margin-inline-start: 0px;
}
@media (hover: hover) {
  tbody > :is(:where(.glaze, [data-system="glaze"]) .\\[tbody\\>\\&\\]\\:hover\\:bg-hover-row):hover {
    background-color: var(--hover-row);
  }
}
tbody > :is(:where(.glaze, [data-system="glaze"]) .\\[tbody\\>\\&\\]\\:hover\\:bg-hover-row)[data-force-hover] {
  background-color: var(--hover-row);
}
.glaze [data-force-reduced-motion], [data-system="glaze"] [data-force-reduced-motion] {
  --dur-press: 0ms;
  --dur-state: 0ms;
  --dur-overlay: 0ms;
  --scale-press: 1;
  --scale-press-flat: 1;
  --scale-press-glass: 1;
  --dur-glass-press: 0ms;
  --dur-glass-release: 0ms;
  --dur-slide: 0ms;
}
.glaze :where([data-control]):is(:focus-visible, [data-force-focus-visible]) {
  outline: none;
}
@keyframes glaze-spin {
  to {
    transform: rotate(1turn);
  }
}
@keyframes glaze-sweep {
  from {
    inset-inline-start: calc(var(--progress-sweep) * -1);
  }
  to {
    inset-inline-start: 100%;
  }
}
@property --tw-border-spacing-x {
  syntax: "<length>";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-spacing-y {
  syntax: "<length>";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-scroll-snap-strictness {
  syntax: "*";
  inherits: false;
  initial-value: proximity;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-ordinal {
  syntax: "*";
  inherits: false;
}
@property --tw-slashed-zero {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-figure {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-spacing {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-fraction {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-content {
  syntax: "*";
  initial-value: "";
  inherits: false;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: block))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    .glaze *, .glaze ::before, .glaze ::after, .glaze ::backdrop {
      --tw-border-spacing-x: 0;
      --tw-border-spacing-y: 0;
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-scroll-snap-strictness: proximity;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-duration: initial;
      --tw-ease: initial;
      --tw-content: "";
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
    }
  }
}
`;import{createContext as ak,createElement as Kg,Fragment as rk,useContext as Q2,useLayoutEffect as uF,useMemo as nk,useRef as X2,useState as sk}from"react";import*as tk from"react";var ok=Symbol.for("react.portal");function lr(e,t,o=null){return{$$typeof:ok,key:o==null?null:""+o,children:e,containerInfo:t,implementation:null}}function Ta(e){return e?e():void 0}var Yg=ak(void 0),ik=()=>()=>{};function lk(e){let t=[],o=e;for(;o&&o!==o.ownerDocument.body;){let a=o.parentElement;if(!a)break;for(let r of Array.from(a.children))r===o||!(r instanceof HTMLElement)||r.inert||r.tagName==="SCRIPT"||(r.inert=!0,t.push(r));o=a}return()=>{for(let a of t)a.inert=!1}}function Xg({children:e,dir:t}){let o=Q2(Yg),[a,r]=sk(null),n=X2(0),s=X2(null),i=o?t?"dir":"stage":"root",l=nk(()=>i==="dir"?{container:a,lock:o.lock}:i==="stage"?{container:a,lock:ik}:{container:a,lock:()=>{n.current+=1,n.current===1&&a&&(s.current=lk(a));let u=!1;return()=>{u||(u=!0,n.current-=1,n.current===0&&(s.current?.(),s.current=null))}}},[i,a,o]);if(!o&&t)return Kg(rk,null,e);let c=Kg("div",{ref:r,"data-glaze-portal":i,dir:i==="dir"?t:void 0});return Kg(Yg.Provider,{value:l},e,i==="dir"?o.container?lr(c,o.container):null:c)}function Tr(){return Q2(Yg)?.container}function rl(e,t){if(e&&!t)return e;if(!e&&t)return t;if(e||t)return{...e,...t}}var J2={};function nt(e,t,o,a,r){if(!o&&!a&&!r&&!e)return ru(t);let n=ru(e);return t&&(n=nl(n,t)),o&&(n=nl(n,o)),a&&(n=nl(n,a)),r&&(n=nl(n,r)),n}function ey(e){if(e.length===0)return J2;if(e.length===1)return ru(e[0]);let t=ru(e[0]);for(let o=1;o<e.length;o+=1)t=nl(t,e[o]);return t}function ru(e){return oy(e)?{...e(J2)}:ck(e)}function nl(e,t){return oy(t)?t(e):uk(e,t)}function ck(e){let t={...e};for(let o in t){let a=t[o];ty(o,a)&&(t[o]=ay(a))}return t}function uk(e,t){if(!t)return e;for(let o in t){let a=t[o];switch(o){case"style":{e[o]=rl(e.style,a);break}case"className":{e[o]=Qg(e.className,a);break}default:ty(o,a)?e[o]=dk(e[o],a):e[o]=a}}return e}function ty(e,t){let o=e.charCodeAt(0),a=e.charCodeAt(1),r=e.charCodeAt(2);return o===111&&a===110&&r>=65&&r<=90&&(typeof t=="function"||typeof t>"u")}function oy(e){return typeof e=="function"}function dk(e,t){return t?e?(...o)=>{let a=o[0];if(ry(a)){let n=a;sl(n);let s=t(...o);return n.baseUIHandlerPrevented||e?.(...o),s}let r=t(...o);return e?.(...o),r}:ay(t):e}function ay(e){return e&&((...t)=>{let o=t[0];return ry(o)&&sl(o),e(...t)})}function sl(e){return e.preventBaseUIHandler=()=>{e.baseUIHandlerPrevented=!0},e}function Qg(e,t){return t?e?t+" "+e:t:e}function ry(e){return e!=null&&typeof e=="object"&&"nativeEvent"in e}import*as wn from"react";import*as sy from"react";var ny={};function $e(e,t){let o=sy.useRef(ny);return o.current===ny&&(o.current=e(t)),o}function Ht(e,t,o,a){let r=$e(ly).current;return pk(r,e,t,o,a)&&cy(r,[e,t,o,a]),r.callback}function iy(e){let t=$e(ly).current;return mk(t,e)&&cy(t,e),t.callback}function ly(){return{callback:null,cleanup:null,refs:[]}}function pk(e,t,o,a,r){return e.refs[0]!==t||e.refs[1]!==o||e.refs[2]!==a||e.refs[3]!==r}function mk(e,t){return e.refs.length!==t.length||e.refs.some((o,a)=>o!==t[a])}function cy(e,t){if(e.refs=t,t.every(o=>o==null)){e.callback=null;return}e.callback=o=>{if(e.cleanup&&(e.cleanup(),e.cleanup=null),o!=null){let a=Array(t.length).fill(null);for(let r=0;r<t.length;r+=1){let n=t[r];if(n!=null)switch(typeof n){case"function":{let s=n(o);typeof s=="function"&&(a[r]=s);break}case"object":{n.current=o;break}default:}}e.cleanup=()=>{for(let r=0;r<t.length;r+=1){let n=t[r];if(n!=null)switch(typeof n){case"function":{let s=a[r];typeof s=="function"?s():n(null);break}case"object":{n.current=null;break}default:}}}}}}import*as dy from"react";import*as uy from"react";var fk=parseInt(uy.version,10);function qs(e){return fk>=e}function Jg(e){if(!dy.isValidElement(e))return null;let t=e,o=t.props;return(qs(19)?o?.ref:t.ref)??null}function Be(){}var Nt=Object.freeze([]),Le=Object.freeze({});function py(e,t){let o={};for(let a in e){let r=e[a];if(t?.hasOwnProperty(a)){let n=t[a](r);n!=null&&Object.assign(o,n);continue}r===!0?o[`data-${a.toLowerCase()}`]="":r&&(o[`data-${a.toLowerCase()}`]=r.toString())}return o}function my(e,t){return typeof e=="function"?e(t):e}function nu(e,t){return typeof e=="function"?e(t):e}import{createElement as fy}from"react";function me(e,t,o={}){let a=t.render;o.enabled!==!1&&(a=es(a));let r=gk(t,o,a);if(o.enabled===!1)return null;let n=o.state??Le;return yk(e,a,r,n)}function gk(e,t,o){let{className:a,style:r}=e,{state:n=Le,ref:s,props:i,stateAttributesMapping:l,enabled:c=!0}=t,u=c?my(a,n):void 0,d=c?nu(r,n):void 0,p=c?py(n,l):Le,f=c&&i?hk(i):void 0,m=c?rl(p,f)??{}:Le;return typeof document<"u"&&(c?Array.isArray(s)?m.ref=iy([m.ref,Jg(o),...s]):m.ref=Ht(m.ref,Jg(o),s):Ht(null,null)),c?(u!==void 0&&(m.className=Qg(m.className,u)),d!==void 0&&(m.style=rl(m.style,d)),m):Le}function hk(e){return Array.isArray(e)?ey(e):nt(void 0,e)}var bk=Symbol.for("react.lazy");function es(e){if(e?.$$typeof!==bk)return e;let t=wn.Children.toArray(e)[0];return wn.isValidElement(t)?t:e}function yk(e,t,o,a){if(t){if(typeof t=="function")return t(o,a);let r=nt(o,t.props);return r.ref=o.ref,wn.cloneElement(t,r)}return wk(e,o)}function wk(e,t){return e==="button"?fy("button",{type:"button",...t,key:t.key}):e==="img"?fy("img",{alt:"",...t,key:t.key}):wn.createElement(e,t)}function Qr(e){return me(e.defaultTagName??"div",e,e)}function gy(e){var t,o,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(o=gy(e[t]))&&(a&&(a+=" "),a+=o)}else for(o in e)e[o]&&(a&&(a+=" "),a+=o);return a}function su(){for(var e,t,o=0,a="",r=arguments.length;o<r;o++)(e=arguments[o])&&(t=gy(e))&&(a&&(a+=" "),a+=t);return a}var hy=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,by=su,rt=(e,t)=>o=>{var a;if(t?.variants==null)return by(e,o?.class,o?.className);let{variants:r,defaultVariants:n}=t,s=Object.keys(r).map(c=>{let u=o?.[c],d=n?.[c];if(u===null)return null;let p=hy(u)||hy(d);return r[c][p]}),i=o&&Object.entries(o).reduce((c,u)=>{let[d,p]=u;return p===void 0||(c[d]=p),c},{}),l=t==null||(a=t.compoundVariants)===null||a===void 0?void 0:a.reduce((c,u)=>{let{class:d,className:p,...f}=u;return Object.entries(f).every(m=>{let[v,h]=m;return Array.isArray(h)?h.includes({...n,...i}[v]):{...n,...i}[v]===h})?[...c,d,p]:c},[]);return by(e,s,l,o?.class,o?.className)};import*as il from"react";var ye=il.forwardRef((e,t)=>{let{alt:o,color:a="currentColor",size:r="1em",weight:n="regular",mirrored:s=!1,children:i,weights:l,...c}=e;return il.createElement("svg",{ref:t,xmlns:"http://www.w3.org/2000/svg",width:r,height:r,fill:a,viewBox:"0 0 256 256",transform:s?"scale(-1, 1)":void 0,...c},!!o&&il.createElement("title",null,o),i,l.get(n))});ye.displayName="SSRBase";import*as iu from"react";import*as Vt from"react";var yy=new Map([["bold",Vt.createElement(Vt.Fragment,null,Vt.createElement("path",{d:"M244,56v48a12,12,0,0,1-12,12H184a12,12,0,1,1,0-24H201.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76,76,0,1,0,127,204h1a75.53,75.53,0,0,0,52.15-20.72,12,12,0,0,1,16.49,17.45A99.45,99.45,0,0,1,128,228h-1.37A100,100,0,1,1,198.51,57.06L220,76.72V56a12,12,0,0,1,24,0Z"}))],["duotone",Vt.createElement(Vt.Fragment,null,Vt.createElement("path",{d:"M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z",opacity:"0.2"}),Vt.createElement("path",{d:"M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"}))],["fill",Vt.createElement(Vt.Fragment,null,Vt.createElement("path",{d:"M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1-5.66-13.66l17-17-10.55-9.65-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,1,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60l10.93,10L226.34,50.3A8,8,0,0,1,240,56Z"}))],["light",Vt.createElement(Vt.Fragment,null,Vt.createElement("path",{d:"M238,56v48a6,6,0,0,1-6,6H184a6,6,0,0,1,0-12h32.55l-30.38-27.8c-.06-.06-.12-.13-.19-.19a82,82,0,1,0-1.7,117.65,6,6,0,0,1,8.24,8.73A93.46,93.46,0,0,1,128,222h-1.28A94,94,0,1,1,194.37,61.4L226,90.35V56a6,6,0,1,1,12,0Z"}))],["regular",Vt.createElement(Vt.Fragment,null,Vt.createElement("path",{d:"M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"}))],["thin",Vt.createElement(Vt.Fragment,null,Vt.createElement("path",{d:"M236,56v48a4,4,0,0,1-4,4H184a4,4,0,0,1,0-8h37.7L187.53,68.69l-.13-.12a84,84,0,1,0-1.75,120.51,4,4,0,0,1,5.5,5.82A91.43,91.43,0,0,1,128,220h-1.26A92,92,0,1,1,193,62.84l35,32.05V56a4,4,0,1,1,8,0Z"}))]]);var lu=iu.forwardRef((e,t)=>iu.createElement(ye,{ref:t,...e,weights:yy}));lu.displayName="ArrowClockwiseIcon";import*as cu from"react";import*as Bt from"react";var wy=new Map([["bold",Bt.createElement(Bt.Fragment,null,Bt.createElement("path",{d:"M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z"}))],["duotone",Bt.createElement(Bt.Fragment,null,Bt.createElement("path",{d:"M200,144l-72,72L56,144Z",opacity:"0.2"}),Bt.createElement("path",{d:"M207.39,140.94A8,8,0,0,0,200,136H136V40a8,8,0,0,0-16,0v96H56a8,8,0,0,0-5.66,13.66l72,72a8,8,0,0,0,11.32,0l72-72A8,8,0,0,0,207.39,140.94ZM128,204.69,75.31,152H180.69Z"}))],["fill",Bt.createElement(Bt.Fragment,null,Bt.createElement("path",{d:"M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,56,136h64V40a8,8,0,0,1,16,0v96h64a8,8,0,0,1,5.66,13.66Z"}))],["light",Bt.createElement(Bt.Fragment,null,Bt.createElement("path",{d:"M204.24,148.24l-72,72a6,6,0,0,1-8.48,0l-72-72a6,6,0,0,1,8.48-8.48L122,201.51V40a6,6,0,0,1,12,0V201.51l61.76-61.75a6,6,0,0,1,8.48,8.48Z"}))],["regular",Bt.createElement(Bt.Fragment,null,Bt.createElement("path",{d:"M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"}))],["thin",Bt.createElement(Bt.Fragment,null,Bt.createElement("path",{d:"M202.83,146.83l-72,72a4,4,0,0,1-5.66,0l-72-72a4,4,0,0,1,5.66-5.66L124,206.34V40a4,4,0,0,1,8,0V206.34l65.17-65.17a4,4,0,0,1,5.66,5.66Z"}))]]);var uu=cu.forwardRef((e,t)=>cu.createElement(ye,{ref:t,...e,weights:wy}));uu.displayName="ArrowDownIcon";import*as du from"react";import*as _t from"react";var xy=new Map([["bold",_t.createElement(_t.Fragment,null,_t.createElement("path",{d:"M236,112a68.07,68.07,0,0,1-68,68H61l27.52,27.51a12,12,0,0,1-17,17l-48-48a12,12,0,0,1,0-17l48-48a12,12,0,1,1,17,17L61,156H168a44,44,0,0,0,0-88H80a12,12,0,0,1,0-24h88A68.07,68.07,0,0,1,236,112Z"}))],["duotone",_t.createElement(_t.Fragment,null,_t.createElement("path",{d:"M80,120v96L32,168Z",opacity:"0.2"}),_t.createElement("path",{d:"M168,48H80a8,8,0,0,0,0,16h88a48,48,0,0,1,0,96H88V120a8,8,0,0,0-13.66-5.66l-48,48a8,8,0,0,0,0,11.32l48,48A8,8,0,0,0,88,216V176h80a64,64,0,0,0,0-128ZM72,196.69,43.31,168,72,139.31Z"}))],["fill",_t.createElement(_t.Fragment,null,_t.createElement("path",{d:"M232,112a64.07,64.07,0,0,1-64,64H88v40a8,8,0,0,1-13.66,5.66l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,88,120v40h80a48,48,0,0,0,0-96H80a8,8,0,0,1,0-16h88A64.07,64.07,0,0,1,232,112Z"}))],["light",_t.createElement(_t.Fragment,null,_t.createElement("path",{d:"M230,112a62.07,62.07,0,0,1-62,62H46.49l37.75,37.76a6,6,0,1,1-8.48,8.48l-48-48a6,6,0,0,1,0-8.48l48-48a6,6,0,0,1,8.48,8.48L46.49,162H168a50,50,0,0,0,0-100H80a6,6,0,0,1,0-12h88A62.07,62.07,0,0,1,230,112Z"}))],["regular",_t.createElement(_t.Fragment,null,_t.createElement("path",{d:"M232,112a64.07,64.07,0,0,1-64,64H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48a8,8,0,0,1,11.32,11.32L51.31,160H168a48,48,0,0,0,0-96H80a8,8,0,0,1,0-16h88A64.07,64.07,0,0,1,232,112Z"}))],["thin",_t.createElement(_t.Fragment,null,_t.createElement("path",{d:"M228,112a60.07,60.07,0,0,1-60,60H41.66l41.17,41.17a4,4,0,0,1-5.66,5.66l-48-48a4,4,0,0,1,0-5.66l48-48a4,4,0,0,1,5.66,5.66L41.66,164H168a52,52,0,0,0,0-104H80a4,4,0,0,1,0-8h88A60.07,60.07,0,0,1,228,112Z"}))]]);var pu=du.forwardRef((e,t)=>du.createElement(ye,{ref:t,...e,weights:xy}));pu.displayName="ArrowUDownLeftIcon";import*as mu from"react";import*as Zt from"react";var vy=new Map([["bold",Zt.createElement(Zt.Fragment,null,Zt.createElement("path",{d:"M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"}))],["duotone",Zt.createElement(Zt.Fragment,null,Zt.createElement("path",{d:"M200,112H56l72-72Z",opacity:"0.2"}),Zt.createElement("path",{d:"M205.66,106.34l-72-72a8,8,0,0,0-11.32,0l-72,72A8,8,0,0,0,56,120h64v96a8,8,0,0,0,16,0V120h64a8,8,0,0,0,5.66-13.66ZM75.31,104,128,51.31,180.69,104Z"}))],["fill",Zt.createElement(Zt.Fragment,null,Zt.createElement("path",{d:"M207.39,115.06A8,8,0,0,1,200,120H136v96a8,8,0,0,1-16,0V120H56a8,8,0,0,1-5.66-13.66l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,207.39,115.06Z"}))],["light",Zt.createElement(Zt.Fragment,null,Zt.createElement("path",{d:"M204.24,116.24a6,6,0,0,1-8.48,0L134,54.49V216a6,6,0,0,1-12,0V54.49L60.24,116.24a6,6,0,0,1-8.48-8.48l72-72a6,6,0,0,1,8.48,0l72,72A6,6,0,0,1,204.24,116.24Z"}))],["regular",Zt.createElement(Zt.Fragment,null,Zt.createElement("path",{d:"M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"}))],["thin",Zt.createElement(Zt.Fragment,null,Zt.createElement("path",{d:"M202.83,114.83a4,4,0,0,1-5.66,0L132,49.66V216a4,4,0,0,1-8,0V49.66L58.83,114.83a4,4,0,0,1-5.66-5.66l72-72a4,4,0,0,1,5.66,0l72,72A4,4,0,0,1,202.83,114.83Z"}))]]);var fu=mu.forwardRef((e,t)=>mu.createElement(ye,{ref:t,...e,weights:vy}));fu.displayName="ArrowUpIcon";import*as gu from"react";import*as Gt from"react";var Iy=new Map([["bold",Gt.createElement(Gt.Fragment,null,Gt.createElement("path",{d:"M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM119.51,96.49a12,12,0,0,0,17,0l32-32a12,12,0,0,0-17-17L140,59V16a12,12,0,0,0-24,0V59L104.49,47.51a12,12,0,0,0-17,17Zm17,63a12,12,0,0,0-17,0l-32,32a12,12,0,0,0,17,17L116,197v43a12,12,0,0,0,24,0V197l11.51,11.52a12,12,0,0,0,17-17Z"}))],["duotone",Gt.createElement(Gt.Fragment,null,Gt.createElement("path",{d:"M216,32V224a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V32A16,16,0,0,1,56,16H200A16,16,0,0,1,216,32Z",opacity:"0.2"}),Gt.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM122.34,101.66a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32L136,76.69V16a8,8,0,0,0-16,0V76.69L101.66,58.34A8,8,0,0,0,90.34,69.66Zm11.32,52.68a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L120,179.31V240a8,8,0,0,0,16,0V179.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"}))],["fill",Gt.createElement(Gt.Fragment,null,Gt.createElement("path",{d:"M90.34,69.66A8,8,0,0,1,96,56h24V16a8,8,0,0,1,16,0V56h24a8,8,0,0,1,5.66,13.66l-32,32a8,8,0,0,1-11.32,0Zm43.32,84.68a8,8,0,0,0-11.32,0l-32,32A8,8,0,0,0,96,200h24v40a8,8,0,0,0,16,0V200h24a8,8,0,0,0,5.66-13.66ZM216,120H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"}))],["light",Gt.createElement(Gt.Fragment,null,Gt.createElement("path",{d:"M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Zm-98.24-27.76a6,6,0,0,0,8.48,0l32-32a6,6,0,0,0-8.48-8.48L134,81.51V16a6,6,0,0,0-12,0V81.51L100.24,59.76a6,6,0,0,0-8.48,8.48Zm8.48,55.52a6,6,0,0,0-8.48,0l-32,32a6,6,0,0,0,8.48,8.48L122,174.49V240a6,6,0,0,0,12,0V174.49l21.76,21.75a6,6,0,0,0,8.48-8.48Z"}))],["regular",Gt.createElement(Gt.Fragment,null,Gt.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM122.34,101.66a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32L136,76.69V16a8,8,0,0,0-16,0V76.69L101.66,58.34A8,8,0,0,0,90.34,69.66Zm11.32,52.68a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L120,179.31V240a8,8,0,0,0,16,0V179.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"}))],["thin",Gt.createElement(Gt.Fragment,null,Gt.createElement("path",{d:"M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128ZM125.17,98.83a4,4,0,0,0,5.66,0l32-32a4,4,0,1,0-5.66-5.66L132,86.34V16a4,4,0,0,0-8,0V86.34L98.83,61.17a4,4,0,0,0-5.66,5.66Zm5.66,58.34a4,4,0,0,0-5.66,0l-32,32a4,4,0,0,0,5.66,5.66L124,169.66V240a4,4,0,0,0,8,0V169.66l25.17,25.17a4,4,0,0,0,5.66-5.66Z"}))]]);var hu=gu.forwardRef((e,t)=>gu.createElement(ye,{ref:t,...e,weights:Iy}));hu.displayName="ArrowsInLineVerticalIcon";import*as bu from"react";import*as Ut from"react";var Cy=new Map([["bold",Ut.createElement(Ut.Fragment,null,Ut.createElement("path",{d:"M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"}))],["duotone",Ut.createElement(Ut.Fragment,null,Ut.createElement("path",{d:"M208,96l-80,80L48,96Z",opacity:"0.2"}),Ut.createElement("path",{d:"M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z"}))],["fill",Ut.createElement(Ut.Fragment,null,Ut.createElement("path",{d:"M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z"}))],["light",Ut.createElement(Ut.Fragment,null,Ut.createElement("path",{d:"M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"}))],["regular",Ut.createElement(Ut.Fragment,null,Ut.createElement("path",{d:"M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"}))],["thin",Ut.createElement(Ut.Fragment,null,Ut.createElement("path",{d:"M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z"}))]]);var yu=bu.forwardRef((e,t)=>bu.createElement(ye,{ref:t,...e,weights:Cy}));yu.displayName="CaretDownIcon";import*as wu from"react";import*as $t from"react";var Ry=new Map([["bold",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"}))],["duotone",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M176,128,96,208V48Z",opacity:"0.2"}),$t.createElement("path",{d:"M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34ZM104,188.69V67.31L164.69,128Z"}))],["fill",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"}))],["light",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M180.24,132.24l-80,80a6,6,0,0,1-8.48-8.48L167.51,128,91.76,52.24a6,6,0,0,1,8.48-8.48l80,80A6,6,0,0,1,180.24,132.24Z"}))],["regular",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"}))],["thin",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"}))]]);var xu=wu.forwardRef((e,t)=>wu.createElement(ye,{ref:t,...e,weights:Ry}));xu.displayName="CaretRightIcon";import*as vu from"react";import*as Wt from"react";var Sy=new Map([["bold",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M184.49,167.51a12,12,0,0,1,0,17l-48,48a12,12,0,0,1-17,0l-48-48a12,12,0,0,1,17-17L128,207l39.51-39.52A12,12,0,0,1,184.49,167.51Zm-96-79L128,49l39.51,39.52a12,12,0,0,0,17-17l-48-48a12,12,0,0,0-17,0l-48,48a12,12,0,0,0,17,17Z"}))],["duotone",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M80,176h96l-48,48ZM128,32,80,80h96Z",opacity:"0.2"}),Wt.createElement("path",{d:"M176,168H80a8,8,0,0,0-5.66,13.66l48,48a8,8,0,0,0,11.32,0l48-48A8,8,0,0,0,176,168Zm-48,44.69L99.31,184h57.38ZM80,88h96a8,8,0,0,0,5.66-13.66l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,80,88Zm48-44.69L156.69,72H99.31Z"}))],["fill",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M72.61,83.06a8,8,0,0,1,1.73-8.72l48-48a8,8,0,0,1,11.32,0l48,48A8,8,0,0,1,176,88H80A8,8,0,0,1,72.61,83.06ZM176,168H80a8,8,0,0,0-5.66,13.66l48,48a8,8,0,0,0,11.32,0l48-48A8,8,0,0,0,176,168Z"}))],["light",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M180.24,171.76a6,6,0,0,1,0,8.48l-48,48a6,6,0,0,1-8.48,0l-48-48a6,6,0,0,1,8.48-8.48L128,215.51l43.76-43.75A6,6,0,0,1,180.24,171.76Zm-96-87.52L128,40.49l43.76,43.75a6,6,0,0,0,8.48-8.48l-48-48a6,6,0,0,0-8.48,0l-48,48a6,6,0,0,0,8.48,8.48Z"}))],["regular",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"}))],["thin",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M178.83,173.17a4,4,0,0,1,0,5.66l-48,48a4,4,0,0,1-5.66,0l-48-48a4,4,0,0,1,5.66-5.66L128,218.34l45.17-45.17A4,4,0,0,1,178.83,173.17Zm-96-90.34L128,37.66l45.17,45.17a4,4,0,1,0,5.66-5.66l-48-48a4,4,0,0,0-5.66,0l-48,48a4,4,0,0,0,5.66,5.66Z"}))]]);var Iu=vu.forwardRef((e,t)=>vu.createElement(ye,{ref:t,...e,weights:Sy}));Iu.displayName="CaretUpDownIcon";import*as Cu from"react";import*as qt from"react";var ky=new Map([["bold",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M236,208a12,12,0,0,1-12,12H32a12,12,0,0,1-12-12V48a12,12,0,0,1,24,0v85.55L88.1,95a12,12,0,0,1,15.1-.57l56.22,42.16L216.1,87A12,12,0,1,1,231.9,105l-64,56a12,12,0,0,1-15.1.57L96.58,119.44,44,165.45V196H224A12,12,0,0,1,236,208Z"}))],["duotone",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M224,64V208H32V48H208A16,16,0,0,1,224,64Z",opacity:"0.2"}),qt.createElement("path",{d:"M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"}))],["fill",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,176a8,8,0,0,1,0,16H56a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v62.92l34.88-29.07a8,8,0,0,1,9.56-.51l43,28.69,43.41-36.18a8,8,0,0,1,10.24,12.3l-48,40a8,8,0,0,1-9.56.51l-43-28.69L64,155.75V176Z"}))],["light",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M230,208a6,6,0,0,1-6,6H32a6,6,0,0,1-6-6V48a6,6,0,0,1,12,0v98.78l54.05-47.3a6,6,0,0,1,7.55-.28l60.11,45.08,60.34-52.8a6,6,0,0,1,7.9,9l-64,56a6,6,0,0,1-7.55.28L96.29,111.72,38,162.72V202H224A6,6,0,0,1,230,208Z"}))],["regular",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"}))],["thin",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M228,208a4,4,0,0,1-4,4H32a4,4,0,0,1-4-4V48a4,4,0,0,1,8,0V151.19L93.37,101a4,4,0,0,1,5-.19l61.41,46.05L221.37,93a4,4,0,0,1,5.26,6l-64,56a4,4,0,0,1-5,.19l-61.41-46L36,161.81V204H224A4,4,0,0,1,228,208Z"}))]]);var Ru=Cu.forwardRef((e,t)=>Cu.createElement(ye,{ref:t,...e,weights:ky}));Ru.displayName="ChartLineIcon";import*as Su from"react";import*as jt from"react";var My=new Map([["bold",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"}))],["duotone",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z",opacity:"0.2"}),jt.createElement("path",{d:"M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"}))],["fill",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"}))],["light",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"}))],["regular",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"}))],["thin",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z"}))]]);var ku=Su.forwardRef((e,t)=>Su.createElement(ye,{ref:t,...e,weights:My}));ku.displayName="CheckIcon";import*as Mu from"react";import*as Kt from"react";var Ey=new Map([["bold",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"}))],["duotone",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),Kt.createElement("path",{d:"M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["fill",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"}))],["light",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M172.24,99.76a6,6,0,0,1,0,8.48l-56,56a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L112,151.51l51.76-51.75A6,6,0,0,1,172.24,99.76ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"}))],["regular",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["thin",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M170.83,101.17a4,4,0,0,1,0,5.66l-56,56a4,4,0,0,1-5.66,0l-24-24a4,4,0,0,1,5.66-5.66L112,154.34l53.17-53.17A4,4,0,0,1,170.83,101.17ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"}))]]);var Eu=Mu.forwardRef((e,t)=>Mu.createElement(ye,{ref:t,...e,weights:Ey}));Eu.displayName="CheckCircleIcon";import*as Pu from"react";import*as Yt from"react";var Py=new Map([["bold",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M236,128a108,108,0,0,1-216,0c0-42.52,24.73-81.34,63-98.9A12,12,0,1,1,93,50.91C63.24,64.57,44,94.83,44,128a84,84,0,0,0,168,0c0-33.17-19.24-63.43-49-77.09A12,12,0,1,1,173,29.1C211.27,46.66,236,85.48,236,128Z"}))],["duotone",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),Yt.createElement("path",{d:"M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"}))],["fill",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,176A72,72,0,0,1,92,65.64a8,8,0,0,1,8,13.85,56,56,0,1,0,56,0,8,8,0,0,1,8-13.85A72,72,0,0,1,128,200Z"}))],["light",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M230,128a102,102,0,0,1-204,0c0-40.18,23.35-76.86,59.5-93.45a6,6,0,0,1,5,10.9C58.61,60.09,38,92.49,38,128a90,90,0,0,0,180,0c0-35.51-20.61-67.91-52.5-82.55a6,6,0,0,1,5-10.9C206.65,51.14,230,87.82,230,128Z"}))],["regular",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"}))],["thin",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M228,128a100,100,0,0,1-200,0c0-39.4,22.9-75.37,58.33-91.63a4,4,0,1,1,3.34,7.27C57.07,58.6,36,91.71,36,128a92,92,0,0,0,184,0c0-36.29-21.07-69.4-53.67-84.36a4,4,0,1,1,3.34-7.27C205.1,52.63,228,88.6,228,128Z"}))]]);var Tu=Pu.forwardRef((e,t)=>Pu.createElement(ye,{ref:t,...e,weights:Py}));Tu.displayName="CircleNotchIcon";import*as Au from"react";import*as Xt from"react";var Ty=new Map([["bold",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"}))],["duotone",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M216,40V168H168V88H88V40Z",opacity:"0.2"}),Xt.createElement("path",{d:"M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"}))],["fill",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"}))],["light",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M216,34H88a6,6,0,0,0-6,6V82H40a6,6,0,0,0-6,6V216a6,6,0,0,0,6,6H168a6,6,0,0,0,6-6V174h42a6,6,0,0,0,6-6V40A6,6,0,0,0,216,34ZM162,210H46V94H162Zm48-48H174V88a6,6,0,0,0-6-6H94V46H210Z"}))],["regular",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"}))],["thin",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M216,36H88a4,4,0,0,0-4,4V84H40a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4H168a4,4,0,0,0,4-4V172h44a4,4,0,0,0,4-4V40A4,4,0,0,0,216,36ZM164,212H44V92H164Zm48-48H172V88a4,4,0,0,0-4-4H92V44H212Z"}))]]);var zu=Au.forwardRef((e,t)=>Au.createElement(ye,{ref:t,...e,weights:Ty}));zu.displayName="CopyIcon";import*as Lu from"react";import*as Qt from"react";var Ay=new Map([["bold",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z"}))],["duotone",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M240,96v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V96A16,16,0,0,1,32,80H224A16,16,0,0,1,240,96Z",opacity:"0.2"}),Qt.createElement("path",{d:"M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"}))],["fill",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M224,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V96A16,16,0,0,0,224,80ZM60,140a12,12,0,1,1,12-12A12,12,0,0,1,60,140Zm68,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm68,0a12,12,0,1,1,12-12A12,12,0,0,1,196,140Z"}))],["light",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M138,128a10,10,0,1,1-10-10A10,10,0,0,1,138,128ZM60,118a10,10,0,1,0,10,10A10,10,0,0,0,60,118Zm136,0a10,10,0,1,0,10,10A10,10,0,0,0,196,118Z"}))],["regular",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"}))],["thin",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M136,128a8,8,0,1,1-8-8A8,8,0,0,1,136,128Zm-76-8a8,8,0,1,0,8,8A8,8,0,0,0,60,120Zm136,0a8,8,0,1,0,8,8A8,8,0,0,0,196,120Z"}))]]);var Nu=Lu.forwardRef((e,t)=>Lu.createElement(ye,{ref:t,...e,weights:Ay}));Nu.displayName="DotsThreeIcon";import*as Fu from"react";import*as Jt from"react";var zy=new Map([["bold",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M251,123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63,57.67,164,44,128,44S59.37,57.67,33.51,83.52C14.16,102.87,5.4,122.32,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212s68.63-13.66,94.48-39.51c19.36-19.35,28.12-38.79,28.49-39.61A12.08,12.08,0,0,0,251,123.13Zm-46.06,33C183.47,177.27,157.59,188,128,188s-55.47-10.73-76.91-31.88A130.36,130.36,0,0,1,29.52,128,130.45,130.45,0,0,1,51.09,99.89C72.54,78.73,98.41,68,128,68s55.46,10.73,76.91,31.89A130.36,130.36,0,0,1,226.48,128,130.45,130.45,0,0,1,204.91,156.12ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z"}))],["duotone",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",opacity:"0.2"}),Jt.createElement("path",{d:"M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"}))],["fill",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"}))],["light",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M245.48,125.57c-.34-.78-8.66-19.23-27.24-37.81C201,70.54,171.38,50,128,50S55,70.54,37.76,87.76c-18.58,18.58-26.9,37-27.24,37.81a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206s73-20.53,90.24-37.75c18.58-18.58,26.9-37,27.24-37.8A6,6,0,0,0,245.48,125.57ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.77,134.77,0,0,1,22.69,128,134.56,134.56,0,0,1,46.55,95.94C69.22,73.42,96.62,62,128,62s58.78,11.42,81.45,33.94A134.56,134.56,0,0,1,233.31,128C226.94,140.21,195,194,128,194Zm0-112a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Z"}))],["regular",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"}))],["thin",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M243.66,126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87,72.22,170.7,52,128,52S56.13,72.22,39.17,89.18c-18.31,18.31-26.49,36.44-26.83,37.2a4.08,4.08,0,0,0,0,3.25c.34.77,8.52,18.89,26.83,37.2,17,17,46.14,37.17,88.83,37.17s71.87-20.21,88.83-37.17c18.31-18.31,26.49-36.43,26.83-37.2A4.08,4.08,0,0,0,243.66,126.38Zm-32.7,35c-23.07,23-51,34.62-83,34.62s-59.89-11.65-83-34.62A135.71,135.71,0,0,1,20.44,128,135.69,135.69,0,0,1,45,94.62C68.11,71.65,96,60,128,60s59.89,11.65,83,34.62A135.79,135.79,0,0,1,235.56,128,135.71,135.71,0,0,1,211,161.38ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Z"}))]]);var Du=Fu.forwardRef((e,t)=>Fu.createElement(ye,{ref:t,...e,weights:zy}));Du.displayName="EyeIcon";import*as Ou from"react";import*as eo from"react";var Ly=new Map([["bold",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M56.88,31.93A12,12,0,1,0,39.12,48.07l16,17.65C20.67,88.66,5.72,121.58,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212a131.34,131.34,0,0,0,51-10l20.09,22.1a12,12,0,0,0,17.76-16.14ZM128,188c-29.59,0-55.47-10.73-76.91-31.88A130.69,130.69,0,0,1,29.52,128c5.27-9.31,18.79-29.9,42-44.29l90.09,99.11A109.33,109.33,0,0,1,128,188Zm123-55.12c-.36.81-9,20-28,39.16a12,12,0,1,1-17-16.9A130.48,130.48,0,0,0,226.48,128a130.36,130.36,0,0,0-21.57-28.12C183.46,78.73,157.59,68,128,68c-3.35,0-6.7.14-10,.42a12,12,0,1,1-2-23.91c3.93-.34,8-.51,12-.51,36,0,68.63,13.67,94.49,39.52,19.35,19.35,28.11,38.8,28.48,39.61A12.08,12.08,0,0,1,251,132.88Z"}))],["duotone",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",opacity:"0.2"}),eo.createElement("path",{d:"M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"}))],["fill",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M96.68,57.87a4,4,0,0,1,2.08-6.6A130.13,130.13,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41a8,8,0,0,1,0,6.5c-.35.79-8.82,19.57-27.65,38.4q-4.28,4.26-8.79,8.07a4,4,0,0,1-5.55-.36ZM213.92,210.62a8,8,0,1,1-11.84,10.76L180,197.13A127.21,127.21,0,0,1,128,208c-34.88,0-66.57-13.26-91.66-38.34C17.51,150.83,9,132.05,8.69,131.26a8,8,0,0,1,0-6.5C9,124,17.51,105.18,36.34,86.35a135,135,0,0,1,25-19.78L42.08,45.38A8,8,0,1,1,53.92,34.62Zm-65.49-48.25-52.69-58a40,40,0,0,0,52.69,58Z"}))],["light",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M52.44,36A6,6,0,0,0,43.56,44L64.44,67c-37.28,21.9-53.23,57-53.92,58.57a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206a124.91,124.91,0,0,0,52.57-11.25l23,25.29a6,6,0,0,0,8.88-8.08Zm48.62,71.32,45,49.52a34,34,0,0,1-45-49.52ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.57,134.57,0,0,1,22.69,128c4.29-8.2,20.1-35.18,50-51.91L92.89,98.3a46,46,0,0,0,61.35,67.48l17.81,19.6A113.47,113.47,0,0,1,128,194Zm6.4-99.4a6,6,0,0,1,2.25-11.79,46.17,46.17,0,0,1,37.15,40.87,6,6,0,0,1-5.42,6.53l-.56,0a6,6,0,0,1-6-5.45A34.1,34.1,0,0,0,134.4,94.6Zm111.08,35.85c-.41.92-10.37,23-32.86,43.12a6,6,0,1,1-8-8.94A134.07,134.07,0,0,0,233.31,128a134.67,134.67,0,0,0-23.86-32.07C186.78,73.42,159.38,62,128,62a120.19,120.19,0,0,0-19.69,1.6,6,6,0,1,1-2-11.83A131.12,131.12,0,0,1,128,50c43.38,0,73,20.54,90.24,37.76,18.58,18.58,26.9,37,27.24,37.81A6,6,0,0,1,245.48,130.45Z"}))],["regular",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"}))],["thin",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M51,37.31A4,4,0,0,0,45,42.69L67.59,67.5C29.34,89,13,124.81,12.34,126.38a4.08,4.08,0,0,0,0,3.25c.34.77,8.52,18.89,26.83,37.2,17,17,46.14,37.17,88.83,37.17a122.59,122.59,0,0,0,53.06-11.69l24,26.38a4,4,0,1,0,5.92-5.38ZM149.1,157.16A36,36,0,0,1,101,104.22ZM128,196c-32,0-59.89-11.65-83-34.62A135.81,135.81,0,0,1,20.44,128c3.65-7.23,20.09-36.81,52.68-54.43l22.45,24.7a44,44,0,0,0,59,64.83l20.89,23A114.94,114.94,0,0,1,128,196Zm6.78-103.36a4,4,0,0,1,1.49-7.86,44.15,44.15,0,0,1,35.54,39.09,4,4,0,0,1-3.61,4.35l-.38,0a4,4,0,0,1-4-3.63A36.1,36.1,0,0,0,134.78,92.64Zm108.88,37c-.41.91-10.2,22.58-32.38,42.45a4,4,0,0,1-2.67,1,4,4,0,0,1-2.67-7A136.71,136.71,0,0,0,235.56,128,136.07,136.07,0,0,0,211,94.62C187.89,71.65,160,60,128,60a122,122,0,0,0-20,1.63,4,4,0,0,1-1.32-7.89A129.3,129.3,0,0,1,128,52c42.7,0,71.87,20.22,88.83,37.18,18.31,18.31,26.49,36.44,26.83,37.2A4.08,4.08,0,0,1,243.66,129.63Z"}))]]);var Hu=Ou.forwardRef((e,t)=>Ou.createElement(ye,{ref:t,...e,weights:Ly}));Hu.displayName="EyeSlashIcon";import*as Vu from"react";import*as to from"react";var Ny=new Map([["bold",to.createElement(to.Fragment,null,to.createElement("path",{d:"M216.49,79.51l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.51ZM183,80H160V57ZM116,212V192h8a12,12,0,0,0,0-24h-8V152h8a12,12,0,0,0,0-24h-8V116a12,12,0,0,0-24,0v12H84a12,12,0,0,0,0,24h8v16H84a12,12,0,0,0,0,24h8v20H60V44h76V92a12,12,0,0,0,12,12h48V212Z"}))],["duotone",to.createElement(to.Fragment,null,to.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),to.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H112V200h8a8,8,0,0,0,0-16h-8V168h8a8,8,0,0,0,0-16h-8V136h8a8,8,0,0,0,0-16h-8v-8a8,8,0,0,0-16,0v8H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H56V40h88V88a8,8,0,0,0,8,8h48V216Z"}))],["fill",to.createElement(to.Fragment,null,to.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H92a4,4,0,0,0,4-4V208H88.27A8.17,8.17,0,0,1,80,200.53,8,8,0,0,1,88,192h8V176H88.27A8.17,8.17,0,0,1,80,168.53,8,8,0,0,1,88,160h8V144H88.27A8.17,8.17,0,0,1,80,136.53,8,8,0,0,1,88,128h8v-7.73a8.18,8.18,0,0,1,7.47-8.25,8,8,0,0,1,8.53,8v8h7.73a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53h-8v16h7.73a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53h-8v16h7.73a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53h-8v20a4,4,0,0,0,4,4h84a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z"}))],["light",to.createElement(to.Fragment,null,to.createElement("path",{d:"M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158ZM200,218H110V198h10a6,6,0,0,0,0-12H110V166h10a6,6,0,0,0,0-12H110V134h10a6,6,0,0,0,0-12H110V112a6,6,0,0,0-12,0v10H88a6,6,0,0,0,0,12H98v20H88a6,6,0,0,0,0,12H98v20H88a6,6,0,0,0,0,12H98v20H56a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216A2,2,0,0,1,200,218Z"}))],["regular",to.createElement(to.Fragment,null,to.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H112V200h8a8,8,0,0,0,0-16h-8V168h8a8,8,0,0,0,0-16h-8V136h8a8,8,0,0,0,0-16h-8v-8a8,8,0,0,0-16,0v8H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H56V40h88V88a8,8,0,0,0,8,8h48V216Z"}))],["thin",to.createElement(to.Fragment,null,to.createElement("path",{d:"M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40V216a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM200,220H108V196h12a4,4,0,0,0,0-8H108V164h12a4,4,0,0,0,0-8H108V132h12a4,4,0,0,0,0-8H108V112a4,4,0,0,0-8,0v12H88a4,4,0,0,0,0,8h12v24H88a4,4,0,0,0,0,8h12v24H88a4,4,0,0,0,0,8h12v24H56a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216A4,4,0,0,1,200,220Z"}))]]);var Bu=Vu.forwardRef((e,t)=>Vu.createElement(ye,{ref:t,...e,weights:Ny}));Bu.displayName="FileArchiveIcon";import*as _u from"react";import*as oo from"react";var Fy=new Map([["bold",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M96.59,124.91a12,12,0,0,0-13.08,2.6L63,148H44a12,12,0,0,0-12,12v40a12,12,0,0,0,12,12H63l20.48,20.48A12,12,0,0,0,104,224V136A12,12,0,0,0,96.59,124.91ZM80,195l-3.51-3.52A12,12,0,0,0,68,188H56V172H68a12,12,0,0,0,8.49-3.51L80,165Zm80-15a44.55,44.55,0,0,1-21.95,38.36A12,12,0,1,1,126,197.64a20.51,20.51,0,0,0,0-35.28,12,12,0,1,1,12.1-20.72A44.55,44.55,0,0,1,160,180ZM216.49,79.51l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40v72a12,12,0,0,0,24,0V44h76V92a12,12,0,0,0,12,12h48V212H180a12,12,0,0,0,0,24h20a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.51ZM160,57l23,23H160Z"}))],["duotone",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M72,160l24-24v88L72,200H48V160ZM152,32V88h56Z",opacity:"0.2"}),oo.createElement("path",{d:"M99.06,128.61a8,8,0,0,0-8.72,1.73L68.69,152H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H68.69l21.65,21.66A8,8,0,0,0,104,224V136A8,8,0,0,0,99.06,128.61ZM88,204.69,77.66,194.34A8,8,0,0,0,72,192H56V168H72a8,8,0,0,0,5.66-2.34L88,155.31ZM152,180a40.55,40.55,0,0,1-20,34.91A8,8,0,0,1,124,201.09a24.49,24.49,0,0,0,0-42.18A8,8,0,0,1,132,145.09,40.55,40.55,0,0,1,152,180Zm61.66-97.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v80a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216H168a8,8,0,0,0,0,16h32a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"}))],["fill",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M152,180a40.55,40.55,0,0,1-20,34.91A8,8,0,0,1,124,201.09a24.49,24.49,0,0,0,0-42.18A8,8,0,0,1,132,145.09,40.55,40.55,0,0,1,152,180ZM99.06,128.61a8,8,0,0,0-8.72,1.73L68.69,152H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H68.69l21.65,21.66A8,8,0,0,0,104,224V136A8,8,0,0,0,99.06,128.61ZM216,88V216a16,16,0,0,1-16,16H168a8,8,0,0,1,0-16h32V96H152a8,8,0,0,1-8-8V40H56v80a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Z"}))],["light",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M98.3,130.46a6,6,0,0,0-6.54,1.3L69.51,154H48a6,6,0,0,0-6,6v40a6,6,0,0,0,6,6H69.51l22.25,22.24A6,6,0,0,0,102,224V136A6,6,0,0,0,98.3,130.46Zm-8.3,79L76.24,195.76A6,6,0,0,0,72,194H54V166H72a6,6,0,0,0,4.24-1.76L90,150.49ZM150,180a38.53,38.53,0,0,1-19,33.18A6,6,0,0,1,125,202.82a26.5,26.5,0,0,0,0-45.64A6,6,0,0,1,131,146.82,38.53,38.53,0,0,1,150,180Zm62.24-96.24-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40v80a6,6,0,0,0,12,0V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216a2,2,0,0,1-2,2H168a6,6,0,0,0,0,12h32a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158Z"}))],["regular",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M99.06,128.61a8,8,0,0,0-8.72,1.73L68.69,152H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H68.69l21.65,21.66A8,8,0,0,0,104,224V136A8,8,0,0,0,99.06,128.61ZM88,204.69,77.66,194.34A8,8,0,0,0,72,192H56V168H72a8,8,0,0,0,5.66-2.34L88,155.31ZM152,180a40.55,40.55,0,0,1-20,34.91A8,8,0,0,1,124,201.09a24.49,24.49,0,0,0,0-42.18A8,8,0,0,1,132,145.09,40.55,40.55,0,0,1,152,180Zm61.66-97.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v80a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216H168a8,8,0,0,0,0,16h32a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"}))],["thin",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M97.53,132.3a4,4,0,0,0-4.36.87L70.34,156H48a4,4,0,0,0-4,4v40a4,4,0,0,0,4,4H70.34l22.83,22.83A4,4,0,0,0,100,224V136A4,4,0,0,0,97.53,132.3Zm-5.53,82L74.83,197.17A4,4,0,0,0,72,196H52V164H72a4,4,0,0,0,2.83-1.17L92,145.66ZM148,180a36.52,36.52,0,0,1-18,31.45,4,4,0,0,1-4-6.9,28.5,28.5,0,0,0,0-49.1,4,4,0,0,1,4-6.9A36.52,36.52,0,0,1,148,180Zm62.83-94.83-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40v80a4,4,0,0,0,8,0V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216a4,4,0,0,1-4,4H168a4,4,0,0,0,0,8h32a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156Z"}))]]);var Zu=_u.forwardRef((e,t)=>_u.createElement(ye,{ref:t,...e,weights:Fy}));Zu.displayName="FileAudioIcon";import*as Gu from"react";import*as ao from"react";var Dy=new Map([["bold",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Z"}))],["duotone",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),ao.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"}))],["fill",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z"}))],["light",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158ZM200,218H56a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216A2,2,0,0,1,200,218Z"}))],["regular",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"}))],["thin",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40V216a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM200,220H56a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216A4,4,0,0,1,200,220Z"}))]]);var Uu=Gu.forwardRef((e,t)=>Gu.createElement(ye,{ref:t,...e,weights:Dy}));Uu.displayName="FileIcon";import*as $u from"react";import*as ro from"react";var Oy=new Map([["bold",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M180.49,143.51a12,12,0,0,1,0,17l-24,24a12,12,0,0,1-17-17L155,152l-15.52-15.51a12,12,0,1,1,17-17Zm-64-24a12,12,0,0,0-17,0l-24,24a12,12,0,0,0,0,17l24,24a12,12,0,0,0,17-17L101,152l15.52-15.51A12,12,0,0,0,116.49,119.51ZM220,88V216a20,20,0,0,1-20,20H56a20,20,0,0,1-20-20V40A20,20,0,0,1,56,20h96a12,12,0,0,1,8.49,3.52l56,56A12,12,0,0,1,220,88ZM160,57V80h23Zm36,155V104H148a12,12,0,0,1-12-12V44H60V212Z"}))],["duotone",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),ro.createElement("path",{d:"M181.66,146.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32Zm-72-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L91.31,152l18.35-18.34A8,8,0,0,0,109.66,122.34ZM216,88V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Zm40,136V96H152a8,8,0,0,1-8-8V40H56V216H200Z"}))],["fill",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34Zm-104,88a8,8,0,0,1-11.32,11.32l-24-24a8,8,0,0,1,0-11.32l24-24a8,8,0,0,1,11.32,11.32L91.31,152Zm72-12.68-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32l24,24A8,8,0,0,1,181.66,157.66ZM152,88V44l44,44Z"}))],["light",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M180.24,147.76a6,6,0,0,1,0,8.48l-24,24a6,6,0,0,1-8.48-8.48L167.51,152l-19.75-19.76a6,6,0,1,1,8.48-8.48Zm-72-24a6,6,0,0,0-8.48,0l-24,24a6,6,0,0,0,0,8.48l24,24a6,6,0,1,0,8.48-8.48L88.49,152l19.75-19.76A6,6,0,0,0,108.24,123.76ZM214,88V216a14,14,0,0,1-14,14H56a14,14,0,0,1-14-14V40A14,14,0,0,1,56,26h96a6,6,0,0,1,4.25,1.76l56,56A6,6,0,0,1,214,88Zm-56-6h35.52L158,46.48Zm44,134V94H152a6,6,0,0,1-6-6V38H56a2,2,0,0,0-2,2V216a2,2,0,0,0,2,2H200A2,2,0,0,0,202,216Z"}))],["regular",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M181.66,146.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32Zm-72-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L91.31,152l18.35-18.34A8,8,0,0,0,109.66,122.34ZM216,88V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Zm40,136V96H152a8,8,0,0,1-8-8V40H56V216H200Z"}))],["thin",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M178.83,149.17a4,4,0,0,1,0,5.66l-24,24a4,4,0,0,1-5.66-5.66L170.34,152l-21.17-21.17a4,4,0,1,1,5.66-5.66Zm-72-24a4,4,0,0,0-5.66,0l-24,24a4,4,0,0,0,0,5.66l24,24a4,4,0,1,0,5.66-5.66L85.66,152l21.17-21.17A4,4,0,0,0,106.83,125.17ZM212,88V216a12,12,0,0,1-12,12H56a12,12,0,0,1-12-12V40A12,12,0,0,1,56,28h96a4,4,0,0,1,2.83,1.17l56,56A4,4,0,0,1,212,88Zm-56-4h42.34L156,41.65Zm48,132V92H152a4,4,0,0,1-4-4V36H56a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4H200A4,4,0,0,0,204,216Z"}))]]);var Wu=$u.forwardRef((e,t)=>$u.createElement(ye,{ref:t,...e,weights:Oy}));Wu.displayName="FileCodeIcon";import*as qu from"react";import*as no from"react";var Hy=new Map([["bold",no.createElement(no.Fragment,null,no.createElement("path",{d:"M48,180c0,8.67,5.49,16,12,16a10.27,10.27,0,0,0,7.33-3.43,12,12,0,1,1,17.34,16.6A34,34,0,0,1,60,220C40.15,220,24,202,24,180s16.15-40,36-40a34,34,0,0,1,24.67,10.83,12,12,0,1,1-17.34,16.6A10.27,10.27,0,0,0,60,164C53.49,164,48,171.31,48,180Zm97.51-5.71c-5.13-3.45-11.33-5.24-16.8-6.82a79.5,79.5,0,0,1-7.91-2.59c2.45-1.18,9.71-1.3,16.07.33A12,12,0,0,0,143,142a69.24,69.24,0,0,0-12-1.86c-9.93-.66-18,1.08-24.1,5.17a24.45,24.45,0,0,0-10.69,17.76c-1.1,8.74,2.48,16.27,10.11,21.19,4.78,3.09,10.36,4.7,15.75,6.26,3,.89,7.94,2.3,9.88,3.53a2,2,0,0,1-.22.71c-1.36,1.55-9.57,1.79-16.39-.06a12,12,0,0,0-6.45,23.11A63.73,63.73,0,0,0,125.09,220c6.47,0,13.74-1.17,19.74-5.15a24.73,24.73,0,0,0,10.95-18C157,187.53,153.32,179.53,145.51,174.27ZM216,140.68A12,12,0,0,0,200.7,148L192,172.3,183.3,148A12,12,0,1,0,160.7,156l20,56a12,12,0,0,0,22.6,0l20-56A12,12,0,0,0,216,140.68ZM36,108V40A20,20,0,0,1,56,20h96a12,12,0,0,1,8.49,3.51l56,56A12,12,0,0,1,220,88v20a12,12,0,1,1-24,0v-4H148a12,12,0,0,1-12-12V44H60v64a12,12,0,1,1-24,0ZM160,80h23L160,57Z"}))],["duotone",no.createElement(no.Fragment,null,no.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),no.createElement("path",{d:"M48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.65,0-32-16.15-32-36s14.35-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.24,14.24,0,0,0,64,160C55.18,160,48,169,48,180Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84-1.25-.81-1.23-1-1.12-1.9a4.57,4.57,0,0,1,2-3.67c4.6-3.12,15.34-1.73,19.83-.56A8,8,0,0,0,142,145.86c-2.12-.55-21-5.22-32.84,2.76a20.58,20.58,0,0,0-9,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.34-2.14,3.93-4.6,3.06-15.17,1.56-19.55.36A8,8,0,0,0,109.94,214a61.34,61.34,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.82,20.82,0,0,0,9.19-15.23C154,179,137.49,174.17,127.6,171.31Zm83.09-26.84a8,8,0,0,0-10.23,4.84L188,184.21l-12.47-34.9a8,8,0,0,0-15.07,5.38l20,56a8,8,0,0,0,15.07,0l20-56A8,8,0,0,0,210.69,144.47ZM216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-27.31-8L160,51.31V80Z"}))],["fill",no.createElement(no.Fragment,null,no.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v76a4,4,0,0,0,4,4H212a4,4,0,0,0,4-4V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44ZM48,180c0,11,7.18,20,16,20a14.18,14.18,0,0,0,10.06-4.5,8.21,8.21,0,0,1,10.9-.91,8,8,0,0,1,.82,11.81A30.06,30.06,0,0,1,64,216c-17.64,0-32-16.15-32-36s14.36-36,32-36a30,30,0,0,1,21.39,9.19,8.26,8.26,0,0,1,.73,11.09,8,8,0,0,1-11.9.38A14.17,14.17,0,0,0,64,160C55.18,160,48,169,48,180Zm103.81,16.31a20.82,20.82,0,0,1-9.19,15.23C137.43,215,131,216,125.13,216A61.14,61.14,0,0,1,110,214a8,8,0,1,1,4.3-15.41c4.38,1.2,14.95,2.7,19.55-.36.88-.59,1.83-1.52,2.14-3.93.35-2.67-.71-4.1-12.78-7.59-9.35-2.7-25-7.23-23-23.11a20.56,20.56,0,0,1,9-14.95c11.84-8,30.71-3.31,32.83-2.76a8,8,0,0,1-4.07,15.48c-4.49-1.17-15.23-2.56-19.83.56a4.54,4.54,0,0,0-2,3.67c-.12.9-.14,1.09,1.11,1.9,2.31,1.49,6.45,2.68,10.45,3.84C137.49,174.17,154.05,179,151.81,196.31ZM215.42,155l-19.89,55.68a8,8,0,0,1-15.06,0L160.58,155a8.21,8.21,0,0,1,4.5-10.45,8,8,0,0,1,10.45,4.76L188,184.21l12.47-34.9a8,8,0,0,1,10.45-4.76A8.23,8.23,0,0,1,215.42,155Z"}))],["light",no.createElement(no.Fragment,null,no.createElement("path",{d:"M46,180c0,12.13,8.07,22,18,22a16.24,16.24,0,0,0,11.67-5.28,6,6,0,0,1,8.66,8.3A28.06,28.06,0,0,1,64,214c-16.54,0-30-15.25-30-34s13.46-34,30-34a28.06,28.06,0,0,1,20.33,9,6,6,0,0,1-8.66,8.3A16.23,16.23,0,0,0,64,158C54.07,158,46,167.86,46,180Zm81.05-6.77c-10.86-3.13-13.41-4.69-13-7.91a6.59,6.59,0,0,1,2.88-5.08c5.6-3.79,17.66-1.82,21.45-.84a6,6,0,0,0,3.06-11.6c-2-.53-20.1-5-31.21,2.48a18.61,18.61,0,0,0-8.08,13.54c-1.8,14.19,12.26,18.25,21.57,20.94,12.12,3.5,14.78,5.33,14.2,9.76a6.85,6.85,0,0,1-3,5.34c-5.61,3.73-17.48,1.64-21.19.62A6,6,0,0,0,110.48,212a59.41,59.41,0,0,0,14.68,2c5.49,0,11.54-.95,16.36-4.14a18.89,18.89,0,0,0,8.31-13.81C151.84,180.39,136.92,176.08,127.05,173.22Zm83-26.88a6,6,0,0,0-7.67,3.63L188,190.15,173.65,150a6,6,0,1,0-11.3,4l20,56a6,6,0,0,0,11.3,0l20-56A6,6,0,0,0,210,146.34ZM214,88v24a6,6,0,1,1-12,0V94H152a6,6,0,0,1-6-6V38H56a2,2,0,0,0-2,2v72a6,6,0,1,1-12,0V40A14,14,0,0,1,56,26h96a6,6,0,0,1,4.24,1.76l56,56A6,6,0,0,1,214,88Zm-20.49-6L158,46.48V82Z"}))],["regular",no.createElement(no.Fragment,null,no.createElement("path",{d:"M48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.65,0-32-16.15-32-36s14.35-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.24,14.24,0,0,0,64,160C55.18,160,48,169,48,180Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84-1.25-.81-1.23-1-1.12-1.9a4.57,4.57,0,0,1,2-3.67c4.6-3.12,15.34-1.73,19.82-.56A8,8,0,0,0,142,145.86c-2.12-.55-21-5.22-32.84,2.76a20.58,20.58,0,0,0-9,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.34-2.14,3.93-4.6,3.06-15.17,1.56-19.55.36A8,8,0,0,0,109.94,214a61.34,61.34,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.82,20.82,0,0,0,9.19-15.23C154,179,137.49,174.17,127.6,171.31Zm83.09-26.84a8,8,0,0,0-10.23,4.84L188,184.21l-12.47-34.9a8,8,0,0,0-15.07,5.38l20,56a8,8,0,0,0,15.07,0l20-56A8,8,0,0,0,210.69,144.47ZM216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-27.31-8L160,51.31V80Z"}))],["thin",no.createElement(no.Fragment,null,no.createElement("path",{d:"M44,180c0,13.23,9,24,20,24a18.15,18.15,0,0,0,13.11-5.9,4,4,0,1,1,5.78,5.54A26.11,26.11,0,0,1,64,212c-15.44,0-28-14.36-28-32s12.56-32,28-32a26.11,26.11,0,0,1,18.89,8.36,4,4,0,1,1-5.78,5.54A18.15,18.15,0,0,0,64,156C53,156,44,166.77,44,180Zm82.49-4.85c-10.53-3-15.08-4.91-14.42-10.08a8.51,8.51,0,0,1,3.75-6.49c6.25-4.23,18.77-2.24,23.06-1.11a4,4,0,0,0,2-7.74,61.11,61.11,0,0,0-10.47-1.61c-8.12-.54-14.54.75-19.1,3.82a16.66,16.66,0,0,0-7.22,12.13c-1.58,12.49,10.46,16,20.14,18.77,11.26,3.25,16.47,5.49,15.64,11.94a8.94,8.94,0,0,1-3.91,6.75c-6.27,4.17-18.61,2.05-22.83.88a4,4,0,1,0-2.15,7.7A57.89,57.89,0,0,0,125.19,212c5.18,0,10.83-.86,15.22-3.77a17,17,0,0,0,7.43-12.41C149.64,181.84,136.26,178,126.49,175.15Zm82.85-26.92a4,4,0,0,0-5.11,2.42L188,196.11l-16.23-45.46a4,4,0,1,0-7.54,2.7l20,56a4,4,0,0,0,7.54,0l20-56A4,4,0,0,0,209.34,148.23ZM212,88v24a4,4,0,0,1-8,0V92H152a4,4,0,0,1-4-4V36H56a4,4,0,0,0-4,4v72a4,4,0,0,1-8,0V40A12,12,0,0,1,56,28h96a4,4,0,0,1,2.83,1.17l56,56A4,4,0,0,1,212,88Zm-13.66-4L156,41.65V84Z"}))]]);var ju=qu.forwardRef((e,t)=>qu.createElement(ye,{ref:t,...e,weights:Hy}));ju.displayName="FileCsvIcon";import*as Ku from"react";import*as so from"react";var Vy=new Map([["bold",so.createElement(so.Fragment,null,so.createElement("path",{d:"M114,145.34a12,12,0,0,0-20,0L79,167.82,72.3,157.73a12,12,0,0,0-20.07.17L13.91,217.51A12,12,0,0,0,24,236H152a12,12,0,0,0,10-18.66ZM46,212,62.5,186.3l6.55,9.81a12,12,0,0,0,20,0l15-22.48L129.58,212ZM216.49,79.51l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40v84a12,12,0,0,0,24,0V44h76V92a12,12,0,0,0,12,12h48V212a12,12,0,0,0,0,24h4a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.51ZM160,57l23,23H160Z"}))],["duotone",so.createElement(so.Fragment,null,so.createElement("path",{d:"M104,152l48,72H24l36-56,16.36,25.45ZM152,32V88h56Z",opacity:"0.2"}),so.createElement("path",{d:"M110.66,147.56a8,8,0,0,0-13.32,0L76.49,178.85l-9.76-15.18a8,8,0,0,0-13.46,0l-36,56A8,8,0,0,0,24,232H152a8,8,0,0,0,6.66-12.44ZM38.65,216,60,182.79l9.63,15a8,8,0,0,0,13.39.11l21-31.47L137.05,216Zm175-133.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v88a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"}))],["fill",so.createElement(so.Fragment,null,so.createElement("path",{d:"M158.66,219.56A8,8,0,0,1,152,232H24a8,8,0,0,1-6.73-12.33l36-56a8,8,0,0,1,13.46,0l9.76,15.18,20.85-31.29a8,8,0,0,1,13.32,0ZM216,88V216a16,16,0,0,1-16,16h-8a8,8,0,0,1,0-16h8V96H152a8,8,0,0,1-8-8V40H56v88a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Z"}))],["light",so.createElement(so.Fragment,null,so.createElement("path",{d:"M109,148.67a6,6,0,0,0-10,0L76.46,182.5,65.05,164.76a6,6,0,0,0-10.1,0l-36,56A6,6,0,0,0,24,230H152a6,6,0,0,0,5-9.33ZM35,218l25-38.9,11.32,17.6a6,6,0,0,0,10,.08l22.64-34L140.79,218ZM212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40v88a6,6,0,0,0,12,0V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216a2,2,0,0,1-2,2h-8a6,6,0,0,0,0,12h8a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158Z"}))],["regular",so.createElement(so.Fragment,null,so.createElement("path",{d:"M110.66,147.56a8,8,0,0,0-13.32,0L76.49,178.85l-9.76-15.18a8,8,0,0,0-13.46,0l-36,56A8,8,0,0,0,24,232H152a8,8,0,0,0,6.66-12.44ZM38.65,216,60,182.79l9.63,15a8,8,0,0,0,13.39.11l21-31.47L137.05,216Zm175-133.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v88a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"}))],["thin",so.createElement(so.Fragment,null,so.createElement("path",{d:"M107.33,149.78a4,4,0,0,0-6.66,0L76.42,186.15,63.36,165.84a4,4,0,0,0-6.72,0l-36,56A4,4,0,0,0,24,228H152a4,4,0,0,0,3.33-6.22ZM31.33,220,60,175.4l13,20.22a4,4,0,0,0,3.33,1.83,3.93,3.93,0,0,0,3.36-1.78L104,159.21,144.53,220ZM210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40v88a4,4,0,0,0,8,0V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216a4,4,0,0,1-4,4h-8a4,4,0,0,0,0,8h8a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156Z"}))]]);var Yu=Ku.forwardRef((e,t)=>Ku.createElement(ye,{ref:t,...e,weights:Vy}));Yu.displayName="FileImageIcon";import*as Xu from"react";import*as io from"react";var By=new Map([["bold",io.createElement(io.Fragment,null,io.createElement("path",{d:"M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Zm112-80a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,132Zm0,40a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,172Z"}))],["duotone",io.createElement(io.Fragment,null,io.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),io.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"}))],["fill",io.createElement(io.Fragment,null,io.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,176H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm-8-56V44l44,44Z"}))],["light",io.createElement(io.Fragment,null,io.createElement("path",{d:"M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158ZM200,218H56a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216A2,2,0,0,1,200,218Zm-34-82a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,136Zm0,32a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,168Z"}))],["regular",io.createElement(io.Fragment,null,io.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"}))],["thin",io.createElement(io.Fragment,null,io.createElement("path",{d:"M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40V216a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM200,220H56a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216A4,4,0,0,1,200,220Zm-36-84a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h64A4,4,0,0,1,164,136Zm0,32a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h64A4,4,0,0,1,164,168Z"}))]]);var Qu=Xu.forwardRef((e,t)=>Xu.createElement(ye,{ref:t,...e,weights:By}));Qu.displayName="FileTextIcon";import*as Ju from"react";import*as lo from"react";var _y=new Map([["bold",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M216.49,79.51l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40v68a12,12,0,0,0,24,0V44h76V92a12,12,0,0,0,12,12h48V212a12,12,0,0,0,0,24h4a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.51ZM160,57l23,23H160Zm-1.91,84.69a12,12,0,0,0-11.92-.15L126.5,152.44A20,20,0,0,0,108,140H48a20,20,0,0,0-20,20v48a20,20,0,0,0,20,20h60a20,20,0,0,0,18.5-12.44l19.67,10.93A12,12,0,0,0,164,216V152A12,12,0,0,0,158.09,141.66ZM104,204H52V164h52Zm36-8.39-12-6.67v-9.88l12-6.67Z"}))],["duotone",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M208,88H152V32Zm-88,72a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V196l32,20V152l-32,20Z",opacity:"0.2"}),lo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM155.88,145a8,8,0,0,0-8.12.22l-19.95,12.46A16,16,0,0,0,112,144H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h64a16,16,0,0,0,15.81-13.68l19.95,12.46A8,8,0,0,0,160,216V152A8,8,0,0,0,155.88,145ZM112,208H48V160h64v48Zm32-6.43-16-10V176.43l16-10Z"}))],["fill",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM155.88,145a8,8,0,0,0-8.12.22l-19.95,12.46A16,16,0,0,0,112,144H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h64a16,16,0,0,0,15.81-13.68l19.95,12.46A8,8,0,0,0,160,216V152A8,8,0,0,0,155.88,145ZM144,201.57l-16-10V176.43l16-10Z"}))],["light",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40v72a6,6,0,0,0,12,0V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216a2,2,0,0,1-2,2h-8a6,6,0,0,0,0,12h8a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158Zm-3.09,100.27a6,6,0,0,0-6.09.16L126,161.17V160a14,14,0,0,0-14-14H48a14,14,0,0,0-14,14v48a14,14,0,0,0,14,14h64a14,14,0,0,0,14-14v-1.17l22.82,14.26A6,6,0,0,0,158,216V152A6,6,0,0,0,154.91,146.75ZM114,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V160a2,2,0,0,1,2-2h64a2,2,0,0,1,2,2Zm32-2.83-20-12.5V175.33l20-12.5Z"}))],["regular",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM155.88,145a8,8,0,0,0-8.12.22l-19.95,12.46A16,16,0,0,0,112,144H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h64a16,16,0,0,0,15.81-13.68l19.95,12.46A8,8,0,0,0,160,216V152A8,8,0,0,0,155.88,145ZM112,208H48V160h64v48Zm32-6.43-16-10V176.43l16-10Z"}))],["thin",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40v72a4,4,0,0,0,8,0V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216a4,4,0,0,1-4,4h-8a4,4,0,0,0,0,8h8a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM153.94,148.5a4,4,0,0,0-4.06.11L124,164.78V160a12,12,0,0,0-12-12H48a12,12,0,0,0-12,12v48a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12v-4.78l25.88,16.17A4,4,0,0,0,152,220a4.06,4.06,0,0,0,1.94-.5A4,4,0,0,0,156,216V152A4,4,0,0,0,153.94,148.5ZM116,208a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V160a4,4,0,0,1,4-4h64a4,4,0,0,1,4,4Zm32,.78-24-15V174.22l24-15Z"}))]]);var ed=Ju.forwardRef((e,t)=>Ju.createElement(ye,{ref:t,...e,weights:_y}));ed.displayName="FileVideoIcon";import*as td from"react";import*as co from"react";var Zy=new Map([["bold",co.createElement(co.Fragment,null,co.createElement("path",{d:"M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,187a113.4,113.4,0,0,1-20.39-35h40.82a116.94,116.94,0,0,1-10,20.77A108.61,108.61,0,0,1,128,207Zm-26.49-59a135.42,135.42,0,0,1,0-40h53a135.42,135.42,0,0,1,0,40ZM44,128a83.49,83.49,0,0,1,2.43-20H77.25a160.63,160.63,0,0,0,0,40H46.43A83.49,83.49,0,0,1,44,128Zm84-79a113.4,113.4,0,0,1,20.39,35H107.59a116.94,116.94,0,0,1,10-20.77A108.61,108.61,0,0,1,128,49Zm50.73,59h30.82a83.52,83.52,0,0,1,0,40H178.75a160.63,160.63,0,0,0,0-40Zm20.77-24H173.71a140.82,140.82,0,0,0-15.5-34.36A84.51,84.51,0,0,1,199.52,84ZM97.79,49.64A140.82,140.82,0,0,0,82.29,84H56.48A84.51,84.51,0,0,1,97.79,49.64ZM56.48,172H82.29a140.82,140.82,0,0,0,15.5,34.36A84.51,84.51,0,0,1,56.48,172Zm101.73,34.36A140.82,140.82,0,0,0,173.71,172h25.81A84.51,84.51,0,0,1,158.21,206.36Z"}))],["duotone",co.createElement(co.Fragment,null,co.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),co.createElement("path",{d:"M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"}))],["fill",co.createElement(co.Fragment,null,co.createElement("path",{d:"M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm78.36,64H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM216,128a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM128,43a115.27,115.27,0,0,1,26,45H102A115.11,115.11,0,0,1,128,43ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48Zm50.35,61.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"}))],["light",co.createElement(co.Fragment,null,co.createElement("path",{d:"M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm81.57,64H169.19a132.58,132.58,0,0,0-25.73-50.67A90.29,90.29,0,0,1,209.57,90ZM218,128a89.7,89.7,0,0,1-3.83,26H171.81a155.43,155.43,0,0,0,0-52h42.36A89.7,89.7,0,0,1,218,128Zm-90,87.83a110,110,0,0,1-15.19-19.45A124.24,124.24,0,0,1,99.35,166h57.3a124.24,124.24,0,0,1-13.46,30.38A110,110,0,0,1,128,215.83ZM96.45,154a139.18,139.18,0,0,1,0-52h63.1a139.18,139.18,0,0,1,0,52ZM38,128a89.7,89.7,0,0,1,3.83-26H84.19a155.43,155.43,0,0,0,0,52H41.83A89.7,89.7,0,0,1,38,128Zm90-87.83a110,110,0,0,1,15.19,19.45A124.24,124.24,0,0,1,156.65,90H99.35a124.24,124.24,0,0,1,13.46-30.38A110,110,0,0,1,128,40.17Zm-15.46-.84A132.58,132.58,0,0,0,86.81,90H46.43A90.29,90.29,0,0,1,112.54,39.33ZM46.43,166H86.81a132.58,132.58,0,0,0,25.73,50.67A90.29,90.29,0,0,1,46.43,166Zm97,50.67A132.58,132.58,0,0,0,169.19,166h40.38A90.29,90.29,0,0,1,143.46,216.67Z"}))],["regular",co.createElement(co.Fragment,null,co.createElement("path",{d:"M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"}))],["thin",co.createElement(co.Fragment,null,co.createElement("path",{d:"M128,28h0A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,190.61c-6.33-6.09-23-24.41-31.27-54.61h62.54C151,194.2,134.33,212.52,128,218.61ZM94.82,156a140.42,140.42,0,0,1,0-56h66.36a140.42,140.42,0,0,1,0,56ZM128,37.39c6.33,6.09,23,24.41,31.27,54.61H96.73C105,61.8,121.67,43.48,128,37.39ZM169.41,100h46.23a92.09,92.09,0,0,1,0,56H169.41a152.65,152.65,0,0,0,0-56Zm43.25-8h-45a129.39,129.39,0,0,0-29.19-55.4A92.25,92.25,0,0,1,212.66,92ZM117.54,36.6A129.39,129.39,0,0,0,88.35,92h-45A92.25,92.25,0,0,1,117.54,36.6ZM40.36,100H86.59a152.65,152.65,0,0,0,0,56H40.36a92.09,92.09,0,0,1,0-56Zm3,64h45a129.39,129.39,0,0,0,29.19,55.4A92.25,92.25,0,0,1,43.34,164Zm95.12,55.4A129.39,129.39,0,0,0,167.65,164h45A92.25,92.25,0,0,1,138.46,219.4Z"}))]]);var od=td.forwardRef((e,t)=>td.createElement(ye,{ref:t,...e,weights:Zy}));od.displayName="GlobeIcon";import*as ad from"react";import*as uo from"react";var Gy=new Map([["bold",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M214,193.68,145.35,128,214,62.32l.18-.18A20,20,0,0,0,200,28H56A20,20,0,0,0,41.87,62.14l.18.18L110.65,128l-68.6,65.68-.18.18A20,20,0,0,0,56,228H200a20,20,0,0,0,14.14-34.14ZM107.75,92h40.5L128,111.39ZM190,52,173.31,68H82.69L66,52ZM66,204l50-47.9V168a12,12,0,0,0,24,0V156.1L190,204Z"}))],["duotone",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M178.13,80,128,128,77.87,80Z",opacity:"0.2"}),uo.createElement("path",{d:"M211.18,196.56,139.57,128l71.61-68.56a1.59,1.59,0,0,1,.13-.13A16,16,0,0,0,200,32H56A16,16,0,0,0,44.69,59.31a1.59,1.59,0,0,1,.13.13L116.43,128,44.82,196.56a1.59,1.59,0,0,1-.13.13A16,16,0,0,0,56,224H200a16,16,0,0,0,11.32-27.31A1.59,1.59,0,0,1,211.18,196.56ZM56,48h0v0ZM97.79,88h60.42L128,116.92ZM200,48,174.92,72H81.08L56,48ZM56,208l64-61.26V168a8,8,0,0,0,16,0V146.74L200,208Z"}))],["fill",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M211.18,196.56,139.57,128l71.61-68.56a1.59,1.59,0,0,1,.13-.13A16,16,0,0,0,200,32H56A16,16,0,0,0,44.69,59.31a1.59,1.59,0,0,1,.13.13L116.43,128,44.82,196.56a1.59,1.59,0,0,1-.13.13A16,16,0,0,0,56,224H200a16,16,0,0,0,11.32-27.31A1.59,1.59,0,0,1,211.18,196.56ZM56,48h0v0Zm144,0L174.92,72H81.08L56,48ZM56,208l64-61.26V168a8,8,0,0,0,16,0V146.74L200,208Z"}))],["light",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M209.8,198l-73.12-70L209.8,58l.09-.09A14,14,0,0,0,200,34H56a14,14,0,0,0-9.9,23.9l.09.09,73.12,70L46.2,198l-.09.09A14,14,0,0,0,56,222H200a14,14,0,0,0,9.9-23.9ZM92.81,86h70.38L128,119.69ZM54.16,47.23A1.91,1.91,0,0,1,56,46H200a2,2,0,0,1,1.45,3.38L175.72,74H80.28L54.56,49.38A1.91,1.91,0,0,1,54.16,47.23ZM201.84,208.77A1.91,1.91,0,0,1,200,210H56a2,2,0,0,1-1.45-3.38L122,142.05V168a6,6,0,0,0,12,0V142.05l67.44,64.57A1.91,1.91,0,0,1,201.84,208.77Z"}))],["regular",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M211.18,196.56,139.57,128l71.61-68.56a1.59,1.59,0,0,1,.13-.13A16,16,0,0,0,200,32H56A16,16,0,0,0,44.7,59.31l.12.13L116.43,128,44.82,196.56l-.12.13A16,16,0,0,0,56,224H200a16,16,0,0,0,11.32-27.31A1.59,1.59,0,0,1,211.18,196.56ZM56,48h0v0ZM97.79,88h60.42L128,116.92ZM200,48,174.92,72H81.08L56,48ZM56,208l64-61.26V168a8,8,0,0,0,16,0V146.74L200,208Z"}))],["thin",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M133.78,128l74.68-71.51A12,12,0,0,0,200,36H56a12,12,0,0,0-8.49,20.49l.07.06L122.22,128,47.61,199.45l-.07.06A12,12,0,0,0,56,220H200a12,12,0,0,0,8.42-20.55ZM87.84,84h80.32L128,122.46ZM52.33,46.47A3.93,3.93,0,0,1,56,44H200a4,4,0,0,1,2.89,6.77L176.51,76h-97L53.17,50.8A3.92,3.92,0,0,1,52.33,46.47ZM203.67,209.53A3.93,3.93,0,0,1,200,212H56a4,4,0,0,1-2.86-6.8L124,137.37V168a4,4,0,0,0,8,0V137.37l70.8,67.8A3.93,3.93,0,0,1,203.67,209.53Z"}))]]);var rd=ad.forwardRef((e,t)=>ad.createElement(ye,{ref:t,...e,weights:Gy}));rd.displayName="HourglassSimpleMediumIcon";import*as nd from"react";import*as po from"react";var Uy=new Map([["bold",po.createElement(po.Fragment,null,po.createElement("path",{d:"M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"}))],["duotone",po.createElement(po.Fragment,null,po.createElement("path",{d:"M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z",opacity:"0.2"}),po.createElement("path",{d:"M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"}))],["fill",po.createElement(po.Fragment,null,po.createElement("path",{d:"M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z"}))],["light",po.createElement(po.Fragment,null,po.createElement("path",{d:"M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z"}))],["regular",po.createElement(po.Fragment,null,po.createElement("path",{d:"M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"}))],["thin",po.createElement(po.Fragment,null,po.createElement("path",{d:"M226.83,221.17l-52.7-52.7a84.1,84.1,0,1,0-5.66,5.66l52.7,52.7a4,4,0,0,0,5.66-5.66ZM36,112a76,76,0,1,1,76,76A76.08,76.08,0,0,1,36,112Z"}))]]);var sd=nd.forwardRef((e,t)=>nd.createElement(ye,{ref:t,...e,weights:Uy}));sd.displayName="MagnifyingGlassIcon";import*as id from"react";import*as mo from"react";var $y=new Map([["bold",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M128,180a52.06,52.06,0,0,0,52-52V64A52,52,0,0,0,76,64v64A52.06,52.06,0,0,0,128,180ZM100,64a28,28,0,0,1,56,0v64a28,28,0,0,1-56,0Zm40,155.22V240a12,12,0,0,1-24,0V219.22A92.14,92.14,0,0,1,36,128a12,12,0,0,1,24,0,68,68,0,0,0,136,0,12,12,0,0,1,24,0A92.14,92.14,0,0,1,140,219.22Z"}))],["duotone",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M168,64v64a40,40,0,0,1-40,40h0a40,40,0,0,1-40-40V64a40,40,0,0,1,40-40h0A40,40,0,0,1,168,64Z",opacity:"0.2"}),mo.createElement("path",{d:"M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"}))],["fill",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M80,128V64a48,48,0,0,1,96,0v64a48,48,0,0,1-96,0Zm128,0a8,8,0,0,0-16,0,64,64,0,0,1-128,0,8,8,0,0,0-16,0,80.11,80.11,0,0,0,72,79.6V240a8,8,0,0,0,16,0V207.6A80.11,80.11,0,0,0,208,128Z"}))],["light",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M128,174a46.06,46.06,0,0,0,46-46V64a46,46,0,0,0-92,0v64A46.06,46.06,0,0,0,128,174ZM94,64a34,34,0,0,1,68,0v64a34,34,0,0,1-68,0Zm40,141.75V240a6,6,0,0,1-12,0V205.75A78.09,78.09,0,0,1,50,128a6,6,0,0,1,12,0,66,66,0,0,0,132,0,6,6,0,0,1,12,0A78.09,78.09,0,0,1,134,205.75Z"}))],["regular",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"}))],["thin",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M128,172a44.05,44.05,0,0,0,44-44V64a44,44,0,0,0-88,0v64A44.05,44.05,0,0,0,128,172ZM92,64a36,36,0,0,1,72,0v64a36,36,0,0,1-72,0Zm40,139.89V240a4,4,0,0,1-8,0V203.89A76.09,76.09,0,0,1,52,128a4,4,0,0,1,8,0,68,68,0,0,0,136,0,4,4,0,0,1,8,0A76.09,76.09,0,0,1,132,203.89Z"}))]]);var ld=id.forwardRef((e,t)=>id.createElement(ye,{ref:t,...e,weights:$y}));ld.displayName="MicrophoneIcon";import*as cd from"react";import*as fo from"react";var Wy=new Map([["bold",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M56.88,39.93A12,12,0,1,0,39.12,56.07L76,96.64V128a52,52,0,0,0,72.11,48l11.26,12.39A67.34,67.34,0,0,1,128,196a68.07,68.07,0,0,1-68-68,12,12,0,0,0-24,0,92.14,92.14,0,0,0,80,91.22V240a12,12,0,0,0,24,0V219.23a90.39,90.39,0,0,0,35.92-12.68l23.2,25.52a12,12,0,0,0,17.76-16.14ZM128,156a28,28,0,0,1-28-28v-5l29.9,32.89C129.27,156,128.64,156,128,156Zm63-2.42A67.63,67.63,0,0,0,196,128a12,12,0,0,1,24,0,91.48,91.48,0,0,1-6.74,34.61,12,12,0,0,1-22.23-9ZM85.7,33.75A52,52,0,0,1,180,64v56.54a12,12,0,0,1-24,0V64a28,28,0,0,0-50.79-16.28,12,12,0,0,1-19.51-14Z"}))],["duotone",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M168,64v64a40,40,0,0,1-40,40h0a40,40,0,0,1-40-40V64a40,40,0,0,1,40-40h0A40,40,0,0,1,168,64Z",opacity:"0.2"}),fo.createElement("path",{d:"M213.92,218.62l-160-176A8,8,0,0,0,42.08,53.38L80,95.09V128a48,48,0,0,0,69.11,43.12l11.1,12.2A63.41,63.41,0,0,1,128,192a64.07,64.07,0,0,1-64-64,8,8,0,0,0-16,0,80.11,80.11,0,0,0,72,79.6V240a8,8,0,0,0,16,0V207.59a78.83,78.83,0,0,0,35.16-12.22l30.92,34a8,8,0,1,0,11.84-10.76ZM128,160a32,32,0,0,1-32-32V112.69l41.66,45.82A32,32,0,0,1,128,160Zm57.52-3.91A63.32,63.32,0,0,0,192,128a8,8,0,0,1,16,0,79.16,79.16,0,0,1-8.11,35.12,8,8,0,0,1-7.19,4.49,7.88,7.88,0,0,1-3.51-.82A8,8,0,0,1,185.52,156.09ZM84,44.87A48,48,0,0,1,176,64v64a49.19,49.19,0,0,1-.26,5,8,8,0,0,1-8,7.17,8.13,8.13,0,0,1-.84,0,8,8,0,0,1-7.12-8.79c.11-1.1.17-2.24.17-3.36V64A32,32,0,0,0,98.64,51.25,8,8,0,1,1,84,44.87Z"}))],["fill",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M213.38,229.92a8,8,0,0,1-11.3-.54l-30.92-34A78.83,78.83,0,0,1,136,207.59V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64.07,64.07,0,0,0,64,64,63.41,63.41,0,0,0,32.21-8.68l-11.1-12.2A48,48,0,0,1,80,128V95.09L42.08,53.38A8,8,0,0,1,53.92,42.62l160,176A8,8,0,0,1,213.38,229.92Zm-24.19-63.13a7.88,7.88,0,0,0,3.51.82,8,8,0,0,0,7.19-4.49A79.16,79.16,0,0,0,208,128a8,8,0,0,0-16,0,63.32,63.32,0,0,1-6.48,28.09A8,8,0,0,0,189.19,166.79Zm-27.33-29.22A8,8,0,0,0,175.74,133a49.49,49.49,0,0,0,.26-5V64A48,48,0,0,0,84,44.87a8,8,0,0,0,1.41,8.57Z"}))],["light",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M212.44,220,52.44,44A6,6,0,0,0,43.56,52L82,94.32V128a46,46,0,0,0,67.56,40.64l13.75,15.12A65.26,65.26,0,0,1,128,194a66.08,66.08,0,0,1-66-66,6,6,0,0,0-12,0,78.09,78.09,0,0,0,72,77.75V240a6,6,0,0,0,12,0V205.77a76.93,76.93,0,0,0,37.48-13L203.56,228a6,6,0,0,0,8.88-8.08ZM128,162a34,34,0,0,1-34-34V107.52l47.12,51.84A33.82,33.82,0,0,1,128,162Zm59.32-5A65.38,65.38,0,0,0,194,128a6,6,0,0,1,12,0,77.33,77.33,0,0,1-7.9,34.25A6,6,0,1,1,187.32,157ZM85.8,45.67A46,46,0,0,1,174,64v64a45.17,45.17,0,0,1-.25,4.81,6,6,0,0,1-6,5.38q-.31,0-.63,0a6,6,0,0,1-5.34-6.59A35.41,35.41,0,0,0,162,128V64A34,34,0,0,0,96.8,50.45a6,6,0,0,1-11-4.78Z"}))],["regular",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M213.92,218.62l-160-176A8,8,0,0,0,42.08,53.38L80,95.09V128a48,48,0,0,0,69.11,43.12l11.1,12.2A63.41,63.41,0,0,1,128,192a64.07,64.07,0,0,1-64-64,8,8,0,0,0-16,0,80.11,80.11,0,0,0,72,79.6V240a8,8,0,0,0,16,0V207.59a78.83,78.83,0,0,0,35.16-12.22l30.92,34a8,8,0,1,0,11.84-10.76ZM128,160a32,32,0,0,1-32-32V112.69l41.66,45.82A32,32,0,0,1,128,160Zm57.52-3.91A63.32,63.32,0,0,0,192,128a8,8,0,0,1,16,0,79.16,79.16,0,0,1-8.11,35.12,8,8,0,0,1-7.19,4.49,7.88,7.88,0,0,1-3.51-.82A8,8,0,0,1,185.52,156.09ZM84,44.87A48,48,0,0,1,176,64v64a49.19,49.19,0,0,1-.26,5,8,8,0,0,1-8,7.17,8.13,8.13,0,0,1-.84,0,8,8,0,0,1-7.12-8.79c.11-1.1.17-2.24.17-3.36V64A32,32,0,0,0,98.64,51.25,8,8,0,1,1,84,44.87Z"}))],["thin",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M211,221.31,51,45.31A4,4,0,0,0,45,50.69L84,93.55V128a44,44,0,0,0,66,38.12l16.38,18A67.21,67.21,0,0,1,128,196a68.07,68.07,0,0,1-68-68,4,4,0,0,0-8,0,76.09,76.09,0,0,0,72,75.89V240a4,4,0,0,0,8,0V203.89a75.1,75.1,0,0,0,39.79-13.77L205,226.69a4,4,0,1,0,5.92-5.38ZM128,164a36,36,0,0,1-36-36V102.35L144.43,160A35.83,35.83,0,0,1,128,164Zm61.12-6.15A67.44,67.44,0,0,0,196,128a4,4,0,0,1,8,0,75.28,75.28,0,0,1-7.7,33.37,4,4,0,0,1-7.18-3.52ZM87.63,46.46A44,44,0,0,1,172,64v64a44.2,44.2,0,0,1-.24,4.61,4,4,0,0,1-4,3.58l-.42,0a4,4,0,0,1-3.57-4.39A36.67,36.67,0,0,0,164,128V64A36,36,0,0,0,95,49.66a4,4,0,0,1-7.34-3.2Z"}))]]);var ud=cd.forwardRef((e,t)=>cd.createElement(ye,{ref:t,...e,weights:Wy}));ud.displayName="MicrophoneSlashIcon";import*as dd from"react";import*as go from"react";var qy=new Map([["bold",go.createElement(go.Fragment,null,go.createElement("path",{d:"M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"}))],["duotone",go.createElement(go.Fragment,null,go.createElement("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",opacity:"0.2"}),go.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"}))],["fill",go.createElement(go.Fragment,null,go.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z"}))],["light",go.createElement(go.Fragment,null,go.createElement("path",{d:"M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Z"}))],["regular",go.createElement(go.Fragment,null,go.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"}))],["thin",go.createElement(go.Fragment,null,go.createElement("path",{d:"M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128Z"}))]]);var pd=dd.forwardRef((e,t)=>dd.createElement(ye,{ref:t,...e,weights:qy}));pd.displayName="MinusIcon";import*as md from"react";import*as ho from"react";var jy=new Map([["bold",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"}))],["duotone",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",opacity:"0.2"}),ho.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"}))],["fill",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"}))],["light",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z"}))],["regular",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"}))],["thin",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z"}))]]);var fd=md.forwardRef((e,t)=>md.createElement(ye,{ref:t,...e,weights:jy}));fd.displayName="PlusIcon";import*as gd from"react";import*as bo from"react";var Ky=new Map([["bold",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M72,104a16,16,0,1,1,16,16A16,16,0,0,1,72,104Zm96,16a16,16,0,1,0-16-16A16,16,0,0,0,168,120Zm68-40V192a36,36,0,0,1-36,36H56a36,36,0,0,1-36-36V80A36,36,0,0,1,56,44h60V16a12,12,0,0,1,24,0V44h60A36,36,0,0,1,236,80Zm-24,0a12,12,0,0,0-12-12H56A12,12,0,0,0,44,80V192a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12Zm-12,82a30,30,0,0,1-30,30H86a30,30,0,0,1,0-60h84A30,30,0,0,1,200,162Zm-80-6v12h16V156ZM86,168H96V156H86a6,6,0,0,0,0,12Zm90-6a6,6,0,0,0-6-6H160v12h10A6,6,0,0,0,176,162Z"}))],["duotone",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M200,56H56A24,24,0,0,0,32,80V192a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24V80A24,24,0,0,0,200,56ZM164,184H92a20,20,0,0,1,0-40h72a20,20,0,0,1,0,40Z",opacity:"0.2"}),bo.createElement("path",{d:"M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Zm4,28H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24Z"}))],["fill",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM172,96a12,12,0,1,1-12,12A12,12,0,0,1,172,96ZM96,184H80a16,16,0,0,1,0-32H96ZM84,120a12,12,0,1,1,12-12A12,12,0,0,1,84,120Zm60,64H112V152h32Zm32,0H160V152h16a16,16,0,0,1,0,32Z"}))],["light",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M200,50H134V16a6,6,0,0,0-12,0V50H56A30,30,0,0,0,26,80V192a30,30,0,0,0,30,30H200a30,30,0,0,0,30-30V80A30,30,0,0,0,200,50Zm18,142a18,18,0,0,1-18,18H56a18,18,0,0,1-18-18V80A18,18,0,0,1,56,62H200a18,18,0,0,1,18,18ZM74,108a10,10,0,1,1,10,10A10,10,0,0,1,74,108Zm88,0a10,10,0,1,1,10,10A10,10,0,0,1,162,108Zm2,30H92a26,26,0,0,0,0,52h72a26,26,0,0,0,0-52Zm-22,12v28H114V150ZM78,164a14,14,0,0,1,14-14h10v28H92A14,14,0,0,1,78,164Zm86,14H154V150h10a14,14,0,0,1,0,28Z"}))],["regular",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"}))],["thin",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M200,52H132V16a4,4,0,0,0-8,0V52H56A28,28,0,0,0,28,80V192a28,28,0,0,0,28,28H200a28,28,0,0,0,28-28V80A28,28,0,0,0,200,52Zm20,140a20,20,0,0,1-20,20H56a20,20,0,0,1-20-20V80A20,20,0,0,1,56,60H200a20,20,0,0,1,20,20ZM76,108a8,8,0,1,1,8,8A8,8,0,0,1,76,108Zm88,0a8,8,0,1,1,8,8A8,8,0,0,1,164,108Zm0,32H92a24,24,0,0,0,0,48h72a24,24,0,0,0,0-48Zm-20,8v32H112V148ZM76,164a16,16,0,0,1,16-16h12v32H92A16,16,0,0,1,76,164Zm88,16H152V148h12a16,16,0,0,1,0,32Z"}))]]);var hd=gd.forwardRef((e,t)=>gd.createElement(ye,{ref:t,...e,weights:Ky}));hd.displayName="RobotIcon";import*as bd from"react";import*as yo from"react";var Yy=new Map([["bold",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,176H52V52H204Z"}))],["duotone",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z",opacity:"0.2"}),yo.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"}))],["fill",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48Z"}))],["light",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M208,34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34Zm2,174a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Z"}))],["regular",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"}))],["thin",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M208,36H48A12,12,0,0,0,36,48V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V48A12,12,0,0,0,208,36Zm4,172a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H208a4,4,0,0,1,4,4Z"}))]]);var yd=bd.forwardRef((e,t)=>bd.createElement(ye,{ref:t,...e,weights:Yy}));yd.displayName="SquareIcon";import*as wd from"react";import*as wo from"react";var Xy=new Map([["bold",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44ZM44,116H76v24H44Zm56,0H212v24H100ZM212,68V92H44V68ZM44,164H76v24H44Zm56,24V164H212v24Z"}))],["duotone",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M88,104v96H32V104Z",opacity:"0.2"}),wo.createElement("path",{d:"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"}))],["fill",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM40,160H80v32H40Zm176,32H96V160H216v32Z"}))],["light",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M224,50H32a6,6,0,0,0-6,6V192a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A6,6,0,0,0,224,50ZM38,110H82v36H38Zm56,0H218v36H94ZM218,62V98H38V62ZM38,192V158H82v36H40A2,2,0,0,1,38,192Zm178,2H94V158H218v34A2,2,0,0,1,216,194Z"}))],["regular",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"}))],["thin",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M224,52H32a4,4,0,0,0-4,4V192a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A4,4,0,0,0,224,52ZM36,108H84v40H36Zm56,0H220v40H92ZM220,60v40H36V60ZM36,192V156H84v40H40A4,4,0,0,1,36,192Zm180,4H92V156H220v36A4,4,0,0,1,216,196Z"}))]]);var xd=wd.forwardRef((e,t)=>wd.createElement(ye,{ref:t,...e,weights:Xy}));xd.displayName="TableIcon";import*as vd from"react";import*as xo from"react";var Qy=new Map([["bold",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M72.5,150.63,100.79,128,72.5,105.37a12,12,0,1,1,15-18.74l40,32a12,12,0,0,1,0,18.74l-40,32a12,12,0,0,1-15-18.74ZM144,172h32a12,12,0,0,0,0-24H144a12,12,0,0,0,0,24ZM236,56V200a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V56A20,20,0,0,1,40,36H216A20,20,0,0,1,236,56Zm-24,4H44V196H212Z"}))],["duotone",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M224,56V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z",opacity:"0.2"}),xo.createElement("path",{d:"M128,128a8,8,0,0,1-3,6.25l-40,32a8,8,0,1,1-10-12.5L107.19,128,75,102.25a8,8,0,1,1,10-12.5l40,32A8,8,0,0,1,128,128Zm48,24H136a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm56-96V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z"}))],["fill",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-91,94.25-40,32a8,8,0,1,1-10-12.5L107.19,128,75,102.25a8,8,0,1,1,10-12.5l40,32a8,8,0,0,1,0,12.5ZM176,168H136a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Z"}))],["light",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M126,128a6,6,0,0,1-2.25,4.69l-40,32a6,6,0,0,1-7.5-9.38L110.4,128,76.25,100.69a6,6,0,1,1,7.5-9.38l40,32A6,6,0,0,1,126,128Zm50,26H136a6,6,0,0,0,0,12h40a6,6,0,0,0,0-12Zm54-98V200a14,14,0,0,1-14,14H40a14,14,0,0,1-14-14V56A14,14,0,0,1,40,42H216A14,14,0,0,1,230,56Zm-12,0a2,2,0,0,0-2-2H40a2,2,0,0,0-2,2V200a2,2,0,0,0,2,2H216a2,2,0,0,0,2-2Z"}))],["regular",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M128,128a8,8,0,0,1-3,6.25l-40,32a8,8,0,1,1-10-12.5L107.19,128,75,102.25a8,8,0,1,1,10-12.5l40,32A8,8,0,0,1,128,128Zm48,24H136a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm56-96V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z"}))],["thin",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M122.5,124.88a4,4,0,0,1,0,6.24l-40,32a4,4,0,0,1-5-6.24L113.6,128,77.5,99.12a4,4,0,0,1,5-6.24ZM176,156H136a4,4,0,0,0,0,8h40a4,4,0,0,0,0-8ZM228,56V200a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V56A12,12,0,0,1,40,44H216A12,12,0,0,1,228,56Zm-8,0a4,4,0,0,0-4-4H40a4,4,0,0,0-4,4V200a4,4,0,0,0,4,4H216a4,4,0,0,0,4-4Z"}))]]);var Id=vd.forwardRef((e,t)=>vd.createElement(ye,{ref:t,...e,weights:Qy}));Id.displayName="TerminalWindowIcon";import*as Cd from"react";import*as vo from"react";var Jy=new Map([["bold",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z"}))],["duotone",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22c6.3-11,22.52-11,28.82,0l87.46,151.87C236,202.79,228.08,216,215.46,216Z",opacity:"0.2"}),vo.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"}))],["fill",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"}))],["light",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M235.07,189.09,147.61,37.22h0a22.75,22.75,0,0,0-39.22,0L20.93,189.09a21.53,21.53,0,0,0,0,21.72A22.35,22.35,0,0,0,40.55,222h174.9a22.35,22.35,0,0,0,19.6-11.19A21.53,21.53,0,0,0,235.07,189.09ZM224.66,204.8a10.46,10.46,0,0,1-9.21,5.2H40.55a10.46,10.46,0,0,1-9.21-5.2,9.51,9.51,0,0,1,0-9.72L118.79,43.21a10.75,10.75,0,0,1,18.42,0l87.46,151.87A9.51,9.51,0,0,1,224.66,204.8ZM122,144V104a6,6,0,0,1,12,0v40a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,180Z"}))],["regular",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"}))],["thin",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M233.34,190.09,145.88,38.22h0a20.75,20.75,0,0,0-35.76,0L22.66,190.09a19.52,19.52,0,0,0,0,19.71A20.36,20.36,0,0,0,40.54,220H215.46a20.36,20.36,0,0,0,17.86-10.2A19.52,19.52,0,0,0,233.34,190.09ZM226.4,205.8a12.47,12.47,0,0,1-10.94,6.2H40.54a12.47,12.47,0,0,1-10.94-6.2,11.45,11.45,0,0,1,0-11.72L117.05,42.21a12.76,12.76,0,0,1,21.9,0L226.4,194.08A11.45,11.45,0,0,1,226.4,205.8ZM124,144V104a4,4,0,0,1,8,0v40a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,180Z"}))]]);var Rd=Cd.forwardRef((e,t)=>Cd.createElement(ye,{ref:t,...e,weights:Jy}));Rd.displayName="WarningIcon";import*as Sd from"react";import*as Io from"react";var ew=new Map([["bold",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"}))],["duotone",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",opacity:"0.2"}),Io.createElement("path",{d:"M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}))],["fill",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}))],["light",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"}))],["regular",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}))],["thin",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z"}))]]);var kd=Sd.forwardRef((e,t)=>Sd.createElement(ye,{ref:t,...e,weights:ew}));kd.displayName="XIcon";import*as Md from"react";import*as Co from"react";var tw=new Map([["bold",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M168.49,104.49,145,128l23.52,23.51a12,12,0,0,1-17,17L128,145l-23.51,23.52a12,12,0,0,1-17-17L111,128,87.51,104.49a12,12,0,0,1,17-17L128,111l23.51-23.52a12,12,0,0,1,17,17ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"}))],["duotone",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),Co.createElement("path",{d:"M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["fill",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}))],["light",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M164.24,100.24,136.48,128l27.76,27.76a6,6,0,1,1-8.48,8.48L128,136.48l-27.76,27.76a6,6,0,0,1-8.48-8.48L119.52,128,91.76,100.24a6,6,0,0,1,8.48-8.48L128,119.52l27.76-27.76a6,6,0,0,1,8.48,8.48ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"}))],["regular",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["thin",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M162.83,98.83,133.66,128l29.17,29.17a4,4,0,0,1-5.66,5.66L128,133.66,98.83,162.83a4,4,0,0,1-5.66-5.66L122.34,128,93.17,98.83a4,4,0,0,1,5.66-5.66L128,122.34l29.17-29.17a4,4,0,1,1,5.66,5.66ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"}))]]);var Ed=Md.forwardRef((e,t)=>Md.createElement(ye,{ref:t,...e,weights:tw}));Ed.displayName="XCircleIcon";var xk=(e,t)=>{let o=new Array(e.length+t.length);for(let a=0;a<e.length;a++)o[a]=e[a];for(let a=0;a<t.length;a++)o[e.length+a]=t[a];return o},vk=(e,t)=>({classGroupId:e,validator:t}),cw=(e=new Map,t=null,o)=>({nextPart:e,validators:t,classGroupId:o});var ow=[],Ik="arbitrary..",Ck=e=>{let t=Sk(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:a}=e;return{getClassGroupId:s=>{if(s.startsWith("[")&&s.endsWith("]"))return Rk(s);let i=s.split("-"),l=i[0]===""&&i.length>1?1:0;return uw(i,l,t)},getConflictingClassGroupIds:(s,i)=>{if(i){let l=a[s],c=o[s];return l?c?xk(c,l):l:c||ow}return o[s]||ow}}},uw=(e,t,o)=>{if(e.length-t===0)return o.classGroupId;let r=e[t],n=o.nextPart.get(r);if(n){let c=uw(e,t+1,n);if(c)return c}let s=o.validators;if(s===null)return;let i=t===0?e.join("-"):e.slice(t).join("-"),l=s.length;for(let c=0;c<l;c++){let u=s[c];if(u.validator(i))return u.classGroupId}},Rk=e=>e.slice(1,-1).indexOf(":")===-1?void 0:(()=>{let t=e.slice(1,-1),o=t.indexOf(":"),a=t.slice(0,o);return a?Ik+a:void 0})(),Sk=e=>{let{theme:t,classGroups:o}=e;return kk(o,t)},kk=(e,t)=>{let o=cw();for(let a in e){let r=e[a];o0(r,o,a,t)}return o},o0=(e,t,o,a)=>{let r=e.length;for(let n=0;n<r;n++){let s=e[n];Mk(s,t,o,a)}},Mk=(e,t,o,a)=>{if(typeof e=="string"){Ek(e,t,o);return}if(typeof e=="function"){Pk(e,t,o,a);return}Tk(e,t,o,a)},Ek=(e,t,o)=>{let a=e===""?t:dw(t,e);a.classGroupId=o},Pk=(e,t,o,a)=>{if(Ak(e)){o0(e(a),t,o,a);return}t.validators===null&&(t.validators=[]),t.validators.push(vk(o,e))},Tk=(e,t,o,a)=>{let r=Object.entries(e),n=r.length;for(let s=0;s<n;s++){let[i,l]=r[s];o0(l,dw(t,i),o,a)}},dw=(e,t)=>{let o=e,a=t.split("-"),r=a.length;for(let n=0;n<r;n++){let s=a[n],i=o.nextPart.get(s);i||(i=cw(),o.nextPart.set(s,i)),o=i}return o},Ak=e=>"isThemeGetter"in e&&e.isThemeGetter===!0,zk=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,o=Object.create(null),a=Object.create(null),r=(n,s)=>{o[n]=s,t++,t>e&&(t=0,a=o,o=Object.create(null))};return{get(n){let s=o[n];if(s!==void 0)return s;if((s=a[n])!==void 0)return r(n,s),s},set(n,s){n in o?o[n]=s:r(n,s)}}};var Lk=[],aw=(e,t,o,a,r)=>({modifiers:e,hasImportantModifier:t,baseClassName:o,maybePostfixModifierPosition:a,isExternal:r}),Nk=e=>{let{prefix:t,experimentalParseClassName:o}=e,a=r=>{let n=[],s=0,i=0,l=0,c,u=r.length;for(let v=0;v<u;v++){let h=r[v];if(s===0&&i===0){if(h===":"){n.push(r.slice(l,v)),l=v+1;continue}if(h==="/"){c=v;continue}}h==="["?s++:h==="]"?s--:h==="("?i++:h===")"&&i--}let d=n.length===0?r:r.slice(l),p=d,f=!1;d.endsWith("!")?(p=d.slice(0,-1),f=!0):d.startsWith("!")&&(p=d.slice(1),f=!0);let m=c&&c>l?c-l:void 0;return aw(n,f,p,m)};if(t){let r=t+":",n=a;a=s=>s.startsWith(r)?n(s.slice(r.length)):aw(Lk,!1,s,void 0,!0)}if(o){let r=a;a=n=>o({className:n,parseClassName:r})}return a},Fk=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((o,a)=>{t.set(o,1e6+a)}),o=>{let a=[],r=[];for(let n=0;n<o.length;n++){let s=o[n],i=s[0]==="[",l=t.has(s);i||l?(r.length>0&&(r.sort(),a.push(...r),r=[]),a.push(s)):r.push(s)}return r.length>0&&(r.sort(),a.push(...r)),a}},Dk=e=>({cache:zk(e.cacheSize),parseClassName:Nk(e),sortModifiers:Fk(e),postfixLookupClassGroupIds:Ok(e),...Ck(e)}),Ok=e=>{let t=Object.create(null),o=e.postfixLookupClassGroups;if(o)for(let a=0;a<o.length;a++)t[o[a]]=!0;return t},Hk=/\s+/,Vk=(e,t)=>{let{parseClassName:o,getClassGroupId:a,getConflictingClassGroupIds:r,sortModifiers:n,postfixLookupClassGroupIds:s}=t,i=[],l=e.trim().split(Hk),c="";for(let u=l.length-1;u>=0;u-=1){let d=l[u],{isExternal:p,modifiers:f,hasImportantModifier:m,baseClassName:v,maybePostfixModifierPosition:h}=o(d);if(p){c=d+(c.length>0?" "+c:c);continue}let y=!!h,x;if(y){let R=v.substring(0,h);x=a(R);let I=x&&s[x]?a(v):void 0;I&&I!==x&&(x=I,y=!1)}else x=a(v);if(!x){if(!y){c=d+(c.length>0?" "+c:c);continue}if(x=a(v),!x){c=d+(c.length>0?" "+c:c);continue}y=!1}let g=f.length===0?"":f.length===1?f[0]:n(f).join(":"),b=m?g+"!":g,w=b+x;if(i.indexOf(w)>-1)continue;i.push(w);let C=r(x,y);for(let R=0;R<C.length;++R){let I=C[R];i.push(b+I)}c=d+(c.length>0?" "+c:c)}return c},Bk=(...e)=>{let t=0,o,a,r="";for(;t<e.length;)(o=e[t++])&&(a=pw(o))&&(r&&(r+=" "),r+=a);return r},pw=e=>{if(typeof e=="string")return e;let t,o="";for(let a=0;a<e.length;a++)e[a]&&(t=pw(e[a]))&&(o&&(o+=" "),o+=t);return o},rw=(e,...t)=>{let o,a,r,n,s=l=>{let c=t.reduce((u,d)=>d(u),e());return o=Dk(c),a=o.cache.get,r=o.cache.set,n=i,i(l)},i=l=>{let c=a(l);if(c)return c;let u=Vk(l,o);return r(l,u),u};return n=s,(...l)=>n(Bk(...l))},_k=[],Ao=e=>{let t=o=>o[e]||_k;return t.isThemeGetter=!0,t.themeKey=e,t},mw=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,fw=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Zk=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,Gk=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Uk=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,$k=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/,Wk=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,qk=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,xn=e=>Zk.test(e),qe=e=>!!e&&!Number.isNaN(Number(e)),Ar=e=>!!e&&Number.isInteger(Number(e)),e0=e=>e.endsWith("%")&&qe(e.slice(0,-1)),Jr=e=>Gk.test(e),gw=()=>!0,jk=e=>Uk.test(e)&&!$k.test(e),a0=()=>!1,Kk=e=>Wk.test(e),Yk=e=>qk.test(e),Xk=e=>!ve(e)&&!Ce(e),Qk=e=>e.startsWith("@container")&&(e[10]==="/"&&e[11]!==void 0||e[11]==="s"&&e[16]!==void 0&&e.startsWith("-size/",10)||e[11]==="n"&&e[18]!==void 0&&e.startsWith("-normal/",10)),Jk=e=>vn(e,yw,a0),ve=e=>mw.test(e),ts=e=>vn(e,ww,jk),nw=e=>vn(e,iM,qe),eM=e=>vn(e,vw,gw),tM=e=>vn(e,xw,a0),sw=e=>vn(e,hw,a0),oM=e=>vn(e,bw,Yk),Pd=e=>vn(e,Iw,Kk),Ce=e=>fw.test(e),ll=e=>os(e,ww),aM=e=>os(e,xw),iw=e=>os(e,hw),rM=e=>os(e,yw),nM=e=>os(e,bw),Td=e=>os(e,Iw,!0),sM=e=>os(e,vw,!0),vn=(e,t,o)=>{let a=mw.exec(e);return a?a[1]?t(a[1]):o(a[2]):!1},os=(e,t,o=!1)=>{let a=fw.exec(e);return a?a[1]?t(a[1]):o:!1},hw=e=>e==="position"||e==="percentage",bw=e=>e==="image"||e==="url",yw=e=>e==="length"||e==="size"||e==="bg-size",ww=e=>e==="length",iM=e=>e==="number",xw=e=>e==="family-name",vw=e=>e==="number"||e==="weight",Iw=e=>e==="shadow";var lw=()=>{let e=Ao("color"),t=Ao("font"),o=Ao("text"),a=Ao("font-weight"),r=Ao("tracking"),n=Ao("leading"),s=Ao("breakpoint"),i=Ao("container"),l=Ao("spacing"),c=Ao("radius"),u=Ao("shadow"),d=Ao("inset-shadow"),p=Ao("text-shadow"),f=Ao("drop-shadow"),m=Ao("blur"),v=Ao("perspective"),h=Ao("aspect"),y=Ao("ease"),x=Ao("animate"),g=()=>["auto","avoid","all","avoid-page","page","left","right","column"],b=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],w=()=>[...b(),Ce,ve],C=()=>["auto","hidden","clip","visible","scroll"],R=()=>["auto","contain","none"],I=()=>[Ce,ve,l],S=()=>[xn,"full","auto",...I()],M=()=>[Ar,"none","subgrid",Ce,ve],T=()=>["auto",{span:["full",Ar,Ce,ve]},Ar,Ce,ve],V=()=>[Ar,"auto",Ce,ve],F=()=>["auto","min","max","fr",Ce,ve],L=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],P=()=>["start","end","center","stretch","center-safe","end-safe"],H=()=>["auto",...I()],D=()=>[xn,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...I()],N=()=>[i,xn,"screen","full","dvw","lvw","svw","min","max","fit",...I()],A=()=>[xn,"screen","full","lh","dvh","lvh","svh","min","max","fit",...I()],E=()=>[e,Ce,ve],G=()=>[...b(),iw,sw,{position:[Ce,ve]}],z=()=>["no-repeat",{repeat:["","x","y","space","round"]}],oe=()=>["auto","cover","contain",rM,Jk,{size:[Ce,ve]}],X=()=>[e0,ll,ts],Z=()=>["","none","full",c,Ce,ve],U=()=>["",qe,ll,ts],ae=()=>["solid","dashed","dotted","double"],we=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],j=()=>[qe,e0,iw,sw],Y=()=>["","none",m,Ce,ve],q=()=>["none",qe,Ce,ve],re=()=>["none",qe,Ce,ve],ge=()=>[qe,Ce,ve],ee=()=>[xn,"full",...I()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Jr],breakpoint:[Jr],color:[gw],container:[Jr],"drop-shadow":[Jr],ease:["in","out","in-out"],font:[Xk],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Jr],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Jr],shadow:[Jr],spacing:["px",qe],text:[Jr],"text-shadow":[Jr],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",xn,ve,Ce,h]}],container:["container"],"container-type":[{"@container":["","normal","size",Ce,ve]}],"container-named":[Qk],columns:[{columns:[qe,"auto",ve,Ce,i]}],"break-after":[{"break-after":g()}],"break-before":[{"break-before":g()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:w()}],overflow:[{overflow:C()}],"overflow-x":[{"overflow-x":C()}],"overflow-y":[{"overflow-y":C()}],overscroll:[{overscroll:R()}],"overscroll-x":[{"overscroll-x":R()}],"overscroll-y":[{"overscroll-y":R()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:S()}],"inset-x":[{"inset-x":S()}],"inset-y":[{"inset-y":S()}],start:[{"inset-s":S(),start:S()}],end:[{"inset-e":S(),end:S()}],"inset-bs":[{"inset-bs":S()}],"inset-be":[{"inset-be":S()}],top:[{top:S()}],right:[{right:S()}],bottom:[{bottom:S()}],left:[{left:S()}],visibility:["visible","invisible","collapse"],z:[{z:[Ar,"auto",Ce,ve]}],basis:[{basis:[xn,"full","auto",i,...I()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[qe,xn,"auto","initial","none",ve]}],grow:[{grow:["",qe,Ce,ve]}],shrink:[{shrink:["",qe,Ce,ve]}],order:[{order:[Ar,"first","last","none",Ce,ve]}],"grid-cols":[{"grid-cols":M()}],"col-start-end":[{col:T()}],"col-start":[{"col-start":V()}],"col-end":[{"col-end":V()}],"grid-rows":[{"grid-rows":M()}],"row-start-end":[{row:T()}],"row-start":[{"row-start":V()}],"row-end":[{"row-end":V()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":F()}],"auto-rows":[{"auto-rows":F()}],gap:[{gap:I()}],"gap-x":[{"gap-x":I()}],"gap-y":[{"gap-y":I()}],"justify-content":[{justify:[...L(),"normal"]}],"justify-items":[{"justify-items":[...P(),"normal"]}],"justify-self":[{"justify-self":["auto",...P()]}],"align-content":[{content:["normal",...L()]}],"align-items":[{items:[...P(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...P(),{baseline:["","last"]}]}],"place-content":[{"place-content":L()}],"place-items":[{"place-items":[...P(),"baseline"]}],"place-self":[{"place-self":["auto",...P()]}],p:[{p:I()}],px:[{px:I()}],py:[{py:I()}],ps:[{ps:I()}],pe:[{pe:I()}],pbs:[{pbs:I()}],pbe:[{pbe:I()}],pt:[{pt:I()}],pr:[{pr:I()}],pb:[{pb:I()}],pl:[{pl:I()}],m:[{m:H()}],mx:[{mx:H()}],my:[{my:H()}],ms:[{ms:H()}],me:[{me:H()}],mbs:[{mbs:H()}],mbe:[{mbe:H()}],mt:[{mt:H()}],mr:[{mr:H()}],mb:[{mb:H()}],ml:[{ml:H()}],"space-x":[{"space-x":I()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":I()}],"space-y-reverse":["space-y-reverse"],size:[{size:D()}],"inline-size":[{inline:["auto",...N()]}],"min-inline-size":[{"min-inline":["auto",...N()]}],"max-inline-size":[{"max-inline":["none",...N()]}],"block-size":[{block:["auto",...A()]}],"min-block-size":[{"min-block":["auto",...A()]}],"max-block-size":[{"max-block":["none",...A()]}],w:[{w:[i,"screen",...D()]}],"min-w":[{"min-w":[i,"screen","none",...D()]}],"max-w":[{"max-w":[i,"screen","none","prose",{screen:[s]},...D()]}],h:[{h:["screen","lh",...D()]}],"min-h":[{"min-h":["screen","lh","none",...D()]}],"max-h":[{"max-h":["screen","lh","none",...D()]}],"font-size":[{text:["base",o,ll,ts]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[a,sM,eM]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",e0,ve]}],"font-family":[{font:[aM,tM,t]}],"font-features":[{"font-features":[ve]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[r,Ce,ve]}],"line-clamp":[{"line-clamp":[qe,"none",Ce,nw]}],leading:[{leading:["none",n,...I()]}],"list-image":[{"list-image":["none",Ce,ve]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",Ce,ve]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:E()}],"text-color":[{text:E()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...ae(),"wavy"]}],"text-decoration-thickness":[{decoration:[qe,"from-font","auto",Ce,ts]}],"text-decoration-color":[{decoration:E()}],"underline-offset":[{"underline-offset":[qe,"auto",Ce,ve]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:I()}],"tab-size":[{tab:[Ar,Ce,ve]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Ce,ve]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Ce,ve]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:G()}],"bg-repeat":[{bg:z()}],"bg-size":[{bg:oe()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},Ar,Ce,ve],radial:["",Ce,ve],conic:["",Ar,Ce,ve]},nM,oM]}],"bg-color":[{bg:E()}],"gradient-from-pos":[{from:X()}],"gradient-via-pos":[{via:X()}],"gradient-to-pos":[{to:X()}],"gradient-from":[{from:E()}],"gradient-via":[{via:E()}],"gradient-to":[{to:E()}],rounded:[{rounded:Z()}],"rounded-s":[{"rounded-s":Z()}],"rounded-e":[{"rounded-e":Z()}],"rounded-t":[{"rounded-t":Z()}],"rounded-r":[{"rounded-r":Z()}],"rounded-b":[{"rounded-b":Z()}],"rounded-l":[{"rounded-l":Z()}],"rounded-ss":[{"rounded-ss":Z()}],"rounded-se":[{"rounded-se":Z()}],"rounded-ee":[{"rounded-ee":Z()}],"rounded-es":[{"rounded-es":Z()}],"rounded-tl":[{"rounded-tl":Z()}],"rounded-tr":[{"rounded-tr":Z()}],"rounded-br":[{"rounded-br":Z()}],"rounded-bl":[{"rounded-bl":Z()}],"border-w":[{border:U()}],"border-w-x":[{"border-x":U()}],"border-w-y":[{"border-y":U()}],"border-w-s":[{"border-s":U()}],"border-w-e":[{"border-e":U()}],"border-w-bs":[{"border-bs":U()}],"border-w-be":[{"border-be":U()}],"border-w-t":[{"border-t":U()}],"border-w-r":[{"border-r":U()}],"border-w-b":[{"border-b":U()}],"border-w-l":[{"border-l":U()}],"divide-x":[{"divide-x":U()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":U()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...ae(),"hidden","none"]}],"divide-style":[{divide:[...ae(),"hidden","none"]}],"border-color":[{border:E()}],"border-color-x":[{"border-x":E()}],"border-color-y":[{"border-y":E()}],"border-color-s":[{"border-s":E()}],"border-color-e":[{"border-e":E()}],"border-color-bs":[{"border-bs":E()}],"border-color-be":[{"border-be":E()}],"border-color-t":[{"border-t":E()}],"border-color-r":[{"border-r":E()}],"border-color-b":[{"border-b":E()}],"border-color-l":[{"border-l":E()}],"divide-color":[{divide:E()}],"outline-style":[{outline:[...ae(),"none","hidden"]}],"outline-offset":[{"outline-offset":[qe,Ce,ve]}],"outline-w":[{outline:["",qe,ll,ts]}],"outline-color":[{outline:E()}],shadow:[{shadow:["","inner","none",u,Td,Pd]}],"shadow-color":[{shadow:E()}],"inset-shadow":[{"inset-shadow":["none",d,Td,Pd]}],"inset-shadow-color":[{"inset-shadow":E()}],"ring-w":[{ring:U()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:E()}],"ring-offset-w":[{"ring-offset":[qe,ts]}],"ring-offset-color":[{"ring-offset":E()}],"inset-ring-w":[{"inset-ring":U()}],"inset-ring-color":[{"inset-ring":E()}],"text-shadow":[{"text-shadow":["none",p,Td,Pd]}],"text-shadow-color":[{"text-shadow":E()}],opacity:[{opacity:[qe,Ce,ve]}],"mix-blend":[{"mix-blend":[...we(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":we()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[qe]}],"mask-image-linear-from-pos":[{"mask-linear-from":j()}],"mask-image-linear-to-pos":[{"mask-linear-to":j()}],"mask-image-linear-from-color":[{"mask-linear-from":E()}],"mask-image-linear-to-color":[{"mask-linear-to":E()}],"mask-image-t-from-pos":[{"mask-t-from":j()}],"mask-image-t-to-pos":[{"mask-t-to":j()}],"mask-image-t-from-color":[{"mask-t-from":E()}],"mask-image-t-to-color":[{"mask-t-to":E()}],"mask-image-r-from-pos":[{"mask-r-from":j()}],"mask-image-r-to-pos":[{"mask-r-to":j()}],"mask-image-r-from-color":[{"mask-r-from":E()}],"mask-image-r-to-color":[{"mask-r-to":E()}],"mask-image-b-from-pos":[{"mask-b-from":j()}],"mask-image-b-to-pos":[{"mask-b-to":j()}],"mask-image-b-from-color":[{"mask-b-from":E()}],"mask-image-b-to-color":[{"mask-b-to":E()}],"mask-image-l-from-pos":[{"mask-l-from":j()}],"mask-image-l-to-pos":[{"mask-l-to":j()}],"mask-image-l-from-color":[{"mask-l-from":E()}],"mask-image-l-to-color":[{"mask-l-to":E()}],"mask-image-x-from-pos":[{"mask-x-from":j()}],"mask-image-x-to-pos":[{"mask-x-to":j()}],"mask-image-x-from-color":[{"mask-x-from":E()}],"mask-image-x-to-color":[{"mask-x-to":E()}],"mask-image-y-from-pos":[{"mask-y-from":j()}],"mask-image-y-to-pos":[{"mask-y-to":j()}],"mask-image-y-from-color":[{"mask-y-from":E()}],"mask-image-y-to-color":[{"mask-y-to":E()}],"mask-image-radial":[{"mask-radial":[Ce,ve]}],"mask-image-radial-from-pos":[{"mask-radial-from":j()}],"mask-image-radial-to-pos":[{"mask-radial-to":j()}],"mask-image-radial-from-color":[{"mask-radial-from":E()}],"mask-image-radial-to-color":[{"mask-radial-to":E()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[qe]}],"mask-image-conic-from-pos":[{"mask-conic-from":j()}],"mask-image-conic-to-pos":[{"mask-conic-to":j()}],"mask-image-conic-from-color":[{"mask-conic-from":E()}],"mask-image-conic-to-color":[{"mask-conic-to":E()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:G()}],"mask-repeat":[{mask:z()}],"mask-size":[{mask:oe()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",Ce,ve]}],filter:[{filter:["","none",Ce,ve]}],blur:[{blur:Y()}],brightness:[{brightness:[qe,Ce,ve]}],contrast:[{contrast:[qe,Ce,ve]}],"drop-shadow":[{"drop-shadow":["","none",f,Td,Pd]}],"drop-shadow-color":[{"drop-shadow":E()}],grayscale:[{grayscale:["",qe,Ce,ve]}],"hue-rotate":[{"hue-rotate":[qe,Ce,ve]}],invert:[{invert:["",qe,Ce,ve]}],saturate:[{saturate:[qe,Ce,ve]}],sepia:[{sepia:["",qe,Ce,ve]}],"backdrop-filter":[{"backdrop-filter":["","none",Ce,ve]}],"backdrop-blur":[{"backdrop-blur":Y()}],"backdrop-brightness":[{"backdrop-brightness":[qe,Ce,ve]}],"backdrop-contrast":[{"backdrop-contrast":[qe,Ce,ve]}],"backdrop-grayscale":[{"backdrop-grayscale":["",qe,Ce,ve]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[qe,Ce,ve]}],"backdrop-invert":[{"backdrop-invert":["",qe,Ce,ve]}],"backdrop-opacity":[{"backdrop-opacity":[qe,Ce,ve]}],"backdrop-saturate":[{"backdrop-saturate":[qe,Ce,ve]}],"backdrop-sepia":[{"backdrop-sepia":["",qe,Ce,ve]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":I()}],"border-spacing-x":[{"border-spacing-x":I()}],"border-spacing-y":[{"border-spacing-y":I()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",Ce,ve]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[qe,"initial",Ce,ve]}],ease:[{ease:["linear","initial",y,Ce,ve]}],delay:[{delay:[qe,Ce,ve]}],animate:[{animate:["none",x,Ce,ve]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[v,Ce,ve]}],"perspective-origin":[{"perspective-origin":w()}],rotate:[{rotate:q()}],"rotate-x":[{"rotate-x":q()}],"rotate-y":[{"rotate-y":q()}],"rotate-z":[{"rotate-z":q()}],scale:[{scale:re()}],"scale-x":[{"scale-x":re()}],"scale-y":[{"scale-y":re()}],"scale-z":[{"scale-z":re()}],"scale-3d":["scale-3d"],skew:[{skew:ge()}],"skew-x":[{"skew-x":ge()}],"skew-y":[{"skew-y":ge()}],transform:[{transform:[Ce,ve,"","none","gpu","cpu"]}],"transform-origin":[{origin:w()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:ee()}],"translate-x":[{"translate-x":ee()}],"translate-y":[{"translate-y":ee()}],"translate-z":[{"translate-z":ee()}],"translate-none":["translate-none"],zoom:[{zoom:[Ar,Ce,ve]}],accent:[{accent:E()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:E()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Ce,ve]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scrollbar-thumb-color":[{"scrollbar-thumb":E()}],"scrollbar-track-color":[{"scrollbar-track":E()}],"scrollbar-gutter":[{"scrollbar-gutter":["auto","stable","both"]}],"scrollbar-w":[{scrollbar:["auto","thin","none"]}],"scroll-m":[{"scroll-m":I()}],"scroll-mx":[{"scroll-mx":I()}],"scroll-my":[{"scroll-my":I()}],"scroll-ms":[{"scroll-ms":I()}],"scroll-me":[{"scroll-me":I()}],"scroll-mbs":[{"scroll-mbs":I()}],"scroll-mbe":[{"scroll-mbe":I()}],"scroll-mt":[{"scroll-mt":I()}],"scroll-mr":[{"scroll-mr":I()}],"scroll-mb":[{"scroll-mb":I()}],"scroll-ml":[{"scroll-ml":I()}],"scroll-p":[{"scroll-p":I()}],"scroll-px":[{"scroll-px":I()}],"scroll-py":[{"scroll-py":I()}],"scroll-ps":[{"scroll-ps":I()}],"scroll-pe":[{"scroll-pe":I()}],"scroll-pbs":[{"scroll-pbs":I()}],"scroll-pbe":[{"scroll-pbe":I()}],"scroll-pt":[{"scroll-pt":I()}],"scroll-pr":[{"scroll-pr":I()}],"scroll-pb":[{"scroll-pb":I()}],"scroll-pl":[{"scroll-pl":I()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Ce,ve]}],fill:[{fill:["none",...E()]}],"stroke-w":[{stroke:[qe,ll,ts,nw]}],stroke:[{stroke:["none",...E()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{"container-named":["container-type"],overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","inset-bs","inset-be","start","end","top","right","bottom","left"],"inset-x":["start","end","right","left"],"inset-y":["inset-bs","inset-be","top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pbs","pbe","pt","pr","pb","pl"],px:["ps","pe","pr","pl"],py:["pbs","pbe","pt","pb"],m:["mx","my","ms","me","mbs","mbe","mt","mr","mb","ml"],mx:["ms","me","mr","ml"],my:["mbs","mbe","mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-bs","border-w-be","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-s","border-w-e","border-w-r","border-w-l"],"border-w-y":["border-w-bs","border-w-be","border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-bs","border-color-be","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-s","border-color-e","border-color-r","border-color-l"],"border-color-y":["border-color-bs","border-color-be","border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mbs","scroll-mbe","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-ms","scroll-me","scroll-mr","scroll-ml"],"scroll-my":["scroll-mbs","scroll-mbe","scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pbs","scroll-pbe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-ps","scroll-pe","scroll-pr","scroll-pl"],"scroll-py":["scroll-pbs","scroll-pbe","scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},postfixLookupClassGroups:["container-type"],orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},lM=(e,{cacheSize:t,prefix:o,experimentalParseClassName:a,extend:r={},override:n={}})=>(js(e,"cacheSize",t),js(e,"prefix",o),js(e,"experimentalParseClassName",a),Ad(e.theme,n.theme),Ad(e.classGroups,n.classGroups),Ad(e.conflictingClassGroups,n.conflictingClassGroups),Ad(e.conflictingClassGroupModifiers,n.conflictingClassGroupModifiers),js(e,"postfixLookupClassGroups",n.postfixLookupClassGroups),js(e,"orderSensitiveModifiers",n.orderSensitiveModifiers),zd(e.theme,r.theme),zd(e.classGroups,r.classGroups),zd(e.conflictingClassGroups,r.conflictingClassGroups),zd(e.conflictingClassGroupModifiers,r.conflictingClassGroupModifiers),t0(e,r,"postfixLookupClassGroups"),t0(e,r,"orderSensitiveModifiers"),e),js=(e,t,o)=>{o!==void 0&&(e[t]=o)},Ad=(e,t)=>{if(t)for(let o in t)js(e,o,t[o])},zd=(e,t)=>{if(t)for(let o in t)t0(e,t,o)},t0=(e,t,o)=>{let a=t[o];a!==void 0&&(e[o]=e[o]?e[o].concat(a):a)},Cw=(e,...t)=>typeof e=="function"?rw(lw,e,...t):rw(()=>lM(lw(),e),...t);var cM=Cw({extend:{classGroups:{"type-role":[{type:["title","heading","heading-sm","body","body-sm","label","label-sm","label-lg","caption","code","code-sm","code-xs"]}],"glass-key":[{glass:["ink","paper","coral"]}]}}}),In={sm:"h-[max(var(--control-sm),calc(1lh+var(--space-2)))]",default:"h-[max(var(--control),calc(1lh+var(--space-2)))]",lg:"h-[max(var(--control-lg),calc(1lh+var(--space-2)))]"};function O(...e){return cM(su(e))}function Mt(e,t){return typeof t=="function"?o=>O(e,t(o)):O(e,t)}function Ua(...e){return t=>{for(let o of e)typeof o=="function"?o(t):o&&(o.current=t)}}import{jsx as uM}from"react/jsx-runtime";var Rw=fd,Ld=uu;var Ks=fu;var Sw=hd;var as=ku,kw=yu;var r0=xu,Mw=Iu;var Ew=Ru,Cn=kd,Pw=hu;var Nd=zu;var Tw=Qu,Aw=Uu;var zw=Ed;var Lw=Bu,Nw=Zu,Fw=Wu,n0=Yu,Dw=ju,Ow=ed;var Hw=od,s0=Hu;var Vw=ld,Bw=ud;var i0=Nu;var rs=Tu;var ns=lu;var l0=sd;var c0=Du;var _w=yd,Zw=pd,Gw=Eu,Uw=xd,$w=Id;var Fd=Rd,Ww=rd,qw=pu;function Fe({icon:e,size:t=14,weight:o="regular",label:a,className:r,...n}){return uM(e,{size:t,weight:o,focusable:"false","aria-hidden":a?void 0:!0,"aria-label":a,role:a?"img":void 0,className:O("shrink-0",r),...n})}import*as ex from"react";import*as Xs from"react";function Dd(){return typeof window<"u"}function Ro(e){return Od(e)?(e.nodeName||"").toLowerCase():"#document"}function Qe(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function zr(e){var t;return(t=(Od(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Od(e){return Dd()?e instanceof Node||e instanceof Qe(e).Node:!1}function Ge(e){return Dd()?e instanceof Element||e instanceof Qe(e).Element:!1}function Ae(e){return Dd()?e instanceof HTMLElement||e instanceof Qe(e).HTMLElement:!1}function cr(e){return!Dd()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Qe(e).ShadowRoot}function is(e){let{overflow:t,overflowX:o,overflowY:a,display:r}=zo(e);return/auto|scroll|overlay|hidden|clip/.test(t+a+o)&&r!=="inline"&&r!=="contents"}function jw(e){return/^(table|td|th)$/.test(Ro(e))}function cl(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var dM=/transform|translate|scale|rotate|perspective|filter/,pM=/paint|layout|strict|content/,ss=e=>!!e&&e!=="none",u0;function Hd(e){let t=Ge(e)?zo(e):e;return ss(t.transform)||ss(t.translate)||ss(t.scale)||ss(t.rotate)||ss(t.perspective)||!Vd()&&(ss(t.backdropFilter)||ss(t.filter))||dM.test(t.willChange||"")||pM.test(t.contain||"")}function Kw(e){let t=$a(e);for(;Ae(t)&&!Wa(t);){if(Hd(t))return t;if(cl(t))return null;t=$a(t)}return null}function Vd(){return u0==null&&(u0=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),u0}function Wa(e){return/^(html|body|#document)$/.test(Ro(e))}function zo(e){return Qe(e).getComputedStyle(e)}function ul(e){return Ge(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function $a(e){if(Ro(e)==="html")return e;let t=e.assignedSlot||e.parentNode||cr(e)&&e.host||zr(e);return cr(t)?t.host:t}function Yw(e){let t=$a(e);return Wa(t)?(e.ownerDocument||e).body:Ae(t)&&is(t)?t:Yw(t)}function Rn(e,t,o){var a;t===void 0&&(t=[]),o===void 0&&(o=!0);let r=Yw(e),n=r===((a=e.ownerDocument)==null?void 0:a.body),s=Qe(r);if(n){let i=Bd(s);return t.concat(s,s.visualViewport||[],is(r)?r:[],i&&o?Rn(i):[])}else return t.concat(r,Rn(r,[],o))}function Bd(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}import*as mM from"react";var dl={...mM};var d0=dl.useInsertionEffect,fM=d0&&d0!==dl.useLayoutEffect?d0:e=>e();function W(e){let t=$e(gM).current;return t.next=e,fM(t.effect),t.trampoline}function gM(){let e={next:void 0,callback:hM,trampoline:(...t)=>e.callback?.(...t),effect:()=>{e.callback=e.next}};return e}function hM(){}import*as Xw from"react";var bM=()=>{},B=typeof document<"u"?Xw.useLayoutEffect:bM;function yM(e,t){return function(a,...r){let n=new URL(e);return n.searchParams.set("code",a.toString()),r.forEach(s=>n.searchParams.append("args[]",s)),`${t} error #${a}; visit ${n} for the full message.`}}var wM=yM("https://base-ui.com/production-error","Base UI"),He=wM;import*as _d from"react";var p0=_d.createContext(void 0);function Ys(e=!1){let t=_d.useContext(p0);if(t===void 0&&!e)throw new Error(He(16));return t}import*as Qw from"react";function Jw(e){let{focusableWhenDisabled:t,disabled:o,composite:a=!1,tabIndex:r=0,isNativeButton:n}=e,s=a&&t!==!1,i=a&&t===!1;return{props:Qw.useMemo(()=>{let c={onKeyDown(u){o&&t&&u.key!=="Tab"&&u.preventDefault()}};return a||(c.tabIndex=r,!n&&o&&(c.tabIndex=t?r:-1)),(n&&(t||s)||!n&&o)&&(c["aria-disabled"]=o),n&&(!t||i)&&(c.disabled=o),c},[a,o,t,s,i,n,r])}}function Se(e){return e?.ownerDocument||document}function Lr(e,t,{detail:o=0,pointerType:a=""}={}){e.dispatchEvent(new(Qe(e)).PointerEvent("click",{bubbles:!0,cancelable:!0,composed:!0,detail:o,pointerType:a,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,altKey:t.altKey,metaKey:t.metaKey}))}function Go(e={}){let{disabled:t=!1,focusableWhenDisabled:o,tabIndex:a=0,native:r=!0,composite:n}=e,s=Xs.useRef(null),i=Ys(!0),l=n??i!==void 0,{props:c}=Jw({focusableWhenDisabled:o,disabled:t,composite:l,tabIndex:a,isNativeButton:r}),u=Xs.useCallback(()=>{let f=s.current;m0(f)&&l&&t&&c.disabled===void 0&&f.disabled&&(f.disabled=!1)},[t,c.disabled,l]);B(u,[u]);let d=Xs.useCallback((f={})=>{let{onClick:m,onMouseDown:v,onKeyUp:h,onKeyDown:y,onPointerDown:x,...g}=f;return nt({onClick(b){if(t){b.preventDefault();return}m?.(b)},onMouseDown(b){t||v?.(b)},onKeyDown(b){if(t||(sl(b),y?.(b),b.baseUIHandlerPrevented))return;let w=b.target===b.currentTarget,C=b.currentTarget,R=m0(C),I=!r&&xM(C),S=w&&(r?R:!I),M=b.key==="Enter",T=b.key===" ",V=C.getAttribute("role"),F=V?.startsWith("menuitem")||V==="option"||V==="gridcell";if(w&&l&&T){if(b.defaultPrevented&&F)return;b.preventDefault(),(!r||R)&&(b.preventBaseUIHandler(),Lr(C,b));return}if(!S||r||!T&&!M){w&&I&&T&&b.preventDefault();return}b.defaultPrevented||(b.preventDefault(),M&&(b.preventBaseUIHandler(),Lr(C,b)))},onKeyUp(b){if(!t){if(sl(b),h?.(b),b.target===b.currentTarget&&r&&l&&m0(b.currentTarget)&&b.key===" "){b.preventDefault();return}b.baseUIHandlerPrevented||b.target===b.currentTarget&&!r&&!l&&!b.defaultPrevented&&b.key===" "&&(b.preventBaseUIHandler(),Lr(b.currentTarget,b))}},onPointerDown(b){if(t){b.preventDefault();return}x?.(b)}},r?{type:"button"}:{role:"button"},c,g)},[t,c,l,r]),p=W(f=>{s.current=f,u()});return{getButtonProps:d,buttonRef:p}}function m0(e){return Ae(e)&&e.tagName==="BUTTON"}function xM(e){return Ae(e)&&e.tagName==="A"&&!!e.href}var f0=ex.forwardRef(function(t,o){let{render:a,className:r,disabled:n=!1,focusableWhenDisabled:s=!1,nativeButton:i=!0,style:l,...c}=t,{getButtonProps:u,buttonRef:d}=Go({disabled:n,focusableWhenDisabled:s,native:i});return me("button",t,{state:{disabled:n},ref:[o,d],props:[c,u]})});import{useEffect as vM,useMemo as IM,useRef as CM}from"react";import{jsx as Qs,jsxs as tx}from"react/jsx-runtime";var RM=rt(["group/button relative inline-flex max-w-full shrink-0 items-center justify-center gap-1.5 rounded-pill whitespace-nowrap select-none","disabled:cursor-not-allowed data-disabled:cursor-not-allowed aria-busy:cursor-progress","[&_svg]:pointer-events-none [&_svg]:shrink-0"],{variants:{variant:{primary:"glass glass-ink",destructive:"glass glass-coral",confirm:"glass glass-green",secondary:"flat",ghost:["bg-transparent text-text-1 transition-[background-color,color,scale] duration-(--dur-press) ease-out","hover:not-data-disabled:bg-hover active:not-data-disabled:bg-pressed active:not-data-disabled:scale-(--scale-press)","data-disabled:not-aria-busy:text-text-disabled","forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]"]},size:{sm:`${In.sm} px-2.5 type-label-sm [&_svg]:size-(--icon-sm)`,default:`${In.default} px-3 type-label [&_svg]:size-(--icon)`,lg:`${In.lg} px-3.5 type-label-lg [&_svg]:size-(--icon-lg)`,"icon-sm":"size-(--control-sm) px-0 [&_svg]:size-(--icon-sm)",icon:"size-(--control) px-0 [&_svg]:size-(--icon)","icon-lg":"size-(--control-lg) px-0 [&_svg]:size-(--icon-lg)"}},defaultVariants:{variant:"primary",size:"default"}});function SM(){return Qs(Fe,{icon:rs,"data-slot":"button-arc",className:"animate-spin motion-reduce:animate-none"})}function kM(e){let t=e.getAttribute("aria-label")??"";if(t.trim()||e.getAttribute("aria-labelledby"))return t||"labelledby";let o="",a=r=>{if(r.nodeType===Node.TEXT_NODE){o+=r.textContent??"";return}if(!(r instanceof Element&&r.getAttribute("aria-hidden")==="true")){if(r instanceof Element&&r.getAttribute("role")==="img"){o+=r.getAttribute("aria-label")??"";return}r.childNodes.forEach(a)}};return a(e),o.trim()}function MM(){let e=CM(null);return vM(()=>{}),e}function at({className:e,variant:t,size:o,pending:a,pendingLabel:r,disabled:n,focusableWhenDisabled:s,children:i,ref:l,...c}){let u=t??"primary",d=o??"default",p=d.startsWith("icon"),f=a!==void 0,m=MM(),v=IM(()=>Ua(l,m),[l,m]),h=typeof i=="string"?Qs("span",{"data-slot":"button-text",className:"min-w-0 truncate",children:i}):i,y=f?tx("span",{"data-slot":"button-stack",className:"grid min-w-0 place-items-center [grid-template-areas:'stack']",children:[Qs("span",{"data-slot":"button-idle",className:O("inline-flex max-w-full min-w-0 items-center gap-1.5 [grid-area:stack]",a&&"opacity-0"),children:h}),tx("span",{"data-slot":"button-pending","aria-hidden":!0,className:O("inline-flex max-w-full min-w-0 items-center gap-1.5 [grid-area:stack]",!a&&"invisible"),children:[Qs(SM,{}),p?null:typeof r=="string"?Qs("span",{className:"min-w-0 truncate",children:r}):r??h]})]}):h;return Qs(f0,{"data-slot":"button","data-variant":u,"data-size":d,ref:v,disabled:n||a,focusableWhenDisabled:a||s,"aria-busy":a||void 0,className:Mt(RM({variant:u,size:d}),e),...c,children:y})}import{jsx as Js,jsxs as TM}from"react/jsx-runtime";var qa={idle:"Idle",queued:"Queued",running:"Running",ok:"Passed",warn:"Warning",fail:"Failed",waiting:"Waiting on you"};var ox=e=>e==="ok"||e==="warn"||e==="fail"||e==="waiting",EM=rt("inline-flex max-w-full min-w-0 items-baseline gap-1 data",{variants:{size:{default:"type-label",sm:"type-label-sm"},status:{idle:"text-text-2",queued:"text-text-2",running:"text-text-1",ok:"text-ok-text",warn:"text-warn-text",fail:"text-fail-text",waiting:"text-text-1"}},defaultVariants:{size:"default",status:"idle"}}),PM={idle:null,queued:null,running:rs,ok:Gw,warn:Fd,fail:zw,waiting:Ww};function Eo({status:e="idle",size:t="default",live:o,className:a,children:r,...n}){let s=r??qa[e];return TM("span",{"data-slot":"status","data-status":e,"data-size":t,className:O(EM({size:t,status:e}),a),...n,children:[Js(g0,{status:e}),Js("span",{"data-slot":"status-word","aria-hidden":o&&ox(e)?!0:void 0,className:"min-w-0 [overflow-wrap:anywhere]",children:s}),o&&Js("span",{role:"status",className:"sr-only",children:ox(e)?typeof s=="string"?s:qa[e]:""})]})}function g0({status:e="idle",label:t,className:o,...a}){let r=PM[e];return r?Js("span",{"data-slot":"status-mark","data-status":e,role:t?"img":void 0,"aria-label":t,"aria-hidden":t?void 0:!0,className:O("flex h-lh shrink-0 items-center self-start",o),...a,children:Js(Fe,{icon:r,size:12,weight:e==="running"?"regular":"bold",className:O(e==="running"&&"animate-spin motion-reduce:animate-none")})}):t?Js("span",{"data-slot":"status-mark","data-status":e,className:"sr-only",children:t}):null}import{Fragment as VM,jsx as Po,jsxs as pl}from"react/jsx-runtime";var AM=rt("group/message relative flex w-full min-w-0 px-4 py-2",{variants:{size:{default:"type-body",sm:"type-body-sm"}},defaultVariants:{size:"default"}});function ml({className:e,from:t="agent",size:o="default",...a}){return Po("div",{"data-slot":"message","data-from":t,"data-size":o,className:O(AM({size:o}),t==="user"&&"justify-end",e),...a})}function Zd({name:e,time:t,state:o="done",children:a,...r}){return Po(ml,{from:"agent",...r,children:pl(fl,{children:[pl(gl,{className:o==="fail"||o==="stopped"?void 0:"sr-only",children:[e,Po(LM,{state:o}),t&&Po(hl,{children:t})]}),a]})})}function fl({className:e,...t}){return Po("div",{"data-slot":"message-content",className:O("flex min-w-0 flex-1 flex-col break-words text-text-1","group-data-[from=user]/message:max-w-[85%] group-data-[from=user]/message:flex-none group-data-[from=user]/message:items-end group-data-[from=user]/message:gap-1","group-data-[from=user]/message:*:data-[slot=message-header]:sr-only","group-data-[from=agent]/message:gap-2",e),...t})}function gl({className:e,...t}){return Po("div",{"data-slot":"message-header",className:O("flex min-h-(--control-sm) min-w-0 shrink-0 items-center gap-2 type-label-sm text-text-1",e),...t})}function hl({className:e,...t}){return Po("time",{"data-slot":"message-time",className:O("ms-auto w-12 shrink-0 truncate text-end type-caption text-text-2 data [[data-slot=message-status]~&]:ms-0",e),...t})}var zM={working:qa.running,paused:qa.waiting,failed:qa.fail,stopped:"Stopped"};function LM({state:e,label:t,labels:o,className:a,...r}){let n={...zM,...o},s=e==="fail"?Po(Eo,{status:"fail",size:"sm",children:t??n.failed}):e==="stopped"?Po("span",{children:t??n.stopped}):e==="live"?Po("span",{className:"sr-only",children:t??n.working}):e==="waiting"?Po("span",{className:"sr-only",children:t??n.paused}):t?Po("span",{className:"sr-only",children:t}):null;return Po("span",{"data-slot":"message-status","data-state":e,className:O("ms-auto inline-flex shrink-0 items-center justify-end type-caption whitespace-nowrap text-text-2",a),...r,children:s})}function ax({className:e,...t}){return Po("div",{"data-slot":"message-footer",className:O("flex min-h-(--control) max-w-full min-w-0 shrink-0 items-center gap-0.5 type-caption text-text-2","-ms-2 *:data-[slot=message-model]:ms-auto *:data-[slot=message-meta]:ms-auto [&>[data-slot=message-model]+[data-slot=message-meta]]:ms-3","[&>[data-slot$=button]]:transition-opacity [&>[data-slot$=button]]:duration-(--dur-state)","pointer-fine:group-data-[from=agent]/message:[&>[data-slot$=button]]:opacity-0","pointer-fine:group-data-[from=agent]/message:group-hover/message:[&>[data-slot$=button]]:opacity-100","pointer-fine:group-data-[from=agent]/message:has-[:focus-visible,[data-force-focus-visible]]:[&>[data-slot$=button]]:opacity-100","group-has-[[data-slot=message-status]:is([data-state=live],[data-state=waiting])]/message:hidden",e),...t})}var NM={worked:e=>`Worked for ${e}`};function rx({duration:e,time:t,labels:o,className:a,...r}){let n={...NM,...o};return pl("span",{"data-slot":"message-worked",className:O("ms-2 me-1 inline-flex min-w-0 items-baseline gap-1.5 truncate type-caption text-text-2 data",a),...r,children:[e&&pl("span",{className:"min-w-0 truncate",children:[n.worked(e),t&&","]}),t&&Po("span",{className:"shrink-0",children:t})]})}var FM=rt(["group/bubble relative flex w-auto max-w-(--measure) min-w-0 flex-col gap-1 self-end"],{variants:{variant:{default:"*:data-[slot=message-bubble-content]:border-line-faint *:data-[slot=message-bubble-content]:bg-shell",outline:"*:data-[slot=message-bubble-content]:border-line-control *:data-[slot=message-bubble-content]:bg-paper"}},defaultVariants:{variant:"default"}});function Gd({variant:e="default",status:t,className:o,...a}){return Po("div",{"data-slot":"message-bubble","data-variant":e,"data-status":t,className:O(FM({variant:e}),t==="fail"&&"*:data-[slot=message-bubble-content]:border-fail",o),...a})}function Ud({className:e,render:t,...o}){return Qr({defaultTagName:"div",props:nt({className:O("w-fit max-w-full min-w-0 self-end rounded-overlay border px-3 py-2 type-body break-words whitespace-pre-wrap text-text-1 [overflow-wrap:anywhere]","forced-colors:border-[CanvasText]","[&:is(button,a)]:text-start [&:is(button,a)]:transition-colors [&:is(button,a)]:duration-(--dur-state) [&:is(button,a)]:hover:bg-hover",e)},o),render:t,state:{slot:"message-bubble-content"}})}var DM=rt("group/divider relative flex min-h-(--control-sm) w-full items-center gap-2 px-4 text-start type-caption text-text-2 [&_a]:text-text-1 [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4",{variants:{variant:{default:"",separator:"after:h-px after:min-w-4 after:flex-1 after:bg-line-faint",handoff:"justify-center before:h-px before:min-w-4 before:flex-1 before:bg-line after:h-px after:min-w-4 after:flex-1 after:bg-line forced-colors:before:bg-[CanvasText] forced-colors:after:bg-[CanvasText]"}},defaultVariants:{variant:"default"}}),OM={compaction:"Context compacted",interrupted:"Interrupted",handoff:qa.waiting},HM={compaction:Pw,interrupted:_w};function nx({className:e,variant:t,reason:o,to:a="person",labels:r,render:n,children:s,...i}){let l=o?r?.[o]??(o==="handoff"&&a==="agent"?void 0:OM[o]):void 0,u=t??(o==="handoff"&&a==="person"?"handoff":o?"separator":"default"),d=o==="compaction"||o==="interrupted"?HM[o]:void 0,p=s??l??null;return Qr({defaultTagName:"div",props:nt({role:"separator",className:O(DM({variant:u}),e),children:u==="handoff"?Po(Eo,{"data-slot":"message-divider-content",status:"waiting",size:"sm",className:"min-w-0 shrink",children:p}):pl(VM,{children:[d&&Po("span",{"data-slot":"message-divider-icon","aria-hidden":!0,className:"flex size-4 shrink-0 items-center justify-center text-text-3",children:Po(Fe,{icon:d,size:12})}),Po("span",{"data-slot":"message-divider-content",className:"min-w-0 shrink break-words",children:p})]})},{"data-reason":o,"data-variant":u,"aria-label":typeof s=="string"?s:l},i),render:n,state:{slot:"message-divider",variant:u}})}import{Fragment as qd,memo as e5,useEffect as v0,useMemo as t5,useRef as jd,useState as gx}from"react";import{useEffect as BM,useRef as _M,useState as x0}from"react";import{Fragment as $d,jsx as st,jsxs as Sn}from"react/jsx-runtime";var h0="as async await break case catch class const continue default delete do else enum export extends false finally for from function if import in instanceof interface let new null of return static super switch this throw true try type typeof undefined var void while yield",ZM={ts:{line:"//",block:["/*","*/"],quotes:"'\"`",multi:"`",keywords:new Set(h0.split(" ")),word:/^[A-Za-z_$][\w$]*/},tsx:{line:"//",block:["/*","*/"],quotes:"'\"`",multi:"`",keywords:new Set(h0.split(" ")),word:/^[A-Za-z_$][\w$]*/},js:{line:"//",block:["/*","*/"],quotes:"'\"`",multi:"`",keywords:new Set(h0.split(" ")),word:/^[A-Za-z_$][\w$]*/},json:{quotes:'"',keywords:new Set(["true","false","null"]),word:/^[A-Za-z_]\w*/},bash:{line:"#",quotes:`'"`,keywords:new Set("if then else elif fi for while do done case esac in function export local return".split(" ")),word:/^[A-Za-z_./@~-][\w./@~:=-]*/},python:{line:"#",quotes:`'"`,keywords:new Set("and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield".split(" ")),word:/^[A-Za-z_]\w*/},yaml:{line:"#",quotes:`'"`,keywords:new Set(["true","false","null","yes","no"]),word:/^[A-Za-z_][\w.-]*/},text:{quotes:"",keywords:new Set,word:/^\S+/}};function GM(e,t,o){let a=ZM[t],r=[],n=(i,l)=>{let c=r[r.length-1];c&&c.type===i?c.value+=l:r.push({type:i,value:l})},s=0;for(;s<e.length;){let i=e.slice(s);if(o.block&&a.block){let u=i.indexOf(a.block[1]);if(u<0){n("comment",i);break}n("comment",i.slice(0,u+a.block[1].length)),s+=u+a.block[1].length,o.block=!1;continue}if(o.quote){let u=0;for(;u<i.length&&i[u]!==o.quote;)u+=i[u]==="\\"?2:1;if(u>=i.length){n("string",i);break}n("string",i.slice(0,u+1)),s+=u+1,o.quote=void 0;continue}if(a.line&&i.startsWith(a.line)&&(a.line!=="#"||s===0||/\s/.test(e[s-1]))){n("comment",i);break}if(a.block&&i.startsWith(a.block[0])){o.block=!0,n("comment",a.block[0]),s+=a.block[0].length;continue}let l=e[s];if(a.quotes.includes(l)){let u=1;for(;u<i.length&&i[u]!==l;)u+=i[u]==="\\"?2:1;if(u>=i.length&&a.multi?.includes(l)){o.quote=l,n("string",i);break}let d=i.slice(0,u+1);s+=d.length,n((t==="json"||t==="yaml")&&/^\s*:/.test(e.slice(s))?"key":"string",d);continue}if(/\s/.test(l)){let u=i.match(/^\s+/)[0];n("plain",u),s+=u.length;continue}if(t!=="text"&&/\d/.test(l)&&!/[\w$]/.test(e[s-1]??"")){let u=i.match(/^\d[\d_.xXa-fA-FeEn]*/)[0];n("number",u),s+=u.length;continue}let c=i.match(a.word);if(c){let u=c[0];s+=u.length,t==="yaml"&&/^\s*:/.test(e.slice(s))&&!e.slice(0,s-u.length).trim().replace(/^-\s*/,"")?n("key",u):n(a.keywords.has(u)?"keyword":"plain",u);continue}n(t==="text"?"plain":"punct",l),s+=1}return r}function b0(e,t="text"){let o={};return e.split(`
`).map(a=>GM(a,t,o))}var UM={plain:"text-text-1",key:"text-text-1",number:"text-text-1",string:"text-text-1",keyword:"text-text-1 font-semibold",punct:"text-text-2",comment:"text-text-2"},$M="rounded-tag bg-pressed text-text-1",WM="rounded-tag bg-ink text-text-inverse";function qM(e,t,o,a){let r=t+e.length,n=[],s=t;return o.forEach(([i,l],c)=>{if(l<=t||i>=r)return;let u=Math.max(i,t),d=Math.min(l,r);u>s&&n.push(e.slice(s-t,u-t)),n.push(st("mark",{"data-current":c===a||void 0,className:c===a?WM:$M,children:e.slice(u-t,d-t)},c)),s=d}),s<r&&n.push(e.slice(s-t)),n}function y0({tokens:e,marks:t,current:o}){if(!e.length)return st($d,{children:`
`});let a=0;return st($d,{children:e.map((r,n)=>{let s=a;return a+=r.value.length,st("span",{className:UM[r.type],children:t?.length?qM(r.value,s,t,o):r.value},n)})})}function jM(e){if(!e)return new Set;if(Array.isArray(e))return new Set(e);let t=new Set;for(let o of e.split(",")){let[a,r]=o.trim().split("-").map(Number);if(a)for(let n=a;n<=(r||a);n++)t.add(n)}return t}var sx={ts:"TypeScript",tsx:"TSX",js:"JavaScript",json:"JSON",bash:"Shell",python:"Python",yaml:"YAML",text:"Text"};function w0({text:e,label:t="Copy code",onCopy:o,className:a}){let[r,n]=x0("idle"),s=_M(void 0);return BM(()=>()=>clearTimeout(s.current),[]),Sn($d,{children:[st(at,{"data-slot":"code-copy",variant:"ghost",size:"icon-sm","aria-label":t,onClick:async()=>{let l=typeof e=="function"?e():e;clearTimeout(s.current);try{await navigator.clipboard.writeText(l),n("copied"),o?.(l)}catch{n("failed")}s.current=setTimeout(()=>n("idle"),1600)},className:a,children:st(Fe,{icon:r==="copied"?as:Nd,size:12})}),st("span",{role:"status",className:"sr-only",children:r==="copied"?"Copied":r==="failed"?"Copy failed":""})]})}function KM(e){return e.length<=12?"•".repeat(e.length):e.slice(0,8)+"•".repeat(e.length-12)+e.slice(-4)}function YM({line:e,secret:t,revealed:o}){if(!t||o||!e.includes(t))return st(y0,{tokens:b0(e,"bash")[0]});let a=e.split(t);return st($d,{children:a.flatMap((r,n)=>{let s=st(y0,{tokens:b0(r,"bash")[0]},`t${n}`);return n===0?[s]:[st("span",{"data-slot":"code-block-secret",className:"text-text-2 select-none before:sr-only before:content-['hidden_secret']",children:st("span",{"aria-hidden":!0,children:KM(t)})},`s${n}`),s]})})}function Wd(e){return e.variant==="command"?st(JM,{...e}):st(XM,{...e})}var ix="overflow-auto focus-visible:focus-ring-inset",lx=e=>e?{"--code-max":`calc(${e} * 1lh + var(--space-6))`}:void 0;function XM({code:e,language:t="text",filename:o,header:a=!0,lineNumbers:r=!1,highlight:n,defaultWrap:s=!1,startLine:i=1,maxLines:l,copyLabel:c,onCopy:u,className:d,variant:p,prompt:f,secret:m,...v}){let[h,y]=x0(s),x=e.replace(/\n$/,""),g=b0(x,t),b=jM(n),w=String(i+g.length-1).length,C=o??sx[t];return Sn("figure",{"data-slot":"code-block","data-variant":"block","data-wrap":h||void 0,className:O("code-surface relative flex min-w-0 flex-col overflow-hidden rounded-overlay text-text-1 forced-colors:border forced-colors:border-[CanvasText]",d),...v,children:[a&&Sn("figcaption",{"data-slot":"code-block-header",className:"flex min-h-(--control) items-center gap-2 border-b border-line-faint ps-3 pe-1",children:[st("span",{className:O("min-w-0 flex-1 truncate",o?"type-code-block text-text-1":"type-caption text-text-2"),children:C}),o&&t!=="text"&&st("span",{className:"hidden type-caption text-text-2 sm:block",children:sx[t]}),st(at,{"data-slot":"code-block-wrap",variant:"ghost",size:"icon-sm","aria-label":"Wrap lines","aria-pressed":h,onClick:()=>y(R=>!R),className:"text-text-2 aria-pressed:text-text-1",children:st(Fe,{icon:qw,size:12,weight:h?"fill":"regular"})}),st(w0,{text:x,label:c,onCopy:u})]}),st("div",{"data-slot":"code-block-body",tabIndex:0,role:"region","aria-label":C,dir:"ltr",className:O(ix,"relative min-h-0 py-3 type-code-block",l&&"max-h-(--code-max)",!a&&"pe-8"),style:lx(l),children:st("pre",{className:h?"w-full":"w-max min-w-full",children:st("code",{className:"block",children:g.map((R,I)=>{let S=i+I,M=b.has(S);return Sn("span",{"data-slot":"code-block-line","data-highlighted":M||void 0,className:O("flex pe-3",!r&&"ps-3",M&&"bg-pressed forced-colors:outline forced-colors:outline-1 forced-colors:-outline-offset-1"),children:[r&&st("span",{"aria-hidden":!0,className:O("sticky start-0 w-(--gutter) shrink-0 ps-3 pe-3 text-end text-text-2 select-none",M?"bg-transparent text-text-1":"bg-code-surface"),style:{"--gutter":`calc(${w}ch + var(--space-6))`},children:S}),st("span",{className:O("min-w-0 flex-1",h?"whitespace-pre-wrap [overflow-wrap:anywhere]":"whitespace-pre",M&&"before:sr-only before:content-['Highlighted:_']"),children:st(y0,{tokens:R})})]},I)})})})}),!a&&st("span",{className:"absolute end-1 top-1.5",children:st(w0,{text:x,label:c,onCopy:u})})]})}function QM(e,t){let o=e.replace(/\n$/,"").split(`
`),a=t?`${t} `:"",r=!!a&&o.some(n=>n.startsWith(a));return o.map(n=>r?n.startsWith(a)?{kind:"command",text:n.slice(a.length)}:{kind:"output",text:n}:{kind:"command",text:n})}function JM({code:e,prompt:t="$",secret:o,maxLines:a,copyLabel:r="Copy command",onCopy:n,className:s,variant:i,language:l,filename:c,header:u,lineNumbers:d,highlight:p,defaultWrap:f,startLine:m,...v}){let[h,y]=x0(!1),x=QM(e,t),g=x.filter(w=>w.kind==="command").map(w=>w.text).join(`
`),b=x.filter(w=>w.kind==="command").length>1;return Sn("figure",{"data-slot":"code-block","data-variant":"command",className:O("code-surface flex min-w-0 items-start gap-1 rounded-overlay py-1 ps-3 pe-1 text-text-1 forced-colors:border forced-colors:border-[CanvasText]",s),...v,children:[st("div",{"data-slot":"code-block-body",tabIndex:0,role:"region","aria-label":b?"Commands":"Command",dir:"ltr",className:O(ix,"min-w-0 flex-1 py-1 type-code-block",a&&"max-h-(--code-max)"),style:lx(a),children:st("pre",{className:"w-max min-w-full",children:x.map((w,C)=>Sn("div",{"data-slot":w.kind==="command"?"code-block-command":"code-block-output",className:O("whitespace-pre",w.kind==="output"&&"text-text-2"),children:[w.kind==="command"&&t&&Sn("span",{"aria-hidden":!0,"data-slot":"code-block-prompt",className:"text-text-2 select-none",children:[t," "]}),st("code",{children:w.kind==="command"?st(YM,{line:w.text,secret:o,revealed:h}):w.text||" "})]},C))})}),Sn("span",{className:"flex shrink-0 items-center gap-0.5",children:[o&&st(at,{"data-slot":"code-block-reveal",variant:"ghost",size:"icon-sm","aria-label":h?"Hide secret":"Show secret","aria-pressed":h,onClick:()=>y(w=>!w),children:st(Fe,{icon:h?s0:c0,size:12})}),st(w0,{text:g,label:r,onCopy:n})]})]})}import{Fragment as yx,jsx as je,jsxs as Kd}from"react/jsx-runtime";var o5=24,cx=512,a5=/[\s.,!?;:)\]]/;function r5(e){return e<=12?2:e<=48?4:e<=96?8:Math.min(256,Math.ceil(e/4))}function n5(e,t){let o=Math.min(e.length,t+r5(e.length-t)),a=Math.min(e.length,o+8);for(let r=o;r<a;r++)if(a5.test(e[r]??""))return r+1;return o}var s5=()=>typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function i5(e,t,o=!0){let[a,r]=gx(e),n=jd(e),s=jd(e),i=jd(void 0);return s.current=e,v0(()=>{let l=p=>{n.current=p,r(p)},c=()=>{i.current&&clearTimeout(i.current),i.current=void 0},u=!t||!o||s5()||typeof document<"u"&&document.hidden,d=()=>{i.current=void 0;let p=s.current,f=n.current;if(!p.startsWith(f)||p.length-f.length<=cx){l(p);return}let m=n5(p,f.length);l(p.slice(0,m)),m<p.length&&(i.current=setTimeout(d,o5))};if(u||!e.startsWith(n.current)){c(),l(e);return}if(e.length-n.current.length<=cx&&!i.current){l(e);return}i.current||d()},[e,t,o]),v0(()=>{let l=()=>{i.current&&clearTimeout(i.current),i.current=void 0,n.current=s.current,r(s.current)},c=()=>{document.hidden||l()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",l),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",l),i.current&&clearTimeout(i.current)}},[]),t&&o?a:e}function l5(e){let t=0,o=!1,a=!1,r=!1;for(let n=0;n<e.length;n++){let s=e[n];if(o){a?a=!1:s==="\\"?a=!0:s==='"'&&(o=!1);continue}if(s==='"')o=!0;else if(s==="{"||s==="[")t++,r=!0;else if(s==="}"||s==="]"){if(t--,r&&t===0)return n+1;if(t<0)return-1}}return-1}function c5(e){let t=[],o=!1,a=!1,r=-1;for(let i=0;i<e.length;i++){let l=e[i];if(o){a?a=!1:l==="\\"?a=!0:l==='"'&&(o=!1);continue}l==='"'?(o=!0,r=i):l==="{"||l==="["?t.push(l):(l==="}"||l==="]")&&t.pop()}let n=e;o&&(n=(a?n.slice(0,-1):n)+'"'),n=n.replace(/\s+$/,"");let s=o?r:-1;if(/[,]$/.test(n)?n=n.slice(0,-1):/:$/.test(n)?n+="null":/(?:^|[^\w"])(t|tr|tru)$/.test(n)?n=n.replace(/(t|tr|tru)$/,"true"):/(?:^|[^\w"])(f|fa|fal|fals)$/.test(n)?n=n.replace(/(f|fa|fal|fals)$/,"false"):/(?:^|[^\w"])(n|nu|nul)$/.test(n)?n=n.replace(/(n|nu|nul)$/,"null"):/[-+.eE]$/.test(n)&&(n+="0"),t.at(-1)==="{"&&n.endsWith('"')){let i=s!==-1?s:n.lastIndexOf('"',n.length-2),l=n.slice(0,i).replace(/\s+$/,"").at(-1);(l==="{"||l===",")&&(n+=":null")}for(let i=t.length-1;i>=0;i--)n+=t[i]==="{"?"}":"]";return n}function ux(e){if(!e.trim())return!0;try{return JSON.parse(c5(e)),!0}catch{return!1}}function u5(e){let t=e.length-e.trimStart().length;if(!/^[[{]/.test(e.trimStart()))return e.trim()?0:e.length;if(ux(e))return e.length;let o=t+1,a=e.length;for(;o<a;){let r=Math.ceil((o+a)/2);ux(e.slice(0,r))?o=r:a=r-1}return o}var d5=/([\w-]+)="([^"]*)"/g,p5=e=>Object.fromEntries([...e.matchAll(d5)].map(t=>[t[1],t[2]])),hx=/^<([a-z][\w-]*)((?:\s+[\w-]+="[^"]*")*)\s*>/;function m5(e,t=()=>!0){let o=e.split(`
`),a=[],r=[],n=0,s=0,i=()=>{r.length&&r.some(l=>l.trim())&&a.push({text:r.join(`
`),kind:"md",start:n}),r=[]};for(let l=0;l<o.length;l++){let c=o[l],u=c.match(/^(\s{0,3})(`{3,}|~{3,})/),d=c.match(hx),p=d&&t(d[1])?d:null;if(u||p){i();let f=s,m=[c];if(s+=c.length+1,u){let v=new RegExp(`^\\s{0,3}${u[2][0]}{${u[2].length},}\\s*$`);for(;++l<o.length&&(m.push(o[l]),s+=o[l].length+1,!v.test(o[l])););a.push({text:m.join(`
`),kind:"fence",start:f})}else{let v=`</${p[1]}>`,h=c.includes(v);for(;!h&&++l<o.length;)m.push(o[l]),s+=o[l].length+1,h=o[l].includes(v);a.push({text:m.join(`
`),kind:"tag",start:f})}n=s;continue}if(!c.trim()){i(),s+=c.length+1,n=s;continue}r.length||(n=s),r.push(c),s+=c.length+1}return i(),a}var dx=e=>e.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(t=>t.trim());function f5(e,t){let o=e.split(`
`),a=[],r=[],n=()=>{r.length&&a.push({type:"p",text:r.join(" ")}),r=[]};for(let s=0;s<o.length;s++){let i=o[s];if(!i.trim()){n();continue}if(/^\s*\|/.test(i)){n();let p=[];for(;s<o.length&&/^\s*\|/.test(o[s]);)p.push(o[s++]);if(s--,!(p[1]&&/^\s*\|?\s*:?-{2,}/.test(p[1]))){t||p.forEach(v=>r.push(v));continue}let m=p.slice(2);t&&m.length&&!/\|\s*$/.test(m.at(-1))&&m.pop(),a.push({type:"table",head:dx(p[0]),rows:m.map(dx)});continue}let l=i.match(/^(#{1,3})\s+(.*)$/);if(l){n(),a.push({type:"h",level:l[1].length,text:l[2]});continue}if(/^(-{3,}|\*{3,})\s*$/.test(i)){n(),a.push({type:"hr"});continue}let c=i.match(/^>\s?(.*)$/);if(c){n();let p=a.at(-1);p?.type==="quote"?p.text+=` ${c[1]}`:a.push({type:"quote",text:c[1]});continue}let u=i.match(/^\s*(?:([-*+])|(\d+)[.)])\s+(.*)$/);if(u){n();let p=u[1]?"ul":"ol",f=a.at(-1);f&&f.type===p?f.items.push(u[3]):a.push({type:p,items:[u[3]]});continue}let d=a.at(-1);if(!r.length&&d&&(d.type==="ul"||d.type==="ol")&&/^\s+\S/.test(i)){d.items[d.items.length-1]+=` ${i.trim()}`;continue}r.push(i.trim())}return n(),a}function g5(e,t){let o=e;for(let a of t)a.partial&&(o=o.replace(a.partial,""));return o=o.replace(/\[([^\]]*)\]\([^)]*$/,"$1").replace(/\[([^\]]*)$/,"$1"),(o.match(/`/g)?.length??0)%2&&(o+="`"),(o.replace(/`[^`]*`/g,"").match(/\*\*/g)?.length??0)%2&&(o=/\*\*\s*$/.test(o)?o.replace(/\*\*\s*$/,""):o+"**"),o.replace(/(^|\s)[*_]$/,"$1")}var h5=e=>/^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(e)?e:void 0,b5=["`[^`]+`","\\*\\*[^*]+\\*\\*","\\*[^*\\s][^*]*\\*|(?<![\\w])_[^_\\s][^_]*_(?![\\w])","\\[[^\\]]+\\]\\((?:[^()\\s]|\\([^()\\s]*\\))+\\)"],px=e=>e.flags.replace(/[^ius]/g,""),bx=[],mx=new WeakMap;function y5(e){let t=mx.get(e);if(!t){let o=[...new Set(e.flatMap(a=>[...px(a.pattern)]))].join("");t={all:new RegExp([...b5,...e.map(a=>a.pattern.source)].map(a=>`(${a})`).join("|"),`g${o}`),whole:e.map(a=>new RegExp(`^(?:${a.pattern.source})$`,px(a.pattern)))},mx.set(e,t)}return t}function I0({text:e,tags:t=bx,streaming:o=!1}){let{all:a,whole:r}=y5(t),n=[],s=0,i=0;for(let l of e.matchAll(a)){l.index>s&&n.push(e.slice(s,l.index));let c=l[0];if(l[1])n.push(je("code",{className:"rounded-tag well px-1 text-text-1 [overflow-wrap:anywhere]",children:c.slice(1,-1)},i++));else if(l[2])n.push(je("strong",{className:"font-semibold text-text-1",children:je(I0,{text:c.slice(2,-2),tags:t,streaming:o})},i++));else if(l[3])n.push(je("em",{children:je(I0,{text:c.slice(1,-1),tags:t,streaming:o})},i++));else if(l[4]){let[,u,d]=c.match(/^\[([^\]]+)\]\((.+)\)$/)??[],p=h5(d??"");n.push(p?je("a",{href:p,className:"text-text-1 underline decoration-1 underline-offset-4 transition-[text-decoration-color,outline-color] duration-(--dur-state) hover:decoration-2 [overflow-wrap:anywhere]",.../^https?:/i.test(p)?{target:"_blank",rel:"noreferrer noopener"}:{},children:u},i++):je(qd,{children:u},i++))}else{let u=r.findIndex(p=>p.test(c)),d=u===-1?null:c.match(r[u]);n.push(d?je(qd,{children:t[u].render(d,{streaming:o,key:i})},i++):c)}s=l.index+c.length}return s<e.length&&n.push(e.slice(s)),je(yx,{children:n.map((l,c)=>je(qd,{children:l},c))})}function w5(e,t){let o=t.tail?e.findLastIndex(a=>a.type!=="hr"&&a.type!=="table"):-1;return e.map((a,r)=>{let n=r===o,s=(i,l=n)=>je(I0,{text:l?g5(i,t.tags):i,tags:t.tags,streaming:t.streaming});switch(a.type){case"p":return je("p",{children:s(a.text)},r);case"quote":return je("blockquote",{className:"ps-3 text-text-2",children:s(a.text)},r);case"h":{let i=`h${a.level+2}`;return je(i,{className:O("pt-1 text-text-1",a.level===1?"type-heading-sm":a.level===2?"type-label-lg":"type-label"),children:s(a.text)},r)}case"ul":case"ol":{let i=a.type;return je(i,{className:"flex flex-col gap-1",children:a.items.map((l,c)=>Kd("li",{className:"flex gap-2",children:[a.type==="ul"?je("span",{"aria-hidden":!0,className:"flex h-lh w-4 shrink-0 items-center",children:je("span",{className:"h-px w-2 bg-text-2 forced-colors:bg-[CanvasText]"})}):Kd("span",{"aria-hidden":!0,className:"min-w-4 shrink-0 text-text-2 data",children:[c+1,"."]}),je("span",{className:"min-w-0",children:s(l,n&&c===a.items.length-1)})]},c))},r)}case"hr":return je("hr",{className:"h-px border-0 bg-line-faint"},r);case"table":return je("div",{"data-slot":"response-table",className:"min-w-0 overflow-x-auto",children:Kd("table",{className:"w-full text-start type-body-sm",children:[je("thead",{children:je("tr",{className:"border-b border-line-faint",children:a.head.map((i,l)=>je("th",{scope:"col",className:"h-(--menu-row) px-3 text-start type-label-sm text-text-2 first:ps-0",children:s(i,!1)},l))})}),je("tbody",{children:a.rows.map((i,l)=>je("tr",{className:"rule-row",children:i.map((c,u)=>je("td",{className:"h-(--menu-row) px-3 py-1.5 align-top first:ps-0",children:s(c,!1)},u))},l))})]})},r)}})}var x5=e5(function({text:t,tags:o,live:a}){return je(yx,{children:w5(f5(t,a),{tail:a,tags:o,streaming:a})})}),v5={ts:"ts",typescript:"ts",tsx:"tsx",js:"js",javascript:"js",jsx:"js",json:"json",jsonl:"json",bash:"bash",sh:"bash",shell:"bash",zsh:"bash",console:"bash",python:"python",py:"python",yaml:"yaml",yml:"yaml"};function I5({text:e,open:t,maxLines:o}){let a=e.split(`
`),r=a[0].replace(/^\s*(`{3,}|~{3,})\s*/,"").trim().toLowerCase(),n=a.slice(1,t?void 0:-1);return je(Wd,{"data-slot":"response-code","data-open":t||void 0,code:n.join(`
`),language:v5[r]??"text",maxLines:o})}function fx({label:e}){return je("div",{"data-slot":"response-pending",className:"flex h-(--row) items-center gap-2 rounded-overlay border border-line-faint bg-paper px-3",children:je(Eo,{status:"running",children:e})})}function C5(e,t,o,a){let r=e.match(hx),[n,s,i]=r,l=t[s];if(!l)return{outcome:"literal",node:je("p",{className:"whitespace-pre-wrap [overflow-wrap:anywhere]",children:e})};let c=p5(i),u=`</${s}>`,d=e.slice(n.length),p=d.indexOf(u),f=p===-1?d:d.slice(0,p),m=p===-1?"":d.slice(p+u.length);if(l.json===!1){if(p!==-1)return{outcome:"segment",node:l.render(f.trim(),c),rest:m};if(o&&!a)return{outcome:"pending",node:je(fx,{label:l.pending})};let[y,...x]=e.split(`
`);return{outcome:"literal",node:je("p",{className:"[overflow-wrap:anywhere]",children:y}),rest:x.join(`
`)}}let v=l5(f);if(v!==-1)try{let y=JSON.parse(f.slice(0,v));return{outcome:"segment",node:l.render(y,c),rest:(p===-1?f.slice(v):f.slice(v)+m).replace(new RegExp(`^\\s*${u.replace("/","\\/")}`),"")}}catch{return{outcome:"discard",node:null,rest:p===-1?f.slice(v):m}}let h=u5(f);return h===0&&f.trim()?{outcome:"literal",node:je("p",{className:"whitespace-pre-wrap [overflow-wrap:anywhere]",children:f.trim()}),rest:m}:h>=f.length&&p===-1?o?{outcome:"pending",node:je(fx,{label:l.pending})}:{outcome:"discard",node:null}:{outcome:"discard",node:null,rest:p===-1?f.slice(h):m}}var R5=rt("flex min-w-0 flex-col text-text-1 break-words",{variants:{size:{default:"gap-3 type-body",sm:"gap-2 type-body-sm"}},defaultVariants:{size:"default"}});function Yd({children:e,streaming:t=!1,pace:o=!0,tags:a,inlineTags:r=bx,tagTimeout:n=8e3,maxCodeLines:s=24,size:i="default",className:l,...c}){let u=i5(e,t,o),d=jd(t);t&&(d.current=!0);let p=a??S5,f=t5(()=>g=>Object.hasOwn(p,g),[p]),[m,v]=gx(null),h="",y=(g,b,w)=>{let C=m5(g,f);return C.map((R,I)=>{let S=b+R.start,M=I===C.length-1&&t;if(R.kind==="fence"){let T=!/^\s{0,3}(`{3,}|~{3,})\s*$/.test(R.text.split(`
`).at(-1)??"")||R.text.split(`
`).length===1;return je(I5,{text:R.text,open:T,maxLines:s},S)}if(R.kind==="tag"){let T=C5(R.text,p,M,m===S);M&&(T.outcome==="pending"||m===S)&&(h=`${S}:${R.text.length}`);let V=T.rest?.trim()&&w<8?T.rest:"";return Kd(qd,{children:[je("div",{"data-slot":"response-tag","data-outcome":T.outcome,className:"min-w-0",children:T.node}),V&&y(V,S+R.text.length-V.length,w+1)]},S)}return je(x5,{text:R.text,tags:r,live:M},S)})},x=y(u,0,0);return v0(()=>{if(v(null),!h||!t)return;let g=setTimeout(()=>v(Number(h.split(":")[0])),n);return()=>clearTimeout(g)},[h,t,n]),je("div",{"data-slot":"response","data-streaming":t||void 0,"data-streamed":d.current||void 0,"aria-busy":t||void 0,className:O(R5({size:i}),l),...c,children:x})}var S5={};var wa={};ua(wa,{Panel:()=>Vx,Root:()=>Tx,Trigger:()=>zx});import*as wl from"react";import*as op from"react";import*as ls from"react";function ya({controlled:e,default:t,name:o,state:a="value"}){let{current:r}=ls.useRef(e!==void 0),[n,s]=ls.useState(()=>t),i=r&&e!==void 0?e:n,l=ls.useCallback(c=>{r||s(c)},[]);return[i,l]}import*as Jd from"react";import*as Xd from"react";function Qd(){let[,e]=Xd.useState({});return Xd.useCallback(()=>{e({})},[])}var wx=0;function k5(e,t="mui"){let o=Jd.useRef(void 0),a=Qd(),r=e??o.current;return Jd.useEffect(()=>{o.current==null&&(wx+=1,o.current=`${t}-${wx}`,e==null&&a())},[e,t,a]),r}var xx=dl.useId;function Nr(e,t){if(xx!==void 0){let o=xx();return e??(t?`${t}-${o}`:o)}return k5(e,t)}function tt(e){return Nr(e,"base-ui")}function fe(e,t,o,a){let r=!1,n=!1,s=a??Le;return{reason:e,event:t??new Event("base-ui"),cancel(){r=!0},allowPropagation(){n=!0},get isCanceled(){return r},get isPropagationAllowed(){return n},trigger:o,...s}}function vx(e,t,o){let a=o??Le;return{reason:e,event:t??new Event("base-ui"),...a}}var _={};ua(_,{cancelOpen:()=>tE,chipRemovePress:()=>D5,clearPress:()=>F5,closePress:()=>L5,closeWatcher:()=>q5,decrementPress:()=>V5,disabled:()=>aE,drag:()=>X5,escapeKey:()=>W5,focusOut:()=>$5,imperativeAction:()=>sE,incrementPress:()=>H5,initial:()=>nE,inputBlur:()=>Z5,inputChange:()=>B5,inputClear:()=>_5,inputPaste:()=>G5,inputPress:()=>U5,itemPress:()=>z5,keyboard:()=>K5,linkPress:()=>N5,listNavigation:()=>j5,missing:()=>rE,none:()=>M5,outsidePress:()=>A5,pointer:()=>Y5,popupClose:()=>eE,scrub:()=>J5,siblingOpen:()=>oE,swipe:()=>iE,trackPress:()=>O5,triggerFocus:()=>T5,triggerHover:()=>P5,triggerPress:()=>E5,wheel:()=>Q5,windowResize:()=>lE});var M5="none",E5="trigger-press",P5="trigger-hover",T5="trigger-focus",A5="outside-press",z5="item-press",L5="close-press",N5="link-press",F5="clear-press",D5="chip-remove-press",O5="track-press",H5="increment-press",V5="decrement-press",B5="input-change",_5="input-clear",Z5="input-blur",G5="input-paste",U5="input-press",$5="focus-out",W5="escape-key",q5="close-watcher",j5="list-navigation",K5="keyboard",Y5="pointer",X5="drag",Q5="wheel",J5="scrub",eE="popup-close",tE="cancel-open",oE="sibling-open",aE="disabled",rE="missing",nE="initial",sE="imperative-action",iE="swipe",lE="window-resize";import*as R0 from"react";import*as Ix from"react";function ei(e){Ix.useEffect(e,Nt)}var ep=null,fB=globalThis.requestAnimationFrame,C0=class{callbacks=[];callbacksCount=0;nextId=1;startId=1;isScheduled=!1;tick=t=>{this.isScheduled=!1;let o=this.callbacks,a=this.callbacksCount;if(this.callbacks=[],this.callbacksCount=0,this.startId=this.nextId,a>0)for(let r=0;r<o.length;r+=1)o[r]?.(t)};request(t){let o=this.nextId;return this.nextId+=1,this.callbacks.push(t),this.callbacksCount+=1,(!this.isScheduled||!1)&&(requestAnimationFrame(this.tick),this.isScheduled=!0),o}cancel(t){let o=t-this.startId;o<0||o>=this.callbacks.length||this.callbacks[o]!==null&&(this.callbacks[o]=null,this.callbacksCount-=1)}},tp=new C0;var Lo=class e{static create(){return new e}static request(t){return tp.request(t)}static cancel(t){return tp.cancel(t)}currentId=ep;request(t){this.cancel(),this.currentId=tp.request(()=>{this.currentId=ep,t()})}cancel=()=>{this.currentId!==ep&&(tp.cancel(this.currentId),this.currentId=ep)};disposeEffect=()=>this.cancel};function Aa(){let e=$e(Lo.create).current;return ei(e.disposeEffect),e}function ja(e,t=!1,o=!1,a=!1){let[r,n]=R0.useState(e&&t?"idle":void 0),[s,i]=R0.useState(e&&!a);return e&&!s&&(i(!0),n("starting")),!e&&s&&r!=="ending"&&!o&&n("ending"),!e&&!s&&r==="ending"&&n(void 0),B(()=>{if(!e&&s&&r!=="ending"&&o){let l=Lo.request(()=>{n("ending")});return()=>{Lo.cancel(l)}}},[e,s,r,o]),B(()=>{if(!e||t||r===void 0)return;let l=Lo.request(()=>{n(void 0)});return()=>{Lo.cancel(l)}},[t,e,r]),B(()=>{if(!e||!t)return;e&&s&&r!=="idle"&&n("starting");let l=Lo.request(()=>{n("idle")});return()=>{Lo.cancel(l)}},[t,e,s,r]),{mounted:s,setMounted:i,transitionStatus:r}}function Cx(e){let{open:t,defaultOpen:o=!1,onOpenChange:a,disabled:r}=e,[n,s]=ya({controlled:t,default:o,name:"Collapsible",state:"open"}),{mounted:i,setMounted:l,transitionStatus:c}=ja(n,!0,!0),u=tt(),[d,p]=op.useState(),f=d===null?void 0:d??u,m=W(v=>{let h=!n,y=fe(_.triggerPress,v.nativeEvent);a(h,y),!y.isCanceled&&s(h)});return op.useMemo(()=>({defaultPanelId:u,disabled:r,handleTrigger:m,mounted:i,open:n,panelId:f,setMounted:l,setOpen:s,setPanelIdState:p,transitionStatus:c}),[u,r,m,i,n,f,l,s,p,c])}import*as ap from"react";var S0=ap.createContext(void 0);function rp(){let e=ap.useContext(S0);if(e===void 0)throw new Error(He(15));return e}var ti={};ua(ti,{endingStyle:()=>k0,startingStyle:()=>bl});var bl="data-starting-style",k0="data-ending-style";var cE={[bl]:""},uE={[k0]:""},Ka={transitionStatus(e){return e==="starting"?cE:e==="ending"?uE:null}};var Rx="data-open",Sx="data-closed",yl=ti.startingStyle,TB=ti.endingStyle;var kx="data-panel-open";var dE={[Rx]:""},pE={[Sx]:""},Ex={open(e){return e?{[kx]:""}:null}},Px={open(e){return e?dE:pE}};var np={...Px,...Ka};import{jsx as mE}from"react/jsx-runtime";var Tx=wl.forwardRef(function(t,o){let{render:a,className:r,defaultOpen:n=!1,disabled:s=!1,onOpenChange:i,open:l,style:c,...u}=t,d=W(i),p=Cx({open:l,defaultOpen:n,onOpenChange:d,disabled:s}),f=wl.useMemo(()=>({open:p.open,disabled:p.disabled,transitionStatus:p.transitionStatus}),[p.open,p.disabled,p.transitionStatus]),m=wl.useMemo(()=>({...p,onOpenChange:d,state:f}),[p,d,f]),v=me("div",t,{state:f,ref:o,props:u,stateAttributesMapping:np});return mE(S0.Provider,{value:m,children:v})});import*as Ax from"react";var fE={...Ex,...Ka},zx=Ax.forwardRef(function(t,o){let{panelId:a,open:r,handleTrigger:n,state:s,disabled:i}=rp(),{className:l,disabled:c=i,render:u,nativeButton:d=!0,style:p,...f}=t,{getButtonProps:m,buttonRef:v}=Go({disabled:c,native:d});return me("button",t,{state:s,ref:[o,v],props:[{"aria-controls":r?a:void 0,"aria-expanded":r,onClick:n},f,m],stateAttributesMapping:fE})});import*as P0 from"react";import*as da from"react";function De(e,t,o,a){return e.addEventListener(t,o,a),()=>{e.removeEventListener(t,o,a)}}var xl=0,Uo=class e{static create(){return new e}currentId=xl;start(t,o){this.clear(),this.currentId=setTimeout(()=>{this.currentId=xl,o()},t)}isStarted(){return this.currentId!==xl}clear=()=>{this.currentId!==xl&&(clearTimeout(this.currentId),this.currentId=xl)};disposeEffect=()=>this.clear};function it(){let e=$e(Uo.create).current;return ei(e.disposeEffect),e}function ft(e){let t=$e(gE,e).current;return t.next=e,B(t.effect),t}function gE(e){let t={current:e,next:e,effect:()=>{t.current=t.next}};return t}import*as Lx from"react";function ur(e){return e==null?e:"current"in e?e.current:e}function E0(e,t){return e.getAnimations(t).filter(o=>{let a=o.effect?.getTiming();return a?.duration!==1/0&&a?.iterations!==1/0})}var sp=null;function hE(e){if(!sp){let t=[];sp=t,queueMicrotask(()=>{sp=null,Ta(()=>{for(let o of t)o()})})}sp.push(e)}function Ya(e,t=!1,o=!1){let a=Aa();return W((r,n=null)=>{a.cancel();let s=ur(e);if(s==null)return;let i=s,l=()=>{if(!o){Ta(r);return}hE(()=>{n?.aborted||r()})};if(typeof i.getAnimations!="function"||globalThis.BASE_UI_ANIMATIONS_DISABLED){r();return}function c(){Promise.all(E0(i).map(u=>u.finished.then(Be))).then(()=>{n?.aborted||l()},()=>{if(n?.aborted)return;if(E0(i).some(d=>d.pending||d.playState!=="finished")){c();return}l()})}if(t){let u=bl;if(!i.hasAttribute(u)){a.request(c);return}let d=new MutationObserver(()=>{i.hasAttribute(u)||(d.disconnect(),c())});d.observe(i,{attributes:!0,attributeFilter:[u]}),n?.addEventListener("abort",()=>d.disconnect(),{once:!0});return}a.request(c)})}function oa(e){let{enabled:t=!0,open:o,ref:a,batch:r=!1,onComplete:n}=e,s=W(n),i=Ya(a,o,r);Lx.useEffect(()=>{if(!t)return;let l=new AbortController;return i(s,l.signal),()=>{l.abort()}},[t,o,s,i])}var oi={height:void 0,width:void 0};function Fx(e){let{externalRef:t,hiddenUntilFound:o,id:a,keepMounted:r,mounted:n,onOpenChange:s,open:i,setMounted:l,setOpen:c,transitionStatus:u}=e,d=da.useRef(null),p=da.useRef(null),[f,m]=da.useState(oi),v=da.useRef(oi),h=da.useRef(!1),y=da.useRef(i),x=da.useRef(!1),[g,b]=da.useState(!1),w=da.useRef(null),C=Ht(t,d),R=ft(i),I=Ya(d),S=!i&&!n,M=g?"idle":u,T=i&&(y.current||x.current),V=!i&&n&&p.current==="css-animation"&&f.height===void 0&&f.width===void 0?v.current:f,F=o&&S&&p.current!=="css-animation",L=W((A,E=!0)=>{E&&(v.current=A),m(A)}),P=W(()=>{w.current?.(),w.current=null}),H=W(A=>{P(),w.current=()=>{w.current=null,A()}}),D=W(()=>{i&&n&&p.current==="css-animation"&&(x.current=!0)});B(()=>{!g||u==="starting"||b(!1)},[g,u]),da.useEffect(()=>()=>{D(),P()},[D,P]),B(()=>{i||(y.current=!1,x.current=!1);let A=d.current;if(!A)return;!i&&w.current&&P();let E=bE(A,T);if(p.current=E,i&&u==="idle"&&y.current&&E==="css-animation"){v.current=ai(A);return}if(i&&u==="starting"){let oe=h.current;if(h.current=!1,E==="none"){L(ai(A)),b(!0);return}if(E==="css-transition"){let U=yE(A);if(L(ai(A)),!oe)return U;let ae=ip(A,"transition-duration","0s");return H(ae),b(!0),U}L(ai(A));let X=ip(A,"animation-name","none");if(!oe){X();return}let Z=ip(A,"animation-duration","0s");X(),H(Z),b(!0);return}if(!i&&n&&(u==="idle"||u==="starting")){if(E==="none"){L(oi,!1),l(!1);return}L(ai(A));return}if(u!=="ending")return;if(E==="none"){l(!1);return}let G=ai(A);if(!(G.height>0||G.width>0)){l(!1);return}L(G),E==="css-animation"&&ip(A,"animation-name","none")()},[n,i,P,L,l,H,T,u]),oa({enabled:i&&n&&M==="idle",open:!0,ref:d,onComplete(){i&&L(oi,!1)}}),da.useEffect(()=>{if(i||!n||M!=="ending")return;if(!d.current){l(!1),L(oi,!1);return}let E=new AbortController,G=-1;function z(){R.current||(l(!1),L(oi,!1))}return G=Lo.request(()=>{I(z,E.signal)}),()=>{Lo.cancel(G),E.abort()}},[R,n,i,M,I,L,l]),B(()=>{let A=d.current;!A||!o||!S||A.setAttribute("hidden","until-found")},[S,o]),da.useEffect(function(){let E=d.current;if(!E)return;let G=Uo.create(),z=-1,oe=(U,ae)=>{G.start(0,()=>{R.current||(z=Lo.request(()=>{R.current||(U&&(h.current=!1),ae&&E.setAttribute(yl,""),E.setAttribute("hidden","until-found"))}))})},Z=De(E,"beforematch",U=>{let ae=fe(_.none,U);if(s(!0,ae),ae.isCanceled){oe(!1,!1);return}h.current=!0;let we=E.hasAttribute(yl);E.removeAttribute(yl),c(!0),oe(!0,we)});return()=>{G.clear(),Lo.cancel(z),Z()}},[R,s,c]);let N=r||o||n||i;return{height:V.height,props:{...F?{[yl]:""}:void 0,hidden:S,id:a},ref:C,shouldPreventOpenAnimation:T,shouldRender:N,transitionStatus:M,width:V.width}}function ai(e){return{height:e.scrollHeight,width:e.scrollWidth}}function bE(e,t){let o=Qe(e).getComputedStyle(e),a=(o.animationName.split(",").map(n=>n.trim()).some(n=>n!==""&&n!=="none")||t)&&Nx(o.animationDuration),r=Nx(o.transitionDuration);return a&&r||r?"css-transition":a?"css-animation":"none"}function Nx(e){return e.split(",").map(t=>t.trim()).some(t=>t!==""&&Number.parseFloat(t)>0)}function ip(e,t,o){let a=e.style.getPropertyValue(t),r=e.style.getPropertyPriority(t);return e.style.setProperty(t,o),()=>{if(a===""){e.style.removeProperty(t);return}e.style.setProperty(t,a,r)}}function yE(e){let t={"justify-content":e.style.justifyContent,"align-items":e.style.alignItems,"align-content":e.style.alignContent,"justify-items":e.style.justifyItems};Object.keys(t).forEach(r=>{e.style.setProperty(r,"initial","important")});function o(){Object.entries(t).forEach(([r,n])=>{if(n===""){e.style.removeProperty(r);return}e.style.setProperty(r,n)})}let a=Lo.request(o);return()=>{Lo.cancel(a),o()}}var Dx="--collapsible-panel-height",Ox="--collapsible-panel-width";var Vx=P0.forwardRef(function(t,o){let{className:a,hiddenUntilFound:r,keepMounted:n,render:s,id:i,style:l,...c}=t,{defaultPanelId:u,mounted:d,onOpenChange:p,open:f,setMounted:m,setPanelIdState:v,setOpen:h,state:y,transitionStatus:x}=rp(),g=r??!1,b=n??!1,w=i||void 0,C=w??u;B(()=>(v(D=>w??(D===null?void 0:D)),()=>{v(D=>D===w?null:D)}),[w,v]);let{height:R,props:I,ref:S,shouldPreventOpenAnimation:M,shouldRender:T,transitionStatus:V,width:F}=Fx({externalRef:o,hiddenUntilFound:g,id:C,keepMounted:b,mounted:d,onOpenChange:p,open:f,setMounted:m,setOpen:h,transitionStatus:x}),L={...y,transitionStatus:V},P=nu(l,L),H=me("div",{...t,style:void 0},{state:L,ref:S,props:[I,{style:{[Dx]:R===void 0?"auto":`${R}px`,[Ox]:F===void 0?"auto":`${F}px`}},c,P?{style:P}:void 0,M?{style:{animationName:"none"}}:void 0],stateAttributesMapping:np});return T?H:null});import{createContext as hP,useContext as bP,useEffect as mv,useLayoutEffect as yP,useRef as wp,useState as fv}from"react";import{useEffect as A0,useRef as Bx,useState as z0}from"react";import{jsx as Ho,jsxs as T0}from"react/jsx-runtime";function lp(e){let t=Number.isFinite(e)?Math.max(0,e):0;if(Math.round(t)<1e3)return`${Math.round(t)}ms`;let o=Math.round(t/100);if(o<600)return`${(o/10).toFixed(1)}s`;let a=i=>String(i).padStart(2,"0"),r=Math.round(t/1e3);if(r<3600)return`${Math.floor(r/60)}m ${a(r%60)}s`;let n=Math.round(t/6e4);if(n<1440)return`${Math.floor(n/60)}h ${a(n%60)}m`;let s=Math.round(t/36e5);return`${Math.floor(s/24)}d ${a(s%24)}h`}function ri(e){return Number.isFinite(e)?e.toLocaleString("en-US"):"0"}function L0({active:e=!0,className:t,render:o,children:a,...r}){return Qr({defaultTagName:"span",props:nt({className:O(t),children:a},{"data-slot":"activity-text","data-active":e||void 0},r),render:o,state:{slot:"activity-text",active:e}})}function cs({className:e}){return Ho("span",{"aria-hidden":!0,"data-slot":"activity-arc",className:O("flex size-4 shrink-0 items-center justify-center",e),children:Ho(Fe,{icon:rs,size:12,className:"animate-spin motion-reduce:animate-none"})})}var wE={running:"ran",reading:"read",writing:"wrote",finding:"found",building:"built",sending:"sent",getting:"got",making:"made",thinking:"thought",setting:"set",putting:"put",cutting:"cut",taking:"took",giving:"gave",seeing:"saw",choosing:"chose",bringing:"brought",keeping:"kept",leaving:"left",holding:"held",drawing:"drew",spending:"spent",splitting:"split",telling:"told",understanding:"understood",rewriting:"rewrote",rerunning:"reran",rebuilding:"rebuilt",resetting:"reset",doing:"did",going:"went",paying:"paid",saying:"said",meeting:"met",feeding:"fed",winning:"won",gathering:"gathered"},xE=e=>!!e&&"aeiou".includes(e);function N0(e){let[t,...o]=e.split(" "),a=t.toLowerCase();if(!a.endsWith("ing")||a.length<5)return e;let r=a.slice(0,-3),n=wE[a]??(r.endsWith("y")&&!xE(r.at(-2))?`${r.slice(0,-1)}ied`:`${r}ed`);return[t[0]===t[0].toUpperCase()?n[0].toUpperCase()+n.slice(1):n,...o].join(" ")}function _x(e,t=[]){let o=e.filter(Boolean).join(", ");return[o?o[0].toUpperCase()+o.slice(1):"",...t.filter(Boolean)].filter(Boolean).join(", ")}var vE=1e3;function IE(e,t,o){let[a,r]=z0(e),n=Bx(0);return A0(()=>{if(e===a)return;if(!t){r(e),n.current=Date.now();return}let s=Math.max(0,o-(Date.now()-n.current)),i=setTimeout(()=>{r(e),n.current=Date.now()},s);return()=>clearTimeout(i)},[e,a,t,o]),a}function CE(e,t){let[o,a]=z0(e);return A0(()=>{if(e){a(!0);return}let r=setTimeout(()=>a(!1),t);return()=>clearTimeout(r)},[e,t]),e||o}function RE(e,t=150,o=400){let[a,r]=z0(!1),n=Bx(0);return A0(()=>{if(e&&!a){let s=setTimeout(()=>{n.current=Date.now(),r(!0)},t);return()=>clearTimeout(s)}if(!e&&a){let s=setTimeout(()=>r(!1),Math.max(0,o-(Date.now()-n.current)));return()=>clearTimeout(s)}},[e,a,t,o]),a}var SE={thinking:"Thinking",stopped:"Stopped",warnEnd:"with a warning",failEnd:"failed",stoppedEnd:"stopped"},kE=rt("relative flex w-fit max-w-full min-w-0 items-center text-start text-text-1",{variants:{size:{default:"gap-1.5 type-label",sm:"gap-1 type-body-sm"}},defaultVariants:{size:"default"}});function Zx({label:e,active:t=!1,waiting:o=!1,doneLabel:a,status:r="ok",size:n="default",minDisplay:s=vE,settle:i=400,delay:l=150,minLoader:c=400,announce:u=!0,labels:d,className:p,...f}){let m={...SE,...d},v=RE(o,l,c),h=CE(t,i),y=IE(e??"",h,s),x=v?"waiting":h?"active":o||!e&&!a?"idle":"done",g=x==="waiting"?e??m.thinking:x==="active"?y:x==="idle"?"":a??(r==="stopped"?m.stopped:N0(y)),b={ok:"",warn:m.warnEnd,fail:m.failEnd,stopped:m.stoppedEnd}[r],w=b&&!g.toLowerCase().includes(b.toLowerCase().replace(/^with a /,""))?`, ${b}`:"",C=x==="done"?`${g}${w}`:x==="waiting"?g:"",R=x==="active"||x==="waiting",I=x==="done"&&(r==="warn"||r==="fail");return T0("span",{"data-slot":"activity","data-state":x,"data-size":n,"aria-busy":R||void 0,className:O(kE({size:n}),p),...f,children:[R&&Ho(cs,{className:"text-text-2"}),Ho(L0,{active:R,className:O("min-w-0 truncate",x==="done"&&"text-text-2"),children:g}),I&&Ho(Eo,{status:r,size:n==="sm"?"sm":"default",className:"shrink-0","aria-hidden":!0}),u&&Ho("span",{role:"status",className:"sr-only",children:C})]})}function Gx({state:e,className:t}){return e==="running"?Ho(cs,{className:O("text-text-2",t)}):Ho("span",{"aria-hidden":!0,"data-slot":"step-glyph","data-state":e,className:O("flex size-4 shrink-0 items-center justify-center",t),children:e==="done"?Ho(Fe,{icon:as,size:12,className:"text-text-3"}):e==="fail"?Ho(Fe,{icon:Cn,size:12,className:"text-fail-text"}):Ho(Fe,{icon:Zw,size:12,className:"text-text-3"})})}function vl({open:e,end:t=!1}){return t&&!e?null:Ho("span",{"aria-hidden":!0,"data-slot":"disclosure","data-end":t||void 0,className:"flex size-4 shrink-0 items-center justify-center text-text-3",children:e&&Ho(Fe,{icon:r0,size:12,className:"transition-[rotate] duration-(--dur-state) ease-out group-data-panel-open/row:rotate-90 motion-reduce:transition-none rtl:-scale-x-100 rtl:group-data-panel-open/row:-rotate-90"})})}var ni=rt("group/row -mx-2 flex max-w-[calc(100%+var(--space-4))] min-w-0 items-center gap-2 self-start rounded-tag px-2 text-start type-body-sm focus-visible:focus-ring-inset pointer-coarse:min-h-11",{variants:{size:{default:"min-h-(--control)",sm:"min-h-(--menu-row-sm)"},opens:{true:"transition-colors duration-(--dur-state) ease-out hover:bg-hover active:bg-pressed",false:""}},defaultVariants:{size:"default",opens:!0}});function Ux({summary:e,meta:t,live:o=!1,open:a,defaultOpen:r=!1,onOpenChange:n,size:s="default",className:i,children:l,...c}){let{force:u,rest:d}=F0(c);return T0(wa.Root,{"data-slot":"activity-group","data-live":o||void 0,open:a,defaultOpen:r,onOpenChange:n,className:O("flex min-w-0 flex-col",i),...d,children:[T0(wa.Trigger,{"data-slot":"activity-group-trigger",className:ni({size:s}),...u,children:[Ho(vl,{open:!0}),Ho("span",{"data-slot":"activity-group-summary",className:"min-w-0 truncate text-text-2",children:e}),Ho("span",{"data-slot":"activity-group-meta",className:"flex shrink-0 items-center gap-2 text-text-2 data empty:hidden",children:t??(o?Ho(cs,{}):null)})]}),Ho(wa.Panel,{"data-slot":"activity-group-content",className:"flex min-w-0 flex-col ps-6",children:l})]})}function F0(e){let t={},o={};for(let[a,r]of Object.entries(e))(a.startsWith("data-force-")?t:o)[a]=r;return{force:t,rest:o}}import{createContext as nP,memo as sP,useCallback as Cl,useContext as EZ,useEffect as K0,useLayoutEffect as iP,useMemo as PZ,useRef as ii,useState as yp}from"react";import{Fragment as PE,jsx as EE,jsxs as $x}from"react/jsx-runtime";var ME=rt(["inline-flex w-fit max-w-full shrink-0 items-center justify-center gap-1 overflow-hidden rounded-tag whitespace-nowrap data","[&>svg]:pointer-events-none [&>svg]:size-(--icon-sm) [&>svg]:shrink-0","forced-colors:border forced-colors:border-[CanvasText]"],{variants:{variant:{neutral:"bg-field text-text-1",outline:"border border-line-control text-text-1",ok:"bg-ok-tint text-ok-text",warn:"bg-warn-tint text-warn-text",fail:"bg-fail-tint text-fail-text"},size:{default:"min-h-5 px-1.5 type-label-sm",sm:"min-h-4 px-1 type-label-sm"}},defaultVariants:{variant:"neutral",size:"default"}});function si({className:e,variant:t="neutral",size:o="default",count:a,max:r=99,render:n,children:s,...i}){let l=a!==void 0&&a>r,c=a?.toLocaleString("en-US"),u=a===void 0?s:l?$x(PE,{children:[$x("span",{"aria-hidden":!0,children:[r,"+"]}),EE("span",{className:"sr-only",children:c})]}):c;return Qr({defaultTagName:"span",props:nt({className:O(ME({variant:t,size:o}),e),children:u},{"data-slot":"badge","data-variant":t,"data-size":o,title:l?c:void 0},i),render:n,state:{slot:"badge",variant:t}})}import{useCallback as BE,useEffect as $0,useId as _E,useMemo as ZE,useReducer as GE,useRef as V0,useState as W0}from"react";import{Children as zE,isValidElement as LE}from"react";import{jsx as AE}from"react/jsx-runtime";var TE=rt("panel relative flex min-w-0 flex-col text-text-1 forced-colors:border-[CanvasText]",{variants:{padding:{default:"p-3",none:"p-0"}},defaultVariants:{padding:"default"}});function Wx({className:e,padding:t="default",...o}){return AE("div",{"data-slot":"panel","data-padding":t,className:O(TE({padding:t}),e),...o})}import{jsx as ds,jsxs as NE}from"react/jsx-runtime";function D0(e,t){return LE(e)&&e.type===t}function cp({className:e,children:t,...o}){let a=zE.toArray(t),r=a.filter(i=>D0(i,us)),n=a.filter(i=>!D0(i,us)),s=n.some(i=>D0(i,Wx));return NE("div",{"data-slot":"card","data-footer":r.length?"":void 0,className:O("group/card shell relative text-text-1","[&>[data-slot=panel]~[data-slot=panel]]:mt-(--shell-inset)","has-[[data-slot=card-link]:focus-visible]:focus-ring","forced-colors:border-[CanvasText]",e),...o,children:[s?n:ds("div",{"data-slot":"card-panel",className:"panel flex min-w-0 flex-col forced-colors:border-[CanvasText]",children:n}),r]})}function up({className:e,...t}){return ds("div",{"data-slot":"card-header",className:O("grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 p-3 [&+[data-slot=card-content]:not([data-flush])]:pt-0",e),...t})}function dp({className:e,...t}){return ds("div",{"data-slot":"card-title",className:O("col-start-1 min-w-0 type-label text-text-1 [overflow-wrap:anywhere]",e),...t})}function qx({className:e,...t}){return ds("div",{"data-slot":"card-description",className:O("col-start-1 min-w-0 max-w-(--measure-hint) type-body-sm text-text-2",e),...t})}function pp({className:e,flush:t,...o}){return ds("div",{"data-slot":"card-content","data-flush":t||void 0,className:O("flex min-w-0 flex-col gap-3 type-body-sm text-text-1",t?"gap-0 not-first:border-t not-first:border-line-faint":"p-3",e),...o})}function us({className:e,...t}){return ds("div",{"data-slot":"card-footer",className:O("shell-foot relative z-(--z-raised) justify-end [&>[data-slot=card-meta]:first-child]:me-auto [&>[data-slot=card-meta]:last-child]:pe-3",e),...t})}function jx({className:e,...t}){return ds("span",{"data-slot":"card-meta",className:O("min-w-0 truncate type-caption text-text-2",e),...t})}import{useEffect as FE,useRef as Kx,useState as Xx}from"react";import{Fragment as VE,jsx as pa,jsxs as mp}from"react/jsx-runtime";var DE={showMore:e=>`Show ${ri(e)} more`,showLess:"Show less",requests:"Requests"};function O0(e){if(e===void 0||e==="")return;let t=Number(e);return Number.isFinite(t)?t>=500?"fail":t>=400?"warn":"ok":"fail"}function Qx(e){let t=e.filter(o=>O0(o.code)==="warn"||O0(o.code)==="fail").length;return{head:`${ri(e.length)} ${e.length===1?"request":"requests"}`,failed:t}}function Jx(e){let{head:t,failed:o}=Qx(e);return o?`${t}, ${o} failed`:t}function ev({items:e}){let{head:t,failed:o}=Qx(e);return o?mp(VE,{children:[t,", ",mp("span",{"data-slot":"request-ticker-failed",className:"text-fail-text",children:[o," failed"]})]}):t}function OE(e,t,o,a){let[r,n]=Xx(()=>e.slice(-t)),s=Kx(0),i=Kx(e);return i.current=e,FE(()=>{let l=()=>{s.current=Date.now(),n(i.current.slice(-t))};if(!o){l();return}let c=Math.max(0,a-(Date.now()-s.current));if(!c){l();return}let u=setTimeout(l,c);return()=>clearTimeout(u)},[e,t,o,a]),r}var HE={ok:"outline",warn:"warn",fail:"fail"};function Yx({request:e,live:t,as:o="div"}){let a=O0(e.code);return mp(o,{"data-slot":"request-ticker-row","data-status":a==="warn"||a==="fail"?a:void 0,className:"flex h-(--menu-row-sm) min-w-0 items-center gap-3",children:[pa("span",{className:"flex w-16 shrink-0",children:e.method&&pa(si,{variant:"outline",size:"sm",children:pa("span",{className:"mono",children:e.method})})}),pa("span",{dir:"ltr",className:"min-w-0 flex-1 truncate text-start type-code-xs text-text-1",children:e.target}),pa("span",{className:"flex w-10 shrink-0 justify-end",children:a?pa(si,{variant:HE[a],size:"sm",children:pa("span",{className:"mono",children:e.code})}):t&&pa(cs,{className:"text-text-2"})}),pa("span",{className:"w-14 shrink-0 text-end type-caption text-text-2 data",children:e.duration!==void 0&&lp(e.duration)})]})}function H0({className:e,...t}){return pa("button",{type:"button",className:O("-mx-3 -mb-2 mt-1 flex h-(--menu-row-sm) items-center self-stretch border-t border-line-faint px-3 text-start type-label-sm text-text-2 transition-colors duration-(--dur-state) ease-out hover:bg-hover hover:text-text-1 focus-visible:focus-ring-inset",e),...t})}function tv({items:e,live:t=!1,max:o=3,cap:a=10,hold:r=300,labels:n,className:s,...i}){let l={...DE,...n},c=OE(e,o,t,r),[u,d]=Xx(!1);if(t)return pa("div",{"data-slot":"request-ticker","data-live":"","aria-hidden":!0,className:O("flex min-w-0 flex-col",s),...i,children:c.map(m=>pa(Yx,{request:m,live:!0},m.id))});let p=u?0:Math.max(0,e.length-a),f=p?e.slice(0,a):e;return mp("div",{"data-slot":"request-ticker",className:O("flex min-w-0 flex-col",s),...i,children:[pa("ol",{"aria-label":l.requests,className:"flex min-w-0 flex-col",children:f.map(m=>pa(Yx,{as:"li",request:m,live:!1},m.id))}),e.length>a&&pa(H0,{"data-slot":"request-ticker-more",onClick:()=>d(m=>!m),children:u?l.showLess:l.showMore(p)})]})}import{Fragment as Z0,jsx as Te,jsxs as $o}from"react/jsx-runtime";var UE=new Set(["completed","error","denied","cancelled"]),ps=e=>UE.has(e),ov={calls:[],gen:0,stopped:!1,dropped:0},$E="The tool ended without reporting a result.",WE=120,G0=e=>typeof e=="number"&&Number.isFinite(e)?e:Date.now();function B0(e,t){let o=G0(t.at);switch(t.type){case"call":return{...e,tool:t.tool,input:t.input??e.input,raw:t.raw??e.raw,status:"pending"};case"input":return{...e,raw:t.raw,input:t.input??e.input};case"start":return{...e,tool:t.tool??e.tool,input:t.input??e.input,title:t.title??e.title,status:"running",startedAt:e.startedAt??o};case"progress":return{...e,metadata:{...e.metadata,...t.metadata},title:t.title??e.title,status:e.status==="pending"?"running":e.status,startedAt:e.startedAt??o};case"ask":return{...e,status:"awaiting-permission",permission:{patterns:t.patterns,message:t.message}};case"reply":return t.reply==="reject"?{...e,status:"denied",reason:t.feedback,endedAt:o}:{...e,status:"running",startedAt:e.startedAt??o};case"result":{let a=t.status??"error";return{...e,status:a,output:t.output??e.output,title:t.title??e.title,metadata:t.metadata?{...e.metadata,...t.metadata}:e.metadata,error:a==="error"?t.error??(t.status?"The tool failed.":$E):void 0,endedAt:o}}}}function qE(e,t){if(t.type==="reset")return ov;let o={...e,dropped:e.dropped+1};if(t.type==="turn")return{...e,gen:t.gen??e.gen+1,stopped:!1};if(t.type==="stop"){if(t.gen<e.gen||t.gen===e.gen&&e.stopped)return o;let i=G0(t.at);return{...e,gen:t.gen,stopped:!0,calls:e.calls.map(l=>ps(l.status)?l:{...l,status:"cancelled",endedAt:i})}}let a=t.gen??e.gen;if(a<e.gen||a===e.gen&&e.stopped)return o;a>e.gen&&(e={...e,gen:a,stopped:!1});let r=e.calls.findIndex(i=>i.id===t.id);if(r===-1){let i=t.type==="result"||t.type==="ask"||t.type==="reply"||t.type==="progress",l={id:t.id,tool:"tool"in t&&t.tool||"unknown",status:"pending",seq:t.seq,orphan:i,receivedAt:G0(t.at)};return{...e,calls:[...e.calls,{...B0(l,t),seq:t.seq}]}}let n=e.calls[r],s=i=>({...e,calls:e.calls.map((l,c)=>c===r?i:l)});if(n.orphan&&(t.type==="call"||t.type==="start")){let i={...n,tool:n.tool==="unknown"?t.tool??n.tool:n.tool,input:n.input??t.input,orphan:!1};return s(ps(n.status)||t.seq<=n.seq?i:{...B0(i,t),seq:t.seq})}return t.seq<=n.seq||ps(n.status)?o:s({...B0(n,t),seq:t.seq})}function av(e=[]){return GE(qE,{...ov,calls:e})}var rv=new Map,nv=new Map;function Fr(e,t,o=[]){rv.set(e,t);for(let a of o)nv.set(a,e)}var Wo=e=>typeof e=="string"&&e.trim()?e:void 0,Il=(e,t)=>t.map(o=>Wo(e[o])).find(Boolean),U0=["filePath","path","file","url","query","pattern","command","description","name","id"],sv=e=>e?.split("/").filter(Boolean).at(-1)??e;function jE(e){return{active:`Calling ${e}`,done:`Called ${e}`,ask:`Call ${e}`,noun:e,confirm:`Allow ${e}?`,lines:8,detailMono:!1,summary:{key:`tool:${e}`,one:`called ${e}`,many:t=>`called ${e} ${t} times`},detail:t=>Il(t,U0),body:(t,o)=>{let a=Il(t.input??{},U0),r=Object.entries(t.input??{}).filter(([,s])=>["string","number","boolean"].includes(typeof s)&&String(s)!==a).slice(0,3),n=t.output??Wo(t.metadata?.output);return!r.length&&!n?null:$o("div",{className:"flex min-w-0 flex-col gap-2",children:[r.length>0&&Te("dl",{className:"grid min-w-0 grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-0.5 type-code-sm",children:r.map(([s,i])=>$o("div",{className:"contents",children:[Te("dt",{className:"text-text-2",children:s}),Te("dd",{className:"truncate text-text-1",children:String(i)})]},s))}),n&&Te(ms,{text:n,lines:8,labels:o.labels})]})}}}function q0(e){let t=nv.get(e)??e;return rv.get(t)??jE(e)}var KE=/\u001b\[[0-9;?]*[ -/]*[@-~]|\u001b\][^\u0007]*\u0007/g,YE=e=>e.replace(KE,"").replace(/\r\n/g,`
`).split(`
`).map(t=>t.split("\r").reduce((o,a)=>a+o.slice(a.length),"")).join(`
`),hp=(e,t,o,a,r,n,s,i)=>({active:e,done:t,ask:o,noun:a,confirm:`Allow ${a}?`,lines:8,detailMono:!0,summary:{key:r,one:n,many:s},detail:l=>{let c=Il(l,i);return i[0]==="filePath"?sv(c):c},body:(l,c)=>{let u=l.output??Wo(l.metadata?.output);return u?Te(ms,{text:u,lines:8,labels:c.labels}):null}});Fr("read",hp("Reading","Read","Read","read","read","read a file",e=>`read ${e} files`,["filePath","path","file"]));Fr("glob",hp("Finding files","Found files","Find files","search","search","searched once",e=>`searched ${e} times`,["pattern"]));Fr("grep",hp("Searching","Searched","Search","search","search","searched once",e=>`searched ${e} times`,["pattern","query"]));Fr("list",hp("Listing","Listed","List","list","list","listed a folder",e=>`listed ${e} folders`,["path"]),["ls"]);function iv({children:e}){return $o("code",{children:[Te("span",{"aria-hidden":!0,className:"text-text-3 select-none",children:"$ "}),e]})}Fr("shell",{active:"Running",done:"Ran",ask:"Run",noun:"command",confirm:"Run this command?",lines:24,detailMono:!0,summary:{key:"shell",one:"ran a command",many:e=>`ran ${e} commands`},detail:e=>Wo(e.command)??Wo(e.description),body:(e,t)=>{let o=Wo(e.input?.command),a=e.output??Wo(e.metadata?.output);if(!a)return null;let r=!!o&&(o.includes(`
`)||o.length>80);return $o("div",{className:"flex min-w-0 flex-col gap-1",children:[r&&Te("pre",{dir:"ltr",className:"overflow-x-auto text-start type-code-sm text-text-1",children:Te(iv,{children:o})}),Te(ms,{text:YE(a),lines:24,labels:t.labels})]})}},["bash","sh","zsh","run_command","terminal"]);Fr("edit",{active:"Editing",done:"Edited",ask:"Edit",noun:"edit",confirm:"Apply this edit?",lines:8,detailMono:!0,summary:{key:"edit",one:"edited a file",many:e=>`edited ${e} files`},detail:e=>sv(Il(e,["filePath","path","file"])),body:(e,t)=>{let o=Wo(e.metadata?.diff)??Wo(e.metadata?.patch);return o?Te(XE,{patch:o,lines:8,labels:t.labels}):null}},["write","apply_patch","patch","multiedit","str_replace"]);Fr("webfetch",{active:"Fetching",done:"Fetched",ask:"Fetch",noun:"fetch",confirm:"Fetch this page?",lines:8,detailMono:!0,summary:{key:"web",one:"fetched a page",many:e=>`fetched ${e} pages`},detail:e=>{let t=Wo(e.url);try{return t?new URL(t).host+new URL(t).pathname.replace(/\/$/,""):void 0}catch{return t}},body:(e,t)=>e.output?Te(ms,{text:e.output,lines:8,labels:t.labels}):null},["fetch","web_fetch"]);var _0=e=>Array.isArray(e.metadata?.requests)?e.metadata.requests:[];Fr("http",{active:"Calling",done:"Called",ask:"Call",noun:"request",confirm:"Send this request?",lines:10,detailMono:!1,summary:{key:"http",one:"made a request",many:e=>`made ${e} requests`},detail:(e,t)=>{let o=_0(t);return o.length&&ps(t.status)?Jx(o):o.at(-1)?.target??Wo(e.url)??Wo(e.server)??Wo(e.name)},detailNode:(e,t)=>{let o=_0(t);return o.length&&ps(t.status)?Te(ev,{items:o}):void 0},body:e=>{let t=_0(e);return t.length?Te(tv,{items:t,live:e.status==="running"}):null}},["http_request","api","mcp","mcp_call"]);Fr("websearch",{active:"Searching the web for",done:"Searched the web for",ask:"Search the web for",noun:"search",confirm:"Search the web?",lines:8,summary:{key:"websearch",one:"searched the web",many:e=>`searched the web ${e} times`},detail:e=>Wo(e.query),body:(e,t)=>e.output?Te(ms,{text:e.output,lines:8,labels:t.labels}):null},["web_search","search_web"]);Fr("task",{active:"Delegating",done:"Delegated",ask:"Delegate",noun:"task",confirm:"Delegate this task?",lines:8,summary:{key:"task",one:"ran a subagent",many:e=>`ran ${e} subagents`},detail:(e,t)=>{let o=Wo(t.metadata?.current);return t.status==="running"&&o?`↳ ${o}`:Wo(e.description)},body:(e,t)=>e.output?Te(ms,{text:e.output,lines:8,labels:t.labels}):null},["subagent","agent"]);var fp={status:{pending:"Preparing",running:"Running",completed:"Done",error:qa.fail,"awaiting-permission":qa.waiting,denied:"Denied",cancelled:"Stopped"},orphaned:"Orphaned result",result:"Result",forCall:e=>`for call ${e}`,showMore:(e,t)=>`Show ${ri(e)} more ${t==="lines"?e===1?"line":"lines":"characters"}`,showLess:"Show less",trimmed:e=>`Trimmed at ${ri(e)} characters`,added:"added",removed:"removed",worked:e=>`Worked for ${e}`,ranTools:e=>e===1?"Ran 1 tool":`Ran ${e} tools`,failedCount:e=>e===1?"Failed":`${e} failed`,allow:"Allow",deny:"Deny"},bp=e=>({...fp,...e,status:{...fp.status,...e?.status}});function ms({text:e,lines:t,chars:o=2e4,labels:a}){let r=bp(a),[n,s]=W0(!1),i=e.length>o,l=(i?e.slice(0,o):e).replace(/\n+$/,""),c=l.split(`
`),u=Math.max(0,c.length-t),d=u?c.slice(0,t).join(`
`):l,p=t*WE,f=Math.max(0,d.length-p),m=n?l:f?`${d.slice(0,p)}…`:d,v=u>0||f>0;return $o("div",{"data-slot":"tool-call-output",className:"flex min-w-0 flex-col gap-1",children:[Te("pre",{dir:"ltr","data-all":n||void 0,className:"min-w-0 overflow-x-auto text-start type-code-sm whitespace-pre-wrap text-text-2 [overflow-wrap:anywhere] data-all:max-h-96 data-all:overflow-y-auto",children:Te("code",{children:m})}),i&&Te("p",{className:"type-caption text-text-2 data",children:r.trimmed(o)}),v&&Te(H0,{"data-slot":"tool-call-more",onClick:()=>s(h=>!h),children:n?r.showLess:u>0?r.showMore(u,"lines"):r.showMore(f,"characters")})]})}function j0({added:e,removed:t,addedLabel:o="added",removedLabel:a="removed",className:r}){return $o("span",{"data-slot":"diff-count",dir:"ltr",className:O("data",r),children:[Te("span",{"aria-hidden":!0,children:"+"}),e,$o("span",{className:"sr-only",children:[" ",o]})," ",Te("span",{"aria-hidden":!0,children:"−"}),t,$o("span",{className:"sr-only",children:[" ",a]})]})}function XE({patch:e,lines:t,labels:o}){let a=bp(o),r=e.split(`
`).filter(i=>/^[+-]/.test(i)&&!/^(\+\+\+|---)/.test(i)),n=r.filter(i=>i.startsWith("+")).length,s=r.length-n;return $o("div",{className:"flex min-w-0 flex-col gap-1",children:[Te("p",{className:"text-start type-caption text-text-2",children:Te(j0,{added:n,removed:s,addedLabel:a.added,removedLabel:a.removed})}),Te(ms,{text:r.map(i=>(i[0]==="-"?"−":"+")+" "+i.slice(1)).join(`
`),lines:t,labels:o})]})}function QE(e,t){let o=q0(e.tool),a=(e.input&&o.detail?.(e.input,e))??e.title;if(e.orphan&&e.tool==="unknown")return{text:t?.result??fp.result,detail:e.title??(t?.forCall??fp.forCall)(e.id)};switch(e.status){case"pending":return{text:`Preparing ${o.noun}`,detail:e.input?a:void 0};case"running":return{text:o.active,detail:a};case"completed":return{text:o.done,detail:a};default:return{text:o.ask,detail:a}}}var gp=lp;function JE(e){let t=V0(null),o=V0(null),a=V0(e);return $0(()=>{let r=a.current;if(a.current=e,r||!e)return;let n=document.activeElement;(!n||n===document.body||!n.isConnected||t.current?.contains(n))&&o.current?.focus()},[e]),{region:t,target:o}}function lv({call:e,size:t="default",onReply:o,actions:a,label:r,doneLabel:n,detail:s,detailMono:i,duration:l,children:c,open:u,defaultOpen:d,onOpenChange:p,labels:f,className:m,ref:v,...h}){let y=bp(f),{force:x,rest:g}=F0(h),b=q0(e.tool),w=e.status==="running",C=e.status==="pending",R=e.status==="awaiting-permission",I=e.status==="denied",S=e.status==="error",M=w||C?void 0:l??(e.startedAt!==void 0&&e.endedAt!==void 0?Math.max(0,e.endedAt-e.startedAt):void 0),T=QE(e,y),V=r===void 0?T.text:e.status==="completed"?n??N0(r):r,F=s??T.detail,L=s??(!e.orphan&&e.input?b.detailNode?.(e.input,e):void 0)??F,P=i??(e.orphan&&e.tool==="unknown"?!1:!!b.detailMono),H=!!e.orphan&&ps(e.status),D=H?y.orphaned:y.status[e.status],{region:N,target:A}=JE(!R),E=ZE(()=>Ua(N,v),[N,v]),G=BE(ge=>{A.current=ge},[A]),z=_E(),[oe,X]=W0(d??S);$0(()=>{S&&X(!0)},[S]);let Z={"data-slot":"tool-call","data-status":e.status,"data-tool":e.tool,"data-size":t,"data-orphan":e.orphan||void 0,"data-waiting":R||void 0,"aria-busy":w||C||void 0},U=O("group/tool-call relative flex w-full min-w-0 flex-col text-text-1",m);if(R){let ge=Wo(e.input?.command),ee=e.permission?.patterns.join(`
`),Me=ge??ee??(e.input&&Il(e.input,U0))??F,ne=typeof b.confirm=="function"?b.confirm(e.input??{},e):b.confirm??`${b.ask} this ${b.noun}?`,J=o?$o(us,{"data-slot":"tool-call-actions",children:[Te(at,{size:"sm",variant:"secondary",onClick:()=>o("reject"),children:y.deny}),Te(at,{size:"sm",variant:"confirm",onClick:()=>o("once"),children:y.allow})]}):a?Te(us,{"data-slot":"tool-call-actions",children:a}):null;return Te("div",{...Z,...g,ref:E,className:O(U,"my-1"),children:$o(cp,{"data-slot":"tool-call-approval",role:"group","aria-labelledby":z,children:[Te(up,{children:Te(dp,{id:z,"data-slot":"tool-call-title",children:ne})}),$o(pp,{className:"gap-2",children:[e.permission?.message&&Te("p",{"data-slot":"tool-call-request",className:"type-body-sm text-text-2",children:e.permission.message}),Me&&(ge?Te("pre",{dir:"ltr","data-slot":"tool-call-command",className:"well min-w-0 rounded-overlay px-3 py-2 text-start type-code-sm whitespace-pre-wrap text-text-1 [overflow-wrap:anywhere]",children:Te(iv,{children:Me})}):Te("p",{"data-slot":"tool-call-command",className:"well min-w-0 rounded-overlay px-3 py-2 type-body-sm whitespace-pre-wrap text-text-1 [overflow-wrap:anywhere]",children:Me}))]}),J]})})}let ae=c??b.body?.(e,{size:t,labels:f})??null,we=S&&e.error?Te("p",{"data-slot":"tool-call-error",className:"type-body-sm text-text-1 [overflow-wrap:anywhere]",children:e.error}):I&&e.reason?Te("p",{"data-slot":"tool-call-reason",className:"type-body-sm text-text-2 [overflow-wrap:anywhere]",children:e.reason}):null,j=ae!==null||we!==null,Y=H||e.status==="cancelled"||I?"stopped":w||C?"running":S?"fail":"done",q=H?Te("span",{children:D}):w||C?Te("span",{className:"sr-only",children:D}):S?$o(Z0,{children:[Te("span",{className:"text-fail-text",children:D}),M!==void 0&&gp(M)]}):e.status==="cancelled"?Te("span",{children:D}):I?null:$o(Z0,{children:[Te("span",{className:"sr-only",children:D}),M!==void 0&&gp(M)]}),re=$o(Z0,{children:[Te(Gx,{state:Y}),Te("span",{"data-slot":"tool-call-label",className:"shrink-0 text-text-2",children:I?D:V}),Te("span",{"data-slot":"tool-call-detail",dir:P?"ltr":void 0,title:typeof F=="string"?F:void 0,className:O("min-w-12 truncate text-start text-text-1 max-sm:overflow-visible max-sm:whitespace-normal max-sm:[overflow-wrap:anywhere]",P&&"mono",!F&&"min-w-0"),children:L}),Te("span",{"data-slot":"tool-call-end",className:"flex shrink-0 items-center gap-2 whitespace-nowrap text-text-2 data empty:hidden",children:q}),Te(vl,{open:j,end:!0})]});return j?$o(wa.Root,{...Z,open:u??oe,onOpenChange:ge=>{X(ge),p?.(ge)},...g,ref:E,className:U,children:[Te(wa.Trigger,{ref:G,"data-slot":"tool-call-row",...x,className:ni({size:t}),children:re}),$o(wa.Panel,{"data-slot":"tool-call-content",className:"flex min-w-0 flex-col gap-2 ps-6 pt-0.5 pb-2",children:[we,ae!==null&&Te("div",{"data-slot":"tool-call-well",className:"flex min-w-0 flex-col gap-3 well rounded-overlay px-3 py-2",children:ae})]})]}):Te("div",{...Z,...g,ref:E,className:U,children:Te("div",{ref:G,tabIndex:-1,"data-slot":"tool-call-row",className:ni({size:t,opens:!1}),...x,children:re})})}function eP(e,t=!1){let o=n=>n.map(s=>({type:"call",key:s.id,call:s}));if(!t)return e.length>1?[{type:"group",key:"group:done",calls:[...e],done:!0}]:o(e);let a=e.findIndex(n=>n.status!=="completed"),r=Math.min(a===-1?e.length:a,e.length-1);return r>1?[{type:"group",key:"group:earlier",calls:e.slice(0,r),done:!1},...o(e.slice(r))]:o(e)}function tP(e){let t=e.flatMap(a=>a.startedAt??[]),o=e.flatMap(a=>a.endedAt??[]);return t.length&&o.length?Math.max(0,Math.max(...o)-Math.min(...t)):void 0}function oP({calls:e,done:t=!1,size:o="default",labels:a,...r}){let n=bp(a),s=tP(e),i=e.filter(d=>d.status==="error").length,l=e.reduce((d,p)=>d+(p.startedAt!==void 0&&p.endedAt!==void 0?Math.max(0,p.endedAt-p.startedAt):0),0),c=t?s?n.worked(gp(s)):n.ranTools(e.length):rP(e),u=i?Te("span",{className:"text-fail-text",children:n.failedCount(i)}):!t&&l>0?gp(l):null;return Te(Ux,{summary:c,meta:u,size:o,...r,children:e.map(d=>Te(lv,{call:d,size:o,labels:a},d.id))})}function aP(e,t){let[,o]=W0(0),a=e.filter(r=>r.orphan&&r.receivedAt!==void 0&&Date.now()-r.receivedAt<t);return $0(()=>{if(!a.length)return;let r=Math.min(...a.map(s=>t-(Date.now()-s.receivedAt))),n=setTimeout(()=>o(s=>s+1),Math.max(0,r)+10);return()=>clearTimeout(n)}),e.filter(r=>!a.includes(r))}function cv({calls:e,live:t,hideCompleted:o=!1,orphanTtl:a=2e3,size:r="default",onReply:n,actions:s,labels:i,className:l,...c}){let u=aP(e,a),d=o?u.filter(m=>m.status!=="completed"):u,p=t??d.some(m=>!ps(m.status)),f=eP(d,p);return Te("div",{"data-slot":"tool-call-list",className:O("flex min-w-0 flex-col",l),...c,children:f.map(m=>m.type==="group"?Te(oP,{calls:m.calls,done:m.done,size:r,labels:i},m.key):Te(lv,{call:m.call,size:r,labels:i,onReply:n&&(v=>n(m.call,v)),actions:s?.(m.call)},m.key))})}function rP(e){let t=new Map,o=0,a=0,r=0;for(let n of e)if(n.status==="completed"){let s=q0(n.tool),i=t.get(s.summary.key);t.set(s.summary.key,{n:(i?.n??0)+1,r:s})}else n.status==="error"?o++:n.status==="cancelled"?a++:n.status==="denied"&&r++;return _x([...t.values()].map(({n,r:s})=>n===1?s.summary.one:s.summary.many(n)),[o&&`${o} failed`,r&&`${r} denied`,a&&`${a} stopped`].filter(Boolean))}import{Fragment as gP,jsx as No,jsxs as Rl}from"react/jsx-runtime";var lP=30,cP=5,uP=800,dP=()=>typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function uv(e,t){let o=e instanceof Element?e:null;for(;o&&o!==t;){if(o instanceof HTMLElement&&o.scrollHeight>o.clientHeight+1){let a=getComputedStyle(o).overflowY;if((a==="auto"||a==="scroll")&&o.scrollTop>0)return!0}o=o.parentElement}return!1}function pv(e,{enabled:t=!0,content:o}={}){let a=ii(!0),r=ii(!1),n=ii(t);n.current=t;let s=ii(0),i=ii(-1/0),l=ii(!1),[c,u]=yp(null),[d,p]=yp(0),[f,m]=yp(!0),v=Cl(b=>{a.current=b,m(b)},[]),h=Cl(b=>{e.current=b,u(b)},[e]);iP(()=>{e.current!==c&&u(e.current)});let y=Cl((b=!1)=>{let w=e.current;if(!w)return;let C=Math.max(0,w.scrollHeight-w.scrollTop-w.clientHeight),R=w.scrollTop>s.current;b&&(s.current=w.scrollTop),!a.current&&b&&R&&C<=cP&&(l.current||performance.now()-i.current<uP)&&v(!0),p(C)},[e,v]),x=Cl((b="smooth")=>{let w=e.current;w&&(v(!0),w.scrollTo({top:w.scrollHeight,behavior:b==="smooth"&&!dP()?"smooth":"auto"}))},[e,v]);K0(()=>{let b=c;if(!b)return;s.current=b.scrollTop;let w=()=>{n.current&&a.current&&!r.current&&(b.scrollTop=b.scrollHeight),y()},C=new ResizeObserver(w);C.observe(b);let R=o?.current??b.firstElementChild;R&&C.observe(R);let I=new MutationObserver(w);I.observe(b,{childList:!0,subtree:!0,characterData:!0});let S=()=>{a.current&&v(!1)},M=()=>{i.current=performance.now()},T=z=>{z.deltaY<0&&!uv(z.target,b)?S():z.deltaY>0&&M()},V=0,F=z=>{V=z.touches[0]?.clientY??0},L=z=>{let oe=z.touches[0]?.clientY??0;oe>V+2&&!uv(z.target,b)?S():oe<V-2&&M(),V=oe},P=()=>M(),H=z=>{if(z.target!==b)return;let oe=b.getBoundingClientRect();(document.dir==="rtl"||getComputedStyle(b).direction==="rtl"?z.clientX<oe.left+(b.offsetWidth-b.clientWidth):z.clientX>oe.left+b.clientWidth)&&(S(),l.current=!0)},D=()=>{l.current&&(l.current=!1,M())},N=z=>{z.target.closest('input, textarea, [contenteditable="true"], select')||(z.key==="ArrowUp"||z.key==="PageUp"||z.key==="Home"||z.key===" "&&z.shiftKey?S():z.key==="End"?(z.preventDefault(),x()):(z.key==="ArrowDown"||z.key==="PageDown"||z.key===" ")&&M())},A=()=>y(!0),E=()=>{let z=document.getSelection();r.current=!!z&&!z.isCollapsed&&!!z.anchorNode&&b.contains(z.anchorNode),r.current||w()},G=()=>{document.hidden||w()};return b.addEventListener("wheel",T,{passive:!0}),b.addEventListener("touchstart",F,{passive:!0}),b.addEventListener("touchmove",L,{passive:!0}),b.addEventListener("touchend",P,{passive:!0}),b.addEventListener("pointerdown",H),window.addEventListener("pointerup",D),b.addEventListener("keydown",N),b.addEventListener("scroll",A,{passive:!0}),document.addEventListener("selectionchange",E),document.addEventListener("visibilitychange",G),w(),()=>{C.disconnect(),I.disconnect(),b.removeEventListener("wheel",T),b.removeEventListener("touchstart",F),b.removeEventListener("touchmove",L),b.removeEventListener("touchend",P),b.removeEventListener("pointerdown",H),window.removeEventListener("pointerup",D),b.removeEventListener("keydown",N),b.removeEventListener("scroll",A),document.removeEventListener("selectionchange",E),document.removeEventListener("visibilitychange",G)}},[c,o,y,v,x]),K0(()=>{!t||!c||!a.current||(c.scrollTop=c.scrollHeight)},[c,t]);let g=Cl(()=>v(!1),[v]);return{ref:h,attached:f,distance:d,atEnd:d<=lP,scrollToEnd:x,detach:g}}var OZ=nP(null);var HZ={latest:"Latest",waitingOnYou:qa.waiting};var dv={retryingIn:e=>`Retrying in ${e}s`,retryingNow:"Retrying now",attempt:e=>`attempt ${e}`,retryNow:"Retry now",errors:{auth:"Sign in again to continue","rate-limit":"Rate limited by the model provider",quota:"Out of credits for this workspace",server:"The model provider failed",network:"Lost the connection",gone:"This run no longer exists"},retry:"Retry",thinking:"Thinking",you:"You",agent:"Agent",filesChanged:e=>`${e} ${e===1?"file":"files"} changed`,added:"added",removed:"removed"},Y0=e=>({...dv,...e,errors:{...dv.errors,...e?.errors}});function pP(e){let[t,o]=yp(null);return K0(()=>{o(Date.now());let a=setInterval(()=>o(Date.now()),1e3);return()=>clearInterval(a)},[e]),t===null?null:Math.max(0,Math.ceil((e-t)/1e3))}function mP({attempt:e,next:t,message:o,onRetry:a,labels:r,className:n,...s}){let i=Y0(r),l=pP(t),c=o&&o.length>80?`${o.slice(0,79)}…`:o;return Rl("div",{"data-slot":"conversation-retry",className:O("flex min-h-(--control) min-w-0 flex-wrap items-center gap-x-3 ps-4 pe-2",n),...s,children:[No(Eo,{status:"running",size:"sm",children:l?i.retryingIn(l):i.retryingNow}),No("span",{className:"type-caption text-text-2 data",children:i.attempt(e)}),c&&No("span",{title:o,className:"min-w-0 grow basis-48 truncate [contain:inline-size] type-body-sm text-text-2",children:c}),a&&No(at,{variant:"ghost",size:"sm",onClick:a,className:"ms-auto",children:i.retryNow})]})}function fP({kind:e,message:t,onRetry:o,labels:a,className:r,...n}){let s=Y0(a);return Rl("div",{"data-slot":"conversation-error","data-status":"fail","data-error":e,className:O("relative mx-4 flex min-h-(--row) min-w-0 flex-wrap items-center gap-x-3 gap-y-1 rounded-overlay bg-fail-tint py-1 ps-3 pe-1",r),...n,children:[No(Eo,{status:"fail",size:"sm",children:s.errors[e]}),t&&No("span",{className:"min-w-0 grow basis-48 type-body-sm text-text-2 [overflow-wrap:anywhere] [contain:inline-size]",children:t}),o&&e!=="gone"&&No(at,{variant:"secondary",size:"sm",onClick:o,className:"ms-auto",children:s.retry})]})}var VZ=sP(function({row:t,onRetry:o,labels:a}){let r=Y0(a);switch(t.type){case"user":{let n=t.name??r.you;return No(ml,{from:"user",children:Rl(fl,{children:[Rl(gl,{children:[n,t.meta&&No(hl,{children:t.meta})]}),No(Gd,{children:No(Ud,{children:t.text})})]})})}case"assistant":return No(gP,{children:t.content});case"thinking":return No(Zd,{name:t.author??r.agent,state:"live",children:No(Eo,{status:"running",size:"sm",className:"min-h-(--control) items-center text-text-2",children:t.label??r.thinking})});case"retry":return No(mP,{attempt:t.attempt,next:t.next,message:t.message,labels:a});case"diff":return Rl("p",{"data-slot":"conversation-diff",className:"relative flex min-h-(--control) items-center gap-2 px-4 type-body-sm text-text-2 data",children:[No("span",{className:"text-text-1",children:r.filesChanged(t.files)}),No(j0,{added:t.additions,removed:t.deletions,addedLabel:r.added,removedLabel:r.removed})]});case"error":return No(fP,{kind:t.kind,message:t.message,onRetry:o?()=>o(t):void 0,labels:a});case"divider":return No(nx,{reason:t.reason,children:t.label})}});import{Fragment as yv,jsx as xa,jsxs as X0}from"react/jsx-runtime";function wP(e,t=!0){let[o,a]=fv(!1);return mv(()=>{let r=e.current;if(!r||!t){a(!1);return}let n=()=>a(r.scrollWidth>r.clientWidth+1||r.scrollHeight>r.clientHeight+1),s=new ResizeObserver(n),i=()=>{s.disconnect(),s.observe(r);for(let c of r.children)s.observe(c);n()},l=new MutationObserver(i);return l.observe(r,{childList:!0}),i(),()=>{s.disconnect(),l.disconnect()}},[e,t]),o?0:void 0}function xP(e){let t=e.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1],o=e.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/m)?.[1],a=e.match(/^(?!\s*$)([^\n]+)\n\s{0,3}(=+|-+)\s*$/m)?.[1],r=e.match(/^\s*(?:\*\*|__)([^*_\n]+)(?:\*\*|__)\s*$/m)?.[1],n=[t,o,a,r].filter(i=>!!i).map(i=>({h:i,at:e.indexOf(i)})).sort((i,l)=>i.at-l.at)[0]?.h;return n&&n.replace(/<[^>]+>/g,"").replace(/`([^`]*)`/g,"$1").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/(\*\*|__|\*|_)(.+?)\1/g,"$2").trim()||void 0}var vP={thinking:"Thinking",stoppedEarly:"Stopped before thinking",thoughtFor:e=>`Thought for ${e}`,moment:"a moment"},gv=hP(null);function hv(){let e=bP(gv);if(!e)throw new Error("Reasoning parts must be used inside <Reasoning>");return e}function IP(e,t){let[o,a]=fv(e||t),r=wp(!1),n=wp(!1),s=wp(e);return mv(()=>{let l=s.current;s.current=e,e&&!l?(r.current=!1,a(!0)):!e&&l&&!r.current&&a(!1)},[e]),{open:o,onOpenChange:l=>{a(l),r.current=l,!e&&l&&(n.current=!0)},fromTop:n}}function bv({streaming:e=!1,duration:t,defaultOpen:o=!1,open:a,onOpenChange:r,heading:n,labels:s,className:i,children:l,...c}){let u={...vP,...s},d=IP(e,o),p=a!==void 0,f=p?a:d.open,m=typeof l=="string"?[l]:Array.isArray(l)&&l.every(x=>typeof x=="string")?l:null,v=m?m.join(`

`):"",h=n??(m?xP(m.at(-1)??""):void 0),y=x=>{p||d.onOpenChange(x),r?.(x)};return xa(gv.Provider,{value:{streaming:e,words:u,open:f,duration:t,heading:h,text:v,parts:!!m,fromTop:d.fromTop},children:xa(wa.Root,{"data-slot":"reasoning","data-streaming":e||void 0,open:f,onOpenChange:x=>y(x),className:Mt("group/reasoning @container/reasoning flex min-w-0 flex-col",i),render:x=>{let{"data-open":g,...b}=x;return xa("div",{...b})},...c,children:m?X0(yv,{children:[xa(RP,{}),xa(SP,{})]}):l})})}function CP(e,t){if(!Number.isFinite(e)||e<1)return t;let o=Math.round(e);return o<60?`${o}s`:`${Math.floor(o/60)}m ${String(o%60).padStart(2,"0")}s`}function RP({className:e,label:t,children:o,...a}){let{streaming:r,words:n,duration:s,heading:i,text:l,parts:c}=hv(),u=c&&!l.trim(),d=t?.({streaming:r,duration:s,heading:i})??(r?i??n.thinking:u?n.stoppedEarly:n.thoughtFor(s===void 0?n.moment:CP(s,n.moment)));return X0(wa.Trigger,{"data-slot":"reasoning-trigger",className:Mt(ni(),e),...a,children:[xa(vl,{open:!0}),o??X0(yv,{children:[xa(L0,{active:r,className:O("max-w-full min-w-0 shrink-0 truncate text-text-2"),children:d}),xa("span",{"data-slot":"reasoning-heading",className:"min-w-0 truncate text-text-2 empty:hidden",children:!r&&!t?i:null}),xa("span",{"data-slot":"reasoning-status",className:"flex shrink-0 items-center justify-end whitespace-nowrap text-text-2",children:r&&(i?xa(Eo,{status:"running",size:"sm",className:"text-text-2",children:n.thinking}):xa(cs,{}))})]})]})}function SP({className:e,children:t,...o}){let{streaming:a,open:r,fromTop:n,text:s}=hv(),i=wp(null),l=pv(i,{enabled:a&&r}),c=wP(i,r);return yP(()=>{let u=i.current;!u||!r||n.current&&!a&&(u.scrollTop=0,n.current=!1)},[t,s,r,a,n]),xa(wa.Panel,{"data-slot":"reasoning-content",children:xa("div",{ref:l.ref,"data-slot":"reasoning-content","data-attached":l.attached,"aria-busy":a||void 0,tabIndex:c,className:O("max-h-40 min-w-0 overflow-y-auto ps-6 pb-3 type-body-sm text-text-2","focus-visible:focus-ring-inset",e),...o,children:t??xa(Yd,{size:"sm",streaming:a,className:"text-text-2",children:s})})})}import*as ze from"react";import*as ar from"react";var fa={};ua(fa,{Arrow:()=>TI,Handle:()=>tc,Popup:()=>EI,Portal:()=>dI,Positioner:()=>kI,Provider:()=>LI,Root:()=>oI,Trigger:()=>sI,Viewport:()=>GI,createHandle:()=>UI});import*as hi from"react";import*as wv from"react";var Q0=[],J0;function xv(){return J0}function vv(e){Q0.push(e)}function Sl(e){let t=(o,a)=>{let r=$e(kP).current,n;try{J0=r;for(let s of Q0)s.before(r);n=e(o,a);for(let s of Q0)s.after(r);r.didInitialize=!0}finally{J0=void 0}return n};return t.displayName=e.displayName||e.name,t}function xp(e){return wv.forwardRef(Sl(e))}function kP(){return{didInitialize:!1}}import*as vp from"react";var eh=vp.createContext(void 0);function Xa(e){let t=vp.useContext(eh);if(t===void 0&&!e)throw new Error(He(72));return t}import*as ma from"react";var Je={};ua(Je,{engine:()=>nh,env:()=>ih,mediaQuery:()=>lh,os:()=>ah,screenReader:()=>sh});var ah={};ua(ah,{android:()=>Rv,apple:()=>oh,ios:()=>th,linux:()=>AP,mac:()=>Sv,windows:()=>TP});function MP(){return typeof navigator>"u"?{userAgent:"",platform:"",maxTouchPoints:0}:{userAgent:navigator.userAgent,platform:navigator.platform??"",maxTouchPoints:navigator.maxTouchPoints??0}}var{userAgent:EP,platform:PP,maxTouchPoints:Iv}=MP(),fs=EP.toLowerCase(),gs=PP.toLowerCase();var th=/^i(os$|p)/.test(gs)||gs==="macintel"&&Iv>1,Cv="android",Rv=gs===Cv||fs.includes(Cv),Sv=!th&&gs.startsWith("mac"),TP=gs.startsWith("win"),AP=!Rv&&/^(linux|chrome os)/.test(gs),oh=Sv||th;var nh={};ua(nh,{blink:()=>LP,gecko:()=>zP,webkit:()=>rh});var rh=typeof CSS<"u"&&!!CSS.supports?.("-webkit-backdrop-filter:none"),zP=!rh&&fs.includes("firefox"),LP=!rh&&fs.includes("chrom");var sh={};ua(sh,{voiceOver:()=>NP});var NP=oh;var ih={};ua(ih,{jsdom:()=>FP});var FP=/jsdom|happydom/.test(fs);var lh={};ua(lh,{iOS:()=>DP});var DP="@supports (-webkit-touch-callout: none)";function Ft(e){e.preventDefault(),e.stopPropagation()}function kv(e){return"nativeEvent"in e}function kn(e){return e.pointerType===""&&e.isTrusted?!0:Je.os.android&&e.pointerType?e.type==="click"&&e.buttons===1:e.detail===0&&!e.pointerType}function Dr(e){return Je.env.jsdom?!1:!Je.os.android&&e.width===0&&e.height===0||e.type==="pointerdown"&&e.width===1&&e.height===1&&e.pressure===0&&e.detail===0&&e.pointerType==="mouse"&&(Je.os.android||e.buttons===0)||e.width<1&&e.height<1&&e.pressure===0&&e.detail===0&&e.pointerType==="touch"}function za(e,t){let o=["mouse","pen"];return t||o.push("",void 0),o.includes(e)}function Mv(e){let t=e.type;return t==="click"||t==="mousedown"||t==="keydown"||t==="keyup"}function gt(e){let t=e.activeElement;for(;t?.shadowRoot?.activeElement!=null;)t=t.shadowRoot.activeElement;return t}function de(e,t){if(!e||!t)return!1;let o=t.getRootNode?.();if(e.contains(t))return!0;if(o&&cr(o)){let a=t;for(;a;){if(e===a)return!0;a=a.parentNode||a.host}}return!1}function en(e,t){let o=e;for(;o;){if(Ge(o)&&o.matches(t))return o;o=o.assignedSlot??o.parentNode??(cr(o)?o.host:null)}return null}function Ue(e){return"composedPath"in e?e.composedPath()[0]??e.target:e.target}var kl="data-base-ui-focusable";var ch="input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])",Ml="ArrowLeft",El="ArrowRight",uh="ArrowUp",Ip="ArrowDown";var Ev="data-open",Pv="data-closed";var Tv="data-anchor-hidden";var Rp={};ua(Rp,{popupOpen:()=>Cp,pressed:()=>dh});var Cp="data-popup-open",dh="data-pressed";var HP={[Cp]:""},VP={[Cp]:"",[dh]:""},BP={[Ev]:""},_P={[Pv]:""},ZP={[Tv]:""},Sp={open(e){return e?HP:null}},Pl={open(e){return e?VP:null}},hs={open(e){return e?BP:_P},anchorHidden(e){return e?ZP:null}},li={...hs,...Ka};var gG=Rp.popupOpen,Tl="data-trigger-disabled";function Mn(e,t){if(!Ge(e))return!1;let o=e;if(t.hasElement(o))return!o.hasAttribute(Tl);for(let[,a]of t.entries())if(de(a,o))return!a.hasAttribute(Tl);return!1}function kp(e,t){if(t==null)return!1;if("composedPath"in e)return e.composedPath().includes(t);let o=e;return o.target!=null&&t.contains(o.target)}function Av(e){return e.matches("html,body")}function dr(e){return Ae(e)&&e.matches(ch)}function mh(e){return en(e,`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${ch}`)!=null}function Al(e){return e?e.getAttribute("role")==="combobox"&&dr(e):!1}function zv(e){if(!e||Je.env.jsdom)return!0;try{return e.matches(":focus-visible")}catch{return!0}}function zl(e){return e?e.hasAttribute(kl)?e:e.querySelector(`[${kl}]`)||e:null}function GP(e,t){return t!=null&&!za(t)?0:typeof e=="function"?e():e}function pr(e,t,o){let a=GP(e,o);return typeof a=="number"?a:a?.[t]}function fh(e){return typeof e=="function"?e():e}function Mp(e,t){return t||e==="click"||e==="mousedown"}function Lv(e){return e?.includes("mouse")&&e!=="mousedown"}import{jsx as UP}from"react/jsx-runtime";var Nv=ma.createContext({hasProvider:!1,timeoutMs:0,delayRef:{current:0},initialDelayRef:{current:0},timeout:new Uo,currentIdRef:{current:null},currentContextRef:{current:null}});function $P(e,t){e.current=t.current}function gh(e){let{children:t,delay:o,timeoutMs:a=0}=e,r=ma.useRef(o),n=ma.useRef(o),s=ma.useRef(null),i=ma.useRef(null),l=it();return B(()=>{if(n.current=o,!s.current){r.current=o;return}r.current={open:pr(r.current,"open"),close:pr(o,"close")}},[o,s,r,n]),UP(Nv.Provider,{value:ma.useMemo(()=>({hasProvider:!0,delayRef:r,initialDelayRef:n,currentIdRef:s,timeoutMs:a,currentContextRef:i,timeout:l}),[a,l]),children:t})}function hh(e,t={open:!1}){let{open:o}=t,a=e.useState("floatingId"),r=ma.useContext(Nv),{currentIdRef:n,delayRef:s,timeoutMs:i,initialDelayRef:l,currentContextRef:c,hasProvider:u,timeout:d}=r,[p,f]=ma.useState(!1),m=ma.useRef(o);return B(()=>{m.current=o},[o]),B(()=>{function v(){c.current?.setIsInstantPhase(!1),n.current=null,c.current=null,s.current=l.current,d.clear()}if(n.current&&!o&&n.current===a){if(f(!1),i){let h=a;return d.start(i,()=>{e.select("open")||n.current&&n.current!==h||v()}),()=>{(m.current||n.current!==h)&&d.clear()}}v()}},[o,a,n,s,i,l,c,d,e]),B(()=>{if(!o)return;let v=c.current,h=n.current;d.clear(),c.current={onOpenChange:e.setOpen,setIsInstantPhase:f},n.current=a,s.current={open:0,close:pr(l.current,"close")},h!==null&&h!==a?(f(!0),v?.setIsInstantPhase(!0),v?.onOpenChange(!1,fe(_.none))):(f(!1),v?.setIsInstantPhase(!1))},[o,a,e,n,s,l,c,d]),B(()=>()=>{if(n.current===a){if(c.current=null,!m.current)return;n.current=null,$P(s,l),d.clear()}},[c,n,s,a,l,d]),ma.useMemo(()=>({activeIdRef:n,hasProvider:u,delayRef:s,isInstantPhase:p}),[n,u,s,p])}import*as jo from"react";function aa(...e){return()=>{for(let t=0;t<e.length;t+=1){let o=e[t];o&&o()}}}import*as Pp from"react";var Fv={clipPath:"inset(50%)",overflow:"hidden",whiteSpace:"nowrap",border:0,padding:0,width:1,height:1,margin:-1},Ep={...Fv,position:"fixed",margin:0,top:0,left:0},Dv={...Fv,position:"absolute"};import{jsx as WP}from"react/jsx-runtime";var tn=Pp.forwardRef(function(t,o){let[a,r]=Pp.useState();return B(()=>{Je.screenReader.voiceOver&&Je.engine.webkit&&r("button")},[]),WP("span",{...t,ref:o,style:Ep,"aria-hidden":a?void 0:!0,...{tabIndex:0,role:a},"data-base-ui-focus-guard":""})});var En=Math.min,mr=Math.max,Pn=Math.round,Nl=Math.floor,Or=e=>({x:e,y:e}),qP={left:"right",right:"left",bottom:"top",top:"bottom"};function Ap(e,t,o){return mr(e,En(t,o))}function Hr(e,t){return typeof e=="function"?e(t):e}function qo(e){return e.split("-")[0]}function La(e){return e.split("-")[1]}function zp(e){return e==="x"?"y":"x"}function Fl(e){return e==="y"?"height":"width"}function va(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function Dl(e){return zp(va(e))}function Vv(e,t,o){o===void 0&&(o=!1);let a=La(e),r=Dl(e),n=Fl(r),s=r==="x"?a===(o?"end":"start")?"right":"left":a==="start"?"bottom":"top";return t.reference[n]>t.floating[n]&&(s=Ll(s)),[s,Ll(s)]}function Bv(e){let t=Ll(e);return[Tp(e),t,Tp(t)]}function Tp(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var Ov=["left","right"],Hv=["right","left"],jP=["top","bottom"],KP=["bottom","top"];function YP(e,t,o){switch(e){case"top":case"bottom":return o?t?Hv:Ov:t?Ov:Hv;case"left":case"right":return t?jP:KP;default:return[]}}function _v(e,t,o,a){let r=La(e),n=YP(qo(e),o==="start",a);return r&&(n=n.map(s=>s+"-"+r),t&&(n=n.concat(n.map(Tp)))),n}function Ll(e){let t=qo(e);return qP[t]+e.slice(t.length)}function XP(e){var t,o,a,r;return{top:(t=e.top)!=null?t:0,right:(o=e.right)!=null?o:0,bottom:(a=e.bottom)!=null?a:0,left:(r=e.left)!=null?r:0}}function Lp(e){return typeof e!="number"?XP(e):{top:e,right:e,bottom:e,left:e}}function bs(e){let{x:t,y:o,width:a,height:r}=e;return{width:a,height:r,top:o,left:t,right:t+a,bottom:o+r,x:t,y:o}}function on(e,t){return t<0||t>=e.length}function fr(e,t){return Tn(e.current,{disabledIndices:t})}function Vr(e,t){return Tn(e.current,{decrement:!0,startingIndex:e.current.length,disabledIndices:t})}function Np(e,t,o){let{decrement:a,loopFocus:r,allowEscape:n,disabledIndices:s,minIndex:i,maxIndex:l}=o,c=()=>Tn(e,{startingIndex:t,decrement:a,disabledIndices:s}),u,d=!1;if(!r)u=a?Math.max(i,c()):Math.min(l,c());else if(a?t<=i:t>=l){let p=a?-1:e.length;n&&t!==p?u=-1:(u=a?l:i,d=!0)}else u=c();return{index:on(e,u)?-1:u,wrapped:d}}function Tn(e,{startingIndex:t=-1,decrement:o=!1,disabledIndices:a,amount:r=1}={}){let n=t;do n+=o?-r:r;while(n>=0&&n<=e.length-1&&an(e,n,a));return n}function an(e,t,o){if(typeof o=="function"?o(t):o?.includes(t)??!1)return!0;let r=e[t];return r?!ys(r)||r.matches(":disabled")?!0:!o&&(r.hasAttribute("disabled")||r.getAttribute("aria-disabled")==="true"):!1}function QP(e){return e.visibility==="hidden"||e.visibility==="collapse"}function ys(e,t=e?zo(e):null){return!e||!e.isConnected||!t||QP(t)?!1:typeof e.checkVisibility=="function"?e.checkVisibility():t.display!=="none"&&t.display!=="contents"}var JP='a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';function e3(e){let t=e.assignedSlot;if(t)return t;if(e.parentElement)return e.parentElement;let o=e.getRootNode();return cr(o)?o.host:null}function yh(e){for(let t of Array.from(e.children))if(Ro(t)==="summary")return t;return null}function t3(e,t){let o=yh(t);return!!o&&(e===o||de(o,e))}function Zv(e){let t=e?Ro(e):"";return e!=null&&e.matches(JP)&&(t!=="summary"||e.parentElement!=null&&Ro(e.parentElement)==="details"&&yh(e.parentElement)===e)&&(t!=="details"||yh(e)==null)&&(t!=="input"||e.type!=="hidden")}function wh(e){if(!Zv(e)||!e.isConnected||e.matches(":disabled"))return!1;for(let t=e;t;t=e3(t)){let o=t!==e,a=Ro(t)==="slot";if(t.hasAttribute("inert")||o&&Ro(t)==="details"&&!t.open&&!t3(e,t)||t.hasAttribute("hidden")||!a&&!o3(t,o))return!1}return!0}function o3(e,t){let o=zo(e);return t?o.display!=="none":ys(e,o)}function Gv(e){let t=e.tabIndex;if(t<0){let o=Ro(e);if(o==="details"||o==="audio"||o==="video"||Ae(e)&&e.isContentEditable)return 0}return t}function bh(e){if(Ro(e)!=="input")return null;let t=e;return t.type==="radio"&&t.name!==""?t:null}function Uv(e,t){let o=bh(e);if(!o)return!0;let a=t.find(r=>{let n=bh(r);return n?.name===o.name&&n.form===o.form&&n.checked});return a?a===o:t.find(r=>{let n=bh(r);return n?.name===o.name&&n.form===o.form})===o}function $v(e){if(Ae(e)&&Ro(e)==="slot"){let t=e.assignedElements({flatten:!0});if(t.length>0)return t}return Ae(e)&&e.shadowRoot?Array.from(e.shadowRoot.children):Array.from(e.children)}function xh(e,t){$v(e).forEach(o=>{Zv(o)&&t.push(o),xh(o,t)})}function Wv(e,t,o){$v(e).forEach(a=>{Ae(a)&&a.matches(t)&&o.push(a),Wv(a,t,o)})}function Ol(e){return wh(e)&&Gv(e)>=0}function vh(e){let t=[];return xh(e,t),t.filter(wh)}function Hl(e){let t=vh(e);return t.filter(o=>Gv(o)>=0&&Uv(o,t))}function qv(e,t){let o=Hl(e),a=o.length;if(a===0)return;let r=gt(Se(e)),n=o.indexOf(r),s=n===-1?t===1?0:a-1:n+t;return o[s]}function Fp(e){return qv(Se(e).body,1)||e}function Dp(e){return qv(Se(e).body,-1)||e}function jv(e,t,o){if(!e)return null;let a=[];xh(Se(e).body,a);let r=a.indexOf(e);if(r===-1)return null;let n=a.filter(wh);for(let s=1;s<a.length;s+=1){let i=a[(r+t*s+a.length)%a.length];if(!de(o,i)&&Ol(i)&&Uv(i,n))return i}return a[r]}function rn(e,t){let o=t||e.currentTarget,a=e.relatedTarget;return!a||!de(o,a)}function Kv(e){Hl(e).forEach(o=>{o.dataset.tabindex=o.getAttribute("tabindex")||"",o.setAttribute("tabindex","-1")})}function Ih(e){let t=[];Wv(e,"[data-tabindex]",t),t.forEach(o=>{let a=o.dataset.tabindex;delete o.dataset.tabindex,a?o.setAttribute("tabindex",a):o.removeAttribute("tabindex")})}function Qa(e,t,o=!0){return e.filter(r=>r.parentId===t).flatMap(r=>[...!o||r.context?.open?[r]:[],...Qa(e,r.id,o)])}function Ch(e,t){let o=[],a=e.find(r=>r.id===t)?.parentId;for(;a;){let r=e.find(n=>n.id===a);a=r?.parentId,r&&(o=o.concat(r))}return o}function Br(e){return`data-base-ui-${e}`}var Op=0;function ci(e,t={}){let{preventScroll:o=!1,sync:a=!1,shouldFocus:r}=t;cancelAnimationFrame(Op);function n(){r&&!r()||e?.focus({preventScroll:o})}if(a)return n(),Be;let s=requestAnimationFrame(n);return Op=s,()=>{Op===s&&(cancelAnimationFrame(s),Op=0)}}var Yv="data-base-ui-inert",Vl=new WeakMap,Hp=new WeakSet,Bl=new WeakMap,Rh=0;function e8(e){return e?cr(e)?e.host:e8(e.parentNode):null}var Xv=(e,t)=>t.map(o=>{if(e.contains(o))return o;let a=e8(o);return e.contains(a)?a:null}).filter(o=>o!=null),Qv=e=>{let t=new Set;return e.forEach(o=>{let a=o;for(;a&&!t.has(a);)t.add(a),a=a.parentNode}),t},Jv=(e,t,o)=>{let a=[],r=n=>{!n||o.has(n)||Array.from(n.children).forEach(s=>{Ro(s)!=="script"&&(t.has(s)?r(s):a.push(s))})};return r(e),a};function a3(e,t,o,{mark:a=!0}){let r=Xv(t,e),n=a?Jv(t,Qv(r),new Set(r)):[],s=[],i=[];if(o){let l=Xv(t,Array.from(t.querySelectorAll("[aria-live]"))),c=r.concat(l);Jv(t,Qv(c),new Set(c)).forEach(d=>{let p=d.getAttribute("aria-hidden"),f=p!==null&&p!=="false",m=(Vl.get(d)||0)+1;Vl.set(d,m),s.push(d),m===1&&f&&Hp.add(d),f||d.setAttribute("aria-hidden","true")})}return a&&n.forEach(l=>{let c=(Bl.get(l)||0)+1;Bl.set(l,c),i.push(l),c===1&&l.setAttribute(Yv,"")}),Rh+=1,()=>{s.forEach(l=>{let c=(Vl.get(l)||0)-1;Vl.set(l,c),c||(Hp.has(l)||l.removeAttribute("aria-hidden"),Hp.delete(l))}),a&&i.forEach(l=>{let c=(Bl.get(l)||0)-1;Bl.set(l,c),c||l.removeAttribute(Yv)}),Rh-=1,Rh||(Vl=new WeakMap,Hp=new WeakSet,Bl=new WeakMap)}}function Sh(e,t={}){let{ariaHidden:o=!1,mark:a=!0}=t,r=Se(e[0]).body;return a3(e,r,o,{mark:a})}import*as Et from"react";var t8={style:{transition:"none"}},o8="data-base-ui-click-trigger",r3="data-base-ui-swipe-ignore",n3="data-swipe-ignore",JG=`[${r3}]`,eU=`[${n3}]`,a8={fallbackAxisSide:"none"},Vp={fallbackAxisSide:"end"},r8={clipPath:"inset(50%)",position:"fixed",top:0,left:0};import{jsx as kh,jsxs as n8}from"react/jsx-runtime";var s8=Et.createContext(null),Mh=()=>Et.useContext(s8),s3=Br("portal");function Bp(e={}){let{ref:t,container:o,componentProps:a=Le,elementProps:r}=e,n=Nr(),i=Mh()?.portalNode,[l,c]=Et.useState(null),[u,d]=Et.useState(null),p=W(h=>{h!==null&&d(h)}),f=Et.useRef(null);B(()=>{if(o===null){f.current&&(f.current=null,d(null),c(null));return}let h=(o&&(Od(o)?o:o.current))??i??document.body;if(h==null){f.current&&(f.current=null,d(null),c(null));return}f.current!==h&&(f.current=h,d(null),c(h))},[o,i]);let m=me("div",a,{ref:[t,p],props:[{id:n,[s3]:""},r]}),v=l&&m?lr(m,l):null;return{node:u,nodeId:Et.isValidElement(m)?m.props.id:void 0,subtree:v}}var Eh=Et.forwardRef(function(t,o){let{render:a,className:r,style:n,children:s,container:i,portalOwnerRole:l,...c}=t,{node:u,nodeId:d,subtree:p}=Bp({container:i,ref:o,componentProps:t,elementProps:c}),f=Et.useRef(null),m=Et.useRef(null),v=Et.useRef(null),h=Et.useRef(null),[y,x]=Et.useState(null),g=Et.useRef(!1),b=y?.modal,w=y?.open,C=!!y&&!y.modal&&y.open&&!!u;Et.useEffect(()=>{if(!u||b)return;function I(S){u&&S.relatedTarget&&rn(S)&&(S.type==="focusin"?g.current&&(Ih(u),g.current=!1):(Kv(u),g.current=!0))}return aa(De(u,"focusin",I,!0),De(u,"focusout",I,!0))},[u,b]),B(()=>{!u||w!==!0||!g.current||(Ih(u),g.current=!1)},[w,u]);let R=Et.useMemo(()=>({beforeOutsideRef:f,afterOutsideRef:m,beforeInsideRef:v,afterInsideRef:h,portalNode:u,setFocusManagerState:x}),[u]);return n8(Et.Fragment,{children:[p,n8(s8.Provider,{value:R,children:[C&&u&&kh(tn,{"data-type":"outside",ref:f,onFocus:I=>{if(rn(I,u))v.current?.focus();else{let S=y?y.domReference:null;Dp(S)?.focus()}}}),C&&u&&kh("span",{role:l,"aria-owns":d,style:r8}),u&&lr(s,u),C&&u&&kh(tn,{"data-type":"outside",ref:m,onFocus:I=>{if(rn(I,u))h.current?.focus();else{let S=y?y.domReference:null;Fp(S)?.focus(),y?.closeOnFocusOut&&y?.onOpenChange(!1,fe(_.focusOut,I.nativeEvent))}}})]})]})});import*as zn from"react";function _p(){let e=new Map;return{emit(t,o){e.get(t)?.forEach(a=>a(o))},on(t,o){e.has(t)||e.set(t,new Set),e.get(t).add(o)},off(t,o){e.get(t)?.delete(o)}}}var An=class{nodesRef={current:[]};events=_p();addNode(t){this.nodesRef.current.push(t)}removeNode(t){let o=this.nodesRef.current.findIndex(a=>a===t);o!==-1&&this.nodesRef.current.splice(o,1)}};import{jsx as i8}from"react/jsx-runtime";var l8=zn.createContext(null),c8=zn.createContext(null),Na=()=>zn.useContext(l8)?.id||null,ra=e=>{let t=zn.useContext(c8);return e??t};function _l(e){let t=Nr(),o=ra(e),a=Na();return B(()=>{if(!t)return;let r={id:t,parentId:a};return o?.addNode(r),()=>{o?.removeNode(r)}},[o,t,a]),t}function Ph(e){let{children:t,id:o}=e,a=Na();return i8(l8.Provider,{value:zn.useMemo(()=>({id:o,parentId:a}),[o,a]),children:t})}function Th(e){let{children:t,externalTree:o}=e,a=$e(()=>o??new An).current;return i8(c8.Provider,{value:a,children:t})}import{jsx as u8,jsxs as i3}from"react/jsx-runtime";function l3(e,t){let o=Qe(Ue(e));return e instanceof o.KeyboardEvent?"keyboard":e instanceof o.FocusEvent?t||"keyboard":"pointerType"in e?e.pointerType||(kn(e)?"keyboard":t||"mouse"):"touches"in e?"touch":e instanceof o.MouseEvent?t||(e.detail===0?"keyboard":"mouse"):""}var d8=20,Ln=[];function Ah(){Ln=Ln.filter(e=>e.deref()?.isConnected)}function p8(e){Ah(),e&&Ro(e)!=="body"&&(Ln.push(new WeakRef(e)),Ln.length>d8&&(Ln=Ln.slice(-d8)))}function m8(){return Ah(),Ln[Ln.length-1]?.deref()}function c3(e){return e?Ol(e)?e:Hl(e)[0]||e:null}function f8(e){if(e.hasAttribute("tabindex")&&!e.hasAttribute("data-tabindex")||!e.getAttribute("role")?.includes("dialog"))return;let o=vh(e).filter(r=>{let n=r.getAttribute("data-tabindex")||"";return Ol(r)||r.hasAttribute("data-tabindex")&&!n.startsWith("-")}),a=e.getAttribute("tabindex");o.length===0?a!=="0"&&(e.setAttribute("tabindex","0"),e.setAttribute("data-tabindex","0")):(a!=="-1"||e.hasAttribute("data-tabindex")&&e.getAttribute("data-tabindex")!=="-1")&&(e.setAttribute("tabindex","-1"),e.setAttribute("data-tabindex","-1"))}function zh(e){let{context:t,children:o,disabled:a=!1,initialFocus:r=!0,returnFocus:n=!0,explicitReturnFocus:s,restoreFocus:i=!1,modal:l=!0,closeOnFocusOut:c=!0,openInteractionType:u="",nextFocusableElement:d,previousFocusableElement:p,beforeContentFocusGuardRef:f,externalTree:m,getInsideElements:v}=e,h=t.useState("open"),y=t.useState("domReferenceElement"),x=t.useState("floatingElement"),{events:g,dataRef:b}=t.context,w=W(()=>b.current.floatingContext?.nodeId),C=r===!1,R=Al(y)&&C,I=ft(r),S=ft(n),M=ft(s),T=ft(u),V=ft(h),F=ra(m),L=Mh(),P=jo.useRef(!1),H=jo.useRef(!1),D=jo.useRef(!1),N=jo.useRef(null),A=jo.useRef(""),E=jo.useRef(""),G=jo.useRef(null),z=jo.useRef(null),oe=Ht(G,f,L?.beforeInsideRef),X=Ht(z,L?.afterInsideRef),Z=it(),U=it(),ae=Aa(),we=L!=null,j=zl(x),Y=W((ee=j)=>ee?Hl(ee):[]),q=W(()=>v?.().filter(ee=>ee!=null)??[]);jo.useEffect(()=>{if(a||!l)return;function ee(ne){ne.key==="Tab"&&de(j,gt(Se(j)))&&Y().length===0&&!R&&Ft(ne)}let Me=Se(j);return De(Me,"keydown",ee)},[a,j,l,R,Y]),jo.useEffect(()=>{if(a||!h)return;let ee=Se(j);function Me(){D.current=!1}function ne(ce){let ie=Ue(ce),he=q(),le=de(x,ie)||de(y,ie)||de(L?.portalNode,ie)||he.some(We=>We===ie||de(We,ie));D.current=!le,E.current=ce.pointerType||"keyboard",en(ie,`[${o8}]`)&&(H.current=!0,U.start(0,()=>{H.current=!1}))}function J(){E.current="keyboard"}return aa(De(ee,"pointerdown",ne,!0),De(ee,"pointerup",Me,!0),De(ee,"pointercancel",Me,!0),De(ee,"keydown",J,!0),Me)},[a,x,y,j,h,L,U,q]),jo.useEffect(()=>{if(a||!c)return;let ee=Se(j);function Me(){H.current=!0,U.start(0,()=>{H.current=!1})}function ne(he){let le=Ue(he);Ol(le)&&(N.current=le)}function J(he){let le=he.relatedTarget,We=he.currentTarget,Oe=Ue(he);l&&le==null&&Oe!=null&&de(x,Oe)&&p8(Oe),queueMicrotask(()=>{let xe=w(),$=t.context.triggerElements,Q=q(),Ee=le?.hasAttribute(Br("focus-guard"))&&[G.current,z.current,L?.beforeInsideRef.current,L?.afterInsideRef.current,L?.beforeOutsideRef.current,L?.afterOutsideRef.current,ur(p),ur(d)].includes(le),ue=!(de(y,le)||de(x,le)||de(le,x)||de(L?.portalNode,le)||Q.some(be=>be===le||de(be,le))||$.hasMatchingElement(be=>de(be,le))||Ee||F&&(Qa(F.nodesRef.current,xe).find(be=>de(be.context?.elements.floating,le)||de(be.context?.elements.domReference,le))||Ch(F.nodesRef.current,xe).find(be=>[be.context?.elements.floating,zl(be.context?.elements.floating)].includes(le)||be.context?.elements.domReference===le)));if(We===y&&j&&f8(j),i&&We!==y&&!ys(Oe)&&gt(ee)===ee.body){if(Ae(j)&&(j.focus(),i==="popup")){ae.request(()=>{j.focus()});return}let be=Y(),bt=N.current,ct=(bt&&be.includes(bt)?bt:null)||be[be.length-1]||j;Ae(ct)&&ct.focus()}if(b.current.insideReactTree){b.current.insideReactTree=!1;return}(R||!l)&&le&&ue&&!H.current&&(R||le!==m8())&&(P.current=!0,t.setOpen(!1,fe(_.focusOut,he)))})}function ce(){D.current||(b.current.insideReactTree=!0,Z.start(0,()=>{b.current.insideReactTree=!1}))}let ie=Ae(y)?y:null;if(!(!x&&!ie))return aa(ie&&De(ie,"focusout",J),ie&&De(ie,"pointerdown",Me),x&&De(x,"focusin",ne),x&&De(x,"focusout",J),x&&L&&De(x,"focusout",ce,!0))},[a,y,x,j,l,F,L,t,c,i,Y,R,w,b,Z,U,ae,d,p,q]),jo.useEffect(()=>{if(a||!x||!h)return;let ee=Array.from(L?.portalNode?.querySelectorAll(`[${Br("portal")}]`)||[]),ne=(F?Ch(F.nodesRef.current,w()):[]).find(We=>Al(We.context?.elements.domReference||null))?.context?.elements.domReference,ce=[...[x,...ee,G.current,z.current,L?.beforeOutsideRef.current,L?.afterOutsideRef.current,...q()],ne,ur(p),ur(d),R?y:null].filter(We=>We!=null),ie=Sh(ce,{ariaHidden:l||R,mark:!1}),he=[x,...ee].filter(We=>We!=null),le=Sh(he);return()=>{le(),ie()}},[h,a,y,x,l,L,R,F,w,d,p,q]),B(()=>{if(!h||a||!Ae(j))return;A.current="",E.current="";let ee=Se(j),Me=gt(ee);queueMicrotask(()=>{let ne=I.current,J=typeof ne=="function"?ne(T.current||""):ne;if(J===void 0||J===!1||de(j,Me))return;let ie=null,he=()=>(ie==null&&(ie=Y(j)),ie[0]||j),le;J===!0||J===null?le=he():le=ur(J),le=le||he();let We=de(j,gt(ee)),Oe=b.current.openEvent,xe=Oe?.type==="mousedown"&&kn(Oe);ci(le,{sync:xe,preventScroll:le===j,shouldFocus(){if(!V.current)return!1;if(We)return!0;let $=gt(ee);return!($!==le&&de(j,$))}})})},[a,h,j,Y,I,T,V,b]);let re=jo.useRef(null);B(()=>{if(a||!j){re.current=null;return}re.current&&(re.current.cancelled=!0,re.current=null);let ee=Se(j),Me=gt(ee),ne=T.current==null;p8(Me);function J(ie){if(ie.open||(A.current=l3(ie.nativeEvent,E.current)),(ie.reason===_.focusOut&&ie.triggerElement?.hasAttribute(Br("focus-guard"))||ie.reason===_.triggerHover&&ie.nativeEvent.type==="mouseleave")&&(P.current=!0),ie.reason===_.outsidePress)if(ie.nested)P.current=!1;else if(kn(ie.nativeEvent)||Dr(ie.nativeEvent))P.current=!1;else{let he=!1;Se(j).createElement("div").focus({get preventScroll(){return he=!0,!1}}),he?P.current=!1:P.current=!0}}g.on("openchange",J);function ce(ie){let he=S.current,le=typeof he=="function"?he(ie):he;if(le===void 0||le===!1)return null;le===null&&(le=!0);let We=y?.isConnected?y:null,Oe=Me?.isConnected&&Ro(Me)!=="body"?Me:null,xe=ne?Oe||We:We||Oe;return xe||(xe=m8()||null),typeof le=="boolean"?xe:ur(le)||xe||null}return()=>{g.off("openchange",J);let ie=gt(ee),he=q(),le=de(x,ie)||he.some(Q=>Q===ie||de(Q,ie))||F&&Qa(F.nodesRef.current,w(),!1).some(Q=>de(Q.context?.elements.floating,ie)),We=S.current,Oe=A.current,xe=ce(Oe),$={cancelled:!1};re.current=$,queueMicrotask(()=>{re.current===$&&(re.current=null);let Q=c3(xe),Ee=M.current??typeof We!="boolean";if(!$.cancelled&&We&&!P.current&&Ae(Q)&&(!(!Ee&&Q!==ie&&ie!==ee.body)||le)){let ue={preventScroll:!0};Oe==="keyboard"&&(ue.focusVisible=!0),Q.focus(ue)}P.current=!1})}},[a,x,j,S,M,T,g,F,y,w,q]),B(()=>{if(!Je.engine.webkit||h||!x)return;let ee=gt(Se(x));!Ae(ee)||!dr(ee)||de(x,ee)&&ee.blur()},[h,x]),B(()=>{if(!(a||!L))return L.setFocusManagerState({modal:l,closeOnFocusOut:c,open:h,onOpenChange:t.setOpen,domReference:y}),()=>{L.setFocusManagerState(null)}},[a,L,l,h,t,c,y]),B(()=>{if(!(a||!j))return f8(j),()=>{queueMicrotask(Ah)}},[a,j]);let ge=!a&&(l?!R:!0)&&(we||l);return i3(jo.Fragment,{children:[ge&&u8(tn,{"data-type":"inside",ref:oe,onFocus:ee=>{if(l){let Me=Y();ci(Me[Me.length-1])}else L?.portalNode&&(P.current=!1,rn(ee,L.portalNode)?Fp(y)?.focus():ur(p??L.beforeOutsideRef)?.focus())}}),o,ge&&u8(tn,{"data-type":"inside",ref:X,onFocus:ee=>{l?ci(Y()[0]):L?.portalNode&&(c&&(P.current=!0),rn(ee,L.portalNode)?Dp(y)?.focus():ur(d??L.afterOutsideRef)?.focus())}})]})}import*as Zl from"react";function Gl(e,t={}){let{enabled:o=!0,event:a="click",toggle:r=!0,ignoreMouse:n=!1,stickIfOpen:s=!0,touchOpenDelay:i=0,reason:l=_.triggerPress}=t,c=e.context.dataRef,u=Zl.useRef(void 0),d=Aa(),p=it(),f=Zl.useMemo(()=>{function m(h,y,x,g){let b=fe(l,y,x);h&&g==="touch"&&i>0?p.start(i,()=>{e.setOpen(!0,b)}):e.setOpen(h,b)}function v(h,y,x){let g=c.current.openEvent,b=e.select("domReferenceElement")!==y;return h&&b||!h||!r?!0:g&&(typeof s=="function"?s():s)?!x(g.type):!1}return{onPointerDown(h){u.current=za(h.pointerType,!0)&&Dr(h.nativeEvent)?"virtual":h.pointerType},onMouseDown(h){let y=u.current,x=h.nativeEvent,g=e.select("open");if(h.button!==0||a==="click"||za(y,!0)&&n)return;let b=v(g,h.currentTarget,I=>I==="click"||I==="mousedown"),w=Ue(x),C=dr(w);if(C||y==="virtual"){m(b,x,C?w:h.currentTarget,y);return}let R=h.currentTarget;d.request(()=>{m(b,x,R,y)})},onClick(h){if(a==="mousedown-only")return;let y=u.current;if(a==="mousedown"&&y){u.current=void 0;return}if(za(y,!0)&&n)return;let x=e.select("open"),g=v(x,h.currentTarget,b=>b==="click"||b==="mousedown"||b==="keydown"||b==="keyup");m(g,h.nativeEvent,h.currentTarget,y)},onKeyDown(){u.current=void 0}}},[c,a,n,l,e,s,r,d,p,i]);return Zl.useMemo(()=>o?{reference:f}:Le,[o,f])}import*as Ia from"react";function u3(e,t){let o=null,a=null,r=!1;return{contextElement:e||void 0,getBoundingClientRect(){let n=e?.getBoundingClientRect()||{width:0,height:0,x:0,y:0},s=t.axis==="x"||t.axis==="both",i=t.axis==="y"||t.axis==="both",l=["mouseenter","mousemove"].includes(t.dataRef.current.openEvent?.type||"")&&t.pointerType!=="touch",c=t.axis==="y"?n.width:0,u=t.axis==="x"?n.height:0,d=n.x,p=n.y;return o==null&&t.x&&s&&(o=n.x-t.x),a==null&&t.y&&i&&(a=n.y-t.y),d-=o||0,p-=a||0,(!r||l)&&(d=s&&t.x!=null?t.x:d,p=i&&t.y!=null?t.y:p),r=!0,{width:c,height:u,x:d,y:p,top:p,right:d+c,bottom:p+u,left:d}}}}function g8(e){return e!=null&&e.clientX!=null}function Lh(e,t={}){let{enabled:o=!0,axis:a="both"}=t,r=e.useState("open"),n=e.useState("floatingElement"),s=e.useState("domReferenceElement"),i=e.context.dataRef,l=Ia.useRef(!1),c=Ia.useRef(null),[u,d]=Ia.useState(),[p,f]=Ia.useState([]),m=W(g=>{e.set("positionReference",g)}),v=W((g,b,w)=>{l.current||i.current.openEvent&&!g8(i.current.openEvent)||e.set("positionReference",u3(w??s,{x:g,y:b,axis:a,dataRef:i,pointerType:u}))}),h=W(g=>{r?c.current||(v(g.clientX,g.clientY,g.currentTarget),f([])):v(g.clientX,g.clientY,g.currentTarget)}),y=za(u)?n:r;Ia.useEffect(()=>{if(!o){m(s);return}if(!y)return;function g(){c.current?.(),c.current=null}let b=Qe(n);function w(C){let R=Ue(C);de(n,R)?g():v(C.clientX,C.clientY)}return!i.current.openEvent||g8(i.current.openEvent)?c.current=De(b,"mousemove",w):m(s),g},[y,o,n,i,s,e,v,m,p]),Ia.useEffect(()=>()=>{e.set("positionReference",null)},[e]),Ia.useEffect(()=>{o&&!n&&(l.current=!1)},[o,n]),Ia.useEffect(()=>{!o&&r&&(l.current=!0)},[o,r]);let x=Ia.useMemo(()=>{function g(b){d(b.pointerType)}return{onPointerDown:g,onPointerEnter:g,onMouseMove:h,onMouseEnter:h}},[h]);return Ia.useMemo(()=>o?{reference:x,trigger:x}:{},[o,x])}import*as na from"react";function d3(){return!1}function p3(e){return{escapeKey:typeof e=="boolean"?e:e?.escapeKey??!1,outsidePress:typeof e=="boolean"?e:e?.outsidePress??!0}}function Ul(e,t={}){let{enabled:o=!0,escapeKey:a=!0,outsidePress:r=!0,outsidePressEvent:n="sloppy",referencePress:s=d3,bubbles:i,externalTree:l}=t,c=e.useState("open"),u=e.useState("floatingElement"),{dataRef:d,events:p}=e.context,f=ra(l),m=W(typeof r=="function"?r:()=>!1),v=typeof r=="function"?m:r,h=v!==!1,y=W(()=>n),{escapeKey:x,outsidePress:g}=p3(i),b=na.useRef(!1),w=na.useRef(!1),C=na.useRef(!1),R=na.useRef(!1),I=na.useRef(!1),S=na.useRef(""),M=na.useRef(null),T=it(),V=it(),F=it(),L=W(()=>{V.clear(),d.current.insideReactTree=!1}),P=W(X=>{let Z=d.current.floatingContext?.nodeId;return(f?Qa(f.nodesRef.current,Z):[]).some(ae=>ae.context?.open&&!ae.context.dataRef.current[X])}),H=W(X=>kp(X,e.select("floatingElement"))||kp(X,e.select("domReferenceElement"))),D=W(X=>{s()&&e.setOpen(!1,fe(_.triggerPress,X.nativeEvent))}),N=W(X=>{if(!c||!o||!a||X.key!=="Escape")return;let Z=kv(X)?X.nativeEvent:X;if(I.current||Z.isComposing||!x&&P("__escapeKeyBubbles"))return;let U=fe(_.escapeKey,Z);e.setOpen(!1,U),U.isCanceled||X.preventDefault(),!x&&!U.isPropagationAllowed&&X.stopPropagation()}),A=W(()=>{d.current.insideReactTree=!0,V.start(0,L)}),E=W(X=>{if(!c||!o||X.button!==0)return;let Z=Ue(X.nativeEvent);de(e.select("floatingElement"),Z)&&(b.current||(b.current=!0,w.current=!1))}),G=W(X=>{!c||!o||(X.defaultPrevented||X.nativeEvent.defaultPrevented)&&b.current&&(w.current=!0)});na.useEffect(()=>{function X(Z){Z.open||(R.current=!1)}return p.on("openchange",X),()=>{p.off("openchange",X)}},[p]),na.useEffect(()=>L,[L]),na.useEffect(()=>{if(!c||!o)return c||(R.current=!1,I.current=!1,S.current="",M.current=null),L;d.current.__escapeKeyBubbles=x,d.current.__outsidePressBubbles=g;let X=new Uo,Z=Se(u);function U(){F.clear(),I.current=!0}function ae(){I.current=!0,F.start(Je.engine.webkit?5:0,()=>{I.current=!1})}function we(){C.current=!0,X.start(0,()=>{C.current=!1})}function j(){b.current=!1,w.current=!1}function Y(){let $=S.current,Q=$==="pen"||!$?"mouse":$,Ee=y(),ue=typeof Ee=="function"?Ee():Ee;return typeof ue=="string"?ue:ue[Q]}function q($){let Q=Y();return Q==="intentional"&&$.type!=="click"||Q==="sloppy"&&$.type==="click"}function re($){let Q=d.current.floatingContext?.nodeId,Ee=f&&Qa(f.nodesRef.current,Q).some(ue=>kp($,ue.context?.elements.floating));return H($)||Ee}function ge($){if(q($)){$.type!=="click"&&!H($)&&(X.clear(),C.current=!1),L();return}if(d.current.insideReactTree){L();return}let Q=Ue($),Ee=`[${Br("inert")}]`,ue=Ge(Q)?Q.getRootNode():null,be=Array.from((cr(ue)?ue:Se(e.select("floatingElement"))).querySelectorAll(Ee)),bt=e.context.triggerElements;if(Q&&(bt.hasElement(Q)||bt.hasMatchingElement(ut=>de(ut,Q))))return;let ct=Ge(Q)?Q:null;for(;ct&&!Wa(ct);){let ut=$a(ct);if(Wa(ut)||!Ge(ut))break;ct=ut}if(!(be.length&&Ge(Q)&&!Av(Q)&&!de(Q,e.select("floatingElement"))&&be.every(ut=>!de(ct,ut)))){if(Ae(Q)&&!("touches"in $)){let ut=Wa(Q),ot=zo(Q),yt=/auto|scroll/,Qo=ut||yt.test(ot.overflowX),Ct=ut||yt.test(ot.overflowY),kt=Qo&&Q.clientWidth>0&&Q.scrollWidth>Q.clientWidth,Sa=Ct&&Q.clientHeight>0&&Q.scrollHeight>Q.clientHeight,Dt=ot.direction==="rtl",Do=Sa&&(Dt?$.offsetX<=Q.offsetWidth-Q.clientWidth:$.offsetX>Q.clientWidth),Va=kt&&$.offsetY>Q.clientHeight;if(Do||Va)return}if(!re($)){if(Y()==="intentional"){if($.detail!==0&&!kn($)&&!R.current)return;if(C.current){X.clear(),C.current=!1;return}}typeof v=="function"&&!v($)||P("__outsidePressBubbles")||(e.setOpen(!1,fe(_.outsidePress,$)),L())}}}function ee($){Y()!=="sloppy"||$.pointerType==="touch"||!e.select("open")||!o||H($)||ge($)}function Me($){if(Y()!=="sloppy"||!e.select("open")||!o||H($))return;let Q=$.touches[0];Q&&(M.current={startTime:Date.now(),startX:Q.clientX,startY:Q.clientY,dismissOnTouchEnd:!1,dismissOnMouseDown:!0},T.start(1e3,()=>{M.current&&(M.current.dismissOnTouchEnd=!1,M.current.dismissOnMouseDown=!1)}))}function ne($,Q){let Ee=Ue($);if(!Ee)return;let ue=De(Ee,$.type,()=>{Q($),ue()})}function J($){S.current="touch",ne($,Me)}function ce($){T.clear(),$.type==="pointerdown"&&($.button===0&&(R.current=!0),S.current=$.pointerType),!($.type==="mousedown"&&M.current&&!M.current.dismissOnMouseDown)&&ne($,Q=>{Q.type==="pointerdown"?ee(Q):ge(Q)})}function ie($){if($.type==="pointercancel"&&(R.current=!1),!b.current)return;let Q=w.current;if(j(),Y()==="intentional"){if($.type==="pointercancel"){Q&&we();return}if(!re($)){if(Q){we();return}typeof v=="function"&&!v($)||(X.clear(),C.current=!0,L())}}}function he($){if(Y()!=="sloppy"||!M.current||H($))return;let Q=$.touches[0];if(!Q)return;let Ee=Math.abs(Q.clientX-M.current.startX),ue=Math.abs(Q.clientY-M.current.startY),be=Math.sqrt(Ee*Ee+ue*ue);be>5&&(M.current.dismissOnTouchEnd=!0),be>10&&(ge($),T.clear(),M.current=null)}function le($){ne($,he)}function We($){Y()!=="sloppy"||!M.current||H($)||(M.current.dismissOnTouchEnd&&ge($),T.clear(),M.current=null)}function Oe($){ne($,We)}let xe=aa(a&&aa(De(Z,"keydown",N),De(Z,"compositionstart",U),De(Z,"compositionend",ae)),h&&aa(De(Z,"click",ce,!0),De(Z,"pointerdown",ce,!0),De(Z,"pointerup",ie,!0),De(Z,"pointercancel",ie,!0),De(Z,"mousedown",ce,!0),De(Z,"mouseup",ie,!0),De(Z,"touchstart",J,{capture:!0,passive:!0}),De(Z,"touchmove",le,{capture:!0,passive:!0}),De(Z,"touchend",Oe,{capture:!0,passive:!0})));return()=>{xe(),X.clear(),j(),C.current=!1}},[d,u,a,h,v,c,o,x,g,N,L,y,P,H,f,e,T,F]);let z=na.useMemo(()=>({onKeyDown:N,onPointerDown:D,onClick:D}),[N,D]),oe=na.useMemo(()=>({onKeyDown:N,onPointerDown:G,onMouseDown:G,onClickCapture:A,onMouseDownCapture(X){A(),E(X)},onPointerDownCapture(X){A(),E(X)},onMouseUpCapture:A,onTouchEndCapture:A,onTouchMoveCapture:A}),[N,A,E,G]);return na.useMemo(()=>o?{reference:z,floating:oe,trigger:z}:{},[o,z,oe])}var ui=class{attachedStores=[];attachedStoreValue=null;storeListeners=new Set;constructor(t,o,a=!0){this.fallbackStore=t,this.componentName=o,this.throwOnMissingTrigger=a}get attachedStore(){return this.attachedStoreValue}get store(){return this.attachedStoreValue??this.fallbackStore}get serverStore(){return this.fallbackStore}subscribeStore(t){return this.storeListeners.add(t),()=>{this.storeListeners.delete(t)}}attachStore(t){return this.attachedStores.push(t),this.setActiveStore(t),()=>{let o=this.attachedStores.lastIndexOf(t);o!==-1&&this.attachedStores.splice(o,1),this.setActiveStore(this.attachedStores[this.attachedStores.length-1]??null)}}setActiveStore(t){this.attachedStoreValue!==t&&(this.attachedStoreValue=t,this.storeListeners.forEach(o=>{o()}))}openByTrigger(t){let o=this.attachedStore;if(o===null)return;let a;if(t){for(let r=this.attachedStores.length-1;r>=0&&!a;r-=1)a=this.attachedStores[r].context.triggerElements.getById(t);a??=this.fallbackStore.context.triggerElements.getById(t)}if(t&&!a&&this.throwOnMissingTrigger)throw new Error(He(99,this.componentName,t,this.componentName));o.setOpen(!0,fe(_.imperativeAction,void 0,a))}closePopup(){let t=this.attachedStore;t!==null&&t.setOpen(!1,fe(_.imperativeAction))}};import*as Fh from"react";function $l(e){let{popupStore:t,treatPopupAsFloatingElement:o=!1,floatingRootContext:a,floatingId:r,nested:n,onOpenChange:s}=e,i=t.useState("open"),l=t.useState("activeTriggerElement"),c=t.useState(o?"popupElement":"positionerElement"),u=s;return t.useSyncedValue("floatingId",r),B(()=>{let d={open:i,floatingId:r,referenceElement:l,floatingElement:c};Ge(l)&&(d.domReferenceElement=l),a.state.positionReference===a.state.referenceElement&&(d.positionReference=l),a.update(d)},[i,r,l,c,a]),a.context.onOpenChange=u,a.context.nested=n,a}import*as Nh from"react";function h8(e){let{open:t,ref:o,preventUnmountOnClose:a,setPreventUnmountOnClose:r,onUnmount:n,animateInitialOpen:s}=e,i=W(r),{mounted:l,setMounted:c,transitionStatus:u}=ja(t,!1,!1,s),d=t?!1:a;B(()=>{t&&i(!1)},[t,i]);let p=Nh.useRef(l),f=Nh.useRef(!1),m=Qd(),v=()=>{p.current=!1,c(!1),n()};B(()=>{p.current=l,f.current&&(f.current=!1,!t&&l&&v())});let h=W(()=>{if(p.current){if(t){f.current=!0,m();return}v()}});return oa({enabled:l&&!t&&!d,open:t,ref:o,onComplete(){t||h()}}),{mounted:l,transitionStatus:u,preventUnmountingOnClose:d,forceUnmount:h}}var Zp={tabIndex:-1,[kl]:""};function y8(e,t=!1){let o=Nr(),a=Na()!=null,r=$e(()=>e(o,a)).current;return $l({popupStore:r,treatPopupAsFloatingElement:t,floatingRootContext:r.state.floatingRootContext,floatingId:o,nested:a,onOpenChange:r.setOpen}),r}function Gp({handle:e,store:t}){return B(()=>e.attachStore(t),[e,t]),null}function b8(e){let t=e.context.triggerElements.size;e.select("open")&&e.state.triggerCount!==t&&e.set("triggerCount",t)}function Dh(e,t){let o=Fh.useRef(null);return W(a=>{let r=o.current;if(r!==null){if(r.element===a&&r.store===t&&r.id===e)return;o.current=null;let n=r.store;n.context.triggerElements.getById(r.id)===r.element&&(n.context.triggerElements.delete(r.id),b8(n))}a!==null&&e!==void 0&&(o.current={store:t,id:e,element:a},t.context.triggerElements.add(e,a),b8(t))})}function Oh(e,t,o,a=!1){let r=e.preventUnmountingOnClose;t?r=!1:a&&(r=!0);let n=o?.id??null,s=e.activeTriggerId,i=e.activeTriggerElement;return(n||t)&&(s=n,i=o??null),{open:t,preventUnmountingOnClose:r,activeTriggerId:s,activeTriggerElement:i,openedWithoutTrigger:t?o==null:e.openedWithoutTrigger}}function Hh(e){let t=!1;return e.preventUnmountOnClose=()=>{t=!0},()=>t}function w8(e,t,o,a={}){let r=o.reason,n=r===_.triggerHover,s=t&&r===_.triggerFocus,i=!t&&(r===_.triggerPress||r===_.escapeKey),l=Hh(o);if(e.context.onOpenChange?.(t,o),o.isCanceled)return;a.onBeforeDispatch?.(),e.state.floatingRootContext.dispatchOpenChange(t,o);let c=()=>{let u=Oh(e.state,t,o.trigger,l()),d={...a.extraState,...u};s?d.instantType="focus":i?d.instantType="dismiss":n&&(d.instantType=void 0),e.update(d)};n?Ta(c):c()}function Up(e,t,o,a){let r=o.useState("isMountedByTrigger",e),n=Dh(e,o),s=W(l=>{let c=o.select("open"),u=o.select("activeTriggerId");if(u===e){let d={activeTriggerElement:l,...c?a:null};o.update(d);return}if(u==null&&c&&!o.state.openedWithoutTrigger){let d={activeTriggerId:e??null,activeTriggerElement:l,...a};o.update(d)}}),i=W(l=>{n(l),l&&s(l)});return B(()=>(i(t.current),()=>i(null)),[i,t,o,e]),B(()=>{if(r){let l={activeTriggerElement:t.current,...a};o.update(l)}},[r,o,t,...Object.values(a)]),{registerTrigger:i,isMountedByThisTrigger:r}}function $p(e,t={}){let{closeOnActiveTriggerUnmount:o=!1}=t,a=Fh.useRef(null),r=e.useState("open"),n=e.useState("triggerCount"),s=e.useState("activeTriggerId"),i=e.useState("activeTriggerElement");B(()=>{if(!r){a.current=null,e.state.triggerCount!==0&&e.set("triggerCount",0),e.state.openedWithoutTrigger&&e.set("openedWithoutTrigger",!1);return}let l=e.context.triggerElements.size,c={};e.state.triggerCount!==l&&(c.triggerCount=l);let u=e.select("activeTriggerId"),d=null;if(u){let p=e.context.triggerElements.getById(u);if(p)a.current=u,p!==e.state.activeTriggerElement&&(c.activeTriggerElement=p);else{for(let[f,m]of e.context.triggerElements.entries())if(m===e.state.activeTriggerElement){c.activeTriggerId=f,c.activeTriggerElement=m,a.current=f;break}c.activeTriggerId===void 0&&(a.current===u?d=u:a.current=null)}}else a.current=null;if(!d&&!u&&!e.state.openedWithoutTrigger&&l===1){let p=e.context.triggerElements.entries().next();if(!p.done){let[f,m]=p.value;c.activeTriggerId=f,c.activeTriggerElement=m,a.current=f}}(c.triggerCount!==void 0||c.activeTriggerId!==void 0||c.activeTriggerElement!==void 0)&&e.update(c),d&&o&&queueMicrotask(()=>{if(e.select("open")&&e.select("activeTriggerId")===d&&!e.context.triggerElements.getById(d)){let p=fe(_.none);e.setOpen(!1,p),p.isCanceled||e.update({activeTriggerId:null,activeTriggerElement:null})}})},[r,e,n,s,i,o])}function Wp(e,t,o,a){let{mounted:r,transitionStatus:n,forceUnmount:s}=h8({open:e,ref:t.context.popupRef,preventUnmountOnClose:t.useState("preventUnmountingOnClose"),setPreventUnmountOnClose:i=>t.set("preventUnmountingOnClose",i),animateInitialOpen:a,onUnmount(){t.update({activeTriggerId:null,activeTriggerElement:null,mounted:!1,preventUnmountingOnClose:!1}),o?.(),t.context.onOpenChangeComplete?.(!1)}});return $e(()=>(t.set("mounted",r),null)),t.useSyncedValues({mounted:r,transitionStatus:n}),{forceUnmount:s,transitionStatus:n}}function qp(e,t){e.useSyncedValues(t),B(()=>()=>{e.update({activeTriggerProps:Le,inactiveTriggerProps:Le,popupProps:Le})},[e])}var Nn=class{idMap=new Map;add(t,o){this.idMap.set(t,o)}delete(t){this.idMap.delete(t)}hasElement(t){for(let o of this.idMap.values())if(o===t)return!0;return!1}hasMatchingElement(t){for(let o of this.idMap.values())if(t(o))return!0;return!1}getById(t){return this.idMap.get(t)}entries(){return this.idMap.entries()}elements(){return this.idMap.values()}get size(){return this.idMap.size}};import*as v8 from"react";import{useSyncExternalStore as Wl}from"react";import{useEffect as m3,useMemo as f3,useRef as g3,useSyncExternalStore as h3}from"react";var b3=Object.is;function x8(e,t,o,a,r){let n=g3(null),s=n.current;s===null&&(s={hasValue:!1,value:null},n.current=s);let i=s,[l,c]=f3(()=>{let d=!1,p,f,m=y=>{if(!d){d=!0,p=y;let w=a(y);if(r!==void 0&&i.hasValue){let C=i.value;if(r(C,w))return f=C,C}return f=w,w}let x=p,g=f;if(b3(x,y))return g;let b=a(y);return r!==void 0&&r(g,b)?g:(p=y,f=b,b)};return[()=>m(t()),o===void 0?void 0:()=>m(o())]},[t,o,a,r,i]),u=h3(e,l,c);return m3(()=>{i.hasValue=!0,i.value=u},[i,u]),u}var y3=qs(19),w3=y3?v3:I3;function _r(e,t,o,a,r){return w3(e,t,o,a,r)}function x3(e,t,o,a,r){let n=v8.useCallback(()=>t(e.getSnapshot(),o,a,r),[e,t,o,a,r]);return Wl(e.subscribe,n,n)}vv({before(e){e.syncIndex=0,e.didInitialize||(e.syncTick=1,e.syncHooks=[],e.didChangeStore=!0,e.getSnapshot=()=>{let t=!1;for(let o=0;o<e.syncHooks.length;o+=1){let a=e.syncHooks[o],r=a.selector(a.store.state,a.a1,a.a2,a.a3);Object.is(a.value,r)||(t=!0,a.value=r)}return t&&(e.syncTick+=1),e.syncTick})},after(e){e.syncHooks.length>0&&(e.didChangeStore&&(e.didChangeStore=!1,e.subscribe=t=>{let o=new Set;for(let r of e.syncHooks)o.add(r.store);let a=[];for(let r of o)a.push(r.subscribe(t));return()=>{for(let r of a)r()}}),Wl(e.subscribe,e.getSnapshot,e.getSnapshot))}});function v3(e,t,o,a,r){let n=xv();if(!n)return x3(e,t,o,a,r);let s=n.syncIndex;n.syncIndex+=1;let i;return n.didInitialize?(i=n.syncHooks[s],(i.store!==e||i.selector!==t||!Object.is(i.a1,o)||!Object.is(i.a2,a)||!Object.is(i.a3,r))&&(i.store!==e&&(n.didChangeStore=!0),i.store=e,i.selector=t,i.a1=o,i.a2=a,i.a3=r,i.value=t(e.getSnapshot(),o,a,r))):(i={store:e,selector:t,a1:o,a2:a,a3:r,value:t(e.getSnapshot(),o,a,r)},n.syncHooks.push(i)),i.value}function I3(e,t,o,a,r){return x8(e.subscribe,e.getSnapshot,e.getSnapshot,n=>t(n,o,a,r))}var jp=class{static create(t){return new this(t)}constructor(t){this.state=t,this.listeners=new Set,this.updateTick=0}subscribe=t=>(this.listeners.add(t),()=>{this.listeners.delete(t)});getSnapshot=()=>this.state;setState(t){if(this.state===t)return;this.state=t,this.updateTick+=1;let o=this.updateTick;for(let a of this.listeners){if(o!==this.updateTick)return;a(t)}}update(t){for(let o in t)if(!Object.is(this.state[o],t[o])){this.setState({...this.state,...t});return}}set(t,o){Object.is(this.state[t],o)||this.setState({...this.state,[t]:o})}notifyAll(){let t={...this.state};this.setState(t)}use(t,o,a,r){return _r(this,t,o,a,r)}};import*as ws from"react";var Ja=class extends jp{constructor(t,o={},a){super(t),this.context=o,this.selectors=a}useSyncedValue(t,o){ws.useDebugValue(t);let a=this;B(()=>{a.state[t]!==o&&a.set(t,o)},[a,t,o])}useSyncedValueWithCleanup(t,o){let a=this;B(()=>(a.state[t]!==o&&a.set(t,o),()=>{a.set(t,void 0)}),[a,t,o])}useSyncedValues(t){let o=this,a=Object.values(t);B(()=>{o.update(t)},[o,...a])}useControlledProp(t,o){ws.useDebugValue(t);let a=this,r=o!==void 0;B(()=>{r&&!Object.is(a.state[t],o)&&a.setState({...a.state,[t]:o})},[a,t,o,r])}select(t,o,a,r){let n=this.selectors[t];return n(this.state,o,a,r)}useState(t,o,a,r){return ws.useDebugValue(t),_r(this,this.selectors[t],o,a,r)}useContextCallback(t,o){ws.useDebugValue(t);let a=W(o??Be);this.context[t]=a}useStateSetter(t){let o=ws.useRef(void 0);return o.current===void 0&&(o.current=a=>{this.set(t,a)}),o.current}observe(t,o){let a;typeof t=="function"?a=t:a=this.selectors[t];let r=a(this.state);return o(r,r,this),this.subscribe(n=>{let s=a(n);if(!Object.is(r,s)){let i=r;r=s,o(s,i,this)}})}};var C3={open:e=>e.open,transitionStatus:e=>e.transitionStatus,domReferenceElement:e=>e.domReferenceElement,referenceElement:e=>e.positionReference??e.referenceElement,floatingElement:e=>e.floatingElement,floatingId:e=>e.floatingId},Kp=class extends Ja{constructor(t){let{syncOnly:o,nested:a,onOpenChange:r,triggerElements:n,...s}=t;super({...s,positionReference:s.referenceElement,domReferenceElement:s.referenceElement},{onOpenChange:r,dataRef:{current:{}},events:_p(),nested:a,triggerElements:n},C3),this.syncOnly=o}syncOpenEvent=(t,o)=>{(!t||!this.state.open||o!=null&&Mv(o))&&(this.context.dataRef.current.openEvent=t?o:void 0)};dispatchOpenChange=(t,o)=>{this.syncOpenEvent(t,o.event);let a={open:t,reason:o.reason,nativeEvent:o.event,nested:this.context.nested,triggerElement:o.trigger};this.context.events.emit("openchange",a)};setOpen=(t,o)=>{if(this.syncOnly){this.context.onOpenChange?.(t,o);return}this.dispatchOpenChange(t,o),this.context.onOpenChange?.(t,o)}};function Xp(e,t,o=!1){return{open:!1,openProp:void 0,mounted:!1,transitionStatus:void 0,floatingRootContext:new Kp({open:!1,transitionStatus:void 0,floatingElement:null,referenceElement:null,triggerElements:e,floatingId:t,syncOnly:!0,nested:o,onOpenChange:void 0}),floatingId:t,triggerCount:0,preventUnmountingOnClose:!1,payload:void 0,activeTriggerId:null,activeTriggerElement:null,openedWithoutTrigger:!1,triggerIdProp:void 0,popupElement:null,positionerElement:null,activeTriggerProps:Le,inactiveTriggerProps:Le,popupProps:Le}}var ql=e=>e.triggerIdProp??e.activeTriggerId,Yp=e=>e.openProp??e.open,I8=e=>(e.popupElement?.id??e.floatingId)||void 0;function C8(e,t){return t!==void 0&&Yp(e)&&ql(e)===t}function R3(e,t){return C8(e,t)?!0:t!==void 0&&Yp(e)&&ql(e)==null&&!e.openedWithoutTrigger&&e.triggerCount===1}var di={open:Yp,mounted:e=>e.mounted,transitionStatus:e=>Yp(e)&&!e.mounted?"starting":e.transitionStatus,floatingRootContext:e=>e.floatingRootContext,triggerCount:e=>e.triggerCount,preventUnmountingOnClose:e=>e.preventUnmountingOnClose,payload:e=>e.payload,activeTriggerId:ql,activeTriggerElement:e=>e.mounted?e.activeTriggerElement:null,popupId:I8,isTriggerActive:(e,t)=>t!==void 0&&ql(e)===t,isOpenedByTrigger:(e,t)=>C8(e,t),isMountedByTrigger:(e,t)=>t!==void 0&&ql(e)===t&&e.mounted,triggerProps:(e,t)=>t?e.activeTriggerProps:e.inactiveTriggerProps,triggerPopupId:(e,t)=>R3(e,t)?I8(e):void 0,popupProps:e=>e.popupProps,popupElement:e=>e.popupElement,positionerElement:e=>e.positionerElement};import*as Vh from"react";function Qp(e){let t=Vh.useCallback(a=>e===void 0?Be:e.subscribeStore(a),[e]),o=Vh.useCallback(()=>e===void 0?void 0:e.store,[e]);return Wl(t,o,()=>e?.serverStore)}import*as Zr from"react";var Bh=Je.os.mac&&Je.engine.webkit;function jl(e,t={}){let{enabled:o=!0,delay:a}=t,{events:r,dataRef:n}=e.context,s=Zr.useRef(!1),i=Zr.useRef(null),l=Zr.useRef(!0),c=it();Zr.useEffect(()=>{let d=e.select("domReferenceElement");if(!o)return;let p=Qe(d);function f(){let h=e.select("domReferenceElement");!e.select("open")&&Ae(h)&&h===gt(Se(h))&&(s.current=!0,i.current=h)}function m(){l.current=!0}function v(){l.current=!1}return aa(De(p,"blur",f),Bh&&De(p,"keydown",m,!0),Bh&&De(p,"pointerdown",v,!0))},[e,o]),Zr.useEffect(()=>{if(!o)return;function d(p){if(p.reason===_.triggerPress||p.reason===_.escapeKey){let f=e.select("domReferenceElement");Ge(f)&&(i.current=f,s.current=!0)}}return r.on("openchange",d),()=>{r.off("openchange",d)}},[r,o,e]);let u=Zr.useMemo(()=>{function d(){s.current=!1,i.current=null}return{onMouseLeave(){d()},onFocus(p){let f=p.currentTarget;if(s.current){if(i.current===f)return;d()}let m=Ue(p.nativeEvent);if(Ge(m)){if(Bh&&!p.relatedTarget){if(!l.current&&!dr(m))return}else if(!zv(m))return}let v=Mn(p.relatedTarget,e.context.triggerElements),{nativeEvent:h,currentTarget:y}=p;if(e.select("open")&&v||!a){e.setOpen(!0,fe(_.triggerFocus,h,y));return}c.start(a,()=>{s.current||e.setOpen(!0,fe(_.triggerFocus,h,y))})},onBlur(p){d();let f=p.relatedTarget,m=p.nativeEvent,v=Ge(f)&&f.hasAttribute(Br("focus-guard"))&&f.getAttribute("data-type")==="outside";c.start(0,()=>{let h=e.select("domReferenceElement"),y=gt(Se(h));!f&&y===h||de(n.current.floatingContext?.refs.floating.current,y)||de(h,y)||v||Mn(f??y,e.context.triggerElements)||e.setOpen(!1,fe(_.triggerFocus,m))})}}},[n,a,e,c]);return Zr.useMemo(()=>o?{reference:u,trigger:u}:{},[o,u])}import*as Zh from"react";var _h=class e{pointerType=void 0;interactedInside=!1;handler=void 0;blockMouseMove=!0;performedPointerEventsMutation=!1;pointerEventsScopeElement=null;pointerEventsReferenceElement=null;pointerEventsFloatingElement=null;restTimeoutPending=!1;openChangeTimeout=new Uo;restTimeout=new Uo;handleCloseOptions=void 0;static create(){return new e}dispose=()=>{this.openChangeTimeout.clear(),this.restTimeout.clear()};disposeEffect=()=>this.dispose},Jp=new WeakMap;function pi(e){if(!e.performedPointerEventsMutation)return;let t=e.pointerEventsScopeElement;t&&Jp.get(t)===e&&(e.pointerEventsScopeElement?.style.removeProperty("pointer-events"),e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"),e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"),Jp.delete(t)),e.performedPointerEventsMutation=!1,e.pointerEventsScopeElement=null,e.pointerEventsReferenceElement=null,e.pointerEventsFloatingElement=null}function em(e,t){let{scopeElement:o,referenceElement:a,floatingElement:r}=t,n=Jp.get(o);n&&n!==e&&pi(n),pi(e),e.performedPointerEventsMutation=!0,e.pointerEventsScopeElement=o,e.pointerEventsReferenceElement=a,e.pointerEventsFloatingElement=r,Jp.set(o,e),o.style.pointerEvents="none",a.style.pointerEvents="auto",r.style.pointerEvents="auto"}function mi(e){let t=e.context.dataRef.current,o=$e(()=>t.hoverInteractionState??_h.create()).current;return t.hoverInteractionState||(t.hoverInteractionState=o),ei(t.hoverInteractionState.disposeEffect),t.hoverInteractionState}function Kl(e,t={}){let{enabled:o=!0,closeDelay:a=0,nodeId:r}=t,n=e.useState("open"),s=e.useState("floatingElement"),i=e.useState("domReferenceElement"),{dataRef:l}=e.context,c=ra(),u=Na(),d=mi(e),p=it(),f=W(()=>Mp(l.current.openEvent?.type,d.interactedInside)),m=W(()=>Lv(l.current.openEvent?.type)),v=W(()=>{pi(d)});B(()=>{n||(d.pointerType=void 0,d.restTimeoutPending=!1,d.interactedInside=!1,v())},[n,d,v]),Zh.useEffect(()=>v,[v]),B(()=>{if(o&&n&&d.handleCloseOptions?.blockPointerEvents&&m()&&Ge(i)&&s){let h=i,y=s,x=Se(s),g=c?.nodesRef.current.find(R=>R.id===u)?.context?.elements.floating;g&&(g.style.pointerEvents="");let b=d.pointerEventsScopeElement!==y?d.pointerEventsScopeElement:null,w=g!==y?g:null,C=d.handleCloseOptions?.getScope?.()??b??w??en(h,"[data-rootownerid]")??x.body;return em(d,{scopeElement:C,referenceElement:h,floatingElement:y}),()=>{v()}}},[o,n,i,s,d,m,c,u,v]),Zh.useEffect(()=>{if(!o)return;function h(){return!!(c&&u&&Qa(c.nodesRef.current,u).length>0)}function y(R){let I=pr(a,"close",d.pointerType),S=()=>{e.setOpen(!1,fe(_.triggerHover,R)),c?.events.emit("floating.closed",R)};I?d.openChangeTimeout.start(I,S):(d.openChangeTimeout.clear(),S())}function x(R){let I=Ue(R);if(!mh(I)){d.interactedInside=!1;return}d.interactedInside=en(I,"[aria-haspopup]")!=null}function g(){d.openChangeTimeout.clear(),p.clear(),c?.events.off("floating.closed",w),v()}function b(R){if(h()&&c){c.events.on("floating.closed",w);return}if(Mn(R.relatedTarget,e.context.triggerElements))return;let I=l.current.floatingContext?.nodeId??r,S=R.relatedTarget;if(!(c&&I&&Ge(S)&&Qa(c.nodesRef.current,I,!1).some(T=>de(T.context?.elements.floating,S)))){if(d.handler){d.handler(R);return}v(),m()&&!f()&&y(R)}}function w(R){!c||!u||h()||p.start(0,()=>{c.events.off("floating.closed",w),e.setOpen(!1,fe(_.triggerHover,R)),c.events.emit("floating.closed",R)})}let C=s;return aa(C&&De(C,"mouseenter",g),C&&De(C,"mouseleave",b),C&&De(C,"pointerdown",x,!0),()=>{c?.events.off("floating.closed",w)})},[o,s,e,l,a,r,m,f,v,d,c,u,p])}import*as Fn from"react";var S3={current:null};function xs(e,t={}){let{enabled:o=!0,delay:a=0,handleClose:r=null,mouseOnly:n=!1,restMs:s=0,move:i=!0,triggerElementRef:l=S3,externalTree:c,isActiveTrigger:u=!0,getHandleCloseContext:d,isClosing:p,shouldOpen:f,guardStaleOpen:m=!1}=t,{dataRef:v,events:h}=e.context,y=ra(c),x=mi(e),g=Fn.useRef(!1),b=ft(r),w=ft(a),C=ft(s),R=ft(o),I=ft(f),S=ft(p),M=W(()=>Mp(v.current.openEvent?.type,x.interactedInside)),T=W(()=>I.current?.()!==!1),V=W((P,H,D)=>{let N=e.context.triggerElements;if(N.hasElement(H))return!P||!de(P,H);if(!Ge(D))return!1;let A=D;return N.hasMatchingElement(E=>de(E,A))&&(!P||!de(P,A))}),F=W(()=>{if(!x.handler)return;Se(e.select("domReferenceElement")).removeEventListener("mousemove",x.handler),x.handler=void 0}),L=W(()=>{pi(x)});return u&&(x.handleCloseOptions=r?.__options),Fn.useEffect(()=>F,[F]),Fn.useEffect(()=>{if(!o)return;function P(H){H.open?g.current=!1:(g.current=H.reason===_.triggerHover,F(),x.openChangeTimeout.clear(),x.restTimeout.clear(),x.blockMouseMove=!0,x.restTimeoutPending=!1)}return h.on("openchange",P),()=>{h.off("openchange",P)}},[o,h,x,F]),Fn.useEffect(()=>{if(!o)return;function P(G,z=!0){let oe=pr(w.current,"close",x.pointerType);oe?x.openChangeTimeout.start(oe,()=>{e.setOpen(!1,fe(_.triggerHover,G)),y?.events.emit("floating.closed",G)}):z&&(x.openChangeTimeout.clear(),e.setOpen(!1,fe(_.triggerHover,G)),y?.events.emit("floating.closed",G))}let H=l.current??(u?e.select("domReferenceElement"):null);if(!Ge(H))return;function D(G){if(x.openChangeTimeout.clear(),x.blockMouseMove=!1,n&&!za(x.pointerType))return;let z=fh(C.current),oe=pr(w.current,"open",x.pointerType),X=Ue(G),Z=G.currentTarget??null,U=e.select("domReferenceElement"),ae=Z;if(Ge(X)&&!e.context.triggerElements.hasElement(X)){for(let ne of e.context.triggerElements.elements())if(de(ne,X)){ae=ne;break}}Ge(Z)&&Ge(U)&&!e.context.triggerElements.hasElement(Z)&&de(Z,U)&&(ae=U);let we=ae==null?!1:V(U,ae,X),j=e.select("open"),Y=S.current?.()??e.select("transitionStatus")==="ending",q=!j&&Y&&g.current,re=!we&&Ge(ae)&&Ge(U)&&de(U,ae)&&q,ge=z>0&&!oe,ee=we&&(j||q)||re,Me=!j||we;if(ee){T()&&e.setOpen(!0,fe(_.triggerHover,G,ae));return}ge||(oe?x.openChangeTimeout.start(oe,()=>{Me&&T()&&e.setOpen(!0,fe(_.triggerHover,G,ae))}):Me&&T()&&e.setOpen(!0,fe(_.triggerHover,G,ae)))}function N(G){if(M()){L();return}F();let z=e.select("domReferenceElement"),oe=Se(z);x.restTimeout.clear(),x.restTimeoutPending=!1;let X=v.current.floatingContext??d?.();if(Mn(G.relatedTarget,e.context.triggerElements))return;if(b.current&&X){e.select("open")||x.openChangeTimeout.clear();let U=l.current;x.handler=b.current({...X,tree:y,x:G.clientX,y:G.clientY,onClose(){L(),F(),R.current&&!M()&&U===e.select("domReferenceElement")&&P(G,!0)}}),oe.addEventListener("mousemove",x.handler),x.handler(G);return}(x.pointerType==="touch"?!de(e.select("floatingElement"),G.relatedTarget):!0)&&P(G)}function A(G){de(H,G.relatedTarget)||(x.openChangeTimeout.clear(),x.restTimeout.clear(),x.restTimeoutPending=!1)}let E=m?De(H,"mouseout",A):void 0;return i?aa(De(H,"mousemove",D,{once:!0}),De(H,"mouseenter",D),De(H,"mouseleave",N),E):aa(De(H,"mouseenter",D),De(H,"mouseleave",N),E)},[F,L,v,w,e,o,b,x,u,V,M,n,i,C,l,y,R,d,S,T,m]),Fn.useMemo(()=>{if(!o)return;function P(H){x.pointerType=H.pointerType}return{onPointerDown:P,onPointerEnter:P,onMouseMove(H){let{nativeEvent:D}=H,N=H.currentTarget,A=e.select("domReferenceElement"),E=e.select("open"),G=V(A,N,H.target);if(n&&!za(x.pointerType))return;if(E&&G&&x.handleCloseOptions?.blockPointerEvents){let X=e.select("floatingElement");if(X){let Z=x.handleCloseOptions?.getScope?.()??N.ownerDocument.body;em(x,{scopeElement:Z,referenceElement:N,floatingElement:X})}}let z=fh(C.current);if(E&&!G||z===0||!G&&x.restTimeoutPending&&H.movementX**2+H.movementY**2<2)return;x.restTimeout.clear();function oe(){if(x.restTimeoutPending=!1,M())return;let X=e.select("open");!x.blockMouseMove&&(!X||G)&&T()&&e.setOpen(!0,fe(_.triggerHover,D,N))}x.pointerType==="touch"?Ta(()=>{oe()}):G&&E?oe():(x.restTimeoutPending=!0,x.restTimeout.start(z,oe))}}},[o,x,M,V,n,e,C,T])}import*as Ko from"react";function R8(e){return Je.engine.webkit&&e.movementX===0&&e.movementY===0}function tm(e,t,o){switch(e){case"vertical":return t;case"horizontal":return o;default:return t||o}}function er(e,t){return tm(t,e===uh||e===Ip,e===Ml||e===El)}function Yl(e,t,o){return tm(t,e===Ip,o?e===Ml:e===El)||e==="Enter"||e===" "||e===""}function Xl(e,t,o){return tm(t,o?e===Ml:e===El,e===Ip)}function Dn(e,t,o,a){let r=o?e===El:e===Ml,n=e===uh;return t==="both"||t==="horizontal"&&a?e==="Escape":tm(t,r,n)}function Gh(e,t){let{listRef:o,activeIndex:a,onNavigate:r=()=>{},enabled:n=!0,selectedIndex:s=null,allowEscape:i=!1,loopFocus:l=!1,nested:c=!1,rtl:u=!1,virtual:d=!1,focusItemOnOpen:p="auto",focusItemOnHover:f=!0,openOnArrowKeyDown:m=!0,disabledIndices:v=void 0,orientation:h="vertical",triggerOrientation:y=h,parentOrientation:x,id:g,resetOnPointerLeave:b=!0,externalTree:w,nestedReturnFocusRef:C,grid:R}=t,I=R!=null,S=e.useState("open"),M=e.useState("floatingElement"),T=e.useState("domReferenceElement"),V=e.context.dataRef,F=zl(M),L=Al(T),P=ft(F),H=Na(),D=ra(w),N=Ko.useRef(p),A=Ko.useRef(s??-1),E=Ko.useRef(null),G=Ko.useRef(!0),z=W($=>{r(A.current===-1?null:A.current,$)}),oe=Ko.useRef(!!M),X=Ko.useRef(S),Z=Ko.useRef(!1),U=Ko.useRef(!1),ae=Ko.useRef(null),we=ft(v),j=ft(S),Y=ft(s),q=ft(b),re=Aa(),ge=Aa(),ee=W(()=>{re.cancel();function $(be){d||(ae.current=ci(be,{sync:Z.current,preventScroll:!0}))}let Q=o.current[A.current],Ee=U.current;Q&&$(Q),(Z.current?be=>be():be=>re.request(be))(()=>{let be=o.current[A.current]||Q;if(!be)return;Q||$(be),he&&(Ee||!G.current)&&be.scrollIntoView?.({block:"nearest",inline:"nearest"})})});B(()=>{V.current.orientation=h},[V,h]),B(()=>{S||(E.current=null),(!S||p!=="auto")&&(N.current=p)},[S,p]),B(()=>{n&&(S&&M?(A.current=s??-1,N.current&&s!=null&&(U.current=!0,z())):oe.current&&(A.current=-1,z()))},[n,S,M,s,z]),B(()=>{if(n){if(!S){Z.current=!1;return}if(M)if(a==null){if(Z.current=!1,Y.current!=null)return;if(oe.current&&(A.current=-1,ee()),(!X.current||!oe.current)&&N.current&&(E.current!=null||N.current===!0&&E.current==null)){let $=0,Q=()=>{o.current[0]==null?($<2&&($?ue=>ge.request(ue):queueMicrotask)(Q),$+=1):(A.current=E.current==null||Yl(E.current,y,u)||c?fr(o):Vr(o),E.current=null,z())};Q()}}else on(o.current,a)||(A.current=a,ee(),U.current=!1)}},[n,S,M,a,Y,c,o,y,u,z,ee,ge]),B(()=>{if(!n||M||!D||d||!oe.current)return;let $=D.nodesRef.current,Q=$.find(be=>be.id===H)?.context?.elements.floating,Ee=gt(Se(T??Q??null)),ue=$.some(be=>be.context&&de(be.context.elements.floating,Ee));Q&&!ue&&G.current&&Q.focus({preventScroll:!0})},[n,M,T,D,H,d]),B(()=>{X.current=S,oe.current=!!M});let Me=a!=null,ne=W($=>{if(!j.current)return;let Q=o.current.indexOf($.currentTarget);Q!==-1&&(A.current!==Q||a!==Q)&&(A.current=Q,z($))}),J=W(()=>x??D?.nodesRef.current.find($=>$.id===H)?.context?.dataRef?.current.orientation),ce=W(()=>fr(o,we.current)),ie=W($=>{if(G.current=!1,Z.current=!0,$.which===229||!j.current&&$.currentTarget===P.current)return;if(c&&Dn($.key,h,u,I)){er($.key,J())||Ft($),e.setOpen(!1,fe(_.listNavigation,$.nativeEvent));let be=C?.current??T;Ae(be)&&be.focus();return}a!=null&&a!==A.current&&!on(o.current,a)&&(A.current=a);let Q=A.current,Ee=fr(o,v),ue=Vr(o,v);if(L||($.key==="Home"&&(Ft($),A.current=Ee,z($)),$.key==="End"&&(Ft($),A.current=ue,z($))),R!=null){let be=R($,A.current,o,h,l,u,v,Ee,ue);if(be!=null&&be!==A.current&&(A.current=be,z($)),h==="both")return}if(er($.key,h)){Ft($);let be=gt($.currentTarget.ownerDocument);if(S&&!d&&de($.currentTarget,be)&&!o.current.some(ut=>ut!=null&&de(ut,be))){A.current=Yl($.key,h,u)?Ee:ue,z($),a===A.current&&ee();return}let{index:bt,wrapped:ct}=Np(o.current,Q,{decrement:!Yl($.key,h,u),loopFocus:l,allowEscape:i,disabledIndices:v,minIndex:Ee,maxIndex:ue});ct&&(Z.current=!1),A.current=bt,z($)}}),he=Ko.useMemo(()=>({onFocus(Q){Z.current=!0,ne(Q)},onClick({currentTarget:Q}){d||Q.focus({preventScroll:!0})},onMouseMove(Q){R8(Q)||(Z.current=!0,U.current=!1,f&&ne(Q))},onPointerLeave(Q){if(!j.current||!G.current||Q.pointerType==="touch")return;Z.current=!0;let Ee=Q.relatedTarget;if(!(!f||o.current.includes(Ee))&&q.current&&(ae.current?.(),ae.current=null,A.current=-1,z(Q),!d)){let ue=P.current,be=gt(Se(ue));ue&&de(ue,be)&&ue.focus({preventScroll:!0})}}}),[ne,j,P,f,o,z,q,d]),le=Ko.useMemo(()=>d&&S&&Me&&{"aria-activedescendant":`${g}-${a}`},[d,S,Me,g,a]),We=Ko.useMemo(()=>({...L?{}:le,onKeyDown($){if($.key==="Tab"&&$.shiftKey&&S&&!d){let Q=Ue($.nativeEvent);if(Q&&!de(P.current,Q))return;Ft($);let Ee=fe(_.focusOut,$.nativeEvent);e.setOpen(!1,Ee);let ue=C?.current??T;!Ee.isCanceled&&Ae(ue)&&ue.focus();return}ie($)},onPointerMove($){R8($)||(G.current=!0)}}),[le,ie,P,L,e,S,d,T,C]),Oe=Ko.useMemo(()=>{function $(ue){e.setOpen(!0,fe(_.listNavigation,ue.nativeEvent,ue.currentTarget))}function Q(ue){p==="auto"&&kn(ue.nativeEvent)&&(N.current=!d)}function Ee(ue){N.current=p,p==="auto"&&Dr(ue.nativeEvent)&&(N.current=!0)}return{onKeyDown(ue){let be=e.select("open");G.current=!1;let bt=ue.key.startsWith("Arrow"),ct=Xl(ue.key,J(),u),ut=er(ue.key,be?h:y),ot=(c?ct:ut)||ue.key==="Enter"||ue.key.trim()==="";if(d&&be&&(!c||dr(ue.currentTarget)))return ie(ue);if(!(!be&&!m&&bt)){if(ot){let yt=er(ue.key,J());E.current=c&&yt?null:ue.key}if(c){ct&&(Ft(ue),be?(A.current=ce(),z(ue),d&&P.current?.focus()):$(ue));return}ut&&(Y.current!=null&&(A.current=Y.current),Ft(ue),!be&&m?$(ue):ie(ue),be&&z(ue))}},onFocus(ue){ue.target===ue.currentTarget&&e.select("open")&&!d&&(A.current=-1,z(ue))},onPointerDown:Ee,onPointerEnter:Ee,onMouseDown:Q,onClick:Q}},[ie,p,ce,c,z,e,m,h,y,J,u,Y,d,P]),xe=Ko.useMemo(()=>({...le,...Oe}),[le,Oe]);return Ko.useMemo(()=>n?{reference:xe,floating:We,item:he,trigger:Oe}:{},[n,xe,We,Oe,he])}import*as vs from"react";function Uh(e,t){let{listRef:o,elementsRef:a,activeIndex:r,onMatch:n,disabledIndices:s,onTyping:i,enabled:l=!0,resetMs:c=750,selectedIndex:u=null}=t,d=W(i),p=e.useState("open"),f=it(),m=vs.useRef(""),v=vs.useRef(u??r??-1),h=vs.useRef(null),y=W(b=>{function w(L){return a?.current[L]}function C(L){let P=w(L);return P&&!ys(P)||P?.matches(":disabled")?!1:s==null||!an(Nt,L,s)}function R(L,P,H=0){if(L.length===0)return-1;let D=(H%L.length+L.length)%L.length,N=P.toLowerCase();for(let A=0;A<L.length;A+=1){let E=(D+A)%L.length;if(!(!L[E]?.toLowerCase().startsWith(N)||!C(E)))return E}return-1}let I=o.current;if(m.current.length>0&&b.key===" "&&(Ft(b),d?.(!0)),m.current.length>0&&m.current[0]!==" "&&R(I,m.current)===-1&&b.key!==" "&&d?.(!1),I==null||b.key.length!==1||b.ctrlKey||b.metaKey||b.altKey)return;p&&b.key!==" "&&(Ft(b),d?.(!0));let S=m.current==="";S&&(v.current=u??r??-1),I.every((L,P)=>L&&C(P)?L[0]?.toLowerCase()!==L[1]?.toLowerCase():!0)&&m.current===b.key&&(m.current="",v.current=h.current),m.current+=b.key,f.start(c,()=>{m.current="",v.current=h.current,d?.(!1)});let V=((S?u??r??-1:v.current)??0)+1,F=R(I,m.current,V);F!==-1?(n?.(F,b),h.current=F):b.key!==" "&&(m.current="",d?.(!1))}),x=W(b=>{let w=b.relatedTarget,C=e.select("domReferenceElement"),R=e.select("floatingElement");de(C,w)||de(R,w)||(f.clear(),m.current="",v.current=h.current,d?.(!1))});B(()=>{!p&&u!==null||(f.clear(),h.current=null,m.current!==""&&(m.current="",d?.(!1)))},[p,u,f,d]);let g=vs.useMemo(()=>({onKeyDown:y,onBlur:x}),[y,x]);return vs.useMemo(()=>l?{reference:g,floating:g}:{},[l,g])}var S8=.1,k3=S8*S8,xt=.5;function om(e,t,o,a,r,n){return a>=t!=n>=t&&e<=(r-o)*(t-a)/(n-a)+o}function am(e,t,o,a,r,n,s,i,l,c){let u=!1;return om(e,t,o,a,r,n)&&(u=!u),om(e,t,r,n,s,i)&&(u=!u),om(e,t,s,i,l,c)&&(u=!u),om(e,t,l,c,o,a)&&(u=!u),u}function M3(e,t,o){return e>=o.x&&e<=o.x+o.width&&t>=o.y&&t<=o.y+o.height}function rm(e,t,o,a,r,n){let s=Math.min(o,r),i=Math.max(o,r),l=Math.min(a,n),c=Math.max(a,n);return e>=s&&e<=i&&t>=l&&t<=c}function Is(e={}){let{blockPointerEvents:t=!1}=e,o=new Uo,a=({x:r,y:n,placement:s,elements:i,onClose:l,nodeId:c,tree:u})=>{let d=s?.split("-")[0],p=!1,f=null,m=null,v=typeof performance<"u"?performance.now():0;function h(x,g){let b=performance.now(),w=b-v;if(f===null||m===null||w===0)return f=x,m=g,v=b,!1;let C=x-f,R=g-m,I=C*C+R*R,S=w*w*k3;return f=x,m=g,v=b,I<S}function y(){o.clear(),l()}return function(g){o.clear();let b=i.domReference,w=i.floating;if(!b||!w||d==null||r==null||n==null)return;let{clientX:C,clientY:R}=g,I=Ue(g),S=g.type==="mouseleave",M=de(w,I),T=de(b,I);if(M&&(p=!0,!S))return;if(T&&(p=!1,!S)){p=!0;return}if(S&&Ge(g.relatedTarget)&&de(w,g.relatedTarget))return;function V(){return!!(u&&Qa(u.nodesRef.current,c).length>0)}function F(){V()||y()}if(V())return;let L=b.getBoundingClientRect(),P=w.getBoundingClientRect(),H=r>P.right-P.width/2,D=n>P.bottom-P.height/2,N=P.width>L.width,A=P.height>L.height,E=(N?L:P).left,G=(N?L:P).right,z=(A?L:P).top,oe=(A?L:P).bottom;if(d==="top"&&n>=L.bottom-1||d==="bottom"&&n<=L.top+1||d==="left"&&r>=L.right-1||d==="right"&&r<=L.left+1){F();return}let X=!1;switch(d){case"top":X=rm(C,R,E,L.top+1,G,P.bottom-1);break;case"bottom":X=rm(C,R,E,P.top+1,G,L.bottom-1);break;case"left":X=rm(C,R,P.right-1,oe,L.left+1,z);break;case"right":X=rm(C,R,L.right-1,oe,P.left+1,z);break;default:}if(X)return;if(p&&!M3(C,R,L)){F();return}if(!S&&h(C,R)){F();return}let Z=!1;switch(d){case"top":{let U=N?xt/2:xt*4,ae=N||H?r+U:r-U,we=N?r-U:H?r+U:r-U,j=n+xt+1,Y=H||N?P.bottom-xt:P.top,q=H?N?P.bottom-xt:P.top:P.bottom-xt;Z=am(C,R,ae,j,we,j,P.left,Y,P.right,q);break}case"bottom":{let U=N?xt/2:xt*4,ae=N||H?r+U:r-U,we=N?r-U:H?r+U:r-U,j=n-xt,Y=H||N?P.top+xt:P.bottom,q=H?N?P.top+xt:P.bottom:P.top+xt;Z=am(C,R,ae,j,we,j,P.left,Y,P.right,q);break}case"left":{let U=A?xt/2:xt*4,ae=A||D?n+U:n-U,we=A?n-U:D?n+U:n-U,j=r+xt+1,Y=D||A?P.right-xt:P.left,q=D?A?P.right-xt:P.left:P.right-xt;Z=am(C,R,Y,P.top,q,P.bottom,j,ae,j,we);break}case"right":{let U=A?xt/2:xt*4,ae=A||D?n+U:n-U,we=A?n-U:D?n+U:n-U,j=r-xt,Y=D||A?P.left+xt:P.right,q=D?A?P.left+xt:P.right:P.left+xt;Z=am(C,R,j,ae,j,we,Y,P.top,q,P.bottom);break}default:}Z?p||o.start(40,F):F()}};return a.__options={...e,blockPointerEvents:t},a}function k8(e,t,o){let{reference:a,floating:r}=e,n=va(t),s=Dl(t),i=Fl(s),l=qo(t),c=n==="y",u=a.x+a.width/2-r.width/2,d=a.y+a.height/2-r.height/2,p=a[i]/2-r[i]/2,f;switch(l){case"top":f={x:u,y:a.y-r.height};break;case"bottom":f={x:u,y:a.y+a.height};break;case"right":f={x:a.x+a.width,y:d};break;case"left":f={x:a.x-r.width,y:d};break;default:f={x:a.x,y:a.y}}let m=La(t);return m&&(f[s]+=p*(m==="end"?1:-1)*(o&&c?-1:1)),f}async function M8(e,t){var o;t===void 0&&(t={});let{x:a,y:r,platform:n,rects:s,elements:i,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:p=!1,padding:f=0}=Hr(t,e),m=Lp(f),h=i[p?d==="floating"?"reference":"floating":d],y=bs(await n.getClippingRect({element:(o=await(n.isElement==null?void 0:n.isElement(h)))==null||o?h:h.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(i.floating)),boundary:c,rootBoundary:u,strategy:l})),x=d==="floating"?{x:a,y:r,width:s.floating.width,height:s.floating.height}:s.reference,g=await(n.getOffsetParent==null?void 0:n.getOffsetParent(i.floating)),b=await(n.isElement==null?void 0:n.isElement(g))&&await(n.getScale==null?void 0:n.getScale(g))||{x:1,y:1},w=bs(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:i,rect:x,offsetParent:g,strategy:l}):x);return{top:(y.top-w.top+m.top)/b.y,bottom:(w.bottom-y.bottom+m.bottom)/b.y,left:(y.left-w.left+m.left)/b.x,right:(w.right-y.right+m.right)/b.x}}var E3=50,E8=async(e,t,o)=>{let{placement:a="bottom",strategy:r="absolute",middleware:n=[],platform:s}=o,i=s.detectOverflow?s:{...s,detectOverflow:M8},l=await(s.isRTL==null?void 0:s.isRTL(t)),c=await s.getElementRects({reference:e,floating:t,strategy:r}),{x:u,y:d}=k8(c,a,l),p=a,f=0,m={};for(let v=0;v<n.length;v++){let h=n[v];if(!h)continue;let{name:y,fn:x}=h,{x:g,y:b,data:w,reset:C}=await x({x:u,y:d,initialPlacement:a,placement:p,strategy:r,middlewareData:m,rects:c,platform:i,elements:{reference:e,floating:t}});u=g??u,d=b??d,m[y]={...m[y],...w},C&&f<E3&&(f++,typeof C=="object"&&(C.placement&&(p=C.placement),C.rects&&(c=C.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:r}):C.rects),{x:u,y:d}=k8(c,p,l)),v=-1)}return{x:u,y:d,placement:p,strategy:r,middlewareData:m}};var P8=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var o,a;let{placement:r,middlewareData:n,rects:s,initialPlacement:i,platform:l,elements:c}=t,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:v=!0,...h}=Hr(e,t);if((o=n.arrow)!=null&&o.alignmentOffset)return{};let y=qo(r),x=va(i),g=qo(i)===i,b=await(l.isRTL==null?void 0:l.isRTL(c.floating)),w=p||(g||!v?[Ll(i)]:Bv(i)),C=m!=="none";!p&&C&&w.push(..._v(i,v,m,b));let R=[i,...w],I=await l.detectOverflow(t,h),S=[],M=((a=n.flip)==null?void 0:a.overflows)||[];if(u&&S.push(I[y]),d){let L=Vv(r,s,b);S.push(I[L[0]],I[L[1]])}if(M=[...M,{placement:r,overflows:S}],!S.every(L=>L<=0)){var T,V;let L=(((T=n.flip)==null?void 0:T.index)||0)+1,P=R[L];if(P&&(!(d==="alignment"?x!==va(P):!1)||M.every(N=>va(N.placement)===x?N.overflows[0]>0:!0)))return{data:{index:L,overflows:M},reset:{placement:P}};let H=(V=M.filter(D=>D.overflows[0]<=0).sort((D,N)=>D.overflows[1]-N.overflows[1])[0])==null?void 0:V.placement;if(!H)switch(f){case"bestFit":{var F;let D=(F=M.filter(N=>{if(C){let A=va(N.placement);return A===x||A==="y"}return!0}).map(N=>[N.placement,N.overflows.filter(A=>A>0).reduce((A,E)=>A+E,0)]).sort((N,A)=>N[1]-A[1])[0])==null?void 0:F[0];D&&(H=D);break}case"initialPlacement":H=i;break}if(r!==H)return{reset:{placement:H}}}return{}}}};var T8=new Set(["left","top"]);async function P3(e,t){let{placement:o,platform:a,elements:r}=e,n=await(a.isRTL==null?void 0:a.isRTL(r.floating)),s=qo(o),i=La(o),l=va(o)==="y",c=T8.has(s)?-1:1,u=n&&l?-1:1,d=Hr(t,e),{mainAxis:p,crossAxis:f,alignmentAxis:m}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return i&&typeof m=="number"&&(f=i==="end"?m*-1:m),l?{x:f*u,y:p*c}:{x:p*c,y:f*u}}var A8=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var o,a;let{x:r,y:n,placement:s,middlewareData:i}=t,l=await P3(t,e);return s===((o=i.offset)==null?void 0:o.placement)&&(a=i.arrow)!=null&&a.alignmentOffset?{}:{x:r+l.x,y:n+l.y,data:{...l,placement:s}}}}},z8=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:o,y:a,placement:r,platform:n}=t,{mainAxis:s=!0,crossAxis:i=!1,limiter:l={fn:x=>{let{x:g,y:b}=x;return{x:g,y:b}}},...c}=Hr(e,t),u={x:o,y:a},d=await n.detectOverflow(t,c),p=va(r),f=zp(p),m=u[f],v=u[p],h=(x,g)=>Ap(g+d[x==="y"?"top":"left"],g,g-d[x==="y"?"bottom":"right"]);s&&(m=h(f,m)),i&&(v=h(p,v));let y=l.fn({...t,[f]:m,[p]:v});return{...y,data:{x:y.x-o,y:y.y-a,enabled:{[f]:s,[p]:i}}}}}},L8=function(e){return e===void 0&&(e={}),{options:e,fn(t){var o,a;let{x:r,y:n,placement:s,rects:i,middlewareData:l}=t,{offset:c=0,mainAxis:u=!0,crossAxis:d=!0}=Hr(e,t),p={x:r,y:n},f=va(s),m=zp(f),v=p[m],h=p[f],y=Hr(c,t),x=typeof y=="number"?{mainAxis:y,crossAxis:0}:{mainAxis:(o=y.mainAxis)!=null?o:0,crossAxis:(a=y.crossAxis)!=null?a:0};if(u){let w=m==="y"?"height":"width",C=i.reference[m]-i.floating[w]+x.mainAxis,R=i.reference[m]+i.reference[w]-x.mainAxis;v<C?v=C:v>R&&(v=R)}if(d){var g,b;let w=m==="y"?"width":"height",C=T8.has(qo(s)),R=i.reference[f]-i.floating[w]+(C&&((g=l.offset)==null?void 0:g[f])||0)+(C?0:x.crossAxis),I=i.reference[f]+i.reference[w]+(C?0:((b=l.offset)==null?void 0:b[f])||0)-(C?x.crossAxis:0);h<R?h=R:h>I&&(h=I)}return{[m]:v,[f]:h}}}},N8=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){let{placement:o,rects:a,platform:r,elements:n}=t,{apply:s=()=>{},...i}=Hr(e,t),l=await r.detectOverflow(t,i),c=qo(o),u=La(o),d=va(o)==="y",{width:p,height:f}=a.floating,m,v;c==="top"||c==="bottom"?(m=c,v=u===(await(r.isRTL==null?void 0:r.isRTL(n.floating))?"start":"end")?"left":"right"):(v=c,m=u==="end"?"top":"bottom");let h=f-l.top-l.bottom,y=p-l.left-l.right,x=En(f-l[m],h),g=En(p-l[v],y),b=t.middlewareData.shift,w=!b,C=x,R=g;b!=null&&b.enabled.x&&(R=y),b!=null&&b.enabled.y&&(C=h),w&&!u&&(d?R=p-2*mr(l.left,l.right):C=f-2*mr(l.top,l.bottom)),await s({...t,availableWidth:R,availableHeight:C});let I=await r.getDimensions(n.floating);return p!==I.width||f!==I.height?{reset:{rects:!0}}:{}}}};function O8(e){let t=zo(e),o=parseFloat(t.width)||0,a=parseFloat(t.height)||0,r=Ae(e),n=r?e.offsetWidth:o,s=r?e.offsetHeight:a,i=Pn(o)!==n||Pn(a)!==s;return i&&(o=n,a=s),{width:o,height:a,$:i}}function Wh(e){return Ge(e)?e:e.contextElement}function fi(e){let t=Wh(e);if(!Ae(t))return Or(1);let o=t.getBoundingClientRect(),{width:a,height:r,$:n}=O8(t),s=(n?Pn(o.width):o.width)/a,i=(n?Pn(o.height):o.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!i||!Number.isFinite(i))&&(i=1),{x:s,y:i}}var T3=Or(0);function H8(e){let t=Qe(e);return!Vd()||!t.visualViewport?T3:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function A3(e,t,o){return t===void 0&&(t=!1),!!o&&t&&o===Qe(e)}function Cs(e,t,o,a){t===void 0&&(t=!1),o===void 0&&(o=!1);let r=e.getBoundingClientRect(),n=Wh(e),s=Or(1);t&&(a?Ge(a)&&(s=fi(a)):s=fi(e));let i=A3(n,o,a)?H8(n):Or(0),l=(r.left+i.x)/s.x,c=(r.top+i.y)/s.y,u=r.width/s.x,d=r.height/s.y;if(n&&a){let p=Qe(n),f=Ge(a)?Qe(a):a,m=p,v=Bd(m);for(;v&&f!==m;){let h=fi(v),y=v.getBoundingClientRect(),x=zo(v),g=y.left+(v.clientLeft+parseFloat(x.paddingLeft))*h.x,b=y.top+(v.clientTop+parseFloat(x.paddingTop))*h.y;l*=h.x,c*=h.y,u*=h.x,d*=h.y,l+=g,c+=b,m=Qe(v),v=Bd(m)}}return bs({width:u,height:d,x:l,y:c})}function nm(e,t){let o=ul(e).scrollLeft;return t?t.left+o:Cs(zr(e)).left+o}function V8(e,t){let o=e.getBoundingClientRect(),a=o.left+t.scrollLeft-nm(e,o),r=o.top+t.scrollTop;return{x:a,y:r}}function z3(e){let{elements:t,rect:o,offsetParent:a,strategy:r}=e,n=r==="fixed",s=zr(a),i=t?cl(t.floating):!1;if(a===s||i&&n)return o;let l={scrollLeft:0,scrollTop:0},c=Or(1),u=Or(0),d=Ae(a);if((d||!n)&&((Ro(a)!=="body"||is(s))&&(l=ul(a)),d)){let f=Cs(a);c=fi(a),u.x=f.x+a.clientLeft,u.y=f.y+a.clientTop}let p=s&&!d&&!n?V8(s,l):Or(0);return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-l.scrollLeft*c.x+u.x+p.x,y:o.y*c.y-l.scrollTop*c.y+u.y+p.y}}function L3(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function N3(e){let t=ul(e),o=e.ownerDocument.body,a=mr(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=mr(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight),n=-t.scrollLeft+nm(e),s=-t.scrollTop;return zo(o).direction==="rtl"&&(n+=mr(e.clientWidth,o.clientWidth)-a),{width:a,height:r,x:n,y:s}}var F3=25;function D3(e,t,o){o===void 0&&(o="viewport");let a=o==="layoutViewport",r=Qe(e),n=zr(e),s=r.visualViewport,i=n.clientWidth,l=n.clientHeight,c=0,u=0;if(s){let p=!Vd()||t==="fixed";a?p||(c=-s.offsetLeft,u=-s.offsetTop):(i=s.width,l=s.height,p&&(c=s.offsetLeft,u=s.offsetTop))}if(nm(n)<=0){let p=n.ownerDocument,f=p.body,m=getComputedStyle(f),v=p.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,h=Math.abs(n.clientWidth-f.clientWidth-v),y=getComputedStyle(n).scrollbarGutter==="stable both-edges"?h/2:h;y<=F3&&(i-=y)}return{width:i,height:l,x:c,y:u}}function O3(e,t){let o=Cs(e,!0,t==="fixed"),a=o.top+e.clientTop,r=o.left+e.clientLeft,n=fi(e),s=e.clientWidth*n.x,i=e.clientHeight*n.y,l=r*n.x,c=a*n.y;return{width:s,height:i,x:l,y:c}}function F8(e,t,o){let a;if(t==="viewport"||t==="layoutViewport")a=D3(e,o,t);else if(t==="document")a=N3(zr(e));else if(Ge(t))a=O3(t,o);else{let r=H8(e);a={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return bs(a)}function H3(e,t){let o=t.get(e);if(o)return o;let a=Rn(e,[],!1).filter(i=>Ge(i)&&Ro(i)!=="body"),r=null,n=zo(e).position==="fixed",s=n?$a(e):e;for(;Ge(s)&&!Wa(s);){let i=zo(s),l=Hd(s),c=r?r.position:n?"fixed":"";!l&&(c==="fixed"||c==="absolute"&&i.position==="static")?a=a.filter(d=>d!==s):r=i,s=$a(s)}return t.set(e,a),a}function V3(e){let{element:t,boundary:o,rootBoundary:a,strategy:r}=e,s=[...o==="clippingAncestors"?cl(t)?[]:H3(t,this._c):[].concat(o),a],i=F8(t,s[0],r),l=i.top,c=i.right,u=i.bottom,d=i.left;for(let p=1;p<s.length;p++){let f=F8(t,s[p],r);l=mr(f.top,l),c=En(f.right,c),u=En(f.bottom,u),d=mr(f.left,d)}return{width:c-d,height:u-l,x:d,y:l}}function B3(e){let{width:t,height:o}=O8(e);return{width:t,height:o}}function _3(e,t,o){let a=Ae(t),r=zr(t),n=o==="fixed",s=Cs(e,!0,n,t),i={scrollLeft:0,scrollTop:0},l=Or(0);if((a||!n)&&((Ro(t)!=="body"||is(r))&&(i=ul(t)),a)){let p=Cs(t,!0,n,t);l.x=p.x+t.clientLeft,l.y=p.y+t.clientTop}!a&&r&&(l.x=nm(r));let c=r&&!a&&!n?V8(r,i):Or(0),u=s.left+i.scrollLeft-l.x-c.x,d=s.top+i.scrollTop-l.y-c.y;return{x:u,y:d,width:s.width,height:s.height}}function $h(e){return zo(e).position==="static"}function D8(e,t){if(!Ae(e)||zo(e).position==="fixed")return null;if(t)return t(e);let o=e.offsetParent;return zr(e)===o&&(o=o.ownerDocument.body),o}function B8(e,t){let o=Qe(e);if(cl(e))return o;if(!Ae(e)){let r=$a(e);for(;r&&!Wa(r);){if(Ge(r)&&!$h(r))return r;r=$a(r)}return o}let a=D8(e,t);for(;a&&jw(a)&&$h(a);)a=D8(a,t);return a&&Wa(a)&&$h(a)&&!Hd(a)?o:a||Kw(e)||o}var Z3=async function(e){let t=this.getOffsetParent||B8,o=this.getDimensions,a=await o(e.floating);return{reference:_3(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:a.width,height:a.height}}};function G3(e){return zo(e).direction==="rtl"}var qh={convertOffsetParentRelativeRectToViewportRelativeRect:z3,getDocumentElement:zr,getClippingRect:V3,getOffsetParent:B8,getElementRects:Z3,getClientRects:L3,getDimensions:B3,getScale:fi,isElement:Ge,isRTL:G3};function _8(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function U3(e,t,o){let a=null,r,n=zr(e);function s(){var u;clearTimeout(r),(u=a)==null||u.disconnect(),a=null}function i(u,d){u===void 0&&(u=!1),d===void 0&&(d=1),s();let p=e.getBoundingClientRect(),{left:f,top:m,width:v,height:h}=p;if(u||t(),!v||!h)return;let y=Nl(m),x=Nl(n.clientWidth-(f+v)),g=Nl(n.clientHeight-(m+h)),b=Nl(f),C={rootMargin:-y+"px "+-x+"px "+-g+"px "+-b+"px",threshold:mr(0,En(1,d))||1},R=!0;function I(S){let M=S[0].intersectionRatio;if(!_8(p,e.getBoundingClientRect()))return i();if(M!==d){if(!R)return i();M?i(!1,M):r=setTimeout(()=>{i(!1,1e-7)},1e3)}R=!1}try{a=new IntersectionObserver(I,{...C,root:n.ownerDocument})}catch{a=new IntersectionObserver(I,C)}a.observe(e)}let l=Qe(e),c=()=>i(o);return l.addEventListener("resize",c),i(!0),()=>{l.removeEventListener("resize",c),s()}}function Ql(e,t,o,a){a===void 0&&(a={});let{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:i=typeof IntersectionObserver=="function",animationFrame:l=!1}=a,c=Wh(e),u=r||n?[...c?Rn(c):[],...t?Rn(t):[]]:[];u.forEach(y=>{r&&y.addEventListener("scroll",o),n&&y.addEventListener("resize",o)});let d=c&&i?U3(c,o,n):null,p=-1,f=null;s&&(f=new ResizeObserver(y=>{let[x]=y;x&&x.target===c&&f&&t&&(f.unobserve(t),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var g;(g=f)==null||g.observe(t)})),o()}),c&&!l&&f.observe(c),t&&f.observe(t));let m,v=l?Cs(e):null;l&&h();function h(){let y=Cs(e);v&&!_8(v,y)&&o(),v=y,m=requestAnimationFrame(h)}return o(),()=>{var y;u.forEach(x=>{r&&x.removeEventListener("scroll",o),n&&x.removeEventListener("resize",o)}),d?.(),(y=f)==null||y.disconnect(),f=null,l&&cancelAnimationFrame(m)}}var Z8=A8;var G8=z8,U8=P8,$8=N8;var W8=L8,sm=(e,t,o)=>{let a=new Map,r=o??{},n={...qh,...r.platform,_c:a};return E8(e,t,{...r,platform:n})};import*as To from"react";import{useLayoutEffect as W3}from"react";var q3=typeof document<"u",j3=function(){},im=q3?W3:j3;function lm(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let o,a,r;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(o=e.length,o!==t.length)return!1;for(a=o;a--!==0;)if(!lm(e[a],t[a]))return!1;return!0}if(r=Object.keys(e),o=r.length,o!==Object.keys(t).length)return!1;for(a=o;a--!==0;)if(!{}.hasOwnProperty.call(t,r[a]))return!1;for(a=o;a--!==0;){let n=r[a];if(!(n==="_owner"&&e.$$typeof)&&!lm(e[n],t[n]))return!1}return!0}return e!==e&&t!==t}function j8(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function q8(e,t){let o=j8(e);return Math.round(t*o)/o}function jh(e){let t=To.useRef(e);return im(()=>{t.current=e}),t}function K8(e){e===void 0&&(e={});let{placement:t="bottom",strategy:o="absolute",middleware:a=[],platform:r,elements:{reference:n,floating:s}={},transform:i=!0,whileElementsMounted:l,open:c}=e,[u,d]=To.useState({x:0,y:0,strategy:o,placement:t,middlewareData:{},isPositioned:!1}),[p,f]=To.useState(a);lm(p,a)||f(a);let[m,v]=To.useState(null),[h,y]=To.useState(null),x=To.useCallback(N=>{N!==C.current&&(C.current=N,v(N))},[]),g=To.useCallback(N=>{N!==R.current&&(R.current=N,y(N))},[]),b=n||m,w=s||h,C=To.useRef(null),R=To.useRef(null),I=To.useRef(u),S=l!=null,M=jh(l),T=jh(r),V=jh(c),F=To.useCallback(()=>{if(!C.current||!R.current)return;let N={placement:t,strategy:o,middleware:p};T.current&&(N.platform=T.current),sm(C.current,R.current,N).then(A=>{let E={...A,isPositioned:V.current!==!1};L.current&&!lm(I.current,E)&&(I.current=E,Ta(()=>{d(E)}))})},[p,t,o,T,V]);im(()=>{c===!1&&I.current.isPositioned&&(I.current.isPositioned=!1,d(N=>({...N,isPositioned:!1})))},[c]);let L=To.useRef(!1);im(()=>(L.current=!0,()=>{L.current=!1}),[]),im(()=>{if(b&&(C.current=b),w&&(R.current=w),b&&w){if(M.current)return M.current(b,w,F);F()}},[b,w,F,M,S]);let P=To.useMemo(()=>({reference:C,floating:R,setReference:x,setFloating:g}),[x,g]),H=To.useMemo(()=>({reference:b,floating:w}),[b,w]),D=To.useMemo(()=>{let N={position:o,left:0,top:0};if(!H.floating)return N;let A=q8(H.floating,u.x),E=q8(H.floating,u.y);return i?{...N,transform:"translate("+A+"px, "+E+"px)",...j8(H.floating)>=1.5&&{willChange:"transform"}}:{position:o,left:A,top:E}},[o,i,H.floating,u.x,u.y]);return To.useMemo(()=>({...u,update:F,refs:P,elements:H,floatingStyles:D}),[u,F,P,H,D])}var Kh=(e,t)=>{let o=Z8(e);return{name:o.name,fn:o.fn,options:[e,t]}},Yh=(e,t)=>{let o=G8(e);return{name:o.name,fn:o.fn,options:[e,t]}},Xh=(e,t)=>({fn:W8(e).fn,options:[e,t]}),Qh=(e,t)=>{let o=U8(e);return{name:o.name,fn:o.fn,options:[e,t]}},Jh=(e,t)=>{let o=$8(e);return{name:o.name,fn:o.fn,options:[e,t]}};import*as Y8 from"react";var gi=class extends Ja{setState(t){}update(t){}set(t,o){}notifyAll(){}};var X8={...di,disabled:e=>e.disabled,instantType:e=>e.instantType,isInstantPhase:e=>e.isInstantPhase,trackCursorAxis:e=>e.trackCursorAxis,disableHoverablePopup:e=>e.disableHoverablePopup,lastOpenChangeReason:e=>e.openChangeReason,closeOnClick:e=>e.closeOnClick,appliedTriggerProps:(e,t)=>t?e.activeTriggerProps:void 0,closeDelay:e=>e.closeDelay,adaptiveOrigin:e=>e.adaptiveOrigin},cm=class extends Ja{constructor(t,o,a){let r=new Nn;super(J8(t,r,o,a),eI(r),X8)}setOpen=(t,o)=>{w8(this,t,o,{extraState:{openChangeReason:o.reason}})};cancelPendingOpen(t){this.state.floatingRootContext.dispatchOpenChange(!1,fe(_.triggerPress,t))}};function Q8(){let e=new Nn,t=new gi(Object.freeze(J8(void 0,e)),Object.freeze(eI(e)),X8);return Object.assign(t,{setOpen:Be,cancelPendingOpen:Be})}function J8(e,t,o,a=!1){return{...Xp(t,o,a),disabled:!1,instantType:void 0,isInstantPhase:!1,trackCursorAxis:"none",disableHoverablePopup:!1,openChangeReason:null,closeOnClick:!0,closeDelay:0,adaptiveOrigin:void 0,...e}}function eI(e){return{popupRef:Y8.createRef(),onOpenChange:void 0,onOpenChangeComplete:void 0,triggerElements:e}}import{jsx as tI,jsxs as K3}from"react/jsx-runtime";var oI=Sl(function(t){let{disabled:o=!1,defaultOpen:a=!1,open:r,disableHoverablePopup:n=!1,trackCursorAxis:s="none",actionsRef:i,onOpenChange:l,onOpenChangeComplete:c,handle:u,triggerId:d,defaultTriggerId:p=null,children:f}=t,m=y8((T,V)=>new cm({open:a,openProp:r,activeTriggerId:p,triggerIdProp:d},T,V));m.useControlledProp("openProp",r),m.useControlledProp("triggerIdProp",d),m.useContextCallback("onOpenChange",l),m.useContextCallback("onOpenChangeComplete",c);let v=m.useState("open"),h=!o&&v,y=m.useState("activeTriggerId"),x=m.useState("mounted"),g=m.useState("payload");m.useSyncedValues({trackCursorAxis:s,disableHoverablePopup:n,disabled:o}),$p(m,{closeOnActiveTriggerUnmount:!0});let{forceUnmount:b,transitionStatus:w}=Wp(h,m),C=m.useState("isInstantPhase"),R=m.useState("instantType"),I=m.useState("lastOpenChangeReason"),S=hi.useRef(null);B(()=>{v&&o&&m.setOpen(!1,fe(_.disabled))},[v,o,m]),B(()=>{w==="ending"&&I===_.none||w!=="ending"&&C?(R!=="delay"&&(S.current=R),m.set("instantType","delay")):S.current!==null&&(m.set("instantType",S.current),S.current=null)},[w,C,I,R,m]),B(()=>{h&&y==null&&m.set("payload",void 0)},[m,y,h]),hi.useImperativeHandle(i,()=>({unmount:b,close:()=>m.setOpen(!1,fe(_.imperativeAction))}),[b,m]);let M=h||x||!o&&s!=="none";return K3(eh.Provider,{value:m,children:[u&&tI(Gp,{handle:u,store:m}),M&&tI(Y3,{store:m,disabled:o,trackCursorAxis:s}),typeof f=="function"?f({payload:g}):f]})});function Y3({store:e,disabled:t,trackCursorAxis:o}){let a=e.useState("floatingRootContext"),r=Ul(a,{enabled:!t,referencePress:()=>e.select("closeOnClick")}),n=Lh(a,{enabled:!t&&o!=="none",axis:o==="none"?void 0:o}),s=hi.useMemo(()=>nt(n.reference,r.reference),[n.reference,r.reference]);return qp(e,{activeTriggerProps:s,inactiveTriggerProps:s,popupProps:r.floating??Le}),null}import*as dm from"react";import*as um from"react";var e1=um.createContext(void 0);function aI(){return um.useContext(e1)}var rI="data-base-ui-tooltip-trigger";function nI(e){let t=Ue(e);return Ge(t)?t:null}var sI=xp(function(t,o){let{render:a,className:r,style:n,handle:s,payload:i,disabled:l,delay:c,closeOnClick:u=!0,closeDelay:d,id:p,...f}=t,m=Xa(!0),h=Qp(s)??m;if(!h)throw new Error(He(82));let y=tt(p),x=h.useState("isTriggerActive",y),g=h.useState("isOpenedByTrigger",y),b=h.useState("floatingRootContext"),w=dm.useRef(null),C=d??0,{registerTrigger:R,isMountedByThisTrigger:I}=Up(y,w,h,{payload:i,closeOnClick:u,closeDelay:C}),S=aI(),{activeIdRef:M,delayRef:T,isInstantPhase:V,hasProvider:F}=hh(b,{open:g}),L=mi(b);h.useSyncedValue("isInstantPhase",V);let P=h.useState("disabled"),H=l??P,D=ft(H),N=h.useState("trackCursorAxis"),A=h.useState("disableHoverablePopup"),E=dm.useRef(!1),G=it(),z=dm.useRef(void 0);function oe(){return F&&M.current!=null?0:c??S??600}function X(re){let ge=w.current;if(!ge||!re)return!1;let ee=en(re,`[${rI}]`);return ee!==null&&ee!==ge&&de(ge,ee)}function Z(re){let ge=X(re);return E.current=ge,ge&&(L.openChangeTimeout.clear(),L.restTimeout.clear(),L.restTimeoutPending=!1,G.clear()),ge}let U=xs(b,{enabled:!H,mouseOnly:!0,move:!1,handleClose:!A&&N!=="both"?Is():null,restMs:oe,delay(){return d==null&&F?{close:pr(T.current,"close")}:{close:C}},triggerElementRef:w,isActiveTrigger:x,isClosing:()=>h.select("transitionStatus")==="ending",shouldOpen(){return!E.current}}),ae=jl(b,{enabled:!H}).reference,we=re=>{let ge=E.current,ee=nI(re),Me=Z(ee),ne=w.current,J=ne&&ee&&de(ne,ee);if(Me&&h.select("open")&&h.select("lastOpenChangeReason")===_.triggerHover){h.setOpen(!1,fe(_.triggerHover,re));return}if(ge&&!Me&&J&&!D.current&&!h.select("open")&&ne&&za(z.current)){let ce=()=>{!E.current&&!D.current&&!h.select("open")&&h.setOpen(!0,fe(_.triggerHover,re,ne))},ie=oe();ie===0?(G.clear(),ce()):G.start(ie,ce)}},j=h.useState("appliedTriggerProps",I||N!=="none");return me("button",t,{state:{open:g},ref:[o,R,w],props:[U,ae,j,{onMouseOver(re){we(re.nativeEvent)},onFocus(re){X(nI(re.nativeEvent))&&re.preventBaseUIHandler()},onMouseLeave(){E.current=!1,G.clear(),z.current=void 0},onPointerEnter(re){z.current=re.pointerType},onPointerDown(re){z.current=re.pointerType,h.set("closeOnClick",u),u&&!h.select("open")&&h.cancelPendingOpen(re.nativeEvent)},onClick(re){u&&!h.select("open")&&h.cancelPendingOpen(re.nativeEvent)},id:y,[Tl]:H?"":void 0,[rI]:H?void 0:""},f],stateAttributesMapping:Sp})});import*as uI from"react";import*as pm from"react";var t1=pm.createContext(void 0);function iI(){let e=pm.useContext(t1);if(e===void 0)throw new Error(He(70));return e}import*as mm from"react";import{jsxs as X3}from"react/jsx-runtime";var lI=mm.forwardRef(function(t,o){let{children:a,container:r,className:n,render:s,style:i,...l}=t,{node:c,subtree:u}=Bp({container:r,ref:o,componentProps:t,elementProps:l});return!u&&!c?null:X3(mm.Fragment,{children:[u,c&&lr(a,c)]})});import{jsx as cI}from"react/jsx-runtime";var dI=uI.forwardRef(function(t,o){let{keepMounted:a=!1,...r}=t;return Xa().useState("mounted")||a?cI(t1.Provider,{value:a,children:cI(lI,{ref:o,...r})}):null});import*as xm from"react";import*as fm from"react";var o1=fm.createContext(void 0);function bi(){let e=fm.useContext(o1);if(e===void 0)throw new Error(He(71));return e}import*as Fa from"react";import*as tr from"react";function pI(e){let{nodeId:t,externalTree:o,rootContext:a}=e,r=a.useState("referenceElement"),n=a.useState("floatingElement"),s=a.useState("domReferenceElement"),i=a.useState("open"),l=a.useState("floatingId"),[c,u]=tr.useState(null),d=tr.useRef(null),p=ra(o),f=tr.useMemo(()=>({reference:r,floating:n,domReference:s}),[r,n,s]),m=K8({...e,elements:{...f,...c&&{reference:c}}}),v=tr.useCallback(g=>{let b=Ge(g)?{getBoundingClientRect:()=>g.getBoundingClientRect(),getClientRects:()=>g.getClientRects(),contextElement:g}:g;u(b),m.refs.setReference(b)},[m.refs]),h=tr.useMemo(()=>({...m.refs,setPositionReference:v,domReference:d}),[m.refs,v]),y=tr.useMemo(()=>({...m.elements,domReference:s}),[m.elements,s]),x=tr.useMemo(()=>({...m,dataRef:a.context.dataRef,open:i,onOpenChange:a.setOpen,events:a.context.events,floatingId:l,refs:h,elements:y,nodeId:t,rootStore:a}),[m,h,y,t,a,i,l]);return B(()=>{s&&(d.current=s)},[s]),B(()=>{a.context.dataRef.current.floatingContext=x;let g=p?.nodesRef.current.find(b=>b.id===t);g&&(g.context=x)}),tr.useMemo(()=>({...m,context:x,refs:h,elements:y,rootStore:a}),[m,h,y,x,a])}import*as gm from"react";var Q3=gm.createContext(void 0);function Vo(){return gm.useContext(Q3)?.direction??"ltr"}var J3=e=>({name:"arrow",options:e,async fn(t){let{x:o,y:a,placement:r,rects:n,platform:s,elements:i,middlewareData:l}=t,{element:c,padding:u=0}=Hr(e,t)||{};if(c==null)return{};let d=Lp(u),p={x:o,y:a},f=Dl(r),m=Fl(f),v=await s.getDimensions(c),h=f==="y",y=h?"top":"left",x=h?"bottom":"right",g=h?"clientHeight":"clientWidth",b=n.reference[m]+n.reference[f]-p[f]-n.floating[m],w=p[f]-n.reference[f],C=i.floating[g]||n.floating[m],R=b/2-w/2,I=C/2-v[m]/2-1,S=Math.min(d[y],I),M=Math.min(d[x],I),T=S,V=C-v[m]-M,F=C/2-v[m]/2+R,L=Ap(T,F,V),P=!l.arrow&&La(r)!=null&&F!==L&&n.reference[m]/2-(F<T?S:M)-v[m]/2<0,H=P?F<T?F-T:F-V:0;return{[f]:p[f]+H,data:{[f]:L,centerOffset:F-L-H,...P&&{alignmentOffset:H}},reset:P}}}),mI=(e,t)=>{let{name:o,fn:a}=J3(e);return{name:o,fn:a,options:[e,t]}};var fI={name:"hide",async fn(e){let{width:t,height:o,x:a,y:r}=e.rects.reference,n=t===0&&o===0&&a===0&&r===0,s=await e.platform.detectOverflow(e,{elementContext:"reference"});return{data:{referenceHidden:s.top-o>=0||s.right-t>=0||s.bottom-o>=0||s.left-t>=0||n}}}};var yi={sideX:"left",sideY:"top"};var hm="--available-width",bm="--available-height",gI="--anchor-width",hI="--anchor-height",bI="--transform-origin",yI="--positioner-width",wI="--positioner-height";var vI=hm,II=bm;function SI(e,t,o){let a=e==="inline-start"||e==="inline-end";return{top:"top",right:a?o?"inline-start":"inline-end":"right",bottom:"bottom",left:a?o?"inline-end":"inline-start":"left"}[t]}function CI(e,t,o){let{rects:a,placement:r}=e;return{side:SI(t,qo(r),o),align:La(r)||"center",anchor:{width:a.reference.width,height:a.reference.height},positioner:{width:a.floating.width,height:a.floating.height}}}function ym(e){return eT(e,pI)}function eT(e,t){let{anchor:o,positionMethod:a="absolute",side:r="bottom",sideOffset:n=0,align:s="center",alignOffset:i=0,collisionBoundary:l,collisionPadding:c=5,sticky:u=!1,arrowPadding:d=5,disableAnchorTracking:p=!1,inline:f,keepMounted:m=!1,floatingRootContext:v,mounted:h,collisionAvoidance:y,shift:x,nodeId:g,adaptiveOrigin:b,lazyFlip:w=!1,externalTree:C}=e,R=y.side||"flip",I=y.align||"flip",S=y.fallbackAxisSide||"end",M=x?.crossAxis??!1,T=x?.rootBoundary,V=typeof o=="function"?o:void 0,F=W(V),L=V?F:o,P=ft(o),H=ft(h),N=Vo()==="rtl",[A,E]=Fa.useState(null);!h&&A!==null&&E(null);let G=w==="placement",z=A?qo(A):null,oe=A&&G?La(A)||"center":null,X=z||{top:"top",right:"right",bottom:"bottom",left:"left","inline-end":N?"left":"right","inline-start":N?"right":"left"}[r],Z=oe||s,U=Z==="center"?X:`${X}-${Z}`,ae=c;typeof ae=="number"?ae={top:ae,right:ae,bottom:ae,left:ae}:ae&&(ae={top:ae.top||0,right:ae.right||0,bottom:ae.bottom||0,left:ae.left||0});let we=1,j=r==="bottom"?we:0,Y=r==="top"?we:0,q=r==="right"?we:0,re=r==="left"?we:0,ge={boundary:l==="clipping-ancestors"?"clippingAncestors":l,padding:ae},ee=Fa.useRef(null),Me=ft(n),ne=ft(i),J=typeof n!="function"?n:0,ce=typeof i!="function"?i:0,ie=[];f&&ie.push(f),ie.push(Kh(_e=>{let Rt=CI(_e,r,N),Ie=typeof Me.current=="function"?Me.current(Rt):Me.current,Re=typeof ne.current=="function"?ne.current(Rt):ne.current;return{mainAxis:Ie,crossAxis:Re,alignmentAxis:Re}},[J,ce,N,r]));let he=I==="none"&&R!=="shift",le=!he&&(u||M||R==="shift"),We=R==="none"?null:Qh({...ge,padding:{top:ae.top+we+j,right:ae.right+we+re,bottom:ae.bottom+we+Y,left:ae.left+we+q},mainAxis:!M&&R==="flip",crossAxis:I==="flip"?"alignment":!1,fallbackAxisSideDirection:S}),Oe=he?null:Yh({...ge,rootBoundary:T,mainAxis:I!=="none",crossAxis:le,limiter:u||M?void 0:Xh(_e=>{if(!ee.current)return{};let{width:Rt,height:Ie}=ee.current.getBoundingClientRect(),Re=va(qo(_e.placement)),Ke=Re==="y"?Rt:Ie,Tt=Re==="y"?ae.left+ae.right:ae.top+ae.bottom;return{offset:Ke/2+Tt/2}})},[ge,u,M,T,ae,I]);R==="shift"||I==="shift"||Z==="center"?ie.push(Oe,We):ie.push(We,Oe),ie.push(Jh({...ge,apply({elements:{floating:_e},availableWidth:Rt,availableHeight:Ie,rects:Re}){if(!H.current)return;let Ke=_e.style;Ke.setProperty(vI,`${Rt}px`),Ke.setProperty(II,`${Ie}px`);let Tt=Qe(_e).devicePixelRatio||1,{x:la,y:ha,width:wt,height:_o}=Re.reference,vr=(Math.round((la+wt)*Tt)-Math.round(la*Tt))/Tt,sr=(Math.round((ha+_o)*Tt)-Math.round(ha*Tt))/Tt;Ke.setProperty(gI,`${vr}px`),Ke.setProperty(hI,`${sr}px`)}}),mI(_e=>({element:ee.current||Se(_e.elements.floating).createElement("div"),padding:ee.current?d:0}),[d]),{name:"transformOrigin",fn(_e){let{elements:{floating:Rt},middlewareData:Ie,placement:Re,platform:Ke,rects:Tt,y:la}=_e,ha=qo(Re),wt=La(Re),_o=va(ha)==="y",vr=ee.current,sr=typeof n=="function"?n(CI(_e,r,N)):n,Ba;if(!vr&&wt&&Math.abs(_o?Ie.shift?.x||0:Ie.shift?.y||0)<=1)Ba=wt==="start"===(_o&&Ke.isRTL?.(Rt)===!0)?"100%":"0%";else{let Yn=_o?Ie.arrow?.x||0:Ie.arrow?.y||0,fn=_o?vr?.clientWidth||0:vr?.clientHeight||0;Ba=`${Yn+fn/2}px`}let ir=ha==="top"||ha==="left"?`calc(100% + ${sr}px)`:`${-sr}px`;return le&&_o&&Math.abs(Ie.shift?.y||0)>sr&&(ir=`${Tt.reference.y+Tt.reference.height/2-la}px`),Rt.style.setProperty(bI,_o?`${Ba} ${ir}`:`${ir} ${Ba}`),{}}},fI,b),B(()=>{!h&&v&&v.update({referenceElement:null,floatingElement:null,domReferenceElement:null,positionReference:null})},[h,v]);let xe=Fa.useMemo(()=>({ancestorScroll:!p,elementResize:!p&&typeof ResizeObserver<"u",layoutShift:!p&&typeof IntersectionObserver<"u"}),[p]),{refs:$,elements:Q,x:Ee,y:ue,middlewareData:be,update:bt,placement:ct,context:ut,isPositioned:ot,floatingStyles:yt}=t({rootContext:v,open:m?h:void 0,placement:U,middleware:ie,strategy:a,whileElementsMounted:m?void 0:(..._e)=>Ql(..._e,xe),nodeId:g,externalTree:C}),{sideX:Qo,sideY:Ct}=be.adaptiveOrigin||yi,kt=ot?a:"fixed",Sa=Fa.useMemo(()=>{let _e;return ot?b?_e={position:kt,[Qo]:Ee,[Ct]:ue}:_e={...yt,position:kt}:_e={position:kt,top:0,left:0},_e[vI]="100vw",_e[II]="100vh",ot||(_e.opacity=0),_e},[b,kt,Qo,Ee,Ct,ue,yt,ot]),Dt=Fa.useRef(null);B(()=>{if(!h)return;let _e=P.current,Rt=typeof _e=="function"?_e():_e,Re=(RI(Rt)?Rt.current:Rt)||null||null;Re!==Dt.current&&($.setPositionReference(Re),Dt.current=Re)},[h,$,L,P]),Fa.useEffect(()=>{if(!h)return;let _e=P.current;typeof _e!="function"&&RI(_e)&&_e.current!==Dt.current&&($.setPositionReference(_e.current),Dt.current=_e.current)},[h,$,L,P]),Fa.useEffect(()=>{if(m&&h&&Q.reference&&Q.floating)return Ql(Q.reference,Q.floating,bt,xe)},[m,h,Q,bt,xe]);let Do=qo(ct),Va=SI(r,Do,N),ka=La(ct)||"center",ko=!!be.hide?.referenceHidden;B(()=>{w&&h&&ot&&(Do!==X||G&&ka!==Z)&&E(ct)},[w,G,h,ot,ct,Do,ka,X,Z]);let Bo=Fa.useMemo(()=>({position:"absolute",top:be.arrow?.y,left:be.arrow?.x}),[be.arrow]),nr=be.arrow?.centerOffset!==0;return Fa.useMemo(()=>({positionerStyles:Sa,arrowStyles:Bo,arrowRef:ee,arrowUncentered:nr,side:Va,align:ka,physicalSide:Do,anchorHidden:ko,refs:$,context:ut,isPositioned:ot,update:bt}),[Sa,Bo,ee,nr,Va,ka,Do,ko,$,ut,ot,bt])}function RI(e){return e!=null&&"current"in e}function wi(e){return e==="starting"?t8:Le}function wm(e,t,{styles:o,transitionStatus:a,props:r,refs:n,hidden:s,inert:i=!1}){let l={...o};return i&&(l.pointerEvents="none"),me("div",e,{state:t,ref:n,props:[{role:"presentation",hidden:s,style:l},wi(a),r],stateAttributesMapping:hs})}import{jsx as tT}from"react/jsx-runtime";var kI=xm.forwardRef(function(t,o){let{render:a,className:r,anchor:n,positionMethod:s="absolute",side:i="top",align:l="center",sideOffset:c=0,alignOffset:u=0,collisionBoundary:d="clipping-ancestors",collisionPadding:p=5,arrowPadding:f=5,sticky:m=!1,disableAnchorTracking:v=!1,collisionAvoidance:h=Vp,style:y,...x}=t,g=Xa(),b=iI(),w=g.useState("open"),C=g.useState("mounted"),R=g.useState("trackCursorAxis"),I=g.useState("disableHoverablePopup"),S=g.useState("floatingRootContext"),M=g.useState("instantType"),T=g.useState("transitionStatus"),V=g.useState("adaptiveOrigin"),F=ym({anchor:n,positionMethod:s,floatingRootContext:S,mounted:C,side:i,sideOffset:c,align:l,alignOffset:u,collisionBoundary:d,collisionPadding:p,sticky:m,arrowPadding:f,disableAnchorTracking:v,keepMounted:b,collisionAvoidance:h,adaptiveOrigin:V}),L=xm.useMemo(()=>({open:w,side:F.side,align:F.align,anchorHidden:F.anchorHidden,instant:R!=="none"?"tracking-cursor":M}),[w,F.side,F.align,F.anchorHidden,R,M]),P=wm(t,L,{styles:F.positionerStyles,transitionStatus:T,props:x,refs:[o,g.useStateSetter("positionerElement")],hidden:!C,inert:!w||R==="both"||I});return tT(o1.Provider,{value:F,children:P})});import*as MI from"react";var EI=MI.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,i=Xa(),{side:l,align:c}=bi(),u=i.useState("open"),d=i.useState("instantType"),p=i.useState("transitionStatus"),f=i.useState("popupProps"),m=i.useState("floatingRootContext"),v=i.useState("disabled"),h=i.useState("closeDelay");oa({open:u,ref:i.context.popupRef,onComplete(){u&&i.context.onOpenChangeComplete?.(!0)}}),Kl(m,{enabled:!v,closeDelay:h});let y=i.useStateSetter("popupElement");return me("div",t,{state:{open:u,side:l,align:c,instant:d,transitionStatus:p},ref:[o,i.context.popupRef,y],props:[Zp,f,wi(p),s],stateAttributesMapping:li})});import*as PI from"react";var TI=PI.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,i=Xa(),{arrowRef:l,side:c,align:u,arrowUncentered:d,arrowStyles:p}=bi(),f=i.useState("open"),m=i.useState("instantType");return me("div",t,{state:{open:f,side:c,align:u,uncentered:d,instant:m},ref:[o,l],props:[{style:p,"aria-hidden":!0},s],stateAttributesMapping:hs})});import*as zI from"react";import{jsx as AI}from"react/jsx-runtime";var LI=function(t){let{delay:o,closeDelay:a,timeout:r=400}=t,n=zI.useMemo(()=>({open:o,close:a}),[o,a]);return AI(e1.Provider,{value:o,children:AI(gh,{delay:n,timeoutMs:r,children:t.children})})};import*as ZI from"react";import*as Yo from"react";function vm(e){return qs(19)?e:e?"true":void 0}import*as NI from"react";function FI(e){let[t,o]=NI.useState({current:e,previous:null});return Object.is(e,t.current)||o({current:e,previous:t.current}),t.previous}import*as Rm from"react";function a1(e){let t=zo(e),o=parseFloat(t.width)||0,a=parseFloat(t.height)||0,r=Ae(e),n=r?e.offsetWidth:o,s=r?e.offsetHeight:a;return(Pn(o)!==n||Pn(a)!==s)&&(o=n,a=s),{width:o,height:a}}var Jl="--popup-width",ec="--popup-height";function HI(e){let{popupElement:t,positionerElement:o,content:a,mounted:r,onMeasureLayout:n,onMeasureLayoutComplete:s,side:i,direction:l}=e,c=Ya(t,!0),u=Aa(),d=Rm.useRef(null),p=W(n),f=W(s),m=Rm.useMemo(()=>oT(i,l),[i,l]);B(()=>{if(!r){d.current=null;return}if(!t||!o)return;let v=OI(t,m);r1(t,"auto");let h=Cm(t,"position","static"),y=Cm(t,"transform","none"),x=Cm(t,"scale","1"),g=OI(o,{[hm]:"max-content",[bm]:"max-content"});function b(){h(),y(),g(),x()}if(p?.(),d.current===null){Im(o,"max-content");let I=a1(t);return d.current=I,Im(o,I),b(),f?.(null,I),v}Im(o,"max-content");let w=d.current,C=a1(t);d.current=C,r1(t,w),b(),f?.(w,C),Im(o,C);let R=new AbortController;return u.request(()=>{r1(t,C),c(()=>{t.style.setProperty(Jl,"auto"),t.style.setProperty(ec,"auto")},R.signal)}),()=>{R.abort(),u.cancel(),v()}},[a,t,o,c,u,r,p,f,m])}function oT(e,t){let o=e==="top",a=e==="left"||e===(t==="rtl"?"inline-end":"inline-start");return!o&&!a?Le:{position:"absolute",[o?"bottom":"top"]:"0",[a?"right":"left"]:"0"}}function Cm(e,t,o){let a=e.style.getPropertyValue(t);return e.style.setProperty(t,o),()=>{e.style.setProperty(t,a)}}function OI(e,t){let o=[];for(let[a,r]of Object.entries(t))o.push(Cm(e,a,r));return o.length?()=>{o.forEach(a=>a())}:Be}function r1(e,t){let o=t==="auto"?"auto":`${t.width}px`,a=t==="auto"?"auto":`${t.height}px`;e.style.setProperty(Jl,o),e.style.setProperty(ec,a)}function Im(e,t){let o=t==="max-content"?"max-content":`${t.width}px`,a=t==="max-content"?"max-content":`${t.height}px`;e.style.setProperty(yI,o),e.style.setProperty(wI,a)}var VI={name:"adaptiveOrigin",async fn(e){let{x:t,y:o,rects:{floating:a},elements:{floating:r},platform:n,strategy:s,placement:i}=e,l=Qe(r),c=l.getComputedStyle(r);if(!(c.transitionDuration!=="0s"&&c.transitionDuration!==""))return{x:t,y:o,data:yi};let d=await n.getOffsetParent?.(r),p={width:0,height:0};if(s==="fixed"&&l?.visualViewport)p={width:l.visualViewport.width,height:l.visualViewport.height};else if(d===l){let x=Se(r);p={width:x.documentElement.clientWidth,height:x.documentElement.clientHeight}}else await n.isElement?.(d)&&(p=await n.getDimensions(d));let f=qo(i),m=t,v=o;f==="left"&&(m=p.width-(t+a.width)),f==="top"&&(v=p.height-(o+a.height));let h=f==="left"?"right":yi.sideX,y=f==="top"?"bottom":yi.sideY;return{x:m,y:v,data:{sideX:h,sideY:y}}}};var BI="data-activation-direction";import{jsx as n1,jsxs as rT}from"react/jsx-runtime";var Sm={activationDirection:e=>e?{[BI]:e}:null};function km(e){let{store:t,side:o,children:a}=e,r=Vo(),n=t.useState("activeTriggerElement"),s=t.useState("activeTriggerId"),i=t.useState("open"),l=t.useState("payload"),c=t.useState("mounted"),u=t.useState("popupElement"),d=t.useState("positionerElement"),p=FI(i?n:null),f=iT(s,l),m=Yo.useRef(null),[v,h]=Yo.useState(null),[y,x]=Yo.useState(null),g=Yo.useRef(null),b=Yo.useRef(null),w=Ya(g,!0),C=Aa(),R=Yo.useRef(null),[I,S]=Yo.useState(null),[M,T]=Yo.useState(!1);B(()=>(t.set("adaptiveOrigin",VI),()=>{t.set("adaptiveOrigin",void 0)}),[t]);let V=W(()=>{g.current?.style.setProperty("animation","none"),g.current?.style.setProperty("transition","none"),b.current?.style.setProperty("display","none")}),F=W(A=>{g.current?.style.removeProperty("animation"),g.current?.style.removeProperty("transition"),b.current?.style.removeProperty("display"),A&&S(A)}),L=W(()=>{R.current?.abort();let A=new AbortController;R.current=A,w(()=>{h(null),S(null),m.current=null},A.signal)}),P=Yo.useRef(null);B(()=>{(!i||!c)&&(P.current=null)},[i,c]),B(()=>{if(i&&n&&p&&n!==p&&P.current!==n&&m.current){h(m.current),T(!0);let A=sT(p,n);x(A),P.current=n}},[i,n,p]),B(()=>{v!=null&&(R.current?.abort(),T(!0),C.request(()=>{Ta(()=>{T(!1)}),L()}))},[f,v,L,C]),B(()=>{let A=g.current;if(!A)return;let E=Se(A).createElement("div");for(let G of Array.from(A.childNodes))E.appendChild(G.cloneNode(!0));m.current=E});let H=v!=null,D;H?D=rT(Yo.Fragment,{children:[n1("div",{"data-previous":!0,inert:vm(!0),ref:b,style:{...I?{[Jl]:`${I.width}px`,[ec]:`${I.height}px`}:null,position:"absolute"},"data-ending-style":M?void 0:""},"previous"),n1("div",{"data-current":!0,ref:g,"data-starting-style":M?"":void 0,children:a},f)]}):D=n1("div",{"data-current":!0,ref:g,children:a},f),B(()=>{let A=b.current;!A||!v||A.replaceChildren(...Array.from(v.childNodes))},[v]),HI({popupElement:u,positionerElement:d,mounted:c,content:l,onMeasureLayout:V,onMeasureLayoutComplete:F,side:o,direction:r});let N={activationDirection:nT(y),transitioning:H};return{children:D,state:N}}function nT(e){if(e)return`${_I(e.horizontal,5,"right","left")} ${_I(e.vertical,5,"down","up")}`}function _I(e,t,o,a){return e>t?o:e<-t?a:""}function sT(e,t){let o=e.getBoundingClientRect(),a=t.getBoundingClientRect(),r={x:o.left+o.width/2,y:o.top+o.height/2},n={x:a.left+a.width/2,y:a.top+a.height/2};return{horizontal:n.x-r.x,vertical:n.y-r.y}}function iT(e,t){let[o,a]=Yo.useState(0),r=Yo.useRef(e),n=Yo.useRef(t),s=Yo.useRef(!1);return B(()=>{let i=r.current,l=n.current,c=e!==i,u=t!==l;c?(a(d=>d+1),s.current=!u):s.current&&u&&(a(d=>d+1),s.current=!1),r.current=e,n.current=t},[e,t]),`${e??"current"}-${o}`}var GI=ZI.forwardRef(function(t,o){let{render:a,className:r,style:n,children:s,...i}=t,l=Xa(),c=bi(),u=l.useState("instantType"),{children:d,state:p}=km({store:l,side:c.side,children:s}),f={activationDirection:p.activationDirection,transitioning:p.transitioning,instant:u};return me("div",t,{state:f,ref:o,props:[i,{children:d}],stateAttributesMapping:Sm})});var tc=class extends ui{constructor(){super(Q8(),"Tooltip")}open(t){this.openByTrigger(t)}close(){this.closePopup()}get isOpen(){return this.attachedStore?.select("open")??!1}};function UI(){return new tc}import{useEffect as mT,useLayoutEffect as fT,useMemo as gT,useRef as Rs,useState as c1}from"react";import*as gr from"react";import{isValidElement as lT}from"react";var cT=Symbol.for("react.lazy");function uT(e){let t=e;if(!t||typeof t!="object"||t.$$typeof!==cT||!t._init)return e;try{return t._init(t._payload)}catch{return null}}function s1(e,t){return lT(e)&&(e.type===t||uT(e.type)===t)}import{jsx as Gr,jsxs as pT}from"react/jsx-runtime";function $I({delay:e=500,closeDelay:t=0,...o}){return Gr(fa.Provider,{"data-slot":"tooltip-provider",delay:e,closeDelay:t,...o})}var WI=gr.createContext(null);function Mm({children:e,...t}){let o=null;return gr.Children.forEach(e,a=>{s1(a,ac)&&(o=qI(a.props.children,!1).text||null)}),Gr(WI.Provider,{value:o,children:Gr(fa.Root,{"data-slot":"tooltip",...t,children:e})})}function i1(e){let t="";return gr.Children.forEach(e,o=>{typeof o=="string"||typeof o=="number"?t+=o:gr.isValidElement(o)&&!o.props["aria-hidden"]&&(t+=i1(o.props.children))}),t.trim()}var dT="[&>:disabled]:pointer-events-none [&>[data-disabled]]:pointer-events-none";function Em({className:e,render:t,children:o,...a}){let r=gr.useContext(WI),n=gr.isValidElement(t)?t:null,i=!(a["aria-label"]||a["aria-labelledby"]||n?.props["aria-label"]||n?.props["aria-labelledby"]||i1(o)||i1(n?.props.children))&&r?{"aria-label":r,"data-tooltip-named":""}:void 0;return Gr(fa.Trigger,{"data-slot":"tooltip-trigger",render:t,className:Mt(dT,e),...i,...a,children:o})}function qI(e,t=!0){let o="",a=null;for(let r of gr.Children.toArray(e))typeof r=="string"||typeof r=="number"?o+=r:s1(r,jI)&&(a=r);return{text:o.trim(),shortcut:a}}var oc=O("inline-flex min-h-6 w-fit max-w-(--tooltip-max) items-center gap-2 rounded-tag bg-ink px-2 py-1 type-label-sm text-text-inverse break-words","has-data-[slot=tooltip-shortcut]:pe-1","forced-colors:outline-solid forced-colors:outline-1 forced-colors:outline-[CanvasText]"),l1="overlay-motion data-instant:duration-0 data-instant:data-ending-style:duration-0";function ac({className:e,side:t="top",sideOffset:o=6,align:a="center",alignOffset:r=0,collisionPadding:n=8,children:s,shortcut:i,...l}){let c=Tr(),{text:u,shortcut:d}=qI(s);return!u&&!i?.length&&!d?null:Gr(fa.Portal,{container:c,children:Gr(fa.Positioner,{align:a,alignOffset:r,side:t,sideOffset:o,collisionPadding:n,className:"isolate z-(--z-overlay)",children:pT(fa.Popup,{"data-slot":"tooltip-content",className:Mt([oc,l1],e),...l,children:[Gr("span",{className:"min-w-0",children:u}),i?Gr(jI,{keys:i}):d]})})})}function jI({keys:e,className:t,...o}){return Gr("kbd",{"data-slot":"tooltip-shortcut",className:O("inline-flex shrink-0 items-center gap-0.5",t),...o,children:e.map((a,r)=>Gr("kbd",{className:"inline-flex h-4 min-w-4 items-center justify-center rounded-tag bg-text-inverse/15 px-1 type-code-xs text-text-inverse",children:a},r))})}import{jsx as Da,jsxs as JI}from"react/jsx-runtime";var hT=O(oc,"[overflow-wrap:anywhere]");function u1({content:e,children:t,disabled:o,side:a="top"}){let r=Tr(),[n,s]=c1(!1),i=Rs(""),l=Rs(!1),c=()=>i.current==="touch"||i.current==="pen",u=(d,p)=>{c()&&p.reason!=="escape-key"&&p.reason!=="outside-press"||l.current&&!d&&p.reason!=="escape-key"&&p.reason!=="outside-press"||(d||(l.current=!1),s(d))};return JI(fa.Root,{disabled:o,open:n&&!o,onOpenChange:u,children:[Da(fa.Trigger,{delay:400,render:t,onPointerDown:d=>{i.current=d.pointerType},onKeyDown:()=>{i.current=""},onClickCapture:d=>{c()&&(i.current="",!o&&(d.preventDefault(),d.stopPropagation(),l.current=!n,s(!n)))}}),Da(fa.Portal,{container:r,children:Da(fa.Positioner,{side:a,sideOffset:6,collisionPadding:8,className:"isolate z-(--z-overlay)",children:Da(fa.Popup,{"data-slot":"text-hint",className:O(hT,l1),children:Da("span",{className:"min-w-0",children:e})})})})]})}var KI=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter(void 0,{granularity:"grapheme"}):null;function XI(e){if(KI)return Array.from(KI.segment(e),a=>a.index);let t=[],o=0;for(let a of e)t.push(o),o+=a.length;return t}function bT(e,t){let o=XI(e);if(t==="auto"){let a=e.lastIndexOf("/");if(a>0&&a<e.length-1&&o.length-o.indexOf(a)<=32)return a;t=6}return t=Math.floor(t),t>0?o.length<=t?0:o[o.length-t]:e.length}function yT(e,t){let[o,a]=c1(!1);return mT(()=>{let r=e.current;if(!r)return;let n=()=>a(r.scrollWidth>r.clientWidth+1);n();let s=new ResizeObserver(n);return s.observe(r),()=>s.disconnect()},[e,t]),o}var YI=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");function wT({children:e,tail:t,hint:o,focusable:a,className:r,...n}){let s=Rs(null),i=Rs(null),l=Rs(null),c=Rs(null),[u,d]=c1(!1),p=bT(e,t),f=e.slice(0,p),m=e.slice(p);fT(()=>{let x=s.current,g=i.current,b=l.current,w=c.current,C=g?.firstChild;if(!x||!g||!b||!w||!C)return;let R=T=>{let V=document.createRange();return V.setStart(C,0),V.setEnd(C,T),V.getBoundingClientRect().width},I=[...XI(f).slice(1),f.length],S=()=>{g.style.width="",w.style.display="none";let T=x.clientWidth;if(R(f.length)+b.getBoundingClientRect().width<=T+.5||f.length===0){d(!1);return}w.style.display="inline";let F=T-w.getBoundingClientRect().width-b.getBoundingClientRect().width,L=-1,P=I.length-1;for(;L<P;){let H=L+P+1>>1;R(I[H])<=F?L=H:P=H-1}g.style.width=`${L<0?0:R(I[L])}px`,d(!0)};S();let M=new ResizeObserver(S);return M.observe(x),document.fonts?.ready.then(S),()=>M.disconnect()},[f,m]);let y=Da("span",{ref:s,className:"block max-w-full min-w-0",children:JI("span",{"data-slot":"truncate","data-position":"middle","data-clipped":u||void 0,dir:"auto",tabIndex:u&&o&&a?0:void 0,onCopy:x=>{let g=window.getSelection()?.toString()??"";if(!g)return;let b=new RegExp(`${YI(f)}\\s*${YI(m)}`);x.clipboardData.setData("text/plain",b.test(g)?g.replace(b,e):e),x.preventDefault()},className:O("inline-flex max-w-full whitespace-nowrap focus-visible:rounded-tag",r),...n,children:[Da("span",{ref:i,"data-slot":"truncate-head",className:"overflow-hidden",children:f}),Da("span",{ref:c,"data-slot":"truncate-ellipsis","aria-hidden":"true",className:"hidden shrink-0 select-none",children:"…"}),Da("span",{ref:l,"data-slot":"truncate-tail",className:"shrink-0",children:m})]})});return o?Da(u1,{content:e,disabled:!u,children:y}):y}function QI({children:e,position:t="end",tail:o="auto",hint:a=!0,focusable:r=!0,className:n,ref:s,...i}){let l=Rs(null),c=gT(()=>Ua(l,s),[s]),u=yT(l,e);if(t==="middle")return Da(wT,{tail:o,hint:a,focusable:r,className:n,ref:s,...i,children:e});let p=Da("span",{ref:c,"data-slot":"truncate","data-position":"end","data-clipped":u||void 0,tabIndex:u&&a&&r?0:void 0,className:O("block min-w-0 truncate focus-visible:rounded-tag",n),...i,children:e});return a?Da(u1,{content:e,disabled:!u,children:p}):p}import{jsx as or,jsxs as dQ}from"react/jsx-runtime";var xT=rt(["group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 items-center gap-2 rounded-overlay border border-line bg-paper p-1 text-text-1","data-[state=error]:border-fail forced-colors:border-[CanvasText]"],{variants:{size:{default:"min-w-48 pe-3 has-[>[data-slot=attachment-actions]]:pe-1 [--attachment-media:var(--row)]",sm:"min-w-40 pe-2 has-[>[data-slot=attachment-actions]]:pe-1 [--attachment-media:var(--space-6)]"}},defaultVariants:{size:"default"}});function t6({className:e,state:t="done",size:o="default",...a}){return or("div",{"data-slot":"attachment","data-state":t,"data-size":o,"aria-busy":t==="uploading"||t==="processing"||void 0,className:O(xT({size:o}),e),...a})}function o6({className:e,children:t,ref:o,...a}){let r=ar.useRef(null),n=ar.useMemo(()=>Ua(r,o),[o]),[s,i]=ar.useState(!1);return ar.useEffect(()=>{let l=r.current;if(!l)return;let c=d=>{d.target.tagName==="IMG"&&i(!0)};l.addEventListener("error",c,!0);let u=l.querySelector("img");return u?.getAttribute("src")&&u.complete&&u.naturalWidth===0&&i(!0),()=>l.removeEventListener("error",c,!0)},[]),or("div",{ref:n,"data-slot":"attachment-media",className:O("relative flex size-(--attachment-media) shrink-0 items-center justify-center overflow-hidden rounded-tag bg-field text-text-2","[&_img]:size-full [&_img]:object-cover [&_svg]:pointer-events-none","transition-opacity duration-(--dur-state) ease-out group-data-[state=uploading]/attachment:opacity-60 group-data-[state=processing]/attachment:opacity-60",e),...a,children:s?or(Fe,{icon:n0,size:14}):t})}function a6({className:e,...t}){return or("div",{"data-slot":"attachment-content",className:O("flex min-w-0 flex-1 flex-col",e),...t})}function vT(e){let t=e.lastIndexOf("."),o=t>0?e.length-t:0;return Math.min(e.length,o+4)}function r6({className:e,children:t,...o}){return or("span",{"data-slot":"attachment-title",className:O("flex min-w-0 type-label text-text-1 group-data-[size=sm]/attachment:type-label-sm",e),...o,children:typeof t=="string"?or(QI,{position:"middle",tail:vT(t),focusable:!1,children:t}):t})}function n6({className:e,...t}){return or("span",{"data-slot":"attachment-description",className:O("block min-w-0 truncate type-caption text-text-2 data group-data-[state=error]/attachment:text-fail-text group-data-[size=sm]/attachment:hidden",e),...t})}function s6({value:e,label:t,className:o,...a}){let r=Math.min(100,Math.max(0,Math.round(e)));return or("div",{"data-slot":"attachment-progress",role:"progressbar","aria-label":t,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":r,"aria-valuetext":`${r}%`,className:O("pointer-events-none absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-pill",o),...a,children:or("div",{className:"h-full w-(--pct) rounded-pill bg-ink transition-[width] duration-(--dur-state) ease-out motion-reduce:transition-none forced-colors:bg-[CanvasText]",style:{"--pct":`${r}%`}})})}function i6({className:e,...t}){return or("div",{"data-slot":"attachment-actions",className:O("relative z-(--z-raised) flex shrink-0 items-center gap-0.5",e),...t})}function d1({className:e,variant:t,size:o="icon-sm",...a}){return or(at,{"data-slot":"attachment-action",variant:t??"ghost",size:o,className:e,...a})}var IT=[[/^image\/|\.(png|jpe?g|gif|webp|avif|svg|heic)$/i,n0],[/^video\/|\.(mp4|mov|webm)$/i,Ow],[/^audio\/|\.(mp3|wav|m4a|ogg)$/i,Nw],[/csv|spreadsheet|\.(csv|tsv|xlsx?)$/i,Dw],[/zip|tar|gzip|\.(zip|tar|gz|tgz)$/i,Lw],[/json|javascript|typescript|x-python|yaml|\.(json|jsonl|js|ts|tsx|py|ya?ml|toml|sh|go|rs)$/i,Fw],[/pdf|wordprocessing|msword|^text\/|\.(pdf|docx?|odt|rtf|txt|md|log)$/i,Tw]];function CT(e,t=""){for(let[o,a]of IT)if(o.test(e)||o.test(t))return a;return Aw}function l6({type:e,name:t,size:o=14,className:a}){return or(Fe,{icon:CT(e,t),size:o,className:a})}var e6=["B","KB","MB","GB"];function c6(e){let t=Math.max(0,e),o=0;for(;t>=1e3&&o<e6.length-1;)t/=1e3,o+=1;return`${o===0||t>=10?Math.round(t):t.toFixed(1)} ${e6[o]}`}var lQ=ar.createContext(null);function RT(e){return(e??"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean)}function u6(e){let t=r=>r.length<=4?r.toUpperCase():r,o=[...new Set(RT(e).map(r=>r.endsWith("/*")?`${r.slice(0,-2)}s`:r.startsWith(".")?t(r.slice(1)):t(r.split("/").pop())))],a=o.length>1?`${o.slice(0,-1).join(", ")} and ${o[o.length-1]}`:o[0];return o.every(r=>r.endsWith("s")&&r===r.toLowerCase())?a:`${a} files`}var cQ=rt("group/attachment-drop relative",{variants:{variant:{region:"",zone:"flex flex-col items-start gap-3 rounded-overlay border border-line-control bg-paper p-4 text-start data-disabled:text-text-disabled"}},defaultVariants:{variant:"region"}});import{Fragment as AT,jsx as p1,jsxs as d6}from"react/jsx-runtime";var xi={agent:"Agent",run:"Run",deploy:"Deployment",key:"Key",model:"Model",file:"File",folder:"Folder",doc:"Doc",table:"Table",web:"Web page",command:"Command",paste:"Pasted text"},ST=new Set(Object.keys(xi)),kT=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,m1=e=>encodeURIComponent(e.replace(kT,"�")).replace(/[()]/g,t=>`%${t.charCodeAt(0).toString(16).toUpperCase()}`),MT={"\\":"\\\\","[":"\\[","]":"\\]","\n":"\\n","\r":"\\r"},ET={n:`
`,r:"\r"};function f1({type:e,id:t,label:o}){return`[${o.replace(/[\\[\]\n\r]/g,a=>MT[a])}](${e}:${m1(t)})`}var PT=/[@/]?\[((?:\\.|[^\]\\\n])*)\]\(([a-z]+):([^)\s]*)\)/g;function Pm(e){let t=[],o=0;for(let a of e.matchAll(PT)){let[r,n,s,i]=a;if(!ST.has(s))continue;let l=i;try{l=decodeURIComponent(i)}catch{}a.index>o&&t.push({kind:"text",text:e.slice(o,a.index)}),t.push({kind:"mention",mention:{type:s,id:l,label:n.replace(/\\(.)/g,(c,u)=>ET[u]??u)}}),o=a.index+r.length}return o<e.length&&t.push({kind:"text",text:e.slice(o)}),t}function p6(e,t){let o=t.find(n=>n.type===e.type&&n.id===e.id);if(o)return o.label;let a=new Set(t.map(n=>n.label));if(!a.has(e.label))return e.label;let r=2;for(;a.has(`${e.label} (${r})`);)r+=1;return`${e.label} (${r})`}var TT=rt(["group/mention inline-flex h-5 max-w-full min-w-0 items-center gap-1 rounded-tag border border-line-control bg-paper px-1.5 align-bottom whitespace-nowrap","type-label text-text-1 no-underline select-none","transition-[background-color,border-color] duration-(--dur-state) ease-out","[a]:hover:bg-hover [button]:hover:bg-hover [a,button]:cursor-pointer","aria-disabled:text-text-disabled data-missing:border-line-faint data-missing:text-text-2 data-missing:line-through data-missing:decoration-1","forced-colors:border-[CanvasText]","[&_svg]:pointer-events-none [&_svg]:shrink-0"],{variants:{removable:{true:"pe-0",false:""}},defaultVariants:{removable:!1}});function m6({type:e,missing:t,onRemove:o,removeLabel:a,missingLabel:r=" (no longer exists)",render:n,className:s,children:i,...l}){let c=typeof i=="string"?i:void 0,u=d6(AT,{children:[d6("span",{"data-slot":"mention-label",className:"min-w-0 truncate",title:c&&c.length>24?c:void 0,children:[e==="command"?"/":"",i]}),t&&p1("span",{className:"sr-only",children:r}),o&&p1("button",{type:"button","data-slot":"mention-remove","aria-label":a??`Remove ${c??xi[e]}`,onClick:d=>{let p=d.currentTarget.closest('ul, ol, [role="list"], [role="group"]')??d.currentTarget.parentElement?.parentElement,f=p?[...p.querySelectorAll('[data-slot="mention-remove"]')]:[],m=f.indexOf(d.currentTarget),v=f[m+1]??f[m-1];o(),requestAnimationFrame(()=>{let h=document.activeElement;v?.isConnected&&(!h||h===document.body||!h.isConnected)&&v.focus()})},className:"relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-tag text-text-2 transition-colors duration-(--dur-state) ease-out after:absolute after:-inset-1 hover:bg-hover hover:text-text-1 focus-visible:focus-ring-inset",children:p1(Fe,{icon:Cn,size:12})})]});return Qr({defaultTagName:"span",props:nt({className:O(TT({removable:!!o}),s),children:u},{"data-slot":"mention","data-type":e,"data-missing":t||void 0},l),render:n,state:{slot:"mention",type:e}})}import*as nn from"react";import{Fragment as LT,jsx as Tm,jsxs as NT}from"react/jsx-runtime";var zT={send:"Send",stop:"Stop",stopping:"Stopping",sendAgain:"Send again"},f6=e=>e==="submitted"||e==="streaming"||e==="stopping";function g6({status:e="ready",onStop:t,empty:o,blockedReason:a,generation:r,labels:n,disabled:s,onClick:i,size:l="icon-sm",className:c,type:u,...d}){let p={...zT,...n},f={ready:p.send,submitted:p.stop,streaming:p.stop,stopping:p.stopping,error:p.sendAgain},m=nn.useId(),v=nn.useRef(null),[h,y]=nn.useState(!1);nn.useEffect(()=>{f6(e)||(v.current=null,y(!1))},[e]),nn.useEffect(()=>{v.current=null,y(!1)},[r]);let x=f6(e),g=x&&h?"stopping":e,b=!x&&!!a,w=!x&&!!o&&!b,C=I=>{I.preventDefault(),!(g==="stopping"||v.current===(r??"current"))&&(v.current=r??"current",y(!0),t?.(r))},R=l==="icon-lg"?16:l==="icon"?14:12;return NT(LT,{children:[Tm(at,{"data-slot":"send-button","data-state":g,"data-empty":w||void 0,variant:"primary",type:x?"button":u??"submit",size:l,disabled:x?s:s||o||b,focusableWhenDisabled:b||g==="stopping","aria-busy":g==="stopping"||void 0,"aria-label":f[g],"aria-describedby":b?m:void 0,"aria-keyshortcuts":x?"Escape":"Enter",onClick:x?C:i,className:Mt(g==="stopping"&&"cursor-progress",c),...d,children:x?Tm("span",{"aria-hidden":!0,"data-slot":"send-button-stop",className:O("size-2 rounded-[1.5px] bg-current forced-colors:bg-[CanvasText]",g==="stopping"&&"opacity-40")}):Tm(Fe,{icon:Ks,size:R})}),b&&Tm("span",{id:m,hidden:!0,children:a})]})}var g1="application/x-glaze-prompt",vi="glaze:prompt-draft:",h1=3,h6=150,FT=e=>e==="command"?"/":e==="paste"?"":"@",Am=e=>e.nativeEvent.isComposing||e.keyCode===229;function Ii(e,t){let o="",a="",r="",n=[],s=(l,c=l,u=c)=>{o+=l,a+=c,r+=u},i=l=>{l.childNodes.forEach(c=>{if(c.nodeType===Node.TEXT_NODE)s((c.nodeValue??"").replace(/ /g," ").replace(/​/g,""));else if(c instanceof HTMLElement){let{mentionId:u,mentionType:d,mentionLabel:p}=c.dataset;if(u!==void 0&&d&&p!==void 0){let f=d,m={id:u,type:f,label:p};if(f==="paste"){let v=`${o&&!/\n\s*$/.test(o)?`
`:""}${t.get(u)??""}
`;s(v,v,f1(m))}else n.push(m),s(`${FT(f)}${p}`,f1(m))}else c.tagName==="BR"?s(`
`):c.hasAttribute("data-template")||((c.tagName==="DIV"||c.tagName==="P")&&o&&!o.endsWith(`
`)&&s(`
`),i(c))}})};return i(e),{text:o,serialized:a,codec:r,mentions:n}}var b1=e=>e.replace(/\n$/,"").split(`
`).length;import*as Ss from"react";import{jsx as sn,jsxs as y1}from"react/jsx-runtime";var b6=e=>(e??"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);function zm(e,t){let o=b6(t);if(!o.length)return!0;let a=e.name.toLowerCase();return o.some(r=>r.startsWith(".")?a.endsWith(r):r.endsWith("/*")?e.type.startsWith(r.slice(0,-1)):e.type===r)}function DT(e,t){let o=b6(e);return!t||!o.length||o.some(r=>r.startsWith("."))||Array.from(t).filter(r=>r.kind==="file").some(r=>!r.type||zm({name:"",type:r.type},e))?"accept":"reject"}function y6(e,t,o){let a=Ss.useRef(0),[r,n]=Ss.useState(!1);Ss.useEffect(()=>{if(!r)return;let l=()=>{a.current=0,n(!1)};return window.addEventListener("dragend",l),window.addEventListener("blur",l),()=>{window.removeEventListener("dragend",l),window.removeEventListener("blur",l)}},[r]),Ss.useEffect(()=>{e||(a.current=0,n(!1))},[e]);let s=l=>Array.from(l.dataTransfer.types).includes("Files");return{dragging:e&&r,dropProps:e?{onDragEnter:l=>{s(l)&&(l.preventDefault(),a.current+=1,n(DT(o,l.dataTransfer.items)))},onDragOver:l=>{s(l)&&(l.preventDefault(),l.dataTransfer.dropEffect=r==="reject"?"none":"copy")},onDragLeave:l=>{s(l)&&(a.current=Math.max(0,a.current-1),a.current||n(!1))},onDrop:l=>{s(l)&&(l.preventDefault(),a.current=0,n(!1),t(Array.from(l.dataTransfer.files)))}}:{}}}var OT={uploading:e=>`Uploading ${e}%`,uploadFailed:"Upload failed",attached:"Attached",retryFile:e=>`Retry ${e}`,cancelUpload:e=>`Cancel upload of ${e}`,removeFile:e=>`Remove ${e}`};function w6({attachment:e,onRemove:t,onRetry:o,labels:a,className:r,...n}){let s={...OT,...a},{name:i,size:l,progress:c=0,status:u,error:d}=e,p=Math.round(Math.min(1,Math.max(0,Number.isFinite(c)?c:0))*100);return y1(t6,{"data-slot":"prompt-attachment",state:u,title:i,className:O("max-w-64",r),...n,children:[sn(o6,{children:sn(l6,{type:"",name:i})}),y1(a6,{children:[sn(r6,{children:i}),sn(n6,{children:u==="uploading"?s.uploading(p):u==="error"?d??s.uploadFailed:l!==void 0?c6(l):s.attached})]}),(t||u==="error"&&o)&&y1(i6,{children:[u==="error"&&o&&sn(d1,{"aria-label":s.retryFile(i),onClick:o,children:sn(Fe,{icon:ns,size:12})}),t&&sn(d1,{"aria-label":u==="uploading"?s.cancelUpload(i):s.removeFile(i),onClick:t,children:sn(Fe,{icon:Cn,size:12})})]}),u==="uploading"&&sn(s6,{value:p,label:i,"aria-hidden":!0})]})}import*as v6 from"react";import{Fragment as BT,jsx as ks,jsxs as x6}from"react/jsx-runtime";var HT={start:"Start voice input",stop:"Stop voice input",blocked:"Voice input blocked",unavailable:"Voice input unavailable",startTip:"Voice input",stopTip:"Stop listening",blockedTip:"Microphone access is blocked. Allow it in the browser's site settings, then press again.",unavailableTip:"This browser can't record audio. Type your message instead."},VT=[.6,1,.75];function w1({state:e="idle",level:t=0,onListeningChange:o,size:a="sm",reason:r,tooltip:n=!0,labels:s,className:i,onClick:l,...c}){let u={...HT,...s},d=v6.useId(),p=e==="listening",f=e==="denied"||e==="unsupported",m={idle:u.start,listening:u.stop,denied:u.blocked,unsupported:u.unavailable}[e],v=f&&r?r:{idle:u.startTip,listening:u.stopTip,denied:u.blockedTip,unsupported:u.unavailableTip}[e],h=Math.min(1,Math.max(0,Number.isFinite(t)?t:0)),y=a==="lg"?16:a==="sm"?12:14,x=ks(at,{"data-slot":"prompt-input-mic","data-state":e,variant:"ghost",size:a==="sm"?"icon-sm":a==="lg"?"icon-lg":"icon","aria-label":m,"aria-pressed":e==="unsupported"?void 0:p,"aria-describedby":f?d:void 0,disabled:e==="unsupported",focusableWhenDisabled:e==="unsupported",onClick:g=>{l?.(g),!g.defaultPrevented&&e!=="unsupported"&&o?.(!p)},className:Mt(O("relative",p&&"bg-pressed"),i),...c,children:p?ks("span",{"aria-hidden":!0,"data-slot":"prompt-input-mic-level",className:O("flex items-center justify-center gap-0.5",a==="sm"?"size-3":"size-4"),children:VT.map((g,b)=>ks("span",{style:{"--live":`${(.2+.8*h*g)*100}%`,"--rest":`${g*70}%`},className:"h-(--live) w-0.5 rounded-pill bg-current transition-[height] duration-(--dur-state) ease-out motion-reduce:h-(--rest) motion-reduce:transition-none"},b))}):ks(Fe,{icon:f?Bw:Vw,size:y})});return x6(BT,{children:[n?x6(Mm,{children:[ks(Em,{render:x}),ks(ac,{children:v})]}):x,f&&ks("span",{id:d,hidden:!0,children:v})]})}import*as On from"react";import*as rc from"react";var I6="forced-colors:outline-solid forced-colors:outline-1 forced-colors:outline-[CanvasText]",x1=O("overlay outline-none",I6),ZQ=O("shell grid-rows-[minmax(0,1fr)] border-line text-text-1 outline-none",I6);var v1="overlay-motion";var C6=O(x1,v1,"flex max-h-[min(var(--popup-max),var(--available-height))] min-w-(--menu-min) max-w-(--available-width) flex-col overflow-y-auto overscroll-contain p-1 [--menu-item-h:var(--menu-row)]","data-[size=sm]:[--menu-item-h:var(--menu-row-sm)]"),nc=O("relative flex min-h-(--menu-item-h) w-full cursor-default items-center gap-2 rounded-tag px-2 type-label text-text-1 outline-none select-none data-inset:ps-7","in-data-[size=sm]:type-label-sm","[&_svg]:size-(--icon) [&_svg]:shrink-0 [&_svg]:text-text-3","data-highlighted:bg-hover data-disabled:cursor-not-allowed data-disabled:text-text-disabled data-disabled:[&_svg]:text-text-disabled","data-[variant=destructive]:text-fail-text data-[variant=destructive]:[&_svg]:text-fail-text data-[variant=destructive]:data-highlighted:bg-fail-tint","forced-colors:data-highlighted:outline-solid forced-colors:data-highlighted:outline-2 forced-colors:data-highlighted:-outline-offset-2"),_T=O(nc,"ps-7"),Lm="flex min-h-(--menu-item-h) items-center px-2 type-caption text-text-2 select-none data-inset:ps-7",R6="-mx-1 my-1 h-px shrink-0 bg-line-faint";import{jsx as ic,jsxs as lc}from"react/jsx-runtime";var S6=6,sc=16,ZT=120,GT=320,I1=320;function k6(e,t){let o=e.toLowerCase();if(!t||o===t)return 0;if(o.startsWith(t))return/[a-z0-9]/i.test(o.charAt(t.length))?2:1;for(let a=o.indexOf(t,1);a>0;a=o.indexOf(t,a+1))if(!/[a-z0-9]/i.test(o.charAt(a-1)))return 3;return 4}function M6({id:e,menu:t,title:o,empty:a,options:r,active:n,onHover:s,onPick:i,typeLabel:l,search:c}){let u=Tr(),d=On.useRef(null),[p,f]=On.useState({visibility:"hidden"});return On.useLayoutEffect(()=>{let m=d.current;if(!m)return;let v=Math.min(GT,window.innerWidth-2*sc),h=Math.max(sc,Math.min(t.rect.left-8,window.innerWidth-v-sc)),y=t.rect.top-sc,x=y>Math.min(m.scrollHeight,I1)+8;f(x?{position:"fixed",left:h,width:v,bottom:window.innerHeight-t.rect.top+S6,maxHeight:Math.min(I1,y-8)}:{position:"fixed",left:h,width:v,top:t.rect.bottom+S6,maxHeight:Math.max(ZT,Math.min(I1,window.innerHeight-t.rect.bottom-sc))})},[t.rect,r.length]),On.useEffect(()=>{d.current?.querySelector(`[data-index="${n}"]`)?.scrollIntoView({block:"nearest"})},[n]),u===null?null:lr(lc("div",{ref:d,"data-slot":"prompt-input-menu","data-menu":t.kind,onMouseDown:m=>{m.target.closest("input")||m.preventDefault()},style:p,className:O("isolate z-(--z-overlay) flex flex-col overflow-hidden [--menu-item-h:var(--menu-row)]",x1,v1,"starting:opacity-0"),children:[c,lc("div",{id:e,role:"listbox","aria-label":o,className:"min-h-0 flex-1 overflow-y-auto overscroll-contain p-1",children:[ic("p",{className:Lm,"aria-hidden":!0,children:o}),r.length===0&&ic("p",{"data-slot":"prompt-input-menu-empty",role:"presentation",className:"flex min-h-(--menu-row) items-center px-2 type-body-sm text-text-2",children:a}),r.map((m,v)=>lc("div",{id:`${e}-${v}`,role:"option","aria-selected":v===n,"data-index":v,"data-highlighted":v===n||void 0,onMouseMove:()=>s(v),onClick:()=>i(m),className:O(nc,m.description&&"py-1"),children:[lc("span",{className:"flex min-w-0 flex-1 flex-col",children:[lc("span",{className:"truncate",children:[m.mention.type==="command"?"/":"",m.mention.label]}),m.description&&ic("span",{className:"truncate type-caption text-text-2",children:m.description})]}),m.detail?ic("span",{dir:"ltr",className:"max-w-1/2 shrink-0 truncate type-code-xs text-text-2",children:m.detail}):ic("span",{className:"shrink-0 type-caption text-text-2",children:l(m)})]},m.key))]})]}),u??document.body)}var C1=/​/g,UT=e=>e instanceof HTMLElement&&!!e.dataset.mentionId;function Nm(e,t){let o=window.getSelection();if(!o?.rangeCount||!o.isCollapsed)return null;let{anchorNode:a,anchorOffset:r}=o;if(!a||!e?.contains(a))return null;let n=null;if(a.nodeType===Node.TEXT_NODE){let s=a.data;if(t==="back"&&s.slice(0,r).replace(C1,"")!==""||t==="forward"&&s.slice(r).replace(C1,"")!=="")return null;n=t==="back"?a.previousSibling:a.nextSibling}else n=t==="back"?a.childNodes[r-1]??null:a.childNodes[r]??null;for(;n&&n.nodeType===Node.TEXT_NODE&&!n.data.replace(C1,"");)n=t==="back"?n.previousSibling:n.nextSibling;return UT(n)?n:null}function Ci(e,t){let o=document.createRange();e==="before"?o.setStartBefore(t):o.setStartAfter(t),o.collapse(!0);let a=window.getSelection();a?.removeAllRanges(),a?.addRange(o)}function R1(e){let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let o=window.getSelection();o?.removeAllRanges(),o?.addRange(t)}import*as Si from"react";import{createContext as dA,useContext as cee,useEffect as uee,useMemo as dee,useRef as pee,useState as mee}from"react";import*as Om from"react";var E6="data-valid",P6="data-invalid";var Fm={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:null,valueMissing:!1},WT={valid:null,touched:!1,dirty:!1,filled:!1,focused:!1},T6={disabled:!1,...WT},Dm={valid(e){return e===null?null:e?{[E6]:""}:{[P6]:""}}};var qT={invalid:void 0,name:void 0,validityData:{state:Fm,errors:[],error:"",value:"",initialValue:null},setValidityData:Be,disabled:void 0,setTouched:Be,setDirty:Be,setFilled:Be,setFocused:Be,focusOwnerRef:{current:void 0},validationMode:"onSubmit",shouldValidateOnChange:()=>!1,state:T6,registerFieldControl:Be,validation:{getValidationProps:(e,t=Le)=>t,inputRef:{current:null},registeredInputs:new Map,registerInput:Be,getInputControl:()=>null,commit:async()=>{},change:Be}},jT=Om.createContext(qT);function Hn(e=!0){let t=Om.useContext(jT);if(t.setValidityData===Be&&!e)throw new Error(He(28));return t}import*as Hm from"react";var KT=Hm.createContext(void 0);function A6(e=!1){let t=Hm.useContext(KT);if(!t&&!e)throw new Error(He(86));return t}import*as Vm from"react";var YT=Vm.createContext({elementRef:{current:null},formRef:{current:{fields:new Map}},errors:{},clearErrors:Be,validationMode:"onSubmit",submitCountRef:{current:0}});function z6(){return Vm.useContext(YT)}import*as Bm from"react";var XT=Bm.createContext({controlId:void 0,registerControlId:Be,resetControlId:Be,labelId:void 0,setLabelId:Be,messageIds:[],setMessageIds:Be,getDescriptionProps:e=>e});function Ri(){return Bm.useContext(XT)}import*as L6 from"react";function N6(e,t,o,a=!0,r,n){let[s,i]=L6.useState(),l=tt(r?`${r}-label`:void 0),c=!!n?.trim(),d=e??(c?void 0:t)??s;return B(()=>{let p=e||t||c||!a?void 0:QT(o.current,l);s!==p&&i(p)}),d}function QT(e,t){let o=JT(e);if(o)return!o.id&&t&&(o.id=t),o.id||void 0}function JT(e){if(!e)return;let t=e.parentElement;if(t&&t.tagName==="LABEL")return t;let o=e.id;if(o){let r=e.nextElementSibling;if(r&&r.htmlFor===o)return r}let a=e.labels;return a&&a[0]}import*as S1 from"react";function F6(e={}){let{id:t,enabled:o=!0}=e,{controlId:a,registerControlId:r,resetControlId:n}=Ri(),s=tt(),i=$e(()=>Symbol()),l=S1.useRef(!1),c=S1.useRef(!1),u=W(()=>{!l.current||r===Be||(l.current=!1,r(i.current,void 0))});return B(()=>{if(!o||r===Be){u();return}let d;if(t!==void 0)c.current=!0,d=t;else if(c.current)d=s;else{n();return}if(d===void 0){u();return}l.current=!0,r(i.current,d)},[t,o,r,n,s,i,u]),B(()=>u,[u]),(o?a:void 0)??t??s}import*as k1 from"react";var IJ=Object.keys(Fm);function D6(e,t){return e.matches(":disabled")?!1:!t||e.form===t?!0:e.form===null&&!e.hasAttribute("form")}import*as _m from"react";var eA=_m.createContext({disabled:!1});function O6(){return _m.useContext(eA)}function H6(e,t,o){let{setFocused:a,focusOwnerRef:r}=Hn(),n=W(s=>{(s?!e:r.current===n)&&(r.current=s&&n,o?.(s),a(s))});return B(()=>{let s=t.current;return s?.getRootNode()?.activeElement===s&&n(!0),()=>n(!1)},[e,t,n]),n}function V6(e,t,o,a,r=!0,n){let{registerFieldControl:s}=Hn(),i=$e(()=>Symbol());B(()=>{let l=i.current;if(!r){s(l,void 0);return}s(l,{controlRef:e,getValue:a,id:t,name:n,value:o})},[e,r,a,t,n,s,i,o]),B(()=>{let l=i.current;return()=>{s(l,void 0)}},[s,i])}import*as B6 from"react";function Zm(e,t){let o=B6.useRef(e),a=W(t);B(()=>{o.current!==e&&a(o.current),o.current=e},[e,a])}import{useEffect as tA,useRef as _6,useState as Z6}from"react";import{Fragment as aA,jsx as cc,jsxs as M1}from"react/jsx-runtime";async function oA(e){let t="",o=e.then(a=>(t=a,new Blob([a],{type:"text/plain"})));if(typeof ClipboardItem<"u"&&typeof navigator.clipboard?.write=="function")try{return await navigator.clipboard.write([new ClipboardItem({"text/plain":o})]),t}catch{}return t=await e,await navigator.clipboard.writeText(t),t}function E1({value:e,label:t,showLabel:o=!1,timeout:a=1600,onCopy:r,forceState:n,variant:s="ghost",size:i,className:l,...c}){let[u,d]=Z6("idle"),[p,f]=Z6(""),m=_6(void 0),v=_6(0);tA(()=>()=>{clearTimeout(m.current),cancelAnimationFrame(v.current)},[]);let h=n??u,y=C=>{cancelAnimationFrame(v.current),f(""),v.current=requestAnimationFrame(()=>f(C))},x=async()=>{clearTimeout(m.current);try{let C,R=typeof e=="function"?e():e;if(typeof R=="string")C=R,await navigator.clipboard.writeText(C);else{let I=oA(R);d("fetching"),C=await I}d("copied"),y(t?`${t} copied`:"Copied"),r?.(C)}catch{d("failed"),y("Could not copy. Select the text and copy it by hand.")}m.current=setTimeout(()=>{d("idle"),f("")},a)},g=i??(o?"sm":"icon-sm"),b=h==="copied"?as:h==="failed"?Fd:Nd,w=g==="sm"||g==="icon-sm"?12:g==="lg"||g==="icon-lg"?16:14;return M1(aA,{children:[M1(at,{"data-slot":"copy-button","data-state":h,variant:s,size:g,"aria-label":t?`Copy ${t}`:"Copy",pending:h==="fetching",onClick:x,className:l,...c,children:[cc(Fe,{icon:b,size:w}),o&&M1("span",{"aria-hidden":!0,className:"grid [grid-template-areas:'stack']",children:[cc("span",{className:O("[grid-area:stack]",h!=="idle"&&h!=="fetching"&&"invisible"),children:"Copy"}),cc("span",{className:O("[grid-area:stack]",h!=="copied"&&"invisible"),children:"Copied"}),cc("span",{className:O("[grid-area:stack]",h!=="failed"&&"invisible"),children:"Failed"})]})]}),cc("span",{role:"status","data-slot":"copy-button-status",className:"sr-only",children:p})]})}import{createContext as G6,useContext as GJ,useEffect as UJ,useState as $J}from"react";import{Fragment as tee,jsx as JJ,jsxs as eee}from"react/jsx-runtime";var jJ=G6(!1),KJ=G6(!1);var YJ=["inline-flex w-fit max-w-full min-w-0 items-center gap-1.5 type-label text-text-1 select-none [overflow-wrap:anywhere]","[&_svg]:size-(--icon) [&_svg]:shrink-0 [&_svg]:text-text-3","group-data-disabled/field:cursor-not-allowed group-data-disabled/field:text-text-disabled"].join(" ");var XJ=rt("group/field flex w-full min-w-0",{variants:{orientation:{vertical:"flex-col gap-1.5",horizontal:["flex-row items-center gap-3 has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto *:data-[slot=field-label]:shrink-0","has-[>[data-slot=input]]:gap-4 has-[>[data-slot=input]]:*:data-[slot=field-label]:w-(--label-col) has-[>[data-slot=input]]:*:data-[slot=field-label]:flex-none has-[>[data-slot=input]]:*:data-[slot=input]:flex-1","has-[>[data-slot=textarea]]:items-start has-[>[data-slot=textarea]]:gap-4 has-[>[data-slot=textarea]]:*:data-[slot=field-label]:w-(--label-col) has-[>[data-slot=textarea]]:*:data-[slot=field-label]:flex-none has-[>[data-slot=textarea]]:*:data-[slot=field-label]:pt-1.5"].join(" "),responsive:["flex-col gap-1.5","@md/field-group:flex-row @md/field-group:items-center @md/field-group:gap-6","@md/field-group:*:data-[slot=field-label]:w-40 @md/field-group:*:data-[slot=field-label]:shrink-0 @md/field-group:*:data-[slot=field-content]:flex-auto"].join(" ")}},defaultVariants:{orientation:"vertical"}});import{useSyncExternalStore as rA}from"react";import{jsx as uc,jsxs as uA}from"react/jsx-runtime";var nA=()=>()=>{},sA=()=>/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent)?"mac":"other";function iA(){return rA(nA,sA,()=>"unknown")}var lA={mod:{mac:"⌘",other:"Ctrl",spoken:{mac:"Command",other:"Control"}},cmd:{mac:"⌘",other:"Win",spoken:{mac:"Command",other:"Windows"}},ctrl:{mac:"⌃",other:"Ctrl",spoken:{mac:"Control",other:"Control"}},shift:{mac:"⇧",other:"Shift",spoken:{mac:"Shift",other:"Shift"}},alt:{mac:"⌥",other:"Alt",spoken:{mac:"Option",other:"Alt"}},enter:{mac:"↵",other:"Enter",spoken:{mac:"Return",other:"Enter"}},esc:{mac:"Esc",other:"Esc",spoken:{mac:"Escape",other:"Escape"}},backspace:{mac:"⌫",other:"Backspace",spoken:{mac:"Delete",other:"Backspace"}},tab:{mac:"⇥",other:"Tab",spoken:{mac:"Tab",other:"Tab"}},space:{mac:"Space",other:"Space",spoken:{mac:"Space",other:"Space"}},up:{mac:"↑",other:"↑",spoken:{mac:"Up arrow",other:"Up arrow"}},down:{mac:"↓",other:"↓",spoken:{mac:"Down arrow",other:"Down arrow"}},left:{mac:"←",other:"←",spoken:{mac:"Left arrow",other:"Left arrow"}},right:{mac:"→",other:"→",spoken:{mac:"Right arrow",other:"Right arrow"}}};function U6(e,t){return e.split("+").map(o=>o.trim()).filter(Boolean).map(o=>{let a=lA[o.toLowerCase()],r=a?a[t]:o.length===1?o.toUpperCase():o;return{shown:r,spoken:a?a.spoken[t]:r}})}var P1=O("pointer-events-none inline-flex min-h-5 w-fit max-w-full min-w-5 items-center justify-center gap-1 rounded-tag border border-line-control bg-paper px-1 text-center","type-code-xs text-text-2 select-none [overflow-wrap:anywhere] [&_svg]:size-(--icon-sm) [&_svg]:shrink-0");function dc({className:e,keys:t,children:o,...a}){return t!==void 0?uc(cA,{keys:t,className:e,...a}):uc("kbd",{"data-slot":"kbd",className:O(P1,e),...a,children:o})}function cA({keys:e,className:t,...o}){let a=iA(),r=U6(e,a==="unknown"?"other":a),n=a==="unknown"?U6(e,"mac").map((s,i)=>s.shown===r[i].shown):null;return r.length?uA("kbd",{"data-slot":"kbd-group","data-platform":a==="unknown"?void 0:a,className:O("inline-flex max-w-full flex-wrap items-center gap-1 font-[inherit]",t),...o,children:[r.map((s,i)=>n&&!n[i]?uc("kbd",{"data-slot":"kbd","data-placeholder":"","aria-hidden":!0,className:P1},i):uc("kbd",{"data-slot":"kbd","aria-hidden":!0,className:P1,children:s.shown},i)),a!=="unknown"&&uc("span",{className:"sr-only",children:r.map(s=>s.spoken).join(" ")})]}):null}import{jsx as Iee,jsxs as Cee}from"react/jsx-runtime";var xee=dA("default");import{Fragment as Dee,jsx as Nee,jsxs as Fee}from"react/jsx-runtime";import{Fragment as fA,jsx as lt,jsxs as Ca}from"react/jsx-runtime";var T1=e=>e.toLocaleString("en-US"),pA=e=>Object.fromEntries(Object.entries(e??{}).filter(([,t])=>t!==void 0)),mA={shell:"shell command",off:"Composer is off",shellPlaceholder:"Run a shell command",shellStatus:"Shell. Escape to leave",attach:"Attach files",attachments:"Attachments",drop:"Drop to attach",undo:"Undo",cancel:"Cancel",files:"Files and resources",commands:"Commands",searchCommands:"Search commands",noMatches:e=>`No matches for "${e}"`,results:e=>`${e} ${e===1?"result":"results"}`,types:xi,waiting:e=>`Waiting for ${e} ${e===1?"upload":"uploads"}`,held:e=>`Waiting for ${e} ${e===1?"upload":"uploads"}. Sends when they finish`,failed:e=>e.length===1?`${e[0]} failed. Remove or retry it`:`${e.length} files failed. Remove or retry them`,notSent:e=>`${e}. Not sent.`,removed:e=>`Removed ${e}`,expanded:e=>`Expanded ${e.replace(/^Pasted /,"the paste of ")}`,pasted:(e,t)=>e>=h1?`Pasted ${e} lines`:`Pasted ${T1(t)} characters`,clickToExpand:"Click to expand",textOnly:"This prompt takes text only",acceptOnly:e=>`Only ${e} can be attached here`,notAttached:(e,t)=>`Not attached: ${e.join(", ")}.${t?` Accepts ${t}`:""}`,tooLong:(e,t)=>`Too long to paste: ${T1(e)} characters, ${T1(t)} fit. Attach it as a file.`,waitingOnYou:e=>`${e} ${e===1?"call":"calls"} waiting on you`,review:"Review"};function $6({ref:e,onSubmit:t,onValueChange:o,defaultValue:a,draftKey:r,placeholder:n="Ask the agent to do something",layout:s="stacked",status:i="ready",onStop:l,generation:c,disabled:u,disabledReason:d,disabledAction:p,mentions:f=[],commands:m=[],shell:v=!1,mode:h,onModeChange:y,attachments:x=[],onAttach:g,onRemoveAttachment:b,onRetryAttachment:w,accept:C,maxLength:R=1e5,voice:I,tools:S,meta:M,queue:T,onEditQueued:V,onSendQueuedNow:F,waitingCount:L=0,onReviewWaiting:P,label:H="Prompt",labels:D,className:N,...A}){let E={...D,...mA,...pA(D),types:{...xi,...D?.types}},G=ze.useRef(E);G.current=E;let z=ze.useRef(null),oe=ze.useRef(null),X=ze.useRef(null),Z=ze.useRef(null),U=ze.useRef(new Map),ae=ze.useRef(!1),we=ze.useRef(null),j=ze.useRef(0),Y=ze.useRef([]),q=ze.useRef(null),re=ze.useRef(null),ge=ze.useRef(null),[ee,Me]=ze.useState(!0),[ne,J]=ze.useState(!1),[ce,ie]=ze.useState(null),[he,le]=ze.useState(0),[We,Oe]=ze.useState("normal"),[xe,$]=ze.useState(!1),[Q,Ee]=ze.useState(null),[ue,be]=ze.useState(!1),bt=ze.useId(),ct=ze.useId(),ut=ze.useId(),ot=h??We,yt=ze.useRef(ot);yt.current=ot;let Qo=k=>{yt.current=k,h===void 0&&Oe(k),y?.(k)},Ct=x.filter(k=>k.status==="uploading").length,kt=i==="submitted"||i==="streaming"||i==="stopping",Sa=Ct?E.waiting(Ct):void 0,Dt=x.filter(k=>k.status==="error"),Do=Dt.length?E.failed(Dt.map(k=>k.name)):void 0,Va=Sa??Do,ka=ze.useRef(null),ko=ze.useRef(null);ze.useLayoutEffect(()=>{let k=ko.current;if(k===null)return;ko.current=null;let K=document.activeElement;if(K&&K!==document.body&&K.isConnected&&!K.matches(":disabled"))return;let te=ka.current?.querySelectorAll('[role="listitem"]')??[],se=te[Math.min(k,te.length-1)]?.querySelectorAll("button:not(:disabled)");(se?.length?se[se.length-1]:z.current)?.focus()},[x]),ze.useEffect(()=>{kt||(ge.current=null,$(!1))},[kt]),ze.useEffect(()=>{ge.current=null,$(!1)},[c]);let Bo=ze.useCallback((k,K)=>Ee({id:Date.now(),text:k,undo:K}),[]);ze.useEffect(()=>{if(!Q)return;let k=setTimeout(()=>Ee(K=>K?.id===Q.id?null:K),Q.undo?6e3:4e3);return()=>clearTimeout(k)},[Q]);let nr=ze.useCallback(k=>{let te=oe.current?.querySelector(`[data-template="${k.type}"]`)?.cloneNode(!0)??document.createElement("span");te.removeAttribute("data-template"),te.removeAttribute("hidden"),te.contentEditable="false",te.dataset.mentionId=k.id,te.dataset.mentionType=k.type,te.dataset.mentionLabel=k.label,te.setAttribute("aria-label",`${G.current.types[k.type]} ${k.label}`),k.type==="paste"&&(te.title=`${(U.current.get(k.id)??"").slice(0,280)}

${G.current.clickToExpand}`);let se=te.querySelector('[data-slot="mention-label"]')??te;return se.textContent=`${k.type==="command"?"/":""}${k.label}`,te},[]),_e=ze.useCallback(k=>{let K=document.createDocumentFragment();for(let te of Pm(k))te.kind==="text"?K.append(document.createTextNode(te.text)):(te.mention.type!=="paste"||U.current.has(te.mention.id))&&K.append(nr(te.mention));return K},[nr]),Rt=ze.useCallback(()=>{let{text:k,serialized:K,codec:te,mentions:se}=Ii(z.current??document.createElement("div"),U.current);return{text:k.replace(/\s+$/,""),serialized:K.replace(/\s+$/,""),codec:te,mentions:se,mode:yt.current}},[]),Ie=ze.useCallback(k=>{r&&(re.current&&clearTimeout(re.current),re.current=setTimeout(()=>{re.current=null;try{let K=vi+r;k.trim()?localStorage.setItem(K,JSON.stringify({codec:k,mode:yt.current,pastes:[...U.current]})):localStorage.removeItem(K)}catch{}},200))},[r]),Re=ze.useCallback(()=>{j.current+=1,Ee(se=>se?.undo?null:se);let k=Rt();Me(!k.text.trim()&&k.mentions.length===0),Ie(k.codec);let{codec:K,...te}=k;o?.(te)},[Rt,o,Ie]),Ke=ze.useCallback(k=>{let K=z.current;if(!K)return;let te=window.getSelection(),se;te?.rangeCount&&K.contains(te.getRangeAt(0).commonAncestorContainer)?se=te.getRangeAt(0):q.current&&K.contains(q.current.commonAncestorContainer)?se=q.current:(se=document.createRange(),se.selectNodeContents(K),se.collapse(!1));let dt=k.lastChild;se.deleteContents(),se.insertNode(k),dt&&(se.setStartAfter(dt),se.collapse(!0),te?.removeAllRanges(),te?.addRange(se)),Re()},[Re]),Tt=ze.useCallback(()=>{z.current?.replaceChildren(),U.current.clear(),Y.current=[],ie(null),re.current&&(clearTimeout(re.current),re.current=null);try{r&&localStorage.removeItem(vi+r)}catch{}j.current+=1,Me(!0),be(!1),o?.({text:"",serialized:"",mentions:[],mode:ot})},[r,ot,o]);ze.useImperativeHandle(e,()=>({focus:()=>z.current?.focus(),clear:Tt,insert:k=>{z.current?.focus(),Ke(_e(k))},getValue:()=>{let{codec:k,...K}=Rt();return K}}),[Tt,_e,Ke,Rt]),ze.useEffect(()=>{let k=z.current;if(!k)return;let K=a;try{let te=r?localStorage.getItem(vi+r):null;if(te){let se=JSON.parse(te);typeof se.codec=="string"&&(K=se.codec);for(let[dt,et]of se.pastes??[])U.current.set(dt,et);se.mode==="shell"&&v&&Qo("shell")}}catch{try{r&&localStorage.removeItem(vi+r)}catch{}}K&&(k.replaceChildren(_e(K)),Re())},[]),ze.useEffect(()=>()=>{if(!(!re.current||!r||!z.current)){clearTimeout(re.current);try{let{codec:k}=Ii(z.current,U.current);k.trim()&&localStorage.setItem(vi+r,JSON.stringify({codec:k,mode:yt.current,pastes:[...U.current]}))}catch{}}},[r]);let la=k=>{let K=k.parentNode,te=k.nextSibling;if(!K)return;let se=k.dataset.mentionLabel??"chip",dt=k.previousSibling,et=k.nextSibling,pt=null;dt instanceof Text&&et instanceof Text&&dt.data.endsWith(" ")&&et.data.startsWith(" ")&&(pt={node:et,text:et.data},et.data=et.data.slice(1)),k.remove(),te&&te.parentNode===K?Ci("before",te):R1(K),Re();let It=j.current,_a=()=>{pt&&(pt.node.data=pt.text),te&&te.parentNode===K?K.insertBefore(k,te):K.appendChild(k),Ci("after",k),Re(),Ee(null)};Y.current.push({version:It,restore:_a}),Bo(E.removed(se),_a)},ha=()=>{let k=Y.current.at(-1);return!k||k.version!==j.current?(Y.current=[],!1):(Y.current.pop(),k.restore(),!0)},wt=ze.useMemo(()=>{if(!ce)return[];let k=ce.query.toLowerCase(),K=te=>k6(te,k);return ce.kind==="@"?f.filter(te=>te.label.toLowerCase().includes(k)).sort((te,se)=>K(te.label)-K(se.label)).slice(0,8).map(te=>({key:`${te.type}:${te.id}`,mention:{id:te.id,type:te.type,label:te.label},detail:te.detail})):m.filter(te=>te.label.toLowerCase().includes(k)).sort((te,se)=>K(te.label)-K(se.label)).slice(0,8).map(te=>({key:`command:${te.id}`,mention:{id:te.id,type:"command",label:te.label},description:te.description}))},[ce,f,m]),_o=ze.useCallback(()=>{let k=z.current,K=window.getSelection();ae.current||ie(te=>{if(te?.kind==="commands")return te;if(!k||!K?.rangeCount||!K.isCollapsed||ot==="shell")return null;let se=K.anchorNode;if(!(se instanceof Text)||!k.contains(se))return null;let dt=se.data.slice(0,K.anchorOffset),et=dt.match(/(?:^|[\s ])([@/])([^\s@/]{0,40})$/),pt=et?.[1];if(!et||!pt||pt==="@"&&!f.length)return null;if(pt==="/"){let Pg=Ii(k,U.current).codec.trim();if(!m.length||!/^\/[^\s@/]*$/.test(Pg))return null}let It=dt.length-et[2].length-1;if(we.current?.node===se&&we.current.start===It)return null;let _a=document.createRange();_a.setStart(se,It),_a.setEnd(se,It+1);let _s=_a.getBoundingClientRect();return!_s.width&&!_s.height&&(_s=k.getBoundingClientRect()),(!te||te.node!==se||te.start!==It||te.kind!==pt)&&le(0),{kind:pt,query:et[2],node:se,start:It,rect:_s}})},[f.length,m.length,ot]),vr=()=>{let k=z.current;if(!k||!m.length)return;let K=window.getSelection();K?.rangeCount&&k.contains(K.anchorNode)&&(q.current=K.getRangeAt(0).cloneRange()),le(0),ie({kind:"commands",query:"",node:null,start:0,rect:k.getBoundingClientRect()}),requestAnimationFrame(()=>Z.current?.focus())},sr=(k=!1)=>{ce?.node&&(we.current={node:ce.node,start:ce.start});let K=ce?.kind==="commands";ie(null),(k||K)&&(z.current?.focus(),q.current&&(window.getSelection()?.removeAllRanges(),window.getSelection()?.addRange(q.current)))},Ba=k=>{let K=z.current;if(!ce||!K)return;let te=Ii(K,U.current).mentions,se={...k.mention,label:k.mention.type==="command"?k.mention.label:p6(k.mention,te)},dt=nr(se),et=document.createTextNode(" ");if(ce.kind==="commands"){K.prepend(dt,et),ie(null),K.focus(),R1(K),q.current=null,Re();return}let pt=window.getSelection();if(!ce.node||!pt)return;let It=document.createRange();It.setStart(ce.node,ce.start),It.setEnd(ce.node,Math.min(ce.node.length,pt.anchorNode===ce.node?pt.anchorOffset:ce.start+1+ce.query.length)),It.deleteContents(),It.insertNode(et),It.insertNode(dt),It.setStart(et,1),It.collapse(!0),pt.removeAllRanges(),pt.addRange(It),ie(null),Re()},ir=!!ce;ze.useEffect(()=>{if(!ir)return;let k=()=>{if(ce?.kind==="commands"){let K=z.current?.getBoundingClientRect();K&&ie(te=>te&&{...te,rect:K})}else _o()};return window.addEventListener("resize",k),window.addEventListener("scroll",k,!0),()=>{window.removeEventListener("resize",k),window.removeEventListener("scroll",k,!0)}},[ir,ce?.kind,_o]);let Yn=x.some(k=>k.status==="done"),fn=!u&&!Ct&&!Dt.length&&(!ee||Yn),Hs=()=>{if(u)return;if(Dt.length){Bo(E.notSent(Do));return}if(Ct){(!ee||Yn)&&be(!0);return}if(!fn)return;let{codec:k,...K}=Rt();t?.(K,x.filter(te=>te.status==="done")),Tt(),ot==="shell"&&Qo("normal")};ze.useEffect(()=>{if(ue){if(u){be(!1);return}if(Dt.length){be(!1),Bo(E.notSent(Do));return}Ct||(be(!1),Hs())}});let gn=()=>{let k=c??"current";ge.current!==k&&(ge.current=k,$(!0),l?.(c))},Ir=k=>{k.preventDefault(),k.stopPropagation(),k.nativeEvent.stopImmediatePropagation()},Vs=k=>{if(!Am(k)){if(ce&&ce.kind!=="commands"){let K=wt.length,te=k.key==="ArrowDown"||k.ctrlKey&&k.key==="n",se=k.key==="ArrowUp"||k.ctrlKey&&k.key==="p";if(te&&K){k.preventDefault(),le(dt=>(dt+1)%K);return}if(se&&K){k.preventDefault(),le(dt=>(dt-1+K)%K);return}if((k.key==="Enter"||k.key==="Tab")&&K){k.preventDefault(),Ba(wt[Math.min(he,K-1)]);return}if(k.key==="Escape"){Ir(k),sr();return}}if((k.metaKey||k.ctrlKey)&&!k.shiftKey&&k.key.toLowerCase()==="z"&&ha()){k.preventDefault();return}if(k.key==="Escape"){if(ot==="shell"){Ir(k),Qo("normal");return}if(ue){Ir(k),be(!1);return}if(kt){Ir(k),gn();return}k.preventDefault(),z.current?.blur();return}if(k.key==="Enter"&&!k.shiftKey){if(k.preventDefault(),k.repeat)return;if(ee&&!Yn&&kt&&F){F();return}Hs();return}if(k.key==="Enter"&&k.shiftKey){k.preventDefault(),document.execCommand("insertLineBreak")||Ke(_e(`
`));return}if(k.key==="ArrowUp"&&ee&&!x.length&&V&&!k.altKey&&!k.metaKey&&V()){k.preventDefault();return}if(k.key==="Backspace"&&!k.metaKey&&!k.altKey){if(ee&&ot==="shell"){k.preventDefault(),Qo("normal");return}let K=Nm(z.current,"back");if(K){k.preventDefault(),la(K);return}}if(k.key==="Delete"){let K=Nm(z.current,"forward");if(K){k.preventDefault(),la(K);return}}if((k.key==="ArrowLeft"||k.key==="ArrowRight")&&!k.shiftKey&&!k.altKey&&!k.metaKey){let K=getComputedStyle(z.current).direction==="rtl",te=k.key==="ArrowLeft"!==K,se=Nm(z.current,te?"back":"forward");if(se){k.preventDefault(),Ci(te?"before":"after",se);return}}if(k.key==="!"&&v&&ot==="normal"&&ee){k.preventDefault(),Qo("shell");return}if(k.key==="/"&&!ee&&m.length&&ot==="normal"){let K=window.getSelection(),te=z.current;if(K?.rangeCount&&te){let se=document.createRange();se.setStart(te,0),se.setEnd(K.anchorNode,K.anchorOffset),!se.toString().trim()&&!se.cloneContents().querySelector("[data-mention-id]")&&(k.preventDefault(),vr())}}}},Cr=(k,K=!1)=>{let te=window.getSelection();if(!te?.rangeCount||te.isCollapsed)return;let se=te.getRangeAt(0),dt=document.createElement("div");dt.append(se.cloneContents());let{serialized:et,codec:pt}=Ii(dt,U.current),It=[...U.current].filter(([_a])=>pt.includes(`(paste:${m1(_a)})`));k.preventDefault(),k.clipboardData.setData("text/plain",et),k.clipboardData.setData(g1,JSON.stringify({codec:pt,pastes:It})),K&&(se.deleteContents(),Re())},Wi=k=>{if(!k.length)return;if(!g){Bo(E.textOnly);return}let K=k.filter(se=>zm(se,C)),te=k.filter(se=>!zm(se,C));te.length&&Bo(E.notAttached(te.map(se=>se.name),C)),K.length&&g(K)},Eg=k=>{k.preventDefault();let K=Array.from(k.clipboardData.files);Wi(K);let te=k.clipboardData.getData(g1);if(te)try{let{codec:et,pastes:pt}=JSON.parse(te);for(let[It,_a]of pt??[])U.current.set(It,_a);Ke(_e(et));return}catch{}let se=k.clipboardData.getData("text/plain").replace(/\r\n?/g,`
`);if(!se)return;let dt=Rt().text.length;if(dt+se.length>R){Bo(E.tooLong(se.length,Math.max(0,R-dt)));return}if(ot!=="shell"&&(b1(se)>=h1||se.length>=h6)&&!Pm(se).some(et=>et.kind==="mention")){let et=`p${Date.now().toString(36)}${U.current.size}`;U.current.set(et,se);let pt=document.createDocumentFragment();pt.append(nr({id:et,type:"paste",label:E.pasted(b1(se),se.length)}),document.createTextNode(" ")),Ke(pt);return}if(Pm(se).some(et=>et.kind==="mention")){Ke(_e(se));return}if(!document.execCommand("insertText",!1,se)){let et=document.createDocumentFragment();et.append(se),Ke(et)}},Xn=k=>{let K=k.target.closest('[data-mention-type="paste"]');if(K&&z.current?.contains(K)){let te=U.current.get(K.dataset.mentionId??"")??"",se=document.createTextNode(te);K.replaceWith(se),Ci("after",se),Re();let dt=()=>{se.parentNode&&(se.replaceWith(K),Ci("after",K),Re(),Ee(null))};Y.current.push({version:j.current,restore:dt}),Bo(E.expanded(K.dataset.mentionLabel??""),dt);return}_o()},{dragging:Rr,dropProps:qi}=y6(!!g&&!u,k=>Wi(k),C),Gc=u?"disabled":ot==="shell"?"shell":kt?"working":Ct?"uploading":Dt.length?"blocked":ee?"empty":"typing",ji=L>0?E.waitingOnYou(L):void 0,ca=Q?.text??(ot==="shell"?E.shellStatus:ue&&Ct?E.held(Ct):Va??ji),Ki=!!ji&&ca===ji,Yi=kt&&xe?"stopping":i,hn=s==="inline",Ma=ot==="shell",Uc=g&&Ca(fA,{children:[lt(at,{size:"icon-sm",variant:"ghost","aria-label":E.attach,disabled:u,onClick:()=>X.current?.click(),children:lt(Fe,{icon:Rw,size:12})}),lt("input",{ref:X,type:"file",multiple:!0,hidden:!0,accept:C,tabIndex:-1,onChange:k=>{Wi(Array.from(k.target.files??[])),k.target.value=""}})]}),$c=Ca("p",{id:ut,role:"status","data-slot":"prompt-input-status",className:O("flex min-w-0 items-center gap-1.5 type-caption text-text-2 empty:hidden",!hn&&"order-last basis-full px-2 @sm/prompt-toolbar:order-none @sm/prompt-toolbar:basis-auto @sm/prompt-toolbar:shrink",hn&&"flex-1",!ca&&"hidden",Ki&&"text-text-1",!!Do&&ca===Do&&"text-fail-text"),children:[Ma&&!Q&&lt(Fe,{icon:$w,size:12,className:"shrink-0"}),ca&&lt("span",{className:"min-w-0 truncate",title:ca,children:ca}),Ki&&P&&lt(at,{variant:"ghost",size:"sm","data-slot":"prompt-input-review",onClick:P,children:E.review}),Q?.undo&&lt(at,{variant:"ghost",size:"sm",onClick:Q.undo,children:E.undo}),!Q&&ue&&Sa&&lt(at,{variant:"ghost",size:"sm","data-slot":"prompt-input-cancel-held",onClick:()=>{be(!1),z.current?.focus()},children:E.cancel})]}),Xi=lt(g6,{status:Yi,generation:c,empty:!fn&&!Va,blockedReason:u?void 0:Va,disabled:u,onStop:gn,onClick:Hs,type:"button",labels:E}),Qi=k=>lt("div",{inert:Ma,"data-slot":"prompt-input-tools",className:O("flex min-w-0 items-center gap-1 empty:hidden",Ma&&"opacity-40",k),children:S}),Bs=Ca("div",{className:"relative min-w-0 flex-1",children:[ee&&lt("span",{"aria-hidden":!0,"data-slot":"prompt-input-placeholder",className:O("pointer-events-none absolute inset-x-0 top-0 truncate text-text-3 select-none",Ma?"type-code":"type-body"),children:u?E.off:Ma?E.shellPlaceholder:n}),lt("div",{ref:z,role:"textbox","aria-multiline":!0,"aria-haspopup":"listbox","aria-autocomplete":"list","aria-label":Ma?`${H}, ${E.shell}`:H,"aria-placeholder":n,"aria-disabled":u||void 0,"aria-describedby":[u&&d?ct:"",ca?ut:""].filter(Boolean).join(" ")||void 0,"aria-controls":ce&&ce.kind!=="commands"?bt:void 0,"aria-activedescendant":ce&&ce.kind!=="commands"&&wt.length?`${bt}-${Math.min(he,wt.length-1)}`:void 0,"aria-keyshortcuts":"Enter Shift+Enter Escape",contentEditable:!u,suppressContentEditableWarning:!0,tabIndex:u?-1:0,spellCheck:!Ma,autoCapitalize:Ma?"off":void 0,autoCorrect:Ma?"off":void 0,"data-slot":"prompt-input-editor","data-control":"",onInput:()=>{Re(),_o()},onKeyDown:Vs,onKeyUp:k=>{(!["ArrowDown","ArrowUp","Enter","Tab","Escape"].includes(k.key)||!ce)&&_o()},onClick:Xn,onCompositionStart:()=>{ae.current=!0},onCompositionEnd:()=>{ae.current=!1,_o()},onFocus:()=>J(!0),onBlur:k=>{J(!1),ce?.kind!=="commands"&&!k.relatedTarget?.closest('[data-slot="prompt-input-menu"]')&&ie(null)},onCopy:k=>Cr(k),onCut:k=>Cr(k,!0),onPaste:Eg,className:O(hn?"max-h-40":"max-h-60 min-h-11","overflow-y-auto overscroll-contain break-words whitespace-pre-wrap text-text-1 outline-none",Ma?"type-code":"type-body","[&_[data-slot=mention]]:mx-px [&_[data-mention-type=paste]]:cursor-pointer",u&&"cursor-not-allowed text-text-disabled")})]}),Pe=Ma&&lt("span",{"aria-hidden":!0,"data-slot":"prompt-input-shell",className:"type-code text-text-3 select-none",children:"$"});return Ca("div",{"data-slot":"prompt-input","data-state":Gc,"data-mode":ot,"data-layout":s,"data-held":ue||void 0,"data-dragging":Rr||void 0,"data-focused":ne||void 0,className:O("group/prompt shell relative w-full text-text-1 forced-colors:border-[CanvasText]",N),...qi,...A,children:[lt("div",{ref:oe,hidden:!0,"aria-hidden":!0,children:Object.keys(xi).map(k=>lt(m6,{type:k,"data-template":k,className:"mx-px",children:"x"},k))}),T&&lt("div",{"data-slot":"prompt-input-queue",className:"mb-(--shell-inset) min-w-0 empty:hidden",children:T}),Ca("div",{"data-slot":"prompt-input-panel",className:O("panel relative flex min-w-0 flex-col transition-[border-color,background-color] duration-(--dur-state) ease-out","group-data-focused/prompt:border-line-focus group-data-force-focus/prompt:border-line-focus group-data-[mode=shell]/prompt:bg-field group-data-[state=disabled]/prompt:bg-field","forced-colors:border-[CanvasText]"),children:[u&&d&&Ca("div",{id:ct,"data-slot":"prompt-input-reason",className:"flex min-h-(--row) flex-wrap items-center gap-x-3 gap-y-1 py-1 ps-3 pe-1 rule-row",children:[lt("span",{className:"min-w-0 flex-1 type-body-sm break-words text-text-1",children:d}),lt("span",{className:"ms-auto empty:hidden",children:p})]}),x.length>0&&lt("div",{ref:ka,"data-slot":"prompt-input-attachments",role:"list","aria-label":E.attachments,className:"flex flex-wrap gap-1.5 p-1.5 rule-row",children:x.map((k,K)=>lt("div",{role:"listitem",className:"max-w-full min-w-0",children:lt(w6,{attachment:k,labels:E,onRemove:b?()=>{ko.current=K,b(k.id)}:void 0,onRetry:w?()=>{ko.current=K,w(k.id)}:void 0})},k.id))}),hn&&lt("div",{className:O("flex min-h-(--control-sm) items-center px-3 rule-row",!ca&&"hidden"),children:$c}),hn?Ca("div",{"data-slot":"prompt-input-body",className:"@container/prompt-toolbar flex min-w-0 items-end gap-1 p-1",children:[Uc,Ca("div",{className:"flex min-h-(--control-sm) min-w-0 flex-1 items-center gap-1.5 px-1.5",children:[Pe,Bs]}),Qi("h-(--control-sm) shrink-0"),M&&lt("div",{"data-slot":"prompt-input-meta",className:"flex h-(--control-sm) shrink-0 items-center",children:M}),I&&lt(w1,{size:"sm",...I,disabled:u||I.disabled}),Xi]}):Ca("div",{"data-slot":"prompt-input-body",className:"flex min-w-0 gap-1.5 px-3 pt-2.5 pb-2",children:[Pe,Bs]})]}),!hn&&Ca("div",{"data-slot":"prompt-input-toolbar",className:"@container/prompt-toolbar flex min-h-(--control-sm) min-w-0 flex-wrap items-center gap-1 pt-(--shell-inset)",children:[Uc,Qi("flex-1 basis-0 overflow-x-auto [scrollbar-width:none]"),!S&&lt("span",{"aria-hidden":!0,className:"flex-1"}),$c,Ca("div",{className:"ms-auto flex shrink-0 items-center gap-1",children:[M&&lt("div",{"data-slot":"prompt-input-meta",className:"shrink-0",children:M}),I&&lt(w1,{size:"sm",...I,disabled:u||I.disabled}),Xi]})]}),Rr&&Ca("div",{"data-slot":"prompt-input-drop","data-status":Rr==="reject"?"fail":void 0,"aria-hidden":!0,className:"pointer-events-none absolute inset-0 z-(--z-raised) flex flex-col items-start gap-1 rounded-shell border border-line-focus bg-paper px-4 py-3 data-[status=fail]:border-fail data-[status=fail]:bg-fail-tint",children:[lt("span",{className:"type-label text-text-1",children:E.drop}),Rr==="reject"&&lt("span",{className:"type-body-sm text-fail-text",children:C?E.acceptOnly(u6(C)):E.textOnly})]}),lt("span",{className:"sr-only","aria-live":"polite",children:ce?E.results(wt.length):""}),ce&&lt(M6,{id:bt,menu:ce,options:wt,active:Math.min(he,Math.max(0,wt.length-1)),onHover:le,onPick:Ba,title:ce.kind==="@"?E.files:E.commands,empty:E.noMatches(ce.query),typeLabel:k=>E.types[k.mention.type],search:ce.kind==="commands"&&Ca("label",{className:"flex min-h-(--control) items-center gap-2 px-3 text-text-3 rule-row has-[input:focus-visible]:text-text-2",children:[lt(Fe,{icon:l0,size:14}),lt("input",{ref:Z,role:"combobox","aria-expanded":!0,"aria-controls":bt,"aria-activedescendant":wt.length?`${bt}-${Math.min(he,wt.length-1)}`:void 0,"aria-label":E.searchCommands,placeholder:E.searchCommands,"data-control":"",value:ce.query,onChange:k=>{le(0),ie(K=>K&&{...K,query:k.target.value})},onBlur:k=>{k.relatedTarget?.closest('[data-slot="prompt-input-menu"]')||ie(null)},onKeyDown:k=>{if(Am(k))return;let K=wt.length;k.key==="ArrowDown"&&K&&(k.preventDefault(),le(te=>(te+1)%K)),k.key==="ArrowUp"&&K&&(k.preventDefault(),le(te=>(te-1+K)%K)),(k.key==="Enter"||k.key==="Tab")&&K&&(k.preventDefault(),Ba(wt[Math.min(he,K-1)])),k.key==="Escape"&&(Ir(k),sr(!0))},className:"h-(--control) min-w-0 flex-1 bg-transparent type-body-sm text-text-1 outline-none placeholder:text-text-3"})]})})]})}function W6({model:e,children:t,className:o,...a}){return Ca(at,{"data-slot":"prompt-input-model",variant:"ghost",size:"sm","aria-label":`Model, ${e}`,className:O("gap-1 text-text-2",o),...a,children:[t??e,lt(Fe,{icon:kw,size:12})]})}var Pi={};ua(Pi,{Fallback:()=>X6,Image:()=>Y6,Root:()=>q6});import*as Mi from"react";import*as Gm from"react";var A1=Gm.createContext(void 0);function Um(){let e=Gm.useContext(A1);if(e===void 0)throw new Error(He(13));return e}var ki={imageLoadingStatus:()=>null};import{jsx as gA}from"react/jsx-runtime";var q6=Mi.forwardRef(function(t,o){let{className:a,render:r,style:n,...s}=t,[i,l]=Mi.useState("idle"),c={imageLoadingStatus:i},u=Mi.useMemo(()=>({imageLoadingStatus:i,setImageLoadingStatus:l}),[i,l]),d=me("span",t,{state:c,ref:o,props:s,stateAttributesMapping:ki});return gA(A1.Provider,{value:u,children:d})});import*as pc from"react";import*as j6 from"react";function K6(e,{referrerPolicy:t,crossOrigin:o,sizes:a,srcSet:r},n){let s=j6.useState("idle"),i=s[1];return B(()=>{if(!n)return Be;if(!e&&!r)return i("error"),Be;let l=!0,c=new window.Image,u=d=>()=>{l&&i(d)};return i("loading"),c.onload=u("loaded"),c.onerror=u("error"),t&&(c.referrerPolicy=t),c.crossOrigin=o??null,a&&(c.sizes=a),r&&(c.srcset=r),e&&(c.src=e),c.complete&&i(c.naturalWidth>0?"loaded":"error"),()=>{l=!1}},[n,e,r,a,o,t,i]),s}var hA={...ki,...Ka},Y6=pc.forwardRef(function(t,o){let{className:a,render:r,onLoadingStatusChange:n,keepMounted:s=!1,style:i,sizes:l,srcSet:c,src:u,...d}=t,{setImageLoadingStatus:p}=Um(),[f,m]=K6(u,t,!s),v=f==="loaded",{mounted:h,transitionStatus:y,setMounted:x}=ja(v),g=pc.useRef(null),b=pc.useRef(!0);B(()=>{if(!s)return;let T=b.current;b.current=!1;let V=g.current;if(!V)return;if(!V.complete){m("loading");return}let F=V.naturalWidth>0?"loaded":"error";m(F),F==="loaded"&&T&&x(!0)},[s,u,c,l,d.crossOrigin,d.referrerPolicy,r,m,x]);let w=s?{"data-loading":f==="loading"?"":void 0,"data-error":f==="error"?"":void 0,"aria-hidden":f!=="loaded"||void 0,onLoad(){m("loaded")},onError(){m("error")}}:void 0,C=W(T=>{n?.(T),p(T)});B(()=>{f!=="idle"&&C(f)},[f,C]),B(()=>()=>p("idle"),[p]),oa({enabled:!v,open:v,ref:g,onComplete(){v||x(!1)}});let R={imageLoadingStatus:f,transitionStatus:s&&y==="ending"?void 0:y},I=s||h,S={};l!==void 0&&(S.sizes=l),c!==void 0&&(S.srcSet=c),u!==void 0&&(S.src=u);let M=me("img",t,{state:R,ref:[o,g],props:[w,d,S],stateAttributesMapping:hA,enabled:I});return I?M:null});import*as Ei from"react";var X6=Ei.forwardRef(function(t,o){let{className:a,render:r,delay:n=0,style:s,...i}=t,{imageLoadingStatus:l}=Um(),[c,u]=Ei.useState(n===0),d=it();return Ei.useEffect(()=>(n>0?d.start(n,()=>u(!0)):u(!0),d.clear),[d,n]),me("span",t,{state:{imageLoadingStatus:l},ref:o,props:i,stateAttributesMapping:ki,enabled:l!=="loaded"&&(n===0||c)})});import{Children as zte,createContext as bA,isValidElement as Lte,useContext as yA}from"react";import{Fragment as CA,jsx as ln,jsxs as RA}from"react/jsx-runtime";var wA=rt(["group/avatar relative inline-flex shrink-0 select-none",'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-line after:content-[""]'],{variants:{size:{xs:"size-4",sm:"size-5",default:"size-6",lg:"size-8"},type:{person:"rounded-pill",agent:"rounded-tag",source:"rounded-tag"}},defaultVariants:{size:"default",type:"person"}});function xA(e,t="default"){let a=e.replace(/^(https?:\/\/)?(www\.)?/i,"").split("@")[0].split(/[\s._\-/]+/).map(r=>r.match(/[\p{L}\p{N}]/gu)?.join("")??"").filter(Boolean);return a.length?t==="xs"||t==="sm"?[...a[0]][0].toUpperCase():a.length===1?[...a[0]].slice(0,2).join("").toUpperCase():([...a[0]][0]+[...a[a.length-1]][0]).toUpperCase():""}var Q6={xs:12,sm:12,default:14,lg:16},J6=bA({type:"person",size:"default"});function e4({className:e,size:t="default",type:o="person",name:a,src:r,decorative:n,children:s,...i}){let l=t??"default",c=o??"person",u=!!a&&!n;return ln(J6.Provider,{value:{type:c,size:l},children:ln(Pi.Root,{"data-slot":"avatar","data-size":l,"data-type":c,role:u?"img":void 0,"aria-label":u?a:void 0,"aria-hidden":n||void 0,className:Mt(wA({size:l,type:c}),e),...i,children:s??RA(CA,{children:[r&&ln(vA,{src:r,alt:"",referrerPolicy:c==="source"?"no-referrer":void 0}),ln(z1,{children:a&&c==="person"&&xA(a,l)||void 0})]})})})}function vA({className:e,...t}){return ln(Pi.Image,{"data-slot":"avatar-image",decoding:"async",draggable:!1,className:Mt("aspect-square size-full rounded-[inherit] object-cover group-data-[type=source]/avatar:object-contain",e),...t})}function z1({className:e,children:t,...o}){return ln(Pi.Fallback,{"data-slot":"avatar-fallback",className:Mt(["flex size-full items-center justify-center overflow-hidden rounded-[inherit] bg-field pe-(--avatar-covered) type-label-sm leading-none text-text-1","group-data-[type=agent]/avatar:text-text-2 group-data-[type=source]/avatar:text-text-2 group-data-[size=lg]/avatar:type-label","forced-colors:border forced-colors:border-[CanvasText]"],e),...o,children:t??ln(IA,{})})}function IA(){let{type:e,size:t}=yA(J6);return e==="source"?ln(Fe,{icon:Hw,size:Q6[t]}):e==="agent"?ln(Fe,{icon:Sw,size:Q6[t]}):null}import{useEffect as Rz,useRef as eC,useState as Sz}from"react";import{useEffect as SA,useRef as _te,useState as kA}from"react";var hr="None",cn="No data in this range",L1=[{unit:"ms",size:1},{unit:"s",size:1e3},{unit:"min",size:6e4},{unit:"h",size:36e5}],N1=[{unit:"",size:1},{unit:"k",size:1e3},{unit:"M",size:1e6},{unit:"B",size:1e9}],t4=e=>e.reduce((t,o)=>Number.isFinite(o)?Math.max(t,Math.abs(o)):t,0),MA=(e,t)=>Number(e.toFixed(t));function F1(e,t){let o=e.toFixed(t);return/^-0(\.0+)?$/.test(o)?o.slice(1):o}function o4(e,t,o,a){let r=0;for(;r<t.length-1&&e>=o(r+1);)r++;for(;r<t.length-1&&MA(e/t[r].size,a(r))*t[r].size>=o(r+1);)r++;return r}function a4(e,t=1){let o=r=>r===0?0:t,a=o4(t4(e),L1,r=>L1[r].size,o);return{...L1[a],digits:o(a)}}function r4(e,t=1){let o=r=>r===0?0:t,a=o4(t4(e),N1,r=>N1[r].size*10,o);return{...N1[a],digits:o(a)}}function n4(e,t,o){if(!e||typeof getComputedStyle>"u")return o;let r=getComputedStyle(e).getPropertyValue(t).trim().match(/^(-?[\d.]+)(px|ms|s)?$/);if(!r)return o;let n=parseFloat(r[1]);return r[2]==="s"?n*1e3:n}function $m(e,t=!0){let[o,a]=kA(!1);return SA(()=>{let r=e.current;if(!r||!t){a(!1);return}let n=()=>a(r.scrollWidth>r.clientWidth+1||r.scrollHeight>r.clientHeight+1),s=new ResizeObserver(n),i=()=>{s.disconnect(),s.observe(r);for(let c of r.children)s.observe(c);n()},l=new MutationObserver(i);return l.observe(r,{childList:!0}),i(),()=>{s.disconnect(),l.disconnect()}},[e,t]),o?0:void 0}import{createContext as ZA,useContext as GA,useId as UA,useLayoutEffect as $A,useRef as W1,useState as WA}from"react";var Qm={};ua(Qm,{Indicator:()=>g4,Root:()=>f4});import*as un from"react";var s4="data-checked",i4="data-unchecked";var mc={checked(e){return e?{[s4]:""}:{[i4]:""}},...Ka,...Dm};var fc="data-composite-item-active";import*as c4 from"react";import*as Ms from"react";import*as Wm from"react";var D1=Wm.createContext({register:()=>{},unregister:()=>{},subscribeMapChange:()=>()=>{},nextIndexRef:{current:0}});function qm(){return Wm.useContext(D1)}function rr(e={}){let{guess:t,label:o,metadata:a,textRef:r,index:n}=e,{register:s,unregister:i,subscribeMapChange:l,nextIndexRef:c}=qm(),u=Ms.useRef(-1),[d,p]=Ms.useState(n==null&&t?()=>{if(u.current===-1){let h=c.current;c.current+=1,u.current=h}return u.current}:-1),f=n??d,m=Ms.useRef(null),v=Ms.useCallback(h=>{let y=m.current;y&&i(y),m.current=h,h&&s(h,{metadata:a??null,index:n??null,label:o,textRef:r})},[n,s,i,a,o,r]);return B(()=>{if(n==null)return l(h=>{let y=m.current?h.get(m.current)?.index:null;y!=null&&p(y)})},[n,l]),{ref:v,index:f}}function u4(e={}){let{highlightItemOnHover:t,highlightedIndex:o,onHighlightedIndexChange:a}=Ys(),{ref:r,index:n}=rr(e),s=o===n,i=c4.useRef(null),l=Ht(r,i);return{compositeProps:{tabIndex:s?0:-1,onFocus(){a(n)},onMouseMove(){let u=i.current;if(!t||!u)return;let d=u.hasAttribute("disabled")||u.ariaDisabled==="true";!s&&!d&&u.focus()}},compositeRef:l,index:n}}function Ti(e){let{render:t,className:o,style:a,state:r=Le,props:n=Nt,refs:s=Nt,metadata:i,stateAttributesMapping:l,tag:c="div",...u}=e,{compositeProps:d,compositeRef:p}=u4({metadata:i});return me(c,e,{state:r,ref:[p,...s],props:[d,...n,u],stateAttributesMapping:l})}import*as jm from"react";var O1=jm.createContext(void 0);function d4(){return jm.useContext(O1)}function Km(e){if(e==null)return"";if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}import*as Ym from"react";var H1=Ym.createContext(void 0);function p4(){let e=Ym.useContext(H1);if(e===void 0)throw new Error(He(52));return e}import{jsx as m4,jsxs as EA}from"react/jsx-runtime";var f4=un.forwardRef(function(t,o){let{render:a,className:r,disabled:n=!1,readOnly:s=!1,required:i=!1,"aria-labelledby":l,value:c,inputRef:u,nativeButton:d=!1,id:p,style:f,...m}=t,v=d4(),{disabled:h,readOnly:y,required:x,form:g,checkedValue:b,touched:w=!1,validation:C,name:R,setCheckedValue:I=Be,setTouched:S=Be,registerInputRef:M=Be}=v??{},{setTouched:T,setFilled:V,state:F,disabled:L}=Hn(),P=O6(),{labelId:H,getDescriptionProps:D}=Ri(),N=L||P.disabled||h||n,A=y||s,E=x||i,G=g,z=v?b===c:c==="",oe=un.useRef(null),X=H6(N,oe),Z=un.useRef(null),U=C?.registerInput,ae=un.useCallback(Oe=>U?.(Oe,{controlRef:oe,value:void 0}),[U]),we=Ht(u,Z,M,ae);B(()=>{Z.current?.checked&&V(!0)},[V]),B(()=>{if(Z.current){if(N&&z){M(null);return}M(Z.current)}},[z,N,M]);let j=tt(),Y=F6({id:p}),q=d?void 0:Y,re=N6(l,H,Z,!d,q,m["aria-label"]),ge={role:"radio","aria-checked":z,"aria-labelledby":re,[fc]:z?"":void 0,id:d?Y:j,onKeyDown(Oe){Oe.key==="Enter"&&Oe.preventDefault()},onClick(Oe){if(Oe.defaultPrevented||N||A)return;Oe.preventDefault();let xe=Z.current;xe&&Lr(xe,Oe)},onFocus(Oe){X(!0),!(Oe.defaultPrevented||N||A||!w)&&(Z.current?.click(),S(!1))},onBlur(){v||X(!1)}},{getButtonProps:ee,buttonRef:Me}=Go({disabled:N,native:d,composite:!1}),ne={type:"radio",ref:we,form:G,id:q,name:R,tabIndex:-1,style:R?Dv:Ep,"aria-hidden":!0,...c!==void 0?{value:Km(c)}:Le,disabled:N,checked:z,required:E,readOnly:A,onChange(Oe){if(Oe.nativeEvent.defaultPrevented||N||A||c===void 0)return;let xe=fe(_.none,Oe.nativeEvent);I(c,xe),!xe.isCanceled&&T(!0)},onClick(Oe){Oe.stopPropagation()},onFocus(){oe.current?.focus()}},J=un.useMemo(()=>({...F,required:E,disabled:N,readOnly:A,checked:z}),[F,N,A,z,E]),ce=J,ie=v!==void 0,he=[o,oe,Me],le=[ge,m,ee,D,C?Oe=>C.getValidationProps(N,Oe):Le],We=me("span",t,{enabled:!ie,state:J,ref:he,props:le,stateAttributesMapping:mc});return EA(H1.Provider,{value:ce,children:[ie?m4(Ti,{tag:"span",render:a,className:r,style:f,state:J,refs:he,props:le,stateAttributesMapping:mc}):We,m4("input",{...ne,suppressHydrationWarning:!0})]})});import*as Xm from"react";var g4=Xm.forwardRef(function(t,o){let{render:a,className:r,style:n,keepMounted:s=!1,...i}=t,l=p4(),c=l.checked,{mounted:u,transitionStatus:d,setMounted:p}=ja(c),f={...l,transitionStatus:d},m=Xm.useRef(null),v=s||u,h=me("span",t,{ref:[o,m],state:f,props:i,stateAttributesMapping:mc});return oa({batch:!0,enabled:!c,open:c,ref:m,onComplete(){c||p(!1)}}),v?h:null});import*as br from"react";var ef="ArrowUp",tf="ArrowDown",of="ArrowLeft",af="ArrowRight",rf="Home",nf="End";var sf=new Set([ef,tf,of,af,rf,nf]),V1="Shift",b4=[V1,"Control","Alt","Meta"];function PA(e){return Ae(e)&&e.tagName==="INPUT"}function B1(e){return!!(PA(e)&&e.selectionStart!=null||Ae(e)&&e.tagName==="TEXTAREA")}function _1(e,t,o,a){if(!e||!t||!t.scrollTo)return;let r=e.scrollLeft,n=e.scrollTop,s=e.clientWidth<e.scrollWidth,i=e.clientHeight<e.scrollHeight;if(s&&a!=="vertical"){let l=h4(e,t,"left"),c=Jm(e),u=Jm(t);o==="ltr"&&(l+t.offsetWidth+u.scrollMarginRight>e.scrollLeft+e.clientWidth-c.scrollPaddingRight?r=l+t.offsetWidth+u.scrollMarginRight-e.clientWidth+c.scrollPaddingRight:l-u.scrollMarginLeft<e.scrollLeft+c.scrollPaddingLeft&&(r=l-u.scrollMarginLeft-c.scrollPaddingLeft)),o==="rtl"&&(l-u.scrollMarginLeft<e.scrollLeft+c.scrollPaddingLeft?r=l-u.scrollMarginLeft-c.scrollPaddingLeft:l+t.offsetWidth+u.scrollMarginRight>e.scrollLeft+e.clientWidth-c.scrollPaddingRight&&(r=l+t.offsetWidth+u.scrollMarginRight-e.clientWidth+c.scrollPaddingRight))}if(i&&a!=="horizontal"){let l=h4(e,t,"top"),c=Jm(e),u=Jm(t);l-u.scrollMarginTop<e.scrollTop+c.scrollPaddingTop?n=l-u.scrollMarginTop-c.scrollPaddingTop:l+t.offsetHeight+u.scrollMarginBottom>e.scrollTop+e.clientHeight-c.scrollPaddingBottom&&(n=l+t.offsetHeight+u.scrollMarginBottom-e.clientHeight+c.scrollPaddingBottom)}e.scrollTo({left:r,top:n,behavior:"auto"})}function h4(e,t,o){let a=o==="left"?"offsetLeft":"offsetTop",r=0;for(;t.offsetParent&&(r+=t[a],t.offsetParent!==e);)t=t.offsetParent;return r}function Jm(e){let t=getComputedStyle(e);return{scrollMarginTop:parseFloat(t.scrollMarginTop)||0,scrollMarginRight:parseFloat(t.scrollMarginRight)||0,scrollMarginBottom:parseFloat(t.scrollMarginBottom)||0,scrollMarginLeft:parseFloat(t.scrollMarginLeft)||0,scrollPaddingTop:parseFloat(t.scrollPaddingTop)||0,scrollPaddingRight:parseFloat(t.scrollPaddingRight)||0,scrollPaddingBottom:parseFloat(t.scrollPaddingBottom)||0,scrollPaddingLeft:parseFloat(t.scrollPaddingLeft)||0}}import*as I4 from"react";import*as dn from"react";import{jsx as TA}from"react/jsx-runtime";function lf(e){let{children:t,elementsRef:o,labelsRef:a,onMapChange:r}=e,n=W(r),[,s]=dn.useState(0),i=$e(zA).current,l=$e(AA).current,c=dn.useRef(0),u=dn.useRef(!0),d=dn.useRef(null),p=dn.useRef(null),f=W(()=>{u.current||(u.current=!0,s(w=>w+1))}),m=W((w,C)=>{l.set(w,C),f()}),v=W(w=>{l.delete(w),f()}),h=W(w=>{let C=new Map;return o.current.length=0,a&&(a.current.length=0),w.forEach(R=>{C.set(R.element,{...R.registration.metadata??{},index:R.index}),o.current[R.index]=R.element,a&&(a.current[R.index]=R.registration.label!==void 0?R.registration.label:R.registration.textRef?.current?.textContent??R.element.textContent)}),c.current=o.current.length,C});function y(w){if(p.current?.disconnect(),p.current=null,typeof MutationObserver!="function"||w.length<2)return;let C=new MutationObserver(I=>{if(!FA(I))return;let S=null;for(let M of w)if(M.isConnected){if(S&&y4(S,M)>0){C.disconnect(),f();return}S=M}});p.current=C;let R=new Set;for(let I=1;I<w.length;I+=1){let S=NA(w[I-1],w[I]);S&&R.add(S)}R.forEach(I=>C.observe(I,{childList:!0}))}let x=W(()=>{let[w,C]=LA(l),R=h(w),I=d.current,S=!I||I.length!==w.length||w.some((M,T)=>{let V=I[T];return M.index!==V.index||M.element!==V.element||M.registration.index!==V.registration.index||M.registration.metadata!==V.registration.metadata});y(C),d.current=w,u.current=!1,S&&(i.forEach(M=>M(R)),n(R))});B(()=>(!u.current&&d.current&&h(d.current),()=>{o.current=[],a&&(a.current=[])}),[o,a,h]),B(()=>{u.current&&x()}),B(()=>()=>{p.current?.disconnect(),u.current=!0},[]);let g=W(w=>(i.add(w),()=>{i.delete(w)})),b=dn.useMemo(()=>({register:m,unregister:v,subscribeMapChange:g,nextIndexRef:c}),[m,v,g,c]);return TA(D1.Provider,{value:b,children:t})}function AA(){return new Map}function zA(){return new Set}function LA(e){let t=new Set,o=[],a=[];e.forEach((n,s)=>{if(!s.isConnected)return;let i=n.index,l={index:i??-1,element:s,registration:n};i===null?a.push(l):i>=0&&(t.add(i),o.push(l))});let r=0;return a.sort((n,s)=>y4(n.element,s.element)),a.forEach(n=>{for(;t.has(r);)r+=1;n.index=r,o.push(n),r+=1}),t.size>0&&o.sort((n,s)=>n.index-s.index),[o,a.map(n=>n.element)]}function NA(e,t){let o=e.parentElement;for(;o&&!o.contains(t);)o=o.parentElement;return o}function FA(e){for(let t of e)for(let o=0;o<t.removedNodes.length;o+=1)if(t.removedNodes[o].isConnected)return!0;return!1}function y4(e,t){return e.nextElementSibling===t?-1:t.nextElementSibling===e?1:e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1}import*as Es from"react";function w4(e){return e==null||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"}function x4(e){let{loopFocus:t=!0,orientation:o="both",grid:a,onLoop:r,direction:n,highlightedIndex:s,onHighlightedIndexChange:i,rootRef:l,enableHomeAndEndKeys:c=!1,stopEventPropagation:u,disabledIndices:d,modifierKeys:p=Nt}=e,[f,m]=Es.useState(0),v=a!=null,h=Es.useRef(null),y=Ht(h,l),x=Es.useRef([]),g=Es.useRef(!1),b=Es.useRef(null),w=s??f,C=W((T,V=!1)=>{if(b.current=x.current[T]??null,(i??m)(T),V){let F=x.current[T];_1(h.current,F,n,o)}}),R=W(T=>{if(T.size===0)return;if(g.current){let P=x.current,H=P.indexOf(b.current);if(H===-1){let D=P[w];!D||an(P,w,d)?C(DA(P,d)):b.current=D}else H!==w&&C(H);return}g.current=!0;let V=Array.from(T.keys()),F=V.find(P=>P?.hasAttribute(fc))??null,L=F?T.get(F)?.index??-1:-1;if(L!==-1)C(L);else if(an(V,w,d)){let P=Tn(V,{disabledIndices:d});on(V,P)||C(P)}_1(h.current,F,n,o)});B(()=>{if(d==null||s!=null||!g.current)return;let T=x.current;if(an(T,w,d)){let V=Tn(T,{disabledIndices:d});on(T,V)||C(V)}},[d,s,w,x,C]);let I=W((T,V,F)=>r?r(T,V,F,x):F),S=W(T=>{let V=T.key===rf||T.key===nf;if(!sf.has(T.key)||!c&&V||OA(T,p)||!h.current)return;let L=n==="rtl",P=L?of:af,H=L?af:of,D=o==="vertical"?tf:P,N=o==="vertical"?ef:H,A=Ue(T.nativeEvent);if(A!=null&&B1(A)&&!w4(A)){let Z=A.selectionStart,U=A.selectionEnd,ae=A.value;if(Z==null||T.shiftKey||Z!==U||T.key!==N&&Z<ae.length||T.key!==D&&Z>0)return}let E=w,G=fr(x,d),z=Vr(x,d);a!=null&&(E=a({disabledIndices:d,elementsRef:x,event:T,highlightedIndex:w,loopFocus:t,maxIndex:z,minIndex:G,onLoop:I,orientation:o,rtl:L}));let oe=o!=="vertical"&&T.key===P||o!=="horizontal"&&T.key===tf,X=o!=="vertical"&&T.key===H||o!=="horizontal"&&T.key===ef;c&&(T.key===rf?E=G:T.key===nf&&(E=z)),E===w&&(oe||X)&&(t&&E===z&&oe?(E=G,r&&(E=r(T,w,E,x))):t&&E===G&&X?(E=z,r&&(E=r(T,w,E,x))):E=Tn(x.current,{startingIndex:E,decrement:X,disabledIndices:d})),E!==w&&!on(x.current,E)&&(u&&T.stopPropagation(),(v||V||oe||X)&&T.preventDefault(),C(E,!0),queueMicrotask(()=>{x.current[E]?.focus()}))});return{props:{ref:y,onFocus(T){let V=h.current,F=Ue(T.nativeEvent);!V||F==null||!B1(F)||F.setSelectionRange(0,F.value.length)},onKeyDown:S},highlightedIndex:w,onHighlightedIndexChange:C,elementsRef:x,onMapChange:R,relayKeyboardEvent:S}}function DA(e,t){let o=-1;for(let a=0;a<e.length;a+=1){let r=e[a];if(!(!r||an(e,a,t))){if(r.hasAttribute(fc))return a;o===-1&&(o=a)}}return Math.max(o,0)}function OA(e,t){for(let o of b4)if(!t.includes(o)&&e.getModifierState(o))return!0;return!1}import{jsx as v4}from"react/jsx-runtime";function cf(e){let{render:t,className:o,style:a,refs:r=Nt,props:n=Nt,state:s=Le,stateAttributesMapping:i,highlightedIndex:l,onHighlightedIndexChange:c,orientation:u,grid:d,loopFocus:p,onLoop:f,enableHomeAndEndKeys:m,onMapChange:v,stopEventPropagation:h=!0,rootRef:y,disabledIndices:x,modifierKeys:g,highlightItemOnHover:b=!1,tag:w="div",...C}=e,R=Vo(),{props:I,highlightedIndex:S,onHighlightedIndexChange:M,elementsRef:T,onMapChange:V,relayKeyboardEvent:F}=x4({grid:d,loopFocus:p,onLoop:f,orientation:u,highlightedIndex:l,onHighlightedIndexChange:c,rootRef:y,stopEventPropagation:h,enableHomeAndEndKeys:m,direction:R,disabledIndices:x,modifierKeys:g}),L=me(w,e,{state:s,ref:r,props:[I,...n,C],stateAttributesMapping:i}),P=I4.useMemo(()=>({highlightedIndex:S,onHighlightedIndexChange:M,highlightItemOnHover:b,relayKeyboardEvent:F}),[S,M,b,F]);return v4(p0.Provider,{value:P,children:v4(lf,{elementsRef:T,onMapChange:H=>{v?.(H),V(H)},children:L})})}import{jsx as C4}from"react/jsx-runtime";var HA=[V1],Z1=br.forwardRef(function(t,o){let{render:a,className:r,disabled:n,readOnly:s,required:i,onValueChange:l,value:c,defaultValue:u,form:d,name:p,inputRef:f,id:m,style:v,...h}=t,{setTouched:y,setFocused:x,validationMode:g,name:b,disabled:w,state:C,validation:R,setDirty:I,setFilled:S,validityData:M}=Hn(),{labelId:T}=Ri(),{clearErrors:V,elementRef:F}=z6(),L=A6(!0),P=w||n,H=b??p,D=tt(m),[N,A]=ya({controlled:c,default:u,name:"RadioGroup",state:"value"}),[E,G]=br.useState(!1),z=W((ne,J)=>{l?.(ne,J),!J.isCanceled&&A(ne)}),oe=R.getInputControl,X=br.useMemo(()=>({get current(){return oe()}}),[oe]),Z=br.useRef(null),U=br.useRef(null),ae=Ht(Z,f),we=br.useRef(ae),j=W(ne=>{Z.current===ne&&we.current===ae||(we.current=ae,ae?.(ne))});B(()=>{j(Z.current)},[ae,j]);let Y=W(ne=>{if(ne){if(!ne.disabled){U.current||(U.current=ne);let J=Z.current;(ne.checked||J==null||J.disabled)&&j(ne)}return()=>{U.current===ne&&(U.current=null),Z.current===ne&&j(null)}}}),q=W(()=>{let ne=F.current;if(!ne)return N??null;for(let J of R.registeredInputs.keys())if(J.checked&&D6(J,ne))return N??null;return null});V6(X,D,N??null,q,!P,p),Zm(N,()=>{V(H),I(N!==M.initialValue),S(N!=null),R.change(N);let ne=U.current;N==null&&ne&&!ne.disabled&&j(ne)});let re=T??L?.legendId,ge={...C,disabled:P??!1,required:i??!1,readOnly:s??!1},ee=br.useMemo(()=>({checkedValue:N,disabled:P,form:d,validation:R,name:H,readOnly:s,registerInputRef:Y,required:i,setCheckedValue:z,setTouched:G,touched:E}),[N,P,d,R,H,s,Y,i,z,G,E]),Me={id:m,role:"radiogroup","aria-required":i||void 0,"aria-disabled":P||void 0,"aria-readonly":s||void 0,"aria-labelledby":re,onBlur(ne){de(ne.currentTarget,ne.relatedTarget)||(G(!1),y(!0),x(!1),g==="onBlur"&&R.commit(N))},onKeyDownCapture(ne){ne.key.startsWith("Arrow")&&G(!0)}};return C4(O1.Provider,{value:ee,children:C4(cf,{render:a,className:r,style:v,state:ge,props:[Me,h,ne=>R.getValidationProps(P??!1,ne)],refs:[o],stateAttributesMapping:Dm,enableHomeAndEndKeys:!1,modifierKeys:HA})})});import*as gc from"react";import*as uf from"react";var G1=uf.createContext(void 0);function R4(){return uf.useContext(G1)}import{jsx as VA}from"react/jsx-runtime";var U1=gc.forwardRef(function(t,o){let{className:a,defaultPressed:r=!1,disabled:n=!1,form:s,onPressedChange:i,pressed:l,render:c,type:u,value:d,nativeButton:p=!0,style:f,...m}=t,v=tt(d||void 0),h=R4(),y=h?.value??[],x=(n||h?.disabled)??!1,[g,b]=ya({controlled:h?v!==void 0&&y.indexOf(v)>-1:l,default:r,name:"Toggle",state:"pressed"}),{getButtonProps:w,buttonRef:C}=Go({disabled:x,native:p}),R={disabled:x,pressed:g},I=[C,o],S=[{"aria-pressed":g,onClick(V){let F=!g,L=fe(_.none,V.nativeEvent);i?.(F,L),!L.isCanceled&&(v&&h?.setGroupValue?.(v,F,L),!L.isCanceled&&b(F))}},m,w],M=me("button",t,{enabled:!h,state:R,ref:I,props:S}),T=gc.useMemo(()=>({disabled:x,focusableWhenDisabled:!1}),[x]);return h?VA(Ti,{tag:"button",render:c,className:a,style:f,metadata:T,state:R,refs:I,props:S}):M});import*as ff from"react";import*as df from"react";var BA=df.createContext(void 0);function pf(e){let t=df.useContext(BA);if(t===void 0&&!e)throw new Error(He(69));return t}import*as mf from"react";var _A=mf.createContext(void 0);function S4(){return mf.useContext(_A)}import{jsx as k4}from"react/jsx-runtime";var $1=ff.forwardRef(function(t,o){let{defaultValue:a,disabled:r=!1,loopFocus:n=!0,onValueChange:s,orientation:i="horizontal",multiple:l=!1,value:c,className:u,render:d,style:p,...f}=t,m=pf(!0),v=S4(),h=a??Nt,y=c!==void 0||a!==void 0,x=(m?.disabled??!1)||(v?.disabled??!1)||r,[g,b]=ya({controlled:c,default:h,name:"ToggleGroup",state:"value"}),w=W((M,T,V)=>{let F;l?(F=g.slice(),T?F.push(M):F.splice(g.indexOf(M),1)):F=T?[M]:[],s?.(F,V),!V.isCanceled&&b(F)}),C={disabled:x,multiple:l,orientation:i},R=ff.useMemo(()=>({disabled:x,setGroupValue:w,value:g,isValueInitialized:y}),[x,w,g,y]),I={role:"group"},S=me("div",t,{enabled:!!m,state:C,ref:o,props:[I,f]});return k4(G1.Provider,{value:R,children:m?S:k4(cf,{render:d,className:u,style:p,state:C,refs:[o],props:[I,f],loopFocus:n,enableHomeAndEndKeys:!0,orientation:i})})});import{Fragment as YA,jsx as Ur,jsxs as j1}from"react/jsx-runtime";var qA=rt("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-pill border border-line-faint bg-paper p-0.5 forced-colors:border-[CanvasText]",{variants:{size:{sm:`${In.sm} type-label-sm`,default:`${In.default} type-label`,lg:`${In.lg} type-label-lg`},fill:{true:"flex w-full *:flex-1",false:""}},defaultVariants:{size:"default",fill:!1}}),q1=ZA({size:"default",multiple:!1});function jA(){let e=W1(null),t=W1(null),[o,a]=WA(!1);return $A(()=>{let r=e.current,n=t.current;if(!r||!n)return;let s=!0,i=()=>{let u=r.querySelector(":scope > [data-slot=segmented-control-item][data-checked]");n.hidden=!u,u&&(s&&(n.style.transition="none"),r.style.setProperty("--seg-x",`${u.offsetLeft}px`),r.style.setProperty("--seg-w",`${u.offsetWidth}px`),n.toggleAttribute("data-disabled",u.hasAttribute("data-disabled")),s&&(n.offsetWidth,n.style.transition="",s=!1))};i(),a(!0);let l=new MutationObserver(i);l.observe(r,{subtree:!0,attributes:!0,attributeFilter:["data-checked","data-disabled"]});let c=new ResizeObserver(i);return c.observe(r),r.querySelectorAll(":scope > [data-slot=segmented-control-item]").forEach(u=>c.observe(u)),()=>{l.disconnect(),c.disconnect()}},[]),{track:e,thumb:t,ready:o}}function z4(e){let{className:t,size:o="default",fill:a=!1,children:r}=e,n=O(qA({size:o,fill:a}),t),{track:s,thumb:i,ready:l}=jA(),c={size:o??"default",countMax:e.countMax,multiple:!!e.multiple,sliding:l};if(e.multiple){let{multiple:x,onValueChange:g,size:b,fill:w,className:C,children:R,countMax:I,...S}=e;return Ur($1,{"data-slot":"segmented-control","data-size":o,"data-multiple":"",multiple:!0,onValueChange:M=>g?.(M),className:n,...S,children:Ur(q1.Provider,{value:c,children:r})})}let{multiple:u,onValueChange:d,size:p,fill:f,className:m,children:v,countMax:h,...y}=e;return j1(Z1,{ref:s,"data-slot":"segmented-control","data-size":o,onValueChange:x=>d?.(x),className:O("relative",n),...y,children:[Ur("span",{ref:i,"aria-hidden":!0,"data-slot":"segmented-control-thumb",className:O("glaze-sm pointer-events-none absolute inset-y-0.5 left-0 w-(--seg-w) translate-x-(--seg-x) rounded-pill","transition-[translate,width] duration-(--dur-slide) ease-out motion-reduce:transition-none",!l&&"invisible")}),Ur(q1.Provider,{value:c,children:r})]})}var M4=new Intl.NumberFormat("en-US"),E4=["relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-pill focus-sm border border-transparent whitespace-nowrap select-none [-webkit-tap-highlight-color:transparent]","transition-[color,background-color] duration-(--dur-slide) ease-out motion-reduce:transition-none","[&_svg]:pointer-events-none [&_svg]:shrink-0","data-disabled:cursor-not-allowed"].join(" "),P4={sm:"px-2.5 type-label-sm [&_svg]:size-(--icon-sm)",default:"px-3 type-label [&_svg]:size-(--icon)",lg:"px-3.5 type-label-lg [&_svg]:size-(--icon-lg)"},T4="glaze-sm forced-colors:[forced-color-adjust:none] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",KA="text-(--glaze-sm-text) data-disabled:text-text-disabled forced-colors:[forced-color-adjust:none] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",A4="text-text-2 hover:not-data-disabled:text-text-1 active:not-data-disabled:bg-hover data-disabled:text-text-disabled forced-colors:data-disabled:text-[GrayText]";function K1({className:e,children:t,count:o,countMax:a,...r}){let{size:n,countMax:s,multiple:i,sliding:l}=GA(q1),c=UA(),u=W1(0);o!==void 0&&(u.current=Math.max(u.current,o));let d=a??s??u.current,p=typeof t=="string"?t:void 0,f=j1(YA,{children:[Ur("span",{"data-slot":"segmented-control-label",className:"inline-flex min-w-0 items-center gap-1.5",children:Ur("span",{className:"min-w-0 truncate",children:t})}),o!==void 0&&j1("span",{"data-slot":"segmented-control-count","aria-hidden":!0,className:"grid shrink-0 justify-items-start tabular-nums opacity-70 [grid-template-areas:'c']",children:[Ur("span",{className:"invisible [grid-area:c]",children:M4.format(Math.max(d,o))}),Ur("span",{id:c,className:"[grid-area:c]",children:M4.format(o)})]})]}),m={"data-slot":"segmented-control-item",title:p,"aria-describedby":o!==void 0?c:void 0};return i?Ur(U1,{...m,...r,className:v=>O(E4,P4[n],v.pressed?T4:A4,e),children:f}):Ur(Qm.Root,{...m,...r,className:v=>O(E4,P4[n],v.checked?l?KA:T4:A4,e),children:f})}import{useEffect as Sre,useRef as kre,useState as Mre}from"react";import{Fragment as Tre,jsx as XA,jsxs as Are}from"react/jsx-runtime";function gf({className:e,...t}){return XA("div",{"data-slot":"skeleton","aria-hidden":!0,className:O("shrink-0 rounded-tag bg-field forced-colors:bg-[GrayText]",e),...t})}import{createContext as ez,memo as tz,useCallback as oz,useContext as D4,useId as az,useLayoutEffect as O4,useMemo as rz,useRef as hf,useState as hc}from"react";import{createElement as Nre,useLayoutEffect as QA,useState as JA}from"react";var L4=e=>(e&&"current"in e?e.current:e)??null;function N4(e){let[t,o]=JA("ltr");return QA(()=>{let a=L4(e)?.ownerDocument??(typeof document>"u"?null:document);if(!a)return;let r=()=>{let s=L4(e)??a.documentElement;o(getComputedStyle(s).direction==="rtl"?"rtl":"ltr")};r();let n=new MutationObserver(r);return n.observe(a.documentElement,{attributes:!0,attributeFilter:["dir"],subtree:!0}),()=>n.disconnect()},[e]),t}import{Fragment as iz,jsx as Pt,jsxs as Ps}from"react/jsx-runtime";var J1=ez(null);function bc(){let e=D4(J1);if(!e)throw new Error("useChart must be used within a <ChartContainer/>");return e}function eb(){return D4(J1)}function tb({config:e,xKey:t,defaultHidden:o,className:a,children:r,...n}){let[s,i]=hc(()=>new Set(o)),[l,c]=hc(null),u=oz(p=>i(f=>{let m=new Set(f);return m.has(p)?m.delete(p):m.add(p),m}),[]),d=rz(()=>({config:e,keys:Object.keys(e).filter(p=>p!==t),hidden:s,toggle:u,highlight:l,setHighlight:c}),[e,t,s,u,l]);return Pt(J1.Provider,{value:d,children:Pt("div",{"data-slot":"chart",className:O("flex w-full min-w-0 flex-col",a),...n,children:r})})}function bf({config:e,xKey:t,children:o}){return eb()||!e?o:Pt(tb,{config:e,xKey:t,children:o})}var nz={ink:"text-text-1","ink-2":"text-text-2",ok:"text-ok",warn:"text-warn",fail:"text-fail"},sz={ink:"text-text-inverse","ink-2":"text-text-inverse/60",ok:"text-ok",warn:"text-warn",fail:"text-fail"};function Vn(e,t,o=Object.keys(e)){let{status:a,dashed:r=!1}=e[t]??{};if(a)return{tone:a,dashed:r};let n=Math.max(0,o.filter(s=>!e[s]?.status).indexOf(t));return{tone:n%2===0?"ink":"ink-2",dashed:r||n>=2}}function Ts(e,t,o=!1,a){let{tone:r}=Vn(e,t,a);return(o?sz:nz)[r]}function yf({config:e,series:t,onInk:o,off:a,className:r}){let n=eb()?.keys,{dashed:s}=Vn(e,t,n);return Pt("svg",{"data-slot":"chart-swatch","aria-hidden":!0,focusable:"false",width:8,height:8,viewBox:"0 0 8 8",className:O("shrink-0",a?"text-text-3":Ts(e,t,o,n),r),children:Pt("line",{x1:0,y1:4,x2:8,y2:4,strokeWidth:2,strokeDasharray:s?"3 2":void 0,className:"stroke-current forced-colors:stroke-[CanvasText]"})})}function yc(){let e=hf(null),[t,o]=hc(0);return O4(()=>{let a=e.current;if(!a)return;o(a.clientWidth);let r=new ResizeObserver(([n])=>o(Math.round(n.contentRect.width)));return r.observe(a),()=>r.disconnect()},[]),[e,t]}function ob(e){return N4(e)}function Ai(e,t){let[o,a]=hc(e-1),r=hf([]),n=Math.min(Math.max(o,0),e-1),s=l=>{let c=Math.min(Math.max(l,0),e-1);a(c);let u=r.current[c];u?.focus(),t(c,u??null)};return{current:n,setCurrent:a,onKeyDown:(l,c)=>{let u=l.shiftKey?7:1,d=getComputedStyle(l.currentTarget).direction==="rtl"?-1:1,p={ArrowRight:c+u*d,ArrowDown:c+u,ArrowLeft:c-u*d,ArrowUp:c-u,Home:0,End:e-1};l.key in p&&(l.preventDefault(),s(p[l.key]))},tabIndex:l=>l===n?0:-1,ref:l=>c=>{r.current[l]=c}}}var Y1=8,X1=8;function zi({anchor:e,children:t,className:o}){let a=Tr(),r=hf(null),[n,s]=hc(null);if(O4(()=>{let l=r.current;if(!e||!l){s(null);return}let{width:c,height:u}=l.getBoundingClientRect(),d=document.documentElement.clientWidth,p=e.y-Y1-u<X1?e.y+Y1:e.y-Y1-u,f=Math.min(Math.max(e.x-c/2,X1),d-c-X1);s({left:f,top:p})},[e,t]),!e||a===null)return null;let i=Pt("div",{ref:r,"data-slot":"chart-tooltip","aria-hidden":!0,className:O(oc,"pointer-events-none fixed z-(--z-overlay) min-w-32 flex-col items-stretch gap-1 py-1.5",!n&&"invisible",o),style:{left:n?.left??0,top:n?.top??0},children:t});return a?lr(i,a):i}function Li({title:e,children:t,className:o}){return Ps("div",{"data-slot":"chart-tooltip-content",className:O("flex flex-col gap-1",o),children:[e&&Pt("div",{"data-slot":"chart-tooltip-title",className:"type-label-sm text-text-inverse/70",children:e}),t]})}function As({indicator:e,label:t,value:o,className:a}){return Ps("div",{"data-slot":"chart-tooltip-row",className:O("flex items-center gap-2 type-label-sm",a),children:[e,Pt("span",{className:"min-w-0 flex-1 truncate text-text-inverse/70",children:t}),Pt("span",{className:"data text-text-inverse",children:o})]})}var F4="sticky top-0 h-8 border-b border-line-faint bg-paper px-3 align-middle type-label-sm text-text-2",Q1="h-8 px-3 align-middle type-label-sm",Bn=tz(function({caption:t,rowHeader:o="Date",columns:a,rows:r,empty:n=cn,visible:s,className:i}){let l=hf(null),c=$m(l,!!s),u=az();return Pt("div",{ref:l,"data-slot":"chart-data-table","data-visible":s||void 0,tabIndex:c,role:c===0?"region":void 0,...c===0?typeof t=="string"?{"aria-label":t}:{"aria-labelledby":u}:{},className:O(s?"max-h-(--popup-max) overflow-auto focus-visible:focus-ring-inset":"sr-only",i),children:Ps("table",{className:"w-full border-separate border-spacing-0 text-start",children:[Pt("caption",{id:u,className:"sr-only",children:t}),Pt("thead",{children:Ps("tr",{children:[Pt("th",{scope:"col",className:O(F4,"text-start"),children:o}),a.map(p=>Pt("th",{scope:"col",className:O(F4,"text-end"),children:p.label},p.key))]})}),Ps("tbody",{className:"[&>tr:not(:last-child)>*]:border-b [&>tr:not(:last-child)>*]:border-line-faint",children:[r.length===0&&Pt("tr",{"data-slot":"chart-data-table-empty",children:Pt("td",{colSpan:a.length+1,className:O(Q1,"text-start text-text-2"),children:n})}),r.map(p=>Ps("tr",{children:[Pt("th",{scope:"row",className:O(Q1,"text-start font-normal whitespace-nowrap text-text-2"),children:p.label}),a.map(f=>Pt("td",{className:O(Q1,"data text-end text-text-1"),children:p.values[f.key]??hr},f.key))]},p.key))]})]})})}),H4=rt("flex min-w-0",{variants:{layout:{row:"flex-wrap items-center gap-0.5",column:"flex-col gap-0.5"}},defaultVariants:{layout:"row"}});function V4({series:e,values:t,toggle:o=!0,layout:a="row",className:r,...n}){let{config:s,keys:i,hidden:l,toggle:c,highlight:u,setHighlight:d}=bc(),p=e??i;return Pt("ul",{"data-slot":"chart-legend","data-layout":a,className:O(H4({layout:a}),r),...n,children:p.map(f=>{let m=l.has(f),v=u!==null&&u!==f,h=Ps(iz,{children:[Pt(yf,{config:s,series:f,off:m}),Pt("span",{className:O("min-w-0 truncate",m?"text-text-2 line-through decoration-1":"text-text-1"),children:s[f]?.label??f}),t?.[f]!==void 0&&Pt("span",{className:"data ms-auto ps-2 text-text-2",children:t[f]})]}),y="flex h-(--control-sm) w-full min-w-0 items-center gap-1.5 rounded-pill px-2 type-label-sm";return Pt("li",{className:O("min-w-0 transition-opacity duration-(--dur-state)",v&&"opacity-(--stale)",a==="column"&&"w-full"),children:o?Pt("button",{type:"button","data-slot":"chart-legend-item","aria-pressed":!m,onClick:()=>c(f),onPointerEnter:()=>!m&&d(f),onPointerLeave:()=>d(null),onFocus:()=>!m&&d(f),onBlur:()=>d(null),onKeyDown:x=>{x.key==="Escape"&&d(null)},className:O(y,"transition-colors duration-(--dur-state) ease-out hover:bg-hover"),children:h}):Pt("span",{"data-slot":"chart-legend-item",className:y,children:h})},f)})})}import{useEffect as cz,useRef as uz,useState as _4}from"react";function ab(e,t,o=4){(!Number.isFinite(e)||!Number.isFinite(t))&&(e=0,t=1),e>t&&([e,t]=[t,e]),o=Math.max(1,Math.round(o)||1),e===t&&(t=e===0?1:e+Math.abs(e));let a=(t-e)/o,r=10**Math.floor(Math.log10(a)),n=a/r,s=(n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*r,i=Math.floor(e/s)*s,l=Math.ceil(t/s)*s,c=[];for(let u=i;u<=l+s/2;u+=s)c.push(Number(u.toPrecision(12)));return{min:i,max:l,ticks:c}}var lz=new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1});function wc(e){return lz.format(e)}function B4(e,t){if(!e)return;let{unit:o,size:a}=e==="duration"?a4(t):r4(t),r=new Intl.NumberFormat("en-US",{maximumFractionDigits:0,signDisplay:"negative"});return n=>{let s=n/a;return a===1?`${e==="duration"?F1(s,0):r.format(s)}${o}`:`${F1(s,Math.abs(Number(s.toFixed(1)))>=10?0:1)}${o}`}}function Xo(e,t){let o=e?.[t];return typeof o=="number"&&Number.isFinite(o)?o:null}function rb(e){if(e.length<3)return wf(e);let t=e.length,o=[],a=[];for(let s=0;s<t-1;s++)o.push(e[s+1].x-e[s].x),a.push((e[s+1].y-e[s].y)/(o[s]||1));let r=[a[0]];for(let s=1;s<t-1;s++)r.push(a[s-1]*a[s]<=0?0:(a[s-1]+a[s])/2);r.push(a[t-2]);for(let s=0;s<t-1;s++){if(a[s]===0){r[s]=0,r[s+1]=0;continue}let i=r[s]/a[s],l=r[s+1]/a[s],c=i*i+l*l;if(c>9){let u=3/Math.sqrt(c);r[s]=u*i*a[s],r[s+1]=u*l*a[s]}}let n=`M${e[0].x},${e[0].y}`;for(let s=0;s<t-1;s++){let i=e[s],l=e[s+1],c=o[s]/3;n+=`C${i.x+c},${i.y+r[s]*c},${l.x-c},${l.y-r[s+1]*c},${l.x},${l.y}`}return n}function wf(e){return e.map((t,o)=>`${o?"L":"M"}${t.x},${t.y}`).join("")}function nb(e){return e.map((t,o)=>o?`H${(e[o-1].x+t.x)/2}V${t.y}`:`M${t.x},${t.y}`).join("")+(e.length?`H${e[e.length-1].x}`:"")}import{Fragment as xz,jsx as mt,jsxs as zs}from"react/jsx-runtime";var sb=24,dz=7,Z4=72,pz=28;function lb({data:e,xKey:t,series:o,config:a,mode:r,extent:n,height:s,label:i,xFormat:l,valueFormat:c,tooltipFormat:u=c,tooltipFooter:d,children:p,overlay:f,empty:m=cn,className:v}){let[h,y]=yc(),x=ob(h)==="rtl",[g,b]=_4(null),[w,C]=_4(null),R=uz(null),I=e.length,S=ab(n[0],n[1],Math.min(4,Math.max(1,Math.floor((s-sb)/pz)))),M=S.ticks.map(c),T=y?n4(h.current,"--space-2",8):8,V=Math.max(...M.map(Y=>Y.length))*dz+T,F=r==="point"?T:0,L=x?{left:F,right:Math.max(F+1,y-V),top:T,bottom:s-sb}:{left:V,right:Math.max(V+1,y-F),top:T,bottom:s-sb},P=L.right-L.left,H=r==="band"?P/Math.max(I,1):P/Math.max(I-1,1),D=x?L.right:L.left,N=x?-1:1,A=Y=>r==="band"?D+N*H*(Y+.5):I===1?L.left+P/2:D+N*H*Y,E=Y=>L.bottom-(Y-S.min)/(S.max-S.min)*(L.bottom-L.top),G={width:y,height:s,plot:L,x:A,y:E,band:H,active:g,rtl:x},z=Y=>{let q=R.current?.getBoundingClientRect();if(!q)return null;let re=o.map(ee=>Xo(e[Y],ee)).filter(ee=>ee!==null),ge=re.length?E(Math.max(...re)):L.top;return{x:q.left+A(Y),y:q.top+Math.min(ge,L.bottom)}},oe=Y=>{b(Y),C(z(Y))},X=()=>{b(null),C(null)},Z=Ai(I,Y=>oe(Y));cz(()=>{if(g===null)return;let Y=()=>{h.current?.contains(document.activeElement)||X()};return window.addEventListener("scroll",Y,{capture:!0,passive:!0}),()=>window.removeEventListener("scroll",Y,{capture:!0})},[g,h]);let U=Math.max(1,Math.ceil(I/Math.max(1,Math.floor(P/Z4)))),ae=Y=>{let q=e[Y],re=o.map(ge=>{let ee=Xo(q,ge);return`${a[ge]?.label??ge} ${ee===null?"no data":u(ee)}`});return`${l(q?.[t],Y)}: ${re.join(", ")}`},we=mt(Bn,{caption:i,empty:m,rowHeader:a[t]?.label??"Date",columns:o.map(Y=>({key:Y,label:a[Y]?.label??Y})),rows:e.map((Y,q)=>({key:String(q),label:l(Y[t],q),values:Object.fromEntries(o.map(re=>{let ge=Xo(Y,re);return[re,ge===null?hr:u(ge)]}))}))}),j={height:s};return I===0?zs("div",{ref:h,"data-slot":"chart-plot",className:O("relative type-body-sm text-text-2",v),style:j,children:[we,mt("span",{"aria-hidden":!0,className:"block pt-2",children:m}),mt("span",{"aria-hidden":!0,className:"absolute inset-x-0 bottom-6 h-px bg-line"})]}):zs("div",{ref:h,"data-slot":"chart-plot",className:O("relative w-full min-w-0",v),style:j,children:[we,y>0&&zs(xz,{children:[zs("svg",{ref:R,"aria-hidden":!0,direction:"ltr",width:y,height:s,className:"block overflow-visible",children:[r==="band"&&g!==null&&mt("rect",{x:A(g)-H/2,y:L.top,width:H,height:L.bottom-L.top,rx:4,className:"fill-hover"}),S.ticks.map((Y,q)=>zs("g",{children:[mt("line",{x1:L.left,x2:L.right,y1:E(Y),y2:E(Y),strokeWidth:1,className:Y===0?"stroke-line":"stroke-line-faint",shapeRendering:"crispEdges"}),mt("text",{x:x?L.right+T:L.left-T,y:E(Y),dy:"0.32em",textAnchor:x?"start":"end",className:"fill-text-2 type-caption",children:M[q]})]},Y)),e.map((Y,q)=>{if((I-1-q)%U!==0||r==="point"&&q!==I-1&&Math.abs(A(I-1)-A(q))<Z4)return null;let re=x?"end":"start",ge=x?"start":"end",ee=r==="point"&&I>1?q===0?re:q===I-1?ge:"middle":"middle";return mt("text",{x:A(q),y:s-6,textAnchor:ee,className:"fill-text-2 type-caption",children:l(Y[t],q)},q)}),r==="point"&&g!==null&&mt("line",{x1:A(g),x2:A(g),y1:L.top,y2:L.bottom,strokeWidth:1,className:"stroke-line-strong",shapeRendering:"crispEdges"}),p(G),f?.(G)]}),mt("div",{role:"group","aria-label":i,"aria-roledescription":"chart",className:"absolute flex",style:{left:r==="band"||I===1?L.left:L.left-H/2,top:L.top,width:r==="band"||I===1?P:P+H,height:L.bottom-L.top},onPointerLeave:()=>{h.current?.contains(document.activeElement)||X()},children:e.map((Y,q)=>mt("button",{ref:Z.ref(q),type:"button",tabIndex:Z.tabIndex(q),"aria-label":ae(q),onPointerEnter:()=>{Z.setCurrent(q),oe(q)},onFocus:()=>{Z.setCurrent(q),oe(q)},onBlur:re=>{re.currentTarget.parentElement?.contains(re.relatedTarget)||X()},onKeyDown:re=>{re.key==="Escape"?X():Z.onKeyDown(re,q)},className:"h-full min-w-0 flex-1 cursor-crosshair rounded-tag focus-visible:focus-ring-inset"},q))}),mt(zi,{anchor:g!==null?w:null,children:g!==null&&zs(Li,{title:l(e[g]?.[t],g),children:[o.map(Y=>{let q=Xo(e[g],Y);return mt(As,{indicator:mt(yf,{config:a,series:Y,onInk:!0}),label:a[Y]?.label??Y,value:q===null?hr:u(q)},Y)}),d?.(e[g])]})})]})]})}var mz={linear:wf,monotone:rb,step:nb};function fz(e,t,o,a){let r=[],n=[];return e.forEach((s,i)=>{let l=Xo(s,t);if(l===null){n.length&&r.push(n),n=[];return}n.push({x:o(i),y:a(l)})}),n.length&&r.push(n),r}var gz=1.5,hz="4 3";function bz({data:e,xKey:t,series:o,label:a,height:r=200,curve:n="monotone",area:s,zero:i=!0,xFormat:l=f=>String(f),valueFormat:c=wc,tooltipFormat:u,empty:d,className:p}){let{config:f,keys:m,hidden:v,highlight:h}=bc(),y=(o??m).filter(w=>!v.has(w)),x=e.flatMap(w=>y.map(C=>Xo(w,C)).filter(C=>C!==null)),g=[i?Math.min(0,...x):Math.min(...x),Math.max(...x,i?0:-1/0)],b=mz[n];return mt(lb,{data:e,xKey:t,series:y,config:f,mode:"point",extent:g,height:r,label:a,xFormat:l,valueFormat:c,tooltipFormat:u,empty:d,className:p,overlay:w=>w.active!==null&&y.map(C=>{let R=Xo(e[w.active],C);return R===null?null:mt("rect",{x:w.x(w.active)-3.5,y:w.y(R)-3.5,width:7,height:7,strokeWidth:2,className:O("fill-current stroke-paper",Ts(f,C,!1,m))},C)}),children:w=>y.map(C=>{let{dashed:R}=Vn(f,C,m),I=fz(e,C,w.x,w.y),S=h!==null&&h!==C,M=Math.min(Math.max(w.y(0),w.plot.top),w.plot.bottom);return zs("g",{"data-slot":"line-chart-series","data-series":C,className:O(Ts(f,C,!1,m),"transition-opacity duration-(--dur-state)",S&&"opacity-(--stale)"),children:[s&&y.length===1&&I.map((T,V)=>T.length>1&&mt("path",{d:`${b(T)}L${T[T.length-1].x},${M}L${T[0].x},${M}Z`,className:"fill-hover stroke-none"},`a${V}`)),I.map((T,V)=>T.length===1?mt("rect",{x:T[0].x-2,y:T[0].y-2,width:4,height:4,className:"fill-current"},V):mt("path",{d:b(T),fill:"none",strokeWidth:gz,strokeDasharray:R?hz:void 0,strokeLinejoin:"round",strokeLinecap:"round",className:"stroke-current forced-colors:stroke-[CanvasText]"},V))]},C)})})}function $4({config:e,...t}){return mt(bf,{config:e,xKey:t.xKey,children:mt(bz,{...t})})}var ib=1,G4=2,yz=2;function U4({x:e,width:t,y:o,height:a,up:r,hollow:n,className:s,...i}){let l=Math.min(yz,t/2,a),c=n?.5:0,u=e+c,d=e+t-c,p=o+c,f=o+a-c,m=r?`M${u},${f}V${p+l}Q${u},${p} ${u+l},${p}H${d-l}Q${d},${p} ${d},${p+l}V${f}Z`:`M${u},${p}V${f-l}Q${u},${f} ${u+l},${f}H${d-l}Q${d},${f} ${d},${f-l}V${p}Z`;return mt("path",{d:m,strokeWidth:n?1:0,className:O(n?"fill-paper stroke-current":"fill-current","forced-colors:fill-[CanvasText]",s),...i})}function wz({data:e,xKey:t,series:o,label:a,height:r=200,stacked:n,fill:s=.64,xFormat:i=f=>String(f),valueFormat:l=wc,tooltipFormat:c,total:u=n,empty:d,className:p}){let{config:f,keys:m,hidden:v,highlight:h}=bc(),y=(o??m).filter(C=>!v.has(C)),x=(C,R)=>y.reduce((I,S)=>{let M=Xo(C,S)??0;return R>0?I+Math.max(M,0):I+Math.min(M,0)},0),g=n?e.flatMap(C=>[x(C,1),x(C,-1)]):e.flatMap(C=>y.map(R=>Xo(C,R)??0)),b=[Math.min(0,...g),Math.max(0,...g)],w=c??l;return mt(lb,{data:e,xKey:t,series:y,config:f,mode:"band",extent:b,height:r,label:a,xFormat:i,valueFormat:l,tooltipFormat:c,empty:d,className:p,tooltipFooter:u&&y.length>1?C=>mt(As,{className:"mt-0.5 border-t border-text-inverse/20 pt-1",label:"Total",value:w(x(C,1)+x(C,-1))}):void 0,children:C=>{let R=Math.max(1,C.band*s),I=C.y(0),S=T=>h!==null&&h!==T;if(n)return e.map((T,V)=>{let F=0,L=0,P=C.x(V)-R/2,H=[...y].reverse().find(N=>(Xo(T,N)??0)>0),D=[...y].reverse().find(N=>(Xo(T,N)??0)<0);return mt("g",{children:y.map(N=>{let A=Xo(T,N);if(!A)return null;let E=A>0?F:L,G=E+A;A>0?F=G:L=G;let z=Math.min(C.y(E),C.y(G)),oe=Math.abs(C.y(G)-C.y(E))-(E===0?0:ib),X=N===(A>0?H:D);return mt("g",{className:O(Ts(f,N,!1,m),"transition-opacity duration-(--dur-state)",S(N)&&"opacity-(--stale)"),children:X?mt(U4,{"data-series":N,x:P,width:R,y:A>0?z:z+(E===0?0:ib),height:Math.max(oe,1),up:A>0,hollow:Vn(f,N,m).dashed}):mt("rect",{"data-series":N,x:P,width:R,y:A>0?z:z+(E===0?0:ib),height:Math.max(oe,1),shapeRendering:"crispEdges",className:Vn(f,N,m).dashed?"fill-paper stroke-current":"fill-current"})},N)})},V)});let M=(R-G4*(y.length-1))/Math.max(y.length,1);return e.map((T,V)=>mt("g",{children:y.map((F,L)=>{let P=Xo(T,F);return P===null||P===0?null:mt("g",{className:O(Ts(f,F,!1,m),"transition-opacity duration-(--dur-state)",S(F)&&"opacity-(--stale)"),children:mt(U4,{"data-series":F,x:C.x(V)-R/2+(C.rtl?y.length-1-L:L)*(M+G4),width:Math.max(M,1),y:Math.min(C.y(P),I),height:Math.max(Math.abs(I-C.y(P)),1),up:P>=0,hollow:Vn(f,F,m).dashed})},F)})},V))}})}function W4({config:e,...t}){return mt(bf,{config:e,xKey:t.xKey,children:mt(wz,{...t})})}import{useRef as cb,useState as xf}from"react";import{Fragment as K4,jsx as So,jsxs as xc}from"react/jsx-runtime";var Y4=rt("relative inline-block min-w-0 align-middle",{variants:{size:{sm:"h-4",default:"h-(--control-sm)",lg:"h-(--control-lg)"}},defaultVariants:{size:"default"}}),vz={ok:"text-ok",warn:"text-warn",fail:"text-fail"},Ls=100,q4=8;function Iz(e,t){if(!e.length)return"no data";let o=e[0],a=e[e.length-1];return`${a>o?"up":a<o?"down":"flat"} from ${t(o)} to ${t(a)}, low ${t(Math.min(...e))}, high ${t(Math.max(...e))}`}function X4({data:e,label:t,status:o,variant:a="line",area:r,end:n=a==="line",labels:s,valueFormat:i=p=>p.toLocaleString("en-US"),interactive:l,size:c="default",className:u,...d}){let p=e.filter(D=>D!==null&&Number.isFinite(D)),f=e.length,m=a==="bar"?Math.min(0,...p):Math.min(...p),v=Math.max(...p,m+1),h=Math.max(f-1,1)*10,y=D=>q4+(1-(D-m)/(v-m||1))*(Ls-q4*2),x=D=>a==="bar"?(D+.5)*(h/f):f===1?h/2:D/(f-1)*h,g=D=>s?.[D]??`Point ${D+1}`,b=[],w=[];e.forEach((D,N)=>{if(D===null||!Number.isFinite(D)){w.length&&b.push(w),w=[];return}w.push({x:x(N),y:y(D)})}),w.length&&b.push(w);let C=e.findLastIndex(D=>D!==null&&Number.isFinite(D)),R=cb(null),[I,S]=xf(null),[M,T]=xf(null),V=D=>{S(D);let N=R.current,A=N?.getBoundingClientRect(),E=e[D];if(!N||!A)return;let G=x(D)/h*A.width,z=getComputedStyle(N).direction==="rtl";T({x:z?A.right-G:A.left+G,y:A.top+(E===null?Ls:y(E))/Ls*A.height})},F=()=>{S(null),T(null)},L=Ai(f,D=>V(D)),P=(D,N)=>`${D/N*100}%`,H=o?vz[o]:"text-text-1";return xc("div",{"data-slot":"sparkline","data-status":o,"data-variant":a,className:O(Y4({size:c}),"w-24",H,u),...d,children:[So(Bn,{caption:`${t}: ${Iz(p,i)}`,empty:cn,rowHeader:"Point",columns:[{key:"v",label:t}],rows:e.map((D,N)=>({key:String(N),label:g(N),values:{v:D===null?hr:i(D)}}))}),So("svg",{ref:R,"aria-hidden":!0,viewBox:`0 0 ${h} ${Ls}`,preserveAspectRatio:"none",className:"block size-full overflow-visible rtl:-scale-x-100",children:a==="bar"?e.map((D,N)=>D!==null&&Number.isFinite(D)&&So("rect",{x:x(N)-h/f*.32,width:h/f*.64,y:Math.min(y(D),y(0)),height:Math.max(Math.abs(y(0)-y(D)),2),className:O("fill-current transition-opacity duration-(--dur-state)",I!==null&&I!==N&&"opacity-(--stale)")},N)):xc(K4,{children:[r&&b.map((D,N)=>D.length>1&&So("path",{d:`M${D[0].x},${Ls}${D.map(A=>`L${A.x},${A.y}`).join("")}L${D[D.length-1].x},${Ls}Z`,className:"fill-hover"},`a${N}`)),b.map((D,N)=>D.length===1&&So("path",{d:`M${D[0].x},${D[0].y}h0`,fill:"none",vectorEffect:"non-scaling-stroke",strokeLinecap:"round",strokeWidth:4,className:"stroke-current"},`d${N}`)),b.map((D,N)=>D.length>1&&So("path",{d:D.map((A,E)=>`${E?"L":"M"}${A.x},${A.y}`).join(""),fill:"none",vectorEffect:"non-scaling-stroke",strokeLinejoin:"round",strokeLinecap:"round",strokeWidth:c==="sm"?1:1.5,className:"stroke-current forced-colors:stroke-[CanvasText]"},N))]})}),a==="line"&&(I??(n?C:-1))>=0&&(()=>{let D=I??C,N=e[D];return N===null||!Number.isFinite(N)?null:So("span",{"aria-hidden":!0,"data-slot":"sparkline-end",className:"pointer-events-none absolute size-1.5 -translate-x-1/2 -translate-y-1/2 bg-current rtl:translate-x-1/2",style:{insetInlineStart:P(x(D),h),top:P(y(N),Ls)}})})(),l&&f>0&&xc(K4,{children:[So("span",{role:"group","aria-label":t,"aria-roledescription":"chart",className:"absolute inset-0 flex",onPointerLeave:F,children:e.map((D,N)=>So("button",{ref:L.ref(N),type:"button",tabIndex:L.tabIndex(N),"aria-label":`${g(N)}: ${D===null?"no data":i(D)}`,onPointerEnter:()=>{L.setCurrent(N),V(N)},onFocus:()=>{L.setCurrent(N),V(N)},onBlur:A=>{A.currentTarget.parentElement?.contains(A.relatedTarget)||F()},onKeyDown:A=>{A.key==="Escape"?F():L.onKeyDown(A,N)},className:"h-full min-w-0 flex-1 rounded-tag focus-visible:focus-ring-inset"},N))}),So(zi,{anchor:I!==null?M:null,children:I!==null&&So(Li,{title:g(I),children:So(As,{label:t,value:e[I]===null?hr:i(e[I])})})})]})]})}var Q4=rt("flex w-full min-w-0",{variants:{size:{sm:"h-4",default:"h-(--control-sm)",lg:"h-(--control)"}},defaultVariants:{size:"default"}}),j4={ok:"Passed",warn:"Warning",fail:"Failed"},Cz={quiet:"bg-field",ok:"bg-line-strong",warn:"bg-warn",fail:"bg-fail"};function J4({data:e,label:t,unit:o=["run","runs"],range:a,onBucketClick:r,size:n="default",className:s,...i}){let l=cb(null),[c,u]=xf(null),[d,p]=xf(null),f=cb([]),m=(S,M)=>{u(S);let T=(M??f.current[S])?.getBoundingClientRect();T&&p({x:T.left+T.width/2,y:T.top})},v=()=>{u(null),p(null)},h=Ai(e.length,(S,M)=>m(S,M)),y=S=>`${S.toLocaleString("en-US")} ${S===1?o[0]:o[1]}`,x=S=>{if(S.description)return S.description;let M=[S.count?y(S.count):`No ${o[1]}`];return S.status&&S.status!=="ok"&&M.push(`${S.issues??""} ${S.status==="fail"?"failed":"with warnings"}`.trim()),M.join(", ")},g=a===!1?null:a??[e[0]?.label,e[e.length-1]?.label],[b,w]=yc(),C=e.length>60?1:2,R=w-C*(e.length-1),I=S=>w&&R>=e.length?Math.floor((S+1)*R/e.length)-Math.floor(S*R/e.length):void 0;return xc("div",{ref:l,"data-slot":"status-bar",className:O("flex w-full min-w-0 flex-col gap-1.5",s),...i,children:[So(Bn,{caption:t,rowHeader:"Bucket",columns:[{key:"count",label:o[1][0].toUpperCase()+o[1].slice(1)},{key:"status",label:"Status"}],rows:e.map((S,M)=>({key:String(M),label:S.label,values:{count:S.count.toLocaleString("en-US"),status:S.count?j4[S.status??"ok"]:hr}})),empty:cn}),So("div",{ref:b,role:"group","aria-label":t,"aria-roledescription":"status bar",className:O(Q4({size:n}),e.length>60?"gap-px":"gap-0.5"),onPointerLeave:()=>{l.current?.contains(document.activeElement)||v()},children:e.map((S,M)=>{let T=S.count===0?"quiet":S.status??"ok",V=I(M);return So("button",{ref:F=>{f.current[M]=F,h.ref(M)(F)},type:"button",tabIndex:h.tabIndex(M),"data-slot":"status-bar-cell","data-tone":T,"aria-label":`${S.label}: ${x(S)}`,onPointerEnter:F=>{h.setCurrent(M),m(M,F.currentTarget)},onFocus:F=>{h.setCurrent(M),m(M,F.currentTarget)},onBlur:F=>{F.currentTarget.parentElement?.contains(F.relatedTarget)||v()},onKeyDown:F=>{F.key==="Escape"?v():h.onKeyDown(F,M)},onClick:r&&(()=>r(S,M)),style:V?{width:V,flex:"none"}:void 0,className:O("h-full min-w-px flex-1 rounded-pill transition-opacity duration-(--dur-state) focus-sm",Cz[T],T==="quiet"?"forced-colors:bg-[Canvas] forced-colors:outline-1 forced-colors:-outline-offset-1":"forced-colors:bg-[CanvasText]",c!==null&&c!==M&&"opacity-(--stale)",r?"cursor-pointer":"cursor-default")},M)})}),g&&xc("div",{"aria-hidden":!0,className:"flex justify-between gap-4 type-caption text-text-2 data",children:[So("span",{children:g[0]}),So("span",{children:g[1]})]}),So(zi,{anchor:c!==null?d:null,children:c!==null&&e[c]&&So(Li,{title:e[c].label,children:So(As,{indicator:So(g0,{status:e[c].count===0?"idle":e[c].status??"ok",className:"h-auto text-text-inverse"}),label:e[c].count?j4[e[c].status??"ok"]:"Quiet",value:x(e[c])})})})]})}import{Fragment as db,jsx as ht,jsxs as sa}from"react/jsx-runtime";var ub=[38,52,44,66,58,72,49,61,80,68,74,90];function oC({shape:e}){if(e==="bar")return ht(db,{children:ub.map((o,a)=>ht(gf,{className:"flex-1 rounded-b-none",style:{height:`${o}%`}},a))});if(e==="status")return ht("span",{"aria-hidden":!0,className:"flex h-(--control-sm) w-full gap-0.5 self-center",children:Array.from({length:30},(o,a)=>ht(gf,{className:"h-full min-w-1 flex-1 rounded-pill"},a))});let t=ub.map((o,a)=>`${a/(ub.length-1)*100},${100-o}`).join(" ");return ht("svg",{"aria-hidden":!0,viewBox:"0 0 100 100",preserveAspectRatio:"none",className:"size-full overflow-visible text-field",children:ht("polyline",{points:t,fill:"none",vectorEffect:"non-scaling-stroke",strokeLinejoin:"round",strokeLinecap:"round",strokeWidth:e==="line"?4:2,className:"stroke-current forced-colors:stroke-[GrayText]"})})}function tC({title:e,description:t,actions:o,footer:a,height:r=200,loading:n,error:s,onRetry:i,retrying:l,empty:c,table:u,shape:d="bar",frame:p="card",live:f,className:m,children:v,...h}){let[y,x]=Sz("chart"),g=n?"loading":s?"error":c?"empty":"ready",b=eC(null),w=eC(!1);Rz(()=>{g==="error"||!w.current||(w.current=!1,(!document.activeElement||document.activeElement===document.body)&&b.current?.focus())},[g]);let C=u&&y==="table"&&g==="ready",R=p==="card",I=sa("header",{"data-slot":"chart-frame-header",className:O("flex min-w-0 items-start justify-between gap-3",R?"p-3":"pb-3"),children:[sa("div",{className:"flex min-w-0 flex-col gap-0.5",children:[ht("h3",{ref:b,tabIndex:-1,"data-slot":"chart-frame-title",className:"min-w-0 truncate type-label text-text-1 outline-none",children:e}),t&&ht("p",{"data-slot":"chart-frame-description",className:"type-body-sm text-text-2",children:t})]}),(o||u||f)&&sa("div",{"data-slot":"chart-frame-actions",className:"-my-0.5 flex shrink-0 items-center gap-2",children:[f&&ht(Eo,{status:"running",size:"sm",children:"Live"}),o,u&&sa(z4,{size:"sm","aria-label":"View",value:y,onValueChange:T=>x(T),children:[ht(K1,{value:"chart","aria-label":"Chart",children:ht(Fe,{icon:Ew})}),ht(K1,{value:"table","aria-label":"Table",children:ht(Fe,{icon:Uw})})]})]})]}),S=ht("div",{"data-slot":"chart-frame-plot",className:O("min-w-0",R&&(C?"border-t border-line-faint":"px-3 pb-3")),children:sa("div",{"data-slot":"chart-frame-body",className:"relative min-w-0",style:C?void 0:{height:r},children:[g==="loading"&&sa("div",{"data-slot":"chart-frame-loading","data-shape":d,className:"flex h-full items-end gap-1",children:[sa("span",{className:"sr-only",children:["Loading ",typeof e=="string"?e:"chart"]}),ht(oC,{shape:d})]}),g==="error"&&sa("div",{role:"status",className:"flex h-full flex-col items-start gap-2",children:[ht(Eo,{status:"fail",children:s}),i&&sa(at,{size:"sm",variant:"secondary",pending:!!l,pendingLabel:"Retrying",onFocus:()=>{w.current=!0},onBlur:T=>{T.relatedTarget&&(w.current=!1)},onClick:i,children:[ht(Fe,{icon:ns}),"Retry"]})]}),g==="empty"&&sa("div",{className:"relative h-full type-body-sm text-text-2",children:[c,ht("span",{"aria-hidden":!0,className:"absolute inset-x-0 bottom-6 h-px bg-line"})]}),g==="ready"&&(C?u:v)]})}),M=a&&!C?ht("div",{"data-slot":"chart-frame-footer","aria-hidden":g!=="ready"||void 0,inert:g!=="ready"||void 0,className:O(R?"shell-foot ps-0.5":"pt-2",g!=="ready"&&"invisible"),children:a}):null;return sa("section",{"data-slot":"chart-frame","data-state":g,"data-frame":p,"aria-busy":n||void 0,className:O("flex min-w-0 flex-col text-text-1",R&&"shell forced-colors:border-[CanvasText]",m),...h,children:[R?sa("div",{"data-slot":"chart-frame-panel",className:"panel flex min-w-0 flex-col overflow-hidden forced-colors:border-[CanvasText]",children:[I,S]}):sa(db,{children:[I,S]}),M]})}function aC(e){let{type:t,label:o,title:a,description:r,actions:n,height:s,loading:i,error:l,onRetry:c,retrying:u,empty:d,unit:p,className:f,live:m}=e,v=e.frame??(t==="sparkline"?"none":"card"),h;if(e.type==="line"||e.type==="bar"){let I=e.series??Object.keys(e.config);h=[];for(let S of e.data)for(let M of I)if(M!==e.xKey){let T=Xo(S,M);T!==null&&h.push(T)}}else e.type==="sparkline"?h=e.data.filter(I=>typeof I=="number"):h=e.data.map(I=>I.count);let y=e.valueFormat??B4(p,h),x=!i&&!l&&e.data.length===0,g=d??cn,b=e.type==="line"||e.type==="bar"?(e.series??Object.keys(e.config).filter(I=>I!==e.xKey)).map(I=>({key:I,label:e.config[I]?.label??I})):e.type==="status"?[{key:"count",label:"Count"},{key:"status",label:"Status"}]:[{key:"v",label:o}],w=x?sa(db,{children:[ht("span",{"aria-hidden":!0,children:g}),ht(Bn,{caption:o,rowHeader:e.type==="line"||e.type==="bar"?e.config[e.xKey]?.label??"Date":e.type==="status"?"Bucket":"Point",columns:b,rows:[],empty:g})]}):void 0,C=s??(t==="status"?(e.size==="sm"?16:e.size==="lg"?32:26)+24:t==="sparkline"?26:200);if(t==="line"||t==="bar"){let{data:I,xKey:S,config:M,series:T,xFormat:V,curve:F,area:L,zero:P,stacked:H,defaultHidden:D}=e,N=T??Object.keys(M).filter(z=>z!==S),A=e.legend??N.length>1,E=t==="line"?ht($4,{data:I,xKey:S,series:T,label:o,height:C,curve:F,area:L,zero:P,xFormat:V,valueFormat:y,empty:d}):ht(W4,{data:I,xKey:S,series:T,label:o,height:C,stacked:H,xFormat:V,valueFormat:y,empty:d}),G=null;if(e.table){let z=y??wc;G=ht(Bn,{visible:!0,caption:o,rowHeader:M[S]?.label??"Date",columns:N.map(oe=>({key:oe,label:M[oe]?.label??oe})),rows:I.map((oe,X)=>({key:String(X),label:(V??(Z=>String(Z)))(oe[S],X),values:Object.fromEntries(N.map(Z=>{let U=Xo(oe,Z);return[Z,U===null?hr:z(U)]}))}))})}return ht(tb,{config:M,xKey:S,defaultHidden:D,className:"min-w-0",children:ht(tC,{title:a??o,description:r,actions:n,footer:A?ht(V4,{series:T}):null,height:C,loading:i,error:l,onRetry:c,retrying:u,empty:w,table:G,shape:t,frame:v==="card"?"card":"plain",live:m,"data-chart-type":t,className:f,children:E})})}let R=null;if(e.type==="sparkline"){let{data:I,status:S,variant:M,area:T,end:V,labels:F,interactive:L,size:P}=e;R=ht(X4,{data:I,label:o,status:S,variant:M,area:T,end:V,labels:F,interactive:L,size:P,valueFormat:y,className:v==="none"?f:"w-full"})}else if(e.type==="status"){let{data:I,noun:S,range:M,onBucketClick:T,size:V}=e;R=ht(J4,{data:I,label:o,unit:S,range:M,onBucketClick:T,size:V,className:v==="none"?f:void 0})}return v==="none"?i?sa("span",{"data-slot":"chart-frame-loading","data-shape":t,"aria-busy":!0,className:O("inline-flex",t==="sparkline"?"h-(--control-sm) w-24":"h-(--control-sm) w-full",f),children:[sa("span",{className:"sr-only",children:["Loading ",o]}),ht(oC,{shape:t})]}):R:ht(tC,{title:a??o,description:r,actions:n,height:C,loading:i,error:l,onRetry:c,retrying:u,empty:w,shape:t,frame:v,live:m,"data-chart-type":t,className:f,children:R})}import*as ga from"react";var Oa={};ua(Oa,{Arrow:()=>Cf,Backdrop:()=>Sf,CheckboxItem:()=>Ef,CheckboxItemIndicator:()=>Tf,Clear:()=>MR,Empty:()=>AR,FilterProvider:()=>xR,Group:()=>zf,GroupLabel:()=>Lf,Handle:()=>Nc,Input:()=>IR,Item:()=>Nf,LinkItem:()=>Ff,List:()=>CR,Popup:()=>Vf,Portal:()=>_f,Positioner:()=>Gf,RadioGroup:()=>$f,RadioItem:()=>qf,RadioItemIndicator:()=>Kf,Root:()=>VC,Separator:()=>rg,SubmenuRoot:()=>tg,SubmenuTrigger:()=>ng,Trigger:()=>UC,Viewport:()=>WC,createHandle:()=>jC,useFilter:()=>ig});import*as rC from"react";import*as vf from"react";var pb=vf.createContext(void 0);function _n(e){let t=vf.useContext(pb);if(t===void 0&&!e)throw new Error(He(33));return t}import*as If from"react";var Ns=If.createContext(void 0);function Ve(e){let t=If.useContext(Ns);if(t===void 0&&!e)throw new Error(He(36));return t}var Cf=rC.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{store:i}=Ve(),{arrowRef:l,side:c,align:u,arrowUncentered:d,arrowStyles:p}=_n(),m={open:i.useState("open"),side:c,align:u,uncentered:d};return me("div",t,{ref:[l,o],stateAttributesMapping:hs,state:m,props:{style:p,"aria-hidden":!0,...s}})});import*as nC from"react";import*as Rf from"react";var mb=Rf.createContext(void 0);function $r(e=!0){let t=Rf.useContext(mb);if(t===void 0&&!e)throw new Error(He(25));return t}var Sf=nC.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{store:i}=Ve(),l=i.useState("open"),c=i.useState("mounted"),u=i.useState("transitionStatus"),d=i.useState("lastOpenChangeReason"),p=$r(),f={open:l,transitionStatus:u};return me("div",t,{ref:p?.backdropRef?[o,p.backdropRef]:o,state:f,stateAttributesMapping:li,props:[{role:"presentation",hidden:!c,style:{pointerEvents:d===_.triggerHover?"none":void 0,userSelect:"none",WebkitUserSelect:"none"}},s]})});import*as Cc from"react";import*as vc from"react";var Ic=vc.createContext(null);function Wr(e="root"){let t=vc.useContext(Ic),o=vc.useContext(Ns);return t===null||o===void 0?null:(e==="submenu-trigger"?o.virtualFocus||o.parentVirtualFocus:o.virtualFocus)?t:null}function Ni(e){if(Wr()===null)throw new Error(He(104,e))}var kz={visible:!0,ref:null};function Mz(){return kz}function qr(e,t,o="root"){let a=Wr(o),n=((o==="submenu-trigger"?a?.useSubmenuTrigger:a?.useItem)??Mz)({label:e.label,children:e.children,render:e.render}),s=Ht(t,n.ref);return{visible:n.visible,ref:s,props:n.props}}import*as kf from"react";var fb=kf.createContext(void 0);function sC(){let e=kf.useContext(fb);if(e===void 0)throw new Error(He(30));return e}import*as Fi from"react";import*as iC from"react";function Ez(e){e.preventDefault()}function Mf(e){let{closeOnClick:t,highlighted:o,id:a,nodeId:r,store:n,typingRef:s,itemRef:i,itemMetadata:l}=e,c=Ve(),u=$r(!0),d=l.type==="submenu-trigger",p=d?c.parentVirtualFocus:c.virtualFocus,m=(d&&c.parent.type==="menu"?c.parent.store:c.store).useState("webkitAriaSelected",o),{events:v}=n.useState("floatingTreeRoot"),h=n.useState("open"),y=u!==void 0,x=!p&&h&&o?0:-1;return iC.useMemo(()=>({id:a,role:"menuitem",tabIndex:x,"aria-selected":m,onMouseDown:p?Ez:void 0,onKeyDown(g){g.key===" "&&s?.current&&g.preventDefault()},onMouseMove(g){r&&v.emit("itemhover",{nodeId:r,target:g.currentTarget})},onClick(g){t&&v.emit("close",{domEvent:g.nativeEvent,reason:_.itemPress})},onMouseUp(g){if(u){let b=u.initialCursorPointRef.current;if(u.initialCursorPointRef.current=null,y&&b&&Math.abs(g.clientX-b.x)<=1&&Math.abs(g.clientY-b.y)<=1||y&&!Je.os.mac&&g.button===2)return}i.current&&n.context.allowMouseUpTriggerRef.current&&(!y||g.button===2)&&l.type==="regular-item"&&Lr(i.current,g,{detail:1,pointerType:"mouse"})}}),[t,x,a,v,r,n.context.allowMouseUpTriggerRef,s,i,u,y,l.type,m,p])}var Zn={type:"regular-item"};function Gn(e){let{closeOnClick:t,disabled:o,highlighted:a,id:r,store:n,typingRef:s=n.context.typingRef,nativeButton:i,itemMetadata:l,nodeId:c}=e,u=Fi.useRef(null),{getButtonProps:d,buttonRef:p}=Go({disabled:o,focusableWhenDisabled:!0,native:i,composite:!0}),f=Mf({closeOnClick:t,highlighted:a,id:r,nodeId:c,store:n,typingRef:s,itemRef:u,itemMetadata:l}),m=Fi.useCallback(h=>nt(f,{onMouseEnter(y){l.type==="submenu-trigger"&&l.setActive(y.nativeEvent)}},h,d),[f,d,l]),v=Ht(u,p);return Fi.useMemo(()=>({getItemProps:m,itemRef:v}),[m,v])}var lC="data-checked",cC="data-unchecked";var Un={checked(e){return e?{[lC]:""}:{[cC]:""}},...Ka};import{jsx as uC}from"react/jsx-runtime";var Pz=Cc.forwardRef(function(t,o){let{render:a,className:r,id:n,label:s,nativeButton:i=!1,disabled:l=!1,closeOnClick:c=!1,checked:u=!1,onCheckedChange:d,style:p,...f}=t,{store:m}=Ve(),v=rr({guess:!0,label:s}),h=tt(n),y=m.useState("disabled"),x=m.useState("isActive",v.index),g=m.useState("floatingNodeId"),b=m.useState("itemProps"),w=l||y,{getItemProps:C,itemRef:R}=Gn({closeOnClick:c,disabled:w,highlighted:x,id:h,store:m,nativeButton:i,nodeId:g,itemMetadata:Zn}),I=Cc.useMemo(()=>({disabled:w,highlighted:x,checked:u}),[w,x,u]);function S(T){let V=fe(_.itemPress,T.nativeEvent,void 0,{preventUnmountOnClose:Be});d?.(!u,V)}let M=me("div",t,{state:I,stateAttributesMapping:Un,props:[b,{role:"menuitemcheckbox","aria-checked":u,onClick:S},f,C],ref:[R,o,v.ref]});return uC(fb.Provider,{value:I,children:M})}),Ef=Cc.forwardRef(function(t,o){let{checked:a,defaultChecked:r,onCheckedChange:n,...s}=t,[i,l]=ya({controlled:a,default:r??!1,name:"MenuCheckboxItem",state:"checked"}),c=qr(t,o);function u(d,p){n?.(d,p),p.isCanceled||l(d)}return c.visible?uC(Pz,{...s,checked:i,onCheckedChange:u,ref:c.ref}):null});import*as Pf from"react";var Tf=Pf.forwardRef(function(t,o){let{render:a,className:r,style:n,keepMounted:s=!1,...i}=t,l=sC(),c=Pf.useRef(null),{transitionStatus:u,mounted:d,setMounted:p}=ja(l.checked);oa({batch:!0,enabled:!l.checked,open:l.checked,ref:c,onComplete(){l.checked||p(!1)}});let f={checked:l.checked,disabled:l.disabled,highlighted:l.highlighted,transitionStatus:u};return me("span",t,{state:f,ref:[o,c],stateAttributesMapping:Un,props:{"aria-hidden":!0,...i},enabled:s||d})});import*as Sc from"react";import*as Af from"react";var Rc=Af.createContext(void 0);function dC(){let e=Af.useContext(Rc);if(e===void 0)throw new Error(He(31));return e}import{jsx as pC}from"react/jsx-runtime";var hb=Sc.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,[i,l]=Sc.useState(void 0),c=me("div",t,{ref:o,props:{role:"group","aria-labelledby":i,...s}});return pC(Rc.Provider,{value:l,children:c})}),zf=Sc.forwardRef(function(t,o){let a=Wr()?.Group??hb;return pC(a,{...t,ref:o})});import*as mC from"react";var Lf=mC.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,...i}=t,l=tt(s),c=dC();return B(()=>(c(l),()=>{c(u=>u===l?void 0:u)}),[c,l]),me("div",t,{ref:o,props:{id:l,"aria-hidden":!0,...i}})});import*as bb from"react";import{jsx as Tz}from"react/jsx-runtime";var Az=bb.forwardRef(function(t,o){let{render:a,className:r,id:n,label:s,nativeButton:i=!1,disabled:l=!1,closeOnClick:c=!0,style:u,...d}=t,{store:p}=Ve(),f=rr({guess:!0,label:s}),m=tt(n),v=p.useState("disabled"),h=p.useState("isActive",f.index),y=p.useState("floatingNodeId"),x=p.useState("itemProps"),g=l||v,{getItemProps:b,itemRef:w}=Gn({closeOnClick:c,disabled:g,highlighted:h,id:m,store:p,nativeButton:i,nodeId:y,itemMetadata:Zn});return me("div",t,{state:{disabled:g,highlighted:h},props:[x,d,b],ref:[w,o,f.ref]})}),Nf=bb.forwardRef(function(t,o){let a=qr(t,o);return a.visible?Tz(Az,{...t,ref:a.ref}):null});import*as kc from"react";import{jsx as zz}from"react/jsx-runtime";var Lz=kc.forwardRef(function(t,o){let{render:a,className:r,id:n,label:s,closeOnClick:i=!1,style:l,...c}=t,{store:u}=Ve(),d=kc.useRef(null),p=rr({guess:!0,label:s}),f=tt(n),m=u.useState("isActive",p.index),v=u.useState("floatingNodeId"),h=u.useState("itemProps"),y=u.context.typingRef,{getButtonProps:x,buttonRef:g}=Go({native:!1,composite:!0}),b=Mf({closeOnClick:i,highlighted:m,id:f,nodeId:v,store:u,typingRef:y,itemRef:d,itemMetadata:Zn});function w(R){return nt(b,R,x)}return me("a",t,{state:{highlighted:m},props:[h,c,w],ref:[d,g,o,p.ref]})}),Ff=kc.forwardRef(function(t,o){let a=qr(t,o);return a.visible?zz(Lz,{...t,ref:a.ref}):null});import*as Fs from"react";import*as Df from"react";var Mc=Df.createContext(void 0);function Di(){return Df.useContext(Mc)}import*as Of from"react";function Nz(e,t){let o=es(e.render);if(Of.isValidElement(o)){let a=o.props;if(Object.hasOwn(a,"id"))return a.id??""}return e.id??t}function Hf(e,t,o){let a=Nz(e,t),r=a===t?void 0:a,n=Of.useCallback(s=>o?.(s?r:void 0),[r,o]);return[a,n]}import*as fC from"react";function Oi(e,t,o){let a=es(e.render),r=fC.isValidElement(a)?a.props:void 0,n=e["aria-label"]??r?.["aria-label"],s=e["aria-labelledby"]??r?.["aria-labelledby"];return s==null&&!n&&(s=t?t.id||void 0:o||void 0),s}import{jsx as gC}from"react/jsx-runtime";var yb=Fs.forwardRef(function(t,o){let{render:a,className:r,style:n,finalFocus:s,id:i,initialFocus:l,...c}=t,{store:u,defaultFloatingId:d,setRenderedFloatingId:p,virtualFocus:f,orientation:m}=Ve(),v=Di(),{side:h,align:y}=_n(),x=pf(!0)!=null,g=u.useState("open"),b=u.useState("transitionStatus"),w=u.useState("popupProps"),C=u.useState("mounted"),R=u.useState("instantType"),I=u.useState("activeTriggerElement"),S=u.useState("parent"),M=u.useState("lastOpenChangeReason"),T=u.useState("rootId"),V=u.useState("floatingRootContext"),F=u.useState("floatingTreeRoot"),L=u.useState("closeDelay"),P=u.useState("hoverEnabled"),H=u.useState("disabled"),D=u.useState("openMethod"),N=u.useState("activeTriggerId"),A=u.useState("listElement"),[E,G]=Hf(t,d,p),z=Oi(t,I,N),oe=S.type==="menu"?v:void 0,X=S.type==="context-menu",Z=l??S.type!=="menu";l===void 0&&A&&S.type!=="menu"&&(Z=()=>u.state.activeIndex!==null?!1:A),oa({open:g,ref:u.context.popupRef,onComplete(){g&&u.context.onOpenChangeComplete?.(!0)}}),Fs.useEffect(()=>{function ee(Me){u.setOpen(!1,fe(Me.reason,Me.domEvent))}return F.events.on("close",ee),()=>{F.events.off("close",ee)}},[F.events,u]),Kl(V,{enabled:P&&!H&&!X&&S.type!=="menubar",closeDelay:L});let U=u.useStateSetter("popupElement"),ae=Fs.useContext(Ic)?.useParentHandoff??Dz,{parentVirtualFocusRef:we,handleFocus:j}=ae(u,S,g,f),Y={transitionStatus:b,side:h,align:y,open:g,nested:S.type==="menu",instant:R},q=me("div",t,{state:Y,ref:[o,u.context.popupRef,U,G],stateAttributesMapping:li,props:[w,{id:E,...A?{role:"presentation"}:{role:"menu","aria-orientation":m==="horizontal"?"horizontal":void 0,"aria-labelledby":z},onKeyDown(ee){oe?.onPopupKeyDown?.(ee),x&&sf.has(ee.key)&&ee.stopPropagation()},onFocus:j},wi(b),c,{"data-rootownerid":T}]}),re=S.type===void 0||X;(I||S.type==="menubar"&&M!==_.outsidePress)&&(re=!0);let ge=oe?.getReturnElement??we;return gC(zh,{context:V,openInteractionType:D,modal:X,disabled:!C,returnFocus:s??ge??re,explicitReturnFocus:s===void 0&&ge?!1:void 0,initialFocus:Z,restoreFocus:!0,getInsideElements:S.type===void 0?()=>[u.context.beforeTriggerFocusGuardRef.current]:void 0,externalTree:S.type!=="menubar"?F:void 0,previousFocusableElement:I,nextFocusableElement:S.type===void 0?u.context.triggerFocusTargetRef:void 0,beforeContentFocusGuardRef:u.context.beforeContentFocusGuardRef,children:q})}),Fz={parentVirtualFocusRef:void 0,handleFocus:void 0};function Dz(){return Fz}var Vf=Fs.forwardRef(function(t,o){let a=Wr()?.Popup??yb;return gC(a,{...t,ref:o})});import*as yC from"react";import*as Bf from"react";var wb=Bf.createContext(void 0);function hC(){let e=Bf.useContext(wb);if(e===void 0)throw new Error(He(32));return e}import{jsx as bC}from"react/jsx-runtime";var _f=yC.forwardRef(function(t,o){let{keepMounted:a=!1,...r}=t,{store:n,parent:s}=Ve();if(!(n.useState("mounted")||a))return null;let c=s.type==="menu"||s.type==="menubar"?"group":void 0;return bC(wb.Provider,{value:a,children:bC(Eh,{ref:o,...r,portalOwnerRole:c})})});import*as $n from"react";import*as wC from"react";import{jsx as Oz}from"react/jsx-runtime";var xC=wC.forwardRef(function(t,o){let{cutout:a,...r}=t,n;if(a){let s=a.getBoundingClientRect();n=`polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${s.left}px ${s.top}px,${s.left}px ${s.bottom}px,${s.right}px ${s.bottom}px,${s.right}px ${s.top}px,${s.left}px ${s.top}px)`}return Oz("div",{ref:o,role:"presentation","data-base-ui-inert":"",...r,style:{position:"fixed",inset:0,userSelect:"none",WebkitUserSelect:"none",clipPath:n}})});import*as xb from"react";function vC(e){let{store:t,domReference:o,positionerElement:a,open:r}=e,n=xb.useRef(null),s=xb.useRef(null),i=Ya(a);B(()=>{r||(s.current?.abort(),s.current=null,t.state.instantType==="trigger-change"&&t.set("instantType",void 0))},[r,t]),B(()=>{let l=o,c=n.current;if(l&&(n.current=l),!c||!l||l===c||!t.select("open"))return;t.set("instantType",void 0);let u=new AbortController;return s.current=u,i(()=>{t.select("open")&&t.set("instantType","trigger-change")},u.signal),()=>{u.abort()}},[o,i,t])}import*as MC from"react";var IC={},CC={},RC="";function Zf(e,t){return is(e)?e:t}function SC(e,t,o){return/hidden|clip/.test(e.getComputedStyle(Zf(t,o)).overflowY)}function Hz(e){if(typeof document>"u")return!1;let t=Se(e);return Qe(t).innerWidth-t.documentElement.clientWidth>0}function Vz(e){if(!(typeof CSS<"u"&&CSS.supports&&CSS.supports("scrollbar-gutter","stable"))||typeof document>"u")return!1;let o=Se(e),a=o.documentElement,r=o.body,n=Zf(a,r),s=n.style.overflowY,i=a.style.scrollbarGutter;a.style.scrollbarGutter="stable",n.style.overflowY="scroll";let l=n.offsetWidth;n.style.overflowY="hidden";let c=n.offsetWidth;return n.style.overflowY=s,a.style.scrollbarGutter=i,l===c}function Bz(e){let t=Se(e),o=t.documentElement,a=t.body,r=Zf(o,a),n={overflowY:r.style.overflowY,overflowX:r.style.overflowX};return Object.assign(r.style,{overflowY:"hidden",overflowX:"hidden"}),()=>{Object.assign(r.style,n)}}function _z(e){let t=Se(e),o=t.documentElement,a=t.body,r=Qe(o),n=0,s=0,i=!1,l=Lo.create();if(Je.engine.webkit&&(r.visualViewport?.scale??1)!==1)return()=>{};function c(){let f=r.getComputedStyle(o),m=r.getComputedStyle(a),y=(f.scrollbarGutter||"").includes("both-edges")?"stable both-edges":"stable";n=o.scrollTop,s=o.scrollLeft,IC={scrollbarGutter:o.style.scrollbarGutter,overflowY:o.style.overflowY,overflowX:o.style.overflowX},RC=o.style.scrollBehavior,CC={position:a.style.position,height:a.style.height,width:a.style.width,boxSizing:a.style.boxSizing,overflowY:a.style.overflowY,overflowX:a.style.overflowX,scrollBehavior:a.style.scrollBehavior};let x=o.scrollHeight>o.clientHeight,g=o.scrollWidth>o.clientWidth,b=f.overflowY==="scroll"||m.overflowY==="scroll",w=f.overflowX==="scroll"||m.overflowX==="scroll",C=Math.max(0,r.innerWidth-a.clientWidth),R=Math.max(0,r.innerHeight-a.clientHeight),I=parseFloat(m.marginTop)+parseFloat(m.marginBottom),S=parseFloat(m.marginLeft)+parseFloat(m.marginRight),M=Zf(o,a);if(i=Vz(e),i){o.style.scrollbarGutter=y,M.style.overflowY="hidden",M.style.overflowX="hidden";return}Object.assign(o.style,{scrollbarGutter:y,overflowY:"hidden",overflowX:"hidden"}),(x||b)&&(o.style.overflowY="scroll"),(g||w)&&(o.style.overflowX="scroll"),Object.assign(a.style,{position:"relative",height:I||R?`calc(100dvh - ${I+R}px)`:"100dvh",width:S||C?`calc(100vw - ${S+C}px)`:"100vw",boxSizing:"border-box",overflowY:"hidden",overflowX:"hidden",scrollBehavior:"unset"}),a.scrollTop=n,a.scrollLeft=s,o.setAttribute("data-base-ui-scroll-locked",""),o.style.scrollBehavior="unset"}function u(){Object.assign(o.style,IC),Object.assign(a.style,CC),i||(o.scrollTop=n,o.scrollLeft=s,o.removeAttribute("data-base-ui-scroll-locked"),o.style.scrollBehavior=RC)}function d(){u(),l.request(c)}c();let p=De(r,"resize",d);return()=>{l.cancel(),u(),typeof r.removeEventListener=="function"&&p()}}var vb=class{lockCount=0;restore=null;timeoutLock=Uo.create();timeoutUnlock=Uo.create();acquire(t){return this.lockCount+=1,this.lockCount===1&&this.restore===null&&this.timeoutLock.start(0,()=>this.lock(t)),this.release}release=()=>{this.lockCount-=1,this.lockCount===0&&this.restore&&this.timeoutUnlock.start(0,this.unlock)};unlock=()=>{this.lockCount===0&&this.restore&&(this.restore?.(),this.restore=null)};lock(t){if(this.lockCount===0||this.restore!==null)return;let o=Se(t),a=o.documentElement,r=o.body,n=Qe(a);if(SC(n,a,r)){let i=new n.MutationObserver(()=>{SC(n,a,r)||(i.disconnect(),this.restore=null,this.lock(t))}),l={attributes:!0};i.observe(a,l),i.observe(r,l),this.restore=()=>i.disconnect();return}let s=Je.os.ios||!Hz(t);this.restore=s?Bz(t):_z(t)}},Zz=new vb;function kC(e=!0,t=null){B(()=>{if(e)return Zz.acquire(t)},[e,t])}var Gz=20;function EC(e,t,o,a){let[r,n]=MC.useState(!1);B(()=>{if(!e||!t||o==null){n(!1);return}let s=Se(o).documentElement.clientWidth,i=o.offsetWidth;n(s>0&&i>0&&i>=s-Gz)},[e,t,o]),kC(e&&(!t||r),a)}import{jsx as Ib,jsxs as Uz}from"react/jsx-runtime";var Gf=$n.forwardRef(function(t,o){let{anchor:a,positionMethod:r="absolute",className:n,render:s,side:i,align:l,sideOffset:c=0,alignOffset:u=0,collisionBoundary:d="clipping-ancestors",collisionPadding:p=5,arrowPadding:f=5,sticky:m=!1,disableAnchorTracking:v=!1,collisionAvoidance:h=a8,style:y,...x}=t,{store:g,virtualFocus:b,syncHighlightedItem:w}=Ve(),C=hC(),R=$r(!0),I=g.useState("parent"),S=g.useState("floatingRootContext"),M=g.useState("floatingTreeRoot"),T=g.useState("mounted"),V=g.useState("open"),F=g.useState("modal"),L=g.useState("openMethod"),P=g.useState("activeTriggerElement"),H=g.useState("transitionStatus"),D=g.useState("positionerElement"),N=g.useState("instantType"),A=g.useState("adaptiveOrigin"),E=g.useState("lastOpenChangeReason"),G=g.useState("floatingNodeId"),z=g.useState("floatingParentNodeId"),oe=S.useState("domReferenceElement"),X=a,Z=c,U=u,ae=l,we=h;I.type==="context-menu"&&(X=a??I.context?.anchor,ae=ae??"start",!i&&ae!=="center"&&(U=t.alignOffset??2,Z=t.sideOffset??-5));let j=i,Y=ae;I.type==="menu"?(j=j??"inline-end",Y=Y??"start",we=t.collisionAvoidance??Vp):I.type==="menubar"&&(j=j??(I.context.orientation==="vertical"?"inline-end":"bottom"),Y=Y??"start");let q=I.type==="context-menu",re=ym({anchor:X,floatingRootContext:S,positionMethod:R?"fixed":r,mounted:T,side:j,sideOffset:Z,align:Y,alignOffset:U,arrowPadding:q?0:f,collisionBoundary:d,collisionPadding:p,sticky:m,nodeId:G,keepMounted:C,disableAnchorTracking:v,collisionAvoidance:we,shift:q?{crossAxis:!("side"in we&&we.side==="flip"),rootBoundary:"layoutViewport"}:void 0,externalTree:M,adaptiveOrigin:A,lazyFlip:b?"placement":!1});$n.useEffect(()=>{function he(le){le.open&&(le.parentNodeId===G&&g.set("hoverEnabled",!1),le.nodeId!==G&&le.parentNodeId===g.select("floatingParentNodeId")&&g.setOpen(!1,fe(_.siblingOpen)))}return M.events.on("menuopenchange",he),()=>{M.events.off("menuopenchange",he)}},[g,M.events,G]),$n.useEffect(()=>{if(g.select("floatingParentNodeId")==null)return;function he(le){if(le.open||le.nodeId!==g.select("floatingParentNodeId"))return;let We=le.reason??_.siblingOpen;g.setOpen(!1,fe(We))}return M.events.on("menuopenchange",he),()=>{M.events.off("menuopenchange",he)}},[M.events,g]);let ge=it();$n.useEffect(()=>{V||ge.clear()},[V,ge]),$n.useEffect(()=>{function he(le){if(!(!V||le.nodeId!==g.select("floatingParentNodeId")))if(le.target&&P&&P!==le.target){let We=g.select("closeDelay");We>0?ge.isStarted()||ge.start(We,()=>{g.setOpen(!1,fe(_.siblingOpen))}):g.setOpen(!1,fe(_.siblingOpen))}else ge.clear()}return M.events.on("itemhover",he),()=>{M.events.off("itemhover",he)}},[M.events,V,P,g,ge]),$n.useEffect(()=>{let he={open:V,nodeId:G,parentNodeId:z,reason:g.select("lastOpenChangeReason")};M.events.emit("menuopenchange",he)},[M.events,V,g,G,z]),vC({store:g,domReference:oe,positionerElement:D,open:V});let ee={open:V,side:re.side,align:re.align,anchorHidden:re.anchorHidden,nested:I.type==="menu",instant:N},Me=I.type==="menubar"&&I.context.modal,ne=F&&E!==_.triggerHover;EC(V&&(Me||ne),L==="touch",D,P);let J=wm(t,ee,{styles:re.positionerStyles,transitionStatus:H,props:x,refs:[o,g.useStateSetter("positionerElement")],hidden:!T,inert:!V}),ce=T&&I.type!=="menu"&&(I.type!=="menubar"&&F&&E!==_.triggerHover||I.type==="menubar"&&I.context.modal),ie=null;return I.type==="menubar"?ie=I.context.contentElement:I.type===void 0&&(ie=P),Uz(pb.Provider,{value:re,children:[ce&&Ib(xC,{ref:I.type==="context-menu"||I.type==="nested-context-menu"?I.context.internalBackdropRef:null,inert:vm(!V),cutout:ie}),Ib(Ph,{id:G,children:Ib(lf,{elementsRef:g.context.itemDomElements,labelsRef:g.context.itemLabels,onMapChange:w,children:J})})]})});import*as pn from"react";import*as Uf from"react";var Cb=Uf.createContext(void 0);function PC(){let e=Uf.useContext(Cb);if(e===void 0)throw new Error(He(34));return e}import{jsx as Rb}from"react/jsx-runtime";var Sb=pn.forwardRef(function(t,o){let{render:a,className:r,value:n,defaultValue:s,onValueChange:i,disabled:l=!1,style:c,"aria-labelledby":u,...d}=t,[p,f]=pn.useState(void 0),[m,v]=ya({controlled:n,default:s,name:"MenuRadioGroup"}),h=W((b,w)=>{i?.(b,w),!w.isCanceled&&v(b)}),x=me("div",t,{state:{disabled:l},ref:o,props:{role:"group","aria-labelledby":u??p,"aria-disabled":l||void 0,...d}}),g=pn.useMemo(()=>({value:m,setValue:h,disabled:l}),[m,h,l]);return Rb(Rc.Provider,{value:f,children:Rb(Cb.Provider,{value:g,children:x})})}),$f=pn.memo(pn.forwardRef(function(t,o){let a=Wr()?.RadioGroup??Sb;return Rb(a,{...t,ref:o})}));import*as Ec from"react";import*as Wf from"react";var kb=Wf.createContext(void 0);function TC(){let e=Wf.useContext(kb);if(e===void 0)throw new Error(He(35));return e}import{jsx as AC}from"react/jsx-runtime";var $z=Ec.forwardRef(function(t,o){let{render:a,className:r,id:n,label:s,nativeButton:i=!1,disabled:l=!1,closeOnClick:c=!1,value:u,style:d,...p}=t,{store:f}=Ve(),{value:m,setValue:v,disabled:h}=PC(),y=rr({guess:!0,label:s}),x=tt(n),g=f.useState("isActive",y.index),b=f.useState("floatingNodeId"),w=f.useState("itemProps"),C=f.useState("disabled"),R=l||h||C,I=m===u,{getItemProps:S,itemRef:M}=Gn({closeOnClick:c,disabled:R,highlighted:g,id:x,store:f,nativeButton:i,nodeId:b,itemMetadata:Zn}),T=Ec.useMemo(()=>({disabled:R,highlighted:g,checked:I}),[R,g,I]);function V(L){let P=fe(_.itemPress,L.nativeEvent,void 0,{preventUnmountOnClose:Be});v(u,P)}let F=me("div",t,{state:T,stateAttributesMapping:Un,props:[w,{role:"menuitemradio","aria-checked":I,onClick:V},p,S],ref:[M,o,y.ref]});return AC(kb.Provider,{value:T,children:F})}),qf=Ec.forwardRef(function(t,o){let a=qr(t,o);return a.visible?AC($z,{...t,ref:a.ref}):null});import*as jf from"react";var Kf=jf.forwardRef(function(t,o){let{render:a,className:r,style:n,keepMounted:s=!1,...i}=t,l=TC(),c=jf.useRef(null),{transitionStatus:u,mounted:d,setMounted:p}=ja(l.checked);oa({batch:!0,enabled:!l.checked,open:l.checked,ref:c,onComplete(){l.checked||p(!1)}});let f={checked:l.checked,disabled:l.disabled,highlighted:l.highlighted,transitionStatus:u};return me("span",t,{state:f,stateAttributesMapping:Un,ref:[o,c],props:{"aria-hidden":!0,...i},enabled:s||d})});import*as St from"react";import*as Yf from"react";var Wz=Yf.createContext(null);function Hi(e){let t=Yf.useContext(Wz);if(t===null&&!e)throw new Error(He(5));return t}import*as Tc from"react";import*as Pc from"react";function Xf(e){let t=Pc.useRef(""),o=Pc.useCallback(r=>{r.defaultPrevented||(t.current=r.pointerType,e(r,r.pointerType))},[e]);return{onClick:Pc.useCallback(r=>{if(r.detail===0){e(r,"keyboard");return}"pointerType"in r?e(r,r.pointerType):e(r,t.current),t.current=""},[e]),onPointerDown:o}}function qz(e,t){let o=W((n,s)=>{(typeof e=="function"?e():e)||t(s||(Je.os.ios?"touch":""))}),{onClick:a,onPointerDown:r}=Xf(o);return Tc.useMemo(()=>({onClick:a,onPointerDown:r}),[a,r])}function zC(e){let[t,o]=Tc.useState(null),a=qz(e,o);return Zm(e,r=>{r&&!e&&o(null)}),Tc.useMemo(()=>({openMethod:t,triggerProps:a}),[t,a])}function LC(e){return e==null?_.none:e.type.startsWith("key")?_.keyboard:e.type.startsWith("mouse")||e.type.startsWith("pointer")?_.pointer:_.none}import*as Vi from"react";var NC={...di,disabled:e=>e.parent.type==="menubar"&&e.parent.context.disabled||e.disabled,modal:e=>(e.parent.type===void 0||e.parent.type==="context-menu")&&(e.modal??!0),openMethod:e=>e.openMethod,keyboardOpen:e=>e.keyboardOpen,allowMouseEnter:e=>e.allowMouseEnter,highlightItemOnHover:e=>e.highlightItemOnHover,parent:e=>e.parent,rootId:e=>e.parent.type==="menu"?e.parent.store.select("rootId"):e.parent.type!==void 0?e.parent.context.rootId:e.rootId,activeIndex:e=>e.activeIndex,listElement:e=>e.listElement,triggerControlsId:(e,t)=>{let o=di.triggerPopupId(e,t);return o?e.listElement?.id||o:void 0},filterTriggerProps:e=>e.filterTriggerProps,inputProps:e=>e.inputProps,webkitAriaSelected:(e,t)=>Je.engine.webkit&&e.inputFocused&&t?!0:void 0,highlightedItemId:e=>e.highlightedItem?.id||void 0,isActive:(e,t)=>e.activeIndex===t,hoverEnabled:e=>e.hoverEnabled,instantType:e=>e.instantType==="trigger-change"&&!di.open(e)?void 0:e.instantType,lastOpenChangeReason:e=>e.openChangeReason,floatingTreeRoot:e=>e.parent.type==="menu"?e.parent.store.select("floatingTreeRoot"):e.floatingTreeRoot,floatingNodeId:e=>e.floatingNodeId,floatingParentNodeId:e=>e.floatingParentNodeId,itemProps:e=>e.itemProps,closeDelay:e=>e.closeDelay,adaptiveOrigin:e=>e.adaptiveOrigin,keyboardEventRelay:e=>{if(e.keyboardEventRelay)return e.keyboardEventRelay;if(e.parent.type==="menu")return e.parent.store.select("keyboardEventRelay")}},Qf=class extends Ja{constructor(t,o,a=!1){let r=new Nn,n=OC(r,o,a,t);super(n,DC(r),NC),this.observe("parent",s=>{s.type==="menu"?this.context.allowMouseUpTriggerRef=s.store.context.allowMouseUpTriggerRef:s.type!==void 0&&(this.context.allowMouseUpTriggerRef=s.context.allowMouseUpTriggerRef)})}subscribeToParentMenu(){let t=this.state.parent;if(t.type!=="menu")return;let o=t.store.select("rootId"),a=t.store.select("floatingTreeRoot"),r=t.store.select("keyboardEventRelay");return t.store.subscribe(()=>{let n=t.store.select("rootId"),s=t.store.select("floatingTreeRoot"),i=t.store.select("keyboardEventRelay");o===n&&a===s&&r===i||(o=n,a=s,r=i,this.notifyAll())})}setOpen(t,o){this.state.floatingRootContext.context.events.emit("setOpen",{open:t,eventDetails:o})}setActiveIndex(t,o,a){if(this.state.activeIndex!==t){let n=(t===null?void 0:this.context.itemDomElements.current[t])===this.context.reportedItem;this.context.highlightReason=n?"none":o,this.context.highlightEvent=n?void 0:a}this.set("activeIndex",t)}highlightItem(t,o,a){let r=this.context.itemDomElements.current.indexOf(t);r>-1&&this.setActiveIndex(r,o,a)}};function FC(){let e=new Nn,t=new gi(Object.freeze(OC(e)),Object.freeze(DC(e)),NC);return Object.assign(t,{setOpen:Be})}function DC(e){return{positionerRef:Vi.createRef(),popupRef:Vi.createRef(),typingRef:{current:!1},itemDomElements:{current:[]},itemLabels:{current:[]},highlightReason:"none",highlightEvent:void 0,reportedItem:void 0,allowMouseUpTriggerRef:{current:!1},virtualFocusRef:void 0,triggerFocusTargetRef:Vi.createRef(),beforeTriggerFocusGuardRef:Vi.createRef(),beforeContentFocusGuardRef:Vi.createRef(),onOpenChangeComplete:void 0,triggerElements:e}}function OC(e,t,o=!1,a){return{...Xp(e,t,o),disabled:!1,modal:!0,openMethod:null,keyboardOpen:!1,allowMouseEnter:!1,highlightItemOnHover:!0,parent:{type:void 0},rootId:void 0,activeIndex:null,listElement:null,filterTriggerProps:Le,inputProps:Le,inputFocused:!1,highlightedItem:void 0,hoverEnabled:!0,instantType:void 0,openChangeReason:null,floatingTreeRoot:new An,floatingNodeId:void 0,floatingParentNodeId:null,itemProps:Le,keyboardEventRelay:void 0,closeDelay:0,adaptiveOrigin:void 0,...a}}import*as HC from"react";var Wn=HC.createContext(null);function Mb(e,t){return(e===_.triggerPress||e===_.itemPress)&&t?.detail===0}function Jf(e,t){return e===_.listNavigation||Mb(e,t)}import{jsx as Ac,jsxs as jz}from"react/jsx-runtime";var Ds=Sl(function(t){let{children:o,open:a,onOpenChange:r,onOpenChangeComplete:n,onItemHighlighted:s,defaultOpen:i=!1,disabled:l=!1,modal:c,loopFocus:u=!0,orientation:d="vertical",actionsRef:p,closeParentOnEsc:f=!1,handle:m,triggerId:v,defaultTriggerId:h=null,highlightItemOnHover:y=!0,isSubmenu:x=!1,virtualFocus:g=!1,virtualFocusRef:b,allowEscape:w=!0,resetOnPointerLeave:C=!0}=t,R=$r(!0),I=Ve(!0),S=Hi(!0),M=I?.store,T=I?.virtualFocus??!1,V=St.useMemo(()=>x&&M?{type:"menu",store:M}:S?{type:"menubar",context:S}:R&&!M?{type:"context-menu",context:R}:{type:void 0},[R,M,S,x]),F=tt(),L=tt(),[P,H]=St.useState(void 0),D=(P??L)||void 0,N=Na(),A=V.type==="menu"?V.store:void 0,E=(a??i)&&A?.state.transitionStatus==="starting",G=$e(()=>E?A?.state.instantType:void 0).current,z=$e(()=>{let Ie=new Qf({open:i,openProp:a,activeTriggerId:h,triggerIdProp:v,parent:V,disabled:l,highlightItemOnHover:y,modal:V.type===void 0?c:void 0,rootId:F,instantType:G},D,N!=null);return Ie.context.virtualFocusRef=b,Ie}).current;z.useControlledProp("openProp",a),z.useControlledProp("triggerIdProp",v),z.useContextCallback("onOpenChangeComplete",n);let oe=z.useState("floatingTreeRoot"),X=_l(oe),Z=z.useState("open"),U=z.useState("activeTriggerElement"),ae=z.useState("positionerElement"),we=z.useState("hoverEnabled"),j=z.useState("disabled"),Y=z.useState("lastOpenChangeReason"),q=z.useState("parent"),re=z.useState("activeIndex"),ge=z.useState("keyboardOpen"),ee=z.useState("payload"),Me=z.useState("floatingParentNodeId"),ne=St.useRef(null),J=St.useRef(q.type!=="context-menu"),ce=it(),ie=St.useRef(!0),he=it(),le=Me!=null,{openMethod:We,triggerProps:Oe}=zC(Z);z.useSyncedValues({disabled:l,highlightItemOnHover:y,modal:q.type===void 0?c:void 0,openMethod:We,rootId:F}),$p(z);let{forceUnmount:xe,transitionStatus:$}=Wp(Z,z,()=>{z.set("allowMouseEnter",!1)},E),Q=Ya(z.context.popupRef);St.useEffect(()=>{if(G===void 0)return;let Ie=()=>{z.state.instantType===G&&z.set("instantType",void 0)};if(!Z){Ie();return}if($!==void 0)return;if(z.context.popupRef.current==null){Ie();return}let Re=new AbortController;return Q(Ie,Re.signal),()=>{Re.abort()}},[G,Z,$,Q,z]),B(()=>{R&&!I?z.update({parent:{type:"context-menu",context:R},floatingNodeId:X,floatingParentNodeId:N}):(I||!z.select("activeTriggerElement"))&&z.update({floatingNodeId:X,floatingParentNodeId:N})},[R,I,X,N,U,z]),St.useEffect(()=>{if(Z||(ne.current=null),q.type==="context-menu"){if(!Z){ce.clear(),J.current=!1;return}ce.start(500,()=>{J.current=!0})}},[ce,Z,q.type]),B(()=>{!Z&&!we&&z.set("hoverEnabled",!0)},[Z,we,z]);let Ee=W((Ie,Re)=>{let Ke=Re.reason;if(!Ie&&!z.select("open")||Z===Ie&&Re.trigger===U&&Y===Ke)return;let Tt=Hh(Re);if(!Ie&&Re.trigger==null&&(Re.trigger=U??void 0),r?.(Ie,Re),Re.isCanceled)return;z.state.floatingRootContext.dispatchOpenChange(Ie,Re);let la=Re.event;if(Ie===!1&&Ke!==_.itemPress&&la?.type==="click"&&la.pointerType==="touch"&&!ie.current)return;Ie&&Ke===_.triggerFocus?(ie.current=!1,he.start(300,()=>{ie.current=!0})):(ie.current=!0,he.clear());let ha=!Ie&&(Ke===_.escapeKey||Ke==null);ne.current=Re.event;let wt=Oh(z.state,Ie,Re.trigger,Tt());wt.openChangeReason=Ke,wt.keyboardOpen=Ie&&Jf(Ke,la),q.type==="menubar"&&(Ke===_.triggerFocus||Ke===_.focusOut||Ke===_.triggerHover||Ke===_.listNavigation||Ke===_.siblingOpen)?wt.instantType="group":Mb(Ke,la)?wt.instantType="click":ha?wt.instantType="dismiss":wt.instantType=void 0,z.update(wt)}),ue=$l({popupStore:z,floatingRootContext:z.state.floatingRootContext,floatingId:D,nested:N!=null,onOpenChange:Ee}),be=ue.context.events;B(()=>{let Ie=({open:Re,eventDetails:Ke})=>Ee(Re,Ke);return be.on("setOpen",Ie),()=>{be?.off("setOpen",Ie)}},[be,Ee]),B(()=>z.subscribeToParentMenu(),[z]);let bt=St.useCallback(()=>{z.setOpen(!1,fe(_.imperativeAction))},[z]);St.useImperativeHandle(p,()=>({unmount:xe,close:bt}),[xe,bt]);let ct;q.type==="context-menu"&&(ct=q.context),St.useImperativeHandle(ct?.positionerRef,()=>ae,[ae]),St.useImperativeHandle(ct?.actionsRef,()=>({setOpen:Ee}),[Ee]);let ut=Ul(ue,{enabled:!j,bubbles:{escapeKey:f&&q.type==="menu"},outsidePress(){return q.type!=="context-menu"||ne.current?.type==="contextmenu"?!0:J.current},externalTree:le?oe:void 0}),ot=Vo(),yt=Gh(ue,{enabled:!j,listRef:z.context.itemDomElements,activeIndex:re,virtual:g,nested:q.type==="menubar"||!g&&q.type!==void 0,parentOrientation:q.type==="menubar"?q.context.orientation:void 0,loopFocus:u,focusItemOnOpen:g?ge:void 0,allowEscape:g&&u&&w,orientation:d,triggerOrientation:g?"vertical":d,rtl:ot==="rtl",disabledIndices:Nt,onNavigate(Ie,Re){z.setActiveIndex(Ie,LC(Re),Re?.nativeEvent)},openOnArrowKeyDown:q.type!=="context-menu"&&!(g&&x),externalTree:!g&&le?oe:void 0,nestedReturnFocusRef:A?.context.virtualFocusRef,focusItemOnHover:y,resetOnPointerLeave:C}),Qo=St.useCallback(Ie=>{z.context.typingRef.current=Ie},[z]),Ct=Uh(ue,{enabled:!j&&!g,listRef:z.context.itemLabels,elementsRef:z.context.itemDomElements,activeIndex:re,resetMs:500,onMatch:(Ie,Re)=>{Z&&Ie!==re&&z.setActiveIndex(Ie,_.keyboard,Re.nativeEvent)},onTyping:Qo}),kt=W(s),Sa=St.useRef(-1),Dt=W(()=>{let Ie=z.state.activeIndex,Re=Ie===null?void 0:z.context.itemDomElements.current[Ie]??void 0;if(Re?.isConnected===!1)return;let Ke=Re===void 0?-1:Ie;if(Sa.current===Ke&&z.context.reportedItem===Re)return;Sa.current=Ke,z.context.reportedItem=Re,g&&z.set("highlightedItem",Re);let{highlightReason:Tt,highlightEvent:la}=z.context;z.context.highlightReason=_.none,z.context.highlightEvent=void 0,s&&kt(Re,vx(Tt,la,{label:Re===void 0?void 0:z.context.itemLabels.current[Ke]??void 0}))});B(()=>{Dt()},[re,Dt]);let Do=St.useMemo(()=>{if(!g)return yt.reference;if(!yt.trigger)return Le;let{onFocus:Ie,...Re}=yt.trigger;return Re},[g,yt.reference,yt.trigger]);z.useSyncedValue("inputProps",g?yt.reference??Le:Le);let Va=St.useMemo(()=>{let Ie=nt(Ct.reference,Do,ut.reference,{onMouseMove(){z.set("allowMouseEnter",!0)}},Oe);return Ie["aria-haspopup"]="menu",Ie["aria-expanded"]=Z,Ie},[z,Ct.reference,Do,ut.reference,Oe,Z]),ka=St.useMemo(()=>{let Ie=nt(yt.trigger,ut.trigger,Oe);return Ie["aria-haspopup"]="menu",Ie["aria-expanded"]=!1,Ie},[yt.trigger,ut.trigger,Oe]);$e(()=>(z.update({inactiveTriggerProps:ka}),null));let ko=St.useMemo(()=>nt(Zp,{onMouseMove(){z.set("allowMouseEnter",!0),q.type==="menu"&&z.set("hoverEnabled",!1)},onClick(){z.select("hoverEnabled")&&z.set("hoverEnabled",!1)},onKeyDown(Ie){let Re=z.select("keyboardEventRelay");Re&&!Ie.isPropagationStopped()&&Re(Ie)}},Ct.floating,yt.floating,ut.floating),[q.type,z,Ct.floating,yt.floating,ut.floating]),Bo=yt.item??Le;qp(z,{floatingRootContext:ue,activeTriggerProps:Va,inactiveTriggerProps:ka,popupProps:ko,itemProps:Bo});let nr=St.useMemo(()=>({store:z,parent:V,orientation:d,loopFocus:u,allowEscape:w,defaultFloatingId:L,setRenderedFloatingId:H,virtualFocus:g,parentVirtualFocus:T,syncHighlightedItem:Dt}),[z,V,d,u,w,L,g,T,Dt]),_e=typeof o=="function"?o({payload:ee}):o,Rt=jz(Ns.Provider,{value:nr,children:[m&&Ac(Gp,{handle:m,store:z}),_e]});return(q.type===void 0||q.type==="context-menu")&&(Rt=Ac(Th,{externalTree:oe,children:Rt})),Rt});function VC(e){let t=St.useContext(Wn);if(t===null)return Ac(Ds,{...e});let o=t.Root;return Ac(Wn.Provider,{value:null,children:Ac(o,{...t.options,...e})})}import*as BC from"react";import{jsx as eg}from"react/jsx-runtime";var Kz={};function tg(e){Ve();let t=BC.useContext(Wn);if(t!==null){let o=t.SubmenuRoot;return eg(Wn.Provider,{value:null,children:eg(o,{...t.options,...e})})}return eg(Mc.Provider,{value:Kz,children:eg(Ds,{...e,isSubmenu:!0})})}import*as ia from"react";var og=5;function _C(e,t){let o=Yz(t);return e.clientX>=o.left-og&&e.clientX<=o.right+og&&e.clientY>=o.top-og&&e.clientY<=o.bottom+og}function Yz(e){let t=e.getBoundingClientRect(),o=Qe(e);if(Je.env.jsdom)return t;let a=o.getComputedStyle(e,"::before"),r=o.getComputedStyle(e,"::after");if(!(a.content!=="none"||r.content!=="none"))return t;let s=parseFloat(a.width)||0,i=parseFloat(a.height)||0,l=parseFloat(r.width)||0,c=parseFloat(r.height)||0,u=Math.max(t.width,s,l),d=Math.max(t.height,i,c),p=u-t.width,f=d-t.height;return{left:t.left-p/2,right:t.right+p/2,top:t.top-f/2,bottom:t.bottom+f/2}}function zc(e){if(Ae(e)&&e.hasAttribute("data-rootownerid"))return e.getAttribute("data-rootownerid");if(!Wa(e))return zc($a(e))}function ZC(e,t){function o(n,s,i){let l=n.currentTarget;Ta(()=>{e.setOpen(!1,fe(_.focusOut,n.nativeEvent,l))}),jv(l.isConnected?l:t.current,s,i)?.focus()}function a(n){o(n,-1,e.select("positionerElement"))}function r(n){let s=e.select("positionerElement");s&&rn(n,s)?e.context.beforeContentFocusGuardRef.current?.focus():o(n,1,s)}return{handlePreFocusGuardFocus:a,handleFocusTargetFocus:r}}import*as ag from"react";function GC(e){let{enabled:t=!0,mouseDownAction:o,open:a}=e,r=ag.useRef(!1);return ag.useMemo(()=>t?{onMouseDown:n=>{(o==="open"&&!a||o==="close"&&a)&&(r.current=!0,Se(n.currentTarget).addEventListener("click",()=>{r.current=!1},{once:!0}))},onClick:n=>{r.current&&(r.current=!1,n.preventBaseUIHandler())}}:Le,[t,o,a])}import{jsx as Lc,jsxs as Xz}from"react/jsx-runtime";var UC=xp(function(t,o){let{render:a,className:r,style:n,disabled:s=!1,nativeButton:i=!0,id:l,openOnHover:c,delay:u=100,closeDelay:d=0,handle:p,payload:f,...m}=t,v=Ve(!0),y=Qp(p)??v?.store;if(!y)throw new Error(He(85));let x=tt(l),g=y.useState("isTriggerActive",x),b=y.useState("floatingRootContext"),w=y.useState("isOpenedByTrigger",x),C=y.useState("triggerControlsId",x),R=ia.useRef(null),I=Jz(),S=Ys(!0),M=ra(),T=ia.useMemo(()=>M??new An,[M]),V=_l(T),F=Na(),{registerTrigger:L,isMountedByThisTrigger:P}=Up(x,R,y,{payload:f,closeDelay:d,parent:I,floatingTreeRoot:T,floatingNodeId:V,floatingParentNodeId:F,keyboardEventRelay:S?.relayKeyboardEvent}),H=I.type==="menubar",D=y.useState("disabled"),N=s||D||H&&I.context.disabled,{getButtonProps:A,buttonRef:E}=Go({disabled:N,native:i});ia.useEffect(()=>{!w&&I.type===void 0&&(y.context.allowMouseUpTriggerRef.current=!1)},[y,w,I.type]);let G=ia.useRef(null),z=it(),oe=W(he=>{if(!G.current)return;z.clear(),y.context.allowMouseUpTriggerRef.current=!1;let le=he.target;de(G.current,le)||de(y.select("positionerElement"),le)||le===G.current||le!=null&&zc(le)===y.select("rootId")||_C(he,G.current)||T.events.emit("close",{domEvent:he,reason:_.cancelOpen})});ia.useEffect(()=>{let he=Se(G.current);if(w&&y.select("lastOpenChangeReason")===_.triggerHover)return he.addEventListener("mouseup",oe,{once:!0}),()=>{he.removeEventListener("mouseup",oe)}},[w,oe,y]);let X=H&&I.context.hasSubmenuOpen,U=xs(b,{enabled:(c??X)&&!N&&(!H||X&&!P),handleClose:Is({blockPointerEvents:!H}),mouseOnly:!0,move:!1,restMs:I.type===void 0?u:void 0,delay:{close:d},triggerElementRef:R,externalTree:T,isActiveTrigger:g,isClosing:()=>y.select("transitionStatus")==="ending"}),ae=Qz(w,y.select("lastOpenChangeReason")),we=Gl(b,{enabled:!N,event:w&&H?"click":"mousedown",toggle:!0,ignoreMouse:!1,stickIfOpen:I.type===void 0?ae:!1}),j=jl(b,{enabled:!N&&X}),Y=GC({open:w,enabled:H,mouseDownAction:"open"}),q=ia.useMemo(()=>nt(j.reference,we.reference),[j.reference,we.reference]),re=y.useState("triggerProps",P),ge=y.useState("filterTriggerProps"),{handlePreFocusGuardFocus:ee,handleFocusTargetFocus:Me}=ZC(y,R),ne={disabled:N,open:w},J=[G,o,E,L,R],ce=[q,U??Le,re,{"aria-haspopup":"menu","aria-controls":C,id:x,onMouseDown:he=>{if(y.select("open"))return;z.start(200,()=>{y.context.allowMouseUpTriggerRef.current=!0}),Se(he.currentTarget).addEventListener("mouseup",oe,{once:!0})}},ge,H?{role:"menuitem"}:{},Y,m,A],ie=me("button",t,{enabled:!H,stateAttributesMapping:Pl,state:ne,ref:J,props:ce});return H?Lc(Ti,{tag:"button",render:a,className:r,style:n,state:ne,refs:J,props:ce,stateAttributesMapping:Pl}):w?Xz(ia.Fragment,{children:[Lc(tn,{ref:y.context.beforeTriggerFocusGuardRef,onFocus:ee},`${x}-pre-focus-guard`),Lc(ia.Fragment,{children:ie},x),Lc(tn,{ref:y.context.triggerFocusTargetRef,onFocus:Me},`${x}-post-focus-guard`)]}):Lc(ia.Fragment,{children:ie},x)});function Qz(e,t){let o=it(),[a,r]=ia.useState(!1);return B(()=>{e&&t===_.triggerHover?(r(!0),o.start(500,()=>{r(!1)})):e||(o.clear(),r(!1))},[e,t,o]),a}function Jz(){let e=Hi(!0);return ia.useMemo(()=>e?{type:"menubar",context:e}:{type:void 0},[e])}import*as $C from"react";var WC=$C.forwardRef(function(t,o){let{render:a,className:r,style:n,children:s,...i}=t,{store:l}=Ve(),{side:c}=_n(),u=l.useState("instantType"),{children:d,state:p}=km({store:l,side:c,children:s}),f={activationDirection:p.activationDirection,transitioning:p.transitioning,instant:u};return me("div",t,{state:f,ref:o,props:[i,{children:d}],stateAttributesMapping:Sm})});import*as qC from"react";var rg=qC.forwardRef(function(t,o){let{className:a,render:r,orientation:n="horizontal",style:s,...i}=t;return me("div",t,{state:{orientation:n},ref:o,props:[{role:"separator","aria-orientation":n},i]})});import*as yr from"react";import{jsx as eL}from"react/jsx-runtime";var tL={"aria-expanded":void 0},oL=yr.forwardRef(function(t,o){let{render:a,className:r,style:n,label:s,id:i,nativeButton:l=!1,openOnHover:c=!0,delay:u=100,closeDelay:d=0,disabled:p=!1,...f}=t,m=Ve(!0);if(m?.parent.type!=="menu")throw new Error(He(37));let v=_n(),h=Di(),{store:y,parentVirtualFocus:x}=m,g=m.parent.store,b=rr({guess:!0,label:s}),w=tt(i),C=y.useState("open"),R=yr.useRef(!1),I=y.useState("positionerElement"),S=y.useState("floatingRootContext"),M=y.useState("floatingTreeRoot"),T=y.useState("triggerPopupId",w),V=Dh(w,y),F=W(ne=>{V(ne);let J=y.select("activeTriggerElement");ne!==null&&y.select("open")&&(J===ne||y.select("activeTriggerId")==null)&&y.update({activeTriggerId:w??null,activeTriggerElement:ne,closeDelay:d})}),L=yr.useRef(null),P=yr.useCallback(ne=>{L.current=ne,y.set("activeTriggerElement",ne)},[y]);B(()=>(F(L.current),()=>F(null)),[F,w,y]),B(()=>{if(!C||!I)return;function ne(J){Ue(J)===y.context.beforeContentFocusGuardRef.current&&(R.current=J.relatedTarget===L.current)}return I.addEventListener("focusout",ne,!0),()=>{R.current=!1,I.removeEventListener("focusout",ne,!0)}},[C,I,y]),y.useSyncedValue("closeDelay",d);let H=y.useState("disabled"),D=g.useState("disabled"),N=p||H||D,A=g.useState("itemProps"),E=g.useState("isActive",b.index),G=yr.useMemo(()=>({type:"submenu-trigger",setActive(ne){g.select("highlightItemOnHover")&&g.setActiveIndex(b.index,_.pointer,ne)}}),[g,b.index]),{getItemProps:z,itemRef:oe}=Gn({closeOnClick:!1,disabled:N,highlighted:E,id:w,store:y,typingRef:g.context.typingRef,nativeButton:l,itemMetadata:G,nodeId:v?.context.nodeId}),X=y.useState("hoverEnabled"),Z=xs(S,{enabled:X&&c&&!N,handleClose:Is({blockPointerEvents:!0}),mouseOnly:!0,move:!0,restMs:u,delay:{open:u,close:d},shouldOpen:u>0?()=>g.select("allowMouseEnter"):void 0,triggerElementRef:L,externalTree:M,isClosing:()=>y.select("transitionStatus")==="ending",guardStaleOpen:!0}),ae=Gl(S,{enabled:!N,event:"mousedown",toggle:!0,ignoreMouse:c,stickIfOpen:c}).reference??Le,we=y.useState("triggerProps",!0);delete we.id;let j={disabled:N,highlighted:E,open:C},Y=y.useState("openMethod"),re=y.useState("lastOpenChangeReason")===_.listNavigation||Y==="keyboard",ge=C&&re&&Je.screenReader.voiceOver,ee=h?.onTriggerKeyDown?{onKeyDown:h.onTriggerKeyDown}:void 0;return me("div",t,{state:j,stateAttributesMapping:Sp,props:[ae,Z,we,ee,A,ge?tL:void 0,{"aria-controls":T,tabIndex:x||!(C||E)?-1:0,onFocus(ne){y.select("open")&&R.current&&(R.current=!1,y.setOpen(!1,fe(_.focusOut,ne.nativeEvent)))},onBlur(){E&&g.setActiveIndex(null,_.none)}},f,z],ref:[o,b.ref,oe,F,P]})}),ng=yr.forwardRef(function(t,o){let a=qr(t,o,"submenu-trigger");if(!a.visible)return null;let r=a.props?nt(a.props,t):t;return eL(oL,{...r,ref:a.ref})});var Nc=class extends ui{constructor(){super(FC(),"Menu")}open(t){this.openByTrigger(t)}close(){this.closePopup()}get isOpen(){return this.attachedStore?.select("open")??!1}};function jC(){return new Nc}import*as wR from"react";import"react";import*as fR from"react";import*as Ra from"react";function Eb(e){return Array.isArray(e)?e.map(t=>Eb(t)).join(","):e==null?"":String(e)}import*as aL from"react";import{jsx as ude}from"react/jsx-runtime";function sg(e,t){if(t&&e!=null)return t(e)??"";if(e&&typeof e=="object"){if("label"in e&&e.label!=null)return String(e.label);if("value"in e)return String(e.value)}return Km(e)}var KC=new Map;function ig(e={}){let{locale:t,...o}=e,a={usage:"search",sensitivity:"base",ignorePunctuation:!0,...o},r=`${Eb(t)}|${JSON.stringify(a)}`,n=KC.get(r);if(n)return n;let s=new Intl.Collator(t,a),i={contains(l,c,u){if(!c)return!0;let d=sg(l,u);for(let p=0;p<=d.length-c.length;p+=1)if(s.compare(d.slice(p,p+c.length),c)===0)return!0;return!1},startsWith(l,c,u){if(!c)return!0;let d=sg(l,u);return s.compare(d.slice(0,c.length),c)===0},endsWith(l,c,u){if(!c)return!0;let d=sg(l,u),p=c.length;return d.length>=p&&s.compare(d.slice(d.length-p),c)===0}};return KC.set(r,i),i}import*as Bi from"react";function lg(){let e=$e(()=>new Map).current,[t,o]=Bi.useState(0),a=Bi.useRef(!1),r=W(()=>{a.current||(a.current=!0,o(i=>i+1))}),n=W((i,l)=>(e.set(i,l),r(),()=>{e.delete(i),r()})),s=Bi.useMemo(()=>new Map(e),[t]);return B(()=>{a.current=!1},[t]),{items:s,registerItem:n,liveItems:e}}import*as mn from"react";function YC(){throw new Error(He(103))}var Fc=mn.createContext(null);function jr(e=!1){let t=mn.useContext(Fc);return t===null&&!e&&YC(),t}var Pb=mn.createContext(null);function Kr(e=!1){let t=mn.useContext(Pb);return t===null&&!e&&YC(),t}function XC(e){let t=mn.useContext(Fc);if(e===null)return null;for(;t!==null&&t.listRef!==e;)t=t.parent;return t}var Tb=mn.createContext("");function qn(){return mn.useContext(Tb)}var Oc={isEmpty:e=>e.visibleItemIds===null?e.registeredItemCount===0:e.visibleItemIds.size===0,isItemVisible:(e,t)=>e.visibleItemIds===null||e.visibleItemIds.has(t)},Dc=class extends Ja{constructor(){super({visibleItemIds:null,registeredItemCount:0},Le,Oc)}},QC={registerItem:()=>Be,store:new Dc};import{jsx as Ab}from"react/jsx-runtime";function JC(e){let{children:t,open:o,disabled:a=!1,openedByKeyboard:r=!1,locale:n,value:s,query:i,onValueChange:l,filter:c,autoHighlight:u=!1,triggerId:d,listRef:p,getActiveIndex:f,setActiveIndex:m,focusOwnerRef:v}=e,h=Ra.useContext(Fc),[y,x]=Ra.useState(void 0),[g,b]=Ra.useState(r),[w,C]=Ra.useState(r),[R,I]=Ra.useState(r);r!==R&&(I(r),b(r),C(r));let{items:S,registerItem:M,liveItems:T}=lg(),V=tt(),F=$e(()=>new Dc).current,L=W((j,Y)=>{let q=M(j,Y);return F.set("registeredItemCount",T.size),()=>{q(),F.set("registeredItemCount",T.size)}}),P=Ra.useRef(null),H=Ra.useRef(null),D=Ra.useMemo(()=>ig({locale:n}).contains,[n]),N=v??P,A=(i??s).trim(),E=A===""||c===null?null:c??D,G=o&&(u==="always"||u&&A!==""),z=V?`${V}-list`:void 0,oe=(y??z)||void 0,X=d||void 0,Z=W((j,Y)=>{l?.(j,Y),!Y.isCanceled&&!u&&m(null)}),U=W(j=>{let Y=p.current,q=f();q!=null&&Y[q]!=null&&Y[q]===j[q]||m(G&&Y.length>0?0:null)});B(()=>{if(!o&&i===void 0)return;let j=H.current!==null&&H.current!==A;if(H.current=A,E===null){F.set("visibleItemIds",null),G&&T.size>0?(j||f()==null)&&m(0):A===""&&j&&m(null);return}let Y=F.state.visibleItemIds;if(Y===null&&T.size===0)return;let q=new Set,re=Y===null;T.forEach(({getText:ge},ee)=>{let Me=ge();Me!=null&&E(Me,A)&&(q.add(ee),re||=!Y?.has(ee))}),re||Y?.size!==q.size?(G&&q.size>0?m(0):(Y!==null||j)&&m(null),F.set("visibleItemIds",q)):G&&j&&q.size>0&&m(0)},[o,i,A,S,T,E,G,F,m,f]);let ae=Ra.useMemo(()=>({open:o,disabled:a,inputFocusVisible:g,setInputFocusVisible:b,keyboardModality:w,setKeyboardModality:C,autoHighlight:u,triggerId:X,defaultListId:z,listId:oe,setRenderedListId:x,focusOwnerRef:N,setActiveIndex:m,onItemsChange:U,onValueChange:Z}),[o,a,g,w,u,X,z,oe,N,m,U,Z]),we=Ra.useMemo(()=>({parent:h,store:F,registerItem:L,listRef:p}),[h,F,L,p]);return Ab(Fc.Provider,{value:we,children:Ab(Pb.Provider,{value:ae,children:Ab(Tb.Provider,{value:i??s,children:t})})})}import*as cg from"react";function eR(e){let{open:t,mounted:o,value:a,onValueChange:r}=e,[n,s]=cg.useState(null),i=cg.useRef(t);return B(()=>{let l=i.current;i.current=t,l&&!t&&a!==""?(s(a),r("",fe(_.popupClose))):(t||!o)&&n!==null&&s(null)},[t,o,a,n,r]),!t&&n!==null?n:a}import*as oR from"react";import*as dg from"react";var zb=!1;function jn(e){zb=!0;try{e.focus({preventScroll:!0})}finally{zb=!1}}function ug(){return zb}function tR(e){let t=Kr(),o=Vo(),{focusOwnerRef:a}=t,r=dg.useRef(null),n=dg.useRef("mouse");function s(l){n.current=l.pointerType||"mouse"}function i(l,c){let u=a.current;if(!t.open||!u)return;let d=gt(Se(l.currentTarget));if(d===u||de(l.currentTarget,d))return;let p=null;l.nativeEvent.composedPath().find(m=>Ae(m)?m.getAttribute("role")==="dialog"||m.hasAttribute("data-rootownerid")?!0:(m.hasAttribute("aria-haspopup")&&(p=m),!1):!1)===l.currentTarget&&(r.current&&!(c&&p)||c&&p&&Ge(l.relatedTarget)&&de(p,l.relatedTarget)||jn(u))}return{"aria-activedescendant":void 0,"aria-orientation":void 0,onMouseDown(l){Ue(l.nativeEvent)===l.currentTarget&&l.preventDefault()},onPointerDown:s,onPointerOver:s,onPointerMove:s,onMouseMove(l){n.current==="mouse"&&i(l,!1)},onMouseOver(l){n.current==="mouse"&&r.current&&i(l,!0)},onFocus(l){let c=Ue(l.nativeEvent);c===a.current?r.current=null:Ae(c)&&!de(l.currentTarget,c)&&!ug()&&(r.current=c),t.open&&c===l.currentTarget&&a.current?.focus({preventScroll:!0})},onKeyDown(l){let c=Ue(l.nativeEvent);c===a.current||dr(c)||Dn(l.key,e,o==="rtl",!1)&&(a.current?.focus({preventScroll:!0}),l.stopPropagation())}}}import{jsx as rL}from"react/jsx-runtime";var aR=oR.forwardRef(function(t,o){let{store:a,orientation:r}=Ve(),n=a.useState("open"),s=a.useState("parent"),i=a.useState("openMethod"),l=a.useState("lastOpenChangeReason"),c=tR(r),u=n&&l===_.triggerHover,d=s.type!=="menu"||n&&(i==="keyboard"||l===_.listNavigation||l===_.triggerHover||l===_.triggerPress),p=!1;d&&(p=()=>{let m=(i==="touch"||i==="pen")&&!a.context.virtualPress;return u||m?!1:a.context.virtualFocusRef?.current??!1});let f=nt(c,t);return rL(yb,{...f,role:"dialog",initialFocus:p,ref:o})});import*as gg from"react";import*as rR from"react";import*as pg from"react";var _i=pg.createContext(null);function mg(){return pg.useContext(_i)}import{jsx as nL}from"react/jsx-runtime";var nR=rR.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,...i}=t,l=Kr(),[c,u]=Hf(t,l.defaultListId,l.setRenderedListId);return me("div",t,{ref:[o,u],props:[{tabIndex:-1,id:c,onFocus(p){let f=l.focusOwnerRef.current;f&&p.relatedTarget===f&&Ue(p.nativeEvent)===p.currentTarget&&jn(f)},onPointerMove(){l.setKeyboardModality(!1)},onPointerDown(){l.setKeyboardModality(!1)}},i,{children:nL(_i.Provider,{value:null,children:i.children})}]})});function sL(e,t){let{orientation:o,rtl:a,hasActiveItem:r,activeItemOpensSubmenu:n,hasValue:s}=t,{key:i}=e;if(e.which===229)return"ignore";if(i==="Tab")return e.shiftKey?"close":"ignore";if(i==="Enter")return r?"activate":"navigate";let l=i.startsWith("Arrow"),c=i==="Home"||i==="End";return e.shiftKey||e.ctrlKey||e.altKey||e.metaKey?l||c||i.length===1?"edit":"navigate":i.length===1?"edit":c?r&&!s?"navigate":"edit":l?er(i,o)?o==="horizontal"&&!r&&s?"edit":"navigate":n&&(Xl(i,o,a)||Dn(i,o,a,!1))?"submenu":o==="horizontal"&&!r?"enter-list":s?"edit":"navigate":"navigate"}function Zi(e){let{orientation:t,store:o}=Ve(),a=Di(),r=Vo();return W(n=>{if(!o.select("open"))return;let s=o.state.highlightedItem;switch(sL(n,{orientation:t,rtl:r==="rtl",hasActiveItem:s!=null,activeItemOpensSubmenu:s?.hasAttribute("aria-haspopup")??!1,hasValue:e})){case"edit":n.stopPropagation(),n.key.length===1&&!n.ctrlKey&&!n.metaKey&&!n.altKey&&o.state.inputProps.onKeyDown?.(n);break;case"navigate":{er(n.key,t)&&n.stopPropagation(),o.state.inputProps.onKeyDown?.(n);break}case"enter-list":{n.stopPropagation();let l=o.context.itemDomElements,c=n.key==="ArrowDown"?fr(l,Nt):Vr(l,Nt);l.current[c]&&(n.preventDefault(),o.setActiveIndex(c,_.keyboard,n.nativeEvent));break}case"submenu":{Ft(n);let l=Qe(s).KeyboardEvent;s.dispatchEvent(new l(n.type,n.nativeEvent));break}case"activate":n.preventDefault(),Lr(s,n);break;case"close":{Ft(n);let l=o.state.parent.type==="menu"&&a?.getReturnElement?.()||o.state.activeTriggerElement,c=fe(_.focusOut,n.nativeEvent);o.setOpen(!1,c),!c.isCanceled&&Ae(l)&&l.focus();break}default:break}})}function fg(e,t,o,a){let{orientation:r,rtl:n,loopFocus:s,allowEscape:i}=a,l=e.context.itemDomElements,c=l.current,{index:u}=Np(c,c.indexOf(t),{decrement:!Yl(o.key,r,n),loopFocus:s,allowEscape:i,disabledIndices:Nt,minIndex:fr(l,Nt),maxIndex:Vr(l,Nt)}),d=c[u];return d&&(e.setActiveIndex(u,_.keyboard,o.nativeEvent),d.scrollIntoView?.({block:"nearest",inline:"nearest"})),d??void 0}import{jsx as iL}from"react/jsx-runtime";var sR=gg.forwardRef(function(t,o){let{store:a,orientation:r,loopFocus:n,allowEscape:s}=Ve(),i=Vo(),{onItemsChange:l,focusOwnerRef:c,triggerId:u}=Kr(),{listRef:d}=jr(),{subscribeMapChange:p}=qm(),f=qn(),m=Zi(f!==""),v=W(w=>{let C=c.current,R=Ue(w.nativeEvent),I=C!=null&&gt(Se(C))===C,S=!de(w.currentTarget,R);if(C==null||I||S){if(w.which!==229&&!w.shiftKey&&!w.ctrlKey&&!w.metaKey&&!w.altKey&&er(w.key,r)){w.stopPropagation();let M=S&&I?h(R):void 0;M&&fg(a,M,w,{orientation:r,rtl:i==="rtl",loopFocus:n,allowEscape:s})}return}w.defaultPrevented||(jn(C),m(w))});function h(w){let C=w.getRootNode();return d.current.find(R=>{let I=R?.getAttribute("aria-controls");return I!=null&&Ae(R)&&de(C.getElementById(I),w)})}let y=gg.useRef(null),x=W(()=>{let w=[...d.current],C=y.current;(C===null||C.length!==w.length||w.some((I,S)=>I!==C[S]))&&C!==null&&l(C),y.current=w});B(()=>p(x),[p,x]);let g=Oi(t,null,u??null),b=nt({role:"menu","aria-labelledby":g,"aria-orientation":r==="horizontal"?"horizontal":void 0,onKeyDown:v},t);return iL(nR,{...b,ref:o})});import*as Nb from"react";import*as iR from"react";function lL(e,t){if(e.visibleItemIds===null||t.size===0)return!1;for(let[o,a]of t)if(a||e.visibleItemIds.has(o))return!1;return!0}function Lb(){let{store:e}=jr(),t=mg(),{items:o,registerItem:a}=lg(),r=_r(e,lL,o),n=$e(()=>Symbol("filter-dropdown-group")).current,s=t?.registerItem;B(()=>s?.(n,!r),[s,n,r]);let i=iR.useMemo(()=>({registerItem:a}),[a]);return{hidden:r,context:i}}import{jsx as hg}from"react/jsx-runtime";var lR=Nb.forwardRef(function(t,o){let{hidden:a,context:r}=Lb();return hg(_i.Provider,{value:r,children:hg(hb,{...t,hidden:a||t.hidden||void 0,ref:o})})}),cR=Nb.forwardRef(function(t,o){let{hidden:a,context:r}=Lb();return hg(_i.Provider,{value:r,children:hg(Sb,{...t,hidden:a||t.hidden||void 0,ref:o})})});import*as wr from"react";function Fb(e){return typeof e=="string"||typeof e=="number"?String(e):Array.isArray(e)?e.map(Fb).join(""):wr.isValidElement(e)?Fb(e.props.children):""}function bg(e){let{label:t,retainGroup:o=!1,children:a,render:r,context:n}=e,s=jr(n!==void 0),i=mg(),l=n===void 0?s:n,{registerItem:c,store:u}=l??QC,d=i?.registerItem,p=$e(()=>Symbol("filter-dropdown-item")).current,f=wr.useRef(null),m=wr.useRef(void 0),v=_r(u,Oc.isItemVisible,p),[h,y]=wr.useState(v),x=ft(a),g=ft(r),b=wr.useRef(void 0),w=wr.useCallback(()=>{if(t!=null)return t;let R=Fb(x.current??es(g.current)),I=b.current;return b.current=R,f.current!==null?f.current.textContent??"":m.current!==void 0&&R===I?m.current:R},[t,x,g]),C=wr.useCallback(R=>{let I=R??w();return I&&(m.current=I),c(p,{getText(){return t==null&&f.current&&(m.current=f.current.textContent??""),m.current}})},[p,t,c,w]);return B(()=>{let R=C();return y(!0),R},[C]),B(()=>d?.(p,o),[d,p,o]),B(()=>{let R=w();R!==m.current&&(m.current=R,C(R))},[C,w,a,r,t]),{visible:!h||v,ref:f}}function uR(e){let{store:t,virtualFocus:o}=Ve(),a=t.useState("open"),r=t.useState("mounted"),n=t.useState("parent"),s=n.type==="menu"?n.store.context.itemDomElements:null,i=XC(s),{visible:l,ref:c}=bg({...e,context:i,retainGroup:r});B(()=>{l||!a||t.setOpen(!1,fe(_.none))},[l,a,t]);let u=Xf((p,f)=>{p.type==="click"&&t.select("open")&&(f==="keyboard"||f==="mouse"&&t.select("lastOpenChangeReason")===_.triggerPress)&&t.context.virtualFocusRef?.current?.focus({preventScroll:!0})}),d={...o?{"aria-haspopup":"dialog"}:void 0,...u,onPointerDown(p){u.onPointerDown(p),t.context.virtualPress=Dr(p.nativeEvent)},onFocus(p){let f=t.context.virtualFocusRef?.current;f&&t.select("open")&&p.relatedTarget===f&&(p.preventBaseUIHandler(),f.focus({preventScroll:!0}))}};return i===null?{visible:!0,ref:null,props:d}:{visible:l||r,ref:c,props:d}}function dR(e,t,o,a){let r=t.type==="menu"?t.store:null,n=r?.context.virtualFocusRef,s=W((l,c)=>{let u=n?.current;a||e.select("open")||!r?.select("open")||!u||(de(e.context.popupRef.current,gt(Se(u)))&&u.focus({preventScroll:!0}),(c===_.listNavigation||c===_.escapeKey)&&r.state.activeIndex==null&&r.highlightItem(l,_.none))});B(()=>{if(!o){let l=e.state.activeTriggerElement,c=e.select("lastOpenChangeReason");queueMicrotask(()=>s(l,c))}},[o,e,s]);function i(){!a&&n&&r?.state.activeIndex!=null&&r.setActiveIndex(null,_.none)}return{parentVirtualFocusRef:n,handleFocus:i}}var pR={Popup:aR,List:sR,Group:lR,RadioGroup:cR,useItem:bg,useSubmenuTrigger:uR,useParentHandoff:dR};import{jsx as mR}from"react/jsx-runtime";function yg(e){let{value:t,defaultValue:o="",onValueChange:a,...r}=e,{store:n}=Ve(),s=n.useState("open"),i=n.useState("mounted"),l=n.useState("keyboardOpen"),c=n.useState("activeTriggerId"),u=n.useState("activeTriggerElement"),d=n.useState("disabled"),[p,f]=ya({controlled:t,default:o,name:"MenuFilterProvider",state:"value"}),m=W((b,w)=>{a?.(b,w),w.isCanceled||f(b)}),v=W(()=>n.state.activeIndex),h=W(b=>{n.setActiveIndex(b,_.none)}),y=eR({open:s,mounted:i,value:p,onValueChange:m}),x=cL(p!=="");$e(()=>(n.set("filterTriggerProps",x),null)),n.useSyncedValue("filterTriggerProps",x),B(()=>{s||n.set("keyboardOpen",!1)},[s,n]);let g=u?u.id||null:c;return mR(Ic.Provider,{value:pR,children:mR(JC,{...r,open:s,openedByKeyboard:l,disabled:d,value:p,query:y,onValueChange:m,triggerId:g,listRef:n.context.itemDomElements,getActiveIndex:v,setActiveIndex:h,focusOwnerRef:n.context.virtualFocusRef})})}function cL(e){let{store:t}=Ve(),o=Hi(!0)!=null,a=Zi(e);return fR.useMemo(()=>({"aria-haspopup":"dialog",onPointerDown(r){t.context.virtualPress=Dr(r.nativeEvent)},onKeyDown(r){let n=t.context.virtualFocusRef?.current;!t.select("open")||!n||o||(r.key==="ArrowUp"||r.key==="ArrowDown"?(n.focus({preventScroll:!0}),a(r),r.preventDefault(),r.preventBaseUIHandler()):r.key==="ArrowLeft"||r.key==="ArrowRight"?r.preventBaseUIHandler():uL(r)&&n.focus({preventScroll:!0}))}}),[t,o,a])}function uL(e){return e.key.length===1&&e.key!==" "&&!e.ctrlKey&&!e.metaKey&&!e.altKey}import*as gR from"react";function wg(e){let{children:t,value:o,defaultValue:a,onValueChange:r,filter:n,autoHighlight:s=!1,locale:i,...l}=e,c=gR.useRef(null);return{children:t,rootProps:{...l,virtualFocus:!0,virtualFocusRef:c,allowEscape:!s,resetOnPointerLeave:s!=="always"},dropdownProps:{value:o,defaultValue:a,onValueChange:r,filter:n,autoHighlight:s,locale:i}}}import{jsx as hR}from"react/jsx-runtime";function bR(e){let{children:t,rootProps:o,dropdownProps:a}=wg(e);return hR(Ds,{...o,children:r=>hR(yg,{...a,children:typeof t=="function"?t(r):t})})}import*as Hc from"react";import{jsx as xg}from"react/jsx-runtime";function yR(e){let t=Ve(),o=t.store,a=o.useState("disabled"),{rootProps:r,dropdownProps:n}=wg(e),s=Hc.useRef(null);function i(d,p){let f=t.virtualFocus?o.context.virtualFocusRef?.current:gt(Se(d));Ae(f)&&(s.current={reference:f,trigger:d},o.setActiveIndex(null,p?_.keyboard:_.none,p))}function l(d,p){o.highlightItem(d,_.keyboard,p)}function c(d){let p=s.current;p&&(p.reference.focus({preventScroll:!0}),l(p.trigger,d))}function u(d,p){if(r.onOpenChange?.(d,p),!p.isCanceled){if(!d){p.reason===_.escapeKey&&Ae(p.trigger)&&(l(p.trigger,p.event),s.current={reference:t.virtualFocus?o.context.virtualFocusRef?.current??p.trigger:p.trigger,trigger:p.trigger});return}s.current=null,Ae(p.trigger)&&Jf(p.reason,p.event)&&i(p.trigger,p.reason===_.listNavigation?p.event:void 0)}}return xg(Ds,{...r,isSubmenu:!0,disabled:a||e.disabled,onOpenChange:u,children:xg(dL,{parentStore:o,parentVirtualFocus:t.virtualFocus,parentAllowEscape:t.virtualFocus&&t.allowEscape,parentOrientation:t.orientation,parentLoopFocus:t.loopFocus,getReturnElement:()=>s.current?.reference??(t.virtualFocus?o.context.virtualFocusRef?.current:null)??null,onSubmenuEnter:i,onSubmenuExit:c,children:xg(yg,{...n,children:e.children})})})}function dL(e){let{children:t,parentStore:o,parentVirtualFocus:a,parentAllowEscape:r,parentOrientation:n,parentLoopFocus:s,onSubmenuEnter:i,onSubmenuExit:l,getReturnElement:c}=e,{store:u,orientation:d}=Ve(),p=Vo(),f=u.useState("mounted"),m=Hc.useRef(!1),v=W(()=>{let[w]=u.context.triggerElements.elements();return c()??(Ae(w)?w:null)});B(()=>{let w=m.current;if(m.current=f,f||!w)return;let C=v();if(!C||!o.select("open"))return;let R=Se(C),I=gt(R);(I===R.body||de(u.select("popupElement"),I))&&C.focus({preventScroll:!0})},[f,u,o,v]);function h(w,C){let R=fg(o,w,C,{orientation:n,rtl:p==="rtl",loopFocus:s,allowEscape:r});a||R?.focus({preventScroll:!0})}function y(w){if(!u.select("open"))return;Ft(w);let C=u.select("activeTriggerElement"),R=fe(_.listNavigation,w.nativeEvent);u.setOpen(!1,R),R.isCanceled||l(w.nativeEvent);let I=c()??u.select("activeTriggerElement");!u.select("open")&&Ae(I)&&gt(Se(I))!==I&&I.focus(),!u.select("open")&&Ae(C)&&er(w.key,n)&&h(C,w)}let x=W(w=>{if(er(w.key,n)){h(w.currentTarget,w),w.preventBaseUIHandler(),Ft(w);return}let C=u.select("open"),R=p==="rtl",I=Dn(w.key,d,R,!1);if(C&&I){y(w);return}if(Xl(w.key,n,R)){if(Ft(w),C){i(w.currentTarget,w.nativeEvent),u.context.virtualFocusRef?.current?.focus({preventScroll:!0});return}u.setOpen(!0,fe(_.listNavigation,w.nativeEvent,w.currentTarget))}}),g=W(w=>{if(w.which===229)return;Dn(w.key,d,p==="rtl",!1)&&y(w)}),b=Hc.useMemo(()=>({getReturnElement:v,onTriggerKeyDown:x,onPopupKeyDown:g}),[v,x,g]);return xg(Mc.Provider,{value:b,children:t})}import{jsx as pL}from"react/jsx-runtime";function xR(e){let{children:t,filter:o,value:a,defaultValue:r,onValueChange:n,autoHighlight:s,locale:i}=e,l=wR.useMemo(()=>({Root:bR,SubmenuRoot:yR,options:{filter:o,value:a,defaultValue:r,onValueChange:n,autoHighlight:s,locale:i}}),[o,a,r,n,s,i]);return pL(Wn.Provider,{value:l,children:t})}import*as vg from"react";import*as Gi from"react";var vR=Gi.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,disabled:i,activeItemId:l,navigationProps:c,...u}=t,d=tt(s),p=Kr(),{listRef:f}=jr(),m=qn(),[v,h]=Gi.useState(null),y=Gi.useRef(!1);function x(b,w){if(!p.open)return;let C=b===""?_.inputClear:_.inputChange;p.onValueChange(b,fe(C,w))}let g={highlighted:p.inputFocusVisible&&(!p.keyboardModality||l==null)};return me("input",t,{state:g,ref:[o,p.focusOwnerRef],props:[c,{id:d,type:"text",disabled:p.disabled||i,"aria-activedescendant":l,role:"searchbox",inputMode:"search",autoComplete:"off",spellCheck:"false",autoCorrect:"off",autoCapitalize:"none","aria-autocomplete":void 0,"aria-controls":p.listId,value:v??m,onCompositionStart(b){Je.os.android||(y.current=!0,h(b.currentTarget.value))},onCompositionEnd(b){y.current&&(y.current=!1,h(null),x(b.currentTarget.value,b.nativeEvent))},onChange(b){if(y.current){h(b.currentTarget.value);return}x(b.currentTarget.value,b.nativeEvent)},onKeyDown(){p.setKeyboardModality(!0)},onPointerDown(){p.setKeyboardModality(!1)},onMouseEnter(b){p.setKeyboardModality(!1),p.open&&jn(b.currentTarget)},onFocus(b){if(p.setInputFocusVisible(!0),p.autoHighlight==="always"||ug())return;let w=b.relatedTarget;w!==null&&f.current.includes(w)&&p.setActiveIndex(null)},onBlur(){p.setInputFocusVisible(!1)}},u]})});import{jsx as mL}from"react/jsx-runtime";var IR=vg.forwardRef(function(t,o){Ni("Input");let{store:a}=Ve(),r=qn(),{onKeyDown:n,...s}=a.useState("inputProps"),i=a.useState("highlightedItemId"),l=Zi(r!==""),c=vg.useCallback(p=>{a.set("inputFocused",p!==null&&gt(Se(p))===p)},[a]),u=Ht(o,c),d=nt({onKeyDown:l,onFocus(){a.set("inputFocused",!0)},onBlur(){a.set("inputFocused",!1)}},t);return mL(vR,{...d,activeItemId:i,navigationProps:s,ref:u})});import*as Vc from"react";import{jsx as fL}from"react/jsx-runtime";var gL=Vc.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,...i}=t,{store:l,orientation:c}=Ve(),u=l.useState("activeTriggerId"),d=l.useState("activeTriggerElement"),p=l.useStateSetter("listElement"),f=tt(s),m=Vc.useRef(f);B(()=>{m.current!==f&&(m.current=f,l.notifyAll())},[f,l]);let v=Oi(t,d,u);return me("div",t,{ref:[o,p],props:[{id:f,role:"menu",tabIndex:-1,"aria-orientation":c==="horizontal"?"horizontal":void 0,"aria-labelledby":v},i]})}),CR=Vc.forwardRef(function(t,o){let a=Wr()?.List??gL;return fL(a,{...t,ref:o})});import*as kR from"react";import*as RR from"react";var SR=RR.forwardRef(function(t,o){let{render:a,className:r,style:n,disabled:s=!1,nativeButton:i=!0,...l}=t,c=Kr(),u=qn(),d=c.disabled||s,p=u!=="",{buttonRef:f,getButtonProps:m}=Go({disabled:d,native:i});return me("button",t,{enabled:p,state:{disabled:d},ref:[o,f],props:[{tabIndex:-1,"aria-hidden":!0,onMouseDown(h){h.preventDefault()},onClick(h){let y=fe(_.clearPress,h.nativeEvent);c.onValueChange("",y),c.focusOwnerRef.current?.focus({preventScroll:!0})}},l,m]})});import{jsx as hL}from"react/jsx-runtime";var MR=kR.forwardRef(function(t,o){return Ni("Clear"),hL(SR,{...t,ref:o})});import*as TR from"react";import*as Cg from"react";import*as Ig from"react";var bL="⁠",yL=200;function wL(e){let t=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_TEXT),o=null;for(;t.nextNode();){let a=t.currentNode;a.nodeValue!==""&&(o=a)}return o}function ER(e=!0){let t=it(),o=Ig.useRef(null);return Ig.useEffect(()=>{if(!e||Je.os.ios)return;let a=o.current;if(a==null)return;let r=wL(a);if(r==null)return;let n=r.data,s=`${n}${bL}`;return r.nodeValue=s,t.start(yL,()=>{r.nodeValue===s&&(r.nodeValue=n)}),()=>{t.clear(),r.nodeValue===s&&(r.nodeValue=n)}},[e,o,t]),o}var PR=Cg.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{store:i}=jr(),l=_r(i,Oc.isEmpty),[c,u]=Cg.useState(!1);B(()=>{u(!0)},[]);let d=c&&l,p=ER(d);return me("div",t,{enabled:d,ref:[o,p],props:[{role:"status","aria-live":"polite","aria-atomic":!0},s]})});import{jsx as xL}from"react/jsx-runtime";var AR=TR.forwardRef(function(t,o){return Ni("Empty"),xL(PR,{...t,ref:o})});var Ui={};ua(Ui,{Arrow:()=>Cf,Backdrop:()=>Sf,CheckboxItem:()=>Ef,CheckboxItemIndicator:()=>Tf,Group:()=>zf,GroupLabel:()=>Lf,Item:()=>Nf,LinkItem:()=>Ff,Popup:()=>Vf,Portal:()=>_f,Positioner:()=>FR,RadioGroup:()=>$f,RadioItem:()=>qf,RadioItemIndicator:()=>Kf,Root:()=>zR,Separator:()=>rg,SubmenuRoot:()=>tg,SubmenuTrigger:()=>ng,Trigger:()=>NR});import*as xr from"react";import{jsx as Db}from"react/jsx-runtime";function zR(e){let[t,o]=xr.useState({getBoundingClientRect(){return DOMRect.fromRect({width:0,height:0,x:0,y:0})}}),a=xr.useRef(null),r=xr.useRef(null),n=xr.useRef(null),s=xr.useRef(null),i=xr.useRef(!0),l=xr.useRef(null),c=Nr(),u=xr.useMemo(()=>({anchor:t,setAnchor:o,actionsRef:n,backdropRef:a,internalBackdropRef:r,positionerRef:s,allowMouseUpTriggerRef:i,initialCursorPointRef:l,rootId:c}),[t,c]);return Db(mb.Provider,{value:u,children:Db(Ns.Provider,{value:void 0,children:Db(Oa.Root,{...e})})})}import*as Yr from"react";var LR=500,NR=Yr.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{setAnchor:i,actionsRef:l,internalBackdropRef:c,backdropRef:u,positionerRef:d,allowMouseUpTriggerRef:p,initialCursorPointRef:f,rootId:m}=$r(!1),{store:v}=Ve(!1),h=v.useState("open"),y=v.useState("disabled"),x=Yr.useRef(null),g=Yr.useRef(null),b=it(),w=it(),C=Yr.useRef(!1),R=Yr.useRef(null);function I(P,H,D){let N=D.type.startsWith("touch");f.current={x:P,y:H},i({getBoundingClientRect(){return DOMRect.fromRect({width:N?10:0,height:N?10:0,x:P,y:H})}}),C.current=!1,l.current?.setOpen(!0,fe(_.triggerPress,D)),w.start(LR,()=>{C.current=!0})}function S(P){if(y)return;p.current=!0,Ft(P),I(P.clientX,P.clientY,P.nativeEvent);let H=Se(x.current);R.current?.abort();let D=new AbortController;R.current=D,H.addEventListener("mouseup",N=>{if(p.current=!1,!C.current)return;w.clear(),C.current=!1;let A=Ue(N);de(d.current,A)||m&&A&&zc(A)===m||l.current?.setOpen(!1,fe(_.cancelOpen,N))},{once:!0,signal:D.signal})}function M(){b.clear(),g.current=null}function T(P){if(y){M();return}if(p.current=!1,P.touches.length!==1){M();return}P.stopPropagation();let H=P.touches[0],D={x:H.clientX,y:H.clientY};g.current=D,b.start(LR,()=>{I(D.x,D.y,P.nativeEvent)})}function V(P){if(P.touches.length!==1){M();return}if(b.isStarted()&&g.current){let H=P.touches[0],D=10,N=Math.abs(H.clientX-g.current.x),A=Math.abs(H.clientY-g.current.y);(N>D||A>D)&&M()}}return Yr.useEffect(()=>()=>{R.current?.abort()},[]),Yr.useEffect(()=>{function P(D){if(y)return;let A=Ue(D);(de(x.current,A)||de(c.current,A)||de(u.current,A))&&D.preventDefault()}let H=Se(x.current);return De(H,"contextmenu",P)},[u,y,c]),me("div",t,{state:{open:h},ref:[x,o],props:[{onContextMenu:S,onTouchStart:T,onTouchMove:V,onTouchEnd:M,onTouchCancel:M,style:{WebkitTouchCallout:"none"}},s],stateAttributesMapping:Pl})});var FR=Gf;import{jsx as Ha,jsxs as J0e}from"react/jsx-runtime";var Hb=ga.createContext({mode:"click",mark:()=>{},pressed:{current:null}});var LL='[data-menu-target], tr, [role="row"], li';function Ob(e,t){if(!(e instanceof Element))return null;let o=e.closest(LL),a=t??o?.closest("[data-menu-area]");return o&&a&&a.contains(o)&&o!==a?o:null}function Rg({trigger:e="click",onOpenChange:t,onTargetChange:o,...a}){let r=ga.useRef(null),n=ga.useRef(null),s=ga.useRef(o);ga.useLayoutEffect(()=>{s.current=o});let i=ga.useCallback(u=>{u!==r.current&&(r.current?.removeAttribute("data-menu-target-open"),r.current=u,u?.setAttribute("data-menu-target-open",""),s.current?.(u))},[]),l=ga.useMemo(()=>({mode:e,mark:i,pressed:n}),[e,i]),c=(u,d)=>{u&&!r.current&&i(e==="contextmenu"?n.current:Ob(d.event?.target)),u||(i(null),n.current=null),t?.(u,d)};return Ha(Hb.Provider,{value:l,children:e==="contextmenu"?Ha(Ui.Root,{"data-slot":"dropdown-menu",onOpenChange:c,...a}):Ha(Oa.Root,{"data-slot":"dropdown-menu",onOpenChange:c,...a})})}function NL(e){let t=Tr();return Ha(Oa.Portal,{"data-slot":"dropdown-menu-portal",container:t,...e})}function Sg({selectable:e=!1,className:t,...o}){let{mode:a,mark:r,pressed:n}=ga.useContext(Hb);if(a==="contextmenu"){let s=O(!e&&"select-none","[&_[data-menu-target-open]]:bg-pressed","forced-colors:[&_[data-menu-target-open]]:outline-solid forced-colors:[&_[data-menu-target-open]]:outline-2 forced-colors:[&_[data-menu-target-open]]:-outline-offset-2");return Ha(Ui.Trigger,{"data-slot":"dropdown-menu-trigger","data-menu-area":"","data-selectable":e||void 0,onPointerDown:i=>{i.pointerType!=="mouse"&&(n.current=Ob(i.target,i.currentTarget))},onContextMenu:i=>{r(Ob(i.target,i.currentTarget))},onKeyDown:i=>{if(!(i.shiftKey&&i.key==="F10"))return;let l=document.activeElement;if(!l||!i.currentTarget.contains(l))return;i.preventDefault();let c=l.getBoundingClientRect(),u=Math.min(c.width/2,160),d=getComputedStyle(l).direction==="rtl"?c.right-u:c.left+u;l.dispatchEvent(new MouseEvent("contextmenu",{bubbles:!0,cancelable:!0,clientX:d,clientY:c.top+c.height/2,button:2}))},className:Mt(s,t),...o})}return Ha(Oa.Trigger,{"data-slot":"dropdown-menu-trigger",className:t,...o})}function kg({align:e,alignOffset:t,side:o,sideOffset:a,collisionPadding:r=8,collisionAvoidance:n,anchor:s,size:i="default",className:l,...c}){let{mode:u}=ga.useContext(Hb),d=Ha(Oa.Popup,{"data-slot":"dropdown-menu-content","data-size":i,"aria-label":u==="contextmenu"?"Actions":void 0,className:Mt(C6,l),...c});return Ha(NL,{children:u==="contextmenu"?Ha(Ui.Positioner,{className:"isolate z-(--z-overlay) outline-none",align:e??"start",alignOffset:t??4,side:o??"inline-end",sideOffset:a??0,collisionPadding:r,collisionAvoidance:n,children:d}):Ha(Oa.Positioner,{className:"isolate z-(--z-overlay) outline-none",align:e??"start",alignOffset:t??0,side:o??"bottom",sideOffset:a??6,collisionPadding:r,collisionAvoidance:n,anchor:s,children:d})})}function Vb({className:e,inset:t,...o}){return Ha(Oa.GroupLabel,{"data-slot":"dropdown-menu-label","data-inset":t||void 0,className:Mt(Lm,e),...o})}function $i({className:e,inset:t,variant:o="default",...a}){return Ha(Oa.Item,{"data-slot":"dropdown-menu-item","data-inset":t||void 0,"data-variant":o,"data-status":o==="destructive"?"fail":void 0,className:Mt(nc,e),...a})}function Bb({className:e,...t}){return Ha(Oa.Separator,{"data-slot":"dropdown-menu-separator",className:Mt(R6,e),...t})}import*as Kn from"react";import{useRef as she,useState as ihe}from"react";import{Fragment as hhe,jsx as fhe,jsxs as ghe}from"react/jsx-runtime";var phe=rt("group/empty flex w-full min-w-0 flex-col items-center gap-3 text-center text-text-1",{variants:{variant:{panel:"panel forced-colors:border-[CanvasText]",plain:""},size:{default:"px-4 py-6",sm:"gap-2 px-3 py-4"}},defaultVariants:{variant:"panel",size:"default"}});import{Fragment as zhe,jsx as Fo,jsxs as Bc}from"react/jsx-runtime";function FL({title:e,count:t,actions:o,id:a,className:r}){return Bc("div",{"data-slot":"table-title",className:O("flex min-h-(--row) min-w-0 shrink-0 items-center gap-2 border-b border-line-faint ps-3 pe-1.5",r),children:[Fo("span",{id:a,className:"min-w-0 truncate type-label text-text-1",children:e}),t!=null&&Fo("span",{"data-slot":"table-count",className:"shrink-0 type-label text-text-2 data",children:t}),o!=null&&Fo("div",{"data-slot":"table-actions",className:"ms-auto flex shrink-0 items-center gap-1",children:o})]})}function DL({className:e,...t}){return Fo("div",{"data-slot":"table-toolbar",className:O("flex min-h-(--row) min-w-0 shrink-0 flex-wrap items-center gap-2 border-b border-line-faint px-1.5 py-1",e),...t})}function OL({frame:e="card",footer:t,className:o,children:a,...r}){return e==="none"?Bc("div",{"data-slot":"table-frame","data-frame":"none",className:O("flex min-w-0 flex-col",o),...r,children:[a,t!=null&&Fo("div",{"data-slot":"table-footer-row",className:"flex min-h-(--row) min-w-0 items-center gap-2 border-t border-line-faint px-3 type-caption text-text-2",children:t})]}):Bc("div",{"data-slot":"table-frame","data-frame":"card",className:O("shell text-text-1 forced-colors:border-[CanvasText]",o),...r,children:[Fo("div",{"data-slot":"table-panel",className:"panel flex min-w-0 flex-col overflow-hidden forced-colors:border-[CanvasText]",children:a}),t!=null&&Fo("div",{"data-slot":"table-footer-row",className:"shell-foot [&>:first-child]:me-auto",children:t})]})}function DR({className:e,frame:t="card",title:o,count:a,actions:r,toolbar:n,footer:s,stickyHeader:i=!1,maxHeight:l,frameClassName:c,containerClassName:u,scrollFocus:d=!0,...p}){let f=Kn.useRef(null),m=$m(f,d),v=Kn.useId(),h=p["aria-label"],y=!h&&o?v:void 0;return Bc(OL,{frame:t,footer:s,className:c,children:[o!=null&&Fo(FL,{id:v,title:o,count:a,actions:r}),n!=null&&Fo(DL,{children:n}),Fo("div",{ref:f,"data-slot":"table-container","data-sticky-header":i||void 0,tabIndex:m,role:m===0&&(h||y)?"region":void 0,"aria-label":m===0&&h?h:void 0,"aria-labelledby":m===0?y:void 0,className:O("group/table relative w-full min-w-0 overflow-auto overscroll-contain focus-visible:focus-ring-inset",u),style:l!==void 0?{maxHeight:l}:void 0,children:Fo("table",{"data-slot":"table","aria-labelledby":y,className:O(HL,e),...p})})]})}var HL="w-full caption-bottom border-separate border-spacing-0 text-start type-body-sm text-text-1";function OR({className:e,...t}){return Fo("thead",{"data-slot":"table-header",className:e,...t})}function HR({className:e,...t}){return Fo("tbody",{"data-slot":"table-body",className:O(VL,e),...t})}var VL="[&>tr:not(:last-child)>td]:border-b [&>tr:not(:last-child)>td]:border-line-faint [&>tr:not(:last-child)>th]:border-b [&>tr:not(:last-child)>th]:border-line-faint";var BL=O("group/row transition-colors duration-(--dur-state) ease-out","[tbody>&]:hover:bg-hover-row has-aria-expanded:bg-hover-row","data-selected:bg-pressed data-selected:hover:bg-pressed data-open:bg-pressed data-open:hover:bg-pressed","forced-colors:data-selected:outline-1 forced-colors:data-selected:-outline-offset-1 forced-colors:data-selected:outline-[Highlight] forced-colors:data-open:outline-2 forced-colors:data-open:-outline-offset-2 forced-colors:data-open:outline-[Highlight]");function _b({className:e,selected:t,open:o,...a}){return Fo("tr",{"data-slot":"table-row","data-selected":t||void 0,"data-open":o||void 0,"aria-selected":t===void 0?void 0:t,"aria-current":o?"true":void 0,className:O(BL,e),...a})}var _L=O("h-8 border-b border-line-faint bg-paper px-3 text-start align-middle type-label-sm whitespace-nowrap text-text-2","[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pe-0","group-data-sticky-header/table:sticky group-data-sticky-header/table:top-0 group-data-sticky-header/table:z-(--z-raised)"),ZL="h-(--row) px-3 align-middle whitespace-nowrap text-text-1 [&:has([role=checkbox])]:pe-0";function _c({className:e,numeric:t,sort:o,onSort:a,children:r,...n}){let s=!!a||o!==void 0;return Fo("th",{"data-slot":"table-head",scope:"col","aria-sort":s?o==="asc"?"ascending":o==="desc"?"descending":"none":void 0,className:O(_L,t&&"text-end",e),...n,children:s?Fo(GL,{sort:o??!1,numeric:t,onClick:a,children:r}):r})}function GL({sort:e,numeric:t,className:o,children:a,...r}){let n=e==="asc"?Ks:e==="desc"?Ld:Mw;return Bc("button",{type:"button","data-slot":"table-sort","data-sorted":e||void 0,className:O("group/sort -mx-1.5 inline-flex h-(--control-sm) items-center gap-1 rounded-pill px-1.5 type-label-sm text-text-2","transition-colors duration-(--dur-state) ease-out hover:bg-hover hover:text-text-1 data-sorted:text-text-1",t&&"flex-row-reverse",o),...r,children:[Fo("span",{className:"whitespace-nowrap",children:a}),Fo(Fe,{icon:n,size:12,className:O("shrink-0",!e&&"text-text-3 opacity-0 group-hover/sort:opacity-100 group-focus-visible/sort:opacity-100 pointer-coarse:opacity-100")})]})}function Zc({className:e,numeric:t,mono:o,...a}){return Fo("td",{"data-slot":"table-cell",className:O(ZL,t&&"text-end data",o&&"type-code-sm",e),...a})}var The=Kn.createContext(null);import{jsx as ke,jsxs as vt}from"react/jsx-runtime";var BR="hermes-ui-glaze";function $L(){GR(()=>{let e=document.getElementById(BR);return e||(e=document.createElement("style"),e.id=BR,document.head.appendChild(e)),e.textContent=Y2,()=>{e?.remove()}},[])}var Os=Date.now(),_R=["hermes-3-405b","deepseek-v4.1-flash","qwen3-coder-30b"],WL=`Je commence par les journaux de la routine, puis je compare les trois derniers passages.
La coupure tombe toujours entre la 30e et la 31e seconde : c'est le délai par défaut du gateway, pas une panne du bot.
Je vérifie ensuite le fichier de configuration avant de proposer une relance.`,ZR=`## Pourquoi nightly-report échoue

Trois nuits de suite, la routine s'arrête sur le même point : le gateway rend un \`504\` après 30 s, alors que la collecte des journaux en demande 40.

- **Branco** relance la routine à 02:14, sans changer le délai.
- **Dex** a coupé la reprise automatique pour éviter la boucle.
- **Preto** garde le dernier rapport complet du 5 novembre.

| Passage | Début | Durée | Résultat |
| - | - | - | - |
| run_8f2a | 02:10 | 38 s | échec |
| run_7d1c | 02:10 | 41 s | échec |
| run_6b03 | 02:09 | 39 s | échec |

Le correctif tient en une ligne : passer \`--timeout\` à 60 s dans \`routines/nightly-report.toml\`.`,qL=`hermes routine run nightly-report --bot branco --timeout 60
run_9a41 démarré · 3 étapes
  lecture routines/nightly-report.toml  ok
  collecte des journaux          40 s   ok
  envoi du rapport vers #veille         ok
terminé en 44 s`,jL=[{id:"call_read",tool:"read",status:"completed",seq:1,input:{filePath:"routines/nightly-report/run.log"},output:`02:10:31 gateway timeout after 30000ms
02:10:32 retry 1/1 refusé (reprise automatique coupée)`,startedAt:Os-13800,endedAt:Os-13100},{id:"call_shell",tool:"shell",status:"completed",seq:2,input:{command:"hermes routine logs nightly-report --bot branco --tail 40"},output:"3 passages · 3 échecs · dernier 2026-11-08 02:10",startedAt:Os-13e3,endedAt:Os-12200},{id:"call_search",tool:"websearch",status:"completed",seq:3,input:{query:"gateway 504 timeout routine hermes"},output:"Le délai par défaut du gateway est de 30 s ; il se règle par --timeout.",startedAt:Os-12e3,endedAt:Os-11400},{id:"call_run",tool:"shell",status:"running",seq:4,input:{command:"hermes routine run nightly-report --bot branco --timeout 60"},metadata:{output:"collecte des journaux 32 s / 40 s"},startedAt:Os-4e3},{id:"call_rm",tool:"shell",status:"awaiting-permission",seq:5,input:{command:"rm -rf cache/shared/2026-11-07"},permission:{patterns:["rm -rf cache/shared/2026-11-07"],message:"Supprime les 214 Mo de journaux temporaires que les trois bots ont écrits hier."}}],KL=[{label:"Lire les journaux des trois passages",detail:"run.log",status:"ok"},{label:"Relancer avec un délai de 60 s",detail:"nightly-report",status:"running"},{label:"Envoyer le rapport dans #veille",detail:"slack",status:"queued"}],YL=[{nom:"nightly-report",bot:"Branco",duree:"38 s",statut:"fail"},{nom:"inbox-triage",bot:"Dex",duree:"12 s",statut:"ok"},{nom:"veille-prix",bot:"Preto",duree:"54 s",statut:"warn"},{nom:"backup-cache",bot:"Branco",duree:"67 s",statut:"ok"}],XL=[{jour:"lun",reussies:18,echouees:1},{jour:"mar",reussies:21,echouees:0},{jour:"mer",reussies:17,echouees:2},{jour:"jeu",reussies:22,echouees:1},{jour:"ven",reussies:20,echouees:3},{jour:"sam",reussies:11,echouees:1},{jour:"dim",reussies:9,echouees:2}];function UR(){$L();let[e,t]=av(jL),[o,a]=UL(_R[0]),r=VR(100),n=VR(!1);GR(()=>{if(n.current)return;n.current=!0;let i=setTimeout(()=>{t({type:"progress",seq:++r.current,id:"call_run",metadata:{output:"collecte des journaux 40 s / 40 s"}})},1200);return()=>clearTimeout(i)},[]);let s=(i,l)=>{console.log(`[glaze-demo] tool ${i.id} → ${l}`),t({type:"reply",seq:++r.current,id:i.id,reply:l,feedback:l==="reject"?"Journaux à garder cette semaine.":void 0})};return ke("div",{className:"glaze flex h-dvh min-h-0 w-full flex-col bg-page text-text-1","data-theme":"dark",children:vt(Xg,{children:[vt("header",{className:"flex items-center gap-2 border-b border-line-faint px-4 py-2",children:[ke(e4,{type:"agent",size:"sm",name:"Dex",children:ke(z1,{})}),ke("span",{className:"type-label",children:"Dex"}),ke(si,{variant:"outline",size:"sm",children:"démo Glaze"}),ke("span",{className:"type-caption text-text-3",children:"/hui/glaze"}),vt("div",{className:"ms-auto flex items-center gap-1",children:[ke($I,{children:vt(Mm,{children:[ke(Em,{render:ke(at,{variant:"ghost",size:"icon-sm","aria-label":"Relancer la routine"}),children:ke(Fe,{icon:ns,size:14})}),ke(ac,{shortcut:["mod","shift","R"],children:"Relancer la routine"})]})}),vt(Rg,{children:[ke(Sg,{render:ke(at,{variant:"ghost",size:"icon-sm","aria-label":"Actions de la routine"}),children:ke(Fe,{icon:i0,size:14})}),vt(kg,{align:"end",size:"sm",children:[ke(Vb,{children:"Routine nightly-report"}),ke($i,{onClick:()=>console.log("[glaze-demo] ouvrir les journaux"),children:"Ouvrir les journaux"}),ke($i,{onClick:()=>console.log("[glaze-demo] copier le lien du passage"),children:"Copier le lien du passage"}),ke(Bb,{}),ke($i,{variant:"destructive",onClick:()=>console.log("[glaze-demo] désactiver la routine"),children:"Désactiver la routine"})]})]})]})]}),ke("div",{className:"min-h-0 flex-1 overflow-y-auto",children:vt("div",{className:"mx-auto flex w-full max-w-measure flex-col gap-6 px-4 py-5",children:[ke(ml,{from:"user",children:vt(fl,{children:[vt(gl,{children:["Ilyass",ke(hl,{children:"21:12"})]}),ke(Gd,{children:ke(Ud,{children:"Relance la routine nightly-report du bot Branco et dis-moi pourquoi elle a échoué trois nuits de suite."})})]})}),vt(Zd,{name:"Dex",state:"done",time:"21:14",children:[ke(bv,{streaming:!1,duration:7,children:WL}),ke(Zx,{label:"Consultant les journaux",doneLabel:"Journaux consultés",active:!0,status:"ok",announce:!1}),ke(cv,{calls:e.calls,onReply:s}),ke(Yd,{children:ZR}),vt(ax,{children:[ke(rx,{children:"14 s"}),ke(E1,{value:ZR,label:"la réponse",size:"icon-sm"})]})]}),vt("div",{className:"flex flex-col gap-2",children:[vt("div",{className:"flex items-baseline gap-2",children:[ke("h2",{className:"type-heading-sm",children:"Plan de l'agent"}),vt("span",{className:"type-caption text-text-3",children:["Ouvrir un appel : ",ke(dc,{keys:"enter"})]})]}),vt(cp,{children:[vt(up,{children:[ke(dp,{children:"Réparer nightly-report"}),ke(qx,{children:"Trois étapes, la relance est en cours sur le bot Branco."})]}),ke(pp,{flush:!0,children:KL.map(i=>vt("div",{className:"rule-row flex min-h-(--row) items-center gap-3 px-3 py-2",children:[ke("span",{className:"type-body-sm flex-1 text-text-1",children:i.label}),ke("span",{className:"mono text-text-3",children:i.detail}),ke(Eo,{status:i.status,size:"sm"})]},i.label))}),vt(us,{children:[ke(jx,{children:"3 étapes · 44 s"}),ke(at,{size:"sm",variant:"secondary",onClick:()=>console.log("[glaze-demo] modifier le plan"),children:"Modifier"}),ke(at,{size:"sm",variant:"confirm",onClick:()=>console.log("[glaze-demo] plan validé"),children:"Valider le plan"})]})]})]}),vt("div",{className:"flex flex-col gap-2",children:[ke("h2",{className:"type-heading-sm",children:"La relance, en ligne de commande"}),ke(Wd,{variant:"command",code:qL})]}),vt("div",{className:"flex flex-col gap-2",children:[ke("h2",{className:"type-heading-sm",children:"Routines des trois bots"}),vt(DR,{"aria-label":"Routines des trois bots, dernier passage",children:[ke(OR,{children:vt(_b,{children:[ke(_c,{children:"Routine"}),ke(_c,{children:"Bot"}),ke(_c,{numeric:!0,children:"Durée"}),ke(_c,{children:"Résultat"})]})}),ke(HR,{children:YL.map(i=>vt(_b,{children:[ke(Zc,{mono:!0,children:i.nom}),ke(Zc,{children:i.bot}),ke(Zc,{numeric:!0,children:i.duree}),ke(Zc,{children:ke(Eo,{status:i.statut,size:"sm"})})]},i.nom))})]})]}),vt("div",{className:"flex flex-col gap-2",children:[ke("h2",{className:"type-heading-sm",children:"Passages par jour"}),ke(aC,{type:"bar",label:"Routines par jour, sept derniers jours",data:XL,xKey:"jour",unit:"count",stacked:!0,height:170,config:{reussies:{label:"Réussies"},echouees:{label:"Échouées",status:"fail"}}})]})]})}),ke("footer",{className:"border-t border-line-faint px-4 py-3",children:vt("div",{className:"mx-auto flex w-full max-w-measure flex-col gap-2",children:[ke($6,{draftKey:"hermes-ui-glaze-demo",placeholder:"Demander à Dex de relancer une routine",status:"ready",generation:"run_9a41",onAttach:()=>console.log("[glaze-demo] pièce jointe"),attachments:[],accept:".md,.txt,.json",onSubmit:i=>console.log("[glaze-demo] envoi",i.serialized),tools:vt(Rg,{children:[ke(Sg,{render:ke(W6,{model:o})}),vt(kg,{align:"start",side:"top",size:"sm",children:[ke(Vb,{children:"Modèle"}),_R.map(i=>ke($i,{onClick:()=>a(i),children:i},i))]})]})}),vt("p",{className:"type-caption text-text-3",children:["Entrée envoie · ",ke(dc,{keys:"shift+enter"})," pour une nouvelle ligne"]})]})})]})})}import{jsx as qR}from"react/jsx-runtime";var Mg="/hui",tN="/hui/glaze",l1e={id:"hermes-ui",name:"Hermes UI",register(e){Xb(e),e.onEvent("*",t=>{try{Yb(t)}catch(o){console.warn("[hermes-ui] event",t?.type,o)}}),e.registerMany([{id:"page",area:WR,data:{path:Mg},render:()=>qR(K2,{ctx:e})},{id:"glaze",area:WR,data:{path:tN},render:()=>qR(UR,{})},{id:"nav",area:eN,data:{path:Mg,label:"Hermes UI",codicon:"comment-discussion"}},{id:"open",area:JL,data:{id:"hermes-ui.open",label:"Ouvrir Hermes UI",keywords:["hermes","ui","chat","bots"],run:()=>$R.navigate(Mg)}},{id:"new",area:QL,data:{id:"hermes-ui.newConversation",label:"Hermes UI : nouvelle conversation",category:"view",defaults:["mod+shift+o"],run:()=>{$R.navigate(Mg),qc()}}}])}};export{l1e as default};
