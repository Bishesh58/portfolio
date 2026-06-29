import { Suspense, useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import type { AppMeta } from './apps'
import Icon from './Icon'
import { osStore } from './store'
import type { WinState } from './types'

const MENUBAR_H = 44
const DOCK_RESERVE = 88

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

export default function Window({
  meta,
  win,
  z,
  focused,
}: {
  meta: AppMeta
  win: WinState
  z: number
  focused: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const drag = useRef<{ id: number; ox: number; oy: number; sx: number; sy: number } | null>(null)

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  const returnFocusToDock = () => document.getElementById(`dock-${meta.id}`)?.focus()
  const close = () => {
    osStore.closeWindow(meta.id)
    returnFocusToDock()
  }
  const minimize = () => {
    osStore.minimizeWindow(meta.id)
    returnFocusToDock()
  }
  const maximize = () => osStore.toggleMaximize(meta.id)

  useEffect(() => {
    if (!focused) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused])

  const onTitlePointerDown = (e: ReactPointerEvent) => {
    osStore.focusWindow(meta.id)
    if (win.maximized) return
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, ox: e.clientX, oy: e.clientY, sx: win.x, sy: win.y }
  }
  const onTitlePointerMove = (e: ReactPointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const nx = clamp(d.sx + (e.clientX - d.ox), 0, window.innerWidth - 120)
    const ny = clamp(d.sy + (e.clientY - d.oy), MENUBAR_H, window.innerHeight - 80)
    osStore.moveWindow(meta.id, nx, ny)
  }
  const onTitlePointerUp = (e: ReactPointerEvent) => {
    if (drag.current?.id === e.pointerId) drag.current = null
  }

  const style: CSSProperties = win.maximized
    ? {
        left: 8,
        top: MENUBAR_H,
        width: 'calc(100vw - 16px)',
        height: `calc(100vh - ${MENUBAR_H + DOCK_RESERVE}px)`,
        zIndex: z,
      }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: z }

  return (
    <section
      ref={ref}
      role="dialog"
      aria-label={`${meta.title} window`}
      tabIndex={-1}
      className="os-window"
      style={{ ...style, ['--accent']: meta.accent } as CSSProperties}
      onPointerDown={() => osStore.focusWindow(meta.id)}
    >
      <header
        className="os-titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onDoubleClick={maximize}
      >
        <div className="os-titlebar-left">
          <span className="os-traffic">
            <button type="button" data-no-drag aria-label={`Close ${meta.title}`} className="os-dot os-dot--close" onClick={close}>
              <Icon name="x" size={9} />
            </button>
            <button type="button" data-no-drag aria-label={`Minimize ${meta.title}`} className="os-dot os-dot--min" onClick={minimize}>
              <Icon name="minus" size={9} />
            </button>
            <button type="button" data-no-drag aria-label={`Maximize ${meta.title}`} className="os-dot os-dot--max" onClick={maximize}>
              <Icon name="square" size={8} />
            </button>
          </span>
          <span className="os-path">
            <Icon name={meta.icon} size={13} className="opacity-70" /> {meta.path}
          </span>
        </div>
        <span className="os-status">{meta.status}</span>
      </header>
      <div className="os-window-body">
        <Suspense fallback={<div className="p-4 font-mono text-xs text-bone-dim">loading {meta.title}…</div>}>
          <meta.Component />
        </Suspense>
      </div>
    </section>
  )
}
