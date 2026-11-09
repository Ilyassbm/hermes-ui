// The right panel: every file this conversation touched, with a preview, then the bot's routines folded under it.
//
// The rows come from the tool events (`src/lib/hermes.js` turns read_file / write_file / edit / apply_patch / shell
// calls into `{ path, at, action }`), deduplicated by path and sorted by the last action. A click swaps the list for
// the preview — the file's text with line numbers, a rendered markdown view with its source, or the image itself —
// and the back button brings the list back. The panel is a page surface, not a card: it keeps the page colour and the
// centre stays the only paper.
//
// The four preview reads are our own backend's read-only routes: `GET /file` (UTF-8 text, 1 MiB cap) and
// `GET /blob` (base64, 8 MiB cap). The backend refuses anything outside the profile home and `~`, and the secret
// names it lists; the panel only prints what the route sends.
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  Icon,
  Add,
  ArrowLeft,
  ChevronRight,
  Close,
  Copy,
  Document,
  DocumentBlank,
  External,
  FileArchive,
  FileCode,
  FileImage,
  FileTable
} from '@/components/glaze/icon'
import { Response } from '@/components/glaze/ai/response'
import { Button } from '@/components/glaze/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/glaze/ui/empty-state'
import { Input } from '@/components/glaze/ui/input'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/glaze/ui/item'
import { SegmentedControl, SegmentedControlItem } from '@/components/glaze/ui/segmented-control'
import { Status } from '@/components/glaze/ui/status'
import { toast } from '@/components/glaze/ui/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { loadRoutines, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
import { sinceLabel } from './format'
import { UI } from './strings'

type FileRow = { path: string; at?: number; action?: string }

/** The preview the panel holds: the route's answer, or the reason there is none. */
type Preview = {
  path: string
  loading?: boolean
  size?: number
  kind?: 'text' | 'binary'
  text?: string
  mime?: string
  dataUrl?: string
  error?: 'missing' | 'refused' | 'too_large' | 'unavailable'
}

/** The text preview's ceiling, in lines: the spec's 4 000, and the backend's 1 MiB read behind it. */
const MAX_LINES = 4000

const IMAGE_EXT = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'])
const TABLE_EXT = new Set(['csv', 'tsv'])
const CODE_EXT = new Set(['py', 'ts', 'tsx', 'js', 'jsx', 'css', 'html', 'sh', 'json', 'yml', 'yaml', 'toml', 'xml', 'sql'])
const TEXT_EXT = new Set(['md', 'markdown', 'txt', 'log'])

const extOf = (path: string) => String(path || '').split('.').pop()?.toLowerCase() || ''
const nameOf = (path: string) => String(path || '').split('/').pop() || path
const folderOf = (path: string) => {
  const parts = String(path || '').split('/')
  parts.pop()
  return parts.join('/') || '/'
}
const isImage = (path: string) => IMAGE_EXT.has(extOf(path))
const isMarkdown = (path: string) => ['md', 'markdown'].includes(extOf(path))

function iconFor(path: string) {
  const ext = extOf(path)
  if (IMAGE_EXT.has(ext)) return FileImage
  if (TABLE_EXT.has(ext)) return FileTable
  if (CODE_EXT.has(ext)) return FileCode
  if (['zip', 'tar', 'gz', 'rar', '7z'].includes(ext)) return FileArchive
  if (TEXT_EXT.has(ext)) return Document
  return DocumentBlank
}

/** 1.2 kB, 4.1 MB: the size a person reads in a refusal. */
function sizeLabel(bytes?: number): string {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes)) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

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
      className="hui-aside-row focus-visible:focus-ring-row"
    >
      <Item size="sm" className="gap-2 px-2">
        {children}
      </Item>
    </div>
  )
}

/** A stored value, with the default when storage is unavailable. */
function read<T>(ctx: any, key: string, fallback: T): T {
  try {
    const value = ctx?.storage?.get(key, fallback)
    return value === undefined || value === null ? fallback : value
  } catch {
    return fallback
  }
}

/** The error code the backend sent, from whichever door the host's `rest` used to report it. */
function failureOf(error: any): Preview['error'] {
  const body = error?.body || error?.data || error?.response || {}
  const code = body?.error || error?.error
  if (code === 'missing' || code === 'too_large' || code === 'refused') return code
  const text = `${error?.message || ''} ${error?.status || ''}`
  if (/413|too[_\s-]?large/i.test(text)) return 'too_large'
  if (/404|missing/i.test(text)) return 'missing'
  return 'refused'
}

