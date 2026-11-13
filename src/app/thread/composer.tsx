// The composer: one Glaze PromptInput on a single surface — 44 high, the editor in the row and the round keys inline —
// as wide as the thread's reading measure and 16px off the sheet's bottom edge.
//
// The model reads as small print at the row's end (its name and the effort, 13px), and it opens the same menu /model
// does; lot 8 took away the box, the mark and the caret the reference does not draw. The row's last key is the
// microphone while the field is empty and the send key with the first word — one round action, as in the reference.
// What the composer adds is the `/` list, fed by the gateway's `complete.slash` 120ms after the last keystroke; a
// picked command becomes a chip, and a prompt that starts with `/` is run as a command instead of being sent
// (src/app/slash-run.ts). The send key follows the settings page (Enter, or ⌘/Ctrl+Enter).
import { useEffect, useRef, useState, type RefObject } from 'react'
import { host } from '@hermes/plugin-sdk'
import { PromptInput, type Attachment, type CommandItem, type MicState, type PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { send, stop, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
import { TooltipProvider } from '@/components/glaze/ui/tooltip'
import { ModelMenu } from '../model-menu'
import { settings } from '../settings-state'
import { runCommand } from '../slash-run'
import { UI } from '../strings'

type Picked = { id: string; file: File; name: string; size: number }

type ComposerProps = {
  bot: string | null
  name: string
  input: RefObject<PromptInputHandle | null>
  /** The open conversation: its id is what moves the caret when another one opens. */
  sid?: string | null
  status: 'ready' | 'submitted' | 'streaming'
  generation?: string | number
  /** Runs once the prompt is handed to the gateway, so the thread can go back to its end. */
  onSent?: () => void
}

/** The slash list's window: the gateway is asked once the typing pauses, not on every key. */
const COMMAND_DEBOUNCE = 120

/** The browser's dictation, when it has one: Chromium and Safari ship it, the desktop's runtime may not. */
type Speech = {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: any) => void) | null
  onend: (() => void) | null
  onerror: ((event: any) => void) | null
}

function speechCtor(): (new () => Speech) | null {
  const scope = typeof window === 'undefined' ? ({} as any) : (window as any)
  return scope.SpeechRecognition || scope.webkitSpeechRecognition || null
}

