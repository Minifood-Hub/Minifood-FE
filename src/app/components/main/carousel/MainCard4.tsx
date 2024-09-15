import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';
import Image from 'next/image';

function MainCard4() {
  return (
    <div className="flex w-full h-[360px] bg-gradient-to-r from-[#d5b185] to-[#cd9654] items-center justify-center gap-x-[112px] z-10">
      <div className="flex flex-col text-2xl text-white">
        <p className="font-normal leading-9">
          {CUSTOM_MAINCARD_TEXT[0].firstline}
        </p>
        <p className="font-bold">{CUSTOM_MAINCARD_TEXT[1].secondlinre}</p>
      </div>
      <Image
        src="/Images/banner5.png"
        alt="banner"
        className="rounded-full"
        width={400}
        height={320}
      />
    </div>
  );
}

export default MainCard4;
