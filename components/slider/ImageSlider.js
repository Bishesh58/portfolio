import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'

// import required modules
import { Autoplay } from 'swiper'

export default function ImageSlider({ imgs }) {
  
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
        {imgs.map((img) => (
          <SwiperSlide>
            <img src={img} className="object-contain" alt="" />{' '}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
