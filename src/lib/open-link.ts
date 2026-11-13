// The host's own way out of the page, for every address a response carries (1.5.4).
//
// The bug: `[site](https://example.com)` in a bot's answer looked dead in the desktop app. The app's router is a hash
// router, so an `<a href>` the window follows either leaves the app or does nothing — and a scheme the parser used to
// pass through (`javascript:`, `file:`) would have run right there in the page. So:
//
//   - http(s) and mailto are the only addresses that are links at all (`isOpenableLink`);
//   - the click is taken from the page (`followLink`: `preventDefault()` + `stopPropagation()`, so the bubble under the
//     link never sees it) and the address leaves through the SDK's OS door, `ctx.os.openExternal(url)`;
//   - the door's `Promise<boolean>` is not awaited: a click is a click, not a piece of page state, and the answer only
//     says whether the OS took it;
//   - the Webapp, and an SDK older than the door, get `window.open(url, '_blank', 'noopener,noreferrer')`.
//
// The door is bound once, from the plugin's `register(ctx)` — `bindContext` in `lib/hermes.js` hands it here too. This
// module imports nothing, so a component can use it without pulling the app's store in behind it.
export type OsDoor = {
  os?: { openExternal?: (url: string) => Promise<boolean> | boolean } | null
} | null

let door: OsDoor['os'] = null

/** What `register(ctx)` hands over: the context's `os` slice, or nothing at all (the Webapp, an older SDK). */
export function bindOsDoor(ctx: OsDoor) {
  door = ctx?.os ?? null
}

/** http(s) and mailto: what an OS can be asked for, and the only schemes a response may offer as a link. */
const OPENABLE = /^(?:https?:\/\/|mailto:)/i

/** Whether this address is a link at all. `javascript:`, `file:`, `data:` and a relative path are not. */
export function isOpenableLink(url: unknown): boolean {
  return OPENABLE.test(String(url ?? '').trim())
}

/**
 * The address, handed to the OS. `true` when some door took it — the SDK's, or the window's own `open` — and `false`
 * when the address is not one this page may open.
 */
export function openLink(url: unknown): boolean {
  const target = String(url ?? '').trim()
  if (!isOpenableLink(target)) return false
  const open = door?.openExternal
  if (typeof open === 'function') {
    try {
      void Promise.resolve(open.call(door, target)).catch(() => {})
    } catch {
      /* The door threw: the address is the host's business, and the click was still taken from the page. */
    }
    return true
  }
  const win = typeof window === 'undefined' ? null : window
  if (win && typeof win.open === 'function') {
    win.open(target, '_blank', 'noopener,noreferrer')
    return true
  }
  return false
}

/**
 * A response's anchor click. The window never follows the href (it would leave the app or do nothing), and the click
 * never reaches the bubble the link sits in: a link inside a message is not a press on the message.
 */
export function followLink(event: { preventDefault?: () => void; stopPropagation?: () => void } | null | undefined, url: unknown): boolean {
  event?.preventDefault?.()
  event?.stopPropagation?.()
  return openLink(url)
}