export function Aside({ ctx }: { ctx: any }) {
  const routines = useStore(store, s => s.routines)
  const files = useStore(store, s => s.files) as FileRow[]
  const bot = useStore(store, s => s.bot)

  const [copied, setCopied] = useState('')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<FileRow | null>(null)
  const [preview, setPreview] = useState<Preview | null>(null)
  const [mode, setMode] = useState<'rendered' | 'source'>('rendered')
  const [routinesOpen, setRoutinesOpen] = useState<boolean>(() => read(ctx, 'asideRoutinesOpen', false))

  // The routines belong to the open bot: refresh them when it changes, and keep them fresh while the page is open.
  useEffect(() => {
    if (!bot) return undefined
    void loadRoutines()
    const timer = ctx?.setInterval ? ctx.setInterval(() => void loadRoutines(), 60_000) : null
    return () => {
      if (typeof timer === 'function') timer()
    }
  }, [bot, ctx])

  const ordered = useMemo(() => [...files].sort((a, b) => (b.at || 0) - (a.at || 0)), [files])
  const needle = query.trim().toLowerCase()
  const shown = needle
    ? ordered.filter(file => `${nameOf(file.path)} ${file.path}`.toLowerCase().includes(needle))
    : ordered

  const open = (id: string) => {
    try {
      void ctx?.runAction?.(id)
    } catch {
      /* an older app without that action */
    }
  }

  const copyPath = async (path: string) => {
    try {
      await ctx?.os?.writeClipboard?.(path)
      setCopied(path)
      toast(UI.aside.copiedTitle, { description: path })
      return true
    } catch {
      try {
        await navigator.clipboard.writeText(path)
        setCopied(path)
        toast(UI.aside.copiedTitle, { description: path })
        return true
      } catch {
        toast.fail(UI.aside.unreadableTitle, { description: path })
        return false
      }
    }
  }

  /** The host's own opener, when this desktop build has one. */
  const nativeOpener = ctx?.host?.openPath || ctx?.os?.openPath || ctx?.openPath
  const canOpenNative = typeof nativeOpener === 'function'

  const openNative = async (path: string) => {
    if (!canOpenNative) return
    try {
      await nativeOpener.call(ctx?.host || ctx?.os || ctx, path)
    } catch {
      await copyPath(path)
    }
  }

  const closePreview = () => {
    setSelected(null)
    setPreview(null)
  }

  const showFile = async (file: FileRow) => {
    const path = file.path
    setSelected(file)
    setMode('rendered')
    setPreview({ path, loading: true })

    if (isImage(path)) {
      // An image is drawn from /blob; /file only fills the size line, and may refuse at its own 1 MiB cap.
      void Promise.resolve(ctx?.rest?.(`/file?path=${encodeURIComponent(path)}`))
        .then((res: any) => setPreview(current => (current && current.path === path ? { ...current, size: res?.size } : current)))
        .catch(() => undefined)
      try {
        const blob: any = await ctx?.rest?.(`/blob?path=${encodeURIComponent(path)}`)
        setPreview(current =>
          current && current.path === path
            ? { ...current, loading: false, dataUrl: blob?.dataUrl, mime: blob?.mime, kind: 'binary' }
            : current
        )
      } catch (error) {
        setPreview(current =>
          current && current.path === path ? { ...current, loading: false, error: failureOf(error) } : current
        )
      }
      return
    }

    try {
      const res: any = await ctx?.rest?.(`/file?path=${encodeURIComponent(path)}`)
      if (res?.error) {
        setPreview({ ...res, path, loading: false })
        return
      }
      setPreview({ ...res, path, loading: false })
    } catch (error) {
      setPreview(current =>
        current && current.path === path ? { ...current, loading: false, error: failureOf(error) } : current
      )
    }
  }

  const toggleRoutines = () => {
    const next = !routinesOpen
    setRoutinesOpen(next)
    try {
      ctx?.storage?.set('asideRoutinesOpen', next)
    } catch {
      /* the fold still works for this session */
    }
  }

  return (
    <aside aria-label={UI.aside.label} data-enter="aside" className="hui-aside flex h-full min-h-0 min-w-0 flex-col overflow-y-auto px-3 py-2">
      <section className="flex flex-col gap-2">
        <div className="hui-aside-head">
          <h2 className="type-caption text-text-2">{UI.aside.files}</h2>
          {ordered.length ? <span className="hui-aside-count">{UI.aside.fileCount(ordered.length)}</span> : null}
        </div>

        {selected ? (
          <PreviewPane
            file={selected}
            preview={preview}
            mode={mode}
            setMode={setMode}
            canOpenNative={canOpenNative}
            onBack={closePreview}
            onCopy={() => void copyPath(selected.path)}
            onOpenNative={() => void openNative(selected.path)}
            onClose={closePreview}
          />
        ) : (
          <>
            {ordered.length > 8 ? (
              <Input
                mode="search"
                size="sm"
                className="hui-aside-filter"
                value={query}
                placeholder={UI.aside.filterFiles}
                aria-label={UI.aside.filterFiles}
                onChange={event => setQuery(event.target.value)}
              />
            ) : null}

            {ordered.length ? (
              shown.length ? (
                <ItemGroup variant="plain" aria-label={UI.aside.filesLabel}>
                  {shown.map(file => (
                    <AsideRow key={file.path} label={UI.aside.openFile(file.path)} onClick={() => void showFile(file)}>
                      <ItemMedia variant="icon">
                        <Icon icon={iconFor(file.path)} size={14} />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>
                          <span>{nameOf(file.path)}</span>
                        </ItemTitle>
                        <ItemDescription>
                          {UI.aside.action[file.action || ''] ? `${UI.aside.action[file.action || '']} · ` : ''}
                          {folderOf(file.path)}
                        </ItemDescription>
                      </ItemContent>
                      <span className="hui-aside-age">{sinceLabel(file.at)}</span>
                    </AsideRow>
                  ))}
                </ItemGroup>
              ) : (
                <p className="px-1 py-2 type-caption text-text-3">{UI.aside.noMatch}</p>
              )
            ) : (
              <p className="px-1 py-2 type-caption text-text-3">{UI.aside.noFiles}</p>
            )}
          </>
        )}
      </section>

      <section className="flex flex-col gap-1">
        <div className="hui-aside-head">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="hui-aside-fold"
            aria-expanded={routinesOpen}
            aria-controls="hui-aside-routines"
            onClick={toggleRoutines}
          >
            <h2 className="type-caption text-text-2">{UI.aside.routines}</h2>
            <Icon icon={ChevronRight} size={12} />
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn" aria-label={UI.aside.createRoutine} data-ui-tooltip="hui-tip-aside-routine" onClick={() => open('nav.cron')} />}
              >
                <Icon icon={Add} size={12} />
              </TooltipTrigger>
              <TooltipContent id="hui-tip-aside-routine">{UI.aside.createRoutine}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div id="hui-aside-routines" data-open={routinesOpen} className="hui-aside-routines">
          <div>
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
          </div>
        </div>
      </section>

      {copied ? (
        <span role="status" className="px-1 type-caption text-text-3">
          {UI.aside.pathCopied}
        </span>
      ) : null}
    </aside>
  )
}

