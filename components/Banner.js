import bishesh from '../public/p2.png'
import Image from 'next/image'
function Banner() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-4">
      <div className="m-4 flex h-[500px] justify-between pt-10">
        <div className="flex-[0.6] p-10 font-Roboto">
          <h1 className=" py-8 text-5xl font-bold">Hey, I'm Bishesh</h1>
          <div className="font-sans text-xl text-gray-200">
            <p>
              A React Web Develoer who's highly motivated and aspired to learn,
              buids & solve problems using latest technologies.
            </p>
            <p>I'm looking for new opportunities to sky-rocket my career!</p>
            <div className="flex space-x-8 py-4 mt-2">
              <button className="btn">Expore my work</button>
              <button className="btn ">Get in touch</button>
            </div>
          </div>
        </div>
        <div className="flex-[0.4]">
          <div className="relative m-4 h-96 w-96 overflow-hidden rounded-full border-8">
            <Image src={bishesh} alt="" layout="responsive" className="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
