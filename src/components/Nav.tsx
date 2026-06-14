import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { profile } from '../data/resume'
import { useTheme } from '../lib/theme'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'AI', href: '#ai' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
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
      className="grid h-8 w-8 place-items-center rounded-full border border-bone/30 text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
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

export default function Nav({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const [time, setTime] = useState('')
  const [scrolled, setScrolled] = useState(false)

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

  useEffect(() => {
    if (!ready) return
    gsap.from(ref.current, { yPercent: -160, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.4 })
  }, [ready])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-100 flex justify-center px-3 pt-3 md:px-6 md:pt-5">
      <header
        ref={ref}
        className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-[background-color,border-color,box-shadow,padding] duration-500 ease-out md:px-6 ${
          scrolled
            ? 'border-bone/10 bg-ink/65 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#" className="font-display text-sm font-bold tracking-tight uppercase">
          {profile.name.split(' ')[0]}
          <span className="text-ember">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11px] tracking-[0.2em] text-bone uppercase"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] text-bone-dim tabular-nums sm:inline">AKL {time}</span>
          <ThemeToggle />
        </div>
      </header>
    </div>
  )
}
