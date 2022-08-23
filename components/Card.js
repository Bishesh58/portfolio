import { useEffect } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { Icon, InlineIcon } from '@iconify/react'
import ImageSlider from './slider/ImageSlider'

function Card({ title, technologies, icons, imgs, code, demo, description }) {
  useEffect(() => {}, [])

  return (
    <div
      className="flex flex-col gap-2 p-5 lg:gap-4 lg:odd:flex-row lg:even:flex-row-reverse 
      "
    >
      <div className="flex-1">
        <h1 className="py-2 text-2xl font-bold capitalize">{title}</h1>
        <p>Technologies:</p>
        <p className="py-2">{technologies}</p>
        <div className="flex space-x-2">
          {icons.map((icon) => (
            <Icon icon={icon} width={40} height={40} />
          ))}
        </div>

        <p className="break-normal py-2 font-light leading-8">{description}</p>
        <div className="my-2 flex space-x-2">
          <Link
            underline="none"
            href={demo}
            target="blank"
            className="my-3  rounded-md bg-[#1abc9c] p-3 px-4 capitalize  !text-white hover:bg-[#0a3d62] hover:text-white"
          >
            <LaunchIcon />
            <span className="ml-2">Live Demo</span>
          </Link>
          <Link
            underline="none"
            href={code}
            target="blank"
            className="my-3 rounded-md bg-slate-100 p-3  px-4 capitalize text-black hover:bg-[#0a3d62] hover:text-white"
          >
            <GitHubIcon />
            <span className="ml-2">GitHub</span>
          </Link>
        </div>
      </div>
      <div className="items-center justify-center lg:flex">
        <ImageSlider imgs={imgs} />
      </div>
    </div>
  )
}

export default Card
