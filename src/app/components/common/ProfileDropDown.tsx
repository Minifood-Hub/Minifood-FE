'use client';

import { HeaderProfileIcon } from '@/app/ui/iconPath';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icons from './Icons';
import { HEADER_PROFILE } from '@/app/constants/common';

interface ProfileDropDownProps {
  user: User;
  logout: () => void;
}

const ProfileDropDown = ({ user, logout }: ProfileDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const hasClient = user.isSuccess && user.result.client_id;

  const getOptions = () => {
    if (hasClient) {
      return [HEADER_PROFILE[1], HEADER_PROFILE[2], HEADER_PROFILE[4]];
    }
    return [HEADER_PROFILE[0], HEADER_PROFILE[4]];
  };

  const clickOption = (option: string) => {
    switch (option) {
      case '거래처 조회':
        console.log('거래처 조회');
        break;
      case '거래처 생성':
        router.push('/sign-in/client');
        break;
      case '거래처 수정':
        router.push('/sign-in/client/edit');
        break;
      case '로그아웃':
        logout();
        break;
      default:
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
        <div className="flex flex-col bg-white border-[#E0E0E0] border absolute top-[52px] transform -translate-x-1/3 z-10">
          <div className="flex items-center w-auto h-auto px-3 py-2 border-b">
            {user.isSuccess ? user.result.client_name : HEADER_PROFILE[3]}
          </div>
          {getOptions().map((option) => (
            <div
              key={option}
              className="flex items-center w-auto min-w-[126px] h-[33px] px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => clickOption(option)}
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
