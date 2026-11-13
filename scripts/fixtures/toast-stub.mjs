// Test double for `@/components/glaze/ui/toast`, used only by the checks in scripts/ (check-takeover).
//
// The takeover announces one sentence — "Conversation not found" — and the question the check answers is *whether it
// was said at all*, on a launch pass or on a click. This stub records every call on `globalThis.__toasts` and renders
// nothing, so no DOM is needed and no React tree is mounted.
export function toast(message, options) {
  const list = globalThis.__toasts || (globalThis.__toasts = [])
  list.push({ message, options })
  return 'toast-check'
}

/** The mounted host the page renders; nothing to draw here. */
export function Toaster() {
  return null
}
