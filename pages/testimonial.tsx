import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Testimonial from '../components/Testimonial'

const TestimonialPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bishesh's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" mx-auto mb-5 max-w-7xl">
        <Navbar />
        <Testimonial />
      </div>
    </div>
  )
}

export default TestimonialPage
