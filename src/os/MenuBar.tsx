import { useEffect, useState } from 'react'
import { useTheme } from '../lib/theme'
import Icon from './Icon'

export default function MenuBar({ onLauncher }: { onLauncher: () => void }) {
  const { theme, toggle } = useTheme()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-NZ', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Pacific/Auckland',
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="os-menubar">
      <div className="os-menubar-left">
        <span className="os-wordmark">
          BISHESH<span className="text-ember">/</span>OS
        </span>
        <button type="button" className="os-menu-item" onClick={onLauncher} aria-label="Open launcher (Ctrl or Cmd + K)">
          <Icon name="search" size={13} />
          <span className="hidden sm:inline">Launch</span>
          <kbd className="os-kbd">⌘K</kbd>
        </button>
      </div>
      <div className="os-menubar-right">
        <a className="os-menu-item" href="/Bishesh-Sunam-CV.pdf" download>
          <Icon name="file-text" size={13} /> <span className="hidden sm:inline">Résumé</span>
        </a>
        <button
          type="button"
          className="os-menu-item"
          onClick={toggle}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={14} />
        </button>
        <span className="os-clock">
          <span className="text-ember-dim">AKL</span> {time}
        </span>
      </div>
    </header>
  )
}
