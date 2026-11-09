// Gateway events → ToolCall events. A pure function of (state, event), no React: the thread drives it while a turn
// streams, the history builder drives it once per stored call, and scripts/check-tool-mapping.mjs replays a real
// capture through it. `toolCallsReducer` (Glaze) is the only state machine; this file only names what arrives.
//
// Why a step function rather than a hook: the gateway names a tool before it has an id (`tool.generating`), then sends
// the id with `tool.start`. Glaze's reducer keys its calls by id, so the waiting row is created under a temporary id
// and renamed when the real one shows up — that rename is the one action the reducer cannot express, and it lives here
// so both the app and the check script do the same thing.
//
// Events and their mapping (Hermes gateway, `hermes-gateway-v1`):
//   tool.generating  {name}                       → call   id `gen-<name>-<n>`, status pending
//   tool.start       {tool_id, tool_name, args}   → rekey  the oldest pending of that tool onto the real id
//                                                 → start  ...then running, with the arguments
//   tool.complete    {tool_id, is_error, result}  → result status completed or error (explicit, never implied)
// Statuses are tracked here only to close a turn: whatever is still live when `message.complete` lands was cut off by
// the end of the turn, so it is stopped rather than left spinning.
import type { ToolCallData, ToolCallsState, ToolEvent, ToolStatus } from '@/components/glaze/ai/tool-call'

/** A call's reply to a permission card: the person's answer. */
export type ToolReplyAction = 'once' | 'reject'

export type ToolAction = ToolEvent | { type: 'rekey'; from: string; to: string }

type Tracked = { id: string; tool: string; status: ToolStatus }

export type ToolAdapterState = {
  /** The per-call sequence: every action it emits for one call carries a higher number than the last. */
  seq: number
  /** The turn's generation, for stop. */
  gen: number
  /** The counter behind `gen-<name>-<n>` ids. */
  n: number
  /** Calls whose name is known and whose id is not, oldest first. */
  pending: { id: string; tool: string }[]
  /** Every call the reducer holds, so a later event can tell an unknown id from a known one. */
  calls: Tracked[]
}

const terminal: ReadonlySet<ToolStatus> = new Set(['completed', 'error', 'denied', 'cancelled'])
const isTerminal = (status: ToolStatus) => terminal.has(status)

export function emptyToolAdapter(gen = 0): ToolAdapterState {
  return { seq: 0, gen, n: 0, pending: [], calls: [] }
}

const track = (calls: Tracked[], id: string, tool: string, status: ToolStatus): Tracked[] => {
  const hit = calls.find(c => c.id === id)
  if (!hit) return [...calls, { id, tool, status }]
  return calls.map(c => (c.id === id ? { ...c, tool: c.tool === 'unknown' ? tool : c.tool, status } : c))
}

type Step = { state: ToolAdapterState; actions: ToolAction[] }

