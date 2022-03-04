import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed top-0 left-0 right-0">
        <Navbar />
      </div>
      {/* <div className=" min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> */}
      <div className=" min-h-screen">
      <div>
       
      </div>
      </div>
    </div>
  )
}

export default Home
