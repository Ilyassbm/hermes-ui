// Conversation: user bubbles, assistant turns (reasoning disclosure + native markdown),
// the single live activity line, approval card, failure notice, empty state.
import { MessageTextContent } from '@hermes/plugin-sdk'
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { store, answerApproval, retryLast } from '../lib/hermes'
import { useStore } from '../lib/store'
import { botLabel, botLook, hourOf, plural, shortModel, toolVerb } from '../lib/labels'
import { BotAvatar } from './BotAvatar'
import { IconArrowDown, IconCaretUp, IconCheck, IconCopy } from './icons'

export function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text || '')
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1400)
  }
  return (
    <button type="button" className="hui-copy" data-copied={copied} onClick={copy} aria-label={copied ? 'Copié' : `Copier ${label}`} title={copied ? 'Copié' : 'Copier'}>
      <IconCopy className="is-copy" width={15} height={15} />
      <IconCheck className="is-check" width={15} height={15} />
    </button>
  )
}

function useBotMeta() {
  const botName = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const bot = bots.find(b => b.name === botName)
  return { name: botName, label: botLabel(bot || botName), look: botLook(botName || 'default'), bot }
}

function seconds(ms) {
  return Math.max(1, Math.round(ms / 1000))
}

function Reasoning({ text, live, startedAt, endedAt }) {
  const [open, setOpen] = useState(false)
  const body = useRef(null)
  useLayoutEffect(() => {
    if (live && open && body.current) body.current.scrollTop = body.current.scrollHeight
  }, [text, live, open])
  if (!text && !live) return null
  const dur = startedAt && endedAt ? seconds(endedAt - startedAt) : null
  return (
    <div className="hui-reason">
      <button type="button" className="hui-reason-head" aria-expanded={open} onClick={() => setOpen(o => !o)} disabled={!text}>
        {live ? (
          <span className="hui-shimmer">Réfléchit…</span>
        ) : (
          <span>
            <span className="verb">A réfléchi</span>
            {dur ? ` ${dur} s` : ''}
          </span>
        )}
        {text ? <IconCaretUp className="hui-reason-chevron" /> : null}
      </button>
      <div className="hui-reason-body" data-open={open && Boolean(text)}>
        <div className="hui-reason-inner">
          <div ref={body} className={`hui-reason-text${live ? ' is-live' : ''}`}>{text}</div>
        </div>
      </div>
    </div>
  )
}

const AssistantTurn = memo(function AssistantTurn({ m, label, look, defaultModel }) {
  const model = shortModel(m.model || defaultModel)
  if (m.status === 'failed' && !m.text) return null
  return (
    <div className="hui-turn hui-arrive" data-from="assistant">
      <div className="hui-assistant">
        <div className="hui-assistant-head">
          <BotAvatar size={24} colors={look.colors} shape={look.shape} label={label} />
          <span className="hui-assistant-name">{label}</span>
          {model ? <span className="hui-assistant-model">· {model}</span> : null}
        </div>
        <div className="hui-assistant-body">
          {m.reasoning ? <Reasoning text={m.reasoning} live={false} startedAt={m.turnStart || m.thinkStart} endedAt={m.thinkEnd} /> : null}
          {m.text ? (
            <div className="hui-prose">
              <MessageTextContent text={m.text} />
            </div>
          ) : null}
        </div>
        {m.text ? (
          <div className="hui-actions">
            <CopyButton text={m.text} label="la réponse" />
          </div>
        ) : null}
      </div>
    </div>
  )
})

const UserTurn = memo(function UserTurn({ m }) {
  return (
    <div className="hui-turn hui-arrive" data-from="user">
      <div className="hui-user">
        {m.attachments?.length ? (
          <div className="hui-attach-chips">
            {m.attachments.map((a, i) => (
              <span key={i} className="hui-attach-chip">{a.name}</span>
            ))}
          </div>
        ) : null}
        {m.text ? <div className="hui-bubble">{m.text}</div> : null}
        <div className="hui-user-meta">
          {m.at ? <time className="hui-time">{hourOf(m.at)}</time> : null}
          <CopyButton text={m.text} label="le message" />
        </div>
      </div>
    </div>
  )
})

function Elapsed({ since }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const s = Math.floor((now - since) / 1000)
  if (s < 20) return null
  return <span className="hui-elapsed">· {s} s</span>
}

