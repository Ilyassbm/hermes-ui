// The composer: one Glaze PromptInput on a single paper surface — the editor on top, the toolbar at its foot — as wide
// as the thread's reading measure and 16px off the sheet's bottom edge.
//
// Lot 14 brought the model picker back to the toolbar's start, left of the attach button: its provider mark, the
// model's short name and the effort, opening the same menu /model does. What the composer adds is the `/` list, fed by
// the gateway's `complete.slash` 120ms after the last keystroke; a picked command becomes a chip, and a prompt that
// starts with `/` is run as a command instead of being sent (src/app/slash-run.ts). The send key follows the settings
// page (Enter, or ⌘/Ctrl+Enter).
import { useEffect, useRef, useState, type RefObject } from 'react'
import { host } from '@hermes/plugin-sdk'
import { PromptInput, type Attachment, type CommandItem, type PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { send, stop, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
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

export function Composer({ bot, name, input, sid, status, generation, onSent }: ComposerProps) {
  const [files, setFiles] = useState<Picked[]>([])
  const [commands, setCommands] = useState<CommandItem[]>([])
  const asked = useRef<ReturnType<typeof setTimeout> | null>(null)
  const submitKey = useStore(settings, s => s.sendKey)

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
              .map((item: any) => ({
                id: String(item?.text || ''),
                label: String(item?.text || '')
                  .trim()
                  .replace(/^\//, ''),
                description: String(item?.display || item?.meta || '').replace(/\s+/g, ' ').trim()
              }))
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
    <div className="hui-composer px-4 pb-4">
      <div className="mx-auto w-full max-w-measure">
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
          toolsFirst
          onStop={() => void stop()}
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
            void send(text, list)
            onSent?.()
          }}
        />
      </div>
    </div>
  )
}
