// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import ReviewCard from '../testimonial/ReviewCard'

export default () => {
  const reviews = [
    {
      title: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis
    odio repudiandae nostrum commodi libero, similique quasi distinctio
    officia optio natus aut harum deserunt rem minima exercitationem!
    Soluta, fuga fugiat"`,
      profileImg:
        'https://i.pinimg.com/736x/38/93/07/389307d6af5c4be0051b7d3c4f93bf3d.jpg',
      fullName: 'John Doe',
    },
    {
      title: `"Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
      printer took a galley of type and scrambled it to make a type specimen book. It has survived not 
      only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "`,
      profileImg:
        'https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg',
      fullName: 'Hanna Smith',
    },
    {
      title: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis
    odio repudiandae nostrum commodi libero, similique quasi distinctio
    officia optio natus aut harum deserunt rem minima exercitationem!
    Soluta, fuga fugiat"`,
      profileImg:
        'https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      fullName: 'Harry Wills',
    },
    {
      title: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis
    odio repudiandae nostrum commodi libero, similique quasi distinctio
    officia optio natus aut harum deserunt rem minima exercitationem!
    Soluta, fuga fugiat"`,
      profileImg:
        'https://www.teahub.io/photos/full/249-2491881_download-free-profile-picture-images-for-facebook-best.jpg',
      fullName: 'Anna malla',
    },
    {
      title: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis
    odio repudiandae nostrum commodi libero, similique quasi distinctio
    officia optio natus aut harum deserunt rem minima exercitationem!
    Soluta, fuga fugiat"`,
      profileImg:
        'https://i.pinimg.com/736x/38/93/07/389307d6af5c4be0051b7d3c4f93bf3d.jpg',
      fullName: 'Alex Thapa',
    },
    {
      title: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis
    odio repudiandae nostrum commodi libero, similique quasi distinctio
    officia optio natus aut harum deserunt rem minima exercitationem!
    Soluta, fuga fugiat"`,
      profileImg:
        'https://i.pinimg.com/736x/38/93/07/389307d6af5c4be0051b7d3c4f93bf3d.jpg',
      fullName: 'Some One',
    },
  ]
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      effect="coverflow"
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {reviews.map((review) => (
        <SwiperSlide>
          <ReviewCard title={review.title} profileImg={review.profileImg} fullName={review.fullName}/>
        </SwiperSlide>
      ))}
      
    </Swiper>
  )
}
