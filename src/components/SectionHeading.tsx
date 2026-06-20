import { useRef } from 'react'

import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap'

import { matrixTypeChars, prefersReducedMotion } from '../lib/matrixTypewriter'



interface Props {

  kicker: string

  title: string

  id?: string

}



export default function SectionHeading({ kicker, title, id }: Props) {

  const ref = useRef<HTMLDivElement>(null)



  useGSAP(

    () => {

      const split = SplitText.create('.sh-title', { type: 'chars' })

      const caret = ref.current?.querySelector<HTMLElement>('.sh-type-caret')

      const chars = split.chars as HTMLElement[]



      gsap.set(chars, { opacity: 0 })

      if (caret) gsap.set(caret, { autoAlpha: 0 })



      ScrollTrigger.create({

        trigger: ref.current,

        start: 'top 80%',

        once: true,

        onEnter: () => {

          gsap.from('.sh-kicker', {

            opacity: 0,

            x: -24,

            duration: 0.6,

            ease: 'power3.out',

          })



          if (prefersReducedMotion()) {

            gsap.set(chars, { opacity: 1 })

            if (caret) gsap.set(caret, { autoAlpha: 1 })

            return

          }



          matrixTypeChars(chars, {

            onComplete: () => {

              if (caret) gsap.to(caret, { autoAlpha: 1, duration: 0.2 })

            },

          })

        },

      })

    },

    { scope: ref, dependencies: [title] },

  )



  return (

    <div ref={ref} id={id} className="mb-14 md:mb-20">

      <p className="sh-kicker kicker mb-4 flex items-center gap-3">

        <span className="inline-block h-px w-10 bg-ember" />

        {kicker}

      </p>

      <h2 className="flex flex-wrap items-center gap-x-1 text-section-title font-display font-bold tracking-[0.06em] uppercase">

        <span className="sh-title">

          <span className="text-ember/60">&lt;</span>

          {title}

          <span className="text-ember/60">&gt;</span>

        </span>

        <span className="sh-type-caret title-caret opacity-0" aria-hidden />

      </h2>

    </div>

  )

}


