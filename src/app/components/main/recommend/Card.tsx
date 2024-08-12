'use client';

import Image from 'next/image';
import Button from '../../common/Button';

interface RecommendCardProps {
  itemName: string;
  amount: number;
  category: string;
  price: number;
}

function RecommendCard({
  itemName,
  amount,
  category,
  price,
}: RecommendCardProps) {
  return (
    <div className="flex flex-col w-[244px] h-[431px] rounded-[4px] relative">
      <Image
        src="/Images/tomato.png"
        alt="카드 이미지"
        width={244}
        height={320}
        className="rounded"
      />
      <Button
        buttonText={'담기'}
        type={'recommendButton'}
        onClickHandler={() => console.log('담았어요')}
      />
      <div className="flex flex-col gap-y-3 mt-3 text-base font-normal">
        <div>{itemName}</div>
        <div>{price}원</div>
      </div>
    </div>
  );
}

export default RecommendCard;
