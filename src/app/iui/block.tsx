'use client';

// The <hui-ui> tag: a spec in the answer's markdown, drawn as Glaze components.
//
// While the JSON arrives the tag is a placeholder of a card's height, so the thread does not jump when it lands;
// when it closes, the spec is cut to the thread's limits and rendered. A spec that does not parse, or that breaks the
// format, draws nothing at all: raw JSON never reaches the page.
import { useEffect, useMemo, type ReactNode } from 'react'
import { JSONUIProvider, Renderer } from '@json-render/react'
import { Skeleton } from '@/components/glaze/ui/skeleton'
import type { TagRenderer } from '@/components/glaze/ai/response'
import { getIuiSink, handlers, registry, setIuiSink } from './registry'
import { sanitizeSpec } from './spec'

/** What a spec looks like while it streams: the footprint of a card, still. */
export function IuiPending() {
  return (
    <div data-hui-part="iui-pending" aria-hidden className="flex flex-col gap-3 rounded-shell border border-line-faint bg-shell p-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-7 w-24 rounded-pill" />
    </div>
  )
}

/** An element type this build does not know: its children still draw, the element itself is skipped. */
function PassThrough({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

type IuiBlockProps = {
  /** The parsed body of the tag. */
  spec: unknown
  /** Where a `send` action lands. Defaults to the conversation's own send. */
  onSend?: (text: string) => void
}

/** One spec, drawn: its own state, the catalogue's components, and the three actions. */
export function IuiBlock({ spec, onSend }: IuiBlockProps) {
  const { spec: clean } = useMemo(() => sanitizeSpec(spec), [spec])

  // A screen that owns its send lends it for as long as it is mounted, then the conversation's own comes back.
  useEffect(() => {
    if (!onSend) return
    const before = getIuiSink()
    setIuiSink({ send: onSend })
    return () => setIuiSink(before)
  }, [onSend])

  if (!clean) return null

  return (
    <JSONUIProvider registry={registry} initialState={clean.state} handlers={handlers(() => undefined, () => clean.state ?? {})}>
      <Renderer spec={clean} registry={registry} fallback={PassThrough} />
    </JSONUIProvider>
  )
}

/** The tag as `Response` knows it: a placeholder while it streams, the drawn spec once it closes. */
export const IUI_TAGS: Record<string, TagRenderer> = {
  'hui-ui': {
    pending: 'Compose l’interface…',
    placeholder: () => <IuiPending />,
    render: data => <IuiBlock spec={data} />
  }
}
