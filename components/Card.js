import { useEffect } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import Button from '@mui/material/Button'

function Card({ title, technologies, icons, img, code, demo, description }) {
  useEffect(() => {}, [])

  return (
    <div
      className="flex flex-col p-5 md:odd:flex-row md:even:flex-row-reverse 
      "
    >
      <div className="flex-1">
        <h1 className="py-2 text-2xl font-bold capitalize">{title}</h1>
        <p>technologies</p>
        <p className="py-2">{technologies}</p>
        <p className="py-2">{icons}</p>
        <p className="py-2 font-light leading-8">{description}</p>
        <div className="my-2">
          <Button
            size="large"
            variant="contained"
            startIcon={<LaunchIcon />}
            className="m-2 rounded-md bg-[#1abc9c] px-4 capitalize  text-white hover:bg-[#0a3d62] hover:text-white"
          >
            Live Demo
          </Button>
          <Button
            size="large"
            variant="contained"
            startIcon={<GitHubIcon />}
            className="m-2 rounded-md px-4 capitalize text-black hover:bg-[#0a3d62] hover:text-white"
          >
            GitHub
          </Button>
        </div>
      </div>

      <div className="flex max-h-[400px] flex-1 items-center justify-center overflow-hidden rounded-2xl px-4 md:p-10">
        <img src={img} alt="" className="object-contain" />
      </div>
    </div>
  )
}

export default Card
