import type { NextPage } from 'next'
import Head from 'next/head'
import Blog from '../../components/Blog/Blog'

const BlogPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Blog />
      </div>
    </div>
  )
}

export default BlogPage
