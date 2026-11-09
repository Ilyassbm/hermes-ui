// Data + actions over the Hermes gateway (plugin SDK `host`), and the live event reducer.
// One active bot at a time: selecting a bot activates its gateway (host.ensureAgent), so
// host.request / host.onEvent address that bot.
import { host } from '@hermes/plugin-sdk'
import { askStep, emptyToolAdapter, replyStep, toolEventStep, turnEndStep } from '../app/thread/tool-events'
import { UI } from '../app/strings'
import { view } from '../app/ui-state'
import { createStore } from './store'

export const store = createStore({
  ready: false,
  bots: [], // [{ name, display_name, model, provider, description, connectionId, route }]
  bot: null, // selected profile name
  sessionsByBot: {}, // name -> [{ id, title, at }]
  sid: null, // runtime session id of the open conversation (null = new conversation)
  storedId: null,
  loading: false,
  messages: [], // [{ id, role, text, reasoning, toolActions, model, at, status, thinkStart, thinkEnd, gen }]
  live: null, // { phase, verb, subagents, startedAt, reasoning } while a turn runs
  /** The last turn that Stop ended: `{ startedAt, endedAt }`, so the line can fold into "Worked for 12s". */
  worked: null,
  approval: null, // { requestId, command, description, allowPermanent }
  info: { model: '', title: '' },
  files: [], // [{ path, at }]
  /** The file the right panel is previewing (null: the list). Set from the panel and from a media block's Open preview. */
  previewFile: null,
  routines: [],
  usage: null,
  error: '',
  /** The error banner's Retry reopens the conversation (a failed `session.resume`), not the last prompt. */
  retryOpen: false
})

let ctxRef = null
let msgSeq = 0
/** Assistant turns are numbered: the tool-call reducer keys its `stop` on the turn's generation. */
let turnGen = 0
const nid = p => `${p}-${Date.now().toString(36)}-${(msgSeq++).toString(36)}`

// ── helpers ──────────────────────────────────────────────────────────────────

function textOf(content) {
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content
      .map(part => (typeof part === 'string' ? part : part?.text || ''))
      .filter(Boolean)
      .join('\n')
  }
  return ''
}

