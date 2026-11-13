#!/usr/bin/env node
// Runs lintapple's page check against the rendered Hermes UI page.
//
//   npm run lint:ui -- --url http://localhost:3000
//
// The policy is ui-policy.json at the repository root: this script never invents a rule. It launches the box's
// Chromium through Playwright (no browser download), opens the page at one viewport and one colour scheme, waits
// for the selector that marks the page ready, then runs `checkPage` from lintapple on it.
//
// Exit codes: 0 passed, 1 findings, 2 the check did not finish.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { checkPage, validatePolicy } from 'lintapple'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const DEFAULT_CHROME = '/opt/hermes/tools/chromium-1208/chrome-linux64/chrome'

const USAGE = `Check a rendered Hermes UI page against ui-policy.json with lintapple.

Usage: npm run lint:ui -- --url <url> [options]

Options:
  --url <url>            Page to check (required).
  --out <file>           JSON report path, relative to the repository (default cache/lint-ui.json).
  --viewport <WxH>       1440x900 or 390x844 (default 1440x900).
  --viewport(s) / --widths  one viewport, or a comma list of widths the default height is used for: --widths 1440,390
  --scheme <dark|light>  Colour scheme of the context (default dark).
  --schemes <a,b>        Every scheme in the list, one run each: --schemes dark,light
  --ready <selector>     Visible once the page is ready (default .glaze).
  --keep                 Keep the screenshot next to the JSON report.
  -h, --help             Print this help and exit, without a browser.

The Chromium binary is ${DEFAULT_CHROME}; set HUI_CHROME to use another one.
Exit codes: 0 passed, 1 findings, 2 the check did not finish.`

class UsageError extends Error {}

function parseViewport(value) {
  const match = /^(\d+)x(\d+)$/.exec(value)
  if (!match) throw new UsageError(`--viewport wants WIDTHxHEIGHT, not "${value}".`)
  const width = Number(match[1])
  const height = Number(match[2])
  if (width < 1 || height < 1) throw new UsageError('--viewport values must be positive.')
  return { width, height }
}

function parseWidths(value) {
  return value.split(',').map(part => part.trim()).filter(Boolean).map(part => {
    const width = Number(part.replace(/x.*$/, ''))
    if (!Number.isFinite(width) || width < 1) throw new UsageError(`--widths wants numbers, not "${part}".`)
    return { width, height: width <= 600 ? 844 : 900 }
  })
}

function parseSchemes(value) {
  const list = value.split(',').map(part => part.trim()).filter(Boolean)
  for (const scheme of list) if (!['dark', 'light'].includes(scheme)) throw new UsageError(`--schemes wants dark or light, not "${scheme}".`)
  if (!list.length) throw new UsageError('--schemes needs at least one scheme.')
  return list
}

function parseArgs(argv) {
  const args = { out: resolve(root, 'cache/lint-ui.json'), viewport: { width: 1440, height: 900 }, scheme: 'dark', ready: '.glaze', keep: false }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    const value = () => {
      const next = argv[i + 1]
      if (next === undefined || next.startsWith('--')) throw new UsageError(`${arg} needs a value.`)
      i += 1
      return next
    }
    if (arg === '-h' || arg === '--help') args.help = true
    else if (arg === '--keep') args.keep = true
    else if (arg === '--url') args.url = value()
    else if (arg.startsWith('--url=')) args.url = arg.slice('--url='.length)
    else if (arg === '--out') args.out = resolve(root, value())
    else if (arg.startsWith('--out=')) args.out = resolve(root, arg.slice('--out='.length))
    else if (arg === '--viewport') args.viewport = parseViewport(value())
    else if (arg.startsWith('--viewport=')) args.viewport = parseViewport(arg.slice('--viewport='.length))
    else if (arg === '--scheme') args.scheme = value()
    else if (arg.startsWith('--scheme=')) args.scheme = arg.slice('--scheme='.length)
    else if (arg === '--schemes') args.schemes = parseSchemes(value())
    else if (arg.startsWith('--schemes=')) args.schemes = parseSchemes(arg.slice('--schemes='.length))
    else if (arg === '--widths') args.viewports = parseWidths(value())
    else if (arg.startsWith('--widths=')) args.viewports = parseWidths(arg.slice('--widths='.length))
    else if (arg === '--viewports') args.viewports = value().split(',').map(part => parseViewport(part.trim()))
    else if (arg.startsWith('--viewports=')) args.viewports = arg.slice('--viewports='.length).split(',').map(part => parseViewport(part.trim()))
    else if (arg === '--ready') args.ready = value()
    else if (arg.startsWith('--ready=')) args.ready = arg.slice('--ready='.length)
    else throw new UsageError(`Unknown argument: ${arg}`)
  }
  if (args.help) return args
  if (!args.url) throw new UsageError('--url is required.')
  if (!['dark', 'light'].includes(args.scheme)) throw new UsageError(`--scheme wants dark or light, not "${args.scheme}".`)
  if (!args.out.endsWith('.json')) throw new UsageError('--out wants a .json file.')
  try {
    const parsed = new URL(args.url)
    if (!['http:', 'https:', 'file:'].includes(parsed.protocol)) throw new Error()
  } catch {
    throw new UsageError(`--url wants an http, https or file URL, not "${args.url}".`)
  }
  return args
}

