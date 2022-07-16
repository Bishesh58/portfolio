import Slider from './slider/Slider'
import { motion } from 'framer-motion'

function Testimonial() {
  return (
    <div className="rounded-[1000px/80px] bg-[#0a3d62]">
      <section
        id="testimonial"
        className="m-10 my-5 mx-auto max-w-7xl p-10 py-5"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
          className="py-4 text-center text-5xl font-bold"
        >
          What they say about me.
        </motion.h1>
        <Slider />
      </section>
    </div>
  )
}

export default Testimonial