function parseArgs(raw) {
  if (!raw) return {}
  if (typeof raw === 'object') return raw
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const READ_TOOLS = /^(read_file|read|cat|view|read_many_files)$/
const WRITE_TOOLS = /^(write_file|write|create_file|edit|edit_file|patch|apply_patch|multiedit|str_replace)$/
const SHELL_TOOLS = /^(shell|bash|sh|zsh|run_command|terminal|process)$/

/** The verb a file row prints: read, wrote, edited, or ran (a shell command naming the path). */
function fileAction(name) {
  const tool = String(name || '')
  if (READ_TOOLS.test(tool)) return 'read'
  if (WRITE_TOOLS.test(tool)) return /^(edit|patch|apply_patch|multiedit|str_replace)$/.test(tool) ? 'edit' : 'write'
  if (SHELL_TOOLS.test(tool)) return 'shell'
  return ''
}

/** The path a file tool names, in any of the spellings Hermes tools use. */
function pathOf(args) {
  if (!args || typeof args !== 'object') return ''
  for (const key of ['path', 'file_path', 'filePath', 'target', 'file']) {
    const value = args[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  // apply_patch carries its own little patch format instead of a path field.
  const patch = typeof args.patch === 'string' ? args.patch : typeof args.input === 'string' ? args.input : ''
  const hit = /^\*\*\* (?:Update|Add|Delete) File:\s*(.+)$/m.exec(patch)
  return hit ? hit[1].trim() : ''
}

/** Paths a shell command names: absolute, ~/…, ./…, or a token with a file extension. Flags and URLs stay out. */
function pathsInShell(command) {
  const out = []
  const re = /(?:^|[\s"'`=])((?:~|\.{1,2})?\/[^\s"'`;&|<>()]+|[\w.-]+\.(?:md|txt|json|jsonl|ya?ml|toml|csv|py|ts|tsx|js|jsx|css|html|sh|png|jpe?g|gif|webp|svg|pdf|log))\b/g
  for (const match of String(command || '').matchAll(re)) {
    const token = match[1].replace(/[.,:;]+$/, '')
    if (!token || token.startsWith('-') || token.includes('://') || token.startsWith('$')) continue
    out.push(token)
  }
  return out
}

/** The files a tool call touched, as `{ path, action }` rows. */
function filesFromTool(name, args) {
  const action = fileAction(name)
  if (!action) return []
  if (action === 'shell') {
    return pathsInShell(args?.command || args?.cmd || '').map(path => ({ path, action }))
  }
  const path = pathOf(args)
  return path ? [{ path, action }] : []
}

/** `MEDIA:/…` lines: a file the bot produced outside a file tool (an image, an export). */
function filesFromText(text) {
  const out = []
  for (const m of String(text || '').matchAll(/MEDIA:\s*(\/[^\s)]+)/g)) out.push({ path: m[1], action: 'write' })
  return out
}

/** Merge file rows by path, keep the latest action, newest first. */
function mergeFiles(rows) {
  const map = new Map()
  for (const row of rows) {
    const path = typeof row === 'string' ? row : row?.path
    if (!path) continue
    const at = typeof row === 'object' && Number.isFinite(row.at) ? row.at : 0
    const action = typeof row === 'object' && row.action ? row.action : 'edit'
    const seen = map.get(path)
    if (!seen || at >= seen.at) map.set(path, { path, at, action })
  }
  return [...map.values()].sort((a, b) => b.at - a.at)
}

function addFiles(rows) {
  const add = rows.filter(row => (typeof row === 'string' ? row : row?.path))
  if (!add.length) return
  const at = Date.now()
  store.set(s => ({
    files: mergeFiles([
      ...add.map(row => (typeof row === 'string' ? { path: row, at, action: 'write' } : { at, ...row })),
      ...s.files
    ])
  }))
}

/** session.resume messages → display turns (user / assistant, tools folded into the turn). */
export function toTurns(raw) {
  const turns = []
  const files = []
  // A tool's result comes as its own message, keyed by the call it answers: index them before walking the turns.
  const results = new Map()
  for (const m of raw || []) {
    if (!m || m.role !== 'tool') continue
    const id = m.tool_call_id || m.tool_use_id || m.id
    if (id) {
      results.set(id, { failed: m.is_error === true || m.status === 'error', text: textOf(m.content) })
    }
  }
  let cur = null
  let adapter = null
  /** Closes the assistant turn being built: whatever call it left open was cut off by the end of the turn. */
  const closeTurn = () => {
    if (cur && adapter) {
      const end = turnEndStep(adapter)
      adapter = end.state
      cur.toolActions.push(...end.actions)
    }
    cur = null
    adapter = null
  }
  for (const m of raw || []) {
    if (!m || m.display_kind === 'hidden' || m.role === 'system') continue
    if (m.role === 'user') {
      closeTurn()
      const text = textOf(m.content)
      if (!text.trim()) continue
      turns.push({ id: m.message_uid || nid('u'), role: 'user', text, at: (m.timestamp || 0) * 1000 })
      continue
    }
    if (m.role === 'assistant') {
      if (!cur) {
        adapter = emptyToolAdapter(++turnGen)
        cur = {
          id: m.message_uid || nid('a'),
          role: 'assistant',
          text: '',
          reasoning: '',
          toolActions: [{ type: 'turn', gen: adapter.gen }],
          at: (m.timestamp || 0) * 1000,
          status: 'done',
          model: m.model || '',
          gen: adapter.gen,
          thinkStart: 0,
          thinkEnd: 0
        }
        turns.push(cur)
      }
      const t = textOf(m.content)
      if (t.trim()) cur.text = cur.text ? `${cur.text}\n\n${t}` : t
      const r = m.reasoning || m.reasoning_content
      if (r && typeof r === 'string') cur.reasoning = cur.reasoning ? `${cur.reasoning}\n\n${r}` : r
      for (const tc of m.tool_calls || []) {
        const name = tc?.function?.name || tc?.name
        const args = parseArgs(tc?.function?.arguments || tc?.arguments)
        const id = tc?.id || nid('t')
        // The same two steps a live turn takes: the call starts with its arguments, then its result lands.
        const started = toolEventStep(adapter, { type: 'tool.start', payload: { tool_id: id, tool_name: name, args } })
        adapter = started.state
        cur.toolActions.push(...started.actions)
        const result = results.get(id)
        if (result) {
          const done = toolEventStep(adapter, {
            type: 'tool.complete',
            payload: { tool_id: id, tool_name: name, is_error: result.failed, result: result.text }
          })
          adapter = done.state
          cur.toolActions.push(...done.actions)
        }
        const at = (m.timestamp || 0) * 1000
        files.push(...filesFromTool(name, args).map(row => ({ ...row, at })))
      }
      files.push(...filesFromText(t).map(row => ({ ...row, at: (m.timestamp || 0) * 1000 })))
      continue
    }
    // role tool: folded into its call above
  }
  closeTurn()
  return { turns: turns.filter(t => t.role === 'user' || t.text || t.reasoning || t.toolActions.length > 1), files: mergeFiles(files) }
}

// ── bots & sessions ──────────────────────────────────────────────────────────

export async function loadBots() {
  let profiles = []
  try {
    const res = await host.request('profiles.list', {})
    profiles = Array.isArray(res?.profiles) ? res.profiles : []
  } catch (e) {
    store.set({ error: `Profils illisibles : ${e?.message || e}` })
  }
  let routes = []
  try {
    routes = (await host.profileRoutes()) || []
  } catch {
    routes = []
  }
  const bots = profiles.map(p => {
    const route = routes.find(r => r.profile === p.name) || null
    return {
      name: p.name,
      display_name: p.display_name || '',
      description: p.description || '',
      model: p.model || '',
      provider: p.provider || '',
      connectionId: route?.connectionId || null,
      route
    }
  })
  store.set({ bots })
  return bots
}

export async function loadSessions(botName) {
  const bot = store.get().bots.find(b => b.name === botName)
  if (!bot) return
  try {
    const res = await host.listPersistedSessions(bot.route, { profile: botName, limit: 60 })
    const rows = (res?.sessions || [])
      .filter(r => !r.hidden && !r.archived)
      .map(r => ({
        id: r.id,
        title: r.title || r.preview || 'Conversation',
        at: (r.last_active || r.updated_at || r.started_at || 0) * 1000
      }))
      .sort((a, b) => b.at - a.at)
    store.set(s => ({ sessionsByBot: { ...s.sessionsByBot, [botName]: rows } }))
  } catch (e) {
    store.set(s => ({ sessionsByBot: { ...s.sessionsByBot, [botName]: s.sessionsByBot[botName] || [] } }))
  }
}

export async function selectBot(botName, { keepConversation = false } = {}) {
  const bot = store.get().bots.find(b => b.name === botName)
  if (!bot) return
  ctxRef?.storage?.set('lastBot', botName)
  store.set({ bot: botName, ...(keepConversation ? {} : blankConversation()) })
  try {
    await host.ensureAgent(bot.connectionId, botName)
  } catch (e) {
    store.set({ error: `${botName} injoignable : ${e?.message || e}` })
  }
  void loadSessions(botName)
  void loadRoutines()
}

function blankConversation() {
  return { sid: null, storedId: null, messages: [], live: null, worked: null, approval: null, files: [], previewFile: null, info: { model: '', title: '' }, error: '', retryOpen: false, loading: false }
}

// ── transport ────────────────────────────────────────────────────────────────

/**
 * `host.request` carries the SDK's generic 30 s deadline (`apps/desktop/src/sdk/index.ts:1506`). A session call whose
 * backend is cold legitimately runs longer, and at 30 s it dies with an unclassified timeout — the banner Ilyass saw:
 * “request timed out after 30s: session.resume”. `requestProfile(route, method, params, timeoutMs, { spawnPriority:
 * 'foreground' })` is the SDK's own door for that case (`sdk/index.ts:1372-1389`): a conversation opened from the rail
 * is an explicit user action, so it takes the pool's reserved interactive slot instead of queuing behind background
 * roster hydration. An older desktop without `requestProfile` gets the same timeout on `request`.
 */
const LONG_TIMEOUT = 120_000

function routeFor(bot) {
  return store.get().bots.find(b => b.name === bot)?.route || bot
}

function longRequest(method, params, bot = store.get().bot) {
  if (bot && typeof host.requestProfile === 'function') {
    return host.requestProfile(routeFor(bot), method, params, LONG_TIMEOUT, { spawnPriority: 'foreground' })
  }
  return host.request(method, params, LONG_TIMEOUT)
}

/** A timeout, and only a timeout: a refusal (“permission denied”, “unknown session”) is never replayed. */
function isTimeout(e) {
  return e?.code === 'TIMEOUT' || /timed out/i.test(String(e?.message || e))
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * One extra try, 700 ms later: the SDK documents that a cold profile backend can lose the hydration-timeout race once
 * and still be fine on a second call. Anything that is not a timeout is thrown on the first failure.
 */
async function retryOnce(run) {
  try {
    return await run()
  } catch (e) {
    if (!isTimeout(e)) throw e
    await sleep(700)
    return run()
  }
}

export function newConversation() {
  store.set(blankConversation())
}

/**
 * A command's answer, as a line in the thread: no bubble, no role, never sent to the gateway. It lives in the local
 * conversation only (a reload does not bring it back), which is what the thread shows when `/status` or a skill
 * answers.
 */
export function addNote(text) {
  const body = typeof text === 'string' ? text.trim() : ''
  if (!body) return
  store.set(s => ({ messages: [...s.messages, { id: nid('n'), role: 'note', text: body, at: Date.now() }] }))
}

export async function openConversation(storedId) {
  const { bot } = store.get()
  // The tab is active before the gateway answers: `storedId` is the selection, not a result of the call.
  store.set({ ...blankConversation(), storedId, loading: true })
  try {
    const res = await retryOnce(() =>
      longRequest('session.resume', { session_id: storedId, cols: 96, source: 'desktop', ...(bot ? { profile: bot } : {}) })
    )
    const { turns, files } = toTurns(res?.messages)
    store.set({
      sid: res?.session_id || storedId,
      storedId: res?.stored_session_id || storedId,
      messages: turns,
      files: files.map(row => ({ ...row, at: row.at || Date.now() })),
      loading: false,
      live: res?.running ? { phase: 'thinking', verb: '', subagents: 0, startedAt: Date.now(), reasoning: '' } : null
    })
    if (res?.running) startApprovalPoll()
  } catch (e) {
    // The banner says what happened, and its Retry replays this very call (see `retryOpen` in the store).
    console.warn('[hermes-ui] session.resume failed', e)
    store.set({ loading: false, error: UI.thread.resumeFailed, retryOpen: true })
  }
}

// ── composer prefs (model / effort per bot) ──────────────────────────────────

export function prefsFor(botName) {
  const all = ctxRef?.storage?.get('prefs', {}) || {}
  return all[botName] || {}
}

export function savePrefs(botName, patch) {
  const all = ctxRef?.storage?.get('prefs', {}) || {}
  all[botName] = { ...(all[botName] || {}), ...patch }
  ctxRef?.storage?.set('prefs', all)
}

// ── sending ──────────────────────────────────────────────────────────────────

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result || ''))
    r.onerror = () => reject(r.error)
    r.readAsDataURL(file)
  })
}

