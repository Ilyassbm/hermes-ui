// Hermes UI v2 — the /hui page shell.
//
// Three columns on the page surface: the rail (272px), the centre (paper, a sheet with 8px of page showing on top, right
// and bottom) and the right panel (320px). No rules between them: the surfaces do the separating. No header band either:
// the bot's name floats in a pill over the thread, and the panel's toggle is the only control the centre keeps.
//
// The page is always dark, and its stylesheet is injected in a <style> on mount, scoped to .glaze: the native app's own
// Tailwind and variables are never touched.
import { useEffect, type CSSProperties } from 'react'
import { host, useValue } from '@hermes/plugin-sdk'
import { Toaster } from '@/components/glaze/ui/toast'
import { GlazePortalProvider } from '@/lib/glaze/portal'
import { boot, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
import css from '../styles/.compiled.css'
import { Aside } from './aside'
import { Center } from './center'
import { Rail } from './rail'
import { initView, view } from './ui-state'
import { useMediaQuery } from './use-media'

const STYLE_ID = 'hermes-ui-glaze'
const RAIL_W = 272
const ASIDE_W = 320

/** The compiled Glaze sheet, in one <style> of its own. Every rule in it is scoped to .glaze by the build. */
function useGlazeStyle() {
  useEffect(() => {
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
    if (!el) {
      el = document.createElement('style')
      el.id = STYLE_ID
      document.head.appendChild(el)
    }
    el.textContent = css
    return () => {
      el?.remove()
    }
  }, [])
}

/** The native session sidebar duplicates the rail: fold it once per app session, and never toggle it back from a
 *  cleanup (a layout change remounts the route, and a restore-on-unmount would ping-pong forever). */
let chromeQuieted = false
function useQuietChrome(ctx: any) {
  useEffect(() => {
    if (chromeQuieted) return undefined
    chromeQuieted = true
    const t = setTimeout(() => {
      try {
        const sidebar = host.paneVisibility?.('sessions')
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
  const narrowAside = useMediaQuery('(max-width: 1099px)')
  const narrowRail = useMediaQuery('(max-width: 759px)')

  useEffect(() => {
    initView(ctx)
  }, [ctx])

  useEffect(() => {
    if (gateway === 'open') void boot()
  }, [gateway])

  // Under 1100px the right panel is an overlay, and it starts closed: there is no room for three columns.
  useEffect(() => {
    if (narrowAside) view.set({ asideOpen: false })
  }, [narrowAside])

  // The column widths switch without animating: the centre widens at once, and only the panel's content moves in.
  const columns = `${narrowRail ? 0 : RAIL_W}px minmax(0, 1fr) ${asideOpen && !narrowAside ? ASIDE_W : 0}px`

  return (
    <div className="glaze absolute inset-0 bg-page text-text-1" data-theme="dark">
      <GlazePortalProvider>
        <div className="grid h-full min-h-0 w-full grid-cols-(--cols)" style={{ '--cols': columns } as CSSProperties}>
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
      </GlazePortalProvider>
    </div>
  )
}
