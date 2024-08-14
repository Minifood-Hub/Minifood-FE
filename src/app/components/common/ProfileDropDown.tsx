'use client';

import { HEADER_PROFILE } from '@/app/constants/common';
import { HeaderProfileIcon } from '@/app/ui/iconPath';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icons from './Icons';

interface ProfileDropDownProps {
  user: string;
  logout: () => void;
}

const ProfileDropDown = ({ user, logout }: ProfileDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const clickOption = (index: number) => {
    if (index === 2) {
      logout();
    } else {
      if (user === 'GUEST') {
        router.push('sign-in/client');
      }
    }
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative"
      >
        <Icons name={HeaderProfileIcon} hoverFill="#306317" />
      </div>
      {isOpen && (
        <div className="flex flex-col bg-white border-[#E0E0E0] border absolute top-[52px] z-10">
          <div className="flex items-center w-[126px] h-[33px] px-3 py-2 border-b">
            {user === 'GUEST' ? '거래처 미생성' : user}
          </div>
          {HEADER_PROFILE.map((option, index) => (
            <div
              key={option}
              className="flex items-center w-[126px] h-[33px] px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => clickOption(index)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