export async function ensureSession() {
  const s = store.get()
  if (s.sid) return s.sid
  const prefs = prefsFor(s.bot)
  const res = await retryOnce(() =>
    longRequest('session.create', {
      cols: 96,
      source: 'desktop',
      ...(s.bot ? { profile: s.bot } : {}),
      ...(prefs.model ? { model: prefs.model, ...(prefs.provider ? { provider: prefs.provider } : {}) } : {}),
      ...(prefs.effort ? { reasoning_effort: prefs.effort } : {}),
      fast: false
    })
  )
  const sid = res?.session_id
  applied.set(sid, `${prefs.provider || ''}|${prefs.model || ''}|${prefs.effort || ''}`)
  store.set({ sid, storedId: res?.stored_session_id || sid })
  return sid
}

// A model / effort picked after the session started is applied with the same slash commands
// the native composer uses, right before the next prompt.
const applied = new Map()
async function applyPrefsToSession(sid) {
  const { bot } = store.get()
  const prefs = prefsFor(bot)
  const want = `${prefs.provider || ''}|${prefs.model || ''}|${prefs.effort || ''}`
  const prev = applied.get(sid)
  if (prev === undefined) {
    applied.set(sid, want)
    return
  }
  if (prev === want) return
  applied.set(sid, want)
  const [pp, pm, pe] = prev.split('|')
  try {
    if (prefs.model && (prefs.model !== pm || (prefs.provider || '') !== pp)) {
      await host.request('slash.exec', { session_id: sid, command: `/model ${prefs.model}${prefs.provider ? ` --provider ${prefs.provider}` : ''}`, confirm_expensive_model: true })
    }
    if ((prefs.effort || '') !== pe && prefs.effort) {
      await host.request('slash.exec', { session_id: sid, command: `/reasoning ${prefs.effort}` })
    }
  } catch {
    /* keep the session's current model rather than failing the send */
  }
}

