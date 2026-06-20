import type { ReactNode } from 'react'

type Variant = 'panel' | 'module' | 'log' | 'metric' | 'agent'

interface MatrixFrameProps {
  children: ReactNode
  /** Title bar label, e.g. MODULE_01 */
  label?: string
  /** Path shown in title bar, e.g. ~/work/netsuite.exe */
  path?: string
  /** Status text in title bar corner */
  status?: string
  variant?: Variant
  className?: string
}

export default function MatrixFrame({
  children,
  label,
  path,
  status = 'ACTIVE',
  variant = 'panel',
  className = '',
}: MatrixFrameProps) {
  const hasBar = label || path

  return (
    <div className={`matrix-frame matrix-frame--${variant} ${className}`}>
      <div className="matrix-frame-wireframe" aria-hidden />
      <div className="matrix-frame-scan" aria-hidden />
      <span className="matrix-corner matrix-corner-tl" aria-hidden />
      <span className="matrix-corner matrix-corner-tr" aria-hidden />
      <span className="matrix-corner matrix-corner-bl" aria-hidden />
      <span className="matrix-corner matrix-corner-br" aria-hidden />

      {hasBar && (
        <div className="matrix-titlebar">
          <div className="matrix-titlebar-left">
            <span className="matrix-dot" />
            <span className="matrix-dot matrix-dot--mid" />
            <span className="matrix-dot matrix-dot--bright" />
            {path && <span className="matrix-path">{path}</span>}
            {label && !path && <span className="matrix-path">{label}</span>}
          </div>
          <div className="matrix-titlebar-right">
            {label && path && <span className="matrix-label">{label}</span>}
            <span className="matrix-status">{status}</span>
          </div>
        </div>
      )}

      <div className={hasBar ? 'matrix-frame-body' : 'matrix-frame-body matrix-frame-body--flush'}>
        {children}
      </div>
    </div>
  )
}
