// The bot picker: one dialog for both jobs the spec gives it — start a discussion with a bot, or search bots and the
// conversations of every bot.
//
// It is a Glaze dialog (the registry has `dialog`) with a search field at the top and two sections below: the pinned
// bots, then the team, each row numbered 1–9 so a digit picks it without moving the pointer. In search mode a third
// section lists conversations, filtered on their titles, and the sessions of every bot are loaded when it opens so the
// list is complete rather than half-empty.
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Icon, Search } from '@/components/glaze/icon'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/glaze/ui/dialog'
import { Input } from '@/components/glaze/ui/input'
import { Kbd } from '@/components/glaze/ui/kbd'
import { loadSessions, newConversation, openConversation, selectBot, store } from '@/lib/hermes'
import { botLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { BotAvatar } from './bot-avatar'
import { focusEditor } from './editor'
import { botIdentity, botRole, sinceLabel } from './format'
import { openPicker, view } from './ui-state'

type BotChoice = {
  kind: 'bot'
  key: string
  name: string
  label: string
  role: string
  identity: ReturnType<typeof botIdentity>
  digit?: number
}

type ConvChoice = { kind: 'conv'; key: string; bot: string; botName: string; id: string; title: string; at: number }

type Choices = BotChoice | ConvChoice

const DEFAULT_PINNED = ['default']

export function BotPicker({ ctx }: { ctx: any }) {
  const mode = useStore(view, s => s.picker)
  const bots = useStore(store, s => s.bots)
  const current = useStore(store, s => s.bot)
  const sessionsByBot = useStore(store, s => s.sessionsByBot)
  const open = mode !== null

  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const listRef = useRef<HTMLDivElement | null>(null)

  // A stored pin list, the same one the rail writes.
  const pinned = useMemo<string[]>(() => {
    try {
      const value = ctx?.storage?.get('pinned', DEFAULT_PINNED)
      return Array.isArray(value) && value.length ? value : DEFAULT_PINNED
    } catch {
      return DEFAULT_PINNED
    }
  }, [ctx, open])

  // Opening clears the field, and search mode fills the conversation lists of every bot it can reach.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setIndex(0)
    if (mode !== 'search') return
    for (const bot of bots) {
      if (!sessionsByBot[bot.name]) void loadSessions(bot.name)
    }
    // Only on open: a session refresh must not restart the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode])

  const needle = query.trim().toLowerCase()

  /** The pinned bots, then the team, numbered 1–9 straight through: two sections, one count. */
  const { pinnedRows, teamRows } = useMemo(() => {
    const byName = new Map(bots.map(b => [b.name, b]))
    const head = pinned.map(name => byName.get(name)).filter(Boolean) as typeof bots
    const tail = bots.filter(bot => !pinned.includes(bot.name))
    const shown = (bot: (typeof bots)[number], digit: number): BotChoice => ({
      kind: 'bot',
      key: `bot:${bot.name}`,
      name: bot.name,
      label: botLabel(bot),
      role: botRole(bot.name, bot.description),
      identity: botIdentity(bot.name),
      digit: digit <= 9 ? digit : undefined
    })
    const keep = (row: BotChoice) => !needle || `${row.label} ${row.role}`.toLowerCase().includes(needle)
    const pinnedList = head.map((bot, i) => shown(bot, i + 1))
    const teamList = tail.map((bot, i) => shown(bot, head.length + i + 1))
    // A search shows one list: the sections only frame the whole roster.
    if (needle) return { pinnedRows: [...pinnedList, ...teamList].filter(keep), teamRows: [] as BotChoice[] }
    return { pinnedRows: pinnedList, teamRows: teamList.filter(keep) }
  }, [bots, pinned, needle])

  const botRows: BotChoice[] = [...pinnedRows, ...teamRows]

  const convRows: ConvChoice[] = useMemo(() => {
    if (mode !== 'search') return []
    const rows: ConvChoice[] = []
    for (const bot of bots) {
      for (const session of sessionsByBot[bot.name] || []) {
        const title = String(session.title || 'Conversation')
        if (needle && !title.toLowerCase().includes(needle)) continue
        rows.push({
          kind: 'conv',
          key: `conv:${session.id}`,
          bot: bot.name,
          botName: botLabel(bot),
          id: session.id,
          title,
          at: session.at
        })
      }
    }
    return rows.sort((a, b) => (b.kind === 'conv' ? b.at : 0) - (a.kind === 'conv' ? a.at : 0)).slice(0, 40)
  }, [bots, sessionsByBot, mode, needle])

  const choices: Choices[] = [...botRows, ...convRows]

  // Keep the active row in view as the arrows move.
  useEffect(() => {
    const row = listRef.current?.querySelector<HTMLElement>(`[data-choice-index="${index}"]`)
    row?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const choose = (choice: Choices | undefined) => {
    if (!choice) return
    openPicker(null)
    if (choice.kind === 'bot') {
      void selectBot(choice.name).then(() => {
        newConversation()
        focusEditor()
      })
      return
    }
    void selectBot(choice.bot, { keepConversation: true }).then(() => openConversation(choice.id))
  }

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIndex(i => (choices.length ? (i + 1) % choices.length : 0))
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIndex(i => (choices.length ? (i - 1 + choices.length) % choices.length : 0))
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      choose(choices[Math.min(index, Math.max(0, choices.length - 1))])
      return
    }
    // A digit picks the n-th bot outright, but only on an empty field: in a search it is a character.
    if (/^[1-9]$/.test(event.key) && !query) {
      const digit = Number(event.key)
      const row = botRows.find(candidate => candidate.digit === digit)
      if (row) {
        event.preventDefault()
        choose(row)
      }
    }
  }

  /** One bot row: avatar, name, role, and the digit that picks it. */
  const botRow = (row: BotChoice) => {
    const at = choices.findIndex(candidate => candidate.key === row.key)
    return (
      <div
        key={row.key}
        role="option"
        aria-selected={row.name === current && !needle}
        data-active={at === index}
        data-choice-index={at}
        className="hui-picker-row"
        onMouseEnter={() => setIndex(at)}
        onClick={() => choose(row)}
      >
        <BotAvatar size={24} colors={row.identity.colors} shape={row.identity.shape} label={row.label} hoverGiggle={false} />
        <span className="hui-picker-text">
          <span className="hui-picker-name">{row.label}</span>
          {row.role ? <span className="hui-picker-detail">{row.role}</span> : null}
        </span>
        {row.digit ? <Kbd>{String(row.digit)}</Kbd> : null}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={next => { if (!next) openPicker(null) }}>
      <DialogContent className="hui-picker" showCloseButton={false} onKeyDown={onKeyDown}>
        <DialogTitle className="hui-sr">
          {mode === 'search' ? 'Rechercher un bot ou une conversation' : 'Nouvelle discussion avec un bot'}
        </DialogTitle>
        <DialogDescription className="hui-sr">
          Choisis un bot pour commencer une discussion, ou une conversation pour l’ouvrir.
        </DialogDescription>

        <div className="hui-picker-form">
          <Input
            mode="search"
            autoFocus
            value={query}
            placeholder={mode === 'search' ? 'Rechercher un bot ou une conversation' : 'Nouvelle discussion avec…'}
            aria-label={mode === 'search' ? 'Rechercher un bot ou une conversation' : 'Nouvelle discussion avec…'}
            onChange={e => {
              setQuery(e.target.value)
              setIndex(0)
            }}
          />
        </div>

        <div ref={listRef} className="hui-picker-list" role="listbox" aria-label="Bots et conversations">
          {pinnedRows.length ? <p className="hui-picker-section">{needle ? 'Bots' : 'Épinglés'}</p> : null}
          {pinnedRows.map(botRow)}
          {teamRows.length ? <p className="hui-picker-section">Équipe</p> : null}
          {teamRows.map(botRow)}

          {convRows.length ? <p className="hui-picker-section">Conversations</p> : null}
          {convRows.map(row => {
            const at = choices.findIndex(candidate => candidate.key === row.key)
            return (
              <div
                key={row.key}
                role="option"
                aria-selected={false}
                data-active={at === index}
                data-choice-index={at}
                className="hui-picker-row"
                onMouseEnter={() => setIndex(at)}
                onClick={() => choose(row)}
              >
                <Icon icon={Search} size={14} />
                <span className="hui-picker-text">
                  <span className="hui-picker-name">{row.title}</span>
                  <span className="hui-picker-detail">{row.botName}</span>
                </span>
                <span className="hui-picker-time">{sinceLabel(row.at)}</span>
              </div>
            )
          })}

          {!choices.length ? <p className="hui-picker-empty">Aucun résultat</p> : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
