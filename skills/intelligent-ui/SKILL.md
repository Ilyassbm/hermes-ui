---
name: intelligent-ui
description: Use when replying in the Hermes desktop app and the answer is clearer as an interactive card, chart, table, plan, form or choice than as plain text.
---

# Intelligent UI

The Hermes desktop thread can draw an interface: cards, numbers, tables, charts, plans, forms, choices. You write text, then a `<hui-ui>` block, and the thread renders it with the Glaze components.

## When to use it

- a comparison: two options, two periods, two bots;
- numbers that read better aligned than in a sentence: costs, durations, rates;
- an action plan, or the tracking of its steps;
- a choice to make, or a setting with quantities;
- tabular data of more than four rows;
- a dashboard: two or three numbers, a chart, a list.

## When not to use it

- a short answer: one sentence is enough, a card only weighs it down;
- a conversation: a question, a follow-up, a thank-you;
- Telegram, Slack, Discord, email, or any session whose source is not the desktop app: the tag would print raw, with its JSON. When in doubt, write text.

## Rules

1. Text first: one or two sentences that give the answer. The interface completes it, it does not replace it.
2. One `<hui-ui>` block per idea. Two ideas, two blocks, separated by text.
3. Compact, valid JSON, on one line or several, never inside a fence.
4. Short ids: `"r"`, `"a"`, `"b"`.
5. Real data, taken from the conversation or from what the tools returned. Nothing invented, no sample set.
6. A `send` button to offer the next step, with the state values interpolated: "Book for {{/guests}} people".
7. One `primary` button per action group; the rest `secondary`.
8. If a component is missing, write text: the catalogue is closed and an unknown type is not rendered.

## Examples

### Plan with a Checklist and buttons

An answer to "why does nightly-report fail", and the next step offered as two buttons.

```
<hui-ui>{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Fix nightly-report","description":"Three steps before tonight’s rerun.","meta":"3 steps · 44 s"},"children":["c","b1","b2"]},"c":{"type":"Checklist","props":{"items":[{"label":"Read the log of the last run","status":"done","detail":"38 s"},{"label":"Find the worker’s memory leak","status":"running","detail":"running"},{"label":"Rerun on the Atlas bot","status":"todo","detail":"23:00"}]}},"b1":{"type":"Button","props":{"label":"Run it now","variant":"primary","action":{"name":"send","params":{"text":"Run nightly-report now"}}}},"b2":{"type":"Button","props":{"label":"Show the log","variant":"secondary","action":{"name":"send","params":{"text":"Show the last 20 lines of the nightly-report log"}}}}}}</hui-ui>
```

### Comparison: Table and Metric

Two numbers that matter, then the table of the last five comparable runs.

```
<hui-ui>{"root":"r","elements":{"r":{"type":"Stack","props":{"direction":"column","gap":"md"},"children":["g","t"]},"g":{"type":"Grid","props":{"columns":2},"children":["m1","m2"]},"m1":{"type":"Metric","props":{"label":"Cost per run, Nova","value":"€0.42","delta":"−18% over 7 days","status":"ok"}},"m2":{"type":"Metric","props":{"label":"Median duration, Atlas","value":"38 s","delta":"+6 s","status":"warn"}},"t":{"type":"Table","props":{"title":"Three routines, last run","columns":[{"key":"routine","label":"Routine"},{"key":"bot","label":"Bot"},{"key":"duration","label":"Duration","align":"end"},{"key":"cost","label":"Cost","align":"end"},{"key":"state","label":"State"}],"rows":[{"routine":"nightly-report","bot":"Atlas","duration":"38 s","cost":"€0.41","state":"Failed"},{"routine":"inbox-triage","bot":"Scout","duration":"12 s","cost":"€0.08","state":"Passed"},{"routine":"price-watch","bot":"Nova","duration":"54 s","cost":"€0.42","state":"Slow"},{"routine":"backup-cache","bot":"Atlas","duration":"67 s","cost":"€0.19","state":"Passed"},{"routine":"digest-slack","bot":"Nova","duration":"21 s","cost":"€0.12","state":"Passed"}]}}}}</hui-ui>
```

### Form: Stepper, Choice and send

A counter, a choice, and a button that sends the interpolated state to the bot.

```
<hui-ui>{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Book the guest room","description":"Night of 12 November, at the lake house.","meta":"Estimate €96"},"children":["s","c","b"]},"s":{"type":"Stepper","props":{"label":"People","min":1,"max":6,"value":{"$bindState":"/guests"}}},"c":{"type":"Choice","props":{"label":"Plan","options":[{"value":"night","label":"Night and breakfast"},{"value":"day","label":"Day only"}],"value":{"$bindState":"/plan"}}},"b":{"type":"Button","props":{"label":"Request the booking","variant":"primary","action":{"name":"send","params":{"text":"Book for {{/guests}} people, {{/plan}} plan"}}}}},"state":{"guests":2,"plan":"night"}}</hui-ui>
```

## Catalogue

