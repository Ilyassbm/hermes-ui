// Media in the thread: a `MEDIA:/path` line and an `[Image attached at: /path]` line become a block, never raw text.
//
// One implementation for the two forms the spec names. An image is a 320 × 240 thumbnail that opens in Glaze's
// Dialog (the whole image, a click to zoom, Escape or the X to close); any other file is a card with its type icon,
// its name, its size and two actions — Open preview hands the path to the right panel through the store, Download
// reads `/blob` and saves it through a temporary `<a download>`.
//
// The markers only count on their own line. That is what keeps a real markdown link such as
// `[Script v2](MEDIA:/…/script.md)` intact: it is not a line of its own, so the answer keeps its label and its href.
// A file route's refusal (`missing`, `refused`, `too_large`) becomes a quiet card, never an exception, and a message
// without a marker costs no request at all: the fast path below returns the text untouched before anything mounts.
import { useEffect, useMemo, useState } from 'react'
import { Response, type TagRenderer } from '@/components/glaze/ai/response'
import { Icon, Download as DownloadIcon, Document, DocumentBlank, Failed, FileArchive, FileCode, FileImage, FileTable } from '@/components/glaze/icon'
import { Button } from '@/components/glaze/ui/button'
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogTitle } from '@/components/glaze/ui/dialog'
import { Skeleton } from '@/components/glaze/ui/skeleton'
import { toast } from '@/components/glaze/ui/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { openPreview, rest } from '@/lib/hermes'
import { UI } from '../strings'

/** What the thread calls an image, and what `/blob` is asked for. */
const IMAGE_EXT = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg'])
const TABLE_EXT = new Set(['csv', 'tsv'])
const CODE_EXT = new Set(['py', 'ts', 'tsx', 'js', 'jsx', 'css', 'html', 'sh', 'json', 'yml', 'yaml', 'toml', 'xml', 'sql'])
const TEXT_EXT = new Set(['md', 'markdown', 'txt', 'log'])

/** The blob route's ceiling: over it the backend refuses, so the card disables Download instead of promising it. */
const MAX_DOWNLOAD = 8 * 1024 * 1024

const extensionOf = (path: string) => String(path || '').split('.').pop()?.toLowerCase() || ''
const fileNameOf = (path: string) => String(path || '').split('/').pop() || path
const isImagePath = (path: string) => IMAGE_EXT.has(extensionOf(path))

/** 1.2 kB, 4.1 MB: the size a person reads under the name. */
function sizeLabel(bytes?: number): string {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes)) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function iconFor(path: string) {
  const ext = extensionOf(path)
  if (IMAGE_EXT.has(ext)) return FileImage
  if (TABLE_EXT.has(ext)) return FileTable
  if (CODE_EXT.has(ext)) return FileCode
  if (['zip', 'tar', 'gz', 'rar', '7z'].includes(ext)) return FileArchive
  if (TEXT_EXT.has(ext)) return Document
  return DocumentBlank
}

/** The bytes a `data:` URL carries, read off its base64 tail: `/blob` answers no size of its own. */
function bytesOfDataUrl(dataUrl?: string): number | undefined {
  if (!dataUrl) return undefined
  const comma = dataUrl.indexOf(',')
  if (comma < 0) return undefined
  const body = dataUrl.slice(comma + 1)
  if (!body) return 0
  const padding = body.endsWith('==') ? 2 : body.endsWith('=') ? 1 : 0
  return Math.max(0, Math.floor((body.length * 3) / 4) - padding)
}

/** A Blob from a `data:` URL, decoded here instead of through `fetch` so nothing leaves the page. */
function blobFromDataUrl(dataUrl: string): Blob {
  const comma = dataUrl.indexOf(',')
  const head = comma < 0 ? '' : dataUrl.slice(0, comma)
  const body = comma < 0 ? dataUrl : dataUrl.slice(comma + 1)
  const mime = /data:([^;,]+)/.exec(head)?.[1] || 'application/octet-stream'
  const binary = atob(body)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: mime })
}

