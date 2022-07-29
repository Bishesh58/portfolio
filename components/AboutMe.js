import Image from 'next/image'
import illustrate from '../public/code1.png'
import { motion } from 'framer-motion'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Skill from './Skill'
import { Icon, InlineIcon } from '@iconify/react'

function About() {
  const skills = [
    [
      {
        title: 'Javascript',
        Icon: 'vscode-icons:file-type-js-official',
      },
      {
        title: 'TypeScript',
        Icon: 'vscode-icons:file-type-typescript',
      },
      {
        title: 'Python',
        Icon: 'vscode-icons:file-type-python',
      },
      {
        title: 'CSharp',
        Icon: 'vscode-icons:file-type-csharp',
      },
    ],
    [
      {
        title: 'ReactJs',
        Icon: 'vscode-icons:file-type-reactjs',
      },
      {
        title: 'VueJs',
        Icon: 'vscode-icons:file-type-vue',
      },
      {
        title: 'NextJs',
        Icon: 'vscode-icons:file-type-next',
      },
      {
        title: 'Tailwind',
        Icon: 'vscode-icons:file-type-tailwind',
      },
    ],
    [
      {
        title: 'NodeJs',
        Icon: 'vscode-icons:file-type-node',
      },
      {
        title: 'Firebase',
        Icon: 'vscode-icons:file-type-firebase',
      },
      {
        title: 'Django',
        Icon: 'vscode-icons:file-type-django',
      },
      {
        title: '.net',
        Icon: 'mdi:dot-net',
      },
    ],
    [
      {
        title: 'MongoDB',
        Icon: 'logos:mongodb-icon',
      },
      {
        title: 'MS SQL',
        Icon: 'carbon:sql',
      },
      {
        title: 'Firebase Firestore',
        Icon: 'vscode-icons:file-type-firestore',
      },
    ],
  ]

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
          <div className="justify-startitems-center flex space-x-2">
            {skills[0].map((item) => (
              <div className="flex items-center  space-x-2">
                <Skill title={item.title} icon={item.Icon} />
              </div>
            ))}
          </div>
          <div className="justify-startitems-center flex space-x-2">
            {skills[1].map((item) => (
              <div className="flex items-center  space-x-2">
                <Skill title={item.title} icon={item.Icon} />
              </div>
            ))}
          </div>
          <div className="justify-startitems-center flex space-x-2">
            {skills[2].map((item) => (
              <div className="flex items-center  space-x-2">
                <Skill title={item.title} icon={item.Icon} />
              </div>
            ))}
          </div>
          <div className="justify-startitems-center flex space-x-2">
            {skills[3].map((item) => (
              <div className="flex items-center  space-x-2">
                <Skill title={item.title} icon={item.Icon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
