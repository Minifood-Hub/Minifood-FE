'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import RecommendCard from './Card';

function CardSwiper() {
  return (
    <div className="flex w-[1140px] h-auto ">
      <Swiper
        className=""
        grabCursor
        slideToClickedSlide
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={4}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        <SwiperSlide key={0}>
          <RecommendCard
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={1}>
          <RecommendCard
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={2}>
          <RecommendCard
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={3}>
          <RecommendCard
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={4}>
          <RecommendCard
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={5}>
          <RecommendCard
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CardSwiper;
