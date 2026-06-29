import { profile } from '../data/resume'

export default function Contact() {
  return (
    <div className="font-mono text-sm">
      <div
        className="border-b px-6 py-3 text-xs uppercase tracking-[0.2em] text-bone-dim"
        style={{ borderColor: 'var(--border-soft)' }}
      >
        ~/comms/uplink — listening
      </div>
      <div className="space-y-6 p-6">
        <div>
          <p className="font-sans text-xl text-bone">Let&apos;s build something great.</p>
          <p className="mt-1 text-bone-dim">
            Open to new opportunities — {profile.location}.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={`mailto:${profile.email}`} className="os-cta os-cta--primary">
            {profile.email}
          </a>
          <a href="/Bishesh-Sunam-CV.pdf" download className="os-cta">
            Download CV ↓
          </a>
        </div>
        <div
          className="flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 text-xs uppercase tracking-[0.18em] text-bone-dim"
          style={{ borderColor: 'var(--border-soft)' }}
        >
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-ember">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-ember">
            GitHub ↗
          </a>
          <a href={`tel:${profile.phone.replace(/-/g, '')}`} className="transition-colors hover:text-ember">
            {profile.phone}
          </a>
        </div>
        <p className="text-xs text-bone-dim">
          ↳ tip: type <span className="text-ember">hire</span> in the terminal.
        </p>
      </div>
    </div>
  )
}
