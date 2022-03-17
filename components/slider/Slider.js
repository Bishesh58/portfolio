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
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
    </Swiper>
  )
}
