import Card from './Card'

function Projects() {
  const cards = [
    {
      title: 'project 1',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 2',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 3',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    ,
    {
      title: 'project 4',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 5',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 6',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 7',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
    {
      title: 'project 8',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      code: 'https://github.com/',
      demo: 'https://www.google.com/',
    },
  ]

  return (
    <div id="projects" className="min-h-screen p-4 text-white">
      <div className="flex flex-col">
        <h1 className="py-4 px-6 text-3xl font-bold">Projects</h1>
        <div className="flex flex-wrap ">
          {cards.map((item)=> (
            <Card title={item.title} img={item.img} code = {item.code} demo={item.demo}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
