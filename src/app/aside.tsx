// The right panel: the open bot's routines, then the files this conversation produced.
//
// It is a page surface, not a card: the rail and this column keep the page colour, and only the centre is paper.
// Everything here is a row in a plain ItemGroup, 32px tall, because a 320px column holds a dozen lines at most.
import { useEffect, useState, type ReactNode } from 'react'
import { Icon, Add, Document } from '@/components/glaze/icon'
import { Button } from '@/components/glaze/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/glaze/ui/empty-state'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/glaze/ui/item'
import { Status } from '@/components/glaze/ui/status'
import { toast } from '@/components/glaze/ui/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { loadRoutines, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
import { UI } from './strings'

/** The job's next run, in the rail's short form. Fields differ between gateway versions, so every spelling is tried. */
function nextRun(job: any): string {
  const raw = job?.next_run_at || job?.next_run || job?.nextRunAt
  if (!raw) return ''
  const ms = typeof raw === 'number' ? (raw < 1e12 ? raw * 1000 : raw) : Date.parse(String(raw))
  if (!Number.isFinite(ms)) return ''
  return new Date(ms).toLocaleString('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit' })
}

function routineName(job: any): string {
  return String(job?.name || 'Routine').replace(/^\[bot:[^\]]+\]\s*/i, '')
}

function isActive(job: any): boolean {
  return job?.enabled !== false && job?.state !== 'paused'
}

/** A row that opens something: a div carries the wash, the radius and the click (reachable and operable from the
 *  keyboard), Item draws the row inside it. */
function AsideRow({ label, onClick, children }: { key?: string; label: string; onClick: () => void; children: ReactNode }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onClick}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
      className="rounded-tag focus-visible:focus-ring-row hover:bg-hover"
    >
      <Item size="sm" className="gap-2 px-2">
        {children}
      </Item>
    </div>
  )
}

export function Aside({ ctx }: { ctx: any }) {
  const routines = useStore(store, s => s.routines)
  const files = useStore(store, s => s.files)
  const bot = useStore(store, s => s.bot)
  const [copied, setCopied] = useState('')

  // The routines belong to the open bot: refresh them when it changes, and keep them fresh while the page is open.
  useEffect(() => {
    if (!bot) return undefined
    void loadRoutines()
    const timer = ctx?.setInterval ? ctx.setInterval(() => void loadRoutines(), 60_000) : null
    return () => {
      if (typeof timer === 'function') timer()
    }
  }, [bot, ctx])

  const open = (id: string) => {
    try {
      void ctx?.runAction?.(id)
    } catch {
      /* an older app without that action */
    }
  }

  // Reveal the file where the app can; otherwise put its path on the clipboard and say so.
  const reveal = async (path: string) => {
    let ok = false
    try {
      ok = await ctx?.os?.revealPath?.(path)
    } catch {
      ok = false
    }
    if (ok) return
    try {
      await ctx?.os?.writeClipboard?.(path)
      setCopied(path)
      toast(UI.aside.copiedTitle, { description: path })
    } catch {
      toast.fail(UI.aside.unreadableTitle, { description: path })
    }
  }

  return (
    <aside aria-label={UI.aside.label} data-enter="aside" className="flex h-full min-h-0 min-w-0 flex-col gap-4 overflow-y-auto px-3 py-2">
      <section className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="type-caption text-text-2">{UI.aside.routines}</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn" aria-label={UI.aside.createRoutine} data-ui-tooltip="hui-tip-aside-routine" onClick={() => open('nav.cron')} />}>
                <Icon icon={Add} size={12} />
              </TooltipTrigger>
              <TooltipContent id="hui-tip-aside-routine">{UI.aside.createRoutine}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {routines.length ? (
          <ItemGroup variant="plain" aria-label={UI.aside.routinesLabel}>
            {routines.slice(0, 12).map((job: any) => (
              <AsideRow key={job.id || job.job_id || routineName(job)} label={UI.aside.openRoutine(routineName(job))} onClick={() => open('nav.cron')}>
                <ItemMedia>
                  <Status status={isActive(job) ? 'ok' : 'idle'} size="sm">
                    {isActive(job) ? UI.aside.active : UI.aside.paused}
                  </Status>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    <span>{routineName(job)}</span>
                  </ItemTitle>
                </ItemContent>
                {/* The next run is what this row is for, and ItemMeta hides itself under 28rem — which this 320px
                    column always is — so the time is a caption of the same role, kept visible. */}
                <span className="ms-auto shrink-0 type-caption text-text-3">{nextRun(job)}</span>
              </AsideRow>
            ))}
          </ItemGroup>
        ) : (
          <Empty variant="plain" size="sm">
            <EmptyHeader>
              <EmptyTitle>{UI.aside.noRoutine}</EmptyTitle>
              <EmptyDescription>{UI.aside.noRoutineBody}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm" variant="secondary" onClick={() => open('nav.cron')}>
                {UI.aside.newRoutine}
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="type-caption text-text-2">{UI.aside.files}</h2>
        {files.length ? (
          <ItemGroup variant="plain" aria-label={UI.aside.filesLabel}>
            {files.slice(0, 30).map((file: any) => {
              const parts = String(file.path || '').split('/')
              const name = parts.pop() || file.path
              return (
                <AsideRow key={file.path} label={UI.aside.openFile(file.path)} onClick={() => void reveal(file.path)}>
                  <ItemMedia variant="icon">
                    <Icon icon={Document} size={14} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      <span>{name}</span>
                    </ItemTitle>
                    <ItemDescription>{parts.join('/') || '/'}</ItemDescription>
                  </ItemContent>
                </AsideRow>
              )
            })}
          </ItemGroup>
        ) : (
          <p className="px-1 py-2 type-caption text-text-3">{UI.aside.noFiles}</p>
        )}
        {copied ? (
          <span role="status" className="px-1 type-caption text-text-3">
            {UI.aside.pathCopied}
          </span>
        ) : null}
      </section>
    </aside>
  )
}
