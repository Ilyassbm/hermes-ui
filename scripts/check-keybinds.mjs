// The keybind gate: every default combo `src/plugin.tsx` registers must be a combo the app does not already own,
// and no two of our actions may share one.
//
// Why this exists (lot 10). `hermes-ui.bot1..9` shipped on ⌘⌥1…⌘⌥9, and those chords changed profile instead of bot
// in the real app. The app's own defaults take them: `profile.switch.10..18` are `mod+alt+1..9` (actions.ts,
// `comboForSlot`: slots 10-18 are `mod+alt+${slot - 9}`), and `$comboIndex` builds its list built-ins first —
// `allKeybindActions()` returns `[...KEYBIND_ACTIONS, ...contributed]` (actions.ts) and the dispatcher runs the first
// action of the list (store/keybinds.ts, "The first action runs"). A contributed default can therefore never win a
// chord the app already spends.
//
// `apps/` is not in this repository, so the app's list is copied below, generated combos expanded. Source:
// /opt/hermes/apps/desktop/src/lib/keybinds/actions.ts (Hermes desktop 0.0.0, snapshot read on 2026-11-08),
// plus KEYBIND_READONLY from the same file. When the desktop's defaults move, refresh this table with the greps the
// README's Dev section documents.
//
//   node scripts/check-keybinds.mjs                  # src/plugin.tsx
//   node scripts/check-keybinds.mjs --file x.tsx     # another file (a before/after check)
//   node scripts/check-keybinds.mjs --list           # print our combos and exit
//
// Exits 1 with one line per collision, 0 otherwise. Run by `npm run build`.
import { readFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_FILE = resolve(ROOT, 'src/plugin.tsx')

/** The app's rebindable defaults, every platform variant: combo → action id. */
export const NATIVE = new Map()

function claim(action, combos) {
  for (const combo of combos) NATIVE.set(canonical(combo), action)
}

// composer
claim('composer.focus', ['/', 'enter'])
claim('composer.modelPicker', ['mod+shift+m'])
// `isMacPlatform() ? ['ctrl+b'] : ['mod+alt+v']`
claim('composer.voice', ['ctrl+b', 'mod+alt+v'])
// profiles — `comboForSlot`: slot 1-9 = mod+N, slot 10-18 = mod+alt+N
claim('profile.default', ['mod+d'])
claim('profile.next', ['mod+shift+]'])
claim('profile.prev', ['mod+shift+['])
claim('profile.toggleAll', ['mod+shift+0'])
for (let slot = 1; slot <= 18; slot++) {
  claim(`profile.switch.${slot}`, [slot <= 9 ? `mod+${slot}` : `mod+alt+${slot - 9}`])
}
for (let slot = 1; slot <= 9; slot++) {
  claim(`view.tabSlot.${slot}`, [`mod+${slot}`])
  claim(`session.slot.${slot}`, [`ctrl+${slot}`])
}
// session — hostAction(native, { mac, other })
claim('session.new', ['mod+n', 'mod+ctrl+n', 'alt+n'])
claim('session.newTab', ['mod+t', 'mod+ctrl+t', 'alt+t'])
claim('session.newWindow', ['mod+shift+n', 'mod+ctrl+shift+n', 'alt+shift+n'])
claim('session.next', ['ctrl+tab', 'ctrl+pagedown', 'mod+ctrl+]', 'alt+]'])
claim('session.prev', ['ctrl+shift+tab', 'ctrl+pageup', 'mod+ctrl+[', 'alt+['])
claim('session.focusSearch', ['mod+shift+f'])
claim('conversation.scrollPageUp', ['pageup'])
claim('conversation.scrollPageDown', ['pagedown'])
claim('workspace.newWorktree', ['mod+shift+b'])
claim('workspace.openFolder', ['mod+o'])
// navigation
claim('nav.commandPalette', ['mod+k', 'mod+p'])
claim('nav.commandCenter', ['mod+.'])
claim('nav.settings', ['mod+,'])
// view
claim('view.toggleSidebar', ['mod+b'])
claim('view.toggleRightSidebar', ['mod+j'])
claim('view.toggleStatusbar', ['mod+shift+s'])
claim('view.toggleTabStrip', ['mod+alt+t'])
claim('view.toggleReview', ['mod+g'])
claim('view.showBrowser', ['mod+shift+l'])
claim('view.toggleHud', ['mod+shift+h'])
claim('view.showTerminal', ['ctrl+`'])
claim('view.newTerminal', ['ctrl+shift+`'])
claim('view.nextTerminal', ['ctrl+shift+down'])
claim('view.prevTerminal', ['ctrl+shift+up'])
claim('view.closeTerminal', ['ctrl+shift+w', 'alt+shift+w'])
claim('view.flipPanes', ['mod+\\'])
claim('view.closeTab', ['mod+w', 'mod+ctrl+w', 'alt+w'])
claim('view.reopenTab', ['mod+shift+t', 'mod+ctrl+shift+t', 'alt+shift+t'])
claim('view.findInPage', ['mod+f'])
claim('appearance.toggleMode', ['shift+x'])
claim('keybinds.openPanel', ['mod+/'])
// KEYBIND_READONLY: fixed chords, shown read-only in the app's panel. They are claimed too — a shortcut that lands on
// one of them is a shortcut nobody can use.
claim('composer.send', ['enter'])
claim('composer.newline', ['shift+enter'])
claim('composer.steer', ['enter'])
claim('composer.queue', ['mod+enter'])
claim('composer.sendQueued', ['mod+shift+k'])
claim('composer.mention', ['@'])
claim('composer.slash', ['/'])
claim('composer.help', ['?'])
claim('composer.history', ['up', 'down'])
claim('composer.cancel', ['escape'])
claim('composer.focus(readonly)', ['mod+l'])
claim('view.selectionToComposer', ['mod+l'])
claim('view.terminalCopy', ['mod+c', 'mod+shift+c'])
claim('view.terminalPaste', ['mod+v', 'mod+shift+v'])
claim('hud.snapToPointer', ['mod+shift+g'])

/** One spelling per chord: modifiers in a fixed order, then the key, lowercased. */
export function canonical(combo) {
  const parts = String(combo).trim().toLowerCase().split('+').filter(Boolean)
  if (parts.length < 2) return parts.join('+')
  const key = parts.pop()
  const order = ['mod', 'ctrl', 'alt', 'shift']
  return [...parts.sort((a, b) => order.indexOf(a) - order.indexOf(b)), key].join('+')
}

/**
 * Every `defaults: [...]` in a source, expanded. A template literal is expanded over 1..9: the plugin writes its
 * ten bot combos once, as `defaults: [\`alt+\${n}\`]` inside an Array.from.
 */
export function combosOf(source) {
  const found = []
  const lineAt = index => source.slice(0, index).split('\n').length
  const pattern = /defaults:\s*\[([^\]]*)\]/g
  let match
  while ((match = pattern.exec(source))) {
    const line = lineAt(match.index)
    for (const token of match[1].match(/['"`][^'"`]*['"`]/g) || []) {
      const literal = token.slice(1, -1)
      if (literal.includes('${n}')) {
        for (let n = 1; n <= 9; n++) found.push({ combo: literal.replace('${n}', String(n)), line })
      } else if (literal) {
        found.push({ combo: literal, line })
      }
    }
  }
  return found
}

/** Collisions of a source's defaults with the app's, and with each other. */
export function checkKeybinds(source) {
  const combos = combosOf(source)
  const problems = []
  const seen = new Map()
  for (const entry of combos) {
    const key = canonical(entry.combo)
    const native = NATIVE.get(key)
    if (native) {
      problems.push({ line: entry.line, combo: entry.combo, message: `is the app's own ${native} default` })
    }
    const first = seen.get(key)
    if (first) {
      problems.push({
        line: entry.line,
        combo: entry.combo,
        message: `is already the plugin's default on line ${first}`
      })
    } else {
      seen.set(key, entry.line)
    }
  }
  return { combos, problems }
}

function main() {
  const args = process.argv.slice(2)
  const fileIndex = args.indexOf('--file')
  const file = fileIndex === -1 ? DEFAULT_FILE : resolve(args[fileIndex + 1] || DEFAULT_FILE)
  const { combos, problems } = checkKeybinds(readFileSync(file, 'utf8'))
  const name = relative(ROOT, file) || file

  if (args.includes('--list')) {
    for (const entry of combos) console.log(`${name}:${entry.line}  ${entry.combo}`)
    return 0
  }

  if (problems.length) {
    console.error(`keybinds: ${problems.length} problem(s) in ${name} — the app would win these chords`)
    for (const problem of problems) console.error(`  ${name}:${problem.line}  ${problem.combo} ${problem.message}`)
    return 1
  }

  console.log(
    `keybinds: ${name} — ${combos.length} default combo(s), none of the app's ${NATIVE.size} claimed chords, no duplicate`
  )
  return 0
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exit(main())
}
