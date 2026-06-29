// Phase 1 placeholder. Phase 2 builds the full uplink/contact app.
import { profile } from '../data/resume'

export default function Contact() {
  return (
    <div className="space-y-3 p-6 font-mono text-sm">
      <a className="block text-ember hover:underline" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <a className="block text-bone-dim transition-colors hover:text-ember" href={profile.linkedin} target="_blank" rel="noreferrer">
        LinkedIn ↗
      </a>
      <a className="block text-bone-dim transition-colors hover:text-ember" href={profile.github} target="_blank" rel="noreferrer">
        GitHub ↗
      </a>
      <a className="block text-bone-dim transition-colors hover:text-ember" href="/Bishesh-Sunam-CV.pdf" download>
        Download CV ↓
      </a>
    </div>
  )
}
