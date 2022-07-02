import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Button from '@mui/material/Button'
import DownloadIcon from '@mui/icons-material/Download'
import React, { useState } from 'react'


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
          {/* btn */}
          <div className="self-end">
            <Button
              variant="contained"
              component="span"
              startIcon={<DownloadIcon />}
            >
              download
            </Button>
          </div>
          {/* resume */}
          
        </div>
      
      </div>
    </div>
  )
}

export default ResumePage
