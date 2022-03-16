import Card from './Card'

function Projects() {
  return (
    <div id="projects" className="min-h-screen text-white p-4">
      <div className="flex flex-col">
        <h1 className="py-4 px-6 text-3xl font-bold">Projects</h1>
        <div className="flex flex-wrap p-2">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </div>
  )
}

export default Projects