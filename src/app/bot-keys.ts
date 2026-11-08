// Alt+1…Alt+9, from anywhere — including the composer.
//
// The keybinds are registered as ordinary contributions (plugin.tsx), and they fire everywhere the app's dispatcher
// looks. One place it does not look is an editable target: `actionAllowedInInput` only lets a chord through there when
// it carries mod/ctrl, when the action is on the app's own INPUT_SAFE_ACTIONS list, or when the action declares
// `editableTargetPolicy: 'modified'` — and `allKeybindActions()` copies only id/category/defaults/label out of a
// contributed action, so that flag never reaches `keybindAction()` for a plugin's action. Without a listener of our
// own, Alt+1 would work with the focus on the rail and be swallowed with the caret in the composer, which is where
// someone presses it.
//
// So: one window listener, bubble phase, that does nothing when the app has already handled the press
// (`defaultPrevented` — the dispatcher calls preventDefault before running an action). It also stays out of the
// terminal, where Alt+digit is the shell's own escape sequence.
import { host } from '@hermes/plugin-sdk'
import { goToBot } from './bot-order'
import { openPicker, view } from './ui-state'

/** The physical key, not `event.key`: on a Mac Alt+1 types `¡`, and the app resolves combos through `event.code` too. */
const DIGIT_CODES = /^(?:Digit|Numpad)([1-9])$/

/**
 * Installs the listener and returns its remover. `path` is the page the bot rows live on (the plugin's `/hui`).
 */
export function installBotKeys(ctx: any, path: string): () => void {
  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.defaultPrevented || event.isComposing || event.repeat) return
    const match = DIGIT_CODES.exec(event.code || '')
    if (!match) return
    const target = event.target as HTMLElement | null
    // A terminal keeps Alt+digit for readline and the shells that read it.
    if (target?.closest?.('[data-interactive-terminal]')) return
    event.preventDefault()
    // The picker is modal: going to a bot from under it would leave a dialog over a conversation nobody chose.
    if (view.get().picker) openPicker(null)
    host.navigate(path)
    goToBot(ctx, Number(match[1]))
  }

  window.addEventListener('keydown', onKeyDown)
  return () => window.removeEventListener('keydown', onKeyDown)
}
