// Data + actions over the Hermes gateway (plugin SDK `host`), and the live event reducer.
// One active bot at a time: selecting a bot activates its gateway (host.ensureAgent), so
// host.request / host.onEvent address that bot.
import { host } from '@hermes/plugin-sdk'
import { askStep, emptyToolAdapter, replyStep, toolEventStep, turnEndStep } from '../app/thread/tool-events'
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
  approval: null, // { requestId, command, description, allowPermanent }
  info: { model: '', title: '' },
  files: [], // [{ path, at }]
  routines: [],
  usage: null,
  error: ''
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

const FILE_TOOLS = /^(write_file|create_file|patch|edit_file|apply_patch)$/

function filesFromTool(name, args) {
  if (!FILE_TOOLS.test(String(name || ''))) return []
  const p = args?.path || args?.file_path || args?.target
  return typeof p === 'string' && p ? [p] : []
}

function filesFromText(text) {
  const out = []
  for (const m of String(text || '').matchAll(/MEDIA:\s*(\/[^\s)]+)/g)) out.push(m[1])
  return out
}

function addFiles(paths) {
  if (!paths.length) return
  store.set(s => {
    const seen = new Set(s.files.map(f => f.path))
    const add = paths.filter(p => !seen.has(p)).map(path => ({ path, at: Date.now() }))
    return add.length ? { files: [...add, ...s.files] } : null
  })
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
        files.push(...filesFromTool(name, args))
      }
      files.push(...filesFromText(t))
      continue
    }
    // role tool: folded into its call above
  }
  closeTurn()
  return { turns: turns.filter(t => t.role === 'user' || t.text || t.reasoning || t.toolActions.length > 1), files: [...new Set(files)] }
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
  return { sid: null, storedId: null, messages: [], live: null, approval: null, files: [], info: { model: '', title: '' }, error: '' }
}

export function newConversation() {
  store.set(blankConversation())
}

export async function openConversation(storedId) {
  const { bot } = store.get()
  store.set({ ...blankConversation(), storedId, loading: true })
  try {
    const res = await host.request('session.resume', { session_id: storedId, cols: 96, source: 'desktop', ...(bot ? { profile: bot } : {}) })
    const { turns, files } = toTurns(res?.messages)
    store.set({
      sid: res?.session_id || storedId,
      storedId: res?.stored_session_id || storedId,
      messages: turns,
      files: files.map(path => ({ path, at: 0 })),
      loading: false,
      live: res?.running ? { phase: 'thinking', verb: '', subagents: 0, startedAt: Date.now(), reasoning: '' } : null
    })
    if (res?.running) startApprovalPoll()
  } catch (e) {
    store.set({ loading: false, error: `Conversation illisible : ${e?.message || e}` })
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

async function ensureSession() {
  const s = store.get()
  if (s.sid) return s.sid
  const prefs = prefsFor(s.bot)
  const res = await host.request('session.create', {
    cols: 96,
    source: 'desktop',
    ...(s.bot ? { profile: s.bot } : {}),
    ...(prefs.model ? { model: prefs.model, ...(prefs.provider ? { provider: prefs.provider } : {}) } : {}),
    ...(prefs.effort ? { reasoning_effort: prefs.effort } : {}),
    fast: false
  })
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
    messages: [...st.messages, { id: nid('u'), role: 'user', text: body, at: Date.now(), attachments: attachments.map(a => ({ name: a.name, kind: a.type?.startsWith('image/') ? 'image' : 'file' })) }],
    live: { phase: 'thinking', verb: '', subagents: 0, startedAt: Date.now(), reasoning: '' }
  }))
  // The turn exists from the moment the prompt leaves, so "réfléchit…" has a turn to sit in before the first token.
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
    await host.request('prompt.submit', { session_id: sid, text: full })
    startApprovalPoll()
  } catch (e) {
    failTurn(e?.message || String(e))
  }
}

export async function stop() {
  const { sid, messages } = store.get()
  if (!sid) return
  // The turn's live calls are settled before the network cancel is awaited (rule tool-call-stop): an event that
  // arrives while the interrupt is in flight can then never leave a row spinning.
  const last = messages[messages.length - 1]
  if (last && last.role === 'assistant' && last.status === 'streaming') {
    const gen = last.gen ?? 0
    patchDraft(d => ({ ...d, toolActions: [...d.toolActions, { type: 'stop', gen }] }))
  }
  try {
    await host.request('session.interrupt', { session_id: sid })
  } catch {
    /* the turn may already be over */
  }
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
    error: reason || "La réponse n'est pas arrivée.",
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
    const { state, actions } = askStep(from, id, command ? [command] : [], "Autoriser laisse lancer cette commande sans redemander.")
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
    store.set({ error: `Réponse non transmise : ${e?.message || e}` })
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
      store.set({ live: null, approval: null, ...(failed && !text ? { error: p.error || "La réponse n'est pas arrivée." } : {}) })
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

export async function boot() {
  if (store.get().ready) return
  const bots = await loadBots()
  const last = ctxRef?.storage?.get('lastBot', null)
  const active = host.state.profile.get()
  const pick = bots.find(b => b.name === last) || bots.find(b => b.name === active) || bots[0]
  store.set({ ready: true })
  if (pick) await selectBot(pick.name)
  void loadUsage()
}
