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
  ArrowLeft,
  Check,
  ChevronRight,
  Close,
  Settings,
  Time,
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
import { Input } from '@/components/glaze/ui/input'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/glaze/ui/item'
import { SegmentedControl, SegmentedControlItem } from '@/components/glaze/ui/segmented-control'
import { Switch } from '@/components/glaze/ui/switch'
import { toast } from '@/components/glaze/ui/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { loadRoutines, openConversation, openPreview, rest, store, toggleRoutine } from '@/lib/hermes'
import { botLabel, modelLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { BotAvatar } from './bot-avatar'
import { botIdentity, botRole, sinceLabel } from './format'
import { toggleAside } from './ui-state'
import { WorkingDot } from './thread/working'
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
/** The folder a row sits in, or nothing for a bare relative name: "CHANGELOG.md" is not in "/". */
const folderOf = (path: string) => {
  const parts = String(path || '').replace(/^\.\//, '').split('/')
  parts.pop()
  if (!parts.length) return ''
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
  const bots = useStore(store, s => s.bots)
  const sessionsByBot = useStore(store, s => s.sessionsByBot)
  const storedId = useStore(store, s => s.storedId)
  const live = useStore(store, s => s.live)
  const meta = bots.find((b: any) => b.name === bot)
  const name = botLabel(meta || bot)
  const role = botRole(bot || undefined, meta?.description)
  const identity = botIdentity(bot || 'default')
  const sessions = (bot && sessionsByBot[bot]) || []
  // What the bot runs on, in one line: its model and how many skills it carries.
  const facts = [meta?.model ? modelLabel(meta.model) : '', meta?.skills ? UI.aside.skills(meta.skills) : ''].filter(Boolean).join(' · ')
  const [tab, setTab] = useState<'activity' | 'files'>(() => read(ctx, 'asideTab', 'activity'))
  const pickTab = (next: 'activity' | 'files') => {
    setTab(next)
    try {
      ctx?.storage?.set('asideTab', next)
    } catch {
      /* the choice still holds for this session */
    }
  }
  const [allConvs, setAllConvs] = useState(false)
  const [busyJob, setBusyJob] = useState('')

  const [copied, setCopied] = useState('')
  const [query, setQuery] = useState('')
  // The preview's file comes from the store: a media block's Open preview names it from the thread.
  const selected = useStore(store, s => s.previewFile) as FileRow | null
  const [preview, setPreview] = useState<Preview | null>(null)
  const [mode, setMode] = useState<'rendered' | 'source'>('rendered')

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
    store.set({ previewFile: null })
    setPreview(null)
  }

  // Reads the file once per path. An image is drawn from /blob; anything else from /file, which also carries the size.
  useEffect(() => {
    if (!selected) {
      setPreview(null)
      return undefined
    }
    const path = selected.path
    let alive = true
    const done = (next: Preview) => {
      if (alive) setPreview(next)
    }
    setPreview({ path, loading: true })
    setMode('rendered')

    if (isImage(path)) {
      // /file only fills the size line, and may refuse at its own 1 MiB cap.
      void Promise.resolve(ctx?.rest?.(`/file?path=${encodeURIComponent(path)}`))
        .then((res: any) => {
          if (alive) setPreview(current => (current && current.path === path ? { ...current, size: res?.size } : current))
        })
        .catch(() => undefined)
      rest(`/blob?path=${encodeURIComponent(path)}`)
        .then((blob: any) => done({ path, loading: false, dataUrl: blob?.dataUrl, mime: blob?.mime, kind: 'binary' }))
        .catch((error: any) => done({ path, loading: false, error: failureOf(error) }))
      return () => {
        alive = false
      }
    }

    rest(`/file?path=${encodeURIComponent(path)}`)
      .then((res: any) => done({ ...res, path, loading: false }))
      .catch((error: any) => done({ path, loading: false, error: failureOf(error) }))
    return () => {
      alive = false
    }
  }, [selected, ctx])

  const filesList = (
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
          <div className="hui-aside-card">
            <ItemGroup variant="plain" aria-label={UI.aside.filesLabel}>
              {shown.map(file => (
                <AsideRow key={file.path} label={UI.aside.openFile(file.path)} onClick={() => openPreview(file.path)}>
                  <ItemMedia variant="icon">
                    <Icon icon={iconFor(file.path)} size={16} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      <span>{nameOf(file.path)}</span>
                    </ItemTitle>
                    <ItemDescription>
                      {[UI.aside.action[file.action || ''], folderOf(file.path)].filter(Boolean).join(' · ')}
                    </ItemDescription>
                  </ItemContent>
                  <span className="hui-aside-age">{sinceLabel(file.at)}</span>
                </AsideRow>
              ))}
            </ItemGroup>
          </div>
        ) : (
          <p className="px-1 py-2 type-caption text-text-3">{UI.aside.noMatch}</p>
        )
      ) : (
        <p className="hui-aside-empty">{UI.aside.noFiles}</p>
      )}
    </>
  )

  return (
    <aside aria-label={UI.aside.label} data-enter="aside" className="hui-aside flex h-full min-h-0 min-w-0 flex-col overflow-y-auto px-3 py-3">
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
          {/* The reference's bot card: settings and close on the top line, then the avatar, the name, what it runs
              on, and the two views of what it does. */}
          <div className="hui-aside-top">
            <Button variant="ghost" size="icon-lg" className="hui-round" aria-label={UI.rail.profileSettings} title={UI.rail.profileSettings} onClick={() => open('nav.profiles')}>
              <Icon icon={Settings} size={16} />
            </Button>
            <Button variant="ghost" size="icon-lg" className="hui-round" aria-label={UI.header.hideAside} title={UI.header.hideAside} onClick={() => toggleAside(ctx)}>
              <Icon icon={Close} size={16} />
            </Button>
          </div>
          <div className="hui-aside-profile">
            <BotAvatar size={76} colors={identity.colors} shape={identity.shape} label={name} />
            <h2 className="hui-aside-name">{role ? `${name} · ${role}` : name}</h2>
            {facts ? <p className="hui-aside-facts">{facts}</p> : null}
            <SegmentedControl size="sm" value={tab} onValueChange={(value: any) => pickTab(value)} aria-label={UI.aside.views}>
              <SegmentedControlItem value="activity">{UI.aside.activity}</SegmentedControlItem>
              <SegmentedControlItem value="files">
                {ordered.length ? UI.aside.filesWithCount(ordered.length) : UI.aside.files}
              </SegmentedControlItem>
            </SegmentedControl>
          </div>

          {tab === 'files' ? (
            <section className="flex flex-col gap-2">{filesList}</section>
          ) : (
            <>
              <section className="flex flex-col">
                <h3 className="hui-aside-h">{UI.aside.conversations}</h3>
                {sessions.length ? (
                  <div className="hui-aside-card">
                    <ItemGroup variant="plain" aria-label={UI.aside.conversations}>
                      {sessions.slice(0, allConvs ? 20 : 5).map(conv => {
                        const running = Boolean(live) && conv.id === storedId
                        return (
                          <AsideRow key={conv.id} label={conv.title || UI.header.conversation} onClick={() => void openConversation(conv.id)}>
                            <ItemMedia variant="icon">
                              {running ? <WorkingDot /> : <span className="hui-aside-done"><Icon icon={Check} size={10} weight="bold" /></span>}
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>
                                <span>{conv.title || UI.header.conversation}</span>
                              </ItemTitle>
                              <ItemDescription>{running ? UI.aside.running : conv.id === storedId ? UI.aside.open : sinceLabel(conv.at)}</ItemDescription>
                            </ItemContent>
                            <Icon icon={ChevronRight} size={14} className="hui-aside-chev" />
                          </AsideRow>
                        )
                      })}
                    </ItemGroup>
                    {sessions.length > 5 ? (
                      <Button variant="ghost" size="sm" className="hui-aside-more" onClick={() => setAllConvs(v => !v)}>
                        {allConvs ? UI.aside.showLess : UI.aside.showMore}
                      </Button>
                    ) : null}
                  </div>
                ) : (
                  <p className="hui-aside-empty">{UI.aside.noConversation}</p>
                )}
              </section>

              <section className="flex flex-col">
                <div className="hui-aside-h">
                  <h3>{UI.aside.routines}</h3>
                  <Button variant="ghost" size="sm" className="hui-aside-link" onClick={() => open('nav.cron')}>
                    {UI.aside.newRoutine}
                  </Button>
                </div>
                {routines.length ? (
                  <div className="hui-aside-card">
                    <ItemGroup variant="plain" aria-label={UI.aside.routinesLabel}>
                      {routines.slice(0, 12).map((job: any) => {
                        const on = isActive(job)
                        const key = String(job.id || job.job_id || routineName(job))
                        return (
                          <div key={key} className="hui-aside-row hui-aside-routine">
                            <Item size="sm" className="gap-2 px-2">
                              <ItemMedia variant="icon">
                                <Icon icon={Time} size={16} />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle>
                                  <span>{routineName(job)}</span>
                                </ItemTitle>
                                <ItemDescription>{on ? (nextRun(job) ? UI.aside.nextRun(nextRun(job)) : UI.aside.active) : UI.aside.paused}</ItemDescription>
                              </ItemContent>
                              <Switch
                                size="sm"
                                checked={on}
                                pending={busyJob === key}
                                aria-label={UI.aside.toggleRoutine(routineName(job))}
                                onCheckedChange={() => {
                                  setBusyJob(key)
                                  void toggleRoutine(job).then(ok => {
                                    setBusyJob('')
                                    if (!ok) toast.fail(UI.aside.toggleFailed, { description: routineName(job) })
                                  })
                                }}
                              />
                            </Item>
                          </div>
                        )
                      })}
                    </ItemGroup>
                  </div>
                ) : (
                  <p className="hui-aside-empty">{UI.aside.noRoutineBody}</p>
                )}
              </section>
            </>
          )}
        </>
      )}

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
