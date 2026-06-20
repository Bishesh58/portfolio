import { useEffect, useState } from 'react'
import { profile } from '../data/resume'
import { useTheme } from '../lib/theme'

const links = [
  { label: 'Work', href: '#work', code: '01' },
  { label: 'About', href: '#about', code: '02' },
  { label: 'AI', href: '#ai', code: '03' },
  { label: 'Experience', href: '#experience', code: '04' },
  { label: 'Contact', href: '#contact', code: '05' },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'
  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      className="matrix-nav-toggle relative z-10 grid h-10 w-10 min-h-11 min-w-11 place-items-center border border-ember/25 text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
    >
      {isLight ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  )
}

export default function Nav() {
  const [time, setTime] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-NZ', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Pacific/Auckland',
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-3 md:px-6 md:pt-5">
        <header
          className={`matrix-nav pointer-events-auto relative isolate z-[101] w-full max-w-6xl transition-all duration-500 ${scrolled ? 'matrix-nav--active' : ''}`}
        >
          <span className="matrix-nav-corner matrix-nav-corner-tl" aria-hidden />
          <span className="matrix-nav-corner matrix-nav-corner-tr" aria-hidden />
          <span className="matrix-nav-corner matrix-nav-corner-bl" aria-hidden />
          <span className="matrix-nav-corner matrix-nav-corner-br" aria-hidden />
          <span className="matrix-nav-rail matrix-nav-rail--left" aria-hidden />
          <span className="matrix-nav-rail matrix-nav-rail--right" aria-hidden />
          <div className="matrix-nav-grid" aria-hidden />

          <div className="matrix-nav-bar flex items-center justify-between gap-4 px-4 py-3 md:px-5">
            <a href="#" data-cursor className="group flex items-center gap-2 font-display text-sm font-bold tracking-[0.15em] uppercase">
              <span className="hidden font-mono text-[9px] tracking-[0.2em] text-ember-soft sm:inline">SYS</span>
              <span>
                {profile.name.split(' ')[0]}
                <span className="text-ember">.</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  data-cursor
                  className="matrix-nav-link group relative px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-bone-dim uppercase transition-colors duration-300 hover:text-ember"
                >
                  <span className="matrix-nav-link-code transition-colors group-hover:text-ember">{l.code}</span>
                  <span className="matrix-nav-link-sep mx-1.5">|</span>
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="relative z-10 flex shrink-0 items-center gap-3 sm:gap-4">
              <span className="hidden font-mono text-[10px] tabular-nums text-bone-dim sm:inline">
                <span className="text-ember/50">AKL</span> {time}
              </span>
              <ThemeToggle />
              <button
                type="button"
                data-cursor
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="matrix-nav-toggle grid h-10 w-10 min-h-11 min-w-11 place-items-center text-bone md:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                  <span className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
                </span>
              </button>
            </div>
          </div>

          <div
            className={`matrix-nav-status items-center justify-between border-t border-ember/10 px-5 py-1 font-mono text-[9px] tracking-[0.22em] text-bone-dim uppercase ${scrolled ? 'hidden md:flex' : 'hidden'}`}
          >
            <span>// SYS.NAV — ROUTING</span>
            <span className="text-ember/60">[ LINK ACTIVE ]</span>
          </div>
        </header>
      </div>

      <div
        className={`matrix-nav-mobile fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          menuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="matrix-nav-mobile-grid pointer-events-none absolute inset-0" aria-hidden />
        <nav className="relative flex flex-1 flex-col items-center justify-center gap-6">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : '0ms' }}
              className={`font-display text-3xl font-bold tracking-[0.08em] text-bone uppercase transition-all duration-500 hover:text-ember sm:text-4xl ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <span className="mr-3 font-mono text-base text-ember/50">{l.code}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <p className="relative pb-12 text-center font-mono text-[11px] tracking-[0.25em] text-bone-dim uppercase">
          {profile.location} — AKL {time}
        </p>
      </div>
    </>
  )
}
