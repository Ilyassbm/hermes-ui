// The native chrome, quieted once: Hermes UI is the home, so the app opens without its status bar.
//
// The sidebar is folded by `useQuietChrome` in app.tsx, on the page's first mount (the app's own pane visibility call,
// kept as it was). The status bar is the other half, and it belongs here rather than on the page: it must be down from
// the first frame of the launch, not from the first visit to /hui.
//
// One toggle per installation (`ctx.storage.chromeSetupV2`), then never again: the user keeps the last word, and the
// README says how to bring the bar back (⌘⇧S, or ⌘K → "Show status bar").
import { host } from '@hermes/plugin-sdk'

const FLAG = 'chromeSetupV2'

export function installNativeChrome(ctx: any): void {
  try {
    if (ctx?.storage?.get(FLAG, false)) return
  } catch {
    return
  }

  const once = () => {
    try {
      if (ctx?.storage?.get(FLAG, false)) return
    } catch {
      return
    }
    try {
      // The bar is shown by default, so one toggle hides it. Refused (older host) → we still mark it done: a bar the
      // user hid by hand must not come back on the next launch because we kept retrying.
      const result = ctx.runAction?.('view.toggleStatusbar')
      if (result && result.ok === false) console.warn('[hermes-ui] status bar toggle refused:', result.error)
    } catch (e) {
      console.warn('[hermes-ui] status bar toggle failed', e)
    }
    try {
      ctx?.storage?.set(FLAG, true)
    } catch {
      /* no storage: the attempt stands for this session */
    }
  }

  // The action needs a mounted shell; one tick after the app reports its gateway is where it can take it.
  if (host.state.gateway.get() === 'open') {
    ctx.setTimeout(once, 0)
    return
  }
  const off = host.state.gateway.listen(state => {
    if (state !== 'open') return
    off()
    ctx.setTimeout(once, 0)
  })
  ctx.onDispose?.(() => off())
}