export function Composer({ bot, name, input, sid, status, generation, onSent }: ComposerProps) {
  const [files, setFiles] = useState<Picked[]>([])
  const [commands, setCommands] = useState<CommandItem[]>([])
  // Stop's one failure, said quietly under the box: the turn is still live, so the line keeps counting.
  const [stopNote, setStopNote] = useState('')
  // The draft, only to know whether the row shows the mic or the send key: the editor itself stays uncontrolled.
  const [draft, setDraft] = useState('')
  const [mic, setMic] = useState<MicState>(() => (speechCtor() ? 'idle' : 'unsupported'))
  const listening = useRef<Speech | null>(null)
  const asked = useRef<ReturnType<typeof setTimeout> | null>(null)
  const submitKey = useStore(settings, s => s.sendKey)

  // Nothing to send yet: the mic's place, as in the reference. A file alone is something to send, and a turn on its
  // way keeps the Stop key whatever the field holds.
  const idle = !draft.trim() && files.length === 0 && status !== 'submitted' && status !== 'streaming'

  /** Voice input, as the composer's own action: the browser transcribes, each finished sentence lands at the caret. */
  const listen = (on: boolean) => {
    const Ctor = speechCtor()
    if (!Ctor) {
      setMic('unsupported')
      return
    }
    if (!on) {
      try {
        listening.current?.stop()
      } catch {
        /* already closed */
      }
      return
    }
    const speech = new Ctor()
    speech.continuous = true
    speech.interimResults = false
    speech.lang = (typeof navigator !== 'undefined' && navigator.language) || 'en-US'
    speech.onresult = (event: any) => {
      let said = ''
      for (let i = event?.resultIndex ?? 0; i < (event?.results?.length ?? 0); i += 1) {
        if (event.results[i]?.isFinal) said += String(event.results[i][0]?.transcript || '')
      }
      if (said.trim()) input.current?.insert(`${said.trim()} `)
    }
    speech.onend = () => {
      listening.current = null
      setMic('idle')
    }
    speech.onerror = (event: any) => {
      listening.current = null
      setMic(event?.error === 'unsupported' ? 'unsupported' : event?.error === 'not-allowed' ? 'denied' : 'idle')
    }
    listening.current = speech
    try {
      speech.start()
      setMic('listening')
    } catch {
      listening.current = null
      setMic('idle')
    }
  }

  // A closed composer never keeps the microphone open.
  useEffect(
    () => () => {
      try {
        listening.current?.abort()
      } catch {
        /* already closed */
      }
    },
    []
  )

  // The caret belongs in the editor when the conversation changes, and when the bot does.
  useEffect(() => {
    input.current?.focus()
  }, [bot, sid, input])

  /** One RPC, one list: `complete.slash` answers `{items:[{text, display, meta}]}`, the menu wants a label and a hint. */
  const complete = (text: string) => {
    if (asked.current) clearTimeout(asked.current)
    asked.current = setTimeout(() => {
      const session = store.get().sid
      void host
        .request('complete.slash', { ...(session ? { session_id: session } : {}), text })
        .then((res: any) => {
          const items = Array.isArray(res?.items) ? res.items : []
          setCommands(
            items
              .map((item: any) => {
                const text = String(item?.text || '').trim()
                const label = text.replace(/^\//, '')
                const tidy = (v: unknown) => String(v || '').replace(/\s+/g, ' ').trim()
                // `display` is often the command again ("/new" under "/new"): a hint that repeats the label says nothing,
                // so the gateway's `meta` is used instead, and no second line at all when neither adds a word.
                const echo = (v: string) => !v || v === text || v === label || v === `/${label}`
                const display = tidy(item?.display)
                const meta = tidy(item?.meta)
                return { id: text, label, description: !echo(display) ? display : !echo(meta) ? meta : '' }
              })
              .filter((item: CommandItem) => Boolean(item.label))
          )
        })
        .catch(() => setCommands([]))
    }, COMMAND_DEBOUNCE)
  }

  // The catalogue is fetched once at mount with a bare `/`, and again when the bot changes: `complete.slash` resolves
  // skills and plugin commands against the calling profile's home, so another bot can offer another list. The first
  // slash a person types then opens the list at once instead of waiting for the round trip.
  useEffect(() => {
    complete('/')
    return () => {
      if (asked.current) clearTimeout(asked.current)
    }
    // Mount and bot changes: `complete` is rebuilt every render and only reads `asked`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bot])

  const attachments: Attachment[] = files.map(f => ({ id: f.id, name: f.name, size: f.size, status: 'done' }))

  return (
    <div className="hui-composer px-4 pb-4" data-idle={idle || undefined}>
      <div className="mx-auto w-full max-w-measure">
        {/* The composer's icon-only actions read out through tooltips (the mic, and the paperclip's own provider). */}
        <TooltipProvider>
          <PromptInput
            ref={input}
            label={UI.composer.label(name)}
            placeholder={UI.composer.placeholder(name)}
            // One draft per thread: a draft written in one conversation is never carried into another.
            draftKey={`hermes-ui-${bot || 'default'}-${sid || 'new'}`}
            status={status}
            generation={generation}
            submitKey={submitKey}
            // The toolbar's left side: the model picker, before the paperclip (toolsFirst puts it there in the DOM too).
            tools={<ModelMenu />}
            // Voice input takes the send key's place while the field is empty, as in the reference: one round action at
            // the end of the row, and the send key appears with the first word.
            voice={idle ? { state: mic, onListeningChange: listen } : undefined}
            // One rounded row, as in the reference: attach, the text, the model, Send. The editor grows upward as the
            // text wraps while the buttons stay on the bottom line.
            layout="inline"
            onStop={() => {
              // Stop answers whether the gateway really interrupted: a refusal keeps the live line and says so here.
              setStopNote('')
              void stop().then(ok => {
                if (!ok) setStopNote(UI.working.stopFailed)
              })
            }}
            commands={commands}
            attachments={attachments}
            onAttach={list =>
              setFiles(fs => [
                ...fs,
                ...list.map((file, i) => ({ id: `${Date.now().toString(36)}-${i}-${file.name}`, file, name: file.name, size: file.size }))
              ])
            }
            onRemoveAttachment={id => setFiles(fs => fs.filter(f => f.id !== id))}
            labels={UI.composer.labels}
            onValueChange={value => {
              const text = String(value?.text || '')
              setDraft(text)
              // Only a draft that starts with a slash asks the gateway what to offer.
              if (text.trimStart().startsWith('/')) complete(text.trim())
              else if (commands.length) setCommands([])
            }}
            onSubmit={value => {
              // A command is read from its plain text: the serialized form writes a chip as `[label](command:mm)`, which
              // no gateway would recognise. Everything else keeps the serialized value (mentions, pasted chips).
              const plain = String(value.text || '')
              if (/^\s*\//.test(plain) && runCommand(plain)) return
              const text = value.serialized || value.text
              const list = files.map(f => f.file)
              setFiles([])
              setStopNote('')
              void send(text, list)
              onSent?.()
            }}
          />
        </TooltipProvider>
        {stopNote ? (
          <p role="status" data-hui-part="composer-note" className="hui-composer-note">
            {stopNote}
          </p>
        ) : null}
      </div>
    </div>
  )
}
