import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../data/resume'
import type { Theme } from '../lib/theme'
import MatrixFrame from './matrix/MatrixFrame'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

function cardAccent(hue: number, theme: Theme) {
  return theme === 'light' ? `hsl(${hue} 70% 45%)` : `hsl(${hue} 95% 55%)`
}

interface ProjectCaseModalProps {
  project: Project | null
  theme: Theme
  onClose: () => void
}

export default function ProjectCaseModal({ project, theme, onClose }: ProjectCaseModalProps) {
  useEffect(() => {
    if (!project) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  if (!project) return null

  const slug = slugify(project.title)
  const accent = cardAccent(project.hue, theme)

  return createPortal(
    <div className="project-case-modal fixed inset-0 z-[210] flex items-end justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center sm:p-6 sm:pb-6 md:p-8">
      <button
        type="button"
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        aria-label="Close case file"
        onClick={onClose}
      />
      <div className="project-case-modal-panel relative z-10 w-full max-w-3xl max-h-[min(88vh,820px)] overflow-y-auto">
        <MatrixFrame
          variant="panel"
          path={`~/work/${project.index}_${slug}.case`}
          label="CASE"
          status="DECODED"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="matrix-log-prefix">[ CASE FILE ] module inspection</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-[0.04em] uppercase md:text-4xl">{project.title}</h2>
              <p className="mt-2 font-mono text-sm text-bone-dim italic">{project.category}</p>
            </div>
            <button
              type="button"
              data-cursor
              onClick={onClose}
              aria-label="Close"
              className="matrix-nav-toggle shrink-0 grid h-11 w-11 min-h-11 min-w-11 place-items-center border border-ember/25 font-mono text-sm text-bone-dim transition-colors hover:border-ember hover:text-ember"
            >
              ✕
            </button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ember/70 uppercase">// Problem</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/85 md:text-base">{project.description}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ember/70 uppercase">// Outcome</p>
              <p className="mt-3 border-l-2 pl-4 text-sm leading-relaxed text-bone-dim md:text-base" style={{ borderColor: accent }}>
                {project.impact}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-mono text-[10px] tracking-[0.25em] text-ember/70 uppercase">// Stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t}>
                  <span className="matrix-token">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {(project.link || project.repo) && (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-ember/10 pt-6 font-mono text-[11px] tracking-[0.2em] uppercase">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" data-cursor className="text-ember transition-opacity hover:opacity-70">
                  View live ↗
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" data-cursor className="text-bone-dim transition-colors hover:text-ember">
                  Source ↗
                </a>
              )}
            </div>
          )}
        </MatrixFrame>
      </div>
    </div>,
    document.body,
  )
}
