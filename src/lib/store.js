// Tiny external store: one object, shallow-merge updates, selector hooks.
import { useSyncExternalStore } from 'react'

export function createStore(initial) {
  let state = initial
  const subs = new Set()
  return {
    get: () => state,
    set(patch) {
      const next = typeof patch === 'function' ? patch(state) : patch
      if (!next) return
      state = { ...state, ...next }
      subs.forEach(fn => fn())
    },
    subscribe(fn) {
      subs.add(fn)
      return () => subs.delete(fn)
    }
  }
}

/** Select a slice. The selector must return a primitive or a stable reference. */
export function useStore(store, select) {
  return useSyncExternalStore(store.subscribe, () => select(store.get()), () => select(store.get()))
}
