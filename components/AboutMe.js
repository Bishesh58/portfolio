import Image from 'next/image'
import illustrate from '../public/code1.png'
import { motion } from 'framer-motion'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Skill from './Skill'
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
        className="py-4 text-center text-5xl font-bold"
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
            languages.
          </p>
          <p className="">
            Passionate and motivated, who is always willing to go the extra
            miles to overcome new challenges.
          </p>

          <p>Programming Langues & technologies I've worked with:</p>
          {/* language */}
          <div className="flex items-center space-x-2">
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>Javascript & TypeScript</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>Python</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>C#</p>
            </div>
          </div>
          {/* frontend */}
          <div className="flex items-center space-x-2">
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>ReactJs</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>VueJs</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>NextJs</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>Tailwind</p>
            </div>
          </div>
          {/* backend */}
          <div className="flex items-center space-x-2">
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>NodeJs</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>Firebase</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>Django</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>.Net</p>
            </div>
          </div>
          {/* database */}
          <div className="flex items-center space-x-2">
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>MongoDb</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>MS SQL</p>
            </div>
            <div className="skills">
              <CheckCircleOutlineIcon className="text-blue-400" />
              <p>Firestore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
