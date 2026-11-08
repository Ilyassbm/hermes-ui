// ESM stand-in for `use-sync-external-store/shim/with-selector`.
//
// The npm build is CommonJS and reaches `react` through `require`, which the desktop loader cannot run (see
// use-sync-external-store-shim.ts). This is the same hook, written in ESM on top of React 19's own
// `useSyncExternalStore`: it memoises the selection per snapshot and reuses the previous value while `isEqual` says the
// selection did not change, so a store update that leaves the selected slice equal never re-renders the caller.
import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'

const is = Object.is

type GetSnapshot<T> = () => T

/**
 * `useSyncExternalStore` with a selector, as `use-sync-external-store/shim/with-selector` exposes it.
 *
 * `selector` maps the store's snapshot to the value the component wants; `isEqual` decides whether a freshly selected
 * value still counts as the rendered one. Both are read through `useMemo`, so changing either rebuilds the selection.
 */
export function useSyncExternalStoreWithSelector<S, T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: GetSnapshot<S>,
  getServerSnapshot: GetSnapshot<S> | undefined,
  selector: (snapshot: S) => T,
  isEqual?: (a: T, b: T) => boolean
): T {
  // What the component last rendered, so a fresh selection equal to it can keep the old reference (and downstream
  // memoisation along with it).
  const instRef = useRef<{ hasValue: boolean; value: T | null } | null>(null)
  let inst = instRef.current
  if (inst === null) {
    inst = { hasValue: false, value: null }
    instRef.current = inst
  }
  const rendered = inst

  const [getSelection, getServerSelection] = useMemo(() => {
    let hasMemo = false
    let memoizedSnapshot: S
    let memoizedSelection: T

    const memoizedSelector = (nextSnapshot: S): T => {
      if (!hasMemo) {
        hasMemo = true
        memoizedSnapshot = nextSnapshot
        const nextSelection = selector(nextSnapshot)
        // The rendered value may already be this one: reuse it rather than hand back a new reference.
        if (isEqual !== undefined && rendered.hasValue) {
          const currentSelection = rendered.value as T
          if (isEqual(currentSelection, nextSelection)) {
            memoizedSelection = currentSelection
            return currentSelection
          }
        }
        memoizedSelection = nextSelection
        return nextSelection
      }
      const prevSnapshot = memoizedSnapshot
      const prevSelection = memoizedSelection
      // Same snapshot: the selection cannot have changed.
      if (is(prevSnapshot, nextSnapshot)) return prevSelection
      const nextSelection = selector(nextSnapshot)
      if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
        // Keep the old snapshot too: the next call with this same snapshot must answer the same way.
        return prevSelection
      }
      memoizedSnapshot = nextSnapshot
      memoizedSelection = nextSelection
      return nextSelection
    }

    const getSnapshotWithSelector = () => memoizedSelector(getSnapshot())
    const getServerSnapshotWithSelector =
      getServerSnapshot === undefined ? undefined : () => memoizedSelector(getServerSnapshot())
    return [getSnapshotWithSelector, getServerSnapshotWithSelector] as const
  }, [getSnapshot, getServerSnapshot, selector, isEqual, rendered])

  const value = useSyncExternalStore(subscribe, getSelection, getServerSelection)
  useEffect(() => {
    rendered.hasValue = true
    rendered.value = value
  }, [rendered, value])
  return value
}
