// The rail's data: what each bot said last, and when (GET /bots from our own backend).
//
// Kept beside src/lib/hermes.js rather than inside it: that store is the gateway's (bots, sessions, thread, routines)
// and lot 2 reuses it unchanged. This is the one thing only the rail needs, refreshed on a timer so a bot that
// answered elsewhere shows its new line without a reload.
import { useEffect, useState } from 'react'

export type BotRow = {
  name: string
  last_session_id: string | null
  last_active: number | null
  last_output: string | null
}

const REFRESH_MS = 30_000

export function useBots(ctx: any): { rows: BotRow[]; failed: boolean } {
  const [rows, setRows] = useState<BotRow[]>([])
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!ctx?.rest) return undefined
    let alive = true
    const load = () => {
      Promise.resolve(ctx.rest('/bots'))
        .then((res: any) => {
          if (!alive) return
          setRows(Array.isArray(res?.bots) ? res.bots : [])
          setFailed(false)
        })
        .catch(() => {
          // The backend may not be mounted yet (older gateway): the rail falls back to the store's bots alone.
          if (alive) setFailed(true)
        })
    }
    load()
    const timer = ctx.setInterval ? ctx.setInterval(load, REFRESH_MS) : window.setInterval(load, REFRESH_MS)
    return () => {
      alive = false
      if (typeof timer === 'function') timer()
      else window.clearInterval(timer)
    }
  }, [ctx])

  return { rows, failed }
}
