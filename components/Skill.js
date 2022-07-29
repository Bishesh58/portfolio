import { Icon, InlineIcon } from '@iconify/react'

function Skill({ title, icon }) {
  return (
    <div className="skills">
      <InlineIcon icon={icon} width={30} height={30} />
      <p>{title}</p>
    </div>
  )
}

export default Skill
