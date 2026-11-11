// The centre: the header with the bot's conversations, then the thread on the sheet, the composer under it.
//
// The sheet is the only paper surface on the page: it starts at the top edge, so the header sits on the same line as
// the rail's top bar, and it keeps 8px of page on its end and its bottom. The thread scrolls inside it and the composer
// stays at its foot. The floating name pill of lot 2 is gone: the header's first tab names the bot now.
import { useEffect, useRef } from 'react'
import type { PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { store } from '@/lib/hermes'
import { botLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { bindEditor } from './editor'
import { Header } from './header'
import { Thread } from './thread/thread'

type CenterProps = {
  ctx: any
  narrowRail: boolean
}

export function Center({ ctx, narrowRail }: CenterProps) {
  const current = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const composer = useRef<PromptInputHandle | null>(null)

  // The editor's handle, reachable from the `/` shortcut and from the bot picker.
  useEffect(() => {
    bindEditor(composer)
    return () => bindEditor(null)
  }, [])

  const meta = bots.find(b => b.name === current)
  const name = botLabel(meta || current)

  return (
    // No sheet any more (the reference sets the thread on the page itself, the bot's answers in bubbles): the column
    // fills, the thread scrolls in it and the composer sits at its foot.
    <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-page">
      <Header ctx={ctx} narrowRail={narrowRail} />
      <Thread bot={current} name={name} input={composer} />
    </main>
  )
}