export async function send(text, attachments = []) {
  const body = String(text || '').trim()
  if (!body && !attachments.length) return
  const s = store.get()
  if (s.live) return
  store.set(st => ({
    error: '',
    retryOpen: false,
    // A new prompt starts a new clock: the previous stop's "Worked for" line goes with it.
    worked: null,
    messages: [...st.messages, { id: nid('u'), role: 'user', text: body, at: Date.now(), attachments: attachments.map(a => ({ name: a.name, kind: a.type?.startsWith('image/') ? 'image' : 'file' })) }],
    live: { phase: 'thinking', verb: '', subagents: 0, startedAt: Date.now(), reasoning: '' }
  }))
  // The turn exists from the moment the prompt leaves, so "thinking…" has a turn to sit in before the first token.
  patchDraft(d => d)
  try {
    const hadSession = Boolean(store.get().sid)
    const sid = await ensureSession()
    if (hadSession) await applyPrefsToSession(sid)
    const refs = []
    for (const file of attachments) {
      const dataUrl = await fileToBase64(file)
      if (file.type?.startsWith('image/')) {
        await host.request('image.attach_bytes', { session_id: sid, content_base64: dataUrl.split(',')[1] || '', filename: file.name })
      } else {
        const r = await host.request('file.attach', { session_id: sid, name: file.name, data_url: dataUrl })
        if (r?.ref_text) refs.push(r.ref_text)
      }
    }
    const full = [body, ...refs].filter(Boolean).join('\n\n')
    await longRequest('prompt.submit', { session_id: sid, text: full })
    startApprovalPoll()
  } catch (e) {
    failTurn(e?.message || String(e))
  }
}

