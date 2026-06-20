import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import MatrixFrame from './matrix/MatrixFrame'
import MatrixSection from './matrix/MatrixSection'
import { skills } from '../data/resume'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

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
    <MatrixSection ref={ref} id="skills" program="CAPABILITIES.MTX" index="0x04">
      <SectionHeading kicker="Arsenal — Tools of the Trade" title="Skills" />

      <div className="skill-list flex flex-col gap-4">
        {Object.entries(skills).map(([group, items]) => (
          <MatrixFrame
            key={group}
            variant="panel"
            path={`~/skills/${slugify(group)}.mtx`}
            label="QUERY"
            status="INDEXED"
            className="skill-row group"
          >
            <p className="matrix-cmd">
              <span className="matrix-cmd-prompt">$ </span>
              ls -la ./{group.toLowerCase()}/
              <span className="ml-2 text-bone-dim">— {items.length} entries</span>
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 md:gap-3">
              {items.map((s) => (
                <li key={s}>
                  <span className="matrix-token font-display text-sm font-semibold md:text-base" data-cursor>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </MatrixFrame>
        ))}
      </div>
    </MatrixSection>
  )
}
