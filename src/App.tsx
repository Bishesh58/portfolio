import { useEffect, useState } from 'react'
import Cursor from './components/Cursor'
import Boot, { BOOT_KEY } from './os/Boot'
import Desktop from './os/Desktop'
import Launcher from './os/Launcher'

export default function App() {
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem(BOOT_KEY) === '1'
    } catch {
      return false
    }
  })
  const [launcherOpen, setLauncherOpen] = useState(false)

  const finishBoot = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      /* sessionStorage unavailable — non-fatal */
    }
    setBooted(true)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setLauncherOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="grain">
      <Cursor />
      {booted ? <Desktop onLauncher={() => setLauncherOpen(true)} /> : <Boot onDone={finishBoot} />}
      <Launcher open={launcherOpen} onClose={() => setLauncherOpen(false)} />
    </div>
  )
}
