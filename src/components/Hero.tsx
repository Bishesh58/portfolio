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
              onEnter: () => {
                if (ref.current) ref.current.style.zIndex = '1'
              },
              onLeaveBack: () => {
                if (ref.current) ref.current.style.zIndex = '0'
              },
            },
          })
          .fromTo('.hero-term-track', { x: 0 }, { x: exitX, ease: 'none', duration: 1 }, 0)
          .to('.hero-term-track', { autoAlpha: 0, ease: 'none', duration: 0.2 }, 0.75)
          .fromTo('.hero-scroll', { autoAlpha: 1 }, { autoAlpha: 0, ease: 'none', duration: 0.12 }, 0.45)
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.to('.hero-inner', {
          yPercent: -12,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative z-0 flex min-h-[100svh] flex-col overflow-hidden lg:h-[100svh]">
      <Suspense fallback={null}>
        <div className="absolute inset-0">
          <FluxField theme={theme} />
        </div>
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />

      <div className="hero-inner pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-4 pt-24 pb-4 sm:px-6 lg:justify-start lg:gap-8 lg:pt-[19vh] lg:pb-0">
        <h1 className="flex flex-wrap items-baseline justify-center gap-x-[0.22em] font-display font-black tracking-[0.06em] uppercase">
          <span className="inline-block overflow-hidden">
            <span className="hero-first text-hero-name matrix-glow inline-block font-black text-ember">
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
          <p className="hero-meta max-w-md text-center font-mono text-base text-bone-dim italic sm:text-lg md:text-xl">
            &gt; {profile.tagline}
          </p>
          <div className="hero-meta mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.18em] text-bone-dim uppercase sm:mt-5 sm:gap-x-6 sm:text-[11px] sm:tracking-[0.25em]">
            <span>{profile.location}</span>
            <span className="h-1 w-1 rounded-full bg-ember" />
            <span>{profile.yearsExperience} yrs exp</span>
            <span className="h-1 w-1 rounded-full bg-ember" />
            <span className="text-ember-soft">{profile.availability}</span>
          </div>
        </div>
      </div>

      <div className="hero-term pointer-events-auto relative z-20 mx-auto mt-auto w-full max-w-[420px] shrink-0 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:absolute lg:bottom-[clamp(1.5rem,7vh,3.5rem)] lg:left-1/2 lg:w-[420px] lg:max-w-[420px] lg:-translate-x-1/2 lg:px-0 lg:pb-0">
        <div className="hero-term-track w-full">
          <Terminal />
        </div>
      </div>

      <div className="hero-scroll pointer-events-none absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 z-30 hidden -translate-x-1/2 lg:block">
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
