import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import { experience } from '../data/resume'

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.xp-line', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: { trigger: '.xp-list', start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
      })
      gsap.utils.toArray<HTMLElement>('.xp-item').forEach((item) => {
        gsap.from(item, {
          x: -50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 82%' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="experience" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Career — Where I've Been" title="Experience" />

        <div className="xp-list relative">
          <div className="xp-line absolute top-0 bottom-0 left-0 hidden w-px bg-gradient-to-b from-ember via-ember/40 to-transparent md:block" />

          <div className="flex flex-col gap-20 md:pl-16">
            {experience.map((xp) => (
              <article key={xp.company} className="xp-item relative">
                <div className="absolute top-2 -left-16 hidden h-3 w-3 rounded-full border-2 border-ember bg-ink md:block" style={{ transform: 'translateX(-5px)' }} />
                <p className="font-mono text-xs tracking-[0.25em] text-ember-soft uppercase">{xp.period}</p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {xp.role} <span className="font-serif font-normal text-bone-dim italic">@ {xp.company}</span>
                </h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-bone/75">{xp.blurb}</p>
                <ul className="mt-6 grid max-w-3xl gap-3 md:grid-cols-2">
                  {xp.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-bone-dim">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {xp.tech.map((t) => (
                    <li key={t} className="rounded-full bg-ink-3 px-3 py-1 font-mono text-[10px] tracking-wide text-bone-dim uppercase">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
