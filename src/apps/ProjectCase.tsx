import type { Project } from '../data/resume'

function Section({ label, body, accent, metric }: { label: string; body: string; accent: string; metric?: string }) {
  return (
    <div className="mt-5">
      <p className="mb-1.5 text-[10px] uppercase tracking-[0.25em]" style={{ color: accent }}>
        // {label}
      </p>
      <p className="font-sans leading-relaxed text-bone/85">{body}</p>
      {metric && (
        <p className="mt-2 border-l-2 pl-3 font-mono text-xs italic text-bone-dim" style={{ borderColor: accent }}>
          {metric}
        </p>
      )}
    </div>
  )
}

export default function ProjectCase({ project, onBack }: { project: Project; onBack: () => void }) {
  const a = project.accent
  const hasLinks = Boolean(project.link || project.repo)
  return (
    <div className="font-mono text-sm">
      <div
        className="sticky top-0 z-10 flex items-center gap-2 border-b px-4 py-2.5"
        style={{ borderColor: 'var(--border-soft)', background: 'var(--color-surface-1)' }}
      >
        <button type="button" onClick={onBack} className="os-back">
          ← all projects
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-5 overflow-hidden rounded-lg border" style={{ borderColor: 'var(--border-soft)' }}>
          {project.image ? (
            <img src={project.image} alt={`${project.title} screenshot`} className="w-full" />
          ) : (
            <div
              className="relative grid h-40 place-items-center"
              style={{ background: `color-mix(in srgb, ${a} 10%, var(--color-surface-2))` }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
                aria-hidden
              />
              <span className="relative text-xs uppercase tracking-[0.2em]" style={{ color: a }}>
                {project.nda ? 'Client work — NDA · preview on request' : 'preview coming soon'}
              </span>
            </div>
          )}
        </div>

        <h2 className="font-sans text-2xl font-medium text-bone">{project.title}</h2>
        <p className="mt-1 text-xs text-bone-dim">
          {project.category} · {project.role} · {project.period}
        </p>

        <Section label="Problem" accent={a} body={project.problem} />
        <Section label="Approach" accent={a} body={project.approach} />
        <Section label="Outcome" accent={a} body={project.outcome} metric={project.metric} />

        <div className="mt-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em]" style={{ color: a }}>
            // Stack
          </p>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="os-token">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-xs uppercase tracking-[0.18em]"
          style={{ borderColor: 'var(--border-soft)' }}
        >
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" style={{ color: a }}>
              View live ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="text-bone-dim transition-colors hover:text-ember">
              Source ↗
            </a>
          )}
          {!hasLinks && (
            <span className="text-bone-dim">{project.nda ? 'Client work — source under NDA' : 'Links coming soon'}</span>
          )}
        </div>
      </div>
    </div>
  )
}