/** One gateway event in, the ToolCall events it stands for out. Anything else is passed through untouched. */
export function toolEventStep(state: ToolAdapterState, ev: { type?: string; payload?: any }): Step {
  const type = ev?.type || ''
  const p = ev?.payload || {}
  const actions: ToolAction[] = []
  let next: ToolAdapterState = state
  const take = () => {
    const seq = next.seq + 1
    next = { ...next, seq }
    return seq
  }

  if (type === 'tool.generating') {
    const tool = String(p.name || p.tool_name || 'unknown')
    const n = state.n + 1
    const id = `gen-${tool}-${n}`
    const seq = take()
    next = { ...next, n, pending: [...next.pending, { id, tool }], calls: track(next.calls, id, tool, 'pending') }
    actions.push({ type: 'call', seq, id, tool, gen: next.gen })
    return { state: next, actions }
  }

  if (type === 'tool.start') {
    const tool = String(p.tool_name || p.name || 'unknown')
    const id = String(p.tool_id || p.tool_call_id || '')
    if (!id) return { state, actions }
    const input = p.args && typeof p.args === 'object' ? p.args : undefined
    // The row this name was already waiting under: the model named the tool before the gateway had an id for it.
    const waiting = next.pending.find(c => c.tool === tool)
    if (waiting) {
      next = { ...next, pending: next.pending.filter(c => c.id !== waiting.id) }
      actions.push({ type: 'rekey', from: waiting.id, to: id })
      next = { ...next, calls: track(next.calls.filter(c => c.id !== waiting.id), id, tool, 'running') }
    } else {
      if (!next.calls.some(c => c.id === id)) {
        actions.push({ type: 'call', seq: take(), id, tool, gen: next.gen, input })
      }
      next = { ...next, calls: track(next.calls, id, tool, 'running') }
    }
    actions.push({ type: 'start', seq: take(), id, tool, input })
    return { state: next, actions }
  }

  if (type === 'tool.complete') {
    const tool = String(p.tool_name || p.name || 'unknown')
    const id = String(p.tool_id || p.tool_call_id || '')
    if (!id) return { state, actions }
    if (!next.calls.some(c => c.id === id)) {
      actions.push({ type: 'call', seq: take(), id, tool, gen: next.gen })
    }
    const failed = !!p.is_error
    const output = typeof p.result === 'string' ? p.result : p.result == null ? '' : safeJson(p.result)
    actions.push({
      type: 'result',
      seq: take(),
      id,
      status: failed ? 'error' : 'completed',
      output,
      ...(failed ? { error: output.slice(0, 400) || `The ${tool} tool failed.` } : {})
    })
    next = { ...next, calls: track(next.calls, id, tool, failed ? 'error' : 'completed') }
    return { state: next, actions }
  }

  return { state, actions }
}

/** A permission card for the call that is waiting on the person. */
export function askStep(state: ToolAdapterState, id: string, patterns: string[], message?: string): Step {
  const seq = state.seq + 1
  const next: ToolAdapterState = { ...state, seq, calls: track(state.calls, id, 'unknown', 'awaiting-permission') }
  return { state: next, actions: [{ type: 'ask', seq, id, patterns, message, gen: next.gen }] }
}

/** The person's answer, on its way back to the gateway. */
export function replyStep(state: ToolAdapterState, id: string, reply: ToolReplyAction): Step {
  const seq = state.seq + 1
  const next: ToolAdapterState = { ...state, seq, calls: track(state.calls, id, 'unknown', reply === 'reject' ? 'denied' : 'running') }
  return { state: next, actions: [{ type: 'reply', seq, id, reply, gen: next.gen }] }
}

/**
 * The turn ended: whatever is still live did not finish, so it is stopped instead of spinning forever. One `stop`
 * settles every call of the turn, and it is the same event the composer's stop button sends.
 */
export function turnEndStep(state: ToolAdapterState): Step {
  if (!state.calls.some(c => !isTerminal(c.status))) return { state, actions: [] }
  return { state, actions: [{ type: 'stop', gen: state.gen }] }
}

/**
 * The one action Glaze's reducer has no event for: the row created under a temporary id takes the gateway's id, in
 * place, so a turn never shows the same call twice.
 */
export function renameCall(state: ToolCallsState, from: string, to: string): ToolCallsState {
  if (from === to) return state
  return { ...state, calls: state.calls.map(c => (c.id === from ? { ...c, id: to } : c)) }
}

type Reducer = (state: ToolCallsState, action: ToolEvent) => ToolCallsState

/** An action in, Glaze's reducer out; `rekey` is applied here because the reducer has no such event. The reducer is
 *  passed in rather than imported so this module stays free of React: the component file it lives in pulls in hooks
 *  and Base UI. */
export function turnReducer(state: ToolCallsState, action: ToolAction, reduce: Reducer): ToolCallsState {
  return action.type === 'rekey' ? renameCall(state, action.from, action.to) : reduce(state, action)
}

/** An empty ToolCallsState, in the shape Glaze's reducer expects. */
export function emptyCalls(): ToolCallsState {
  return { calls: [], gen: 0, stopped: false, dropped: 0 }
}

/** Every call a turn holds, in arrival order. */
export function callsOf(state: ToolCallsState): ToolCallData[] {
  return state.calls
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}
