// The bot picker: one dialog for both jobs the spec gives it — start a discussion with a bot, or search bots and the
// conversations of every bot.
//
// It is a Glaze dialog (the registry has `dialog`) with a search field at the top and two sections below: the pinned
// bots, then the team, each row numbered 1–9 so a digit picks it without moving the pointer. In search mode a third
// section lists conversations, filtered on their titles, and the sessions of every bot are loaded when it opens so the
// list is complete rather than half-empty.
//
// Lot 10: the keyboard is heard on the document, in the capture phase, not through the popup's React handler — Escape
// has to close the dialog even when the app's own window listener saw the key first, and a digit has to pick before
// it reaches the field it would be typed into. Every row's click, the digits and Enter all call `pick`: select the
// bot, create the discussion, then close. Closing first is what made the digit look dead in lot 9.
//
// Lot 11: closing that fast used to park the dialog. The entrance was a transition on the popup itself, Base UI waits
// for `getAnimations()` on the popup to settle before it unmounts, and a transition that never started never settles —
// so the node stayed at `opacity: 0` with its `fixed inset-0` scrim over the app, taking every click. The popup and the
// scrim now end on duration 0 (overlayEndsNow) and the entrance is an animation on the panel inside them; the guard
// below is the second lock, 400 ms after any close.
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
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

/**
 * Lot 11's belt, 400 ms after a close. Escape and a digit close the picker in the same breath as they open it, while
 * the entrance is still running: Base UI unmounts the popup when `getAnimations()` on it reports nothing running, a
 * transition that never started never finishes, and the dialog stayed mounted at `opacity: 0` with its scrim over the
 * app, taking every click. The stylesheet no longer puts a transition on the nodes Base UI follows (overlayEndsNow);
 * this is the second lock — a picker dialog or the scrim that came with it is still in the DOM that long after the
 * close, so the <Dialog> is remounted shut on a new key and React is what removes it. Once per close: a second
 * failure must not turn into a loop.
 */
const UNMOUNT_GUARD_MS = 400

export function BotPicker({ ctx }: { ctx: any }) {
  const mode = useStore(view, s => s.picker)
  const bots = useStore(store, s => s.bots)
  const current = useStore(store, s => s.bot)
  const sessionsByBot = useStore(store, s => s.sessionsByBot)
  const open = mode !== null

  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const listRef = useRef<HTMLDivElement | null>(null)
  /** One pick per open: the dialog's listener and a stray second key must not both act. */
  const busy = useRef(false)
  /** The unmount guard's key: bumping it remounts the <Dialog> shut, which is how a stuck node is removed. */
  const [mountKey, setMountKey] = useState(0)
  /** One forced remount per close: a guard that fires again would only loop. */
  const guardRan = useRef(false)

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
    busy.current = false
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

  /**
   * Marks the scrim this dialog brought, so the guard below can tell it from another overlay's: Base UI renders the
   * backdrop as the popup's sibling, inside the same portal.
   */
  useEffect(() => {
    if (!open) return
    const popup = document.querySelector('.hui-picker')
    popup?.parentElement?.querySelector('[data-slot="dialog-overlay"]')?.setAttribute('data-picker-scrim', '')
  }, [open, mountKey])

  /**
   * The guard itself, armed by the picker being closed whatever closed it — Escape, a digit, a row, a click on the
   * backdrop (which reaches us as `onOpenChange(false)`, so `open` going false is the one signal every way out
   * shares). 400 ms later, a picker dialog, an open dialog, or the scrim it came with is still in the DOM: nothing
   * legitimate is mounted then, so the <Dialog> is remounted shut and React removes the node.
   */
  useEffect(() => {
    if (open) {
      guardRan.current = false
      return
    }
    const timer = window.setTimeout(() => {
      if (guardRan.current) return
      const stuck =
        document.querySelector('[data-slot="dialog-content"][data-open]') ||
        document.querySelector('[data-slot="dialog-content"].hui-picker') ||
        document.querySelector('[data-picker-scrim]')
      if (!stuck) return
      guardRan.current = true
      setMountKey(key => key + 1)
    }, UNMOUNT_GUARD_MS)
    return () => window.clearTimeout(timer)
  }, [open])

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

  /**
   * The one door: a row's click, Enter on the active row and a digit all come through here. Select the bot, create
   * the discussion, then close — the picker is still up while the selection lands, so no `selectBot` running behind
   * it can put the old bot back.
   */
  const pick = (choice: Choices | undefined) => {
    if (!choice || busy.current) return
    busy.current = true
    if (choice.kind === 'conv') {
      void selectBot(choice.bot, { keepConversation: true })
        .catch(() => undefined)
        .then(() => {
          openPicker(null)
          void openConversation(choice.id)
        })
      return
    }
    void selectBot(choice.name)
      .catch(() => undefined)
      .then(() => {
        // The roster moved under us and the bot is gone: close on the conversation the person already had.
        if (store.get().bot === choice.name) newConversation()
        openPicker(null)
        focusEditor()
      })
  }

  /** The dialog's keys, kept in a ref so the one document listener always sees the current list. */
  const keyHandler = useRef<(event: KeyboardEvent) => void>(() => {})

  keyHandler.current = event => {
    if (!open) return
    // Escape closes, whatever the field holds: the dialog is a choice, not a form to fill.
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      openPicker(null)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setIndex(i => (choices.length ? (i + step + choices.length) % choices.length : 0))
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      pick(choices[Math.min(index, Math.max(0, choices.length - 1))])
      return
    }
    // A digit picks the n-th bot outright, but only on an empty field: in a search it is a character.
    if (!query && !event.metaKey && !event.ctrlKey && !event.altKey && /^[1-9]$/.test(event.key)) {
      const row = botRows.find(candidate => candidate.digit === Number(event.key))
      if (!row) return
      event.preventDefault()
      pick(row)
    }
  }

  // Capture phase on the document: the key is seen before the field it would land in, and before anything the app
  // listens for on the way down. Escape stops there so no outer handler acts on it as well.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => keyHandler.current(event)
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open])

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
        onClick={() => pick(row)}
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
    // The key is the guard's: a close that leaves the dialog or its scrim in the DOM bumps it, and React unmounts this
    // whole tree (dialog, portal, scrim) before mounting it shut again.
    <Fragment key={mountKey}>
      <Dialog open={open} onOpenChange={next => { if (!next) openPicker(null) }}>
        <DialogContent className="hui-picker" showCloseButton={false}>
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
                  onClick={() => pick(row)}
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
    </Fragment>
  )
}
