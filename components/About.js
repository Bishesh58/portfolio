import Image from 'next/image'
import illustrate from '../public/code1.png'
function About() {
  return (
    <div className="flex flex-col-reverse items-center justify-center md:flex-row md:p-4">
      <div className="flex-shrink md:w-full md:flex-[0.6]">
        <Image src={illustrate} layout="responsive" />
      </div>
      <div className="p-4 font-sans text-xl text-gray-200 md:flex-[0.4]">
        <h1 className="py-4 text-3xl font-bold">Who am I?</h1>
        <div className="text-base md:text-lg">
          <p>
            I'm a software developer expertise in building professional
            websites, desktop applications, games, software, and more with deep
            knowledge and understanding of multiple technologies and programming
            languages such as MERN stack, Nextjs, python Django, C# .NET, and so
            on. Adapted and worked in an Agile environment. Passionate and
            motivated, who is always willing to go the extra mile to overcome
            new challenges as a Professional Software Developer.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
