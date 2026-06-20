export const NAV_SECTIONS = [
  { id: 'work', label: 'Work', href: '#work', code: '01' },
  { id: 'about', label: 'About', href: '#about', code: '02' },
  { id: 'ai', label: 'AI', href: '#ai', code: '03' },
  { id: 'experience', label: 'Experience', href: '#experience', code: '04' },
  { id: 'contact', label: 'Contact', href: '#contact', code: '05' },
] as const

export type SectionId = (typeof NAV_SECTIONS)[number]['id']

export const SECTION_IDS: readonly SectionId[] = NAV_SECTIONS.map((s) => s.id)
