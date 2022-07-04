import React, { useState } from 'react'
import Wave from 'react-wavify'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Modal from '@mui/material/Modal'
import axios from 'axios'

export default function ContactMe() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    let data = {
      name,
      email,
      message,
    }
    console.log(data)
    try {
      setLoading(true)
      await axios
        .post(
          'https://us-central1-portfolio-e2265.cloudfunctions.net/contactEmail',
          data
        )
        .then((result) => {
          setLoading(false)
          handleOpen()
          setName('')
          setEmail('')
          setMessage('')
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)
        })
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }

  return (
    <div className="mx-16 flex py-6" id="contact">
      <div className="relative flex flex-1 items-center justify-center bg-[#afc0ce] p-8 font-Arima text-3xl text-white">
        <Wave
          className="wave"
          fill="#0b395c"
          paused={false}
          options={{
            height: 20,
            amplitude: 45,
            speed: 0.1,
            points: 5,
          }}
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center p-12">
          <p className="py-8 text-center">
            Let's make something great together.
          </p>
          <p className="py-8 text-center">
            Send me an email, I'll get back to you as soon as I can.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4 bg-slate-100 p-8">
        <h1>Get in touch</h1>
        <form className="flex w-full flex-col">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label" htmlFor="msg">
            Message
          </label>
          <textarea
            rows={5}
            className="input"
            id="msg"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {loading ? (
            <div className="my-4 w-full rounded-lg border bg-slate-500 p-3 text-white">
              {' '}
              <LinearProgress />{' '}
            </div>
          ) : (
            <Button
              className="btnHover my-4 w-52 rounded-lg border bg-slate-500 p-3 text-white"
              onClick={sendMessage}
              disabled={loading}
            >
              Send message
            </Button>
          )}
        </form>
        <Modal
          open={open}
          onClose={handleClose}
          className="mt-20 flex h-16 w-full items-center justify-center bg-green-400 text-white"
          style={{ alignItems: 'center', justifyContent: 'center' }}
          disableAutoFocus={true}
        >
          <div className="border-none">
            <p className="!border-none p-2 outline-none">
              Your email has been send!
            </p>
          </div>
        </Modal>
      </div>
    </div>
  )
}
