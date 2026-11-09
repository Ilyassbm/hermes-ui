// Hermes UI v2 — the /hui page shell.
//
// Three columns on the page surface: the rail (280px), the centre (paper, a sheet with 8px of page showing on the right
// and the bottom, starting at the top edge so its header lines up with the rail's) and the right panel (320px). No rules
// between them: the surfaces do the separating. The centre carries its own 44px header; the bot picker floats over
// everything, and `/` is the one key this page listens for when the caret is not in a field.
//
// The page is always dark, and its stylesheet is injected in a <style> on mount, scoped to .glaze: the native app's own
// Tailwind and variables are never touched.
import { useEffect, type CSSProperties } from 'react'
import { host, useValue } from '@hermes/plugin-sdk'
import { Toaster } from '@/components/glaze/ui/toast'
import { GlazePortalProvider } from '@/lib/glaze/portal'
import { boot, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
import { Aside } from './aside'
import { BotPicker } from './bot-picker'
import { Center } from './center'
import { typeSlash } from './editor'
import { useGlazeStyle } from './glaze-style'
import { Rail } from './rail'
import { loadSettings, settings } from './settings-state'
import { initView, view } from './ui-state'
import { useMediaQuery } from './use-media'

const RAIL_W = 280
const ASIDE_W = 320

/** The native session sidebar duplicates the rail: fold it once per app session, and never toggle it back from a
 *  cleanup (a layout change remounts the route, and a restore-on-unmount would ping-pong forever). */
let chromeQuieted = false
function useQuietChrome(ctx: any) {
  useEffect(() => {
    if (chromeQuieted) return undefined
    chromeQuieted = true
    const t = setTimeout(() => {
      try {
        // The core sessions rail is `chat-sidebar` (apps/desktop store/layout.ts CHAT_SIDEBAR_PANE_ID).
        const sidebar = host.paneVisibility?.('chat-sidebar')
        if (sidebar?.get?.()) void ctx.runAction('view.toggleSidebar')
      } catch {
        /* older desktop: leave the chrome alone */
      }
    }, 300)
    return () => clearTimeout(t)
  }, [ctx])
}

export function App({ ctx }: { ctx: any }) {
  useGlazeStyle()
  useQuietChrome(ctx)
  const gateway = useValue(host.state.gateway)
  const asideOpen = useStore(view, s => s.asideOpen)
  const railOpen = useStore(view, s => s.railOpen)
  const prefs = useStore(settings, s => s)
  const narrowAside = useMediaQuery('(max-width: 1099px)')
  const narrowRail = useMediaQuery('(max-width: 759px)')
  const systemLight = useMediaQuery('(prefers-color-scheme: light)')

  useEffect(() => {
    initView(ctx)
    loadSettings(ctx)
  }, [ctx])

  // The gateway opens after the first render on Desktop: boot asks at once and waits for the socket inside
  // `requestReady`, instead of requiring `gateway === 'open'` before the roster is even requested.
  useEffect(() => {
    void boot()
  }, [gateway])

  // Under 1100px the right panel is an overlay, and it starts closed: there is no room for three columns.
  useEffect(() => {
    if (narrowAside) view.set({ asideOpen: false })
  }, [narrowAside])

  // `/` outside a field puts the caret in the composer and opens the command list. Only on our own route: the Glaze
  // demo and every native page are left alone, and a key pressed inside an editor, an input or a textarea is the
  // person's text, not a shortcut.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey || event.defaultPrevented) return
      const hash = window.location.hash || ''
      if (!hash.startsWith('#/hui') || hash.startsWith('#/hui/glaze')) return
      const active = document.activeElement as HTMLElement | null
      if (active && (active.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName))) return
      event.preventDefault()
      typeSlash()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // The column widths switch without animating: the centre widens at once, and only the panel's content moves in.
  const columns = `${narrowRail ? 0 : RAIL_W}px minmax(0, 1fr) ${asideOpen && !narrowAside ? ASIDE_W : 0}px`
  // Settings ▸ Appearance, applied here: theme (System follows the OS), density, the reading measure and the motion
  // switch. The `.glaze` root owns all four, so nothing reaches the native chrome.
  const theme = prefs.theme === 'system' ? (systemLight ? 'light' : 'dark') : prefs.theme

  return (
    <div
      className="glaze absolute inset-0 bg-page text-text-1"
      data-theme={theme}
      data-density={prefs.density}
      data-motion={prefs.motion}
      style={{ '--measure': `${prefs.measure}px` } as CSSProperties}
    >
      <GlazePortalProvider>
        {/* grid-rows-1: one row that fills the frame. With an auto row the columns would size to their content and the
            paper would stop in the middle of the page, which is what lot 2 showed. */}
        <div className="grid h-full min-h-0 w-full grid-cols-(--cols) grid-rows-1" style={{ '--cols': columns } as CSSProperties}>
          <div className="flex h-full min-h-0 min-w-0 flex-col">
            {narrowRail ? null : <Rail ctx={ctx} />}
          </div>
          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <Center ctx={ctx} narrowRail={narrowRail} />
          </div>
          <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
            {!narrowAside && asideOpen ? <Aside ctx={ctx} /> : null}
          </div>
        </div>

        {/* Phone widths: the rail slides over the page from the start edge, the panel from the end edge. */}
        {narrowRail && railOpen ? (
          <>
            <div className="absolute inset-0 z-(--z-overlay) bg-scrim" onClick={() => view.set({ railOpen: false })} />
            <div
              className="absolute inset-y-0 start-0 z-(--z-overlay) w-(--rail-w) bg-page"
              data-enter="aside"
              style={{ '--rail-w': `${RAIL_W}px` } as CSSProperties}
            >
              <Rail ctx={ctx} />
            </div>
          </>
        ) : null}
        {narrowAside && asideOpen ? (
          <>
            <div className="absolute inset-0 z-(--z-overlay) bg-scrim" onClick={() => view.set({ asideOpen: false })} />
            <div
              className="absolute inset-y-0 end-0 z-(--z-overlay) w-(--aside-w) bg-page"
              data-enter="aside"
              style={{ '--aside-w': `${ASIDE_W}px` } as CSSProperties}
            >
              <Aside ctx={ctx} />
            </div>
          </>
        ) : null}

        <Toaster />
        <BotPicker ctx={ctx} />
      </GlazePortalProvider>
    </div>
  )
}
