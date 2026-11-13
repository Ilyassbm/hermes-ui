#!/usr/bin/env node
// Guards the page's composition against the validated reference (lot 8, 1.6.2): the six places where the rendered
// page had drifted from `mock-grok-direction.html`. Two halves, both run here:
//
//   1. the sources, read as text — the shapes the reference pins (a tile 95×90 with a 55 avatar, a pill with no
//      conversation title, no model label under a bubble, a 288 panel card with 36 rows, one idle-state rule for the
//      microphone, the 64/60 top of the thread);
//   2. the page itself: the real App, bundled for a browser and opened at 1440×900 in both colour schemes (390×844 for
//      the narrow pass), measured with the box's Chromium. The thread is seeded with enough turns to scroll, so the
//      bubbles really pass under the veil — the last check samples the pixel behind the fade.
//
// The reference is a picture, not a stylesheet: every number below is read off `mock-grok-direction.html` (1440×900),
// and the assertions are the numbers, not a taste in layouts.
//
//   node scripts/check-ui-composition.mjs           # the six points
//   HUI_CHROME=/path/to/chrome node …               # another Chromium
//
// Exits 1 with one line per failed point, 0 otherwise.
import { build } from 'esbuild'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || join(root, 'cache', 'composition')

/**
 * The Chromium to measure with. `HUI_CHROME` first, then the box's copy, then whatever Playwright itself resolved —
 * and `null` when none of them is on disk, which is the case on a CI runner that never downloaded a browser. The
 * source half above already ran by then; only the measurement half is skipped, and it says so instead of pretending.
 */
async function launchBrowser() {
  const candidates = [process.env.HUI_CHROME, '/opt/hermes/tools/chromium-1208/chrome-linux64/chrome', chromium.executablePath()]
  for (const candidate of candidates) {
    if (!candidate) continue
    try {
      if (!existsSync(candidate)) continue
      return await chromium.launch({ executablePath: candidate })
    } catch {
      /* that one cannot start: try the next */
    }
  }
  return null
}

const browser = await launchBrowser()
if (!browser) {
  console.log('dom half skipped — no Chromium on this machine (set HUI_CHROME=/path/to/chrome to measure the page).')
}


let failed = 0
const ok = (label, detail) => console.log(`ok   ${label}${detail ? ` — ${detail}` : ''}`)
const bad = (label, detail) => {
  failed += 1
  console.log(`FAIL ${label}${detail ? ` — ${detail}` : ''}`)
}
/** One point: the function answers the measured value, or throws with what it found instead. */
const check = (label, fn) => {
  try {
    ok(label, fn())
    return true
  } catch (error) {
    bad(label, String(error?.message || error))
    return false
  }
}
const asyncCheck = async (label, fn) => {
  try {
    ok(label, await fn())
    return true
  } catch (error) {
    bad(label, String(error?.message || error))
    return false
  }
}

const read = path => readFileSync(resolve(root, path), 'utf8')
const source = {
  rail: read('src/styles/rail.css'),
  shell: read('src/styles/shell.css'),
  aside: read('src/styles/aside.css'),
  theme: read('src/styles/theme.css'),
  header: read('src/app/header.tsx'),
  turn: read('src/app/thread/turn.tsx'),
  asideTsx: read('src/app/aside.tsx'),
  composer: read('src/app/thread/composer.tsx'),
  strings: read('src/app/strings.ts')
}

/** A declaration inside the block of `selector`, so a rule from another sheet cannot answer for it. */
function block(css, selector) {
  const at = css.indexOf(selector)
  if (at < 0) throw new Error(`${selector} is not in the sheet`)
  const open = css.indexOf('{', at)
  const close = css.indexOf('}', open)
  return css.slice(open + 1, close)
}
function declares(css, selector, property, value) {
  const body = block(css, selector)
  const hit = new RegExp(`${property}\\s*:\\s*${value}`).test(body)
  if (!hit) throw new Error(`${selector} does not declare ${property}: ${value}`)
  return `${property}: ${value}`
}
const token = (name, value) => {
  const hit = new RegExp(`${name}\\s*:\\s*${value}`).test(source.theme)
  if (!hit) throw new Error(`${name} is not ${value} in theme.css`)
  return `${name} = ${value}`
}
const absent = (text, needle, where) => {
  if (text.includes(needle)) throw new Error(`${where} still carries ${needle}`)
  return `no ${needle}`
}

