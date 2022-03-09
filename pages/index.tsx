import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import About from '../components/About'
import Projects from '../components/Projects'
import Testimonial from '../components/Testimonial'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bishesh's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400">
        {/* Background circles */}
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-4">
          <div className="-z-1">
            <div className="absolute left-2/3 top-40 h-44 w-44 rounded-full bg-gradient-to-r from-green-400 to-blue-50"></div>
            <div className="absolute right-2/3 top-32 h-60 w-60 rounded-full  bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 "></div>
            <div className="left-4/5  absolute top-1/2 h-32 w-32 rounded-full bg-gradient-to-r from-[#65dfc9] to-[#50559c] "></div>
          </div>
        </div>
        {/* Contents */}
        <div className="z-2 absolute top-0 left-0 right-0 mx-auto max-w-7xl">
          <Navbar />
          <Banner />
          <About />
          <Projects />
          <Testimonial />
          <About />
          <About />
          <About />
        </div>
      </div>
    </div>
  )
}

export default Home
