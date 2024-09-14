import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';
import Image from 'next/image';

function MainCard() {
  return (
    <div className="flex w-full h-[360px] bg-gradient-to-t from-[#fee3c7] to-[#f7d4b4] items-center justify-center gap-x-[112px]">
      <div className="flex">
        <p>{CUSTOM_MAINCARD_TEXT[0].firstline}</p>
        <p>{CUSTOM_MAINCARD_TEXT[1].secondlinre}</p>
      </div>
      <Image src="/Images/banner1.png" alt="banner" width={427} height={360} />
    </div>
  );
}

export default MainCard;
