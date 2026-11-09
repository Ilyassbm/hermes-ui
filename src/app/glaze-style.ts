// The compiled Glaze sheet, in one <style> of its own, shared by the chat page and the settings page.
//
// Every rule in it is scoped to .glaze by the build (scripts/check-css.mjs), so it can sit in the app's head without
// touching the native chrome. Two surfaces mount it now (Settings ▸ Plugins is a page of its own), so the element is
// reference-counted: the first mount creates it, the last unmount removes it, and a remount in between keeps the text
// the build wrote.
import { useEffect } from 'react'
import css from '../styles/.compiled.css'

const STYLE_ID = 'hermes-ui-glaze'

let users = 0

export function useGlazeStyle() {
  useEffect(() => {
    users += 1
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
    if (!el) {
      el = document.createElement('style')
      el.id = STYLE_ID
      document.head.appendChild(el)
    }
    el.textContent = css
    return () => {
      users -= 1
      if (users === 0) el?.remove()
    }
  }, [])
}
