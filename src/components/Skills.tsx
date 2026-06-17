import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import { skills } from '../data/resume'

export default function Skills() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.skill-row', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skill-list', start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="skills" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Arsenal — Tools of the Trade" title="Skills" />

        <div className="skill-list divide-y divide-bone/10 border-y border-bone/10">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="skill-row group grid gap-4 py-8 transition-colors duration-500 hover:bg-ink-2 md:grid-cols-[240px_1fr] md:gap-10 md:px-6">
              <h3 className="font-serif text-2xl text-bone-dim italic transition-colors duration-300 group-hover:text-ember md:text-3xl">
                {group}
              </h3>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {items.map((s) => (
                  <li
                    key={s}
                    className="font-display text-lg font-semibold tracking-tight text-bone/85 uppercase transition-colors duration-200 hover:text-ember md:text-2xl"
                    data-cursor
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
