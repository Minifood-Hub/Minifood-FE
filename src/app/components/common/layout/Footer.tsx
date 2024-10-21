import { FOOTER_TEXT, JMF_INFO } from '@/app/constants/common';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="w-full flex justify-center text-black bg-slate-100">
      <div className="flex h-[240px] flex-col gap-y-6 justify-center min-w-[800px]">
        <div className="flex gap-x-8 font-medium text-[18px] items-center justify-start">
          <Image
            width={120}
            height={40}
            src="/Images/minifood.png"
            alt="logoIcon"
          />
          <Link href="introduce">{FOOTER_TEXT[0]}</Link>
          <Link href="/tos">{FOOTER_TEXT[1]}</Link>
          <Link href="/personal">{FOOTER_TEXT[2]}</Link>
        </div>
        <div>
          <div className="font-semibold text-lg mb-2">{FOOTER_TEXT[4]}</div>
          <div className="flex flex-col font-semibold gap-y-2">
            <div className="flex gap-x-2">
              <div className="flex gap-x-1">
                {FOOTER_TEXT[5]}
                <div className="font-normal">{JMF_INFO[0]}</div>
              </div>
              <div className="flex gap-x-1">
                {FOOTER_TEXT[6]}
                <div className="font-normal">{JMF_INFO[1]}</div>
              </div>
              <div className="flex gap-x-1">
                {FOOTER_TEXT[9]}
                <div className="font-normal">{JMF_INFO[5]}</div>
              </div>
              <div className="flex gap-x-1">
                {FOOTER_TEXT[8]}
                <div className="font-normal">{JMF_INFO[3]}</div>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div className="flex gap-x-1">
                {FOOTER_TEXT[7]}
                <div className="font-normal">{JMF_INFO[2]}</div>
              </div>
              <div className="flex gap-x-1">
                {FOOTER_TEXT[10]}
                <div className="font-normal">{JMF_INFO[0]}</div>
              </div>
              <div className="flex gap-x-1">
                {FOOTER_TEXT[11]}
                <div className="font-normal">{JMF_INFO[4]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
