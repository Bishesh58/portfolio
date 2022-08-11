import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import logo from '../public/logo.png'
import { useRouter } from 'next/router'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'
import * as Scroll from 'react-scroll'
const navigation = [
  { name: 'About', href: 'about' },
  { name: 'Projects', href: 'projects' },
  { name: 'Testimonial', href: 'testimonial' },
  { name: 'Contact me', href: 'contact' },
]

const navLinks = [
  { name: 'Youtube videos', href: '/youtube' },
  { name: 'Blog', href: '/blog' },
]

function Navbar() {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const scrollToTop = () => {
    Scroll.animateScroll.scrollToTop()
  }
  return (
    <div className="sticky top-0 z-50 bg-[#0a3d62]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 text-[#eff6ff] shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                width="60px"
                height="60px"
                src={logo}
                className="hover:cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div>
          <div className="hidden md:block ">
            <div className="ml-10 flex items-baseline space-x-4 md:space-x-2 lg:space-x-6 xl:space-x-10">
              {router.route === '/' &&
                navigation.map((nav) => (
                  <ScrollLink
                    activeClass="active"
                    to={nav.href}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    key={nav.name}
                    className="btnHover block rounded-md px-3 py-1 last:rounded-full last:border last:border-green-400 hover:cursor-pointer"
                  >
                    {nav.name}
                  </ScrollLink>
                ))}

              {/* {navLinks.map((navLink) => (
                <Link
                  scroll={true}
                  shadow={true}
                  passHref={true}
                  href={navLink.href}
                  key={navLink.name}
                >
                  <a className="btnHover block rounded-md px-3 py-1 hover:cursor-pointer">
                    {navLink.name}
                  </a>
                </Link>
              ))} */}
            </div>
          </div>
        </div>
        {/* btn menu */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none"
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
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-96"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-96"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((nav) => (
                <ScrollLink
                  activeClass="active"
                  to={nav.href}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  key={nav.name}
                  className="btnHover mx-10  my-1 block rounded-md px-3 py-1 hover:scale-105  hover:cursor-pointer"
                >
                  {nav.name}
                </ScrollLink>
              ))}
            </div>
          </div>
        )}
      </Transition>
    </div>
  )
}

export default Navbar
