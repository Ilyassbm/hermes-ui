// A provider's mark, drawn here as a 16px SVG: no icon font, no network, no brand colour — Glaze's ink only, so a
// logo sits in the theme like every other glyph. The set covers the providers the gateway names today (anthropic,
// openai, google, deepseek, opencode, xai, mistral, meta, groq) and falls back to a plain disc for anything else.
//
// The `slug` handed in can be a provider id (`opencode_go`), a profile's `provider` field (`claude`), or a model id's
// prefix; `logoFor` folds the aliases onto one mark.
import type { ReactElement } from 'react'

export type ProviderSlug =
  | 'anthropic'
  | 'openai'
  | 'google'
  | 'deepseek'
  | 'opencode'
  | 'xai'
  | 'mistral'
  | 'meta'
  | 'groq'
  | 'generic'

const ALIASES: Record<string, ProviderSlug> = {
  anthropic: 'anthropic',
  claude: 'anthropic',
  openai: 'openai',
  gpt: 'openai',
  chatgpt: 'openai',
  google: 'google',
  gemini: 'google',
  vertex: 'google',
  deepseek: 'deepseek',
  opencode: 'opencode',
  opencodego: 'opencode',
  'opencode-go': 'opencode',
  xai: 'xai',
  grok: 'xai',
  mistral: 'mistral',
  mixtral: 'mistral',
  meta: 'meta',
  llama: 'meta',
  groq: 'groq'
}

/** The mark for a provider id, a profile's provider, or a model id's prefix. */
export function logoFor(provider?: string | null): ProviderSlug {
  const key = String(provider || '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '')
  if (!key) return 'generic'
  if (ALIASES[key]) return ALIASES[key]
  // `opencode_go` / `deepseek-v4.1-flash`: the first segment names the house.
  const head = key.split(/[-_.]/)[0]
  return ALIASES[head] || 'generic'
}

const PATHS: Record<ProviderSlug, ReactElement> = {
  // The slanted A.
  anthropic: <path d="M4.1 13.2 7.3 2.8h1.9l3.2 10.4h-1.9l-.7-2.5H6.7l-.7 2.5H4.1Zm3-4.1h2.8L8.5 4.9 7.1 9.1Z" />,
  // The knot: a rounded hexagon and its centre.
  openai: (
    <>
      <path d="M8 1.7 13.3 4.8v6.4L8 14.3 2.7 11.2V4.8L8 1.7Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  // The G: a ring with its bar.
  google: (
    <>
      <path d="M12.8 5.6A5 5 0 1 0 13 9.1H8.4" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </>
  ),
  // The whale.
  deepseek: (
    <>
      <path d="M1.8 8.6c2.1-2.9 4.5-4.3 7.1-4.3 1.9 0 3.4.7 4.7 2-1.1-.2-2 0-2.8.5 1.7 1 2.5 2.3 2.5 3.9-2.3-1.2-4.4-1.3-6.4-.4-1.9.8-3.6.3-5.1-1.7Z" />
    </>
  ),
  // The prompt: a chevron and a cursor.
  opencode: (
    <>
      <path d="M3 4.6 6.2 8 3 11.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11.2h5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  // The X.
  xai: (
    <>
      <path d="M3.2 3.2 12.8 12.8M12.8 3.2 3.2 12.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  // The flagged bars.
  mistral: (
    <>
      <rect x="2.6" y="3.6" width="10.8" height="2" rx=".4" />
      <rect x="2.6" y="7" width="7.6" height="2" rx=".4" />
      <rect x="2.6" y="10.4" width="4.4" height="2" rx=".4" />
    </>
  ),
  // The loop.
  meta: (
    <>
      <circle cx="5" cy="8" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11" cy="8" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  // The bolt.
  groq: <path d="M9.2 1.8 3.4 8.9h3.4l-.9 5.3 5.8-7.1H8.3l.9-5.3Z" />,
  generic: (
    <>
      <circle cx="8" cy="8" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="1.6" />
    </>
  )
}

type ProviderLogoProps = {
  /** A provider id, a profile's provider, or a model id. */
  provider?: string | null
  /** The box, in pixels (16 by default, the size the composer and the menus ask for). */
  size?: number
  className?: string
  title?: string
}

export function ProviderLogo({ provider, size = 16, className, title }: ProviderLogoProps) {
  const slug = logoFor(provider)
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      data-hui-part="provider-logo"
      data-provider={slug}
      className={className}
      fill="currentColor"
    >
      {PATHS[slug]}
    </svg>
  )
}
