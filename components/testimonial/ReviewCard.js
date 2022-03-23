import Avatar from '@mui/material/Avatar'

function ReviewCard({ title, profileImg, fullName }) {
  return (
    <div className="flex flex-col">
      <div className="rounded-3xl bg-gray-900/10 p-4">{title}</div>
      <div className=" ml-5 h-0 w-0 border-t-[50px] border-r-[-50px] border-l-[50px] border-t-gray-900/10 border-r-transparent border-l-transparent"></div>
      <div className="-mt-4 -ml-10 flex items-center justify-center space-x-4">
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt={fullName}
          src={profileImg}
        />
        <p>{fullName}</p>
      </div>
    </div>
  )
}

export default ReviewCard
