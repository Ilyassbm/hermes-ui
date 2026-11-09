// The skill a bot reads before answering with an interface: when to draw one, when not to, the rules, three complete
// specs, then the catalogue's own prompt. Written by scripts/gen-iui-skill.mjs into skills/intelligent-ui/SKILL.md,
// which is what the plugin registers — one source, one generated file, committed.
import { catalog } from './catalog'
import { EXAMPLES, exampleBlock } from './examples'

export const SKILL_TITLE = 'intelligent-ui'

export const SKILL_DESCRIPTION =
  'Use when replying in the Hermes desktop app and the answer is clearer as an interactive card, chart, table, plan, form or choice than as plain text.'

const HEADER = `---
name: ${SKILL_TITLE}
description: ${SKILL_DESCRIPTION}
---`

const BODY = `# Intelligent UI

The Hermes desktop thread can draw an interface: cards, numbers, tables, charts, plans, forms, choices. You write text, then a \`<hui-ui>\` block, and the thread renders it with the Glaze components.

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
2. One \`<hui-ui>\` block per idea. Two ideas, two blocks, separated by text.
3. Compact, valid JSON, on one line or several, never inside a fence.
4. Short ids: \`"r"\`, \`"a"\`, \`"b"\`.
5. Real data, taken from the conversation or from what the tools returned. Nothing invented, no sample set.
6. A \`send\` button to offer the next step, with the state values interpolated: "Book for {{/guests}} people".
7. One \`primary\` button per action group; the rest \`secondary\`.
8. If a component is missing, write text: the catalogue is closed and an unknown type is not rendered.

## Examples

### Plan with a Checklist and buttons

An answer to "why does nightly-report fail", and the next step offered as two buttons.

${exampleBlock(EXAMPLES[0])}

### Comparison: Table and Metric

Two numbers that matter, then the table of the last five comparable runs.

${exampleBlock(EXAMPLES[1])}

### Form: Stepper, Choice and send

A counter, a choice, and a button that sends the interpolated state to the bot.

${exampleBlock(EXAMPLES[2])}

## Catalogue
`

/** The whole SKILL.md: header, English body, examples, then the catalogue's generated prompt. */
export function renderSkill(): string {
  return `${HEADER}\n\n${BODY}\n${catalog.prompt()}\n`
}

/** The examples as the checker reads them. */
export const SKILL_EXAMPLES = EXAMPLES
