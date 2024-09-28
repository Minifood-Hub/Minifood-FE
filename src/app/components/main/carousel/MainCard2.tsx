import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';
import Image from 'next/image';

function MainCard2() {
  return (
    <div className="flex-center w-full h-[360px] bg-gradient-to-r from-[#b6c4c4] to-[#6e7e7d] gap-x-[112px]">
      <div className="flex flex-col text-2xl text-white">
        <p className="leading-9">{CUSTOM_MAINCARD_TEXT[0].firstline}</p>
        <p className="font-bold">{CUSTOM_MAINCARD_TEXT[1].secondlinre}</p>
      </div>
      <div className="w-[350px] h-[350px] rounded-full relative">
        <Image
          src="/Images/banner2.png"
          alt="banner"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default MainCard2;
