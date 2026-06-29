import { lazy } from 'react'
import type { AppId } from './types'
import Icon from './Icon'

export interface AppMeta {
  id: AppId
  title: string
  path: string
  status: string
  accent: string
  icon: string
  Component: ReturnType<typeof lazy>
}

export const APPS: AppMeta[] = [
  { id: 'projects', title: 'Projects', path: '~/projects', status: 'LOADED', accent: 'var(--accent-1)', icon: 'folder', Component: lazy(() => import('../apps/Projects')) },
  { id: 'terminal', title: 'Terminal', path: 'bishesh@os: ~', status: 'READY', accent: 'var(--accent-2)', icon: 'terminal', Component: lazy(() => import('../apps/Terminal')) },
  { id: 'about', title: 'About', path: '~/readme.md', status: 'OPEN', accent: 'var(--accent-4)', icon: 'user', Component: lazy(() => import('../apps/About')) },
  { id: 'skills', title: 'Skills', path: '~/system/monitor', status: 'LIVE', accent: 'var(--accent-3)', icon: 'activity', Component: lazy(() => import('../apps/Skills')) },
  { id: 'contact', title: 'Contact', path: '~/comms/uplink', status: 'LISTENING', accent: 'var(--accent-6)', icon: 'mail', Component: lazy(() => import('../apps/Contact')) },
]

export const appById = (id: AppId): AppMeta => APPS.find((a) => a.id === id)!

export { Icon }
