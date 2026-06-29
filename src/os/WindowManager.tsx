import { APPS } from './apps'
import { useOS } from './store'
import Window from './Window'

export default function WindowManager() {
  const order = useOS((s) => s.order)
  const windows = useOS((s) => s.windows)
  const focused = useOS((s) => s.focused)

  return (
    <>
      {order.map((id, i) => {
        const win = windows[id]
        if (!win || win.minimized) return null
        const meta = APPS.find((a) => a.id === id)
        if (!meta) return null
        return <Window key={id} meta={meta} win={win} z={10 + i} focused={focused === id} />
      })}
    </>
  )
}
