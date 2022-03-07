import bishesh from '../public/p2.png'
import Image from 'next/image'
import Wave from 'react-wavify'

function Banner() {
  return (
    <>
      <div className="bg-[#8c59cf]">
        <div className="m-4 flex h-[500px] flex-col justify-between pt-10 md:flex-row">
          <div className="flex-[0.6] p-10 font-Roboto">
            <h1 className=" py-8 text-5xl font-bold">Hey, I'm Bishesh</h1>
            <div className="font-sans text-xl text-gray-200">
              <p>
                A React Web Develoer who's highly motivated and aspired to
                learn, buids & solve problems using latest technologies.
              </p>
              <p>I'm looking for new opportunities to sky-rocket my career!</p>
              <div className="py-4 md:flex md:space-x-8">
                <button className="btn m-2">Expore my work</button>
                <button className="btn m-2">Get in touch</button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:flex-[0.4]">
            <div className="relative m-4 h-52 w-52 overflow-hidden rounded-full border-8 md:h-96 md:w-96">
              <Image src={bishesh} alt="" layout="responsive" className="" />
            </div>
          </div>
        </div>
        {/* for wave */}
        <Wave fill="url(#gradient)">
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="10%" stopColor="#8853cf" />
              <stop offset="90%" stopColor="#8c59cf" />
            </linearGradient>
          </defs>
        </Wave>
      </div>
    </>
  )
}

export default Banner
