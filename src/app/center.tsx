// The centre: the thread with the open bot, on the sheet, with the composer pinned to its bottom edge.
//
// The sheet is the only paper surface on the page: it takes every pixel the column has between its 8px margins, the
// thread scrolls inside it, and the composer stays at its foot. The floating pill at the top names the bot and stays
// over the thread as it scrolls; the one icon button on its right opens or closes the right panel.
import { useRef } from 'react'
import { Icon, SidebarSimple } from '@/components/glaze/icon'
import type { PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { Button } from '@/components/glaze/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { store } from '@/lib/hermes'
import { botLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { Thread } from './thread/thread'
import { toggleAside, view } from './ui-state'

type CenterProps = {
  ctx: any
  narrowRail: boolean
}

export function Center({ ctx, narrowRail }: CenterProps) {
  const current = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const asideOpen = useStore(view, s => s.asideOpen)
  const railOpen = useStore(view, s => s.railOpen)
  const composer = useRef<PromptInputHandle | null>(null)

  const meta = bots.find(b => b.name === current)
  const name = botLabel(meta || current)

  return (
    // flex-1 and h-full: the sheet fills the column, so the thread has a height to scroll in and the composer has a
    // bottom edge to sit on. Without them the paper stops after its content, which is what lot 2 showed.
    <main className="relative my-2 me-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-panel bg-paper">
      {/* The one control the centre keeps: the right panel's toggle. */}
      <div className="absolute end-3 top-3 z-(--z-raised) flex items-center gap-1">
        {narrowRail ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="ghost" size="icon-sm" aria-label="Afficher ou masquer la liste des bots" onClick={() => view.set({ railOpen: !railOpen })} />}
              >
                <Icon icon={SidebarSimple} size={14} />
              </TooltipTrigger>
              <TooltipContent>Afficher les bots</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label={asideOpen ? 'Masquer le panneau' : 'Afficher le panneau'} onClick={() => toggleAside(ctx)} />}
            >
              {/* The panel opens on the end edge, so the icon is the same glyph mirrored: panel on the right. */}
              <Icon icon={SidebarSimple} size={14} mirrored />
            </TooltipTrigger>
            <TooltipContent shortcut={['mod', 'alt', 'B']}>{asideOpen ? 'Masquer le panneau' : 'Afficher le panneau'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Thread bot={current} name={name} input={composer} />
    </main>
  )
}