/**
 * Stop the running turn. The gateway's `session.interrupt` takes a 30 s deadline of its own (the SDK's default is 30 s
 * too, but the call is named here so a change is visible); only an answer that is not an interrupt counts as a failure,
 * and then the live state is kept exactly as it was. On success the turn folds: `live` goes, the stream's calls are
 * settled, the turn stops reading as live, and `worked` hands the activity line its "Worked for 12s".
 */
export async function stop() {
  const { sid, messages, live } = store.get()
  if (!sid) return false
  const startedAt = live?.startedAt || Date.now()
  // The turn's live calls are settled before the network cancel is awaited (rule tool-call-stop): an event that
  // arrives while the interrupt is in flight can then never leave a row spinning.
  const last = messages[messages.length - 1]
  if (last && last.role === 'assistant' && last.status === 'streaming') {
    const gen = last.gen ?? 0
    patchDraft(d => ({ ...d, toolActions: [...d.toolActions, { type: 'stop', gen }] }))
  }
  let res = null
  try {
    res = await host.request('session.interrupt', { session_id: sid }, 30_000)
  } catch {
    return false
  }
  // `not_interrupted` says the turn changed under the keypress: nothing was cancelled, so nothing is folded either.
  if (res && (res.status === 'not_interrupted' || res.interrupted === false)) return false
  patchDraft(d => ({ ...d, status: 'done', thinkEnd: d.thinkEnd || Date.now() }))
  store.set(s => ({
    live: null,
    approval: null,
    worked: { startedAt, endedAt: Date.now() },
    messages: s.messages.map(m => (m.status === 'streaming' ? { ...m, status: 'done', thinkEnd: m.thinkEnd || Date.now() } : m))
  }))
  stopApprovalPoll()
  return true
}

export async function retryLast() {
  const msgs = store.get().messages
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].role === 'user') {
      const text = msgs[i].text
      store.set({ messages: msgs.slice(0, i), error: '' })
      return send(text)
    }
  }
}

