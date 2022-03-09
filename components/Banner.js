import bishesh from '../public/p2.png'
import Image from 'next/image'

function Banner() {
  return (
    <>
      <div className="relative">
        {/* Background circles */}
        <div className="absolute top-0 right-0 left-0 bottom-0">
          <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-gradient-to-r from-green-400 to-blue-50"></div>
          <div className="absolute -top-10 -left-10 h-60 w-60 rounded-full  bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 "></div>
          <div className="absolute  top-10 right-10  h-20 w-20 rounded-full bg-gradient-to-r from-[#65dfc9] to-[#50559c] "></div>
          <div className="absolute  bottom-10 left-10  h-32 w-32 rounded-full bg-gradient-to-r from-[#65dfc9] to-[#50559c] "></div>
        </div>
        {/* banner card */}
        <div className="mx-4 mt-24 rounded-2xl border border-r-0 border-b-0 border-opacity-30 bg-white bg-opacity-10 shadow-2xl backdrop-blur-lg backdrop-filter">
          <div className=" m-4 flex flex-col justify-between pt-10 md:flex-row md:pb-10 2xl:pb-20">
            <div className="flex-[0.6] p-10 font-Roboto text-white ">
              <h1 className=" py-8 text-5xl font-bold">Hey, I'm Bishesh</h1>
              <div className="font-sans text-xl text-gray-200">
                <p>
                  A React Web Develoer who's highly motivated and aspired to
                  learn, buids & solve problems using latest technologies.
                </p>
                <p>
                  I'm looking for new opportunities to sky-rocket my career!
                </p>
                <div className="py-8 md:flex md:space-x-8">
                  <button className="btn btnHover ">Expore my work</button>
                  <button className="btn btnHover ">Get in touch</button>
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
        </div>
      </div>
    </>
  )
}

export default Banner
