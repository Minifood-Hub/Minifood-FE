'use client';

import {
  HEADER_PATH,
  HEADER_PATH_GUEST,
  HEADER_SIGNUP,
  HEADER_SIGNUP_PATH,
  HEADER_TEXT,
} from '@/app/constants/common';
import { useUser } from '@/app/hooks/useUser';
import { setTokens } from '@/app/utils/setTokens';
import Image from 'next/image';
import Link from 'next/link';
import ProfileDropDown from '../ProfileDropDown';

function Header() {
  const { user } = useUser();

  const handleLogout = async () => {
    document.cookie = `accessToken=; expires=0; path=/;`;
    document.cookie = `refreshToken=; expires=0; path=/;`;
    window.location.href = '/';
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

  const headerPath = user && user?.category ? HEADER_PATH : HEADER_PATH_GUEST;

  return (
    <div className="relative w-full pt-6 bg-white">
      <header className="relative w-full h-16 flex items-center px-[13.5%] justify-between">
        <div className="flex gap-x-[63.5px] cursor-pointer text-[#333] items-center text-[15px] font-medium">
          <Link href="/">
            <Image
              src="/Images/minifood.png"
              width={129}
              height={27}
              alt="logo"
            />
          </Link>
          <div className="flex gap-x-[63.5px]">
            {HEADER_TEXT.map((text, i) => (
              <Link key={text} href={headerPath[i]}>
                {text}
              </Link>
            ))}
          </div>
        </div>

        {user && user?.category ? (
          <div className="flex gap-8">
            <button type="button" onClick={handleExtendSession}>
              세션 연장
            </button>
            <ProfileDropDown user={user} logout={handleLogout} />
          </div>
        ) : (
          <div className="flex font-normal text-sm">
            {HEADER_SIGNUP_PATH.map((path, i) => (
              <Link href={path} key={path} className="w-[68px] text-center">
                {HEADER_SIGNUP[i]}
              </Link>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
