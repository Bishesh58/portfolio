import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap } from '../lib/gsap'

interface Props {
  children: ReactNode
  href?: string
  className?: string
  strength?: number
}

export default function MagneticButton({ children, href, className = '', strength = 0.35 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current!
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block ${className}`}>
      {children}
    </a>
  )
}
