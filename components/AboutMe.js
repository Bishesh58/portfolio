import Image from 'next/image'
import illustrate from '../public/code1.png'
import { motion } from 'framer-motion'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function About() {
  return (
    <section id="about" className="mx-auto  max-w-7xl  p-5 text-black">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="py-4 text-5xl font-bold text-center"
      >
        About me
      </motion.h1>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink md:w-full md:flex-1">
          <Image src={illustrate} layout="responsive" />
        </div>
        <div className="flex flex-col justify-center space-y-6  px-4 font-light md:flex-1 md:border-l md:text-lg ">
          <p className="">
            I'm a software developer expertise in building professional
            websites, desktop applications, software and more with deep
            knowledge and understanding of multiple technologies and programming
            languages such as MERN stack, Nextjs, Vuejs, python Django, C# .NET,
            and so on.
          </p>
          <p className="">Adapted and worked in an Agile environment.</p>
          <p className="">
            Passionate and motivated, who is always willing to go the extra mile
            to overcome new challenges.
          </p>
          <p>tech stack:</p>
          <CheckCircleOutlineIcon className="text-blue-400"/>
        </div>
      </div>
    </section>
  )
}

export default About