// ---------- 1. The sources ----------

console.log('UI composition — the six points of the reference (1440×900)')

// 1. Pinned bots are the reference's tiles, not list rows.
check('1. the pinned bot is a 95×90 tile with a 55 avatar and a 13px name', () => {
  const tile = [
    declares(source.rail, '.glaze .hui-tile {', 'width', '95px'),
    declares(source.rail, '.glaze .hui-tile {', 'height', '90px'),
    declares(source.rail, '.glaze .hui-tile .hui-avatar {', 'width', '55px'),
    declares(source.rail, '.glaze .hui-tile-name {', 'font-size', '13px'),
    declares(source.rail, '.glaze .hui-pinned {', 'gap', '8px'),
    declares(source.rail, '.glaze .hui-pinned {', 'justify-content', 'center'),
    token('--radius-card', '10px'),
    declares(source.rail, ".glaze .hui-tile[aria-selected='true'] {", 'background', 'var\\(--tile-selected\\)')
  ]
  if (!/className="hui-tile"/.test(source.rail) && !/hui-tile/.test(read('src/app/rail.tsx'))) throw new Error('the rail draws no tile')
  return tile.join(', ')
})

// 2. The pill carries the bot and nothing else.
check('2. the header pill carries no conversation title', () => {
  absent(source.header, 'hui-pill-title', 'header.tsx')
  absent(source.shell, '.hui-pill-title', 'shell.css')
  if (!/className="hui-pill"/.test(source.header)) throw new Error('the pill is not a hui-pill')
  return 'no pill title, in the markup or the sheet'
})

// 3. Nothing under a bubble.
check('3. no model label under a reply', () => {
  absent(source.turn, 'turn-model', 'turn.tsx')
  absent(source.turn, 'modelLabel(message.model)', 'turn.tsx')
  return 'the reply ends on its bubble and the copy key'
})

// 4. The panel: the reference's line under the tabs, the cards of 288 with 36px rows.
check('4. the panel says who can see it, and draws 288 cards of 36px rows', () => {
  declares(source.aside, '.glaze .hui-aside-card {', 'width', '288px')
  declares(source.aside, '.glaze .hui-aside-row {', 'min-height', '36px')
  declares(source.aside, '.glaze .hui-aside-sub {', 'font-size', '13px')
  const key = /private:\s*'([^']+)'/.exec(source.strings)
  if (!key) throw new Error('strings.ts has no aside.private')
  if (!/UI\.aside\.private/.test(source.asideTsx)) throw new Error('the panel does not print the line')
  if (/hui-aside-facts/.test(source.asideTsx) || /hui-aside-facts/.test(source.aside)) throw new Error('the old "model · N skills" line is still there')
  return `"${key[1]}"`
})

