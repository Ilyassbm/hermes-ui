// The composer: one Glaze PromptInput on a single paper surface — the editor on top, the toolbar at its foot — as wide
// as the thread's reading measure and 16px off the sheet's bottom edge.
//
// The model pill is gone: the model and the effort are chosen in the header now (lot 6 moved them there). What the
// composer adds is the `/` list, fed by the gateway's `complete.slash` 120ms after the last keystroke; a picked command
// becomes a chip, and a prompt that starts with `/` is run as a command instead of being sent (src/app/slash-run.ts).
import { useEffect, useRef, useState, type RefObject } from 'react'
import { host } from '@hermes/plugin-sdk'
import { PromptInput, type Attachment, type CommandItem, type PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { send, stop, store } from '@/lib/hermes'
import { runCommand } from '../slash-run'

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
          label={`Écrire à ${name}`}
          placeholder={`Écris à ${name}…`}
          // One draft per thread: a draft written in one conversation is never carried into another.
          draftKey={`hermes-ui-${bot || 'default'}-${sid || 'new'}`}
          status={status}
          generation={generation}
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
          labels={{
            send: 'Envoyer',
            stop: 'Arrêter',
            stopping: 'Arrêt…',
            sendAgain: 'Renvoyer',
            attach: 'Joindre un fichier',
            attachments: 'Pièces jointes',
            drop: 'Déposer pour joindre',
            uploading: percent => `Envoi ${percent} %`,
            uploadFailed: 'Envoi impossible',
            attached: 'Joint',
            retryFile: fileName => `Réessayer ${fileName}`,
            cancelUpload: fileName => `Annuler l’envoi de ${fileName}`,
            removeFile: fileName => `Retirer ${fileName}`,
            undo: 'Annuler',
            cancel: 'Annuler',
            removed: label => `${label} retiré`,
            expanded: label => `${label} déplié`,
            clickToExpand: 'Cliquer pour déplier',
            textOnly: 'Ce champ prend du texte seulement',
            acceptOnly: types => `Seuls les fichiers ${types} peuvent être joints ici`,
            notAttached: (names, accept) => `Non joints : ${names.join(', ')}.${accept ? ` Formats acceptés : ${accept}` : ''}`,
            tooLong: (characters, fit) => `Trop long à coller : ${characters.toLocaleString('fr-FR')} caractères, ${fit.toLocaleString('fr-FR')} tiennent. Joins-le comme fichier.`,
            pasted: (lines, characters) => (lines > 1 ? `${lines} lignes collées` : `${characters.toLocaleString('fr-FR')} caractères collés`),
            waiting: n => `En attente de ${n} envoi${n > 1 ? 's' : ''}`,
            held: n => `En attente de ${n} envoi${n > 1 ? 's' : ''}. Part dès qu’ils sont finis`,
            failed: names => `${names.join(', ')} : envoi impossible. Retire le fichier ou réessaie`,
            waitingOnYou: n => `${n} appel${n > 1 ? 's' : ''} en attente de toi`,
            review: 'Voir',
            files: 'Fichiers et ressources',
            commands: 'Commandes',
            searchCommands: 'Chercher une commande',
            noMatches: query => `Aucun résultat pour « ${query} »`,
            results: n => `${n} résultat${n > 1 ? 's' : ''}`,
            shell: 'commande shell',
            shellPlaceholder: 'Lancer une commande shell',
            shellStatus: 'Shell. Échap pour sortir',
            off: 'La saisie est désactivée'
          }}
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
