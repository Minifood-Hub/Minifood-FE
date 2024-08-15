import {
  SELECTED_SIDENAV_ICONS,
  SIDENAV_ICONS,
  SIDENAV_PATH,
  SIDENAV_TEXT,
} from '@/app/constants/common';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '../Icons';

interface SideNavBarProps {
  selected: string;
}

export default function SideNavBar({ selected }: SideNavBarProps) {
  const isSelected = (selectedMenu: string): boolean => {
    return selectedMenu === selected;
  };
  return (
    <div className="bg-white w-64 flex flex-col items-center rounded-[20px] pt-9">
      <Link href="/">
        <Image src="/Images/JMF2.png" alt="로고" width={100} height={75} />
      </Link>
      <div className="w-40 mt-[52px] flex ml-7 justify-center flex-col gap-y-7 text-[22px] text-[#737373] font-bold">
        {SIDENAV_PATH.map((path, i) => {
          return (
            <div key={path} className="flex items-center gap-x-2 h-9">
              <Icons
                name={
                  isSelected(SIDENAV_TEXT[i])
                    ? SELECTED_SIDENAV_ICONS[i]
                    : SIDENAV_ICONS[i]
                }
              />
              <Link
                href={path}
                className={`${isSelected(SIDENAV_TEXT[i]) && 'text-[#49AA19]'}`}
              >
                {SIDENAV_TEXT[i]}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
