import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';
import Image from 'next/image';

function MainCard4() {
  return (
    <div className="flex-center w-full h-[360px] bg-gradient-to-r from-[#d5b185] to-[#cd9654] gap-x-[112px] z-10">
      <div className="flex flex-col text-2xl text-white">
        <p className="leading-9">{CUSTOM_MAINCARD_TEXT[0].firstline}</p>
        <p className="font-bold">{CUSTOM_MAINCARD_TEXT[1].secondlinre}</p>
      </div>
      <div className="relative h-[360px] flex-center">
        <div className="relative w-[360px] h-[360px] ">
          <Image
            src="/Images/banner5.png"
            alt="blurred banner"
            layout="fill"
            className="z-10 rounded-full"
          />
        </div>
        <Image
          src="/Images/banner5.png"
          alt="banner"
          layout="fill"
          className="blur-sm opacity rounded-full"
        />
      </div>
    </div>
  );
}

export default MainCard4;
