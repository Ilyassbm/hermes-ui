// The composer's handle, reachable from outside the thread: the `/` shortcut, the bot picker and the model menu all
// put the caret back in the editor after they act, and the composer itself is mounted under the centre.
import type { PromptInputHandle } from '@/components/glaze/ai/prompt-input'

type Handle = { current: PromptInputHandle | null }

let bound: Handle | null = null

/** Called once by the centre with its ref; the same object for the life of the page. */
export function bindEditor(ref: Handle | null) {
  bound = ref
}

/** Puts the cursor in the editor. Safe before the composer mounts: it does nothing. */
export function focusEditor() {
  bound?.current?.focus()
}

/** The `/` shortcut: focus, type the slash, and open the command list over it. */
export function typeSlash() {
  const input = bound?.current
  if (!input) return
  input.focus()
  input.insert('/')
  input.openCommands()
}

/** Puts a command's prefill into the editor, at the caret, and leaves the cursor after it. */
export function insertInEditor(text: string) {
  const input = bound?.current
  if (!input) return
  input.focus()
  input.insert(text)
}
