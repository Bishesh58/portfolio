import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'

// import required modules
import { Autoplay } from 'swiper'

export default function ImageSlider() {
  return (
    <>
      <Swiper
        grabCursor={true}
        dir="rtl"
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
        className="h-[300px] w-[500px]"
      >
        <SwiperSlide>
          Slide 3 <img src="/amazon.png" className="object-contain" alt="" />{' '}
        </SwiperSlide>
        <SwiperSlide>
          Slide 2 <img src="/amazon.png" className="object-contain" alt="" />{' '}
        </SwiperSlide>
        <SwiperSlide>
          Slide 4 <img src="/amazon.png" className="object-contain" alt="" />{' '}
        </SwiperSlide>
        <SwiperSlide>
          Slide 5 <img src="/amazon.png" className="object-contain" alt="" />{' '}
        </SwiperSlide>
        <SwiperSlide>
          Slide 6 <img src="/amazon.png" className="object-contain" alt="" />{' '}
        </SwiperSlide>
        <SwiperSlide>
          Slide 7 <img src="/amazon.png" className="object-contain" alt="" />{' '}
        </SwiperSlide>
        <SwiperSlide>
          Slide 8 <img src="/amazon.png" className="object-contain" alt="" />{' '}
        </SwiperSlide>
        <SwiperSlide>
          Slide 9 <img src="/amazon.png" className="object-contain" alt="" />{' '}
        </SwiperSlide>
      </Swiper>
    </>
  )
}
