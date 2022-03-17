import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import About from '../components/AboutMe'
import Projects from '../components/Projects'
import Testimonial from '../components/Testimonial'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bishesh's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400">
        <div className="z-2 relative mx-auto max-w-7xl">
          <Navbar />
          <Banner />
          <About />
          <Projects />
          <Testimonial />
        </div>
      </div>
    </div>
  )
}

export default Home
