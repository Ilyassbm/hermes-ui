// The thread: the turns of the open conversation, the way down to the newest, and the composer under them.
//
// Following is Glaze's: the viewport stays at the end while a turn streams, lets go the moment the person scrolls up,
// and ConversationJump ("Aller en bas") is the way back — we never scroll it ourselves.
import { type RefObject, useMemo } from 'react'
import { Conversation, ConversationContent, ConversationError, ConversationJump, ConversationProvider, ConversationViewport, useConversation } from '@/components/glaze/ai/conversation'
import { Message, MessageBubble, MessageBubbleContent, MessageContent, MessageGroup, MessageHeader, MessageTime } from '@/components/glaze/ai/message'
import { Response } from '@/components/glaze/ai/response'
import type { PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { Attachment, AttachmentContent, AttachmentGlyph, AttachmentGroup, AttachmentMedia, AttachmentTitle } from '@/components/glaze/ui/attachment'
import { Chip, ChipGroup } from '@/components/glaze/ui/chip'
import { Skeleton, SkeletonText } from '@/components/glaze/ui/skeleton'
import { openConversation, retryBoot, retryLast, selectBot, store } from '@/lib/hermes'
import { hourOf } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { botIdentity } from '../format'
import { BotAvatar } from '../bot-avatar'
import { Composer } from './composer'
import { UI } from '../strings'
import { MediaGroup, SentAttachments, splitMedia } from './media'
import { AssistantTurn } from './turn'
import { WorkingLine } from './working'

const SUGGESTIONS = UI.thread.suggestions

type ThreadProps = {
  bot: string | null
  name: string
  input: RefObject<PromptInputHandle | null>
}

export function Thread({ bot, name, input }: ThreadProps) {
  const messages = useStore(store, s => s.messages)
  const live = useStore(store, s => s.live)
  const worked = useStore(store, s => s.worked)
  const sid = useStore(store, s => s.sid)
  const ready = useStore(store, s => s.ready)
  const error = useStore(store, s => s.error)
  const loading = useStore(store, s => s.loading)
  const retryOpen = useStore(store, s => s.retryOpen)
  const errorDetail = useStore(store, s => s.errorDetail)
  const retryBootFlag = useStore(store, s => s.retryBoot)
  const retryBot = useStore(store, s => s.retryBot)
  const storedId = useStore(store, s => s.storedId)
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
        {/* The header above names the bot: no pill floats over the thread any more, so the viewport starts at the top of
            the sheet's remaining height and nothing scrolls under a name. */}
        <ConversationViewport
          aria-label={UI.thread.conversationWith(name)}
          className="px-4"
          labels={UI.thread.viewport}
        >
          <ConversationContent className="mx-auto flex w-full max-w-measure flex-col pt-6 pb-6">

            {!ready ? (
              <LoadingThread />
            ) : loading ? (
              <LoadingThread />
            ) : messages.length ? (
              <MessageGroup data-ui-stack="" data-hui-part="message-stack">
                {messages.map(m =>
                  m.role === 'note' ? (
                    <NoteLine key={m.id} text={m.text} />
                  ) : m.role === 'user' ? (
                    <Message key={m.id} from="user">
                      <MessageContent>
                        <MessageHeader>
                          Ilyass
                          <MessageTime>{hourOf(m.at)}</MessageTime>
                        </MessageHeader>
                        {m.attachments?.length ? <UserAttachments files={m.attachments} /> : null}
                        <UserText text={m.text} />
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
                <h1 className="type-heading text-text-1">{UI.thread.emptyTitle(name)}</h1>
                <ChipGroup aria-label={UI.thread.suggestionsLabel}>
                  {SUGGESTIONS.map(s => (
                    <Chip key={s} onClick={() => input.current?.insert(s)}>
                      {s}
                    </Chip>
                  ))}
                </ChipGroup>
              </div>
            )}

            {/* The turn is still working: one line under the last message, never inside its bubble. It folds into
                "Worked for 12s" once Stop ended the turn, and leaves on the next prompt. */}
            {live || worked ? <WorkingLine live={live} worked={worked} name={name} /> : null}

            {error ? (
              <ConversationError
                kind="server"
                message={error}
                // A failed boot replays the roster read, a refused bot selects it again, and a failed resume has no
                // prompt to replay: its Retry opens the same conversation again.
                onRetry={() => {
                  if (retryBootFlag) return void retryBoot()
                  if (retryBot) return void selectBot(retryBot)
                  if (retryOpen && storedId) return void openConversation(storedId)
                  return void retryLast()
                }}
                labels={{ retry: UI.thread.retry }}
                className="mx-0"
              />
            ) : null}
            {/* What the backend actually answered, in one muted line: a banner a person cannot act on is a dead end. */}
            {error && errorDetail ? (
              <p className="type-caption px-1 text-text-3" data-hui-part="error-detail">
                {errorDetail}
              </p>
            ) : null}
          </ConversationContent>
        </ConversationViewport>

        <ConversationJump labels={{ latest: UI.thread.jumpLatest, waitingOnYou: UI.thread.waitingOnYou }} />
      </Conversation>

      {/* The composer sits inside the provider so a send can snap the thread back to the end. */}
      <ComposerWithSnap bot={bot} name={name} input={input} sid={sid} status={composerStatus} generation={generation} />
    </ConversationProvider>
  )
}

/**
 * `session.resume` answered nothing yet: the shapes the turns will take, so the thread never reads as empty while a
 * conversation opens (a cold backend can take seconds). No words beyond the status label: a skeleton is a shape.
 */
function LoadingThread() {
  return (
    <div className="flex flex-col gap-8" role="status" aria-busy="true" aria-label={UI.thread.loading}>
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-9 w-64 rounded-panel" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-24" />
        <SkeletonText type="body" lines={2} last={0.82} />
      </div>
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-9 w-48 rounded-panel" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-24" />
        <SkeletonText type="body" lines={3} last={0.55} />
      </div>
    </div>
  )
}

/**
 * What a user message carries above its text. A File the person sent in this session has a blob URL: it gets lot 22's
 * media block, thumbnail or card, and its Download reads the blob the page already holds. A message rebuilt from the
 * history has no blob — nothing local to draw — so its files keep the older chip, name and type, and no claim is made
 * that the picture is here.
 */
function UserAttachments({ files }: { files: any[] }) {
  const older = files.filter(file => !file?.url)
  return (
    <>
      <SentAttachments files={files} />
      {older.length ? (
        <AttachmentGroup layout="wrap" className="justify-end">
          {older.map((file, i) => (
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
    </>
  )
}

/**
 * The person's message: the bubble keeps the text as it was typed, and a media line the incoming attachment wrote
 * (the desktop uploader appends `[Image attached at: /…]`) becomes the same block the answers get, under the bubble.
 * With no marker the bubble is exactly what it always was, and nothing is requested.
 */
function UserText({ text }: { text: string }) {
  const segments = useMemo(() => splitMedia(text), [text])
  const body = segments
    .filter(segment => segment.kind === 'text')
    .map(segment => (segment.kind === 'text' ? segment.text : ''))
    .join('\n\n')
    .trim()
  return (
    <>
      {body ? (
        <MessageBubble>
          <MessageBubbleContent>{body}</MessageBubbleContent>
        </MessageBubble>
      ) : null}
      {segments.map((segment, index) =>
        segment.kind === 'media' ? <MediaGroup key={`media-${index}`} paths={segment.paths} /> : null
      )}
    </>
  )
}

/**
 * A command's answer: markdown, rendered by Response at size sm and settled (no stream, no pacing), centred in the
 * thread's reading measure, in the second ink and without a bubble or a role. Line breaks in a plain sentence stay
 * line breaks; a list, a heading or inline code arrives as itself instead of as its markers. It is never stored: it
 * belongs to this local conversation.
 */
function NoteLine({ text }: { text: string }) {
  return <Response size="sm" className="text-center text-text-2">{text}</Response>
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
