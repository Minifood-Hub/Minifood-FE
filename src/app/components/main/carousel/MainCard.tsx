import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';
import Image from 'next/image';

function MainCard() {
  return (
    <div className="flex w-full h-[360px] bg-gradient-to-t from-[#fee3c7] to-[#f7d4b4] items-center justify-center gap-x-[112px]">
      <div className="flex flex-col text-2xl text-[#333333]">
        <p className="font-normal leading-9">
          {CUSTOM_MAINCARD_TEXT[0].firstline}
        </p>
        <p className="font-bold">{CUSTOM_MAINCARD_TEXT[1].secondlinre}</p>
      </div>
      <div className="relative w-[427px] h-full">
        <Image
          src="/Images/banner1.png"
          alt="banner"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
}

export default MainCard;
