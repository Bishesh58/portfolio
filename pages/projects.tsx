import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Projects from '../components/Projects'

const ProjectsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bishesh's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto mb-5 max-w-7xl">
        <Navbar />
        <Projects />
      </div>
    </div>
  )
}

export default ProjectsPage
