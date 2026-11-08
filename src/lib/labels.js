// French copy for the live activity line, bot identity helpers, time formats.

const TOOL_VERBS = [
  [/^read_file$/, 'lit un fichier'],
  [/^(write_file|create_file)$/, 'écrit un fichier'],
  [/^(patch|edit_file|apply_patch)$/, 'modifie un fichier'],
  [/^search_files$/, 'cherche dans les fichiers'],
  [/^(terminal|shell|bash|process)/, 'lance une commande'],
  [/^web_search$/, 'cherche sur le web'],
  [/^web_extract$/, 'lit une page web'],
  [/^(browser|browser_exec|drive_preview)/, 'navigue sur le web'],
  [/^execute_code$/, 'exécute du code'],
  [/^vision_analyze$/, 'regarde une image'],
  [/^image_generate$/, 'génère une image'],
  [/^text_to_speech$/, 'prépare un audio'],
  [/^skill_(view|manage)$|^skills_list$/, 'consulte ses skills'],
  [/^memory$/, 'met à jour sa mémoire'],
  [/^session_search$/, 'fouille ses conversations'],
  [/^(todo|todo_list)$/, 'organise ses tâches'],
  [/^clarify$/, 'te pose une question'],
  [/^(cronjob|cronjob_manage)$/, 'planifie une tâche'],
  [/^send_message$/, 'envoie un message'],
  [/^tool_(search|describe|call)$/, 'utilise un outil'],
  [/^connectors__([a-z0-9-]+)__/, m => `utilise ${cap(m[1])}`],
  [/^mcp__([a-z0-9-]+)__/, m => `utilise ${cap(m[1])}`]
]

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

export function toolVerb(name) {
  const n = String(name || '')
  for (const [re, verb] of TOOL_VERBS) {
    const m = re.exec(n)
    if (m) return typeof verb === 'function' ? verb(m) : verb
  }
  return n ? `utilise ${n.replace(/_/g, ' ')}` : 'travaille'
}

// The default profile is Branco (Chief of Staff) in Ilyass's setup, as in the OS chat mode.
const LABELS = { default: 'Branco' }

export function botLabel(bot) {
  if (!bot) return 'Hermes'
  const name = typeof bot === 'string' ? bot : bot.name
  const display = typeof bot === 'object' ? (bot.display_name || '').trim() : ''
  if (display) return display
  return LABELS[name] || cap(String(name || 'hermes').replace(/[-_]+/g, ' '))
}

// Stable per-bot identity: hue + aicss avatar shape, from the profile name.
const HUES = [
  ['#ff9b80', '#e2583a'], // coral
  ['#8fc2ff', '#2f6fe0'], // blue
  ['#c4b3ff', '#7c4ddb'], // violet
  ['#7ee8c4', '#0f9d74'], // green
  ['#ffd47a', '#d48a06'], // amber
  ['#ff9fd0', '#d63c8c'], // pink
  ['#86eadc', '#0f8a7e'], // teal
  ['#c3ccd8', '#5b6b80'] // slate
]
const SHAPES = ['pebble', 'circle', 'squircle', 'flower', 'blob']

function hash(s) {
  let h = 2166136261
  for (const ch of String(s || '')) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  // murmur3 finalizer: spreads short, similar names across the palette
  h ^= h >>> 16
  h = Math.imul(h, 0x85ebca6b)
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35)
  h ^= h >>> 16
  return h >>> 0
}

// Known Agentise bots get a fixed, distinct look; everyone else is hashed.
const FIXED = {
  default: [0, 'pebble'],
  dex: [1, 'squircle'],
  preto: [3, 'flower'],
  mint: [6, 'blob'],
  prism: [2, 'circle'],
  youtubot: [5, 'pebble'],
  'bot-builder': [4, 'squircle']
}

export function botLook(name) {
  const key = name || 'default'
  if (FIXED[key]) return { colors: HUES[FIXED[key][0]], shape: FIXED[key][1] }
  const h = hash(key)
  return { colors: HUES[h % HUES.length], shape: SHAPES[(h >>> 5) % SHAPES.length] }
}

export function shortModel(model) {
  const m = String(model || '').split('/').pop()
  return m.replace(/-\d{8}$/, '')
}

export function hourOf(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export const CONV_GROUPS = ["Aujourd'hui", 'Hier', '7 derniers jours', 'Plus ancien']

export function convGroup(ts) {
  if (!ts) return 'Plus ancien'
  const d = new Date(ts)
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (d.getTime() >= start) return CONV_GROUPS[0]
  if (d.getTime() >= start - 86400000) return CONV_GROUPS[1]
  if (d.getTime() >= start - 6 * 86400000) return CONV_GROUPS[2]
  return CONV_GROUPS[3]
}

export function resetIn(iso) {
  if (!iso) return ''
  const ms = new Date(iso).getTime() - Date.now()
  if (!Number.isFinite(ms) || ms <= 0) return ''
  const h = Math.floor(ms / 3600000)
  const m = Math.round((ms % 3600000) / 60000)
  if (h >= 24) return `dans ${Math.round(h / 24)} j`
  if (h > 0) return `dans ${h} h ${String(m).padStart(2, '0')}`
  return `dans ${m} min`
}

export function plural(n, one, many) {
  return `${n} ${n > 1 ? many : one}`
}
