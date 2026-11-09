// Hermes UI becomes the app's home: the native chat routes land on /hui instead.
//
// The app's router is a hash router (`apps/desktop/src/app/routes.ts`), and its hash is public — reading
// `location.hash` and listening to `hashchange` is the sanctioned door, so nothing here touches the app's DOM.
//
// What we take over, and what we leave alone:
//   #/                  → /hui, and (except at launch) a fresh conversation on the current bot
//   #/<session id>      → /hui, then that conversation opened in Hermes UI
//   #/settings, #/cron, … and anything under them → native, untouched (Settings, Capabilities… stay the app's)
//   #/hui, #/hui/…      → us; never redirected, that is where we send people
//
// One guard keeps it from looping: the same hash is only handled once per 500 ms, so our own navigate does not bounce
// back into a second redirect.
import { host } from '@hermes/plugin-sdk'
import { toast } from '@/components/glaze/ui/toast'
import { boot, loadBots, newConversation, openConversation, selectBot, store } from '@/lib/hermes'
import { classifyRoute, HUI_PATH, isChatRoute, sessionIdOf, type RouteClass } from './native-routes'
import { UI } from './strings'

const STORAGE_KEY = 'replaceNative'
/** Where the page was, per bot: what a reload reopens instead of the session the *native* app happened to leave behind. */
const LAST_KEY = 'lastConversation'
const GUARD_MS = 500
/** The launch watch: 20 passes, 400ms apart (8 s). Long enough for the app's own router to restore, short enough
 *  that it is over before a person can miss it. */
const WATCH_MS = 400
/** 100 passes, 400 ms apart: 40 s. The app's own router restores its hash late on a cold start (a 2 MB plugin to
 * evaluate, then the gateway), and it restores it with `replaceState`, which fires no `hashchange` — so a watch that
 * ends early leaves the app on its native home and the page nowhere. */
const WATCH_TRIES = 100

type Ctx = any

/** bot name → stored conversation id, as last written by the page. */
function lastConversations(ctx: Ctx): Record<string, string> {
  try {
    const v = ctx?.storage?.get(LAST_KEY, {})
    return v && typeof v === 'object' ? v : {}
  } catch {
    return {}
  }
}

let ctxRef: Ctx = null
let installed = false
let lastHash = ''
let lastAt = 0

/** Whether the native chat routes are replaced. On by default (`ctx.storage.replaceNative`, default true). */
export function replaceNativeOn(ctx: Ctx = ctxRef): boolean {
  try {
    return ctx?.storage?.get(STORAGE_KEY, true) !== false
  } catch {
    return true
  }
}

/** Persists the preference. The next hashchange honours it; the palette announces it. */
export function setReplaceNative(ctx: Ctx, on: boolean): void {
  try {
    ctx?.storage?.set(STORAGE_KEY, on)
  } catch {
    /* no storage: the session keeps the default */
  }
}

/**
 * Opens `id` on the bot that owns it: the loaded lists first, then each profile's persisted sessions (current bot,
 * then `default`, then the rest), 200 rows each. Nothing found → stay put and say so.
 */
async function revealSession(id: string): Promise<void> {
  for (const [owner, rows] of Object.entries(store.get().sessionsByBot || {})) {
    if (Array.isArray(rows) && rows.some(row => row?.id === id)) {
      await openOn(owner, id)
      return
    }
  }

  let bots = store.get().bots
  if (!bots.length) {
    // The page boots when its gateway opens; the takeover can land first, so it awaits the same boot rather than a
    // second `loadBots` that would race the page's own selection.
    try {
      await boot()
    } catch {
      /* the page will surface the error; we still try the profiles below */
    }
    bots = store.get().bots
    if (!bots.length) {
      try {
        bots = (await loadBots()) || []
      } catch {
        bots = []
      }
    }
  }

  const current = store.get().bot || ctxRef?.storage?.get('lastBot', null) || host.state.profile.get()
  const order = [current, 'default', ...bots.map(bot => bot.name)].filter(Boolean) as string[]
  const tried = new Set<string>()

  for (const name of order) {
    if (tried.has(name)) continue
    tried.add(name)
    const route = bots.find(bot => bot.name === name)?.route ?? null
    try {
      const res = await host.listPersistedSessions(route, { profile: name, limit: 200 })
      if ((res?.sessions || []).some(row => row.id === id)) {
        await openOn(name, id)
        return
      }
    } catch {
      /* that profile is unreachable: try the next one */
    }
  }

  // The page mounts on the navigate that has just happened; the toast needs its <Toaster> to be there.
  ctxRef?.setTimeout?.(() => toast(UI.plugin.sessionMissing), 200)
}

