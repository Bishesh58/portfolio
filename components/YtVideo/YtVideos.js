import Image from 'next/image'
import { motion } from 'framer-motion'
import Thumbnail from './Thumbnail'


function YtVidoes() {
  return (
    <section className="mx-auto  max-w-7xl  p-5 text-black">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="py-4 text-center text-5xl font-bold"
      >
        Youtube Video
      </motion.h1>
      
      <div className="flex min-h-screen flex-col md:flex-row">
        <Thumbnail className=""/>
      </div>
    </section>
  )
}

export default YtVidoes
