// A provider's real mark, drawn from the 13 lobe-icons SVGs in src/assets/providers (MIT, see the LICENSE beside them).
//
// `scripts/gen-provider-logos.mjs` turns each file into `provider-logos.generated.ts` before every build: its viewBox,
// its path data and the brand colour. This component draws that data as one 16px `<svg>` (18px in the model menu),
// `fill="currentColor"`, so a mark keeps the ink of the row it sits in.
//
// A brand colour is applied when it is readable on the page: the near-black marks (OpenAI's knot by convention, xAI,
// Ollama, opencode) keep `--text-1`, which is the same black in the light theme and the near-white ink in the dark one.
// The other houses get their chart colour.
//
// The `slug` handed in can be a provider id (`opencode_go`), a profile's `provider` field (`claude`), or a model id's
// prefix; `logoFor` folds the aliases onto one mark.
import type { CSSProperties } from 'react'
import { PROVIDER_LOGOS } from './provider-logos.generated'

export type ProviderSlug = keyof typeof PROVIDER_LOGOS | 'generic'

const ALIASES: Record<string, ProviderSlug> = {
  anthropic: 'anthropic',
  claude: 'anthropic',
  openai: 'openai',
  gpt: 'openai',
  chatgpt: 'openai',
  google: 'gemini',
  gemini: 'gemini',
  vertex: 'gemini',
  deepseek: 'deepseek',
  xai: 'xai',
  grok: 'xai',
  groq: 'groq',
  mistral: 'mistral',
  mixtral: 'mistral',
  codestral: 'mistral',
  meta: 'meta',
  llama: 'meta',
  qwen: 'qwen',
  tongyi: 'qwen',
  openrouter: 'openrouter',
  ollama: 'ollama',
  opencode: 'opencode',
  opencodego: 'opencode',
  'opencode-go': 'opencode',
  perplexity: 'perplexity',
  pplx: 'perplexity',
  sonar: 'perplexity'
}

/** Marks whose chart colour is black: `--text-1` keeps them readable in the dark theme. */
const INK = new Set<ProviderSlug>(['openai', 'xai', 'ollama', 'opencode'])

/** The mark for a provider id, a profile's provider, or a model id's prefix. */
export function logoFor(provider?: string | null): ProviderSlug {
  const key = String(provider || '')
    .toLowerCase()
    .trim()
  if (!key) return 'generic'
  const cleaned = key.replace(/[^a-z0-9-]+/g, '')
  if (ALIASES[cleaned]) return ALIASES[cleaned]
  if (cleaned in PROVIDER_LOGOS) return cleaned as ProviderSlug
  // `opencode_go` / `deepseek-v4.1-flash`: the first segment names the house.
  const head = cleaned.split(/[-_.]/)[0]
  return ALIASES[head] || 'generic'
}

type ProviderLogoProps = {
  /** A provider id, a profile's provider, or a model id. */
  provider?: string | null
  /** The mark's height, in pixels (16 by default, 18 in the model menu). */
  size?: number
  className?: string
  title?: string
  /** Draw Glaze's ink whatever the brand (a disabled or selected control). */
  mono?: boolean
}

/** The generic fallback: a disc with a hole, for a provider the set does not name. */
function GenericMark() {
  return (
    <>
      <circle cx="8" cy="8" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="1.6" />
    </>
  )
}

export function ProviderLogo({ provider, size = 16, className, title, mono = false }: ProviderLogoProps) {
  const slug = logoFor(provider)
  const data = slug === 'generic' ? null : PROVIDER_LOGOS[slug]
  if (!data) {
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
        data-provider="generic"
        className={['hui-provider-mark', className].filter(Boolean).join(' ')}
        fill="currentColor"
      >
        <GenericMark />
      </svg>
    )
  }

  // A wordmark (Meta is 103×24) keeps its ratio: height is the size the call site asked for, width follows the box.
  const [minX, minY, boxW, boxH] = data.box.split(/\s+/).map(Number)
  const width = Number.isFinite(boxW) && Number.isFinite(boxH) && boxH > 0 ? Math.round((size * boxW) / boxH) : size
  const ink = mono || INK.has(slug) ? 'var(--text-1)' : data.color
  const style: CSSProperties = { color: ink }

  return (
    <svg
      viewBox={Number.isFinite(minX) ? data.box : '0 0 24 24'}
      width={width}
      height={size}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      data-hui-part="provider-logo"
      data-provider={slug}
      className={['hui-provider-mark', className].filter(Boolean).join(' ')}
      fill="currentColor"
      style={style}
    >
      {data.paths.map((path, index) => (
        <path key={`${slug}-${index}`} d={path.d} transform={path.transform} />
      ))}
    </svg>
  )
}
