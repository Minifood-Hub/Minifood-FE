'use client';

import {
  HEADER_PATH,
  HEADER_PATH_GUEST,
  HEADER_SIGNUP,
  HEADER_SIGNUP_PATH,
  HEADER_TEXT,
} from '@/app/constants/common';
import { useUser } from '@/app/hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';
import ProfileDropDown from '../ProfileDropDown';

function Header() {
  const { user } = useUser();

  const handleLogout = async () => {
    document.cookie = `accessToken=; expires=0; path=/;`;
    window.location.href = '/';
  };

  const headerPath =
    user?.detail !== 'Not authenticated' ? HEADER_PATH : HEADER_PATH_GUEST;

  return (
    <div className="relative w-full pt-6 bg-white">
      <header className="relative w-full h-16 flex items-center px-[13.5%] justify-between">
        <div className="flex gap-x-[63.5px] cursor-pointer text-[#333] items-center text-[15px] font-medium">
          <Link href="/">
            <Image src="/Images/JMF2.png" width={60} height={48} alt="logo" />
          </Link>
          <div className="flex gap-x-[63.5px]">
            {HEADER_TEXT.map((text, i) => (
              <Link key={text} href={headerPath[i]}>
                {text}
              </Link>
            ))}
          </div>
        </div>
        {user && user.detail !== 'Not authenticated' ? (
          <ProfileDropDown user={user} logout={handleLogout} />
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
