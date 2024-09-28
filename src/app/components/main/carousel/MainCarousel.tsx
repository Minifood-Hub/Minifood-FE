'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import '@/app/ui/maincarousel.css';

import MainCard from './MainCard';
import MainCard2 from './MainCard2';
import MainCard3 from './MainCard3';
import MainCard4 from './MainCard4';

function MainCarousel() {
  const cardArr = [
    <MainCard key={1} />,
    <MainCard2 key={2} />,
    <MainCard3 key={3} />,
    <MainCard4 key={4} />,
  ];
  return (
    <div className="w-full relative">
      <Swiper
        grabCursor
        slideToClickedSlide
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        loop
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
      >
        {cardArr.map((card) => (
          <SwiperSlide key={card.key}>{card}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainCarousel;