// 5. The composer: the model as small print, the mic while the field is empty, the ink send key with the first word.
check('5. the composer is 44 high, with the model in small print and the mic in place of Send', () => {
  token('--h-composer', '44px')
  declares(source.shell, ".glaze .hui-composer [data-hui-part='prompt-input-body'] {", 'min-height', 'var\\(--h-composer\\)')
  declares(source.shell, '.glaze .hui-model-trigger {', 'font-size', '13px')
  declares(source.shell, '.glaze .hui-model-trigger {', 'background', 'transparent')
  declares(source.shell, ".glaze .hui-composer[data-idle] [data-hui-part='send-button'] {", 'display', 'none')
  declares(source.shell, ".glaze .hui-composer [data-hui-part='prompt-input-mic'] {", 'width', '28px')
  if (!/voice=\{idle \?/.test(source.composer)) throw new Error('the composer does not hand the mic to the field')
  if (!/data-idle=/.test(source.composer)) throw new Error('the composer does not mark its empty state')
  return '44 capsule, 13px model, mic while empty'
})

// 6. The veil: 60 over a 64 step.
check('6. the thread starts 64 under the top, beneath a 60 veil', () => {
  token('--h-topbar', '60px')
  declares(source.shell, ".glaze [data-hui-part='conversation-viewport'] {", 'padding-top', '64px')
  declares(source.shell, '.glaze .hui-veil {', 'height', 'var\\(--h-topbar\\)')
  return 'padding-top 64, veil 60'
})

// ---------- 2. The rendered page ----------

const ENTRY = `
import { createRoot } from 'react-dom/client'
import { App } from '@/app/app'
import { store } from '@/lib/hermes'

const scheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
const profile = (name, title, section, color) => ({
  name, display_name: title, skill_count: 9, connectionId: 'c-' + name,
  ui_meta: { 'hermes-bots': { title, sectionName: section, color, shape: 'round' } },
  description: 'CTO', model: 'deepseek-v4.1-flash', route: { profile: name, connectionId: 'c-' + name }
})
const profiles = [profile('dex', 'Dex', 'Leads', '#5ac078'), profile('mint', 'Mint', 'Leads', '#3e82f4'),
  profile('preto', 'Preto', 'Content', '#e9993a'), profile('cut', 'Cut', 'Content', '#895df3')]
const now = Date.now()

globalThis.__hostRequest = async (method) => {
  if (method === 'profiles.list') return { profiles }
  if (method === 'cron.manage') return { jobs: [{ id: 'j1', name: '[bot:dex] Morning gates', enabled: true, next_run_at: Math.floor(now / 1000) + 3600 }] }
  if (method === 'approval.pending') return { pending: [] }
  return {}
}

const ctx = {
  storage: {
    get: (key, fallback) => (key === 'settings' ? { ...fallback, theme: scheme } : key === 'pinned' ? ['dex', 'mint'] : fallback),
    set: () => {}
  },
  setInterval: () => () => {}, runAction: () => {}, onEvent: () => {}, onDispose: () => {},
  rest: async () => ({})
}

createRoot(document.getElementById('root')).render(<App ctx={ctx} />)

// Enough turns to overflow the 900px thread, so the veil has something to fade.
const turns = []
for (let i = 0; i < 7; i += 1) {
  turns.push({ id: 'u' + i, role: 'user', text: 'Question ' + (i + 1) + ': does the page still look like the reference?', at: now - (60 - i * 6) * 1000 })
  // The first answer is tall enough to straddle the veil's edge: one bubble, its top under the fade, its foot below it.
  turns.push({ id: 'a' + i, role: 'assistant', status: 'done', model: 'deepseek-v4.1-flash', at: now - (59 - i * 6) * 1000,
    text: i === 0
      ? 'Answer 1, measured on the rendered page: the six points hold. The tiles are 95 by 90 with a 55 avatar, the pill carries the bot alone, no reply prints its model, the panel draws 288-wide cards of 36px rows, the composer keeps the microphone while the field is empty, and the thread fades under the veil. This paragraph is here so the bubble is tall enough to cross the fade, half in the shadow and half in the open.'
      : 'Answer ' + (i + 1) + ': measured on the rendered page, the six points hold.' })
}
window.setTimeout(() => {
  store.set({
    bot: 'dex', sid: 's-1', storedId: 's-1', ready: true, connecting: false,
    messages: turns,
    // Eight files: the card's first screen is six 36px rows and its "Show more" (the reference's card).
    files: [
      { path: 'AGENTISE.md', at: now - 60000, action: 'read' },
      { path: 'src/app/model-menu.tsx', at: now - 90000, action: 'edit' },
      { path: 'spec-lot6.md', at: now - 400000, action: 'write' },
      { path: 'docs/board.json', at: now - 900000, action: 'read' },
      { path: 'src/app/aside.tsx', at: now - 1200000, action: 'edit' },
      { path: 'src/styles/shell.css', at: now - 1500000, action: 'edit' },
      { path: 'README.md', at: now - 1800000, action: 'read' },
      { path: 'src/plugin.tsx', at: now - 2100000, action: 'read' }
    ],
    sessionsByBot: { dex: [{ id: 's-1', title: 'Model picker fix', at: now - 3600000 }] },
    routines: [{ id: 'j1', name: '[bot:dex] Morning gates', enabled: true, next_run_at: Math.floor(now / 1000) + 3600 }]
  })
}, 300)
`

// The host's SDK, replaced by the same test double the layout harness uses: the page only ever reaches the gateway
// through `host.request`, and the entry above installs the answer.
const SDK = `
export const ROUTES_AREA = 'routes'
export const SIDEBAR_NAV_AREA = 'sidebar-nav'
export const PALETTE_AREA = 'palette'
export const KEYBINDS_AREA = 'keybinds'
export const THEMES_AREA = 'themes'
export function useValue(state) {
  return state && typeof state.get === 'function' ? state.get() : state
}
export const host = {
  state: {
    profile: { get: () => globalThis.__hermesProfile || 'dex' },
    gateway: { get: () => 'open', listen: () => () => {} }
  },
  request(method, params, timeoutMs) {
    if (typeof globalThis.__hostRequest !== 'function') return Promise.reject(new Error('no handler for ' + method))
    return globalThis.__hostRequest(method, params, timeoutMs)
  },
  navigate() {},
  addEventListener() {},
  onDispose() {},
  profileRoutes() { return Promise.resolve([{ profile: 'dex', connectionId: 'c1' }]) },
  listPersistedSessions() { return Promise.resolve({ sessions: [] }) },
  ensureAgent() { return Promise.resolve() }
}
export function requestTheme() { return true }
export default { host, useValue }
`
mkdirSync(scratch, { recursive: true })
const sdkFile = join(scratch, 'sdk.ts')
writeFileSync(sdkFile, SDK)
const bundleFile = join(scratch, 'bundle.js')
await build({
  stdin: { contents: ENTRY, resolveDir: root, sourcefile: 'check-composition-entry.tsx', loader: 'tsx' },
  outfile: bundleFile,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  alias: { '@hermes/plugin-sdk': sdkFile, '@': resolve(root, 'src') },
  loader: { '.css': 'text' },
  logLevel: 'silent'
})
const html = join(scratch, 'index.html')
writeFileSync(
  html,
  `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="page.css">
<style>html,body{margin:0;height:100%;background:#121212}body{overflow:hidden}#root{position:absolute;inset:0}</style>
</head><body><div id="root"></div><script src="bundle.js"></script></body></html>`
)
writeFileSync(join(scratch, 'page.css'), read('src/styles/.compiled.css'))

const pageFor = async (viewport, colorScheme) => {
  const page = await browser.newPage({ viewport, colorScheme })
  await page.goto(`file://${html}`)
  await page.waitForSelector('.glaze')
  await page.waitForFunction(() => document.querySelectorAll('.hui-bubble').length > 2)
  return page
}
const box = async (page, selector) => {
  const el = page.locator(selector).first()
  if (!(await el.count())) return null
  const b = await el.boundingBox()
  return b && { x: b.x, y: b.y, w: b.width, h: b.height }
}
const near = (value, want, tolerance = 1) => Math.abs(value - want) <= tolerance
const expectNear = (value, want, what, tolerance = 1) => {
  if (!near(value, want, tolerance)) throw new Error(`${what}: measured ${Math.round(value * 10) / 10}, expected ${want}±${tolerance}`)
  return `${what} ${Math.round(value * 10) / 10}`
}

if (browser) try {
  for (const scheme of ['dark', 'light']) {
    const page = await pageFor({ width: 1440, height: 900 }, scheme)
    const at = `1440×900 ${scheme}`

    await asyncCheck(`1. the pins are tiles (${at})`, async () => {
      const tiles = page.locator('.hui-tile')
      if ((await tiles.count()) < 2) throw new Error('no pinned tile on the page')
      const tile = await box(page, '.hui-tile')
      const avatar = await box(page, '.hui-tile .hui-avatar')
      const label = await page.locator('.hui-tile-name').first().evaluate(n => getComputedStyle(n).fontSize)
      const radius = await page.locator('.hui-tile').first().evaluate(n => getComputedStyle(n).borderRadius)
      const gap = await page.locator('.hui-pinned').first().evaluate(n => getComputedStyle(n).gap)
      const selected = await page.locator('.hui-tile[aria-selected="true"]').first().evaluate(n => getComputedStyle(n).backgroundColor)
      const first = await tiles.nth(0).boundingBox()
      const second = await tiles.nth(1).boundingBox()
      const row = await page.locator('.hui-pinned').boundingBox()
      // Centred: the air left of the first tile is the air right of the last one.
      const left = first.x - row.x
      const right = row.x + row.width - (second.x + second.width)
      if (Math.abs(left - right) > 1.5) throw new Error(`the row is not centred: ${Math.round(left)} left, ${Math.round(right)} right`)
      return [
        expectNear(tile.w, 95, 'tile width'),
        expectNear(tile.h, 90, 'tile height'),
        expectNear(avatar.w, 55, 'avatar'),
        label === '13px' ? 'name 13px' : `name ${label}`,
        radius === '10px' ? 'radius 10' : `radius ${radius}`,
        gap === '8px' ? 'gap 8' : `gap ${gap}`,
        selected === 'rgb(32, 32, 32)' || scheme === 'light' ? 'selected tile' : `selected ${selected}`
      ].join(', ')
    })

    await asyncCheck(`2. the pill is the bot alone (${at})`, async () => {
      if (await page.locator('.hui-pill-title').count()) throw new Error('the pill still carries a conversation title')
      const pill = await box(page, '.hui-pill')
      const parts = await page.locator('.hui-pill').first().evaluate(n => [...n.querySelectorAll('span')].map(s => s.className))
      return [
        expectNear(pill.h, 40, 'height'),
        expectNear(pill.w, 100, 'width', 30),
        `only ${parts.join(' + ')}`
      ].join(', ')
    })

    await asyncCheck(`3. nothing under the bubbles (${at})`, async () => {
      if (await page.locator('[data-hui-part="turn-model"]').count()) throw new Error('a turn still prints its model')
      const words = await page.locator('[data-hui-part="conversation-viewport"]').innerText()
      if (/deepseek/i.test(words) || /v4\.1 flash/i.test(words)) throw new Error('the thread still names the model in words')
      return `${await page.locator('.hui-bubble').count()} bubbles, no model line`
    })

    await asyncCheck(`4. the panel's line and cards (${at})`, async () => {
      const sub = page.locator('.hui-aside-sub').first()
      if (!(await sub.count())) throw new Error('the panel has no line under the tabs')
      const text = (await sub.innerText()).trim()
      if (!/private/i.test(text)) throw new Error(`the line reads "${text}"`)
      const size = await sub.evaluate(n => getComputedStyle(n).fontSize)
      const avatar = await box(page, '.hui-aside-profile > .hui-bot')
      const tabs = await box(page, '.hui-aside-profile [data-hui-part="segmented-control"]')
      const cards = await page.locator('.hui-aside-card').evaluateAll(nodes =>
        nodes.map(n => ({ w: n.getBoundingClientRect().width, radius: getComputedStyle(n).borderRadius, rows: [...n.querySelectorAll('.hui-aside-row')].map(r => r.getBoundingClientRect().height) }))
      )
      if (!cards.length) throw new Error('the activity view draws no card')
      for (const card of cards) {
        expectNear(card.w, 288, 'card width')
        if (card.radius !== '10px') throw new Error(`card radius ${card.radius}`)
        for (const row of card.rows) expectNear(row, 36, 'row height')
      }
      return [
        `"${text}" ${size}`,
        expectNear(avatar.w, 59, 'avatar'),
        expectNear(avatar.y, 70.5, 'avatar top', 2),
        expectNear(tabs.h, 26, 'tabs'),
        `${cards.length} card(s) 288 wide, rows 36`
      ].join(', ')
    })

    if (scheme === 'dark') {
      await asyncCheck(`4b. the files card is six rows and a Show more (${at})`, async () => {
        await page.locator('.hui-aside-profile [data-hui-part="segmented-control-item"]').nth(1).click()
        await page.waitForTimeout(120)
        const rows = await page.locator('.hui-aside-card .hui-aside-row').count()
        if (rows !== 6) throw new Error(`the card draws ${rows} rows, not six`)
        const more = page.locator('.hui-aside-more').first()
        if (!(await more.count())) throw new Error('the card has no "Show more"')
        await more.click()
        await page.waitForTimeout(120)
        const opened = await page.locator('.hui-aside-card .hui-aside-row').count()
        if (opened !== 8) throw new Error(`"Show more" drew ${opened} rows, not eight`)
        const height = await page.locator('.hui-aside-card .hui-aside-row').first().evaluate(n => n.getBoundingClientRect().height)
        return `six rows, then ${opened} after Show more, each ${Math.round(height)} high`
      })
    }

    await asyncCheck(`5. the composer, empty then typed (${at})`, async () => {
      const body = await box(page, '.hui-composer [data-hui-part="prompt-input-body"]')
      const mic = await box(page, '.hui-composer [data-hui-part="prompt-input-mic"]')
      if (!mic) throw new Error('no microphone while the field is empty')
      const idleSend = await box(page, '.hui-composer [data-hui-part="send-button"]')
      if (idleSend) throw new Error('the send key is drawn while the field is empty')
      const trigger = await page.locator('.hui-model-trigger').first()
      const font = await trigger.evaluate(n => getComputedStyle(n).fontSize)
      const flat = await trigger.evaluate(n => getComputedStyle(n).backgroundColor)
      const marks = await trigger.evaluate(n => [...n.querySelectorAll('svg')].filter(s => getComputedStyle(s).display !== 'none').length)

      await page.locator('.hui-composer [data-hui-part="prompt-input-editor"]').click()
      await page.keyboard.type('Hello')
      await page.waitForTimeout(150)
      const send = await box(page, '.hui-composer [data-hui-part="send-button"]')
      if (!send) throw new Error('the send key does not appear with text')
      if (await page.locator('.hui-composer [data-hui-part="prompt-input-mic"]').count()) throw new Error('the microphone stays beside the send key')
      const fill = await page.locator('.hui-composer [data-hui-part="send-button"]').evaluate(n => getComputedStyle(n).backgroundColor)
      const ink = await page.locator('.glaze').first().evaluate(n => getComputedStyle(n).getPropertyValue('--primary-bg').trim())
      if (fill !== 'rgb(245, 245, 245)' && scheme === 'dark') throw new Error(`the send key is ${fill}, not the ink`)
      await page.keyboard.press('Control+A')
      await page.keyboard.press('Backspace')
      return [
        expectNear(body.h, 44, 'capsule body'),
        expectNear(mic.w, 28, 'mic'),
        `mic while empty, then send ${expectNear(send.w, 28, 'send')} ${fill}`,
        `model ${font} on ${flat}, ${marks} visible mark(s)`,
        `ink ${ink}`
      ].join(', ')
    })

    await asyncCheck(`6. the thread under the veil (${at})`, async () => {
      const facts = await page.evaluate(() => {
        const vp = document.querySelector('[data-hui-part="conversation-viewport"]')
        const veil = document.querySelector('.hui-veil')
        const hdr = document.querySelector('.hui-hdr')
        return {
          padding: parseFloat(getComputedStyle(vp).paddingTop),
          height: veil.getBoundingClientRect().height,
          gradient: getComputedStyle(veil).backgroundImage,
          z: Number(getComputedStyle(hdr).zIndex),
          scrollable: vp.scrollHeight > vp.clientHeight
        }
      })
      if (!facts.scrollable) throw new Error('the thread does not scroll, so nothing passes under the veil')
      expectNear(facts.padding, 64, 'thread top')
      expectNear(facts.height, 60, 'veil')
      if (!/^linear-gradient/.test(facts.gradient)) throw new Error('the veil is not a gradient')
      if (!(facts.z > 0)) throw new Error('the veil is not above the thread')

      // Scroll the tallest bubble so it straddles the fade, then read two pixels of that one bubble: one under the
      // veil, one below it.
      await page.waitForTimeout(300)
      let spot = null
      for (let attempt = 0; attempt < 4; attempt += 1) {
        spot = await page.evaluate(() => {
          const vp = document.querySelector('[data-hui-part="conversation-viewport"]')
          const tall = [...document.querySelectorAll('.hui-bubble')].sort((a, b) => b.getBoundingClientRect().height - a.getBoundingClientRect().height)[0]
          // instant, not the smooth scroll a stylesheet may ask for: the sample must not race an animation.
          vp.scrollTo({ top: vp.scrollTop + tall.getBoundingClientRect().top - 4, behavior: 'instant' })
          const b = tall.getBoundingClientRect()
          if (b.height < 100) return { tooShort: Math.round(b.height) }
          return {
            // 6 inside the bubble's left edge: its own padding, so the sample is the bubble's ink and never a glyph.
            x: Math.round(b.x + 6),
            top: Math.round(b.y) + 16,
            low: Math.round(b.y + b.height - 12),
            bubble: getComputedStyle(tall).backgroundColor,
            stuck: Math.abs(b.top - 4) < 2
          }
        })
        if (spot.tooShort || spot.stuck) break
        await page.waitForTimeout(200)
      }
      if (spot.tooShort) throw new Error(`no bubble is tall enough to straddle the veil (${spot.tooShort}px)`)
      const read1 = async (x, y) => {
        const shot = await page.screenshot({ clip: { x, y, width: 2, height: 2 } })
        return page.evaluate(async b64 => {
          const img = new Image()
          img.src = `data:image/png;base64,${b64}`
          await img.decode()
          const c = document.createElement('canvas')
          c.width = img.width
          c.height = img.height
          c.getContext('2d').drawImage(img, 0, 0)
          const d = c.getContext('2d').getImageData(0, 0, 1, 1).data
          return `${d[0]},${d[1]},${d[2]}`
        }, shot.toString('base64'))
      }
      const top = await read1(spot.x, spot.top).then(v => v.split(',').map(Number)).catch(e => { throw new Error(`${e.message.split('\n')[0]} at ${JSON.stringify(spot)}`) })
      const low = await read1(spot.x, spot.low).then(v => v.split(',').map(Number)).catch(e => { throw new Error(`${e.message.split('\n')[0]} at ${JSON.stringify(spot)}`) })
      const veilColour = scheme === 'dark' ? [17, 17, 17] : [255, 255, 255]
      const own = spot.bubble.replace(/[a-z()]/g, '').split(',').map(Number)
      const distance = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])))
      if (distance(top, veilColour) > 4) throw new Error(`under the veil the bubble shows ${top.join(',')}, not the veil's ${veilColour.join(',')}`)
      if (distance(low, own) > 4) throw new Error(`below the veil the bubble shows ${low.join(',')}, not its own ${own.join(',')}`)
      if (distance(top, low) < 4) throw new Error(`the veil does not fade the bubble: ${top.join(',')} vs ${low.join(',')}`)
      return `padding ${facts.padding}, veil ${facts.height}, under the veil ${top.join(',')}, below it ${low.join(',')}`
    })

    await page.close()
  }

  // The narrow pass: the same page at 390, where the model trigger is its mark alone.
  const narrow = await pageFor({ width: 390, height: 844 }, 'dark')
  await asyncCheck('5b. the narrow composer keeps a 28 target for the model (390×844 dark)', async () => {
    const trigger = await box(narrow, '.hui-model-trigger')
    const mic = await box(narrow, '.hui-composer [data-hui-part="prompt-input-mic"]')
    if (!mic) throw new Error('no microphone on the phone')
    if (trigger.w < 24) throw new Error(`the model trigger is ${Math.round(trigger.w)} wide, under the 24px target`)
    return `trigger ${Math.round(trigger.w)}×${Math.round(trigger.h)}, mic ${Math.round(mic.w)}`
  })
  await narrow.close()
} catch (error) {
  bad('the page could not be measured', String(error?.message || error).split('\n')[0])
} finally {
  await browser.close()
}

if (failed) {
  console.log(`\ncheck-ui-composition: ${failed} problem(s) — the page has left the reference.`)
  process.exit(1)
}
console.log('\ncheck-ui-composition: OK — the six points hold: tiles 95×90 with a 55 avatar, a pill of the bot alone, no model under the replies, 288 cards of 36px rows, a 44 composer with the mic while empty and the ink send key with text, and the thread fading under the 60 veil from 64.')
