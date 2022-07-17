import type { NextPage } from 'next'
import Head from 'next/head'
import YtVideos from '../../components/YtVideo/YtVideos'

const YoutubePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>latest videos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <YtVideos />
      </div>
    </div>
  )
}

export default YoutubePage
