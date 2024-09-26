'use client';

import {
  SELECTED_SIDENAV_ICONS,
  SIDENAV_ICONS,
  SIDENAV_PATH,
  SIDENAV_TEXT,
} from '@/app/constants/common';
import { setTokens } from '@/app/utils/setTokens';
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

  const handleExtendSession = async () => {
    // 쿠키에서 리프레시 토큰을 가져옴
    const cookies = document.cookie.split(';');
    const refreshToken = cookies
      .find((cookie) => cookie.trim().startsWith('refreshToken='))
      ?.split('=')[1];

    try {
      const response = await fetch('/api/account/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const newAccessToken = responseData.result.access_token;
        const newAccessRefreshToken = responseData.result.refresh_token;

        // 새로운 액세스 토큰을 쿠키에 저장
        if (refreshToken) {
          setTokens(newAccessToken, newAccessRefreshToken, true);
        }

        alert('세션이 연장되었습니다.');
      }
    } catch (error) {
      console.error('세션 연장 에러:', error);
      alert('세션 연장 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="bg-white w-64 h-full flex flex-col items-center rounded-[20px] pt-9 shadow-xl relative">
      <Link href="/">
        <Image src="/Images/JMF2.png" alt="로고" width={100} height={75} />
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
                className={`${isSelected(SIDENAV_TEXT[i]) && 'text-[#49AA19]'}`}
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
