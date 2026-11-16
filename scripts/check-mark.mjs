// Guards the bot's mark: its drawing, where a bot's look comes from, and how a changed look is saved.
//
// The mark is one flat body and two capsule eyes, drawn by `src/lib/mark.ts` and mounted by `BotAvatar`. A bot's look is
// three small words (shape, eyes, colour). It comes from, in this order: what the person saved for it in this page
// (`ui_meta['hermes-ui'].mark` of the profile), what Hermes' own roster says (`ui_meta['hermes-bots'].color/.shape`),
// then its name. Saving goes through `profiles.configure` — the call Hermes' own roster uses — into the key this plugin
// owns, with the per-key revision it was read at, and retries once when another writer got there first.
//
// What it does, with no browser and no gateway (esbuild bundles the real modules for node, `host.request` is handed to a
// recorder):
//   1. checks every shape is a closed, in-box, distinct path and every pair of eyes is mirrored and in-box;
//   2. checks what a profile may carry is validated on the way in (unknown shape, non-hex colour, junk);
//   3. mounts the avatar with React's server renderer: flat (no gradient, no filter), two eyes, ink readable on the body;
//   4. checks the order the three sources are read in, and that a name alone always gives the same look;
//   5. captures the `profiles.configure` payload of a save, a reset, a conflict, and a refusal.
//
//   node scripts/check-mark.mjs
//
// Exits 1 with one line per failed check, 0 otherwise. Run by `npm run build`.
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, 'hui-mark.bundle.mjs')

const ENTRY = `
import * as mark from '@/lib/mark'
import { botLook, setChosenLooks } from '@/lib/labels'
import { bindContext, saveMark, store } from '@/lib/hermes'
import { BotAvatar } from '@/app/bot-avatar'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
export { mark, botLook, setChosenLooks, bindContext, saveMark, store }
export const render = props => renderToStaticMarkup(React.createElement(BotAvatar, props))
`

let mod
try {
  await build({
    stdin: { contents: ENTRY, resolveDir: root, sourcefile: 'check-mark-entry.tsx', loader: 'tsx' },
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
    banner: { js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" },
    define: { 'process.env.NODE_ENV': '"production"' },
    alias: {
      '@hermes/plugin-sdk': join(root, 'scripts', 'fixtures', 'sdk-stub.mjs'),
      '@': resolve(root, 'src')
    },
    loader: { '.css': 'empty' },
    logLevel: 'silent'
  })
  mod = await import(pathToFileURL(outfile).href)
} catch (error) {
  console.error('FAIL the mark cannot be built at all')
  console.error(`     ${String(error?.message || error).split('\n').slice(0, 6).join('\n     ')}`)
  console.error('\ncheck-mark: 1 problem — a bot has no face to show.')
  process.exit(1)
}

const { mark, botLook, setChosenLooks, bindContext, saveMark, store, render } = mod
const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

/* ------------------------------------------------------------- 1. the drawing -- */

const numbers = path => (path.match(/-?\d+(?:\.\d+)?/g) || []).map(Number)
const paths = new Map(mark.MARK_SHAPES.map(shape => [shape, mark.shapePath(shape)]))
check('huit formes', mark.MARK_SHAPES.length === 8, String(mark.MARK_SHAPES.length))
for (const [shape, path] of paths) {
  const xs = numbers(path).filter((_, i) => i % 2 === 0)
  const ys = numbers(path).filter((_, i) => i % 2 === 1)
  const [w, h] = [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)]
  check(
    `${shape} : un tracé fermé, dans la boîte 100 × 100, d’une taille lisible`,
    /^M/.test(path) && /Z$/.test(path) && Math.min(...xs, ...ys) >= 1 && Math.max(...xs, ...ys) <= 99 && w >= 60 && h >= 60,
    `w=${w.toFixed(0)} h=${h.toFixed(0)} min=${Math.min(...xs, ...ys)} max=${Math.max(...xs, ...ys)}`
  )
}
check('deux formes ne se confondent jamais', new Set(paths.values()).size === paths.size, `${new Set(paths.values()).size}/${paths.size}`)
check('un tracé est mémorisé : même chaîne à la seconde demande', mark.shapePath('drop') === mark.shapePath('drop'))

