const vidoes = [
  {
    url: 'https://www.youtube.com/embed/4quNiCTlj2w',
  },
  {
    url: 'https://www.youtube.com/embed/HSqKapk7lQc',
  },
  {
    url: 'https://www.youtube.com/embed/coE8xng2tHE',
  },
  {
    url: 'https://www.youtube.com/embed/ZeOCIYc5Q00',
  },
  {
    url: 'https://www.youtube.com/embed/9uc1QTQXAfc',
  },
  {
    url: 'https://www.youtube.com/embed/R84EaFROrDg',
  },
]

function Thumbnail() {
  return (
    <div className=" flex flex-wrap items-center justify-center space-x-6 space-y-6 border-emerald-500">
      {vidoes.map((vidoe) => (
        <iframe
          width="560"
          height="315"
          src={vidoe.url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          className="ml-6 first:mt-6"
        ></iframe>
      ))}
    </div>
  )
}

export default Thumbnail
