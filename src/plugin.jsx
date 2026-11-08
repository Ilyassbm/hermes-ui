// Hermes UI — custom chat page for Hermes Desktop and the Webapp.
// One route (/hui) + a sidebar row + palette command + a rebindable "new conversation" keybind.
import { host, KEYBINDS_AREA, PALETTE_AREA, ROUTES_AREA, SIDEBAR_NAV_AREA } from '@hermes/plugin-sdk'
import { App } from './ui/App'
import { GlazeDemo } from './ui/glaze-demo/GlazeDemo'
import { bindContext, handleEvent, newConversation } from './lib/hermes'

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
      // Glaze surface: its own route, no sidebar row. The v1 page above stays untouched until lot 2 migrates it.
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
      }
    ])
  }
}
