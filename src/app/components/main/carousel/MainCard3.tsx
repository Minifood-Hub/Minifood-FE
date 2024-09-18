import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';
import Image from 'next/image';

function MainCard3() {
  return (
    <div className="relative flex w-full h-[360px] bg-gradient-to-r from-[#eceef6] to-[#dbdee6] items-center justify-center gap-x-[112px]">
      <div className="flex flex-col text-2xl text-[#161616] z-10">
        <p className="font-normal leading-9">
          {CUSTOM_MAINCARD_TEXT[0].firstline}
        </p>
        <p className="font-bold">{CUSTOM_MAINCARD_TEXT[0].secondlinre}</p>
      </div>

      <div className="w-[430px] h-[360px] relative flex-center">
        <div className="relative w-[400px] h-[340px]">
          <Image
            src="/Images/banner3.png"
            alt="blurred banner"
            layout="fill"
            className="z-10"
          />
        </div>
        <Image
          src="/Images/banner3.png"
          alt="banner"
          layout="fill"
          className="blur-lg opacity"
        />
      </div>
    </div>
  );
}

export default MainCard3;
