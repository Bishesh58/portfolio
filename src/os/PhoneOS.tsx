import { Suspense, useEffect, useState } from 'react'
import FluxField from '../components/FluxField'
import { profile } from '../data/resume'
import { useTheme } from '../lib/theme'
import { APPS, appById } from './apps'
import Icon from './Icon'
import { osStore, useOS } from './store'

export default function PhoneOS() {
  const { theme, toggle } = useTheme()
  const order = useOS((s) => s.order)
  const windows = useOS((s) => s.windows)
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Pacific/Auckland' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // active app = top-most non-minimized window (one app on screen at a time)
  const activeId = [...order].reverse().find((id) => windows[id] && !windows[id]!.minimized) ?? null
  const active = activeId ? appById(activeId) : null

  return (
    <div className="phone-os">
      {!active && (
        <div className="phone-wallpaper" aria-hidden>
          <FluxField theme={theme} dim={0.35} />
        </div>
      )}

      <div className="phone-statusbar">
        <span className="phone-brand">
          BISHESH<span className="text-ember">/</span>OS
        </span>
        <span className="phone-time">{time}</span>
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className="phone-status-btn"
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={15} />
        </button>
      </div>

      {active ? (
        <section className="phone-app" role="dialog" aria-label={`${active.title} app`}>
          <header className="phone-appbar">
            <button type="button" className="phone-back tap-target" onClick={() => osStore.closeWindow(active.id)} aria-label="Back to home">
              <Icon name="x" size={15} /> <span>home</span>
            </button>
            <span className="phone-appbar-title" style={{ color: active.accent }}>
              <Icon name={active.icon} size={15} /> {active.title}
            </span>
            <span aria-hidden style={{ width: 44 }} />
          </header>
          <div className="phone-app-body">
            <Suspense fallback={<div className="p-6 font-mono text-xs text-bone-dim">loading {active.title}…</div>}>
              <active.Component />
            </Suspense>
          </div>
        </section>
      ) : (
        <section className="phone-home">
          <div className="phone-hero">
            <p className="phone-hero-name">{profile.name}</p>
            <p className="phone-hero-role">{profile.role}</p>
            <p className="phone-hero-status">
              <span className="phone-dot" aria-hidden />
              {profile.availability} · {profile.location}
            </p>
          </div>

          <div className="phone-grid">
            {APPS.map((a) => (
              <button key={a.id} type="button" className="phone-tile tap-target" onClick={() => osStore.openWindow(a.id)}>
                <span
                  className="phone-tile-icon"
                  style={{ color: a.accent, borderColor: `color-mix(in srgb, ${a.accent} 40%, transparent)` }}
                >
                  <Icon name={a.icon} size={26} />
                </span>
                <span className="phone-tile-label">{a.title}</span>
              </button>
            ))}
            <a className="phone-tile tap-target" href="/Bishesh-Sunam-CV.pdf" download>
              <span className="phone-tile-icon" style={{ color: 'var(--color-bone)', borderColor: 'var(--border)' }}>
                <Icon name="file-text" size={26} />
              </span>
              <span className="phone-tile-label">Résumé</span>
            </a>
          </div>

          <p className="phone-hint">tap an app to open</p>
        </section>
      )}
    </div>
  )
}
