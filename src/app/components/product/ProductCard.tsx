'use client';

import Image from 'next/image';
import Button from '../common/Button';

interface ProductCardProps {
  itemName: string;
  amount: number;
  category: string;
  price: number;
  orderItem: () => void;
}

function ProductCard({
  itemName,
  amount,
  category,
  price,
  orderItem,
}: ProductCardProps) {
  return (
    <div className="flex flex-col w-[244px] h-[431px] rounded-[4px]">
      <div className="w-[244px] h-[320px] relative rounded">
        <Image
          src="/Images/tomato.png"
          alt="카드 이미지"
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
        <div className="absolute inset-0 bg-gray-300 opacity-0 hover:opacity-70 transition-opacity duration-300 rounded" />
      </div>
      <Button
        buttonText="바로담기"
        type="recommendButton"
        onClickHandler={orderItem}
      />
      <div className="flex flex-col gap-y-3 mt-3 text-base font-normal">
        <div>{itemName}</div>
      </div>
    </div>
  );
}

export default ProductCard;
