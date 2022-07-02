import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import About from '../components/AboutMe'
import Projects from '../components/Projects'
import ContactMe from '../components/ContactMe'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bishesh's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#0a3d62]">
        <div className="z-2 relative mx-auto max-w-7xl scroll-smooth ">
          <Navbar />
          <Banner />
          <About />
          <Projects />
          <Testimonial />
          <ContactMe />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home
