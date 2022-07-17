import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Projects from '../../components/Projects'
import Footer from '../../components/Footer'

const Youtube: NextPage = () => {
  return (
    <div>
      <Head>
        <title>latest videos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Projects />
      </div>
    </div>
  )
}

export default Youtube
