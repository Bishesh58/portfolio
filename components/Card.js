function Card({ title, img, code, demo, description }) {
  return (
    <div className="!z-10 m-2 flex h-[400px] w-full  max-w-[360px] flex-col rounded-2xl bg-[#0a3d62] border border-gray-500 p-4 hover:shadow-lg hover:shadow-red-200">
      <div className="flex-[0.9] rounded-2xl  bg-slate-600 ">
        <img src="" alt="" />
      </div>
      <div className="py-2">{title}</div>
      <div className="py-2">{description}</div>
      <div className="my-2 flex flex-[0.1] justify-between space-x-8">
        <button className="link-btn w-1/2 px-6">Live demo</button>
        <button className="link-btn w-1/2 px-6">GitHub</button>
      </div>
    </div>
  )
}

export default Card
