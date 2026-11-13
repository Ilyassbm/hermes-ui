// The bot's question, in the thread that asked it.
//
// The gateway's `clarify.request` carries a question, the choices it offers, whether several may be checked, and how
// long it waits (`timeout_s`). The card is the approval card's family — the same Glaze Button, the same flat block in
// the thread, the question above the answers — because the two are the same moment: a turn stopped, waiting on a
// person.
//
// The state lives in the store (`clarifyBySession`), not here: a question asked in a conversation that was not on
// screen is still there when the person comes back to it, and the card is only ever the first of its session's list.
// `answerClarify` does the one send; the gateway's own `clarify.settled` is what takes the card away.
import { useEffect, useState } from 'react'
import { Button } from '@/components/glaze/ui/button'
import { Input } from '@/components/glaze/ui/input'
import { answerClarify, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
import { UI } from '../strings'

/** How often the countdown re-reads the clock: twice a second, so the last second is never shown a second late. */
const TICK_MS = 500

/** The first question of the open conversation, or null. */
const pendingOf = (state: any) => {
  const list = state.sid ? state.clarifyBySession?.[state.sid] : null
  return Array.isArray(list) && list.length ? list[0] : null
}

export function ClarifyCard() {
  const asked = useStore(store, pendingOf)
  const promptId = asked?.promptId || ''
  // A new question starts with nothing chosen and nothing typed: the card keeps no state across prompts.
  const [picked, setPicked] = useState<string[]>([])
  const [typed, setTyped] = useState('')
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    setPicked([])
    setTyped('')
    setNow(Date.now())
  }, [promptId])

  const timeoutS = asked?.timeoutS || 0
  useEffect(() => {
    if (!timeoutS) return undefined
    const timer = setInterval(() => setNow(Date.now()), TICK_MS)
    return () => clearInterval(timer)
  }, [timeoutS, promptId])

  if (!asked) return null

  const left = timeoutS ? Math.max(0, Math.ceil((asked.at + timeoutS * 1000 - now) / 1000)) : null
  const expired = left === 0
  // While the answer is out, and once it went, the card takes no second one: one prompt, one answer.
  const locked = Boolean(asked.sending || asked.done || expired)
  const multi = Boolean(asked.multiSelect)
  // A question with no choices is answered in words; a `multi_select` one takes several choices and still lets the
  // person type one of their own.
  const freeText = !asked.choices.length || multi

  const send = (answer: string) => {
    if (locked) return
    void answerClarify(answer)
  }

  const toggle = (choice: string) => {
    if (locked) return
    setPicked(current => (current.includes(choice) ? current.filter(value => value !== choice) : [...current, choice]))
  }

  /** The checked choices, and the typed one when there is one: the JSON array the native clarify decodes. */
  const chosen = () => (typed.trim() ? [...picked, typed.trim()] : picked)

  const note = asked.error || (asked.done ? UI.clarify.youSaid(asked.sent) : asked.sending ? UI.clarify.answered : '')

  return (
    <section
      className="mt-2 flex flex-col gap-3 rounded-panel border border-line-faint bg-paper p-3"
      data-hui-part="clarify"
      data-prompt-id={asked.promptId}
      aria-label={UI.clarify.label}
      aria-busy={asked.sending || undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="type-label text-text-1">{asked.question}</p>
        {left === null ? null : (
          <span className="shrink-0 type-caption tabular-nums text-text-3" data-ui-number="">
            {expired ? UI.clarify.expired : UI.clarify.remaining(left)}
          </span>
        )}
      </div>

      {asked.choices.length ? (
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={UI.clarify.label}>
          {asked.choices.map((choice, index) => (
            <Button
              key={`${choice}-${index}`}
              size="sm"
              // The checked ones read as the answer they are; the rest stay flat beside them.
              variant={multi && picked.includes(choice) ? 'confirm' : 'secondary'}
              disabled={locked}
              data-clarify-choice={choice}
              {...(multi ? { 'aria-pressed': picked.includes(choice) } : {})}
              onClick={() => (multi ? toggle(choice) : send(choice))}
            >
              {choice}
            </Button>
          ))}
        </div>
      ) : null}

      {freeText ? (
        <div className="flex items-end gap-2">
          <Input
            size="sm"
            value={typed}
            placeholder={UI.clarify.other}
            aria-label={UI.clarify.other}
            disabled={locked}
            onChange={event => setTyped(event.target.value)}
            onKeyDown={event => {
              if (event.key !== 'Enter' || event.shiftKey) return
              event.preventDefault()
              send(multi ? JSON.stringify(chosen()) : typed.trim())
            }}
          />
          <Button
            size="sm"
            variant="confirm"
            disabled={locked || !(typed.trim() || picked.length)}
            onClick={() => send(multi ? JSON.stringify(chosen()) : typed.trim())}
          >
            {UI.clarify.send}
          </Button>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-2">
        <p className="type-caption text-text-3" data-hui-part="clarify-note">
          {note}
        </p>
        {/* An empty answer is "skipped", the gateway's own word for it. */}
        <Button size="sm" variant="ghost" disabled={locked} onClick={() => send('')}>
          {UI.clarify.skip}
        </Button>
      </div>
    </section>
  )
}
