import Image from 'next/image'
import illustrate from "../public/code1.png"
function About() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col-reverse md:flex-row md:p-4">
        <div className="md:w-full md:flex-[0.6]">
        <Image src={illustrate} layout="responsive"/>
        </div>
        <div className="md:flex-[0.4]">
            <h1>Who am I?</h1>
            <p>I'm a software developer Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non voluptatum labore vitae blanditiis similique laudantium quam reprehenderit facilis necessitatibus at numquam nulla inventore possimus dignissimos nam, aliquid voluptates! Debitis, beatae!</p>
        </div>
    </div>
  )
}

export default About