FORMAT
You are answering in a Hermes desktop app conversation. When the answer reads better as an interface, insert a block in your markdown:
<hui-ui>{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Booking"},"children":["n","b"]},"n":{"type":"Stepper","props":{"label":"People","min":1,"max":8,"value":{"$bindState":"/guests"}}},"b":{"type":"Button","props":{"label":"Book","variant":"primary","action":{"name":"send","params":{"text":"Book for {{/guests}} people"}}}}}},"state":{"guests":2}}</hui-ui>

One valid JSON object, on one line or several, between <hui-ui> and </hui-ui>. No fence, no comment, no JSONL.
- "root": the key of the root element.
- "elements": short key → { "type", "props", "children"?, "visible"? }. "children" lists keys, in display order.
- "state": the starting values of interactive components. A bound component is written { "$bindState": "/path" } and reads its value from the state.
- "visible": a condition, for example { "$state": "/tab", "eq": "price" } — see CONDITIONS.

CONDITIONS
visible accepts { "$state": "/path", "eq": "value" }, { "neq": "value" }, { "gt": n }, { "gte": n }, { "lt": n }, { "lte": n }, { "$state": "/path" } (true when the value exists), an array (AND), or { "$and": [...] } / { "$or": [...] }.
For tabs: a Tabs component bound to "/tab", and one child per tab with "visible": { "$state": "/tab", "eq": "<id>" }.

DERIVED VALUES
In a text or an action parameter, {{/path}} is replaced by the state value at click time: "Book for {{/guests}} people".

COMPOSANTS
### Card
A card: a title, a sentence, its content, and its buttons in the footer. The container for an answer that reads as one block.
props: { title: string, description?: string, meta?: string }
slots: footer
### Stack
Stacks elements in a row or a column, with small, medium or large spacing.
props: { direction: "row" | "column", gap?: "sm" | "md" | "lg" }
### Grid
Places elements side by side on 2, 3 or 4 equal columns. For numbers or short cards.
props: { columns: 2 | 3 | 4 }
### Text
A short markdown paragraph: one or two sentences, with bold or inline code. No heading, no list.
props: { text: string, tone?: "default" | "muted" }
### Metric
A number that matters: its value large, what it measures, its delta, and a note. The status colours only the delta.
props: { label: string, value: string, delta?: string, status?: "ok" | "warn" | "fail" | "neutral", hint?: string }
### KeyValue
A list of aligned label / value pairs. For the facts about one thing: model, date, cost, owner.
props: { items: Array<{ label: string, value: string }> }
### Table
A table: its columns and rows. From four rows of comparable data, never for two values.
props: { columns: Array<{ key: string, label: string, align?: "start" | "end" }>, rows: Array<Record<string, string | number | boolean | unknown>>, title?: string }
### Chart
A bar, line or area chart: one key for the x axis, one to four numeric series with their labels.
props: { kind: "bar" | "line" | "area", data: Array<Record<string, string | number>>, xKey: string, series: Array<{ key: string, label: string, status?: "ok" | "warn" | "fail" }>, title?: string, height?: number }
### Checklist
A plan or a step tracker, one row per step with its state: done, running, waiting, failed, to do.
props: { items: Array<{ label: string, status: "done" | "running" | "waiting" | "failed" | "todo", detail?: string }> }
### Steps
A numbered sequence of steps in order, with a detail and a time per step. For a procedure, not for a state.
props: { items: Array<{ title: string, detail?: string, time?: string }> }
### Callout
A callout that flags one thing: information, success, warning or failure. A sentence or two, not a paragraph.
props: { tone: "info" | "ok" | "warn" | "fail", title: string, text: string }
### Tabs
A tab selector bound to the state. Children whose visible condition reads the same path change with the chosen tab.
props: { tabs: Array<{ id: string, label: string }>, value: string | { $state: string } | { $bindState: string } }
### Image
An image by its https address, or a local path the app serves. Never data: or javascript:.
props: { src: string, alt: string, caption?: string }
### CodeBlock
A copyable code or command block with its language. Short: a command output, not a whole file.
props: { code: string, language?: "bash" | "ts" | "tsx" | "js" | "json" | "python" | "yaml" | "text" }
### Choice
One choice among two to six options, bound to the state. The chosen value is read back in texts with {{/path}}.
props: { label: string, options: Array<{ value: string, label: string }>, value: string | { $state: string } | { $bindState: string } }
### Stepper
A minus/plus counter bound to the state. For a quantity: people, rooms, copies.
props: { label: string, min: number, max: number, step?: number, value: number | { $state: string } | { $bindState: string } }
### Slider
A slider between a minimum and a maximum, bound to the state, with its value shown. For a continuous setting.
props: { label: string, min: number, max: number, step?: number, unit?: string, value: number | { $state: string } | { $bindState: string } }
### Switch
A yes / no switch bound to the state. For turning an option on.
props: { label: string, value: boolean | { $state: string } | { $bindState: string } }
### TextField
A short text field bound to the state: a name, an address, a search.
props: { label: string, placeholder?: string, value: string | { $state: string } | { $bindState: string } }
### Select
A single-choice dropdown bound to the state. For more than six options.
props: { label: string, options: Array<{ value: string, label: string }>, value: string | { $state: string } | { $bindState: string } }
### Button
A button that acts: send a message to the bot (send, text with {{/path}}), copy a text (copy), open an https address (open). One primary per group.
props: { label: string, variant: "primary" | "secondary" | "confirm", action: { name: "send" | "copy" | "open", params?: Record<string, string> } }

ACTIONS
### send — Sends text as the person’s next message, with the state values interpolated ({{/guests}}).
params: { text: string }
### copy — Copies text to the clipboard and confirms with a “Copied” toast.
params: { text: string }
### open — Opens an https address in the system browser.
params: { url: string }

RULES
1. Text first: one or two sentences that give the answer, then one <hui-ui> block per idea.
2. Short ids ("r", "a", "b"). No useless key: an element with no props has none.
3. Real data, taken from the conversation or from the tools. Never an invented example, never lorem ipsum.
4. One "primary" Button per action group; the rest "secondary", the confirmation "confirm".
5. An interactive component with no "state" or "$bindState" is inert: seed its value and bind it.
6. The button that offers a next step uses the "send" action and repeats the state values with {{/path}}.
7. Limits: 200 elements, 12 levels, 4000 characters per string. Beyond that the block is cut or ignored.
8. A type missing from this list is not rendered (only its children): do not invent a component.
