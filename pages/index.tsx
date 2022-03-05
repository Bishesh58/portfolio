import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bishesh's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white">
        <Navbar />
        <Banner />
      </div>
    </div>
  )
}

export default Home
