// The tool registry as this product speaks it: French verbs, Hermes tool names and their aliases.
//
// Registered once at module scope (rule tool-call-register): every row, the approval card's question and the turn's
// folded summary read their words from here, so a verb edited once changes every place it shows. The English renderers
// Glaze ships stay for their own names; these replace the same keys, so `terminal`, `read_file`, `write_file`… resolve
// to one renderer each, in French.
import { CappedOutput, registerTool } from '@/components/glaze/ai/tool-call'
import type { ToolCallLabels, ToolCallData, ToolRenderer } from '@/components/glaze/ai/tool-call'

type Words = {
  /** The -ing phrase while it runs. */
  active: string
  /** The past phrase once it ended. */
  done: string
  /** The imperative, for the permission card. */
  ask: string
  /** The noun in "Préparation <noun>". */
  noun: string
  /** The turn summary's key and its one / many words. */
  key: string
  one: string
  many: (n: number) => string
  /** The arguments the detail is read from, first match wins. */
  detail?: string[]
  /** Lines of output shown before "Afficher plus". */
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
    confirm: `${words.ask} ?`,
    detailMono: words.mono ?? false,
    lines,
    summary: { key: words.key, one: words.one, many: words.many },
    detail: (input, call) => words.detailOf?.(input, call) ?? first(input, words.detail),
    body: (call, ctx) => (call.output ? <CappedOutput text={call.output} lines={lines} labels={ctx.labels} /> : null)
  }
}

// ── the shells ──────────────────────────────────────────────────────────────────────────────────────────────────

registerTool(
  'shell',
  // The command is the detail; the output is the body, capped at 24 lines the way a terminal is read.
  {
    ...tool(
      {
        active: 'Exécute',
        done: 'A exécuté',
        ask: 'Exécuter',
        noun: 'commande',
        key: 'shell',
        one: 'a lancé une commande',
        many: n => `a lancé ${n} commandes`,
        detail: ['command', 'description'],
        lines: 24,
        mono: true
      },
      ['bash', 'sh', 'zsh', 'run_command', 'terminal', 'process']
    ),
    confirm: 'Exécuter cette commande ?'
  }
)

registerTool(
  'read',
  tool(
    {
      active: 'Lit',
      done: 'A lu',
      ask: 'Lire',
      noun: 'fichier',
      key: 'read',
      one: 'a lu un fichier',
      many: n => `a lu ${n} fichiers`,
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
      active: 'Modifie',
      done: 'A modifié',
      ask: 'Modifier',
      noun: 'fichier',
      key: 'edit',
      one: 'a modifié un fichier',
      many: n => `a modifié ${n} fichiers`,
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
      active: 'Cherche',
      done: 'A cherché',
      ask: 'Chercher',
      noun: 'recherche',
      key: 'search',
      one: 'a cherché une fois',
      many: n => `a cherché ${n} fois`,
      detail: ['pattern', 'query', 'path']
    },
    ['search_files', 'search', 'find', 'rg']
  )
)

registerTool(
  'glob',
  tool(
    {
      active: 'Liste',
      done: 'A listé',
      ask: 'Lister',
      noun: 'motif',
      key: 'search',
      one: 'a cherché une fois',
      many: n => `a cherché ${n} fois`,
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
      active: 'Cherche sur le web',
      done: 'A cherché sur le web',
      ask: 'Chercher sur le web',
      noun: 'recherche web',
      key: 'websearch',
      one: 'a cherché sur le web',
      many: n => `a cherché ${n} fois sur le web`,
      detail: ['query']
    },
    ['web_search', 'search_web']
  )
)

registerTool(
  'webfetch',
  tool(
    {
      active: 'Lit une page',
      done: 'A lu une page',
      ask: 'Lire la page',
      noun: 'page',
      key: 'web',
      one: 'a lu une page',
      many: n => `a lu ${n} pages`,
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
      active: 'Navigue',
      done: 'A navigué',
      ask: 'Naviguer',
      noun: 'page',
      key: 'browser',
      one: 'a navigué sur une page',
      many: n => `a navigué sur ${n} pages`,
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
      active: 'Exécute du code',
      done: 'A exécuté du code',
      ask: 'Exécuter le code',
      noun: 'code',
      key: 'code',
      one: 'a exécuté du code',
      many: n => `a exécuté du code ${n} fois`,
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
      active: 'Pose une question',
      done: 'A posé une question',
      ask: 'Poser la question',
      noun: 'question',
      key: 'clarify',
      one: 'a posé une question',
      many: n => `a posé ${n} questions`,
      detail: ['question']
    },
    ['ask', 'ask_user']
  )
)

registerTool(
  'skill',
  tool(
    {
      active: 'Lit un skill',
      done: 'A lu un skill',
      ask: 'Lire le skill',
      noun: 'skill',
      key: 'skill',
      one: 'a lu un skill',
      many: n => `a lu ${n} skills`,
      detail: ['name', 'skill']
    },
    ['skill_view', 'skills_list', 'skill_manage']
  )
)

registerTool(
  'memory',
  tool(
    {
      active: 'Met à jour la mémoire',
      done: 'A mis à jour la mémoire',
      ask: 'Mettre à jour la mémoire',
      noun: 'mémoire',
      key: 'memory',
      one: 'a mis à jour la mémoire',
      many: n => `a mis à jour la mémoire ${n} fois`,
      detail: ['action', 'target']
    },
    ['memory_write', 'memory_read']
  )
)

registerTool(
  'image',
  tool(
    {
      active: 'Génère une image',
      done: 'A généré une image',
      ask: 'Générer l’image',
      noun: 'image',
      key: 'image',
      one: 'a généré une image',
      many: n => `a généré ${n} images`,
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
        active: 'Délègue',
        done: 'A délégué',
        ask: 'Déléguer',
        noun: 'tâche',
        key: 'task',
        one: 'a délégué une tâche',
        many: n => `a délégué ${n} tâches`,
        lines: 8
      },
      ['subagent', 'agent', 'task']
    ),
    confirm: 'Déléguer ces tâches ?',
    detail: input => {
      const tasks = Array.isArray(input.tasks) ? input.tasks : null
      if (tasks) return `${tasks.length} tâche${tasks.length > 1 ? 's' : ''}`
      return str(input.description)
    }
  }
)

// ── words ──────────────────────────────────────────────────────────────────────────────────────────────────────

/**
 * Every string ToolCallList and its rows show, in French. The tool's own verbs come from the registry above; these are
 * the states, the cap, the folded line and the two answers of a permission card.
 */
export const TOOL_LABELS: ToolCallLabels = {
  status: {
    pending: 'Préparation',
    running: 'En cours',
    completed: 'Terminé',
    error: 'Échec',
    'awaiting-permission': 'En attente',
    denied: 'Refusé',
    cancelled: 'Arrêté'
  },
  orphaned: 'Résultat orphelin',
  result: 'Résultat',
  forCall: id => `pour l’appel ${id}`,
  showMore: () => 'Afficher plus',
  showLess: 'Afficher moins',
  trimmed: characters => `Tronqué à ${characters.toLocaleString('fr-FR')} caractères`,
  added: 'ajoutées',
  removed: 'retirées',
  worked: time => `A travaillé ${time}`,
  ranTools: count => (count === 1 ? 'A exécuté 1 outil' : `A exécuté ${count} outils`),
  failedCount: count => (count === 1 ? '1 échec' : `${count} échecs`),
  allow: 'Autoriser',
  deny: 'Refuser'
}
