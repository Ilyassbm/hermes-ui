// Composer: autosizing input, attachments, model + effort (remembered per bot), send / stop.
import { host } from '@hermes/plugin-sdk'
import { useEffect, useRef, useState } from 'react'
import { store, send, stop, prefsFor, savePrefs } from '../lib/hermes'
import { useStore } from '../lib/store'
import { botLabel, shortModel } from '../lib/labels'
import { IconArrowUp, IconChevron, IconPaperclip, IconStop, IconX } from './icons'

const EFFORTS = [
  ['low', 'Bas'],
  ['medium', 'Moyen'],
  ['high', 'Élevé']
]

let catalogCache = null
async function loadCatalog() {
  if (catalogCache) return catalogCache
  try {
    const res = await host.request('model.options', {})
    catalogCache = (res?.providers || []).filter(p => p.authenticated !== false && Array.isArray(p.models) && p.models.length)
  } catch {
    catalogCache = []
  }
  return catalogCache
}

function ModelMenu({ botName, current, onClose }) {
  const [catalog, setCatalog] = useState(catalogCache || [])
  const prefs = prefsFor(botName)
  const [effort, setEffort] = useState(prefs.effort || '')
  const ref = useRef(null)
  useEffect(() => {
    let alive = true
    loadCatalog().then(c => alive && setCatalog(c))
    const onDown = e => { if (!ref.current?.contains(e.target)) onClose() }
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      alive = false
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  const pick = (provider, model) => {
    savePrefs(botName, { model, provider })
    store.set(s => ({ info: { ...s.info } }))
    onClose()
  }
  const pickEffort = value => {
    const next = effort === value ? '' : value
    setEffort(next)
    savePrefs(botName, { effort: next })
    store.set(s => ({ info: { ...s.info } }))
  }
  return (
    <div ref={ref} className="hui-pop" role="dialog" aria-label="Modèle et effort">
      <div className="hui-pop-label">Effort de raisonnement</div>
      <div className="hui-seg">
        {EFFORTS.map(([v, l]) => (
          <button key={v} type="button" aria-pressed={effort === v} onClick={() => pickEffort(v)}>{l}</button>
        ))}
      </div>
      <div className="hui-pop-list">
        {catalog.length === 0 ? <div className="hui-pop-label">Chargement des modèles…</div> : null}
        {catalog.map(p => (
          <div key={p.slug}>
            <div className="hui-pop-label">{p.name}</div>
            {p.models.slice(0, 24).map(m => (
              <button key={`${p.slug}:${m}`} type="button" className="hui-pop-item" aria-selected={current === m} onClick={() => pick(p.slug, m)}>
                <span>{shortModel(m)}</span>
                {p.is_current && current === m ? <span className="sub">actuel</span> : null}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Composer() {
  const botName = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const live = useStore(store, s => Boolean(s.live))
  useStore(store, s => s.info) // re-render when prefs change
  const bot = bots.find(b => b.name === botName)
  const prefs = prefsFor(botName)
  const model = prefs.model || bot?.model || ''
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])
  const [menu, setMenu] = useState(false)
  const area = useRef(null)
  const picker = useRef(null)

  useEffect(() => {
    const el = area.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = `${Math.min(240, el.scrollHeight)}px`
  }, [text])

  useEffect(() => {
    area.current?.focus()
  }, [botName])

  const submit = () => {
    if (live) return
    const t = text
    const f = files
    if (!t.trim() && !f.length) return
    setText('')
    setFiles([])
    void send(t, f)
  }

  const onKey = e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  const onPaste = e => {
    const imgs = [...(e.clipboardData?.files || [])].filter(f => f.type.startsWith('image/'))
    if (imgs.length) {
      e.preventDefault()
      setFiles(fs => [...fs, ...imgs])
    }
  }

  const canSend = !live && (text.trim() || files.length)
  const effortLabel = { low: 'bas', medium: 'moyen', high: 'élevé' }[prefs.effort] || ''

  return (
    <div className="hui-composer-wrap">
      <div className="hui-composer" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const f = [...(e.dataTransfer?.files || [])]; if (f.length) setFiles(fs => [...fs, ...f]) }}>
        {files.length ? (
          <div className="hui-files">
            {files.map((f, i) => (
              <span key={`${f.name}-${i}`} className="hui-file-chip">
                {f.name}
                <button type="button" aria-label={`Retirer ${f.name}`} onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))}><IconX width={12} height={12} /></button>
              </span>
            ))}
          </div>
        ) : null}
        <textarea
          ref={area}
          value={text}
          rows={1}
          placeholder={`Écris à ${botLabel(bot || botName)}…`}
          onChange={e => setText(e.target.value)}
          onKeyDown={onKey}
          onPaste={onPaste}
          aria-label="Message"
        />
        <div className="hui-composer-bar">
          <button type="button" className="hui-icon-btn" aria-label="Joindre un fichier" onClick={() => picker.current?.click()}>
            <IconPaperclip />
          </button>
          <input ref={picker} type="file" multiple hidden onChange={e => { const f = [...(e.target.files || [])]; if (f.length) setFiles(fs => [...fs, ...f]); e.target.value = '' }} />
          <div style={{ position: 'relative' }}>
            <button type="button" className="hui-pill" aria-haspopup="dialog" aria-expanded={menu} onClick={() => setMenu(m => !m)}>
              <span>{model ? shortModel(model) : 'Modèle par défaut'}</span>
              {effortLabel ? <span className="eff">· {effortLabel}</span> : null}
              <IconChevron width={13} height={13} />
            </button>
            {menu ? <ModelMenu botName={botName} current={model} onClose={() => setMenu(false)} /> : null}
          </div>
          <span className="grow" />
          {live ? (
            <button type="button" className="hui-send is-stop" aria-label="Arrêter" onClick={() => stop()}>
              <IconStop />
            </button>
          ) : (
            <button type="button" className="hui-send" aria-label="Envoyer" disabled={!canSend} onClick={submit}>
              <IconArrowUp />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
