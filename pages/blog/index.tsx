import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Projects from '../../components/Projects'
import Footer from '../../components/Footer'

const Blog: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Projects />
      </div>
    </div>
  )
}

export default Blog
