// The Intelligent UI catalog: the only components and actions a bot may draw in the thread.
//
// json-render turns a flat spec ({root, elements, state}) into React through this catalog: the zod props are the
// contract the spec must satisfy, and every `description` is what the model reads in the generated skill. English,
// short, and about the job of the component rather than its look — the look is the registry's business.
import { defineCatalog, defineSchema, type PromptContext, type SchemaType } from '@json-render/core'
import { z } from 'zod'

/** `optional()` is a marker on the schema node, not a method: spread it with a literal `true` so inference keeps it. */
const maybe = <T extends SchemaType>(node: T): T & { optional: true } => ({ ...node, optional: true })

/** The flat spec of json-render, as the bot writes it between <hui-ui> and </hui-ui>. */
export const schema = defineSchema(s => ({
  spec: s.object({
    root: s.string(),
    elements: s.record(
      s.object({
        type: s.ref('catalog.components'),
        props: s.any(),
        children: maybe(s.array(s.string())),
        slots: maybe(s.record(s.array(s.string()))),
        visible: maybe(s.any())
      })
    ),
    state: maybe(s.any())
  }),
  catalog: s.object({
    components: s.map({ props: s.zod(), description: s.string(), slots: maybe(s.array(s.string())) }),
    actions: s.map({ params: s.zod(), description: s.string() })
  })
}), { promptTemplate })

const align = z.enum(['start', 'end']).optional()

/**
 * A value the person can change: a literal, `{ "$state": "/path" }` to read it, or `{ "$bindState": "/path" }` to read
 * and write it. A bound value is seeded in the spec's `state`.
 */
const bound = (inner: z.ZodTypeAny) => z.union([inner, z.object({ $state: z.string() }), z.object({ $bindState: z.string() })])

/**
 * What the model reads: the flat spec, the components it may use with their zod props, the three actions, and the
 * rules that keep a spec inside the thread. Written once here — the generated skill is this text plus a header.
 */
function promptTemplate({ catalog, formatZodType }: PromptContext): string {
  const data = catalog as {
    components: Record<string, { props: unknown; description: string; slots?: string[] }>
    actions: Record<string, { params: unknown; description: string }>
  }
  const components = Object.entries(data.components)
  const actions = Object.entries(data.actions)
  return [
    'FORMAT',
    'You are answering in a Hermes desktop app conversation. When the answer reads better as an interface, insert a block in your markdown:',
    '<hui-ui>{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Booking"},"children":["n","b"]},"n":{"type":"Stepper","props":{"label":"People","min":1,"max":8,"value":{"$bindState":"/guests"}}},"b":{"type":"Button","props":{"label":"Book","variant":"primary","action":{"name":"send","params":{"text":"Book for {{/guests}} people"}}}}}},"state":{"guests":2}}</hui-ui>',
    '',
    'One valid JSON object, on one line or several, between <hui-ui> and </hui-ui>. No fence, no comment, no JSONL.',
    '- "root": the key of the root element.',
    '- "elements": short key → { "type", "props", "children"?, "visible"? }. "children" lists keys, in display order.',
    '- "state": the starting values of interactive components. A bound component is written { "$bindState": "/path" } and reads its value from the state.',
    '- "visible": a condition, for example { "$state": "/tab", "eq": "price" } — see CONDITIONS.',
    '',
    'CONDITIONS',
    'visible accepts { "$state": "/path", "eq": "value" }, { "neq": "value" }, { "gt": n }, { "gte": n }, { "lt": n }, { "lte": n }, { "$state": "/path" } (true when the value exists), an array (AND), or { "$and": [...] } / { "$or": [...] }.',
    'For tabs: a Tabs component bound to "/tab", and one child per tab with "visible": { "$state": "/tab", "eq": "<id>" }.',
    '',
    'DERIVED VALUES',
    'In a text or an action parameter, {{/path}} is replaced by the state value at click time: "Book for {{/guests}} people".',
    '',
    'COMPOSANTS',
    ...components.flatMap(([name, entry]) => [
      `### ${name}`,
      entry.description,
      `props: ${formatZodType(entry.props as never)}`,
      ...(entry.slots?.length ? [`slots: ${entry.slots.join(', ')}`] : [])
    ]),
    '',
    'ACTIONS',
    ...actions.map(([name, entry]) => `### ${name} — ${entry.description}\nparams: ${formatZodType(entry.params as never)}`),
    '',
    'RULES',
    '1. Text first: one or two sentences that give the answer, then one <hui-ui> block per idea.',
    '2. Short ids ("r", "a", "b"). No useless key: an element with no props has none.',
    '3. Real data, taken from the conversation or from the tools. Never an invented example, never lorem ipsum.',
    '4. One "primary" Button per action group; the rest "secondary", the confirmation "confirm".',
    '5. An interactive component with no "state" or "$bindState" is inert: seed its value and bind it.',
    '6. The button that offers a next step uses the "send" action and repeats the state values with {{/path}}.',
    '7. Limits: 200 elements, 12 levels, 4000 characters per string. Beyond that the block is cut or ignored.',
    '8. A type missing from this list is not rendered (only its children): do not invent a component.'
  ].join('\n')
}