/** The preview, in place of the list: title, path, actions, then the body the file allows. */
function PreviewPane({
  file,
  preview,
  mode,
  setMode,
  canOpenNative,
  onBack,
  onCopy,
  onOpenNative,
  onClose
}: {
  file: FileRow
  preview: Preview | null
  mode: 'rendered' | 'source'
  setMode: (next: 'rendered' | 'source') => void
  canOpenNative: boolean
  onBack: () => void
  onCopy: () => void
  onOpenNative: () => void
  onClose: () => void
}) {
  const path = file.path
  const text = preview?.text
  const lines = useMemo(() => (typeof text === 'string' ? text.split('\n') : []), [text])
  const shown = lines.slice(0, MAX_LINES)
  const gutter = useMemo(() => shown.map((_, index) => index + 1).join('\n'), [shown])
  const failed = Boolean(preview?.error)
  const body = shown.join('\n')

  return (
    <div className="hui-prev">
      <div className="hui-prev-bar">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn hui-prev-btn" aria-label={UI.aside.back} data-ui-tooltip="hui-tip-prev-back" onClick={onBack} />}
            >
              <Icon icon={ArrowLeft} size={12} />
            </TooltipTrigger>
            <TooltipContent id="hui-tip-prev-back">{UI.aside.back}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="hui-prev-actions">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn hui-prev-btn" aria-label={UI.aside.copyPath} data-ui-tooltip="hui-tip-prev-copy" onClick={onCopy} />}
              >
                <Icon icon={Copy} size={12} />
              </TooltipTrigger>
              <TooltipContent id="hui-tip-prev-copy">{UI.aside.copyPath}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {canOpenNative ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn hui-prev-btn" aria-label={UI.aside.openNative} data-ui-tooltip="hui-tip-prev-open" onClick={onOpenNative} />}
                >
                  <Icon icon={External} size={12} />
                </TooltipTrigger>
                <TooltipContent id="hui-tip-prev-open">{UI.aside.openNative}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn hui-prev-btn" aria-label={UI.aside.closePreview} data-ui-tooltip="hui-tip-prev-close" onClick={onClose} />}
              >
                <Icon icon={Close} size={12} />
              </TooltipTrigger>
              <TooltipContent id="hui-tip-prev-close">{UI.aside.closePreview}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>

      <div className="hui-prev-heading">
        <p className="hui-prev-title">{nameOf(path)}</p>
        <p className="hui-prev-path" title={path}>
          {path}
        </p>
        {typeof preview?.size === 'number' ? <p className="hui-prev-meta">{sizeLabel(preview.size)}</p> : null}
      </div>

      {preview?.loading ? (
        <p className="hui-prev-note">{UI.aside.loading}</p>
      ) : failed ? (
        <div className="hui-prev-empty" role="status">
          <p className="hui-prev-empty-title">{UI.aside.previewUnavailable}</p>
          <p className="hui-prev-note">
            {preview?.error === 'missing'
              ? UI.aside.missing
              : preview?.error === 'too_large'
                ? UI.aside.tooLarge(sizeLabel(preview?.size))
                : UI.aside.refused}
          </p>
          {!preview?.size ? <p className="hui-prev-note">{UI.aside.binaryBody}</p> : null}
          <p className="hui-prev-path" title={path}>
            {path}
          </p>
        </div>
      ) : preview?.dataUrl ? (
        <Button variant="ghost" size="sm" className="hui-prev-image" onClick={event => event.currentTarget.classList.toggle('is-zoom')} aria-label={UI.aside.preview}>
          <img src={preview.dataUrl} alt={nameOf(path)} />
        </Button>
      ) : typeof text === 'string' ? (
        isMarkdown(path) ? (
          <>
            <div className="hui-prev-modes">
              <SegmentedControl size="sm" value={mode} onValueChange={next => setMode(next as 'rendered' | 'source')} aria-label={UI.aside.preview}>
                <SegmentedControlItem value="rendered">{UI.aside.rendered}</SegmentedControlItem>
                <SegmentedControlItem value="source">{UI.aside.source}</SegmentedControlItem>
              </SegmentedControl>
            </div>
            {mode === 'rendered' ? (
              <div className="hui-prev-rendered">
                <Response size="sm" pace={false}>
                  {text}
                </Response>
              </div>
            ) : (
              <CodeBlock gutter={gutter} body={body} />
            )}
            {lines.length > MAX_LINES ? <p className="hui-prev-note">{UI.aside.linesShown(MAX_LINES, lines.length)}</p> : null}
          </>
        ) : (
          <>
            <CodeBlock gutter={gutter} body={body} />
            {lines.length > MAX_LINES ? <p className="hui-prev-note">{UI.aside.linesShown(MAX_LINES, lines.length)}</p> : null}
          </>
        )
      ) : (
        <div className="hui-prev-empty" role="status">
          <p className="hui-prev-empty-title">{UI.aside.previewUnavailable}</p>
          <p className="hui-prev-note">{UI.aside.binaryBody}</p>
          {typeof preview?.size === 'number' ? <p className="hui-prev-meta">{sizeLabel(preview.size)}</p> : null}
          <p className="hui-prev-path" title={path}>
            {path}
          </p>
        </div>
      )}
    </div>
  )
}

/** The text body: the line numbers in a sticky gutter, the content beside it, both in Glaze Mono. */
function CodeBlock({ gutter, body }: { gutter: string; body: string }) {
  return (
    <div className="hui-prev-code">
      <pre className="hui-prev-gutter" aria-hidden="true">
        {gutter}
      </pre>
      <pre className="hui-prev-text">{body}</pre>
    </div>
  )
}
