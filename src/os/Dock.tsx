import { APPS } from './apps'
import { osStore, useOS } from './store'
import Icon from './Icon'

export default function Dock() {
  const windows = useOS((s) => s.windows)
  const focused = useOS((s) => s.focused)

  return (
    <nav className="os-dock" aria-label="Application dock">
      {APPS.map((a) => {
        const w = windows[a.id]
        const isOpen = !!w
        const label = `${a.title}${isOpen ? (w!.minimized ? ' (minimized)' : ' (open)') : ''}`
        return (
          <button
            key={a.id}
            id={`dock-${a.id}`}
            type="button"
            className={`os-dock-item${focused === a.id ? ' is-focused' : ''}`}
            style={{ color: a.accent }}
            aria-label={label}
            title={a.title}
            onClick={() => osStore.openWindow(a.id)}
          >
            <Icon name={a.icon} size={24} />
            <span className={`os-dock-dot${isOpen ? ' is-open' : ''}`} aria-hidden />
          </button>
        )
      })}
    </nav>
  )
}
