'use client';

import {
  SELECTED_SIDENAV_ICONS,
  SIDENAV_ICONS,
  SIDENAV_PATH,
  SIDENAV_TEXT,
} from '@/app/constants/common';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '../Icons';
import { handleExtendSession } from '@/app/utils/extendSession';

interface SideNavBarProps {
  selected: string;
}

export default function SideNavBar({ selected }: SideNavBarProps) {
  const isSelected = (selectedMenu: string): boolean => {
    return selectedMenu === selected;
  };

  return (
    <div className="bg-white w-64 h-full flex flex-col items-center rounded-[20px] pt-9 shadow-xl relative">
      <Link href="/">
        <Image src="/Images/minifood.png" alt="로고" width={130} height={30} />
      </Link>
      <div className="w-40 mt-[52px] flex ml-7 justify-center flex-col gap-y-7 text-[22px] text-[#737373] font-bold">
        {SIDENAV_PATH.map((path, i) => {
          return (
            <div
              key={SIDENAV_TEXT[i]}
              className="flex items-center gap-x-2 h-9"
            >
              <Icons
                name={
                  isSelected(SIDENAV_TEXT[i])
                    ? SELECTED_SIDENAV_ICONS[i]
                    : SIDENAV_ICONS[i]
                }
              />
              <Link
                href={path}
                className={`${isSelected(SIDENAV_TEXT[i]) && 'text-primary-2'}`}
              >
                {SIDENAV_TEXT[i]}
              </Link>
            </div>
          );
        })}
      </div>
      <div
        onClick={handleExtendSession}
        className="absolute bottom-12 cursor-pointer text-[22px] text-[#737373] font-bold justify-self-end"
      >
        세션 연장
      </div>
    </div>
  );
}
