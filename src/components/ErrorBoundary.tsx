import { Component, type ReactNode } from 'react'
import { profile } from '../data/resume'

interface State {
  hasError: boolean
}

// Degrades a render crash anywhere in the tree to a clean static card with the
// essentials (name, role, email, CV) — never a blank screen.
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('BISHESH/OS recovered from a render error:', error)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="os-fallback">
        <div className="os-fallback-card">
          <p className="os-fallback-brand">
            BISHESH<span style={{ color: 'var(--color-ember)' }}>/</span>OS
          </p>
          <h1 className="os-fallback-name">{profile.name}</h1>
          <p className="os-fallback-role">
            {profile.role} — {profile.location}
          </p>
          <div className="os-fallback-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href="/Bishesh-Sunam-CV.pdf" download>
              Download CV
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    )
  }
}
