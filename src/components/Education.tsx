import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import { education, awards } from '../data/resume'

export default function Education() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.edu-card', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-grid', start: 'top 82%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="education" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Foundations — Study & Recognition" title="Education" />

        <div className="edu-grid grid gap-6 md:grid-cols-3">
          {education.map((e) => (
            <div key={e.degree} className="edu-card flex flex-col rounded-2xl border border-bone/10 bg-ink-2 p-8 transition-colors duration-300 hover:border-ember/40">
              <p className="font-mono text-xs tracking-[0.25em] text-ember-soft uppercase">{e.period}</p>
              <h3 className="mt-4 font-display text-xl leading-tight font-bold">{e.degree}</h3>
              <p className="mt-1 font-serif text-bone-dim italic">{e.school}</p>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">{e.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {awards.map((a) => (
            <div key={a.title} className="edu-card flex items-center gap-5 rounded-2xl border border-ember/25 bg-gradient-to-br from-ink-2 to-ember/5 p-8">
              <span className="font-serif text-4xl text-ember italic">✺</span>
              <div>
                <h3 className="font-display text-lg font-bold">{a.title}</h3>
                <p className="text-sm text-bone-dim">{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
