import { useState } from 'react'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import logo from '../public/logo.png'

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonial', href: '#testimonial' },
  { name: 'resume', href: '#resume' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sticky top-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-4 shadow-sm ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image width="50px" height="50px" src={logo} />
            </div>
          </div>
          <div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 lg:space-x-6 xl:space-x-10">
                {navigation.map((nav) => (
                  <a
                    key={nav.name}
                    href={nav.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 btnHover hover:text-white"
                  >
                    {nav.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 btnHover focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((nav) => (
                <a
                  key={nav.name}
                  href={nav.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {nav.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </Transition>
    </div>
  )
}

export default Navbar
