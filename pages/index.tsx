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
      <Banner />
      <About />
      <Projects />
      <Testimonial />
      <ContactMe />
    </div>
  )
}

export default Home
