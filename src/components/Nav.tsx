import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { profile } from '../data/resume'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const [time, setTime] = useState('')

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
    if (!ready) return
    gsap.from(ref.current, { yPercent: -120, duration: 1, ease: 'power4.out', delay: 0.4 })
  }, [ready])

  return (
    <header
      ref={ref}
      className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-6 py-5 mix-blend-difference md:px-12"
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

      <span className="font-mono text-[11px] text-bone-dim tabular-nums">AKL {time}</span>
    </header>
  )
}
