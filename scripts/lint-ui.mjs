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
  --scheme <dark|light>  Colour scheme of the context (default dark).
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

  let browser
  try {
    browser = await chromium.launch({
      executablePath: process.env.HUI_CHROME || DEFAULT_CHROME,
      args: ['--no-sandbox']
    })
    const context = await browser.newContext({ viewport: args.viewport, colorScheme: args.scheme })
    const page = await context.newPage()
    await page.goto(args.url, { waitUntil: 'load', timeout: 30000 })
    await page.waitForSelector(args.ready, { state: 'visible', timeout: 30000 })
    const report = await checkPage(page, policy.policy)

    mkdirSync(dirname(args.out), { recursive: true })
    const checkedAt = new Date().toISOString()
    writeFileSync(args.out, `${JSON.stringify({ url: args.url, viewport: args.viewport, colorScheme: args.scheme, ready: args.ready, checkedAt, policy: 'ui-policy.json', report }, null, 2)}\n`)

    let screenshot
    if (args.keep) {
      screenshot = args.out.replace(/\.json$/, '') + '.png'
      await page.screenshot({ path: screenshot })
    }

    printReport(report, { url: args.url, viewport: args.viewport, scheme: args.scheme, out: args.out, screenshot })
    return report.findings.length ? 1 : 0
  } catch (error) {
    console.error(`The check did not finish: ${error.message}`)
    return 2
  } finally {
    await browser?.close()
  }
}

process.exitCode = await main()
