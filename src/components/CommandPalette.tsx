import { useEffect } from 'react'
import { NAV_SECTIONS } from '../lib/sections'
import { scrollToSection } from '../lib/scroll'
import { useTheme } from '../lib/theme'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

const COMMANDS = [
  ...NAV_SECTIONS.map((s, i) => ({
    key: String(i + 1),
    label: `Go to ${s.label}`,
    hint: s.href,
    run: () => scrollToSection(s.href),
  })),
  {
    key: 'L',
    label: 'Toggle light / dark theme',
    hint: 'theme',
    run: null as (() => void) | null,
  },
  {
    key: '/',
    label: 'Jump to contact',
    hint: '#contact',
    run: () => scrollToSection('#contact'),
  },
]

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { toggle } = useTheme()

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const cmd = COMMANDS.find((c) => c.key.toLowerCase() === e.key.toLowerCase())
      if (!cmd) return

      e.preventDefault()
      if (cmd.key === 'L') toggle()
      else cmd.run?.()
      onClose()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, toggle])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="command-palette fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[max(5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:pt-[14vh]">
      <button
        type="button"
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        aria-label="Close command palette"
        onClick={onClose}
      />
      <div className="command-palette-panel relative w-full max-w-lg" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="matrix-titlebar">
          <div className="matrix-titlebar-left">
            <span className="matrix-dot" />
            <span className="matrix-dot matrix-dot--mid" />
            <span className="matrix-dot matrix-dot--bright" />
            <span className="matrix-path">~/sys/help.cmd</span>
          </div>
          <div className="matrix-titlebar-right">
            <span className="matrix-label">HELP</span>
            <span className="matrix-status">READY</span>
          </div>
        </div>
        <div className="matrix-frame-body border border-t-0 border-ember/15 bg-ink-2/95">
          <p className="matrix-log-prefix mb-4">[ SYS ] available commands — press key to run</p>
          <ul className="flex flex-col gap-1">
            {COMMANDS.map((cmd) => (
              <li key={cmd.key}>
                <button
                  type="button"
                  data-cursor
                  className="command-palette-item tap-target flex w-full items-center justify-between gap-4 px-3 py-3 text-left font-mono text-[11px] tracking-[0.12em] uppercase transition-colors hover:bg-ember/5 sm:py-2.5"
                  onClick={() => {
                    if (cmd.key === 'L') toggle()
                    else cmd.run?.()
                    onClose()
                  }}
                >
                  <span className="text-bone">{cmd.label}</span>
                  <span className="shrink-0 text-bone-dim">
                    <kbd className="command-kbd">{cmd.key}</kbd>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-ember/10 pt-4 font-mono text-[10px] tracking-[0.2em] text-bone-dim uppercase">
            esc — dismiss · <span className="hidden md:inline">? — toggle palette · </span>tap ? in nav on mobile
          </p>
        </div>
      </div>
    </div>
  )
}
