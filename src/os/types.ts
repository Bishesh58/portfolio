export type AppId = 'terminal' | 'projects' | 'about' | 'skills' | 'contact'

export interface Geom {
  x: number
  y: number
  w: number
  h: number
}

export interface WinState extends Geom {
  id: AppId
  minimized: boolean
  maximized: boolean
  prev?: Geom
}

export interface OSState {
  windows: Partial<Record<AppId, WinState>>
  order: AppId[]
  focused: AppId | null
}
