import { lazy, Suspense, useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { profile } from '../data/resume'
import { useTheme } from '../lib/theme'
import Terminal from './Terminal'

const ParticleField = lazy(() => import('./three/ParticleField'))

// Keep in sync with the terminal wrapper size + start position in the markup below.
const TERM_WIDTH = 420
const TERM_HEIGHT = 300
const TERM_START_TOP = 0.67 // vertical centre of the terminal at rest, as a fraction of viewport height

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { theme } = useTheme()

  useGSAP(
    () => {
      if (!ready) return
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      const first = SplitText.create('.hero-first', { type: 'chars' })
      const last = SplitText.create('.hero-last', { type: 'chars' })

      tl.from(first.chars, { yPercent: 120, duration: 1.1, stagger: 0.04 }, 0.1)
        .from(last.chars, { yPercent: -120, duration: 1.1, stagger: 0.04 }, 0.25)
        .from('.hero-meta', { opacity: 0, y: 18, stagger: 0.12, duration: 0.8 }, 0.6)
        .from('.hero-scroll', { opacity: 0, duration: 1 }, 1.1)

      gsap.to('.hero-inner', {
        yPercent: -18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      // Scroll-linked drift (desktop only): the viewport-fixed terminal starts
      // centered and glides into the bottom-right corner in lock-step with how
      // far the hero is scrolled, dissolving as it docks so it never overlaps
      // the next section. Scrubbing makes the whole thing reversible.
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        // The terminal is centred at rest via CSS (left-1/2 + negative margins),
        // so it lines up exactly with the centred SCROLL hint. From there it
        // glides to the bottom-right corner, computed as deltas from that centre.
        const toX = () => {
          const vw = window.innerWidth
          const margin = vw >= 1280 ? 48 : 24
          return vw / 2 - margin - TERM_WIDTH / 2
        }
        const toY = () => {
          const vh = window.innerHeight
          return vh - TERM_HEIGHT / 2 - vh * TERM_START_TOP
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: '+=60%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo('.hero-term', { x: 0, y: 0 }, { x: toX, y: toY, ease: 'none', duration: 1 }, 0)
          .to('.hero-term', { autoAlpha: 0, ease: 'none', duration: 0.4 }, 0.6)
      })
    },
    { scope: ref, dependencies: [ready] },
  )

  return (
    <section ref={ref} className="relative flex h-[100svh] flex-col justify-between overflow-hidden">
      <Suspense fallback={null}>
        <div className="absolute inset-0">
          <ParticleField theme={theme} />
        </div>
      </Suspense>

      {/* gradient veil for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />

      <div className="hero-inner pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-7 px-6 lg:justify-start lg:gap-8 lg:pt-[19vh]">
        <h1 className="flex items-baseline justify-center gap-x-[0.22em] font-display font-black tracking-tighter uppercase">
          <span className="inline-block overflow-hidden">
            <span className="hero-first text-hero-name inline-block font-black">
              {profile.firstName}
            </span>
          </span>
          <span className="inline-block overflow-hidden">
            <span className="hero-last text-hero-name text-stroke inline-block font-black">
              {profile.lastName}
            </span>
          </span>
        </h1>

        <div className="flex flex-col items-center">
          <p className="hero-meta max-w-md text-center font-serif text-xl text-bone-dim italic md:text-2xl">
            “{profile.tagline}”
          </p>
          <div className="hero-meta mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.25em] text-bone-dim uppercase">
            <span>{profile.location}</span>
            <span className="h-1 w-1 rounded-full bg-ember" />
            <span>{profile.yearsExperience} yrs exp</span>
            <span className="h-1 w-1 rounded-full bg-ember" />
            <span className="text-ember-soft">{profile.availability}</span>
          </div>
        </div>
      </div>

      {/* interactive terminal — centred at rest, glides to the bottom-right
          as the hero scrolls (desktop only) */}
      <div className="hero-term pointer-events-auto fixed top-[67%] left-1/2 z-20 -mt-[150px] -ml-[210px] hidden w-[420px] lg:block">
        {ready && <Terminal />}
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.3em] text-bone-dim uppercase">Scroll</span>
          <div className="h-10 w-px overflow-hidden bg-bone/15">
            <div className="h-1/2 w-full animate-[scrolldown_1.6s_ease-in-out_infinite] bg-ember" />
          </div>
        </div>
      </div>

      <style>{`@keyframes scrolldown { 0% { transform: translateY(-100%);} 100% { transform: translateY(220%);} }`}</style>
    </section>
  )
}
