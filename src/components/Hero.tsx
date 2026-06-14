import { lazy, Suspense, useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { profile } from '../data/resume'
import { useTheme } from '../lib/theme'

const ParticleField = lazy(() => import('./three/ParticleField'))

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
        .to('.hero-role', { scrambleText: { text: profile.role.toUpperCase(), chars: '01<>/#&', speed: 0.6 }, duration: 1.6 }, 0.6)
        .from('.hero-meta', { opacity: 0, y: 18, stagger: 0.12, duration: 0.8 }, 0.9)
        .from('.hero-scroll', { opacity: 0, duration: 1 }, 1.4)

      gsap.to('.hero-inner', {
        yPercent: -18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
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

      <div className="hero-inner pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6">
        <p className="hero-role kicker mb-6 text-ember-soft md:text-sm">&nbsp;</p>
        <h1 className="text-center font-display font-black tracking-tighter uppercase">
          <span className="line-mask">
            <span className="hero-first block text-[clamp(3.5rem,14vw,12rem)] leading-[0.85]">{profile.firstName}</span>
          </span>
          <span className="line-mask">
            <span className="hero-last text-stroke block text-[clamp(3.5rem,14vw,12rem)] leading-[0.85]">
              {profile.lastName}
            </span>
          </span>
        </h1>
        <p className="hero-meta mt-8 max-w-md text-center font-serif text-xl text-bone-dim italic md:text-2xl">
          “{profile.tagline}”
        </p>
        <div className="hero-meta mt-10 flex items-center gap-6 font-mono text-[11px] tracking-[0.25em] text-bone-dim uppercase">
          <span>{profile.location}</span>
          <span className="h-1 w-1 rounded-full bg-ember" />
          <span>{profile.yearsExperience} yrs exp</span>
          <span className="h-1 w-1 rounded-full bg-ember" />
          <span className="text-ember-soft">{profile.availability}</span>
        </div>
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