async function openOn(botName: string, id: string): Promise<void> {
  await selectBot(botName, { keepConversation: true })
  if (store.get().bot !== botName) {
    // The profile is not in the roster any more: opening on whatever bot is selected would be a lie about the owner.
    ctxRef?.setTimeout?.(() => toast(UI.plugin.sessionMissing), 200)
    return
  }
  await openConversation(id)
}

/**
 * Handles one hash. Exported for the check script's curiosity; the plugin only calls it through `installTakeover`.
 *
 * `launch` is the one pass that must not touch the conversation: the app's very first route restores what it had.
 * Every other `#/` is a person asking for a new session — the native `mod+n` included — so it starts a fresh
 * conversation on the current bot each time, not only the first time.
 */
export async function handleRoute(hash: string, { launch = false }: { launch?: boolean } = {}): Promise<RouteClass> {
  const kind = classifyRoute(hash)
  if (!ctxRef || !replaceNativeOn()) return kind

  const now = Date.now()
  if (lastHash === hash && now - lastAt < GUARD_MS) return kind
  lastHash = hash
  lastAt = now

  if (kind === 'new-chat') {
    host.navigate(HUI_PATH)
    if (!launch) newConversation()
  } else if (kind === 'session') {
    const id = sessionIdOf(hash)
    if (!id) return kind
    host.navigate(HUI_PATH)
    // A reload is the app restoring its own last session; the page's own is the one the person actually had open.
    const remembered = launch ? lastConversations(ctxRef)[store.get().bot || ''] : ''
    await revealSession(remembered || id)
  }
  return kind
}

/**
 * Wires the takeover once per load.
 *
 * A reload must never leave the person on the app's old page. That is why the first pass no longer waits for the
 * gateway — the home route needs no session — and why the plugin re-reads `location.hash` itself for the first eight
 * seconds instead of trusting one `hashchange`: the app's router restores its route after ours, sometimes with a
 * `replaceState` that fires no event at all. `popstate` covers the back button. A pass only acts on the app's chat
 * routes (`#/`, `#/<id>`); `/hui` and every native page are left alone.
 */
export function installTakeover(ctx: Ctx): void {
  ctxRef = ctx
  if (installed) return
  installed = true

  const run = (launch = false) => {
    void handleRoute(window.location.hash, { launch }).catch(e => console.warn('[hermes-ui] route', e))
  }

  // Remember the conversation on screen, so a reload lands where the person was rather than on whatever the native
  // session picker last wrote into the address.
  store.subscribe(() => {
    const { bot, storedId } = store.get()
    if (!bot || !storedId) return
    const last = lastConversations(ctx)
    if (last[bot] === storedId) return
    try {
      ctx?.storage?.set(LAST_KEY, { ...last, [bot]: storedId })
    } catch {
      /* no storage: the address stays the only memory */
    }
  })

  ctx.addEventListener(window, 'hashchange', () => run(false))
  ctx.addEventListener(window, 'popstate', () => run(false))

  // The launch's own pass, repeated while the address is still a chat route: `launch` keeps the restored conversation.
  let tries = 0
  const watch = () => {
    if (!replaceNativeOn()) return
    if (isChatRoute(window.location.hash)) run(true)
    tries += 1
    const kind = classifyRoute(window.location.hash)
    if (tries < WATCH_TRIES && kind !== 'hui' && kind !== 'native') ctx.setTimeout(watch, WATCH_MS)
  }
  ctx.setTimeout(watch, 0)

  // A second pass when the gateway opens: a plugin registered before it is what the app was waiting for.
  if (host.state.gateway.get() !== 'open') {
    const off = host.state.gateway.listen(state => {
      if (state !== 'open') return
      off()
      run(true)
    })
    ctx.onDispose(() => off())
  }
}
