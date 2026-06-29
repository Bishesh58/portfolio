// Phase 1 placeholder. Phase 2 builds the Finder + case-file windows with proof.
import { projects } from '../data/resume'

export default function Projects() {
  return (
    <div className="p-4 font-mono text-sm">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ember-dim">~/projects — {projects.length} modules</p>
      <ul>
        {projects.map((p) => (
          <li
            key={p.index}
            className="flex items-center gap-3 border-b py-3"
            style={{ borderColor: 'var(--border-soft)' }}
          >
            <span className="text-ember-dim">{p.index}</span>
            <span className="flex-1 text-bone">{p.title}</span>
            <span className="hidden text-xs text-bone-dim sm:inline">{p.category}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-bone-dim">// live demos, repos & case files — phase 2</p>
    </div>
  )
}