/** Saves a data URL under the file's real name through a temporary `<a download>`, then drops the object URL. */
function save(dataUrl: string, name: string) {
  const url = URL.createObjectURL(blobFromDataUrl(dataUrl))
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// ---------- The split ----------

export type MediaSegment = { kind: 'text'; text: string } | { kind: 'media'; paths: string[] }

/** `MEDIA:/abs/path`, or `[Image attached at: /abs/path]`, and nothing else on the line. */
const MEDIA_LINE = /^[ \t]*MEDIA:[ \t]*(\/[^\n]*?)[ \t]*$/
const ATTACHED_LINE = /^[ \t]*\[Image attached at:[ \t]*(\/[^\]\n]*?)\][ \t]*$/
const HAS_MARKER = /^[ \t]*(?:MEDIA:|\[Image attached at:)/m

/** `[File attached at: …]` is not a shape Hermes writes: no session on this box carries it (checked in state.db). */
function mediaPathOf(line: string): string {
  const match = MEDIA_LINE.exec(line) || ATTACHED_LINE.exec(line)
  return match ? match[1].trim() : ''
}

function hasMedia(text: string): boolean {
  return HAS_MARKER.test(String(text || ''))
}

/**
 * Cuts the text into what the thread renders as markdown and what it renders as a media block. Consecutive media
 * lines make one segment, so the renderer can lay them out as one grid. While the answer streams, the last line is
 * still growing and stays text until its newline lands: a half-arrived path never flashes as a broken image.
 */
export function splitMedia(text: string, streaming = false): MediaSegment[] {
  const source = String(text ?? '')
  if (!source) return []
  if (!hasMedia(source)) return [{ kind: 'text', text: source }]

  const lines = source.split('\n')
  const openEnd = streaming && !source.endsWith('\n')
  const out: MediaSegment[] = []
  let textLines: string[] = []
  let paths: string[] = []

  const pushText = () => {
    if (!textLines.length) return
    // The blank lines the marker left behind are dropped: the block's own 8px gap is the spacing.
    const value = textLines.join('\n').replace(/^\n+/, '').replace(/\n+$/, '')
    if (value.trim()) out.push({ kind: 'text', text: value })
    textLines = []
  }
  const pushMedia = () => {
    if (!paths.length) return
    out.push({ kind: 'media', paths })
    paths = []
  }

  lines.forEach((line, index) => {
    const path = openEnd && index === lines.length - 1 ? '' : mediaPathOf(line)
    if (path) {
      pushText()
      paths.push(path)
      return
    }
    pushMedia()
    textLines.push(line)
  })
  pushMedia()
  pushText()
  return out
}

/**
 * The assistant's answer: markdown around media blocks, never a block inside a paragraph. Every text segment is its
 * own Response, so the pacing of the live tail is unchanged and a media line simply ends the paragraph before it.
 */
export function MessageText({ text, streaming = false, tags }: { text: string; streaming?: boolean; tags?: Record<string, TagRenderer> }) {
  const segments = useMemo(() => splitMedia(text, streaming), [text, streaming])
  return (
    <>
      {segments.map((segment, index) =>
        segment.kind === 'media' ? (
          <MediaGroup key={`media-${index}`} paths={segment.paths} />
        ) : (
          <Response key={`text-${index}`} streaming={streaming && index === segments.length - 1} tags={tags}>
            {segment.text}
          </Response>
        )
      )}
    </>
  )
}

/** One media line and the blocks it carries: a single block at full width, several in a two-column grid. */
export function MediaGroup({ paths }: { key?: string; paths: string[] }) {
  return (
    <div data-hui-part="media-group" data-count={paths.length} className={paths.length > 1 ? 'hui-media-grid' : 'hui-media-single'}>
      {paths.map((path, index) => (
        <MediaBlock key={`${path}-${index}`} path={path} />
      ))}
    </div>
  )
}

// ---------- One block ----------

type MediaState =
  | { status: 'loading' }
  | { status: 'error'; reason: 'missing' | 'refused' | 'unavailable'; size?: number }
  | { status: 'ready'; size?: number; dataUrl?: string; mime?: string; tooLarge?: boolean }

/** The error code and size a refused route sent, from whichever door the host's `rest` used to report it. */
function problemOf(error: any): { reason: 'missing' | 'refused' | 'too_large' | 'unavailable'; size?: number } {
  const body = error?.body || error?.data || error?.response || {}
  const code = typeof body === 'object' ? body?.error || error?.error : error?.error
  const size = typeof body === 'object' && typeof body?.size === 'number' ? body.size : undefined
  if (code === 'missing' || code === 'refused' || code === 'too_large') return { reason: code, size }
  const text = `${error?.message || ''} ${error?.status || ''}`
  if (/413|too[_\s-]?large/i.test(text)) return { reason: 'too_large', size }
  if (/404|missing/i.test(text)) return { reason: 'missing', size }
  return { reason: 'refused', size }
}

function MediaBlock({ path }: { key?: string; path: string }) {
  const image = isImagePath(path)
  const [state, setState] = useState<MediaState>({ status: 'loading' })

  useEffect(() => {
    let alive = true
    const done = (next: MediaState) => {
      if (alive) setState(next)
    }
    setState({ status: 'loading' })

    if (image) {
      // The image route answers the picture itself; its size is read off the data URL.
      rest(`/blob?path=${encodeURIComponent(path)}`)
        .then((res: any) => {
          if (res?.error === 'too_large') return done({ status: 'ready', size: res.size, tooLarge: true })
          if (res?.error) return done({ status: 'error', reason: res.error === 'missing' ? 'missing' : 'refused', size: res.size })
          if (!res?.dataUrl) return done({ status: 'error', reason: 'unavailable' })
          done({ status: 'ready', dataUrl: res.dataUrl, mime: res.mime, size: bytesOfDataUrl(res.dataUrl) })
        })
        .catch((error: any) => {
          const problem = problemOf(error)
          // Over the 8 MiB cap there is no image to draw: the card stays, Download is refused with its tooltip.
          if (problem.reason === 'too_large') return done({ status: 'ready', size: problem.size, tooLarge: true })
          done({ status: 'error', reason: problem.reason === 'missing' ? 'missing' : 'refused', size: problem.size })
        })
      return () => {
        alive = false
      }
    }

    // Any other file: /file tells whether it is there and how big it is, and refuses above its own 1 MiB text cap.
    rest(`/file?path=${encodeURIComponent(path)}`)
      .then((res: any) => {
        if (res?.error === 'too_large') return done({ status: 'ready', size: res.size, tooLarge: typeof res.size === 'number' && res.size > MAX_DOWNLOAD })
        if (res?.error) return done({ status: 'error', reason: res.error, size: res.size })
        done({ status: 'ready', size: res?.size })
      })
      .catch((error: any) => {
        const problem = problemOf(error)
        if (problem.reason === 'too_large') {
          return done({ status: 'ready', size: problem.size, tooLarge: typeof problem.size === 'number' && problem.size > MAX_DOWNLOAD })
        }
        done({ status: 'error', reason: problem.reason === 'missing' ? 'missing' : 'refused', size: problem.size })
      })
    return () => {
      alive = false
    }
  }, [path, image])

  if (state.status === 'error') return <Unavailable path={path} />

  // An image keeps its shape while `/blob` answers, so the block never starts as a file card and flips.
  if (image && state.status === 'loading') {
    return (
      <div data-hui-part="media-image" className="hui-media hui-media-image" aria-busy="true">
        <Skeleton className="hui-media-sketch" />
        <span className="hui-media-meta">
          <span className="hui-media-name">{fileNameOf(path)}</span>
        </span>
      </div>
    )
  }

  if (state.status === 'ready' && state.dataUrl) {
    return <ImageBlock path={path} dataUrl={state.dataUrl} size={state.size} />
  }

  return (
    <FileCard
      path={path}
      size={state.status === 'ready' ? state.size : undefined}
      loading={state.status === 'loading'}
      tooLarge={state.status === 'ready' && Boolean(state.tooLarge)}
      previewable={state.status === 'ready' && !state.tooLarge}
    />
  )
}

/** The quiet refusal: the route would not serve it, or it is gone. The path stays readable under the title. */
function Unavailable({ path }: { path: string }) {
  return (
    <div data-hui-part="media-unavailable" role="status" className="hui-media hui-media-file hui-media-error">
      <span className="hui-media-glyph" aria-hidden="true">
        <Icon icon={Failed} size={16} />
      </span>
      <span className="hui-media-text">
        <span className="hui-media-name">{UI.media.unavailable}</span>
        <span className="hui-media-path" title={path}>
          {path}
        </span>
      </span>
    </div>
  )
}

/** The file card: type, name, size, then Open preview and Download, 8px apart. */
function FileCard({
  path,
  size,
  loading,
  tooLarge,
  previewable
}: {
  path: string
  size?: number
  loading: boolean
  tooLarge: boolean
  previewable: boolean
}) {
  const name = fileNameOf(path)
  return (
    <div data-hui-part="media-file" className="hui-media hui-media-file" aria-busy={loading || undefined}>
      <span className="hui-media-glyph" aria-hidden="true">
        <Icon icon={iconFor(path)} size={16} />
      </span>
      <div className="hui-media-text">
        <span className="hui-media-name" title={path}>
          {name}
        </span>
        {loading ? <Skeleton className="h-3 w-12" /> : <span className="hui-media-size">{sizeLabel(size)}</span>}
      </div>
      <div className="hui-media-actions">
        {previewable ? (
          <Button size="sm" variant="secondary" onClick={() => openPreview(path)}>
            {UI.media.openPreview}
          </Button>
        ) : null}
        <DownloadButton path={path} disabled={tooLarge} />
      </div>
    </div>
  )
}

/** The image: thumbnail, then the name and its size small, and Download beside them. */
function ImageBlock({ path, dataUrl, size }: { path: string; dataUrl: string; size?: number }) {
  const name = fileNameOf(path)
  const [open, setOpen] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  return (
    <figure data-hui-part="media-image" className="hui-media hui-media-image">
      <Button variant="ghost" size="sm" className="hui-media-thumb" aria-label={`${UI.media.openPreview} ${name}`} onClick={() => setOpen(true)}>
        <img src={dataUrl} alt={name} loading="lazy" />
      </Button>
      <figcaption className="hui-media-meta">
        <span className="hui-media-name" title={path}>
          {name}
        </span>
        <span className="hui-media-size">{sizeLabel(size)}</span>
        <DownloadButton path={path} dataUrl={dataUrl} />
      </figcaption>

      <Dialog
        open={open}
        onOpenChange={next => {
          setOpen(next)
          if (!next) setZoomed(false)
        }}
      >
        <DialogContent className="hui-media-dialog">
          <DialogTitle className="hui-sr">{name}</DialogTitle>
          <DialogDescription className="hui-sr">{path}</DialogDescription>
          <DialogBody className="hui-media-dialog-body">
            {/* A click toggles the size, no transition: reduced motion has nothing to cut. */}
            <Button variant="ghost" size="sm" className={zoomed ? 'hui-media-zoom is-zoom' : 'hui-media-zoom'} aria-label={zoomed ? UI.media.zoomOut : UI.media.zoom} onClick={() => setZoomed(value => !value)}>
              <img src={dataUrl} alt={name} />
            </Button>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </figure>
  )
}

/**
 * Download: the image's data URL is already here; any other file is read from `/blob` on the click. A refused read
 * says so in a toast. Over 8 MiB the button is disabled and its tooltip says why — a wrapper carries the tooltip
 * because a disabled button receives no pointer events.
 */
function DownloadButton({ path, dataUrl, disabled = false }: { path: string; dataUrl?: string; disabled?: boolean }) {
  const [busy, setBusy] = useState(false)
  const download = async () => {
    if (busy) return
    setBusy(true)
    try {
      const url = dataUrl || (await rest(`/blob?path=${encodeURIComponent(path)}`))?.dataUrl
      if (!url) throw new Error('no blob')
      save(url, fileNameOf(path))
    } catch {
      toast.fail(UI.media.unavailable, { description: path })
    } finally {
      setBusy(false)
    }
  }

  const button = (
    <Button size="sm" variant="secondary" disabled={disabled || busy} pending={busy} onClick={() => void download()}>
      <Icon icon={DownloadIcon} size={12} />
      {UI.media.download}
    </Button>
  )

  if (!disabled) return button
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<span className="hui-media-blocked" tabIndex={0} />}>{button}</TooltipTrigger>
        <TooltipContent>{UI.media.tooLarge}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
