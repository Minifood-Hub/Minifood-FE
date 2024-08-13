'use client';

import { HEADER_TEXT } from '@/app/constants/common';
import { useUser } from '@/app/hooks/useUser';
import { HeaderCartIcon, HeaderHeartIcon } from '@/app/ui/iconPath';
import Image from 'next/image';
import Link from 'next/link';
import HeaderSearchBar from '../HeaderSearchBar';
import Icons from '../Icons';
import ProfileDropDown from '../ProfileDropDown';

function Header() {
  const { user } = useUser();

  const handleLogout = () => {
    document.cookie = `accessToken=; expires=0; path=/;`;
    window.location.reload();
  };

  return (
    <div className="relative w-full pt-6 bg-white">
      <header className="relative w-full h-16 flex items-center px-[15%] justify-between">
        <div className="flex gap-x-2 cursor-pointer text-[#306317] text-2xl font-bold items-center">
          <Image src="/Images/JMF2.png" width={60} height={48} alt="logo" />
          <Link href="/">{HEADER_TEXT[0]}</Link>
        </div>
        <HeaderSearchBar />
        {user?.isSuccess ? (
          <div className="flex gap-x-[54px]">
            <Link href="/">
              <Icons name={HeaderHeartIcon} hoverFill="#306317" />
            </Link>
            <ProfileDropDown user={user.result.client_name} logout={handleLogout} />
            <Link href="/">
              <Icons name={HeaderCartIcon} hoverFill="#306317" />
            </Link>
          </div>
        ) : (
          <div className="flex text-[14px] font-normal">
            <Link href="/sign-in/sign-up" className="w-[68px]">
              {HEADER_TEXT[1]}
            </Link>
            <Link href="/sign-in" className="w-[68px]">
              {HEADER_TEXT[2]}
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
