// Hermes UI — custom chat page for Hermes Desktop and the Webapp, and the app's home.
//
// Two routes (/hui and the Glaze demo), a sidebar row, the palette commands, and the lot-6 keybinds: a new discussion
// with any bot, a search over bots and conversations, and one key per bot. On top of the page: the native chat routes
// are taken over (native-takeover), the native chrome is quieted once (native-chrome), and "Glaze Noir" is registered
// and selected once (theme).
//
// Lot 10: the per-bot keys moved to Alt+1…Alt+9. They were ⌘⌥1…⌘⌥9, which the app already spends on its own
// `profile.switch.10..18` defaults (apps/desktop/src/lib/keybinds/actions.ts, comboForSlot) — and since
// `allKeybindActions()` lists the built-ins before the contributed ones, `$comboIndex` handed the chord to the profile
// switch (store/keybinds.ts, "The first action runs"). Alt+digit is free in the app: its Alt chords are letters and
// brackets (alt+n, alt+t, alt+w, alt+], alt+[).
import { host, KEYBINDS_AREA, PALETTE_AREA, ROUTES_AREA, SIDEBAR_NAV_AREA } from '@hermes/plugin-sdk'
import { App } from './app/app'
import { installNativeChrome } from './app/native-chrome'
import { installTakeover, setReplaceNative } from './app/native-takeover'
import { installTheme } from './app/theme'
import { goToBot } from './app/bot-order'
import { GlazeDemo } from './ui/glaze-demo/GlazeDemo'
import { bindContext, handleEvent, newConversation } from './lib/hermes'
import { openPicker, toggleAside } from './app/ui-state'
import { installBotKeys } from './app/bot-keys'
import { toast } from '@/components/glaze/ui/toast'
import { UI } from './app/strings'

const PATH = '/hui'
const GLAZE_PATH = '/hui/glaze'

/** The plugin's context, for the keybind handlers registered as plain data below. */
let ctxRef: any = null

/** One keybind per bot, 1 through 9: the n-th row of the rail, pinned first. */
const BOT_KEYBINDS = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1
  return {
    id: `bot${n}`,
    area: KEYBINDS_AREA,
    data: {
      id: `hermes-ui.bot${n}`,
      label: UI.plugin.goToBot(n),
      category: 'session',
      // Alt+digit, not ⌘⌥+digit: the app spends ⌘⌥1…⌘⌥9 on profile.switch.10..18, and the built-ins come first in
      // `$comboIndex`, so those chords switched profile instead of bot. `editableTargetPolicy: 'modified'` is what
      // lets a non-Shift modifier (Alt) still fire from the composer, as the app's own Alt defaults do.
      defaults: [`alt+${n}`],
      editableTargetPolicy: 'modified',
      run: () => {
        host.navigate(PATH)
        goToBot(ctxRef, n)
      }
    }
  }
})

export default {
  id: 'hermes-ui',
  name: 'Hermes UI',
  register(ctx) {
    ctxRef = ctx
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
        data: { id: 'hermes-ui.open', label: UI.plugin.open, keywords: ['hermes', 'ui', 'chat', 'bots'], run: () => host.navigate(PATH) }
      },
      // The takeover is a preference, so it is also a pair of rows: the current one is the one that does nothing.
      {
        id: 'native',
        area: PALETTE_AREA,
        data: {
          id: 'hermes-ui.native',
          label: UI.plugin.useNative,
          keywords: ['hermes', 'ui', 'native', 'home'],
          run: () => {
            setReplaceNative(ctx, false)
            toast(UI.rail.useNativeTitle, { description: UI.rail.useNativeBody })
          }
        }
      },
      {
        id: 'everywhere',
        area: PALETTE_AREA,
        data: {
          id: 'hermes-ui.everywhere',
          label: UI.plugin.everywhere,
          keywords: ['hermes', 'ui', 'everywhere', 'home'],
          run: () => {
            setReplaceNative(ctx, true)
            toast(UI.plugin.everywhereToast, { description: UI.plugin.everywhereBody })
          }
        }
      },
      {
        id: 'statusbar',
        area: PALETTE_AREA,
        data: {
          id: 'hermes-ui.statusbar',
          label: UI.plugin.statusbar,
          keywords: ['hermes', 'ui', 'statusbar'],
          run: () => void ctx.runAction?.('view.toggleStatusbar')
        }
      },
      {
        id: 'new',
        area: KEYBINDS_AREA,
        data: {
          id: 'hermes-ui.newConversation',
          label: UI.plugin.newConversation,
          category: 'session',
          defaults: ['mod+shift+o'],
          run: () => {
            host.navigate(PATH)
            newConversation()
          }
        }
      },
      {
        // The picker, in its "new discussion" mode: any bot, then a fresh conversation with it.
        id: 'newWithBot',
        area: KEYBINDS_AREA,
        data: {
          id: 'hermes-ui.newChatWithBot',
          label: UI.plugin.newWithBot,
          category: 'session',
          defaults: ['mod+alt+n'],
          run: () => {
            host.navigate(PATH)
            openPicker('new')
          }
        }
      },
      {
        // The picker again, in search mode: bots and the conversations of every bot.
        id: 'search',
        area: KEYBINDS_AREA,
        data: {
          id: 'hermes-ui.search',
          label: UI.plugin.search,
          category: 'session',
          defaults: ['mod+alt+k'],
          run: () => {
            host.navigate(PATH)
            openPicker('search')
          }
        }
      },
      ...BOT_KEYBINDS,
      {
        // The right panel's toggle: the same handler as the button in the header, so the two cannot drift apart.
        id: 'aside',
        area: KEYBINDS_AREA,
        data: {
          id: 'hermes-ui.toggleAside',
          label: UI.plugin.toggleAside,
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
    // then the takeover — its first pass waits for the gateway by itself. The bot keys' own listener goes with them:
    // the app's dispatcher skips a contributed action inside the composer (see src/app/bot-keys.ts).
    installBotKeys(ctx, PATH)
    installTheme(ctx)
    installNativeChrome(ctx)
    installTakeover(ctx)
  }
}
