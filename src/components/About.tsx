import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { profile, stats } from '../data/resume'

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // word-by-word reveal of the manifesto
      const split = SplitText.create('.about-text', { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        },
      )

      // counters
      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
        const end = Number(el.dataset.value)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.firstChild!.textContent = String(Math.round(obj.v))
          },
        })
      })

      gsap.from('.stat-card', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stat-grid', start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="about" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="kicker mb-10 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-ember" />
          About — The Short Version
        </p>

        <p className="about-text max-w-4xl font-display text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.25] font-medium tracking-tight">
          {profile.summary} <span className="font-serif text-ember italic">No hand-offs, no excuses</span> — just
          software that ships and keeps working.
        </p>

        <div className="stat-grid mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-bone/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-card bg-ink-2 p-8 md:p-10">
              <p className="stat-value font-display text-5xl font-black tracking-tight text-bone md:text-6xl" data-value={s.value}>
                <span>0</span>
                <span className="text-ember">{s.suffix}</span>
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-bone-dim uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
