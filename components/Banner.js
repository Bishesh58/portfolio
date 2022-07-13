import Typewriter from 'typewriter-effect'
import Link from 'next/link'
import illustrate from '../public/code1.png'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { motion } from 'framer-motion'

function Banner() {
  return (
    <>
      <div className="bg-[#0a3d62]" id="banner">
        {/* hero section */}
        <div className="relative mx-auto flex h-[100vh] max-h-[700px] max-w-7xl flex-col py-10 md:flex-row md:pb-10 2xl:pb-20">
          {/* left headings */}
          <div className="mr-10 flex-1 p-10 font-Roboto text-white sm:mr-5">
            <h1 className="flex pt-10 pb-5 text-3xl font-bold">
              Hello <span class="animate-waving-hand px-2"> 👋</span> ,
            </h1>
            <h1 className="flex pb-10 text-5xl font-bold">I'm Bishesh Sunam</h1>
            <div className="font-sans text-xl text-gray-200">
              <p>
                A React Web Develoer who's highly motivated and aspired to
                learn, buids & solve problems using latest technologies.
              </p>
              <p>I'm looking for new opportunities to sky-rocket my career!</p>
              <div className="py-8 md:flex md:space-x-8">
                <Link href="#projects">
                  <a className="btnHover btn">Expore my work</a>
                </Link>
                <Link href="#contact">
                  <a className="btnHover btn"> Get in touch</a>
                </Link>
              </div>
            </div>
          </div>
          {/* right container */}
          <div className="relative flex-1 overflow-hidden">
            {/* green bg circle */}
            <div className="absolute -bottom-[50%] -right-[50%] h-full w-full rounded-full bg-green-700"></div>
            {/* image */}
            <div className="absolute bottom-0 left-0 flex h-full w-full flex-col rounded-full">
              <img src="/man1.png" alt="" className="object-contain" />
            </div>
            {/* type writer */}
            <div className="absolute bottom-0 right-0 flex h-1/2 w-1/2  items-center justify-center rounded-full">
              <Typewriter
                options={{
                  strings: ['"Knowledge is power" ', '"Knowledge is power" '],
                  autoStart: true,
                  wrapperClassName: 'text-xl justify-self-center',
                  cursorClassName: 'text-xl  text-yellow-400',
                  loop: true,
                }}
              />
            </div>
          </div>
          {/* animated arrow */}
          <div className="absolute bottom-10 left-10 flex animate-bounce  items-center justify-center rounded-full">
            <ArrowDownwardIcon className="h-10 w-10" />
          </div>

          {/* social links */}
          <div className="absolute top-28 right-0 m-auto h-auto ">
            <div className="m-4 flex flex-col items-center justify-center text-sm">
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <GitHubIcon
                  sx={{ backgroundColor: '#252a2e', borderRadius: '50%' }}
                  className="link-btn h-10 w-10"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <LinkedInIcon
                  sx={{ backgroundColor: '#0a66c2', borderRadius: '20%' }}
                  className="link-btn h-10 w-10"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <InstagramIcon
                  sx={{ backgroundColor: '#fb3958', borderRadius: '20%' }}
                  className="link-btn h-10 w-10"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <FacebookIcon
                  sx={{ backgroundColor: '#4267B2', borderRadius: '20%' }}
                  className="link-btn h-10 w-10"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner
