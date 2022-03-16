function Card() {
  return (
    <div className="flex flex-col m-2 h-96 w-96 rounded-2xl border border-gray-300 p-4">
      <div className="flex-[0.9] rounded-2xl  bg-slate-600 ">
        <img src="" alt="" />
      </div>
      <div className="flex-[0.1] flex justify-evenly my-6">
        <button className="link-btn px-8">Live demo</button>
        <button className="link-btn px-8">GitHub</button>
      </div>
    </div>
  )
}

export default Card
