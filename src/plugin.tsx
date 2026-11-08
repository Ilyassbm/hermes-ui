// Hermes UI — custom chat page for Hermes Desktop and the Webapp.
// Two routes (/hui and the Glaze demo), a sidebar row, a palette command, and the two rebindable keybinds.
import { host, KEYBINDS_AREA, PALETTE_AREA, ROUTES_AREA, SIDEBAR_NAV_AREA } from '@hermes/plugin-sdk'
import { App } from './app/app'
import { GlazeDemo } from './ui/glaze-demo/GlazeDemo'
import { bindContext, handleEvent, newConversation } from './lib/hermes'
import { toggleAside } from './app/ui-state'

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
  }
}
