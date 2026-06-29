import { useEffect, useState } from 'react'
import Cursor from './components/Cursor'
import { useIsMobile } from './lib/useIsMobile'
import Boot, { BOOT_KEY } from './os/Boot'
import Desktop from './os/Desktop'
import Launcher from './os/Launcher'
import PhoneOS from './os/PhoneOS'

export default function App() {
  const mobile = useIsMobile()
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
    if (mobile) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setLauncherOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobile])

  return (
    <div className="grain">
      <Cursor />
      {!booted ? (
        <Boot onDone={finishBoot} />
      ) : mobile ? (
        <PhoneOS />
      ) : (
        <Desktop onLauncher={() => setLauncherOpen(true)} />
      )}
      {!mobile && <Launcher open={launcherOpen} onClose={() => setLauncherOpen(false)} />}
    </div>
  )
}
