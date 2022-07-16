import Avatar from '@mui/material/Avatar'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

function ReviewCard({ title, profileImg, fullName, testimony }) {
  return (
    <div className="flex flex-col p-4">
      <div className="min-h-[200px] rounded-3xl bg-white text-black p-4 py-14 text-center text-lg font-light leading-8 tracking-wider">
        <FormatQuoteIcon className="-mt-4 rotate-180 transform" />
        {testimony}
        <FormatQuoteIcon className="-mt-4" />
      </div>

      <div className="-mt-[64px] py-4 flex flex-col items-center justify-center space-x-4">
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt={fullName}
          src={profileImg}
        />
        <h1 className="mt-2 text-lg font-bold">{fullName}</h1>
        <p className="">{title}</p>
      </div>
    </div>
  )
}

export default ReviewCard
