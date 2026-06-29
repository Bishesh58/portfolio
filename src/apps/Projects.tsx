import { useState } from 'react'
import { archiveProjects, featuredProjects, profile, type Project } from '../data/resume'
import ProjectCase from './ProjectCase'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  if (selected) return <ProjectCase project={selected} onBack={() => setSelected(null)} />

  return (
    <div className="font-mono text-sm">
      <p className="px-4 pt-4 pb-2 text-xs uppercase tracking-[0.2em] text-bone-dim">~/projects — selected work</p>
      <ul>
        {featuredProjects.map((p) => (
          <li key={p.index}>
            <button
              type="button"
              onClick={() => setSelected(p)}
              className="os-row group flex w-full items-center gap-3 border-b px-4 py-3 text-left"
              style={{ borderColor: 'var(--border-soft)' }}
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.accent }} />
              <span className="w-7 shrink-0 text-bone-dim">{p.index}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-bone transition-colors group-hover:text-ember">{p.title}</span>
                <span className="block truncate text-xs text-bone-dim">
                  {p.role} · {p.period}
                </span>
              </span>
              <span className="hidden shrink-0 text-xs text-bone-dim sm:block">{p.category}</span>
              <span className="shrink-0 text-bone-dim transition-colors group-hover:text-ember">→</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="px-4 py-5">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-bone-dim">~/archive</p>
        <ul className="space-y-1.5 text-xs text-bone-dim">
          {archiveProjects.map((p) => (
            <li key={p.index} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
              {p.title}
            </li>
          ))}
        </ul>
        <a href={profile.github} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-ember hover:underline">
          51 repos on GitHub ↗
        </a>
      </div>
    </div>
  )
}