function failTurn(reason) {
  // The turn's live calls did not finish: they are stopped, not left spinning under the error row.
  if (draft(store.get())[0]) {
    patchDraft(d => {
      const end = turnEndStep(d.adapter || emptyToolAdapter(d.gen || 0))
      return { ...d, adapter: end.state, toolActions: end.actions.length ? [...d.toolActions, ...end.actions] : d.toolActions }
    })
  }
  store.set(s => ({
    live: null,
    retryOpen: false,
    error: reason || "The response did not arrive.",
    messages: s.messages.map(m => (m.status === 'streaming' ? { ...m, status: m.text ? 'done' : 'failed' } : m))
  }))
  stopApprovalPoll()
}

// ── approvals ────────────────────────────────────────────────────────────────

let pollTimer = null
/** The requestId whose card is already on the thread: the poll runs every 1.5 s and must not ask twice. */
let askedApproval = ''

/** The call the card belongs to: the shell call still running, else an id of its own. */
function approvalTarget(d) {
  const calls = d.adapter?.calls ?? []
  const running = [...calls].reverse().find(c => c.status === 'running' && /shell|bash|terminal|process|exec/i.test(c.tool))
  return running?.id
}

/**
 * The pending approval becomes the turn's `awaiting-permission` call: the card asks, and the two answers go back to
 * the gateway. The call it interrupts keeps its place, so answering it lets the row resume instead of jumping.
 */
function askApproval(a) {
  const requestId = a.requestId || ''
  if (!requestId || requestId === askedApproval) return
  askedApproval = requestId
  const command = a.command || ''
  patchDraft(d => {
    const from = d.adapter || emptyToolAdapter(d.gen || 0)
    const id = approvalTarget(d) || `approval-${requestId}`
    const { state, actions } = askStep(from, id, command ? [command] : [], "Allow runs this command without asking again.")
    return { ...d, adapter: state, toolActions: [...d.toolActions, ...actions] }
  })
}

function startApprovalPoll() {
  if (pollTimer) return
  const tick = async () => {
    const { sid, live } = store.get()
    if (!sid || !live) return stopApprovalPoll()
    try {
      const res = await host.request('approval.pending', { session_id: sid })
      const list = res?.approvals || res?.pending || (Array.isArray(res) ? res : [])
      const first = list[0]
      const approval = first
        ? {
            requestId: first.request_id || first.id || '',
            command: first.command || '',
            description: first.description || '',
            allowPermanent: first.allow_permanent !== false
          }
        : null
      store.set({ approval })
      if (approval) askApproval(approval)
      else askedApproval = ''
    } catch {
      /* older gateway or session gone */
    }
  }
  pollTimer = ctxRef ? ctxRef.setInterval(tick, 1500) : null
  void tick()
}

function stopApprovalPoll() {
  if (typeof pollTimer === 'function') pollTimer()
  pollTimer = null
}

export async function answerApproval(choice) {
  const { sid, approval } = store.get()
  if (!sid || !approval) return
  // The card goes at once, but the request id stays remembered: the poll can still list it for a moment, and a second
  // card for the same command would ask the person twice.
  store.set({ approval: null })
  try {
    await host.request('approval.respond', { session_id: sid, choice, ...(approval.requestId ? { request_id: approval.requestId } : {}) })
  } catch (e) {
    store.set({ error: `Response not sent: ${e?.message || e}` })
  }
}

/**
 * The person's answer on the card. The row goes back to running (or to denied) at once, then the choice reaches the
 * gateway: `once` allows this call, `always` allows its command from now on, `reject` refuses it.
 */
export function replyApproval(callId, reply, permanent = false) {
  patchDraft(d => {
    const from = d.adapter || emptyToolAdapter(d.gen || 0)
    const { state, actions } = replyStep(from, callId, reply)
    return { ...d, adapter: state, toolActions: [...d.toolActions, ...actions] }
  })
  void answerApproval(reply === 'reject' ? 'deny' : permanent ? 'always' : 'once')
}

// ── live events ──────────────────────────────────────────────────────────────

function draft(s) {
  const last = s.messages[s.messages.length - 1]
  if (last && last.role === 'assistant' && last.status === 'streaming') return [last, s.messages.slice(0, -1)]
  return [null, s.messages]
}

