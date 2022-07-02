import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import About from '../components/AboutMe'

const AboutPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bishesh's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl mb-5">
        <Navbar />
        <About />
      </div>
    </div>
  )
}

export default AboutPage
