// English copy for the live activity line, bot identity helpers, time formats.
//
// Lot 13: every word here lives in UI.activity / UI.time (src/app/strings.ts); this module only maps a tool name to
// the sentence its row prints.
import { UI } from '../app/strings'

const TOOL_VERBS = [
  [/^read_file$/, UI.activity.read],
  [/^(write_file|create_file)$/, UI.activity.write],
  [/^(patch|edit_file|apply_patch)$/, UI.activity.edit],
  [/^search_files$/, UI.activity.searchFiles],
  [/^(terminal|shell|bash|process)/, UI.activity.shell],
  [/^web_search$/, UI.activity.webSearch],
  [/^web_extract$/, UI.activity.webRead],
  [/^(browser|browser_exec|drive_preview)/, UI.activity.browse],
  [/^execute_code$/, UI.activity.code],
  [/^vision_analyze$/, UI.activity.vision],
  [/^image_generate$/, UI.activity.image],
  [/^text_to_speech$/, UI.activity.speech],
  [/^skill_(view|manage)$|^skills_list$/, UI.activity.skill],
  [/^memory$/, UI.activity.memory],
  [/^session_search$/, UI.activity.session],
  [/^(todo|todo_list)$/, UI.activity.todo],
  [/^clarify$/, UI.activity.clarify],
  [/^(cronjob|cronjob_manage)$/, UI.activity.cron],
  [/^send_message$/, UI.activity.message],
  [/^tool_(search|describe|call)$/, UI.activity.tool],
  [/^connectors__([a-z0-9-]+)__/, m => UI.activity.uses(cap(m[1]))],
  [/^mcp__([a-z0-9-]+)__/, m => UI.activity.uses(cap(m[1]))]
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
  return n ? UI.activity.fallback(n) : UI.activity.works
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

// A model as a person reads it: "DeepSeek V4.1 Flash", "Opus 5.5", "GPT-6". The id stays in the title attribute, and
// `vX.Y` keeps its shape — a version is not a word to capitalise.
const MODEL_LABELS = {
  'deepseek-v4.1-flash': 'DeepSeek V4.1 Flash',
  'claude-opus-5-5': 'Opus 5.5',
  'claude-sonnet-5': 'Sonnet 5',
  'claude-haiku-4-5': 'Haiku 4.5',
  'grok-4.7': 'Grok 4.7',
  'gpt-6': 'GPT-6'
}

const titled = word => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word)

export function modelLabel(model) {
  const id = shortModel(model)
  if (!id) return ''
  if (MODEL_LABELS[id]) return MODEL_LABELS[id]
  // A Claude id names the family and its version: claude-opus-5-5 → Opus 5.5.
  const claude = /^claude-([a-z]+)-(.+)$/.exec(id)
  if (claude) return `${titled(claude[1])} ${claude[2].replace(/-/g, '.')}`
  // A GPT id is a brand: gpt-6 → GPT-6.
  const gpt = /^gpt-(.+)$/.exec(id)
  if (gpt) return `GPT-${gpt[1].replace(/-/g, ' ')}`
  return id.split(/[-_]+/).filter(Boolean).map(w => (/^v\d/i.test(w) ? w : titled(w))).join(' ')
}

// Glaze writes a duration as the English reader expects it — "14.4s", "1m 05s", "1h 04m" — and this keeps that shape,
// rounding to the second under a minute.
const NBSP = '\u00a0'

export function humanDuration(value) {
  const text = String(value ?? '').trim()
  const ms = /^([\d.]+)ms$/.exec(text)
  if (ms) return `${Math.round(Number(ms[1]))}ms`
  const sec = /^([\d.]+)s$/.exec(text)
  if (sec) {
    const s = Math.round(Number(sec[1]))
    if (s < 60) return `${s}s`
    return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`
  }
  const min = /^(\d+)m (\d+)s$/.exec(text)
  if (min) return `${min[1]}m ${min[2]}s`
  const hour = /^(\d+)h (\d+)m$/.exec(text)
  if (hour) return `${hour[1]}h ${hour[2]}m`
  const day = /^(\d+)d (\d+)h$/.exec(text)
  if (day) return `${day[1]}d ${day[2]}h`
  return text
}

export function hourOf(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export const CONV_GROUPS = UI.time.conversations

export function convGroup(ts) {
  if (!ts) return CONV_GROUPS[3]
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
  if (h >= 24) return UI.time.resetInDays(Math.round(h / 24))
  if (h > 0) return UI.time.resetInHours(h, String(m).padStart(2, '0'))
  return UI.time.resetInMinutes(m)
}

export function plural(n, one, many) {
  return `${n} ${n > 1 ? many : one}`
}
