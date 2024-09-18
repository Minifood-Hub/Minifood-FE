'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import { CUSTOM_MOOKDATA } from '@/app/constants/custom';
import { useModal } from '@/app/hooks/useModal';
import { useUser } from '@/app/hooks/useUser';
import RecommendCard from './Card';
import LoginModal from './LoginModal';

function CardSwiper() {
  const { user } = useUser();
  const { isOpen, openModal, closeModal } = useModal(false);

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
        {CUSTOM_MOOKDATA.map((product) => (
          <SwiperSlide key={product.id}>
            <RecommendCard customProducts={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CardSwiper;
