// The sign that a turn is still working: one line under the thread, one line in the rail, one dot on the tab.
//
// Lot 23. The store already knew a turn was live; it only showed between the send and the first token. This module is
// the part that never lets the screen go quiet:
//  - `WorkingLine` sits under the last message (never inside the bubble): a dot, the real present-tense verb the turn
//    is on ("thinking", "reads a file", "delegates 3 tasks"), three dots in a staggered fade, and the time counting from
//    `live.startedAt` — "12s", then "1m 04s". A stopped turn folds into one past line, "Worked for 12s".
//  - `WorkingStatus` is the rail's one line, in place of the bot's last output: a dot and "working · 12s".
//  - `WorkingDot` is the dot itself, on the rail's avatar and on the conversation tab.
//
// One `now` lives here, in the activity component, and ticks once a second: the thread around it does not re-render.
// The words come from `toolVerbPresent` (the same table as the folded tool rows), so a verb edited once stays one verb.
// Reduced motion is CSS's: no pulse, no dots, and a static dot with the time still counting (src/styles/working.css).
import { useEffect, useState } from 'react'
import { toolVerbPresent, workingTime } from '@/lib/labels'
import { UI } from '../strings'

export type LiveTurn = {
  phase?: string
  verb?: string
  subagents?: number
  toolName?: string
  startedAt?: number
} | null

export type WorkedTurn = { startedAt: number; endedAt: number } | null

/** What the turn is doing, in the present tense the line prints. */
export function workingPhrase(live: LiveTurn): string {
  if (!live) return ''
  if (live.phase === 'delegating') return UI.working.delegates(live.subagents || 1)
  if (live.phase === 'tool') return live.toolName ? toolVerbPresent(live.toolName) : UI.working.thinking
  if (live.phase === 'writing') return UI.working.writing
  return UI.working.thinking
}

/** The one clock: it starts on the turn's own `startedAt` and ticks to the second while `active`. */
function useLiveNow(active: boolean, startedAt?: number): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return undefined
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [active, startedAt])
  return now
}

/** The dot: ink at rest, pulsing while work runs. Reduced motion keeps it still. Hidden: the words beside it say it. */
export function WorkingDot({ className, done = false }: { className?: string; done?: boolean }) {
  return <span aria-hidden data-hui-part="working-dot" data-state={done ? 'done' : 'working'} className={className} />
}

/** Three dots in a staggered fade, the "still going" of a sentence that has not finished. Hidden from assistive tech. */
function WorkingDots() {
  return (
    <span aria-hidden className="hui-working-dots">
      <i />
      <i />
      <i />
    </span>
  )
}

/**
 * The line under the last message. `live` while the turn runs, `worked` once Stop folded it; both null draws nothing.
 * The time sits outside the polite region's words (`aria-hidden`), so a screen reader hears the verb change once, not
 * the clock every second.
 */
export function WorkingLine({ live, worked, name }: { live: LiveTurn; worked: WorkedTurn; name?: string }) {
  const active = Boolean(live)
  const now = useLiveNow(active, live?.startedAt)
  if (!live && !worked) return null
  const startedAt = live?.startedAt || worked?.startedAt || now
  const elapsed = Math.max(0, (live ? now : worked?.endedAt || now) - startedAt)
  const phrase = live ? workingPhrase(live) : UI.working.worked(workingTime(elapsed))
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={live && name ? UI.working.label(name) : undefined}
      data-hui-part="working-line"
      data-state={live ? 'working' : 'done'}
      className="hui-working"
    >
      <WorkingDot done={!live} />
      <span data-hui-part="working-verb" className={live ? 'hui-working-verb hui-shimmer' : 'hui-working-verb'}>
        {phrase}
      </span>
      {live ? (
        <>
          <WorkingDots />
          <span aria-hidden data-ui-number="" className="hui-working-time">
            {workingTime(elapsed)}
          </span>
        </>
      ) : null}
    </div>
  )
}

/**
 * The rail's line, in place of the bot's last output while it works: "working · 12s". It owns its own clock, so the
 * rail's other rows are untouched by the second.
 */
export function WorkingStatus({ live }: { live: LiveTurn }) {
  const now = useLiveNow(Boolean(live), live?.startedAt)
  if (!live) return null
  const elapsed = Math.max(0, now - (live.startedAt || now))
  return (
    <span data-hui-part="working-status" className="hui-working hui-working-inline">
      <WorkingDot />
      <span className="hui-working-verb">{UI.working.now}</span>
      <span aria-hidden className="hui-working-sep">
        ·
      </span>
      <span data-ui-number="" className="hui-working-time">
        {workingTime(elapsed)}
      </span>
    </span>
  )
}
