import Card from './Card'
import Particle from './Particle'
import { motion } from 'framer-motion'

function Projects() {
  const cards = [
    {
      title: 'Amazon Clone',
      technologies: 'A | B | C',
      icons: ['iA', 'iB'],
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      img: '/amazon.png',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'Netflix Clone',
      technologies: 'A | B | C',
      icons: ['iA', 'iB'],
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      img: '/netflix.png',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'Weather App',
      technologies: 'A | B | C',
      icons: ['iA', 'iB'],
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      img: '/man1.png',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    ,
    {
      title: 'Medium like Application',
      technologies: 'A | B | C',
      icons: ['iA', 'iB'],
      description:
        'Contrary 4 to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      img: 'p1.png',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 5',
      technologies: 'A | B | C',
      icons: ['iA', 'iB'],
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 6',
      technologies: 'A | B | C',
      icons: ['iA', 'iB'],
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 7',
      icons: ['iA', 'iB'],
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      technologies: 'A | B | C',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 8',
      technologies: 'A | B | C',
      icons: ['iA', 'iB'],
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
  ]

  return (
    <section className="mx-auto max-w-7xl p-5 text-black" id="projects">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="pb-20 pt-10 text-center text-5xl font-bold text-black"
      >
        Projects
      </motion.h1>
      <div
        id="projects"
        className="flex min-h-screen items-center justify-center rounded-2xl border-gray-900"
      >
        <div className="relative">
          {/* <Particle /> */}

          <div className="">
            {cards.map((item, i) => (
              <Card
                title={item.title}
                icons={item.icons}
                technologies={item.technologies}
                img={item.img}
                code={item.code}
                demo={item.demo}
                description={item.description}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
