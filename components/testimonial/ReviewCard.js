import Avatar from '@mui/material/Avatar'

function ReviewCard() {
  return (
    <div className="flex flex-col">
      <div className="bg-gray-900/10 rounded-3xl p-4">
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis
        odio repudiandae nostrum commodi libero, similique quasi distinctio
        officia optio natus aut harum deserunt rem minima exercitationem!
        Soluta, fuga fugiat!""
      </div>
      <div className=" ml-5 h-0 w-0 border-t-gray-900/10 border-t-[50px] border-r-transparent border-r-[-50px] border-l-transparent border-l-[50px]"></div>
      <div className="flex items-center justify-center space-x-4 -mt-4 -ml-10">
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt="John Doe"
          src="https://i.pinimg.com/736x/38/93/07/389307d6af5c4be0051b7d3c4f93bf3d.jpg"
        />

        <p>John Doe</p>
      </div>
      
    </div>
  )
}

export default ReviewCard