check('huit paires d’yeux', mark.MARK_EYES.length === 8, String(mark.MARK_EYES.length))
let eyesOk = true
let eyesDetail = ''
for (const eyes of mark.MARK_EYES) {
  const [l, r] = mark.eyeShapes(eyes)
  const inBox = e => e.x - e.w / 2 >= 5 && e.x + e.w / 2 <= 95 && e.y - e.h / 2 >= 5 && e.y + e.h / 2 <= 95
  if (!(l.x < 50 && r.x > 50 && inBox(l) && inBox(r))) {
    eyesOk = false
    eyesDetail = eyes
  }
}
check('chaque paire d’yeux est de part et d’autre du centre et dans la boîte', eyesOk, eyesDetail)
const [sl, sr] = mark.eyeShapes('stern')
const [dl, dr] = mark.eyeShapes('sad')
check('« stern » et « sad » penchent en miroir, et en sens contraires', sl.tilt === -sr.tilt && sl.tilt > 0 && dl.tilt === -dr.tilt && dl.tilt < 0, `${sl.tilt}/${sr.tilt} vs ${dl.tilt}/${dr.tilt}`)
const [wl, wr] = mark.eyeShapes('wink')
check('« wink » ferme un seul œil', wr.h < wl.h / 3, `${wl.h} vs ${wr.h}`)

check('l’encre est sombre sur un corps clair', mark.inkFor('#f5c542') === '#111111' && mark.inkFor('#f4f4f4') === '#111111', `${mark.inkFor('#f5c542')} ${mark.inkFor('#f4f4f4')}`)
check('l’encre est claire sur un corps sombre', mark.inkFor('#8e5cf0') === '#ffffff' && mark.inkFor('#222222') === '#ffffff', `${mark.inkFor('#8e5cf0')} ${mark.inkFor('#222222')}`)

/* ------------------------------------------------ 2. what a profile may carry -- */

const clean = mark.sanitizeMark({ shape: 'drop', eyes: 'wink', color: '#ABC' })
check('un trait valide passe, la couleur courte est développée et passée en minuscules', clean.shape === 'drop' && clean.eyes === 'wink' && clean.color === '#aabbcc', JSON.stringify(clean))
check('une forme inconnue est ignorée', mark.sanitizeMark({ shape: 'star' }).shape === undefined)
check('des yeux inconnus sont ignorés', mark.sanitizeMark({ eyes: 'x' }).eyes === undefined)
check('une couleur qui n’est pas en hexadécimal est ignorée (pas de CSS venu d’un profil)', mark.sanitizeMark({ color: 'red; background:url(x)' }).color === undefined && mark.sanitizeMark({ color: 'rgb(1,2,3)' }).color === undefined)
check('un champ en trop est jeté', JSON.stringify(Object.keys(mark.sanitizeMark({ shape: 'drop', evil: '<script>' }))) === '["shape"]')
check('une valeur qui n’est pas un objet ne donne rien', Object.keys(mark.sanitizeMark('x')).length === 0 && Object.keys(mark.sanitizeMark(null)).length === 0 && Object.keys(mark.sanitizeMark([1])).length === 0)

/* ------------------------------------------------------- 3. the avatar renders -- */

