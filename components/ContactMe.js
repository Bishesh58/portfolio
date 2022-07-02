import React from 'react'
import Wave from 'react-wavify'

export default function ContactMe() {
  return (
    <div className="mx-16 flex py-6" id="contact">
      <div className="relative p-8 flex justify-center items-center flex-1 bg-[#2a5372] font-Arima text-3xl text-white">
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
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center flex-col p-12">
          <p className="py-8 text-center">Let's make something great together.</p>
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
          <input className="input" id="name" type="text" />
          <label className="label" htmlFor="email">
            Email
          </label>
          <input className="input" id="email" type="email" />
          <label className="label" htmlFor="msg">
            Message
          </label>
          <textarea rows={5} className="input" id="msg" type="text" />

          <button className="btnHover my-4 w-60 rounded-lg border bg-slate-200 p-3">
            Send message
          </button>
        </form>
      </div>
    </div>
  )
}
