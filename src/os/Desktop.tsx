import { useEffect } from 'react'
import { useTheme } from '../lib/theme'
import FluxField from '../components/FluxField'
import MenuBar from './MenuBar'
import WindowManager from './WindowManager'
import Dock from './Dock'
import { osStore } from './store'

export default function Desktop({ onLauncher }: { onLauncher: () => void }) {
  const { theme } = useTheme()

  useEffect(() => {
    // Pre-arrange the desktop so no one faces an empty screen (recruiter fast-path).
    if (osStore.getState().order.length === 0) {
      osStore.openWindow('projects', { x: 64, y: 84, w: 660, h: 430 })
      osStore.openWindow('terminal', { x: 372, y: 300, w: 520, h: 280 })
    }
  }, [])

  return (
    <div className="os-desktop">
      <div className="os-wallpaper" aria-hidden>
        <FluxField theme={theme} dim={0.4} />
      </div>
      <MenuBar onLauncher={onLauncher} />
      <WindowManager />
      <Dock />
    </div>
  )
}
