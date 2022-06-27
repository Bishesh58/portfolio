import React from 'react'

export default function ContactMe() {
  return (
    <div className="mx-16 flex space-x-4 bg-slate-100 py-6">
      <div className="flex-1 px-4">
        Want to hire me or just connect about an idea or opportunity? Drop me
        aline, I'd love to talk.
      </div>
      <div className="flex flex-1 flex-col space-y-4 px-4">
        <h1>Get in touch</h1>
        <form className="flex w-2/3 flex-col">
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

          <button className="my-4 w-1/3 min-w-[120px] rounded-lg border bg-slate-200 p-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
