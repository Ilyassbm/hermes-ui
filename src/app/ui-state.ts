// The page's own view state, outside React so a keybind registered in plugin.tsx can flip it.
//
// Only what the shell owns: whether the right panel is open, whether the rail is showing on a phone, which mode the
// bot picker is in (closed, new discussion, search), and a counter that asks the header to open its model menu.
// The selection, the thread and the routines all live in src/lib/hermes.js.
import { createStore } from '@/lib/store'

/** The bot picker's two modes: a new discussion with a bot, or a search over bots and conversations. */
export type PickerMode = 'new' | 'search'

type ViewState = {
  asideOpen: boolean
  railOpen: boolean
  picker: PickerMode | null
  /** Bumped by `/model` and by the model shortcut: the header opens its menu on each new value. */
  modelMenu: number
}
type Store<T> = {
  get: () => T
  set: (patch: Partial<T> | ((state: T) => Partial<T> | null)) => void
  subscribe: (fn: () => void) => () => void
}

export const view: Store<ViewState> = createStore({ asideOpen: true, railOpen: false, picker: null, modelMenu: 0 })

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

/** Opens the bot picker in one of its modes, or closes it with `null`. */
export function openPicker(mode: PickerMode | null) {
  view.set({ picker: mode })
}

/** Asks the header to open its model menu (the `/model` command, and the shortcut once it exists). */
export function openModelMenu() {
  view.set(s => ({ modelMenu: s.modelMenu + 1 }))
}
