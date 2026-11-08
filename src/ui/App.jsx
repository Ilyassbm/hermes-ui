// Page root: scoped stylesheet, theme follow, native chrome handling, three-column layout.
import { host, useTheme, useValue } from '@hermes/plugin-sdk'
import { useEffect, useState } from 'react'
import css from '../styles.css'
import { boot, store } from '../lib/hermes'
import { useStore } from '../lib/store'
import { botLabel, botLook, shortModel } from '../lib/labels'
import { Rail } from './Rail'
import { Thread } from './Thread'
import { Composer } from './Composer'
import { Aside } from './Aside'
import { BotAvatar } from './BotAvatar'
import { IconPanelRight } from './icons'

const STYLE_ID = 'hermes-ui-style'

function useScopedStyle() {
  useEffect(() => {
    let el = document.getElementById(STYLE_ID)
    if (!el) {
      el = document.createElement('style')
      el.id = STYLE_ID
      document.head.appendChild(el)
    }
    el.textContent = css
    return () => el.remove()
  }, [])
}

/** The native session sidebar duplicates our rail: fold it ONCE per app session when the page
 *  first opens. Never toggled back from a cleanup — a layout change can remount the route, and a
 *  restore-on-unmount would ping-pong forever. The user can bring it back with its shortcut. */
let chromeQuieted = false
function useQuietChrome(ctx) {
  useEffect(() => {
    if (chromeQuieted) return
    chromeQuieted = true
    const t = setTimeout(() => {
      try {
        const sidebar = host.paneVisibility?.('sessions')
        if (sidebar?.get?.()) void ctx.runAction('view.toggleSidebar')
      } catch {
        /* older desktop: leave chrome alone */
      }
    }, 300)
    return () => clearTimeout(t)
  }, [ctx])
}

function Header({ asideOpen, onToggleAside }) {
  const botName = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const title = useStore(store, s => s.info.title)
  const sessionModel = useStore(store, s => s.info.model)
  const storedId = useStore(store, s => s.storedId)
  const rows = useStore(store, s => (s.bot ? s.sessionsByBot[s.bot] : undefined))
  const bot = bots.find(b => b.name === botName)
  const look = botLook(botName || 'default')
  const convTitle = title || rows?.find(r => r.id === storedId)?.title || (storedId ? 'Conversation' : 'Nouvelle conversation')
  const model = sessionModel || bot?.model
  return (
    <header className="hui-head">
      <BotAvatar size={22} colors={look.colors} shape={look.shape} label={botLabel(bot || botName)} />
      <div className="hui-head-title">
        <span className="hui-head-bot">{botLabel(bot || botName)}</span>
        <span className="hui-head-conv">{convTitle}</span>
      </div>
      {model ? <span className="hui-chip">{shortModel(model)}</span> : null}
      <button type="button" className="hui-icon-btn" aria-label={asideOpen ? 'Masquer le panneau' : 'Afficher le panneau'} aria-pressed={asideOpen} onClick={onToggleAside} title="Routines et fichiers">
        <IconPanelRight />
      </button>
    </header>
  )
}

export function App({ ctx }) {
  useScopedStyle()
  useQuietChrome(ctx)
  const { resolvedMode } = useTheme()
  const gateway = useValue(host.state.gateway)
  const [asideOpen, setAsideOpen] = useState(() => ctx.storage.get('asideOpen', true))
  const ready = useStore(store, s => s.ready)

  useEffect(() => {
    if (gateway === 'open') void boot()
  }, [gateway])

  const toggleAside = () => {
    setAsideOpen(v => {
      ctx.storage.set('asideOpen', !v)
      return !v
    })
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 0 }}>
      <div className="hui" data-theme={resolvedMode === 'light' ? 'light' : 'dark'} data-aside={asideOpen ? 'open' : 'closed'}>
        <Rail ctx={ctx} />
        <main className="hui-card">
          <Header asideOpen={asideOpen} onToggleAside={toggleAside} />
          {ready ? <Thread /> : <div className="hui-empty"><p>Connexion à Hermes…</p></div>}
          <Composer />
        </main>
        <Aside ctx={ctx} />
      </div>
    </div>
  )
}
