// What happens when a send starts with `/`: the page's own few commands run here, everything else is asked of the
// gateway, and whatever comes back is written in the thread as a system note (or turned into the next prompt).
//
// The gateway answers `slash.exec` with `{type:'exec'|'send'|'skill'|…}`; when it does not know the command at all the
// call throws, and `command.dispatch` is the fallback that resolves plugin commands, quick commands and aliases. Both
// are read here, so a command typed in this composer behaves like one typed in the native one.
import { host } from '@hermes/plugin-sdk'
import { addNote, ensureSession, newConversation, send, stop, store } from '@/lib/hermes'
import { classifyInput } from '@/lib/slash'
import { focusEditor, insertInEditor } from './editor'
import { openModelMenu } from './ui-state'

/** A turn is running: a command would race it. */
const BUSY = 'Arrête la réponse en cours avant de lancer une commande.'

const reason = (e: any) => String(e?.message || e || 'commande indisponible')

/**
 * Handles one composer value if it is a command.
 * @returns true when the value was a command (and must not be sent as a prompt).
 */
export function runCommand(text: string): boolean {
  const verdict = classifyInput(text)
  if (verdict.kind === 'prompt') return false

  const live = Boolean(store.get().live)
  const isStop = verdict.kind === 'client' && verdict.name === 'stop'
  if (live && !isStop) {
    addNote(BUSY)
    return true
  }

  if (verdict.kind === 'client') {
    if (verdict.name === 'new' || verdict.name === 'clear') {
      newConversation()
      focusEditor()
    } else if (verdict.name === 'model') {
      openModelMenu()
    } else if (verdict.name === 'stop') {
      void stop()
    }
    return true
  }

  void execSlash(verdict.name, verdict.arg)
  return true
}

/** `slash.exec` first, `command.dispatch` when the gateway refuses it, as the spec's fallback. */
async function execSlash(name: string, arg: string): Promise<void> {
  let sid = ''
  try {
    sid = await ensureSession()
  } catch (e) {
    addNote(`/${name} : ${reason(e)}`)
    return
  }
  try {
    const res = await host.request('slash.exec', { session_id: sid, command: arg ? `${name} ${arg}` : name })
    if (!handleResult(res)) {
      const text = res?.output || res?.warning || ''
      if (text) addNote(text)
    }
    return
  } catch {
    /* not a command this gateway runs directly: try the dispatcher */
  }
  try {
    const res = await host.request('command.dispatch', { session_id: sid, name, arg: arg || '' })
    if (!handleResult(res)) addNote(`/${name} : commande inconnue`)
  } catch (e) {
    addNote(`/${name} : ${reason(e)}`)
  }
}

/**
 * One answer from the gateway, read by its `type`.
 * @returns true when it did something with it.
 */
function handleResult(res: any): boolean {
  const type = res?.type
  if (type === 'send' || type === 'skill') {
    if (res?.notice) addNote(res.notice)
    if (res?.message) void send(res.message)
    return true
  }
  if (type === 'prefill') {
    if (res?.message) insertInEditor(res.message)
    return true
  }
  if (type === 'alias') {
    const target = String(res?.target || res?.name || '').replace(/^\//, '')
    if (target) void execSlash(target, String(res?.arg || ''))
    return true
  }
  return false
}
