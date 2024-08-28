'use client';

import { CARD_TEXT } from '@/app/constants/main';
import Image from 'next/image';
import Button from '../../common/Button';

interface RecommendCardProps {
  customProducts: CustomProductType;
}

function RecommendCard({ customProducts }: RecommendCardProps) {
  const orderItem = () => {
    console.log('구매 이동 안내');
  };

  return (
    <div className="flex flex-col w-[244px] h-[431px] rounded-[4px]">
      <div className="w-[244px] h-[320px] relative rounded">
        <Image
          src="/Images/tomato.png"
          alt="card_image"
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <Button
        buttonText={CARD_TEXT[0]}
        type="recommendButton"
        onClickHandler={orderItem}
      />
      <div className="flex mt-3 text-base font-normal gap-x-1">
        <div>{customProducts.name}</div>
        <div>{customProducts.unit}</div>
      </div>
    </div>
  );
}

export default RecommendCard;
