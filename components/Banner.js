import Typewriter from 'typewriter-effect'
import Link from 'next/link'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import ArrowDownwardIcon from '@mui/icons-material/ArrowCircleDown'
import { motion } from 'framer-motion'
import Particle from './Particle'

function Banner() {
  return (
    <>
      <div className="bg-[#0a3d62]" id="banner">
        {/* hero section */}
        <div className="relative mx-auto flex h-[100vh] max-h-[750px] max-w-7xl flex-col py-10 md:flex-row md:pb-10 2xl:pb-20">
          {/* left headings */}
          <motion.div
            initial={{ opacity: 0, x: 0, y: -200 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            className="mr-10 flex-1 p-10 text-white sm:mr-5"
          >
            <h1 className="flex pt-10 pb-5 text-xl font-bold md:text-3xl">
              Hello <span className="animate-waving-hand px-2"> 👋</span> ,
            </h1>
            <h1 className="flex py-2 pb-10 font-Arima text-3xl font-bold md:text-6xl">
              I'm Bishesh Sunam
            </h1>
            <div className="font-thin tracking-wider text-gray-200 md:text-xl">
              <p>
                A React Web Develoer who's highly motivated and aspired to
                learn, buids & solve problems using latest technologies.
              </p>
              <p>I'm looking for new opportunities to sky-rocket my career!</p>
              <div className="my-4 flex flex-col md:my-10 md:flex-row md:space-x-4">
                <Link href="#projects">
                  <motion.a
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1,
                      duration: 0.5,
                    }}
                    className=" btnHover btn"
                  >
                    Expore my work
                  </motion.a>
                </Link>
                <Link href="#contact">
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1,
                      duration: 0.5,
                    }}
                    className=" btnHover btn"
                  >
                    {' '}
                    Get in touch
                  </motion.a>
                </Link>
              </div>
            </div>
          </motion.div>
          {/* right container */}
          <div className="relative flex-1 overflow-hidden">
            {/* bg circle */}
            <div className=" absolute h-full w-full rounded-full  bg-[#1c4766]"></div>

            {/* image */}
            <div className="absolute bottom-0 left-0 flex h-full w-full flex-col rounded-full">
              <Particle className="top-50 right-50 " />
              <img
                src="/profile.png"
                alt=""
                className="hidden h-full rounded-t-full bg-[#1c4766] object-contain md:block"
              />
            </div>
            {/* type writer */}
            <div className="absolute bottom-14 right-0 flex  w-full  items-center justify-center rounded-full">
              <Typewriter
                options={{
                  strings: [`Want to hire me ?`, `I would love to talk!`],
                  autoStart: true,
                  wrapperClassName: 'text-3xl justify-self-center',
                  cursorClassName: 'text-3xl  text-yellow-400',
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
          <div className="absolute top-56 right-0 m-auto h-auto ">
            <div className="m-4 flex flex-col items-center justify-center text-sm">
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  delay: 4,
                  duration: 0.5,
                }}
              >
                <GitHubIcon
                  sx={{ backgroundColor: '#252a2e', borderRadius: '50%' }}
                  className="link-btn h-10 w-10 "
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 4.1, duration: 0.5 }}
              >
                <LinkedInIcon
                  sx={{ backgroundColor: '#0a66c2', borderRadius: '20%' }}
                  className="link-btn h-10 w-10"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 4.2, duration: 0.5 }}
              >
                <InstagramIcon
                  sx={{ backgroundColor: '#fb3958', borderRadius: '20%' }}
                  className="link-btn h-10 w-10"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 4.3, duration: 0.5 }}
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
