// Left column: brand, new conversation, bots, conversations of the selected bot, usage, gear menu.
import { useEffect, useRef, useState } from 'react'
import { store, selectBot, newConversation, openConversation, loadUsage } from '../lib/hermes'
import { useStore } from '../lib/store'
import { botLabel, botLook, convGroup, CONV_GROUPS, resetIn } from '../lib/labels'
import { BotAvatar } from './BotAvatar'
import { IconGear, IconPencil, IconGrid, IconPlug, IconChat, IconClock, IconSliders, IconFile } from './icons'

function BotRow({ bot, selected, busy }) {
  const look = botLook(bot.name)
  return (
    <button type="button" className="hui-row" aria-current={selected ? 'page' : undefined} onClick={() => selectBot(bot.name)}>
      <BotAvatar size={20} colors={look.colors} shape={look.shape} label={botLabel(bot)} activity={busy ? 'speaking' : 'idle'} emotion={busy ? 'thinking' : 'neutral'} hoverGiggle={false} />
      <span className="hui-row-label">{botLabel(bot)}</span>
      {busy ? <span className="hui-pip" data-tone="busy" aria-label="En train de travailler" /> : null}
    </button>
  )
}

function Conversations() {
  const bot = useStore(store, s => s.bot)
  const rows = useStore(store, s => (s.bot ? s.sessionsByBot[s.bot] : undefined))
  const storedId = useStore(store, s => s.storedId)
  if (!bot) return null
  if (!rows) return <p className="hui-empty-line">Chargement…</p>
  if (!rows.length) return <p className="hui-empty-line">Aucune conversation pour l'instant.</p>
  const groups = CONV_GROUPS.map(label => ({ label, rows: rows.filter(r => convGroup(r.at) === label) })).filter(g => g.rows.length)
  return groups.map(g => (
    <div key={g.label}>
      <p className="hui-section">{g.label}</p>
      <div className="hui-list">
        {g.rows.slice(0, 40).map(r => (
          <button key={r.id} type="button" className="hui-row is-conv" aria-current={r.id === storedId ? 'page' : undefined} onClick={() => openConversation(r.id)} title={r.title}>
            <span className="hui-row-label">{r.title}</span>
          </button>
        ))}
      </div>
    </div>
  ))
}

function tone(v) {
  if (v >= 95) return 'fail'
  if (v >= 80) return 'warn'
  return 'accent'
}

function Usage() {
  const usage = useStore(store, s => s.usage)
  useEffect(() => {
    const t = setInterval(() => loadUsage(), 120000)
    return () => clearInterval(t)
  }, [])
  if (usage === 'off') return null
  const providers = Array.isArray(usage) ? usage : [{ id: 'claude', label: 'Claude', windows: [] }, { id: 'opencode_go', label: 'OpenCode Go', windows: [] }]
  return (
    <button type="button" className="hui-usage" onClick={() => loadUsage(true)} title="Usage des abonnements — cliquer pour rafraîchir">
      {providers.map(p => {
        const session = p.windows?.find(w => w.id === 'session')
        const week = p.windows?.find(w => w.id === 'week' || w.id === 'weekly')
        const pct = session ? Math.round(session.used) : null
        return (
          <span key={p.id} className="hui-usage-row">
            <span className="hui-usage-head">
              <span className="hui-usage-name">{p.label}</span>
              {pct === null ? (
                <span className="hui-usage-val is-off">{usage === null ? '…' : 'Non connecté'}</span>
              ) : (
                <span className="hui-usage-val">{pct} %</span>
              )}
            </span>
            <span className="hui-track" aria-hidden="true">
              <span className="hui-fill" data-tone={pct === null ? 'empty' : tone(pct)} style={{ '--pct': pct === null ? 0 : Math.min(100, pct) / 100 }} />
            </span>
            {pct !== null ? (
              <span className="hui-usage-sub">
                <span>5 h{session?.resetsAt ? ` · ${resetIn(session.resetsAt)}` : ''}</span>
                {week ? <span>Semaine {Math.round(week.used)} %</span> : null}
              </span>
            ) : null}
          </span>
        )
      })}
    </button>
  )
}

function GearMenu({ ctx }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const onDown = e => { if (!wrap.current?.contains(e.target)) setOpen(false) }
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  const go = action => {
    setOpen(false)
    void ctx.runAction(action)
  }
  return (
    <div ref={wrap} style={{ position: 'relative' }}>
      <button type="button" className="hui-icon-btn" aria-label="Réglages et pages" aria-haspopup="menu" aria-expanded={open} aria-pressed={open} onClick={() => setOpen(o => !o)}>
        <IconGear />
      </button>
      {open ? (
        <div className="hui-menu" role="menu">
          <button type="button" role="menuitem" onClick={() => go('nav.settings')}><IconSliders />Réglages<kbd>⌘,</kbd></button>
          <button type="button" role="menuitem" onClick={() => go('nav.capabilities')}><IconGrid />Capabilities</button>
          <button type="button" role="menuitem" onClick={() => go('nav.messaging')}><IconChat />Messaging</button>
          <button type="button" role="menuitem" onClick={() => go('nav.artifacts')}><IconFile />Artifacts</button>
          <button type="button" role="menuitem" onClick={() => go('nav.cron')}><IconClock />Tâches planifiées</button>
          <hr />
          <button type="button" role="menuitem" onClick={() => go('nav.agents')}><IconPlug />Agents et connexions</button>
          <button type="button" role="menuitem" onClick={() => go('keybinds.openPanel')}><IconSliders />Raccourcis<kbd>⌘/</kbd></button>
        </div>
      ) : null}
    </div>
  )
}

export function Rail({ ctx }) {
  const bots = useStore(store, s => s.bots)
  const bot = useStore(store, s => s.bot)
  const busy = useStore(store, s => Boolean(s.live))
  const gatewayOk = useStore(store, s => s.ready)
  return (
    <nav className="hui-rail" aria-label="Bots et conversations">
      <div className="hui-brand">
        <span className="hui-brand-mark" aria-hidden="true" />
        <span className="hui-brand-name">Hermes</span>
      </div>
      <button type="button" className="hui-new" onClick={() => newConversation()}>
        <IconPencil />
        <span>Nouvelle conversation</span>
        <kbd>⇧⌘O</kbd>
      </button>
      <div className="hui-rail-scroll hui-scroll">
        <p className="hui-section">Bots</p>
        <div className="hui-list">
          {bots.map(b => (
            <BotRow key={b.name} bot={b} selected={b.name === bot} busy={busy && b.name === bot} />
          ))}
        </div>
        <Conversations />
      </div>
      <div className="hui-foot">
        <Usage />
        <div className="hui-foot-bar">
          <span className="hui-engine">
            <span className="hui-pip" data-tone={gatewayOk ? 'ok' : 'warn'} />
            {gatewayOk ? 'Moteur connecté' : 'Connexion…'}
          </span>
          <GearMenu ctx={ctx} />
        </div>
      </div>
    </nav>
  )
}
