'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useModal } from '@/app/hooks/useModal';
import { useUser } from '@/app/hooks/useUser';
import RecommendCard from './Card';
import LoginModal from './LoginModal';

function CardSwiper() {
  const { user } = useUser();
  const { isOpen, openModal, closeModal, handleModalClick } = useModal(false);

  const orderItem = () => {
    if (!user?.category) {
      openModal();
    }
  };

  return (
    <div className="flex w-[1140px] h-auto" onClick={() => orderItem}>
      {isOpen && <LoginModal closeModal={closeModal} />}
      <Swiper
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
            orderItem={orderItem}
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={1}>
          <RecommendCard
            orderItem={orderItem}
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={2}>
          <RecommendCard
            orderItem={orderItem}
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={3}>
          <RecommendCard
            orderItem={orderItem}
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={4}>
          <RecommendCard
            orderItem={orderItem}
            itemName="대파"
            amount={198}
            category=""
            price={8000}
          />
        </SwiperSlide>
        <SwiperSlide key={5}>
          <RecommendCard
            orderItem={orderItem}
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
