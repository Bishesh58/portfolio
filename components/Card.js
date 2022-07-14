import { useEffect } from 'react'

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
          <button className="btnHover link-btn hover:animate-pulse">
            Live demo
          </button>
          <button className="btnHover link-btn  hover:animate-pulse">
            GitHub
          </button>
        </div>
      </div>

      <div className="max-h-[400px] flex-1 overflow-hidden rounded-2xl px-4 md:p-10">
        <img src={img} alt="" className="object-contain" />
      </div>
    </div>
  )
}

export default Card
