'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';
import MainCard from './MainCard';

function MainCarousel() {
  return (
    <div className="w-full relative">
      <Swiper
        grabCursor
        slideToClickedSlide
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
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
