import { awards, profile, stats } from '../data/resume'

export default function About() {
  return (
    <div className="font-sans text-sm leading-relaxed">
      <div
        className="border-b px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone-dim"
        style={{ borderColor: 'var(--border-soft)' }}
      >
        ~/readme.md
      </div>
      <div className="space-y-6 p-6">
        <p className="text-base text-bone/90">{profile.summary}</p>
        <p className="text-bone-dim">
          <span className="font-mono text-ember">No hand-offs, no excuses</span> — just software that ships and keeps
          working.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-3xl font-medium text-ember">
                {s.value}
                <span className="text-bone-dim">{s.suffix}</span>
              </p>
              <p className="mt-1 font-mono text-[11px] text-bone-dim">{s.label}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ember">// recognition</p>
          <ul className="space-y-1 text-bone-dim">
            {awards.map((a) => (
              <li key={a.title}>
                <span className="text-bone">{a.title}</span> — {a.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
