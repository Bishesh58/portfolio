import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import MatrixFrame from './matrix/MatrixFrame'
import MatrixSection from './matrix/MatrixSection'
import { experience } from '../data/resume'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

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
    <MatrixSection ref={ref} id="experience" program="ARCHIVE.TIMELINE" index="0x03">
      <SectionHeading kicker="Career — Where I've Been" title="Experience" />

      <div className="xp-list relative">
        <div className="xp-line absolute top-0 bottom-0 left-4 hidden w-px border-l border-dashed border-ember/25 md:block" />

        <div className="flex flex-col gap-8 md:pl-10">
          {experience.map((xp) => (
            <MatrixFrame
              key={xp.company}
              variant="log"
              path={`~/archive/${slugify(xp.company)}.log`}
              label="MEM"
              status="READ-ONLY"
              className="xp-item"
            >
              <p className="matrix-log-prefix">[{xp.period}] loading memory block…</p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-[0.03em] md:text-3xl">
                {xp.role}{' '}
                <span className="font-mono text-lg font-normal text-bone-dim italic">@ {xp.company}</span>
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-bone/75 md:text-lg">{xp.blurb}</p>
              <ul className="mt-6 grid max-w-3xl gap-3 md:grid-cols-2">
                {xp.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-bone-dim">
                    <span className="mt-0.5 shrink-0 font-mono text-[10px] text-ember">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2">
                {xp.tech.map((t) => (
                  <li key={t}>
                    <span className="matrix-token">{t}</span>
                  </li>
                ))}
              </ul>
            </MatrixFrame>
          ))}
        </div>
      </div>
    </MatrixSection>
  )
}
