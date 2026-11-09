// The tool registry as this product speaks it: English verbs, Hermes tool names and their aliases.
//
// Registered once at module scope (rule tool-call-register): every row, the approval card's question and the turn's
// folded summary read their words from here, so a verb edited once changes every place it shows. The English renderers
// Glaze ships stay for their own names; these replace the same keys, so `terminal`, `read_file`, `write_file`… resolve
// to one renderer each. Every word lives in UI.tools (src/app/strings.ts): lot 13 moved the copy out of this file so
// the catalogue's language is one object, not a verb per registerTool call.
import { CappedOutput, registerTool } from '@/components/glaze/ai/tool-call'
import type { ToolCallLabels, ToolCallData, ToolRenderer } from '@/components/glaze/ai/tool-call'
import { humanDuration } from '@/lib/labels'
import { UI } from '../strings'

type Words = {
  /** The -ing phrase while it runs. */
  active: string
  /** The past phrase once it ended. */
  done: string
  /** The imperative, for the permission card. */
  ask: string
  /** The noun in "Running <noun>". */
  noun: string
  /** The turn summary's key and its one / many words. */
  key: string
  one: string
  many: (n: number) => string
  /** The arguments the detail is read from, first match wins. */
  detail?: string[]
  /** Lines of output shown before "Show more". */
  lines?: number
  /** The detail is a path, a command or a URL: set in mono. */
  mono?: boolean
  /** A detail computed from the call, when the arguments do not hold it. */
  detailOf?: (input: Record<string, unknown>, call: ToolCallData) => string | undefined
}

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v : undefined)
const first = (input: Record<string, unknown>, keys: string[] = []) => keys.map(k => str(input[k])).find(Boolean)
const basename = (p?: string) => p?.split('/').filter(Boolean).at(-1) ?? p

/** A tool whose body is its output: the common case, and all Hermes tools need. */
function tool(words: Words, aliases: string[] = []): ToolRenderer {
  const lines = words.lines ?? 8
  return {
    active: words.active,
    done: words.done,
    ask: words.ask,
    noun: words.noun,
    confirm: UI.tools.confirm(words.ask),
    detailMono: words.mono ?? false,
    lines,
    summary: { key: words.key, one: words.one, many: words.many },
    detail: (input, call) => words.detailOf?.(input, call) ?? first(input, words.detail),
    body: (call, ctx) => (call.output ? <CappedOutput text={call.output} lines={lines} labels={ctx.labels} /> : null)
  }
}

const V = UI.tools.verbs

// ── the shells ──────────────────────────────────────────────────────────────────────────────────────────────────

registerTool(
  'shell',
  // The command is the detail; the output is the body, capped at 24 lines the way a terminal is read.
  {
    ...tool(
      {
        active: V.shell.active,
        done: V.shell.done,
        ask: V.shell.ask,
        noun: V.shell.noun,
        key: 'shell',
        one: V.shell.one,
        many: V.shell.many,
        detail: ['command', 'description'],
        lines: 24,
        mono: true
      },
      ['bash', 'sh', 'zsh', 'run_command', 'terminal', 'process']
    ),
    confirm: V.shell.confirm
  }
)

registerTool(
  'read',
  tool(
    {
      active: V.read.active,
      done: V.read.done,
      ask: V.read.ask,
      noun: V.read.noun,
      key: 'read',
      one: V.read.one,
      many: V.read.many,
      detail: ['filePath', 'path', 'file'],
      mono: true,
      detailOf: input => basename(first(input, ['filePath', 'path', 'file']))
    },
    ['read_file', 'cat']
  )
)

registerTool(
  'edit',
  tool(
    {
      active: V.edit.active,
      done: V.edit.done,
      ask: V.edit.ask,
      noun: V.edit.noun,
      key: 'edit',
      one: V.edit.one,
      many: V.edit.many,
      detail: ['filePath', 'path', 'file'],
      mono: true,
      detailOf: input => basename(first(input, ['filePath', 'path', 'file']))
    },
    ['write', 'write_file', 'create_file', 'patch', 'apply_patch', 'edit_file', 'multiedit', 'str_replace']
  )
)

registerTool(
  'grep',
  tool(
    {
      active: V.search.active,
      done: V.search.done,
      ask: V.search.ask,
      noun: V.search.noun,
      key: 'search',
      one: V.search.one,
      many: V.search.many,
      detail: ['pattern', 'query', 'path']
    },
    ['search_files', 'search', 'find', 'rg']
  )
)

registerTool(
  'glob',
  tool(
    {
      active: V.list.active,
      done: V.list.done,
      ask: V.list.ask,
      noun: V.list.noun,
      key: 'search',
      one: V.list.one,
      many: V.list.many,
      detail: ['pattern', 'path'],
      mono: true
    },
    ['ls', 'list']
  )
)

