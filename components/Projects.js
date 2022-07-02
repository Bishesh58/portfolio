import Card from './Card'
import Particle from './Particle'

function Projects() {
  const cards = [
    {
      title: 'project 1',
      description: 'small description',
      img: `https://firebasestorage.googleapis.com/v0/b/portfolio-e2265.appspot.com/o/amazon-video.mp4?alt=media&token=${process.env.AMAZON_TOKEN}`,
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 2',
      description: 'small description',
      img: `https://firebasestorage.googleapis.com/v0/b/portfolio-e2265.appspot.com/o/linkedIn.mp4?alt=media&token=${process.env.LINKEDIN_TOKEN}`,
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 3',
      description: 'small description',
      img: `https://firebasestorage.googleapis.com/v0/b/portfolio-e2265.appspot.com/o/face-detect.mp4?alt=media&token=${process.env.FACEDETECT_TOKEN}`,
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    ,
    {
      title: 'project 4',
      description: 'small description',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 5',
      description: 'small description',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 6',
      description: 'small description',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 7',
      description: 'small description',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 8',
      description: 'small description',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
  ]

  return (
    <section className="text-white" id="projects">
      <h1 className="mx-16 py-4 text-3xl font-bold">Projects</h1>
      <div
        id="projects"
        className="mx-16 min-h-screen rounded-2xl border-gray-300"
      >
        <div className="relative">
          <Particle />

          <div className="grid grid-flow-row grid-cols-3">
            {cards.map((item, i) => (
              <Card
                title={item.title}
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