/** The policy file is the only source of rules: a bad one stops the check before a browser opens. */
function readPolicy() {
  const file = resolve(root, 'ui-policy.json')
  try {
    return { file, policy: validatePolicy(JSON.parse(readFileSync(file, 'utf8'))) }
  } catch (error) {
    throw new Error(`ui-policy.json is not a valid lintapple policy: ${error.message}`)
  }
}

function printReport(report, { url, viewport, scheme, out, screenshot }) {
  const findings = report.findings
  console.log(`lintapple — ${url}`)
  console.log(`${viewport.width}x${viewport.height} · ${scheme} · viewport ${report.frameCoverage.checked.path}`)
  console.log(`elements ${report.elements} · controls ${report.controls} · numeric ${report.numericElements} · alignment groups ${report.alignmentGroups}`)
  const failed = findings.filter(finding => finding.status !== 'unresolved').length
  const unresolved = findings.length - failed
  console.log(`findings ${findings.length} (failed ${failed}, unresolved ${unresolved}) · suppressed ${report.suppressed.length}`)
  if (report.controlContentCoverage.unmeasured.length) console.log(`control content unmeasured ${report.controlContentCoverage.unmeasured.length}`)
  if (report.accessibilityCoverage.tooltips?.unmeasured.length) console.log(`tooltips unmeasured ${report.accessibilityCoverage.tooltips.unmeasured.length}`)

  const byRule = new Map()
  for (const finding of findings) {
    const list = byRule.get(finding.rule) ?? []
    list.push(finding)
    byRule.set(finding.rule, list)
  }
  for (const [rule, list] of [...byRule].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))) {
    console.log(`\n${rule} (${list.length})`)
    for (const finding of list) {
      const state = finding.status === 'unresolved' ? ' [unresolved]' : ''
      console.log(`  ${finding.selector}${state}`)
      console.log(`    measured ${finding.actual} — expected ${finding.expected}`)
      if (finding.relatedSelector) console.log(`    with ${finding.relatedSelector}`)
      console.log(`    fix: ${finding.fix}`)
    }
  }
  console.log(`\nJSON: ${out}`)
  if (screenshot) console.log(`Screenshot: ${screenshot}`)
}

async function main() {
  let args
  try {
    args = parseArgs(process.argv.slice(2))
  } catch (error) {
    console.error(error instanceof UsageError ? `${error.message}\n\n${USAGE}` : error.message)
    return 2
  }
  if (args.help) {
    console.log(USAGE)
    return 0
  }

  let policy
  try {
    policy = readPolicy()
  } catch (error) {
    console.error(error.message)
    return 2
  }

  // One run per (viewport, scheme): --widths and --schemes turn the one check into the matrix the release gate wants.
  // The report of each run goes to its own file (`<out>` gets a suffix when there is more than one).
  const viewports = args.viewports ?? [args.viewport]
  const schemes = args.schemes ?? [args.scheme]
  const runs = viewports.flatMap(viewport => schemes.map(scheme => ({ viewport, scheme })))

  let browser
  let failed = 0
  try {
    browser = await chromium.launch({
      executablePath: process.env.HUI_CHROME || DEFAULT_CHROME,
      args: ['--no-sandbox']
    })
    for (const { viewport, scheme } of runs) {
      const out = runs.length === 1 ? args.out : args.out.replace(/\.json$/, `-${viewport.width}x${viewport.height}-${scheme}.json`)
      const context = await browser.newContext({ viewport, colorScheme: scheme })
      const page = await context.newPage()
      await page.goto(args.url, { waitUntil: 'load', timeout: 30000 })
      await page.waitForSelector(args.ready, { state: 'visible', timeout: 30000 })
      // Measure a settled page: the entrances are CSS animations, and a check taken mid-fade reads a blended text
      // colour (a message at 40% of its fade measured #666 on #121212 instead of #f5f5f5). Fonts first, then every
      // running animation, with a 3 s ceiling for a page that loops one on purpose.
      await page
        .evaluate(async () => {
          await document.fonts?.ready
          const until = performance.now() + 3000
          while (performance.now() < until) {
            if (!document.getAnimations().some(animation => animation.playState === 'running')) break
            await new Promise(done => setTimeout(done, 100))
          }
        })
        .catch(() => {})
      const report = await checkPage(page, policy.policy)

      mkdirSync(dirname(out), { recursive: true })
      const checkedAt = new Date().toISOString()
      writeFileSync(out, `${JSON.stringify({ url: args.url, viewport, colorScheme: scheme, ready: args.ready, checkedAt, policy: 'ui-policy.json', report }, null, 2)}\n`)

      let screenshot
      if (args.keep) {
        screenshot = out.replace(/\.json$/, '') + '.png'
        await page.screenshot({ path: screenshot })
      }

      printReport(report, { url: args.url, viewport, scheme, out, screenshot })
      console.log('')
      if (report.findings.length) failed += 1
      await context.close()
    }
    return failed ? 1 : 0
  } catch (error) {
    console.error(`The check did not finish: ${error.message}`)
    return 2
  } finally {
    await browser?.close()
  }
}

process.exitCode = await main()
