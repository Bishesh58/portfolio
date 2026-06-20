import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import MatrixFrame from './matrix/MatrixFrame'
import MatrixSection from './matrix/MatrixSection'
import { aiIntro, aiPractices, aiToolkit } from '../data/resume'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

export default function AIWorkflow() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const split = SplitText.create('.ai-intro', { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.035,
          ease: 'none',
          scrollTrigger: { trigger: '.ai-intro', start: 'top 78%', end: 'bottom 50%', scrub: 0.6 },
        },
      )

      gsap.from('.ai-tool', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ai-toolkit', start: 'top 82%' },
      })

      gsap.from('.ai-practice', {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ai-practices', start: 'top 82%' },
      })
    },
    { scope: ref },
  )

  return (
    <MatrixSection ref={ref} id="ai" program="NEURAL.SYNC" index="0x05" className="overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-ember/8 blur-[150px]" />

      <SectionHeading kicker="AI-Native Engineering" title="Building With AI" />

      <MatrixFrame variant="panel" path="~/neural/manifesto.txt" label="SYNC" status="ACTIVE">
        <p className="ai-intro font-display text-[clamp(1.25rem,2.8vw,2.1rem)] leading-[1.35] font-medium tracking-[0.02em]">
          <span className="matrix-log-prefix mb-4 block">[ AGENT ] neural link established…</span>
          {aiIntro}
        </p>
      </MatrixFrame>

      <div className="ai-toolkit mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aiToolkit.map((t) => (
          <MatrixFrame
            key={t.name}
            variant="agent"
            label={`AGENT::${t.name.toUpperCase()}`}
            status="RUNNING"
            className="ai-tool group"
          >
            <h3 className="font-display text-xl font-bold tracking-[0.04em] uppercase transition-colors duration-300 group-hover:text-ember">
              {t.name}
            </h3>
            <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-ember-soft uppercase">{t.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-bone-dim">{t.detail}</p>
          </MatrixFrame>
        ))}
      </div>

      <div className="ai-practices mt-6 grid gap-4 md:grid-cols-2">
        {aiPractices.map((p) => (
          <MatrixFrame
            key={p.index}
            variant="log"
            path={`~/neural/routine_${slugify(p.title)}.sh`}
            label="SUB"
            status="EXEC"
            className="ai-practice"
          >
            <p className="matrix-cmd">
              <span className="matrix-cmd-prompt">$ </span>./routine_{p.index}.sh
            </p>
            <h3 className="mt-4 font-display text-lg font-bold tracking-[0.03em]">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-bone-dim">{p.body}</p>
          </MatrixFrame>
        ))}
      </div>
    </MatrixSection>
  )
}
