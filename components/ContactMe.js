import React, { useState } from 'react'
import Wave from 'react-wavify'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import EmailIcon from '@mui/icons-material/Email'
import { useForm } from 'react-hook-form'
import Modal from '@mui/material/Modal'
import axios from 'axios'

export default function ContactMe() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const sendMessage = async (data) => {
    try {
      setLoading(true)
      await axios
        .post(
          'https://us-central1-portfolio-e2265.cloudfunctions.net/contactEmail',
          data
        )
        .then((result) => {
          setLoading(false)
          reset();
          handleOpen()
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
    <div
      className="mx-auto flex max-w-7xl flex-col p-5 py-6 md:flex-row "
      id="contact"
    >
      <div className="relative ml-5 flex flex-1 items-center justify-center font-Arima text-3xl text-white">
        <Wave
          className="wave h-96 md:h-full"
          fill="#0b395c"
          paused={false}
          options={{
            height: 20,
            amplitude: 45,
            speed: 0.1,
            points: 5,
          }}
        />

        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center p-10">
          <p className="py-8 text-center">
            Let's make something great together.
          </p>
          <p className="py-8 text-center">
            Send me an email, I'll get back to you as soon as I can.
          </p>
        </div>
      </div>
      <div className="mx-4 flex flex-1 flex-col space-y-4  border  p-8 font-Lato text-3xl text-black">
        <h1>Get in touch</h1>
        <form
          className="flex w-full flex-col"
          onSubmit={handleSubmit(sendMessage)}
        >
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            id="name"
            type="text"
            {...register('name', { required: true })}
          />
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
          <label className="label" htmlFor="msg">
            Message
          </label>
          <textarea
            rows={5}
            required
            className="input"
            id="msg"
            type="text"
            {...register('message', { required: true })}
          />

          {loading ? (
            <div className="my-4 w-full p-3 text-green-400">
              {' '}
              <LinearProgress />{' '}
            </div>
          ) : (
            <Button
              type="submit"
              size="large"
              variant="outlined"
              startIcon={<EmailIcon />}
              disabled={loading}
              className="my-4 w-fit rounded-md px-4 capitalize text-blue-500  hover:bg-[#0a3d62] hover:text-white"
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
              You have successfuly send an email. Thank you!  
            </p>
          </div>
        </Modal>
      </div>
    </div>
  )
}