export const catalog = defineCatalog(schema, {
  components: {
    Card: {
      props: z.object({
        title: z.string().max(120),
        description: z.string().max(400).optional(),
        meta: z.string().max(120).optional()
      }),
      description: 'A card: a title, a sentence, its content, and its buttons in the footer. The container for an answer that reads as one block.',
      slots: ['footer']
    },
    Stack: {
      props: z.object({ direction: z.enum(['row', 'column']), gap: z.enum(['sm', 'md', 'lg']).optional() }),
      description: 'Stacks elements in a row or a column, with small, medium or large spacing.'
    },
    Grid: {
      props: z.object({ columns: z.union([z.literal(2), z.literal(3), z.literal(4)]) }),
      description: 'Places elements side by side on 2, 3 or 4 equal columns. For numbers or short cards.'
    },
    Text: {
      props: z.object({ text: z.string().max(4000), tone: z.enum(['default', 'muted']).optional() }),
      description: 'A short markdown paragraph: one or two sentences, with bold or inline code. No heading, no list.'
    },
    Metric: {
      props: z.object({
        label: z.string().max(120),
        value: z.string().max(40),
        delta: z.string().max(40).optional(),
        status: z.enum(['ok', 'warn', 'fail', 'neutral']).optional(),
        hint: z.string().max(160).optional()
      }),
      description: 'A number that matters: its value large, what it measures, its delta, and a note. The status colours only the delta.'
    },
    KeyValue: {
      props: z.object({ items: z.array(z.object({ label: z.string().max(80), value: z.string().max(400) })).min(1).max(20) }),
      description: 'A list of aligned label / value pairs. For the facts about one thing: model, date, cost, owner.'
    },
    Table: {
      props: z.object({
        columns: z.array(z.object({ key: z.string(), label: z.string().max(80), align })).min(1).max(8),
        rows: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))).min(1).max(50),
        title: z.string().max(120).optional()
      }),
      description: 'A table: its columns and rows. From four rows of comparable data, never for two values.'
    },
    Chart: {
      props: z.object({
        kind: z.enum(['bar', 'line', 'area']),
        data: z.array(z.record(z.string(), z.union([z.string(), z.number()]))).min(1).max(60),
        xKey: z.string(),
        series: z.array(z.object({ key: z.string(), label: z.string().max(60), status: z.enum(['ok', 'warn', 'fail']).optional() })).min(1).max(4),
        title: z.string().max(120).optional(),
        height: z.number().min(80).max(400).optional()
      }),
      description: 'A bar, line or area chart: one key for the x axis, one to four numeric series with their labels.'
    },
    Checklist: {
      props: z.object({
        items: z
          .array(
            z.object({
              label: z.string().max(200),
              status: z.enum(['done', 'running', 'waiting', 'failed', 'todo']),
              detail: z.string().max(160).optional()
            })
          )
          .min(1)
          .max(20)
      }),
      description: 'A plan or a step tracker, one row per step with its state: done, running, waiting, failed, to do.'
    },
    Steps: {
      props: z.object({
        items: z.array(z.object({ title: z.string().max(200), detail: z.string().max(300).optional(), time: z.string().max(40).optional() })).min(1).max(12)
      }),
      description: 'A numbered sequence of steps in order, with a detail and a time per step. For a procedure, not for a state.'
    },
    Callout: {
      props: z.object({
        tone: z.enum(['info', 'ok', 'warn', 'fail']),
        title: z.string().max(120),
        text: z.string().max(600)
      }),
      description: 'A callout that flags one thing: information, success, warning or failure. A sentence or two, not a paragraph.'
    },
    Tabs: {
      props: z.object({
        tabs: z.array(z.object({ id: z.string(), label: z.string().max(40) })).min(2).max(4),
        value: bound(z.string())
      }),
      description: 'A tab selector bound to the state. Children whose visible condition reads the same path change with the chosen tab.'
    },
    Image: {
      props: z.object({
        src: z.string().max(2000),
        alt: z.string().max(200),
        caption: z.string().max(200).optional()
      }),
      description: 'An image by its https address, or a local path the app serves. Never data: or javascript:.'
    },
    CodeBlock: {
      props: z.object({ code: z.string().max(4000), language: z.enum(['bash', 'ts', 'tsx', 'js', 'json', 'python', 'yaml', 'text']).optional() }),
      description: 'A copyable code or command block with its language. Short: a command output, not a whole file.'
    },
    Choice: {
      props: z.object({
        label: z.string().max(120),
        options: z.array(z.object({ value: z.string(), label: z.string().max(60) })).min(2).max(6),
        value: bound(z.string())
      }),
      description: 'One choice among two to six options, bound to the state. The chosen value is read back in texts with {{/path}}.'
    },
    Stepper: {
      props: z.object({
        label: z.string().max(120),
        min: z.number(),
        max: z.number(),
        step: z.number().optional(),
        value: bound(z.number())
      }),
      description: 'A minus/plus counter bound to the state. For a quantity: people, rooms, copies.'
    },
    Slider: {
      props: z.object({
        label: z.string().max(120),
        min: z.number(),
        max: z.number(),
        step: z.number().optional(),
        unit: z.string().max(20).optional(),
        value: bound(z.number())
      }),
      description: 'A slider between a minimum and a maximum, bound to the state, with its value shown. For a continuous setting.'
    },
    Switch: {
      props: z.object({ label: z.string().max(120), value: bound(z.boolean()) }),
      description: 'A yes / no switch bound to the state. For turning an option on.'
    },
    TextField: {
      props: z.object({
        label: z.string().max(120),
        placeholder: z.string().max(120).optional(),
        value: bound(z.string())
      }),
      description: 'A short text field bound to the state: a name, an address, a search.'
    },
    Select: {
      props: z.object({
        label: z.string().max(120),
        options: z.array(z.object({ value: z.string(), label: z.string().max(60) })).min(2).max(24),
        value: bound(z.string())
      }),
      description: 'A single-choice dropdown bound to the state. For more than six options.'
    },
    Button: {
      props: z.object({
        label: z.string().max(60),
        variant: z.enum(['primary', 'secondary', 'confirm']),
        action: z.object({
          name: z.enum(['send', 'copy', 'open']),
          params: z.record(z.string(), z.string()).optional()
        })
      }),
      description: 'A button that acts: send a message to the bot (send, text with {{/path}}), copy a text (copy), open an https address (open). One primary per group.'
    }
  },
  actions: {
    send: {
      params: z.object({ text: z.string().min(1).max(2000) }),
      description: 'Sends text as the person’s next message, with the state values interpolated ({{/guests}}).'
    },
    copy: {
      params: z.object({ text: z.string().min(1).max(4000) }),
      description: 'Copies text to the clipboard and confirms with a “Copied” toast.'
    },
    open: {
      params: z.object({ url: z.string().url().startsWith('https://').max(2000) }),
      description: 'Opens an https address in the system browser.'
    }
  }
})

export type IuiCatalog = typeof catalog