function newTurn(s) {
  const gen = ++turnGen
  return {
    id: nid('a'),
    role: 'assistant',
    text: '',
    reasoning: '',
    // Every turn opens with its own generation (rule tool-call-stop): a late stop from the last one cannot cancel it.
    toolActions: [{ type: 'turn', gen }],
    adapter: emptyToolAdapter(gen),
    gen,
    at: Date.now(),
    turnStart: s.live?.startedAt || Date.now(),
    status: 'streaming',
    model: s.info.model
  }
}

function patchDraft(fn) {
  store.set(s => {
    let [d, rest] = draft(s)
    if (!d) {
      d = newTurn(s)
      rest = s.messages
    }
    const next = fn(d)
    return { messages: [...rest, next] }
  })
}

/** One event through the tool adapter, its actions appended to the open turn. */
function stepTools(ev) {
  patchDraft(d => {
    const from = d.adapter || emptyToolAdapter(d.gen || 0)
    const { state, actions } = toolEventStep(from, ev)
    return { ...d, adapter: state, toolActions: actions.length ? [...d.toolActions, ...actions] : d.toolActions }
  })
}

function setLive(patch) {
  store.set(s => (s.live ? { live: { ...s.live, ...patch } } : null))
}

export function handleEvent(ev) {
  if (!ev || typeof ev.type !== 'string') return
  const s = store.get()
  const p = ev.payload || {}
  if (ev.type === 'sessions.changed') {
    if (s.bot) void loadSessions(s.bot)
    return
  }
  if (!s.sid || ev.session_id !== s.sid) return

  switch (ev.type) {
    case 'session.info':
      if (p.title || p.model) store.set({ info: { model: p.model || s.info.model, title: p.title || s.info.title } })
      return
    case 'message.start':
      // A new turn opens here: its generation makes a late stop from the last turn harmless.
      if (!s.live) store.set({ live: { phase: 'thinking', verb: '', subagents: 0, startedAt: Date.now(), reasoning: '' } })
      patchDraft(d => d)
      return
    case 'reasoning.delta':
      if (typeof p.text === 'string' && p.text) {
        patchDraft(d => ({ ...d, reasoning: d.reasoning + p.text, thinkStart: d.thinkStart || Date.now() }))
        setLive({ phase: s.live?.phase === 'tool' ? 'tool' : 'thinking' })
      }
      return
    // thinking.delta carries the model's progress kaomojis ("◉_◉ synthesizing…"): they are status noise, never shown.
    case 'thinking.delta':
      return
    case 'tool.generating':
      stepTools(ev)
      setLive({ phase: 'tool', verb: '' })
      return
    case 'tool.start': {
      const name = p.tool_name || p.name
      const args = p.args || {}
      stepTools(ev)
      // A read leaves no produced file behind; its path is known when the call starts, so the panel takes it here.
      addFiles(filesFromTool(name, args))
      patchDraft(d => ({ ...d, thinkEnd: d.thinkEnd || Date.now() }))
      if (name === 'delegate_task') {
        const n = Array.isArray(args.tasks) ? args.tasks.length : 1
        setLive({ phase: 'delegating', subagents: Math.max(n, 1), toolName: name })
      } else {
        setLive({ phase: 'tool', toolName: name })
      }
      return
    }
    case 'tool.complete': {
      const name = p.tool_name || p.name
      stepTools(ev)
      addFiles([...filesFromTool(name, p.args || {}), ...filesFromText(typeof p.result === 'string' ? p.result : '')])
      setLive({ phase: 'thinking', toolName: '' })
      return
    }
    case 'subagent.start':
      setLive({ phase: 'delegating', subagents: Math.max(1, (store.get().live?.subagents || 0)) })
      return
    case 'message.delta':
      // A null text is a keep-alive, not a token: nothing to append.
      if (typeof p.text === 'string' && p.text) {
        patchDraft(d => ({ ...d, text: d.text + p.text, thinkEnd: d.thinkEnd || Date.now() }))
        setLive({ phase: 'writing' })
      }
      return
    case 'message.complete': {
      const text = typeof p.text === 'string' ? p.text : textOf(p.content)
      const failed = p.status === 'error' || p.outcome === 'failed'
      patchDraft(d => {
        const from = d.adapter || emptyToolAdapter(d.gen || 0)
        const end = turnEndStep(from)
        return {
          ...d,
          adapter: end.state,
          toolActions: end.actions.length ? [...d.toolActions, ...end.actions] : d.toolActions,
          text: text || d.text,
          reasoning: d.reasoning || (typeof p.reasoning === 'string' ? p.reasoning : ''),
          status: failed && !text ? 'failed' : 'done',
          thinkEnd: d.thinkEnd || Date.now(),
          model: store.get().info.model || d.model
        }
      })
      addFiles(filesFromText(text))
      store.set({ live: null, approval: null, ...(failed && !text ? { error: p.error || "The response did not arrive." } : {}) })
      stopApprovalPoll()
      if (s.bot) void loadSessions(s.bot)
      return
    }
    case 'error':
    case 'message.error':
      failTurn(p.message || p.error)
      return
    default:
      if (ev.type.startsWith('approval.')) void startApprovalPoll()
  }
}

