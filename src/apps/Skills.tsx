import { aiPractices, experience, skills } from '../data/resume'

export default function Skills() {
  return (
    <div className="font-mono text-sm">
      <div
        className="border-b px-6 py-3 text-xs uppercase tracking-[0.2em] text-bone-dim"
        style={{ borderColor: 'var(--border-soft)' }}
      >
        ~/system/monitor — processes
      </div>
      <div className="space-y-7 p-6">
        <ul className="space-y-2">
          {Object.entries(skills).map(([group, items], i) => (
            <li key={group} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-ember-dim">{String(i + 1).padStart(2, '0')}</span>
              <span className="w-44 shrink-0 text-bone">{group}</span>
              <span className="text-bone-dim">{items.join('  ·  ')}</span>
            </li>
          ))}
        </ul>

        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-ember">// experience</p>
          <ul className="space-y-4">
            {experience.map((x) => (
              <li key={x.company} className="border-l pl-4" style={{ borderColor: 'var(--border-soft)' }}>
                <p className="text-bone">
                  {x.role} <span className="text-bone-dim">@ {x.company}</span>
                </p>
                <p className="text-xs text-bone-dim">{x.period}</p>
                <p className="mt-1 font-sans text-bone/80">{x.blurb}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-ember">// how I ship with AI</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {aiPractices.map((p) => (
              <li key={p.index} className="rounded-lg border p-3" style={{ borderColor: 'var(--border-soft)' }}>
                <p className="text-bone">{p.title}</p>
                <p className="mt-1 font-sans text-xs leading-relaxed text-bone-dim">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
