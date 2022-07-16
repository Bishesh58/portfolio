// import Swiper core and required modules
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Parallax,
} from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import ReviewCard from '../testimonial/ReviewCard'

export default () => {
  const reviews = [
    {
      testimony: `Bishesh and I worked in a project together, Bishesh is a true professional, he is as resilient and goal oriented as a person can get. Any team would be lucky to have Bishesh in their team.`,
      profileImg:
        'https://media-exp2.licdn.com/dms/image/C5603AQEFpoJSdNBo4Q/profile-displayphoto-shrink_800_800/0/1583656106320?e=1663200000&v=beta&t=CpY5dMyt5LouzjyBBVVsBRuJctntRyzS1yER-tSSTx4',
      fullName: 'Daryl George',
      title: 'Business Analyst at Coca-Cola',
    },
    {
      testimony: `Bishesh and I were students at Unitec. We did some projects together. During that time, he was always passionate about learning new things and never felt afraid of running into problems. He is a fantastic problem solver, team player and trustworthy.`,
      profileImg: 'https://avatars.githubusercontent.com/u/80291484?v=4',
      fullName: 'Daniel Kim',
      title: 'Software Developer',
    },
    {
      testimony: `I supervised Bishesh’s work on an industry internship project. Bishesh brought in a very professional attitude to the internship role and taken it as seriously as he would a job.
      He demonstrated great technical knowledge, ability to learn new software frameworks and ability to think “on his feet” and solve technical challenges. Bishesh fitted well into the team, adjusting his work style to the team culture and pace. However, most importantly, Bishesh delivered all the features the team required - a production ready software along with a good set of documentation. I believe Bishesh is ready for any software development challenge and would recommend him to any team.`,
      profileImg:
        'https://media-exp2.licdn.com/dms/image/C5103AQEbz74MxFzGoQ/profile-displayphoto-shrink_800_800/0/1569536744311?e=1663200000&v=beta&t=rzrxBAK0Mco8NmVtXF79SF0YnPVSsedQvy1cWUsuGxo',
      fullName: 'Igor Portugal',
      title: 'Business technologist/Innovator',
    },
    {
      testimony: `Bishesh and I were students at Unitec. We worked on some of the projects together and during that time he was always ready to tackle the problems and give his best. he is very much the can-do attitude kind of guy. he is an excellent problem solver, a great team player, and a very dependable teammate."`,
      profileImg:
        'https://media-exp2.licdn.com/dms/image/C5603AQEf30DYMBu5IQ/profile-displayphoto-shrink_800_800/0/1567409830745?e=1663200000&v=beta&t=SOaQGtNzyHbS_oSnoKFAEBt4C79MA4IZnjETKHV9LBc',
      fullName: 'Shakila Moqsoodi',
      title: 'Software Developer',
    },
    {
      testimony: `Bishesh has enough in-hand skills as a front-end developer, along with his eagerness for technological advancement, and a good ability to learn. It was my pleasure to have the opportunity to work with him for the period. With my best wishes, good luck mate!`,
      profileImg:
        'https://media-exp2.licdn.com/dms/image/C5603AQHhMdWOGf6hAw/profile-displayphoto-shrink_800_800/0/1621326959330?e=1663200000&v=beta&t=26kpqHFYjJC-3j6gpsk66GzXhu0_5DzB1WQYbqQGGKw',
      fullName: 'Tony Lin',
      title: 'Senior Mobile App Developer',
    },
    {
      testimony: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis
    odio repudiandae nostrum commodi libero, similique quasi distinctio
    officia optio natus aut harum deserunt rem minima exercitationem!
    Soluta, fuga fugiat`,
      profileImg:
        'https://media-exp2.licdn.com/dms/image/C5603AQFIGFzfFKhLLA/profile-displayphoto-shrink_800_800/0/1650324273857?e=1663200000&v=beta&t=TDDp2NpVaiEigOL84-_Qvsx5bH5j7b7fPkf2EeTwj7M',
      fullName: 'Masoud Shakiba',
      title: 'Founder of TechTALK',
    },

    {
      testimony: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis
    odio repudiandae nostrum commodi libero, similique quasi distinctio
    officia optio natus aut harum deserunt rem minima exercitationem!
    Soluta, fuga fugiat`,
      profileImg:
        'https://media-exp2.licdn.com/dms/image/C5603AQFjG8_dJv_6TQ/profile-displayphoto-shrink_800_800/0/1615276437040?e=1663200000&v=beta&t=EJsXqLCW9lqyTXGTnTWkJYhWmhB5tfTsEImG50NAVUA',
      fullName: 'Alfred Lladoc',
      title: 'Software Developer',
    },
  ]
  return (
    <Swiper
      // install Swiper modules
      modules={[Autoplay, Pagination, Scrollbar, A11y, Parallax]}
      rewind={true}
      spaceBetween={10}
      parallax={true}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      grabCursor={true}
      pagination={{ clickable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      className="my-20 !p-0"
    >
      {reviews.map((review, i) => (
        <SwiperSlide key={i}>
          <ReviewCard
            testimony={review.testimony}
            profileImg={review.profileImg}
            fullName={review.fullName}
            title={review.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
