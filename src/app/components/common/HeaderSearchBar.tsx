'use client';

import { HeaderSearchIcon } from '@/app/ui/iconPath';
import { useState } from 'react';
import Icons from './Icons';
import Input from './Input';
import { HEADER_TEXT } from '@/app/constants/common';

const HeaderSearchBar = () => {
  const [text, setText] = useState('');
  return (
    <div className="flex w-[352px] relative h-[44px] px-6 border-2 border-[#306317] items-center rounded-[20px] text-[13px] gap-x-1">
      <Input
        type="headerSearch"
        onChange={(e) => setText(e.target.value)}
        placeholder={HEADER_TEXT[3]}
      />
      <Icons name={HeaderSearchIcon} className="cursor-pointer" />
    </div>
  );
};

export default HeaderSearchBar;