/** The single live line: "{Bot} réfléchit…" / "{Bot} travaille · lit un fichier" / "{Bot} délègue · 3 tâches". */
function LiveTurn({ label, look }) {
  const live = useStore(store, s => s.live)
  const d = useStore(store, s => {
    const last = s.messages[s.messages.length - 1]
    return last && last.role === 'assistant' && last.status === 'streaming' ? last : null
  })
  if (!live) return null
  const phase = live.phase
  let verb = null
  if (phase === 'tool' && live.toolName) verb = toolVerb(live.toolName)
  if (phase === 'delegating') verb = plural(live.subagents || 1, 'tâche', 'tâches')
  const head = phase === 'delegating' ? `${label} délègue` : phase === 'tool' ? `${label} travaille` : phase === 'writing' ? `${label} écrit` : `${label} réfléchit…`
  const writing = phase === 'writing' && d?.text
  return (
    <div className="hui-turn" data-from="assistant" aria-live="polite">
      <div className="hui-assistant">
        <div className="hui-assistant-head">
          <BotAvatar size={24} colors={look.colors} shape={look.shape} label={label} activity={writing ? 'speaking' : 'idle'} emotion={writing ? 'happy' : 'thinking'} lookAround />
          {!writing ? (
            <span className="hui-live">
              <span className="hui-shimmer">{head}</span>
              {verb ? (
                <>
                  <span className="sep">·</span>
                  <span key={verb} className="hui-live-verb">{verb}</span>
                </>
              ) : null}
              <Elapsed since={live.startedAt} />
            </span>
          ) : (
            <span className="hui-assistant-name">{label}</span>
          )}
        </div>
        <div className="hui-assistant-body">
          {d?.reasoning ? <Reasoning text={d.reasoning} live={!d.text} startedAt={d.turnStart || d.thinkStart} endedAt={d.thinkEnd} /> : null}
          {d?.text ? (
            <div className="hui-prose">
              <MessageTextContent text={d.text} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ApprovalCard() {
  const a = useStore(store, s => s.approval)
  if (!a) return null
  return (
    <div className="hui-turn" data-from="assistant">
      <div className="hui-approval" role="alertdialog" aria-label="Autorisation requise" style={{ width: '100%' }}>
        <div className="hui-approval-title"><span className="dot" />Autorisation requise</div>
        {a.description ? <div className="hui-approval-desc">{a.description}</div> : null}
        {a.command ? <pre>{a.command}</pre> : null}
        <div className="hui-approval-actions">
          <button type="button" className="hui-btn ghost" onClick={() => answerApproval('deny')}>Refuser</button>
          {a.allowPermanent ? <button type="button" className="hui-btn secondary" onClick={() => answerApproval('always')}>Toujours autoriser</button> : null}
          <button type="button" className="hui-btn primary" onClick={() => answerApproval('once')} autoFocus>Autoriser</button>
        </div>
      </div>
    </div>
  )
}

function FailNotice() {
  const error = useStore(store, s => s.error)
  const live = useStore(store, s => Boolean(s.live))
  if (!error || live) return null
  return (
    <div className="hui-fail" role="alert">
      <span className="msg">{error}</span>
      <button type="button" className="hui-btn ghost sm" onClick={() => retryLast()}>Réessayer</button>
    </div>
  )
}

function Empty({ label, look }) {
  return (
    <div className="hui-empty">
      <BotAvatar size={72} colors={look.colors} shape={look.shape} label={label} lookAround emotion="happy" />
      <h1>Que fait-on avec {label} ?</h1>
    </div>
  )
}

export function Thread() {
  const { label, look } = useBotMeta()
  const messages = useStore(store, s => s.messages)
  const loading = useStore(store, s => s.loading)
  const live = useStore(store, s => Boolean(s.live))
  const defaultModel = useStore(store, s => s.info.model)
  const scroller = useRef(null)
  const pinned = useRef(true)
  const [showJump, setShowJump] = useState(false)

  const shown = live ? messages.filter((m, i) => !(i === messages.length - 1 && m.role === 'assistant' && m.status === 'streaming')) : messages

  useLayoutEffect(() => {
    const el = scroller.current
    if (el && pinned.current) el.scrollTop = el.scrollHeight
  })

  const onScroll = () => {
    const el = scroller.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
    pinned.current = atBottom
    setShowJump(!atBottom)
  }

  if (!messages.length && !loading && !live) return <Empty label={label} look={look} />

  return (
    <>
      <div ref={scroller} className="hui-thread-scroll hui-scroll" onScroll={onScroll}>
        <div className="hui-thread">
          {loading ? <p className="hui-empty-line">Chargement de la conversation…</p> : null}
          {shown.map(m => (m.role === 'user' ? <UserTurn key={m.id} m={m} /> : <AssistantTurn key={m.id} m={m} label={label} look={look} defaultModel={defaultModel} />))}
          <LiveTurn label={label} look={look} />
          <ApprovalCard />
          <FailNotice />
        </div>
      </div>
      {showJump ? (
        <button type="button" className="hui-jump" aria-label="Revenir en bas" onClick={() => { pinned.current = true; const el = scroller.current; if (el) el.scrollTo({ top: el.scrollHeight }) }}>
          <IconArrowDown />
        </button>
      ) : null}
    </>
  )
}
