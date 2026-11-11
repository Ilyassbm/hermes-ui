// English copy for the live activity line, bot identity helpers, time formats.
//
// Lot 13: every word here lives in UI.activity / UI.time (src/app/strings.ts); this module only maps a tool name to
// the sentence its row prints. Lot 23 adds the present tense beside the past one: the line under a running turn says
// "reads a file" while the tool row folds into "read a file" afterwards, so both come from the same table.
import { UI } from '../app/strings'

/** One row: the tool names it answers, the past phrase, the present phrase (functions for the parameterised ones). */
const TOOL_VERBS = [
  [/^read_file$/, UI.activity.read, UI.activity.present.read],
  [/^(write_file|create_file)$/, UI.activity.write, UI.activity.present.write],
  [/^(patch|edit_file|apply_patch)$/, UI.activity.edit, UI.activity.present.edit],
  [/^search_files$/, UI.activity.searchFiles, UI.activity.present.searchFiles],
  [/^(terminal|shell|bash|process)/, UI.activity.shell, UI.activity.present.shell],
  [/^web_search$/, UI.activity.webSearch, UI.activity.present.webSearch],
  [/^web_extract$/, UI.activity.webRead, UI.activity.present.webRead],
  [/^(browser|browser_exec|drive_preview)/, UI.activity.browse, UI.activity.present.browse],
  [/^execute_code$/, UI.activity.code, UI.activity.present.code],
  [/^vision_analyze$/, UI.activity.vision, UI.activity.present.vision],
  [/^image_generate$/, UI.activity.image, UI.activity.present.image],
  [/^text_to_speech$/, UI.activity.speech, UI.activity.present.speech],
  [/^skill_(view|manage)$|^skills_list$/, UI.activity.skill, UI.activity.present.skill],
  [/^memory$/, UI.activity.memory, UI.activity.present.memory],
  [/^session_search$/, UI.activity.session, UI.activity.present.session],
  [/^(todo|todo_list)$/, UI.activity.todo, UI.activity.present.todo],
  [/^clarify$/, UI.activity.clarify, UI.activity.present.clarify],
  [/^(cronjob|cronjob_manage)$/, UI.activity.cron, UI.activity.present.cron],
  [/^send_message$/, UI.activity.message, UI.activity.present.message],
  [/^tool_(search|describe|call)$/, UI.activity.tool, UI.activity.present.tool],
  [/^connectors__([a-z0-9-]+)__/, m => UI.activity.uses(cap(m[1])), m => UI.activity.present.uses(cap(m[1]))],
  [/^mcp__([a-z0-9-]+)__/, m => UI.activity.uses(cap(m[1])), m => UI.activity.present.uses(cap(m[1]))]
]

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

/** The words a tool name resolves to: the past phrase, or the present one the live line prints. */
function toolWords(name, present) {
  const n = String(name || '')
  for (const row of TOOL_VERBS) {
    const m = row[0].exec(n)
    if (m) {
      const words = present ? row[2] : row[1]
      const text = typeof words === 'function' ? words(m) : words
      return typeof text === 'string' ? text : String(text ?? '')
    }
  }
  if (!n) return present ? UI.activity.present.works : UI.activity.works
  return present ? UI.activity.present.fallback(n) : UI.activity.fallback(n)
}

/** "read a file", "searched the web": what a tool row says once the call ended. */
export function toolVerb(name) {
  return toolWords(name, false)
}

/** "reads a file", "searches the web": what the live activity line says while the call runs. */
export function toolVerbPresent(name) {
  return toolWords(name, true)
}

/** "12s", "1m 04s": the clock the live line counts. Rounds down, so 59.9s reads 59s and 60s reads 1m 00s. */
export function workingTime(ms) {
  const s = Math.max(0, Math.floor((Number.isFinite(ms) ? ms : 0) / 1000))
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`
}


export function botLabel(bot) {
  if (!bot) return 'Hermes'
  const name = typeof bot === 'string' ? bot : bot.name
  // The name the person gave the bot, in the order the app itself reads it: the Bots roster title
  // (`ui_meta['hermes-bots'].title`), then the profile's display name, then the profile name made readable.
  const title = typeof bot === 'object' ? String(bot.title || '').trim() : ''
  if (title) return title
  const display = typeof bot === 'object' ? (bot.display_name || '').trim() : ''
  if (display) return display
  return cap(String(name || 'hermes').replace(/[-_]+/g, ' '))
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

/** The look each bot was given in Hermes' own Bots roster (`ui_meta['hermes-bots'].color` / `.shape`), by profile. */
const CHOSEN = new Map()

/** Called with the roster: a colour or a shape the person picked in Hermes wins over everything below. */
export function setChosenLooks(bots) {
  CHOSEN.clear()
  for (const b of bots || []) {
    const color = typeof b?.color === 'string' && b.color.trim() ? b.color.trim() : ''
    const shape = SHAPES.includes(b?.shape) ? b.shape : ''
    if (color || shape) CHOSEN.set(b.name, { color, shape })
  }
}

/** The vivid hues only: slate is a fallback colour, and two unknown bots hashed onto it read as the same bot. */
const VIVID = HUES.slice(0, -1)

export function botLook(name) {
  const key = name || 'default'
  const chosen = CHOSEN.get(key)
  const base = FIXED[key]
    ? { colors: HUES[FIXED[key][0]], shape: FIXED[key][1] }
    : (h => ({ colors: VIVID[h % VIVID.length], shape: SHAPES[(h >>> 5) % SHAPES.length] }))(hash(key))
  if (!chosen) return base
  return {
    // One picked colour becomes the avatar's two stops: the colour lifted for the light side, deepened for the dark.
    colors: chosen.color ? [`color-mix(in srgb, ${chosen.color} 78%, white)`, `color-mix(in srgb, ${chosen.color} 82%, black)`] : base.colors,
    shape: chosen.shape || base.shape
  }
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
