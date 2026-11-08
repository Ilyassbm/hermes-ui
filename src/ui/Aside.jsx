// Right column: the bot's routines (cron) then the files this conversation produced.
import { useEffect } from 'react'
import { store, loadRoutines } from '../lib/hermes'
import { useStore } from '../lib/store'
import { IconFile, IconPlus, IconRefresh } from './icons'

function nextRun(job) {
  const raw = job.next_run_at || job.next_run || job.nextRunAt
  if (!raw) return ''
  const d = new Date(typeof raw === 'number' ? raw * (raw < 1e12 ? 1000 : 1) : raw)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString('fr-FR', { weekday: 'short', hour: '2-digit', minute: '2-digit' })
}

function scheduleText(job) {
  const s = job.schedule_display || job.schedule || job.cron || ''
  return typeof s === 'string' ? s : s?.display || s?.expr || ''
}

function Routines({ ctx }) {
  const routines = useStore(store, s => s.routines)
  const bot = useStore(store, s => s.bot)
  useEffect(() => {
    const t = setInterval(() => loadRoutines(), 60000)
    return () => clearInterval(t)
  }, [bot])
  return (
    <div className="hui-aside-block">
      <div className="hui-aside-head">
        <span className="hui-aside-title">Routines</span>
        <span style={{ display: 'flex', gap: 2 }}>
          <button type="button" className="hui-icon-btn" aria-label="Rafraîchir les routines" onClick={() => loadRoutines()}><IconRefresh width={14} height={14} /></button>
          <button type="button" className="hui-icon-btn" aria-label="Nouvelle routine" onClick={() => ctx.runAction('nav.cron')}><IconPlus width={14} height={14} /></button>
        </span>
      </div>
      {routines.length === 0 ? (
        <div className="hui-aside-empty">Aucune routine pour ce bot.</div>
      ) : (
        routines.map(job => {
          const enabled = job.enabled !== false && job.state !== 'paused'
          const name = String(job.name || 'Routine').replace(/^\[bot:[^\]]+\]\s*/i, '')
          const next = nextRun(job)
          return (
            <button key={job.id || job.job_id || name} type="button" className="hui-routine" style={{ textAlign: 'left' }} onClick={() => ctx.runAction('nav.cron')} title={job.prompt_preview || name}>
              <span className="hui-routine-top">
                <span className="hui-pip" data-tone={enabled ? 'ok' : undefined} />
                <span className="hui-routine-name">{name}</span>
              </span>
              <span className="hui-routine-meta">{[scheduleText(job), next ? `prochaine : ${next}` : enabled ? '' : 'en pause'].filter(Boolean).join(' · ')}</span>
            </button>
          )
        })
      )}
    </div>
  )
}

function Files({ ctx }) {
  const files = useStore(store, s => s.files)
  const reveal = async path => {
    const ok = await ctx.os?.revealPath?.(path)
    if (!ok) await ctx.os?.writeClipboard?.(path)
  }
  return (
    <div className="hui-aside-block">
      <div className="hui-aside-head">
        <span className="hui-aside-title">Fichiers</span>
      </div>
      {files.length === 0 ? (
        <div className="hui-aside-empty">Les fichiers créés ou modifiés dans cette conversation s'affichent ici.</div>
      ) : (
        files.slice(0, 30).map(f => {
          const parts = f.path.split('/')
          const name = parts.pop()
          return (
            <button key={f.path} type="button" className="hui-filerow" onClick={() => reveal(f.path)} title={`${f.path}\nCliquer : afficher (ou copier le chemin)`}>
              <span className="hui-file-ico"><IconFile width={14} height={14} /></span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <span className="name" style={{ display: 'block' }}>{name}</span>
                <span className="dir">{parts.join('/') || '/'}</span>
              </span>
            </button>
          )
        })
      )}
    </div>
  )
}

export function Aside({ ctx }) {
  return (
    <aside className="hui-aside hui-scroll" aria-label="Routines et fichiers">
      <Routines ctx={ctx} />
      <Files ctx={ctx} />
    </aside>
  )
}
