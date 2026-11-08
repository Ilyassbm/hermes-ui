// The page's own view state, outside React so a keybind registered in plugin.tsx can flip it.
//
// Only what the shell owns: whether the right panel is open and whether the rail is showing on a phone. The selection,
// the thread and the routines all live in src/lib/hermes.js.
import { createStore } from '@/lib/store'

type ViewState = { asideOpen: boolean; railOpen: boolean }
type Store<T> = {
  get: () => T
  set: (patch: Partial<T> | ((state: T) => Partial<T> | null)) => void
  subscribe: (fn: () => void) => () => void
}

export const view: Store<ViewState> = createStore({ asideOpen: true, railOpen: false })

/** Reads the persisted panel state once, when the page mounts. */
export function initView(ctx: any) {
  let open = true
  try {
    open = ctx?.storage?.get('asideOpen', true) !== false
  } catch {
    /* no storage yet: the default stands */
  }
  view.set({ asideOpen: open })
}

/** Opens or closes the right panel, and remembers the choice for the next mount. */
export function toggleAside(ctx?: any) {
  const open = !view.get().asideOpen
  view.set({ asideOpen: open })
  try {
    ctx?.storage?.set('asideOpen', open)
  } catch {
    /* the panel still toggles for this session */
  }
}
