import Image from 'next/image'
import illustrate from '../public/code1.png'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import Wave from 'react-wavify'
function About() {
  return (
    <section
      id="about"
      className="flex flex-col-reverse items-center justify-center bg-gray-900/10 md:m-16 md:flex-row md:rounded-bl-[110px] md:rounded-tr-[110px] md:p-4"
    >
      <div className="flex-shrink md:w-full md:flex-[0.6]">
        <Image src={illustrate} layout="responsive" />
      </div>
      <div className="p-4 font-sans text-xl text-gray-200 md:flex-[0.4]">
        <h1 className="py-4 text-3xl font-bold">Who am I ?</h1>
        <div className="text-base md:text-lg">
          <p>
            I'm a software developer expertise in building professional
            websites, desktop applications, software and more with deep
            knowledge and understanding of multiple technologies and programming
            languages such as MERN stack, Nextjs, Vuejs, python Django, C# .NET,
            and so on. Adapted and worked in an Agile environment. Passionate
            and motivated, who is always willing to go the extra mile to
            overcome new challenges.
          </p>
        </div>
        <div className="flex flex-col ">
          <h2 className="py-4 capitalize">Get in touch</h2>
          <div className="flex space-x-4 text-sm ">
            <div className=" link-btn">
              <GitHubIcon
                sx={{ backgroundColor: '#252a2e', borderRadius: '50%' }}
              />
              <p className="pl-2"> GitHub</p>
            </div>
            <div className=" link-btn">
              <LinkedInIcon
                sx={{ backgroundColor: '#0a66c2', borderRadius: '20%' }}
              />
              <p className="pl-2">LinkedIn</p>
            </div>
            <div className=" link-btn">
              <InstagramIcon
                sx={{ backgroundColor: '#fb3958', borderRadius: '20%' }}
              />
              <p className="pl-2">Instagram</p>
            </div>
            <div className=" link-btn">
              <FacebookIcon
                sx={{ backgroundColor: '#4267B2', borderRadius: '20%' }}
              />
              <p className="pl-2">Facebook</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
