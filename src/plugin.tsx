// Hermes UI — custom chat page for Hermes Desktop and the Webapp, and the app's home.
//
// Two routes (/hui and the Glaze demo), a sidebar row, the palette commands, and the two rebindable keybinds. On top of
// the page: the native chat routes are taken over (native-takeover), the native chrome is quieted once (native-chrome),
// and "Glaze Noir" is registered and selected once (theme).
import { host, KEYBINDS_AREA, PALETTE_AREA, ROUTES_AREA, SIDEBAR_NAV_AREA } from '@hermes/plugin-sdk'
import { App } from './app/app'
import { installNativeChrome } from './app/native-chrome'
import { installTakeover, setReplaceNative } from './app/native-takeover'
import { installTheme } from './app/theme'
import { GlazeDemo } from './ui/glaze-demo/GlazeDemo'
import { bindContext, handleEvent, newConversation } from './lib/hermes'
import { toggleAside } from './app/ui-state'
import { toast } from '@/components/glaze/ui/toast'

const PATH = '/hui'
const GLAZE_PATH = '/hui/glaze'

export default {
  id: 'hermes-ui',
  name: 'Hermes UI',
  register(ctx) {
    bindContext(ctx)
    ctx.onEvent('*', ev => {
      try {
        handleEvent(ev)
      } catch (e) {
        console.warn('[hermes-ui] event', ev?.type, e)
      }
    })
    ctx.registerMany([
      { id: 'page', area: ROUTES_AREA, data: { path: PATH }, render: () => <App ctx={ctx} /> },
      // Glaze surface: its own route, no sidebar row.
      { id: 'glaze', area: ROUTES_AREA, data: { path: GLAZE_PATH }, render: () => <GlazeDemo /> },
      { id: 'nav', area: SIDEBAR_NAV_AREA, data: { path: PATH, label: 'Hermes UI', codicon: 'comment-discussion' } },
      {
        id: 'open',
        area: PALETTE_AREA,
        data: { id: 'hermes-ui.open', label: 'Ouvrir Hermes UI', keywords: ['hermes', 'ui', 'chat', 'bots'], run: () => host.navigate(PATH) }
      },
      // The takeover is a preference, so it is also a pair of rows: the current one is the one that does nothing.
      {
        id: 'native',
        area: PALETTE_AREA,
        data: {
          id: 'hermes-ui.native',
          label: "Hermes UI : utiliser l'interface native",
          keywords: ['hermes', 'ui', 'natif', 'native', 'accueil', 'home'],
          run: () => {
            setReplaceNative(ctx, false)
            toast("Interface native", { description: 'Les nouveaux chats et les sessions ouvrent les pages du bureau.' })
          }
        }
      },
      {
        id: 'everywhere',
        area: PALETTE_AREA,
        data: {
          id: 'hermes-ui.everywhere',
          label: 'Hermes UI : utiliser Hermes UI partout',
          keywords: ['hermes', 'ui', 'partout', 'accueil', 'home'],
          run: () => {
            setReplaceNative(ctx, true)
            toast('Hermes UI partout', { description: 'Les nouveaux chats et les sessions ouvrent Hermes UI.' })
          }
        }
      },
      {
        id: 'statusbar',
        area: PALETTE_AREA,
        data: {
          id: 'hermes-ui.statusbar',
          label: 'Hermes UI : barre d’état',
          keywords: ['hermes', 'ui', 'barre', 'état', 'statusbar'],
          run: () => void ctx.runAction?.('view.toggleStatusbar')
        }
      },
      {
        id: 'new',
        area: KEYBINDS_AREA,
        data: {
          id: 'hermes-ui.newConversation',
          label: 'Hermes UI : nouvelle conversation',
          category: 'view',
          defaults: ['mod+shift+o'],
          run: () => {
            host.navigate(PATH)
            newConversation()
          }
        }
      },
      {
        // The right panel's toggle: the same handler as the button in the centre, so the two cannot drift apart.
        id: 'aside',
        area: KEYBINDS_AREA,
        data: {
          id: 'hermes-ui.toggleAside',
          label: 'Hermes UI : afficher ou masquer le panneau',
          category: 'view',
          defaults: ['mod+alt+b'],
          run: () => {
            host.navigate(PATH)
            toggleAside(ctx)
          }
        }
      }
    ])

    // The rest of the app: the theme first (it needs to be registered before it can be requested), then the chrome,
    // then the takeover — its first pass waits for the gateway by itself.
    installTheme(ctx)
    installNativeChrome(ctx)
    installTakeover(ctx)
  }
}
