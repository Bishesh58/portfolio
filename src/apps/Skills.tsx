// Phase 1 placeholder. Phase 2 builds the "system monitor" + experience timeline.
import { skills } from '../data/resume'

export default function Skills() {
  return (
    <div className="space-y-4 p-6 font-mono text-sm">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group}>
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-ember-dim">{group}</p>
          <p className="text-bone-dim">{items.join('  ·  ')}</p>
        </div>
      ))}
    </div>
  )
}
