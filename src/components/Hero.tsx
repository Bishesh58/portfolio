import { lazy, Suspense, useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { profile } from '../data/resume'
import { useTheme } from '../lib/theme'
import Terminal from './Terminal'

const FluxField = lazy(() => import('./FluxField'))

// Keep in sync with the terminal wrapper size in the markup below.
const TERM_WIDTH = 420

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { theme } = useTheme()

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      const first = SplitText.create('.hero-first', { type: 'chars' })
      const last = SplitText.create('.hero-last', { type: 'chars' })

      tl.from(first.chars, { yPercent: 120, duration: 1.1, stagger: 0.04 }, 0.1)
        .from(last.chars, { yPercent: -120, duration: 1.1, stagger: 0.04 }, 0.25)
        .from('.hero-meta', { opacity: 0, y: 18, stagger: 0.12, duration: 0.8 }, 0.6)

      gsap.set('.hero-scroll', { autoAlpha: 1 })

      // Desktop: pin the hero while scroll drives the terminal straight right off-screen.
      // Page scroll is consumed during this phase, then releases into the rest of the site.
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const exitX = () => window.innerWidth / 2 + TERM_WIDTH / 2 + 48

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: '+=85%',
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo('.hero-term-track', { x: 0 }, { x: exitX, ease: 'none', duration: 1 }, 0)
          .to('.hero-term-track', { autoAlpha: 0, ease: 'none', duration: 0.2 }, 0.75)
          .fromTo('.hero-scroll', { autoAlpha: 1 }, { autoAlpha: 0, ease: 'none', duration: 0.12 }, 0.45)
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.to('.hero-inner', {
          yPercent: -18,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative flex h-[100svh] flex-col justify-between overflow-hidden">
      <Suspense fallback={null}>
        <div className="absolute inset-0">
          <FluxField theme={theme} />
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

      {/* interactive terminal — pinned with hero; slides straight right on scroll (desktop only) */}
      <div className="hero-term pointer-events-auto absolute top-[67%] left-1/2 z-20 -mt-[150px] -ml-[210px] hidden w-[420px] lg:block">
        <div className="hero-term-track">
          <Terminal />
        </div>
      </div>

      <div className="hero-scroll pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
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
