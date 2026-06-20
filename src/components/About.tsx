import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { profile, stats } from '../data/resume'
import MatrixFrame from './matrix/MatrixFrame'
import MatrixSection from './matrix/MatrixSection'
import SectionHeading from './SectionHeading'

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
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
    <MatrixSection ref={ref} id="about" program="IDENTITY.CORE" index="0x01">
      <SectionHeading kicker="About — The Short Version" title="Who I Am" />

      <MatrixFrame variant="panel" path="~/sys/profile.log" label="READ" status="DECRYPTED">
        <p className="about-text font-display text-[clamp(1.35rem,3vw,2.35rem)] leading-[1.3] font-medium tracking-[0.02em]">
          <span className="matrix-log-prefix mb-4 block">[ BOOT ] initializing identity matrix…</span>
          {profile.summary}{' '}
          <span className="font-mono text-ember italic">No hand-offs, no excuses</span> — just software that
          ships and keeps working.
        </p>
      </MatrixFrame>

      <div className="stat-grid mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((s, i) => (
          <MatrixFrame
            key={s.label}
            variant="metric"
            label={`METRIC_0${i + 1}`}
            status="SYNCED"
            className="stat-card"
          >
            <p className="matrix-metric-id">0x0{i + 1} · {s.label}</p>
            <p
              className="stat-value mt-3 font-display text-4xl font-black tracking-tight text-bone md:text-5xl"
              data-value={s.value}
            >
              <span>0</span>
              <span className="text-ember">{s.suffix}</span>
            </p>
          </MatrixFrame>
        ))}
      </div>
    </MatrixSection>
  )
}