// ── routines & usage ─────────────────────────────────────────────────────────

export async function loadRoutines() {
  const { bot } = store.get()
  if (!bot) return
  try {
    const res = await host.request('cron.manage', { action: 'list', include_disabled: true, profile: bot })
    const jobs = Array.isArray(res?.jobs) ? res.jobs : []
    const mine = jobs.filter(j => {
      const tag = /^\[bot:([a-z0-9][a-z0-9_-]*)\]/i.exec(j.name || '')
      return !tag || tag[1].toLowerCase() === bot
    })
    store.set({ routines: mine })
  } catch {
    store.set({ routines: [] })
  }
}

export async function loadUsage(fresh = false) {
  if (!ctxRef) return
  try {
    const res = await ctxRef.rest(`/usage${fresh ? '?fresh=1' : ''}`, { timeoutMs: 20000 })
    store.set({ usage: res?.providers || [] })
  } catch {
    store.set({ usage: 'off' })
  }
}

// ── boot ─────────────────────────────────────────────────────────────────────

/**
 * Opens an https address the way the host knows how: the desktop app hands its `os.openExternal`, the browser a new
 * tab. Anything that is not https is refused here too, so a spec cannot smuggle a scheme through the action.
 */
export function openExternal(url) {
  const target = String(url || '')
  if (!/^https:\/\//i.test(target)) return
  const os = ctxRef?.os
  if (os && typeof os.openExternal === 'function') {
    os.openExternal(target)
    return
  }
  window.open(target, '_blank', 'noopener')
}

export function bindContext(ctx) {
  ctxRef = ctx
}

/**
 * The plugin's own backend, scoped by the host to `/api/plugins/hermes-ui`: the two read-only file routes the panel
 * and the thread's media blocks share. Rejected rather than undefined when the page has no host yet, so a caller's
 * `catch` shows the quiet refusal instead of reading a property off `undefined`.
 */
export function rest(path, options) {
  const call = ctxRef?.rest
  if (typeof call !== 'function') return Promise.reject(new Error('No backend'))
  try {
    return Promise.resolve(call.call(ctxRef, path, options))
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Opens one file in the right panel. A media block's Open preview and the panel's own rows use this one door: the row
 * joins the conversation's files, the panel reads `previewFile` from the store, and the column opens if it was shut.
 */
export function openPreview(path) {
  const file = { path, at: Date.now(), action: 'write' }
  addFiles([file])
  store.set({ previewFile: file })
  view.set({ asideOpen: true })
}

export async function boot() {
  // One boot per app session, shared: the page asks for it when the gateway opens, and the takeover asks for it again
  // before it opens a session route. Two concurrent runs would each pick a bot and reset the conversation under the
  // other, so callers await the same promise instead of re-checking `ready` (which is set before the bot is selected).
  if (!bootPromise) {
    bootPromise = bootOnce().catch(e => {
      bootPromise = null
      throw e
    })
  }
  return bootPromise
}

let bootPromise = null

async function bootOnce() {
  if (store.get().ready) return
  const bots = await loadBots()
  const last = ctxRef?.storage?.get('lastBot', null)
  const active = host.state.profile.get()
  const pick = bots.find(b => b.name === last) || bots.find(b => b.name === active) || bots[0]
  store.set({ ready: true })
  if (pick) await selectBot(pick.name)
  void loadUsage()
}