registerTool(
  'websearch',
  tool(
    {
      active: V.searchWeb.active,
      done: V.searchWeb.done,
      ask: V.searchWeb.ask,
      noun: V.searchWeb.noun,
      key: 'websearch',
      one: V.searchWeb.one,
      many: V.searchWeb.many,
      detail: ['query']
    },
    ['web_search', 'search_web']
  )
)

registerTool(
  'webfetch',
  tool(
    {
      active: V.web.active,
      done: V.web.done,
      ask: V.web.ask,
      noun: V.web.noun,
      key: 'web',
      one: V.web.one,
      many: V.web.many,
      detail: ['url'],
      mono: true
    },
    ['web_extract', 'fetch', 'web_fetch']
  )
)

registerTool(
  'browser',
  tool(
    {
      active: V.browser.active,
      done: V.browser.done,
      ask: V.browser.ask,
      noun: V.browser.noun,
      key: 'browser',
      one: V.browser.one,
      many: V.browser.many,
      detail: ['url', 'task', 'description'],
      mono: true
    },
    ['browser_exec', 'browser_navigate', 'drive_preview']
  )
)

registerTool(
  'code',
  tool(
    {
      active: V.code.active,
      done: V.code.done,
      ask: V.code.ask,
      noun: V.code.noun,
      key: 'code',
      one: V.code.one,
      many: V.code.many,
      detail: ['description', 'language'],
      lines: 24
    },
    ['execute_code', 'python', 'run_code']
  )
)

registerTool(
  'clarify',
  tool(
    {
      active: V.clarify.active,
      done: V.clarify.done,
      ask: V.clarify.ask,
      noun: V.clarify.noun,
      key: 'clarify',
      one: V.clarify.one,
      many: V.clarify.many,
      detail: ['question']
    },
    ['ask', 'ask_user']
  )
)

registerTool(
  'skill',
  tool(
    {
      active: V.skill.active,
      done: V.skill.done,
      ask: V.skill.ask,
      noun: V.skill.noun,
      key: 'skill',
      one: V.skill.one,
      many: V.skill.many,
      detail: ['name', 'skill']
    },
    ['skill_view', 'skills_list', 'skill_manage']
  )
)

registerTool(
  'memory',
  tool(
    {
      active: V.memory.active,
      done: V.memory.done,
      ask: V.memory.ask,
      noun: V.memory.noun,
      key: 'memory',
      one: V.memory.one,
      many: V.memory.many,
      detail: ['action', 'target']
    },
    ['memory_write', 'memory_read']
  )
)

registerTool(
  'image',
  tool(
    {
      active: V.image.active,
      done: V.image.done,
      ask: V.image.ask,
      noun: V.image.noun,
      key: 'image',
      one: V.image.one,
      many: V.image.many,
      detail: ['prompt', 'description']
    },
    ['image_generate', 'imagegen']
  )
)

registerTool(
  'delegate_task',
  // A delegation names its tasks: the detail is how many went out, and the summary counts them.
  {
    ...tool(
      {
        active: V.delegate.active,
        done: V.delegate.done,
        ask: V.delegate.ask,
        noun: V.delegate.noun,
        key: 'task',
        one: V.delegate.one,
        many: V.delegate.many,
        lines: 8
      },
      ['subagent', 'agent', 'task']
    ),
    confirm: V.delegate.confirm,
    detail: input => {
      const tasks = Array.isArray(input.tasks) ? input.tasks : null
      if (tasks) return UI.tools.tasks(tasks.length)
      return str(input.description)
    },
    // The count of tasks is a number the person reads: tabular digits, marked for the UI linter.
    detailNode: input => {
      const tasks = Array.isArray(input.tasks) ? input.tasks : null
      return tasks ? <span className="data" data-ui-number="">{UI.tools.tasks(tasks.length)}</span> : undefined
    }
  }
)

// ── words ──────────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * Every string ToolCallList and its rows show. The tool's own verbs come from the registry above; these are the
 * states, the cap, the folded line and the two answers of a permission card.
 */
export const TOOL_LABELS: ToolCallLabels = {
  status: {
    pending: UI.tools.status.pending,
    running: UI.tools.status.running,
    completed: UI.tools.status.completed,
    error: UI.tools.status.error,
    'awaiting-permission': UI.tools.status['awaiting-permission'],
    denied: UI.tools.status.denied,
    cancelled: UI.tools.status.cancelled
  },
  orphaned: UI.tools.orphaned,
  result: UI.tools.result,
  forCall: id => UI.tools.forCall(id),
  showMore: () => UI.tools.showMore,
  showLess: UI.tools.showLess,
  trimmed: characters => UI.tools.trimmed(characters),
  added: UI.tools.added,
  removed: UI.tools.removed,
  worked: time => UI.tools.worked(humanDuration(time)),
  ranTools: count => UI.tools.ranTools(count),
  failedCount: count => UI.tools.failedCount(count),
  allow: UI.tools.allow,
  deny: UI.tools.deny
}
