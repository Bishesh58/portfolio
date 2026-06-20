import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import MatrixFrame from './matrix/MatrixFrame'
import MatrixSection from './matrix/MatrixSection'
import { education, awards } from '../data/resume'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

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
    <MatrixSection ref={ref} id="education" program="CREDENTIALS.DAT" index="0x06">
      <SectionHeading kicker="Foundations — Study & Recognition" title="Education" />

      <div className="edu-grid grid gap-4 md:grid-cols-3">
        {education.map((e) => (
          <MatrixFrame
            key={e.degree}
            variant="panel"
            path={`~/creds/${slugify(e.school)}.dat`}
            label="FILE"
            status="VERIFIED"
            className="edu-card flex flex-col"
          >
            <p className="matrix-log-prefix">[{e.period}] credential found</p>
            <h3 className="mt-4 font-display text-xl leading-tight font-bold">{e.degree}</h3>
            <p className="mt-1 font-mono text-sm text-bone-dim italic">{e.school}</p>
            <p className="mt-4 text-sm leading-relaxed text-bone-dim">{e.note}</p>
          </MatrixFrame>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {awards.map((a) => (
          <MatrixFrame
            key={a.title}
            variant="module"
            path="~/achievements/unlock.dat"
            label="ACHV"
            status="UNLOCKED"
            className="edu-card flex items-center gap-5"
          >
            <span className="font-mono text-3xl text-ember md:text-4xl">◈</span>
            <div>
              <p className="matrix-log-prefix mb-2">achievement.unlocked()</p>
              <h3 className="font-display text-lg font-bold">{a.title}</h3>
              <p className="mt-1 text-sm text-bone-dim">{a.detail}</p>
            </div>
          </MatrixFrame>
        ))}
      </div>
    </MatrixSection>
  )
}
