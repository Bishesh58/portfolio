// Phase 1 placeholder. Phase 2 builds the full About/ownership story.
import { profile, stats } from '../data/resume'

export default function About() {
  return (
    <div className="space-y-5 p-6 font-mono text-sm">
      <p className="text-bone">
        {profile.name} <span className="text-ember-dim">— {profile.role}</span>
      </p>
      <p className="leading-relaxed text-bone-dim">{profile.summary}</p>
      <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-2xl text-ember">
              {s.value}
              {s.suffix}
            </p>
            <p className="mt-1 text-xs text-bone-dim">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
