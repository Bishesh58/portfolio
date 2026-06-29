import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { APPS } from './apps'
import { osStore } from './store'
import { useTheme } from '../lib/theme'
import Icon from './Icon'

interface Item {
  key: string
  label: string
  hint: string
  icon: string
  run: () => void
}

export default function Launcher({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toggle } = useTheme()
  const panelRef = useRef<HTMLDivElement>(null)
  const prevFocus = useRef<HTMLElement | null>(null)

  const items: Item[] = [
    ...APPS.map((a) => ({ key: a.id, label: `Open ${a.title}`, hint: a.path, icon: a.icon, run: () => osStore.openWindow(a.id) })),
    { key: 'theme', label: 'Toggle theme', hint: 'light / dark', icon: 'sun', run: toggle },
    {
      key: 'cv',
      label: 'Download CV',
      hint: 'résumé.pdf',
      icon: 'file-text',
      run: () => {
        const a = document.createElement('a')
        a.href = '/Bishesh-Sunam-CV.pdf'
        a.download = ''
        a.click()
      },
    },
  ]

  useEffect(() => {
    if (!open) return
    prevFocus.current = document.activeElement as HTMLElement
    const panel = panelRef.current
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])') ?? [])
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const f = focusables()
        if (!f.length) return
        const idx = f.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && idx <= 0) {
          e.preventDefault()
          f[f.length - 1].focus()
        } else if (!e.shiftKey && idx === f.length - 1) {
          e.preventDefault()
          f[0].focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prevFocus.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  const act = (run: () => void) => {
    run()
    onClose()
  }

  return createPortal(
    <div className="os-launcher-backdrop" role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className="os-launcher"
        role="dialog"
        aria-modal="true"
        aria-label="Launcher"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="os-launcher-head">
          <Icon name="search" size={14} />
          <span>Launch — ⌘K / Ctrl+K to toggle · Esc to close</span>
        </div>
        <ul className="os-launcher-list">
          {items.map((it) => (
            <li key={it.key}>
              <button type="button" className="os-launcher-item" onClick={() => act(it.run)}>
                <Icon name={it.icon} size={16} />
                <span className="flex-1 text-left">{it.label}</span>
                <span className="os-launcher-hint">{it.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  )
}
