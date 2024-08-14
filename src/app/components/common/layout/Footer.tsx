import { CONTRIBUTORS, FOOTER_TEXT } from '@/app/constants/common';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <div className="absolute bottom-0 w-[1024px] h-[auto] text-[#306317]">
      <footer className="flex w-full h-[160px] justify-center min-w-[800px] p-[52px] gap-x-7">
        <div className="flex flex-col">
          <div className="flex w-[auto] h-[auto] pb-2 border-b-2 border-white text-base font-light ">
            <div className="border-r-2 pr-2">{FOOTER_TEXT[0]}</div>
            <div className="border-r-2 px-2">{FOOTER_TEXT[1]}</div>
            <div className="border-r-2 px-2">{FOOTER_TEXT[2]}</div>
            <div className="px-2">{FOOTER_TEXT[3]}</div>
          </div>
          <Link href="https://github.com/JMF-HUB">
            <div className="flex items-center gap-x-1.5 mb-2">
              <Image
                width={24}
                height={22.5}
                src="/Images/logo.png"
                alt="logoIcon"
                style={{ width: 24, height: 22.5 }}
              />
              <div className="font-bold text-[20px]">{FOOTER_TEXT[4]}</div>
              <div className="font-light text-[16px]">{FOOTER_TEXT[5]}</div>
              <div className="font-bold text-[16px]">{FOOTER_TEXT[6]}</div>
              <div className="font-light text-[16px]">{FOOTER_TEXT[7]}</div>
            </div>
          </Link>
        </div>
        <div className="flex-col flex w-auto h-[20px] pb-2">
          <div className="flex items-center gap-x-2 mb-1">
            <div className="font-bold text-xl">{FOOTER_TEXT[8]}</div>
            <Image
              width={22}
              height={22}
              src="/Images/github.png"
              alt="github icon"
            />
          </div>
          <div className="flex items-center gap-x-1 font-medium text-base mb-2 underline">
            <Link href="https://github.com/YPYP333YPYP" target="_blank">
              <div className="border-r-2 px-2">{CONTRIBUTORS[0]}</div>
            </Link>
            <Link href="https://github.com/kimgorok" target="_blank">
              <div className="border-r-2 px-2">{CONTRIBUTORS[1]}</div>
            </Link>
            <Link href="https://github.com/Minkyu0424" target="_blank">
              <div className="pl-2">{CONTRIBUTORS[2]}</div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
