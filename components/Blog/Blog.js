import Image from 'next/image'
import { motion } from 'framer-motion'

function Blog() {
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
        Blog
      </motion.h1>
      <div className="flex min-h-screen flex-col md:flex-row">
        Blogs content under development
      </div>
    </section>
  )
}

export default Blog