const look = { shape: 'drop', eyes: 'wink', color: '#5b8def' }
const markup = render({ look, size: 40, label: 'Nova' })
check('un avatar a son nom pour étiquette', /role="img"[^>]*aria-label="Nova"|aria-label="Nova"[^>]*role="img"/.test(markup), markup.slice(0, 120))
check('il porte sa forme et ses yeux', /data-shape="drop"/.test(markup) && /data-eyes="wink"/.test(markup))
check('le corps est plein, de la couleur du bot', new RegExp(`<path[^>]*fill="#5b8def"`).test(markup), (markup.match(/<path[^>]*>/) || [''])[0].slice(0, 100))
check('plat : ni dégradé ni filtre', !/radialGradient|linearGradient|<filter/.test(markup))
check('deux yeux', (markup.match(/class="hui-mark-eye"/g) || []).length === 2, String((markup.match(/class="hui-mark-eye"/g) || []).length))
check('à l’encre lisible sur le corps', markup.includes(`fill="${mark.inkFor('#5b8def')}"`), mark.inkFor('#5b8def'))
check('la taille est celle demandée', /--bot-size:\s*40px/.test(markup), (markup.match(/style="[^"]*"/) || [''])[0])
check('un bot qui travaille le dit (pour l’animation)', /data-activity="working"/.test(render({ look, activity: 'working' })))

/* ------------------------------------------------- 4. where a look comes from -- */

setChosenLooks([])
const alone = botLook('nova')
check('un nom seul donne toujours le même aspect', JSON.stringify(botLook('nova')) === JSON.stringify(alone), JSON.stringify(alone))
check('… dans la palette automatique, et une forme connue', mark.AUTO_COLORS.includes(alone.color) && mark.MARK_SHAPES.includes(alone.shape) && mark.MARK_EYES.includes(alone.eyes), JSON.stringify(alone))
const names = ['atlas', 'forge', 'scout', 'nova', 'ledger', 'reel', 'quill', 'pixel', 'preto', 'mint', 'prism', 'dex']
check('et des noms différents ne tombent pas tous sur la même couleur', new Set(names.map(n => botLook(n).color)).size >= 4, String(new Set(names.map(n => botLook(n).color)).size))

setChosenLooks([{ name: 'nova', color: '#E5484D', shape: 'flower' }])
const rostered = botLook('nova')
check('le roster de Hermes passe avant le nom', rostered.color === '#e5484d' && rostered.shape === 'flower', JSON.stringify(rostered))
setChosenLooks([{ name: 'nova', color: '#e5484d', shape: 'flower', mark: { shape: 'drop', eyes: 'sad' } }])
const marked = botLook('nova')
check('ce que la page a enregistré passe avant le roster, champ par champ', marked.shape === 'drop' && marked.eyes === 'sad' && marked.color === '#e5484d', JSON.stringify(marked))
setChosenLooks([{ name: 'nova', mark: { shape: 'nope', color: 'javascript:1' } }])
check('un trait illisible dans un profil retombe sur l’aspect automatique', JSON.stringify(botLook('nova')) === JSON.stringify(alone), JSON.stringify(botLook('nova')))

/* ------------------------------------------------ 5. how a look is saved -- */

const requests = []
let answer = () => ({ ok: true, applied: { ui_meta: true, ui_meta_revisions: { 'hermes-ui': 4 } } })
globalThis.__hostRequest = (method, params) => {
  requests.push({ method, params })
  if (method === 'profiles.list') return Promise.resolve({ profiles: [] })
  return Promise.resolve(answer(params))
}
bindContext({ storage: { get: (_k, f) => f, set: () => {} }, setTimeout: fn => (void Promise.resolve().then(fn), 0), setInterval: () => 0, rest: async () => ({}) })
store.set({ bots: [{ name: 'nova', color: '', shape: '', mark: {}, markRevision: 3, uiMeta: { other: 1 } }], bot: 'nova', notice: null })
const configures = () => requests.filter(r => r.method === 'profiles.configure')

requests.length = 0
const saved = await saveMark('nova', { shape: 'drop', eyes: 'happy', color: '#46A96A', evil: 'x' })
const first = configures()[0]?.params
check('enregistrer envoie profiles.configure', saved === true && configures().length === 1, requests.map(r => r.method).join(', ') || 'no call')
check('pour le bon profil', first?.name === 'nova', JSON.stringify(first?.name))
check('dans la clé de ce plugin seulement', JSON.stringify(Object.keys(first?.ui_meta || {})) === '["hermes-ui"]', JSON.stringify(Object.keys(first?.ui_meta || {})))
check('avec le trait nettoyé (champ en trop jeté, couleur en minuscules)', JSON.stringify(first?.ui_meta?.['hermes-ui']?.mark) === JSON.stringify({ shape: 'drop', eyes: 'happy', color: '#46a96a' }), JSON.stringify(first?.ui_meta?.['hermes-ui']?.mark))
check('sans écraser ce que la clé portait déjà', first?.ui_meta?.['hermes-ui']?.other === 1, JSON.stringify(first?.ui_meta?.['hermes-ui']))
check('avec la révision lue, pour que deux écrivains ne s’écrasent pas', JSON.stringify(first?.ui_meta_expected_revisions) === '{"hermes-ui":3}', JSON.stringify(first?.ui_meta_expected_revisions))
check('rien d’autre dans la requête', JSON.stringify(Object.keys(first || {}).sort()) === '["name","ui_meta","ui_meta_expected_revisions"]', JSON.stringify(Object.keys(first || {})))
const bot = store.get().bots[0]
check('la page prend le nouvel aspect sans attendre le roster', bot.mark?.shape === 'drop' && bot.markRevision === 4, JSON.stringify({ mark: bot.mark, rev: bot.markRevision }))

requests.length = 0
let calls = 0
answer = params => {
  calls += 1
  return calls === 1
    ? { ok: true, applied: { ui_meta: false, ui_meta_conflicts: { 'hermes-ui': { expected: 4, actual: 7 } }, ui_meta_revisions: { 'hermes-ui': 7 } } }
    : { ok: true, applied: { ui_meta: true, ui_meta_revisions: { 'hermes-ui': 8 } } }
}
const retried = await saveMark('nova', { shape: 'dome' })
check('un conflit de révision est rejoué une fois, avec la révision du serveur', retried === true && configures().length === 2 && configures()[1].params.ui_meta_expected_revisions['hermes-ui'] === 7, configures().map(c => JSON.stringify(c.params.ui_meta_expected_revisions)).join(' → '))

requests.length = 0
answer = () => ({ ok: true, applied: { ui_meta: true, ui_meta_revisions: { 'hermes-ui': 9 } } })
await saveMark('nova', null)
const reset = configures()[0]?.params
check('revenir à l’automatique retire le mark du bloc (et rien d’autre), sans écrire de null', reset?.ui_meta?.['hermes-ui'] !== undefined && !('mark' in (reset.ui_meta['hermes-ui'] || {})) && reset.ui_meta['hermes-ui']?.other === 1, JSON.stringify(reset?.ui_meta))
check('… et la page retombe sur l’aspect automatique', Object.keys(store.get().bots[0].mark || {}).length === 0, JSON.stringify(store.get().bots[0].mark))

requests.length = 0
answer = () => ({ ok: true, applied: { ui_meta: false } })
store.set({ notice: null })
const refused = await saveMark('nova', { shape: 'blob' })
check('un refus du gateway n’est pas un succès', refused === false, String(refused))
check('… la page garde son aspect', store.get().bots[0].mark?.shape !== 'blob', JSON.stringify(store.get().bots[0].mark))
check('… et le dit', Boolean(store.get().notice?.text), JSON.stringify(store.get().notice))

globalThis.__hostRequest = () => Promise.reject(new Error('gateway down'))
store.set({ notice: null })
const down = await saveMark('nova', { shape: 'blob' })
check('un gateway qui ne répond pas : faux, et dit', down === false && Boolean(store.get().notice?.text), JSON.stringify(store.get().notice))

check('un bot inconnu n’envoie rien', (await saveMark('ghost', { shape: 'blob' })) === false)

/* ------------------------------------------------------------------- the report -- */

let failed = 0
for (const result of results) {
  if (!result.ok) failed += 1
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${result.detail ? ` — ${result.detail}` : ''}`)
}
if (failed) {
  console.error(`\ncheck-mark: ${failed} problem(s) — a bot's look has to be drawn, ordered and saved the way the page says.`)
  process.exit(1)
}
console.log(`check-mark: OK — ${results.length} checks: 8 shapes and 8 pairs of eyes, a profile's mark validated, the flat avatar, roster/mark/name order, save · reset · conflict · refusal payloads.`)
