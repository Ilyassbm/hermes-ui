// The thread: the turns of the open conversation, the way down to the newest, and the composer under them.
//
// Following is Glaze's: the viewport stays at the end while a turn streams, lets go the moment the person scrolls up,
// and ConversationJump ("Aller en bas") is the way back — we never scroll it ourselves.
import { type RefObject } from 'react'
import { Conversation, ConversationContent, ConversationError, ConversationJump, ConversationProvider, ConversationViewport, useConversation } from '@/components/glaze/ai/conversation'
import { Message, MessageBubble, MessageBubbleContent, MessageContent, MessageGroup, MessageHeader, MessageTime } from '@/components/glaze/ai/message'
import type { PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { Attachment, AttachmentContent, AttachmentGlyph, AttachmentGroup, AttachmentMedia, AttachmentTitle } from '@/components/glaze/ui/attachment'
import { Chip, ChipGroup } from '@/components/glaze/ui/chip'
import { retryLast, store } from '@/lib/hermes'
import { hourOf } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { BotAvatar } from '../bot-avatar'
import { botIdentity } from '../format'
import { Composer } from './composer'
import { AssistantTurn } from './turn'

const SUGGESTIONS = ['Fais le point sur tes tâches', "Qu'as-tu produit aujourd'hui ?", 'Propose-moi la prochaine action']

type ThreadProps = {
  bot: string | null
  name: string
  input: RefObject<PromptInputHandle | null>
}

export function Thread({ bot, name, input }: ThreadProps) {
  const messages = useStore(store, s => s.messages)
  const live = useStore(store, s => s.live)
  const sid = useStore(store, s => s.sid)
  const ready = useStore(store, s => s.ready)
  const error = useStore(store, s => s.error)
  const identity = botIdentity(bot || 'default')

  const last = messages[messages.length - 1]
  // The first byte of anything: a word, a thought or a call. The turn's own opening action does not count.
  const started = Boolean(
    last && last.role === 'assistant' && (last.text || last.reasoning || (last.toolActions || []).some((a: any) => a.type !== 'turn'))
  )
  const streaming = Boolean(live)
  const status = streaming ? 'streaming' : 'idle'
  const composerStatus = streaming ? (started ? 'streaming' : 'submitted') : 'ready'
  const generation = streaming ? last?.gen : sid

  return (
    <ConversationProvider status={status}>
      <Conversation className="relative min-h-0 flex-1">
        {/* The bot: a pill pinned to the top of the sheet, 12px from its edge, over the thread rather than in it. The
            viewport starts under it (pt-14 = 56px), so a turn never slides beneath the pill as it scrolls. */}
        <div className="pointer-events-none absolute inset-x-0 top-3 z-(--z-raised) flex justify-center">
          <span className="pointer-events-auto inline-flex items-center gap-2 rounded-pill bg-shell px-3 py-1.5 type-label text-text-1">
            <BotAvatar size={20} colors={identity.colors} shape={identity.shape} label={name} hoverGiggle={false} />
            {name}
          </span>
        </div>
        <ConversationViewport aria-label={`Conversation avec ${name}`} className="px-4" labels={{ complete: 'Réponse terminée', stopped: 'Arrêté', failed: 'Réponse en échec' }}>
          <ConversationContent className="mx-auto flex w-full max-w-measure flex-col pt-14 pb-6">

            {!ready ? (
              <p className="py-10 text-center type-body-sm text-text-3">Connexion à Hermes…</p>
            ) : messages.length ? (
              <MessageGroup>
                {messages.map(m =>
                  m.role === 'user' ? (
                    <Message key={m.id} from="user">
                      <MessageContent>
                        <MessageHeader>
                          Ilyass
                          <MessageTime>{hourOf(m.at)}</MessageTime>
                        </MessageHeader>
                        {m.attachments?.length ? (
                          <AttachmentGroup layout="wrap" className="justify-end">
                            {m.attachments.map((file: any, i: number) => (
                              <Attachment key={`${file.name}-${i}`} size="sm">
                                <AttachmentMedia>
                                  <AttachmentGlyph type={file.kind === 'image' ? 'image/png' : ''} name={file.name} />
                                </AttachmentMedia>
                                <AttachmentContent>
                                  <AttachmentTitle>{file.name}</AttachmentTitle>
                                </AttachmentContent>
                              </Attachment>
                            ))}
                          </AttachmentGroup>
                        ) : null}
                        <MessageBubble>
                          <MessageBubbleContent>{m.text}</MessageBubbleContent>
                        </MessageBubble>
                      </MessageContent>
                    </Message>
                  ) : (
                    <AssistantTurn key={m.id} message={m} name={name} identity={identity} />
                  )
                )}
              </MessageGroup>
            ) : (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <BotAvatar size={72} colors={identity.colors} shape={identity.shape} label={name} />
                <h1 className="type-heading text-text-1">Que fait-on avec {name} ?</h1>
                <ChipGroup aria-label="Suggestions">
                  {SUGGESTIONS.map(s => (
                    <Chip key={s} onClick={() => input.current?.insert(s)}>
                      {s}
                    </Chip>
                  ))}
                </ChipGroup>
              </div>
            )}

            {error ? <ConversationError kind="server" message={error} onRetry={() => void retryLast()} labels={{ retry: 'Réessayer' }} className="mx-0" /> : null}
          </ConversationContent>
        </ConversationViewport>

        <ConversationJump labels={{ latest: 'Aller en bas', waitingOnYou: 'En attente de toi' }} />
      </Conversation>

      {/* The composer sits inside the provider so a send can snap the thread back to the end. */}
      <ComposerWithSnap bot={bot} name={name} input={input} sid={sid} status={composerStatus} generation={generation} />
    </ConversationProvider>
  )
}

function ComposerWithSnap(props: {
  bot: string | null
  name: string
  input: RefObject<PromptInputHandle | null>
  sid: string | null
  status: 'ready' | 'submitted' | 'streaming'
  generation?: string | number
}) {
  const { snap } = useConversation()
  return <Composer {...props} onSent={snap} />
}
