import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Button from '@mui/material/Button'
import DownloadIcon from '@mui/icons-material/Download'
import React, { useState } from 'react'
import Image from 'next/image'
import resume from '../public/resume.png'

const ResumePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bishesh's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto mb-5 max-w-7xl">
        <Navbar />
        <div className="mx-8 flex flex-col">
          {/* download btn */}
          <div className="self-end">
            {/* <Button
              variant="contained"
              component="span"
              startIcon={<DownloadIcon />}
              className="my-2"
            >
              download
            </Button> */}
          </div>
        
          <Image src={resume} alt="resume" layout="responsive" />
        </div>
      </div>
    </div>
  )
}

export default ResumePage
