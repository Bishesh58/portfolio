import bishesh from '../public/p2.png'
import Image from 'next/image'
import Typewriter from 'typewriter-effect'
import Link from 'next/link'

function Banner() {
  return (
    <>
      <div className="relative" id="banner">
        {/* Background circles */}
        <div className="absolute top-0 right-0 left-0 bottom-0">
          <div className="absolute right-4 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-r from-green-400 to-[#82ccdd]"></div>
          <div className="absolute -top-10 left-4 h-40 w-40 rounded-full  bg-gradient-to-r from-[#60a3bc] via-[#60a3bc] to-[#60a3bc] "></div>
          <div className="absolute  top-10 right-16  h-20 w-20 rounded-full bg-gradient-to-r from-[#65dfc9] to-[#50559c] "></div>
          <div className="absolute  bottom-10 left-16  h-32 w-32 rounded-full bg-gradient-to-r from-[#65dfc9] to-[#50559c] "></div>
        </div>
        {/* banner card */}
        <div className="mx-14 mt-24 rounded-2xl border border-r-0 border-b-0 border-opacity-30 bg-white bg-opacity-10 shadow-2xl backdrop-blur-lg backdrop-filter">
          <div className="m-4 flex flex-col justify-between pt-10 md:flex-row md:pb-10 2xl:pb-20">
            <div className="flex-[0.6] p-10 font-Roboto text-white ">
              <div className="py-8">
                <Typewriter
                  options={{
                    strings: ['Hey, ', "I'm Bishesh"],
                    autoStart: true,
                    wrapperClassName: 'text-5xl font-bold',
                    cursorClassName: 'text-5xl font-bold text-yellow-400',
                    loop: true,
                  }}
                />
              </div>

              <div className="font-sans text-xl text-gray-200">
                <p>
                  A React Web Develoer who's highly motivated and aspired to
                  learn, buids & solve problems using latest technologies.
                </p>
                <p>
                  I'm looking for new opportunities to sky-rocket my career!
                </p>
                <div className="py-8 md:flex md:space-x-8">
                  <Link
                    href="#projects"
                  >
                   <a className="btnHover btn">Expore my work</a> 
                  </Link>
                  <Link
                    href="#contact"
                  >
                   <a className="btnHover btn"> Get in touch</a> 
                  </Link>

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
