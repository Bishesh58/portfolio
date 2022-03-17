// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><div className="bg-yellow-800 w-52 h-52"></div></SwiperSlide>
      <SwiperSlide><div className="bg-red-800 w-52 h-52"></div></SwiperSlide>
      <SwiperSlide><div className="bg-green-800 w-52 h-52"></div></SwiperSlide>
      <SwiperSlide><div className="bg-blue-800 w-52 h-52"></div></SwiperSlide>
      ...
    </Swiper>
  );
};