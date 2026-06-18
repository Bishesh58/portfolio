import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'

interface Props {
  kicker: string
  title: string
  id?: string
}

export default function SectionHeading({ kicker, title, id }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const split = SplitText.create('.sh-title', { type: 'words,chars' })
      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.018,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.sh-kicker', {
        opacity: 0,
        x: -24,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} id={id} className="mb-14 md:mb-20">
      <p className="sh-kicker kicker mb-4 flex items-center gap-3">
        <span className="inline-block h-px w-10 bg-ember" />
        {kicker}
      </p>
      <h2 className="sh-title text-section-title font-display font-bold tracking-tight uppercase">
        {title}
      </h2>
    </div>
  )
}
