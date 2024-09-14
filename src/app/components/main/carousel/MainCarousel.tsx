'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';
import MainCard from './MainCard';

function MainCarousel() {
  return (
    <div className="w-full">
      <Swiper
        grabCursor
        slideToClickedSlide
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        {CUSTOM_MAINCARD_TEXT.map((card) => (
          <SwiperSlide key={card.id}>
            <MainCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainCarousel;
