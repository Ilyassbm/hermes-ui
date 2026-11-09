// The reasoning, drawn the way aicss draws it: one line per sentence in a pane that grows with the thought up to
// 180px and then follows the newest line, soft 16px fades at both edges, and a fold into "Thought for Ns" when the
// thinking ends — the header's chevron turns, the panel's grid row goes 1fr → 0fr on 320ms — with a click to read it
// again. The block opens by itself while the reasoning streams and folds when the answer starts.
//
// The words are the turn's own reasoning (`message.reasoning`, the `reasoning.delta` text collected in
// `src/lib/hermes.js`), cut into sentences by `./sentences`, never composed here. The cadence is the stream's, with one
// line revealed at a time so a chunk of several sentences still reads as phrases and not as a block; the last line is
// always the real text so far. A stopped turn reads "Stopped before thinking" and a turn that never timed its thought
// reads "Thought for a moment", both from `UI.turn.reasoning`.
//
// Geometry, from aicss's ThinkingReasoning and the spec: a line is 40px (two 20px lines), 4px apart; the pane stops at
// 180px and scrolls; the fades are 16px; the fold is 320ms on cubic-bezier(.22, 1, .36, 1). The numbers live in
// `src/styles/thinking.css` and in the constants below, which is the one place JS needs them (the pane's height and
// the fades are inline styles, because they depend on how many lines arrived).
//
// Reduced motion (the OS preference, or Settings ▸ Appearance ▸ Motion): no reveal beat, no rotation, no animated
// growth — every line is there at once, at its height.
import { useId, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { useStore } from '@/lib/store'
import { settings } from '../settings-state'
import { sentences } from './sentences'

/** Two 20px lines. aicss's SENT_H, and the clamp in thinking.css. */
const LINE_H = 40
/** aicss's GAP, and the stream's gap in thinking.css. */
const GAP = 4
/** aicss's MAX_H: past this the pane scrolls. */
const MAX_H = 180
/** aicss's FADE: the height of each soft edge, once the pane is capped. */
const FADE = 16
/** aicss's per-sentence beat (700–900ms there, for a demo). Ours only spaces out a burst: the stream sets the real pace. */
const REVEAL_MS = 120

type ThinkingLabels = {
  /** The header while the reasoning streams: "Thinking…". */
  thinking: string
  /** The folded header, from the time spent: the turn passes "12s" or "a moment" through it. */
  thoughtFor: (time: string) => string
  /** The time when it took under a second, or no duration was measured. */
  moment: string
  /** The folded header when the turn ended before any reasoning arrived. */
  stoppedEarly: string
}

type ThinkingProps = {
  /** The turn: what the remembered open state is keyed by, for this page. */
  id: string
  /** The reasoning the turn collected, as it arrived. */
  text: string
  /** The reasoning is still arriving: the block is open and follows its end. */
  streaming: boolean
  /** Seconds the thought took, measured by the turn (thinkStart → thinkEnd); no fake clock. */
  duration?: number
  labels: ThinkingLabels
  className?: string
}

/** Open states already decided, so a turn re-renders or the page switches back and the block stays as it was left. */
const remembered = new Map<string, boolean>()

/** 12s, 1m 04s. It rounds to the second before it splits, so 59.6s reads 1m 00s, never 60s or 1m 60s. */
function thoughtTime(duration: number | undefined, moment: string) {
  if (duration === undefined || !Number.isFinite(duration) || duration < 1) return moment
  const s = Math.round(duration)
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`
}

/** True when the OS asks every motion to stop; Settings ▸ Appearance adds its own switch. */
function osReduced() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

/** Enter and Space on the div that acts as the header's button, as the rail's rows answer them. */
const press = (run: () => void) => (event: { key: string; preventDefault: () => void }) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    run()
  }
}

/**
 * How many lines are on screen. It starts at what arrived and walks to the newest one at a time, so a delta of three
 * sentences still reads as three lines appearing; ending the thought shows everything at once. Reduced motion skips
 * the beat entirely.
 */
function useRevealed(total: number, live: boolean) {
  const [shown, setShown] = useState(total)
  useEffect(() => {
    if (!live || shown >= total) return
    const timer = setTimeout(() => setShown(n => Math.min(n + 1, total)), REVEAL_MS)
    return () => clearTimeout(timer)
  }, [live, shown, total])
  return live ? Math.min(shown, total) : total
}

/**
 * Open while the reasoning streams, fold when it ends unless the person pinned it open, and remember what they chose.
 */
function useFolded(id: string, streaming: boolean) {
  const [open, setOpen] = useState(() => streaming || remembered.get(id) === true)
  const was = useRef(streaming)
  useEffect(() => {
    if (streaming) setOpen(true)
    // The thought resumes after a tool call: it opens again. It ends: it folds, unless it was left open on purpose.
    else if (was.current) setOpen(remembered.get(id) === true)
    was.current = streaming
  }, [streaming, id])
  const toggle = () => setOpen(prev => {
    remembered.set(id, !prev)
    return !prev
  })
  return [open, toggle] as const
}

export function Thinking({ id, text, streaming, duration, labels, className }: ThinkingProps) {
  // The text only grows, so the split is remade when it does — not on a scroll or a fade change.
  const lines = useMemo(() => sentences(text), [text])
  const [open, toggle] = useFolded(id, streaming)
  const motion = useStore(settings, s => s.motion)
  const still = motion === 'reduced' || osReduced()
  const revealed = useRevealed(lines.length, streaming && !still)
  const viewport = useRef<HTMLDivElement>(null)
  const contentId = useId()
  // Which soft edges show. While the thought streams and the pane is capped, both do; opened by hand, they follow the
  // scroll position, as aicss has them follow its own.
  const [fade, setFade] = useState({ top: false, bottom: true })

  const done = !streaming
  const expanded = done ? open : true
  const count = Math.min(revealed, lines.length)
  const contentH = count > 0 ? count * LINE_H + (count - 1) * GAP : 0
  const capped = contentH > MAX_H
  const viewH = capped ? MAX_H : contentH
  const scrollable = done && expanded
  // While the pane is capped and not yet handed to the person, the stream is pinned to its last line.
  const translate = scrollable || !capped ? 0 : MAX_H - FADE - contentH
  const showTop = scrollable ? fade.top : capped
  const showBottom = scrollable ? fade.bottom : capped
  // The mask's opaque stop is black because a mask reads alpha, not colour: no theme token belongs here.
  const mask = capped
    ? `linear-gradient(to bottom, transparent 0, black ${showTop ? FADE : 0}px, black calc(100% - ${showBottom ? FADE : 0}px), transparent 100%)`
    : 'none'

  const onScroll = () => {
    const el = viewport.current
    if (!el) return
    setFade({
      top: el.scrollTop > 1,
      bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 1,
    })
  }

  const onClick = () => {
    if (!done) return
    // Opening reads from the first line, as aicss does; the fades start at the top of the text.
    if (!open) {
      setFade({ top: false, bottom: true })
      if (viewport.current) viewport.current.scrollTop = 0
    }
    toggle()
  }

  const said = streaming
    ? labels.thinking
    : count === 0
      ? labels.stoppedEarly
      : labels.thoughtFor(thoughtTime(duration, labels.moment))

  const head = <>
    <span data-hui-part="thinking-label" className={streaming ? 'hui-think-label hui-shimmer' : 'hui-think-label'}>{said}</span>
    {done && (
      <svg data-hui-part="thinking-chevron" className="hui-think-chevron" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path d="m4.5 15.75 7.5-7.5 7.5 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </>

  return (
    <div
      className={className ? `hui-think ${className}` : 'hui-think'}
      data-hui-part="thinking"
      data-state={streaming ? 'streaming' : 'done'}
    >
      {done ? (
        <div
          role="button"
          tabIndex={0}
          data-hui-part="thinking-head"
          className="hui-think-head is-clickable"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={onClick}
          onKeyDown={press(onClick)}
        >{head}</div>
      ) : (
        <div data-hui-part="thinking-head" className="hui-think-head" aria-busy="true">{head}</div>
      )}

      <div
        id={contentId}
        data-hui-part="thinking-body"
        className="hui-think-body"
        data-open={expanded ? 'true' : 'false'}
        aria-hidden={expanded ? undefined : 'true'}
        inert={expanded ? undefined : true}
      >
        <div className="hui-think-inner">
          <div
            ref={viewport}
            data-hui-part="thinking-viewport"
            data-scroll={scrollable && capped ? 'true' : undefined}
            className="hui-think-viewport"
            style={{ '--hui-think-h': `${viewH}px`, '--hui-think-mask': mask, '--hui-think-y': `${translate}px` } as CSSProperties}
            onScroll={scrollable ? onScroll : undefined}
          >
            <div data-hui-part="thinking-stream" className="hui-think-stream">
              {lines.slice(0, count).map((line, i) => (
                <p key={i} data-hui-part="thinking-line" className="hui-think-line" title={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
