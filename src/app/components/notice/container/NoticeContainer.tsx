'use client';

import { NOTICE_TEXT } from '@/app/constants/notice';
import Input from '../../common/Input';
import { useState } from 'react';
import { FAQ_TEXT } from '@/app/constants/faq';
import { ArrowRightIcon, SearchIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';

export default function MainNoticeContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // 검색어 변경 시 페이지를 첫 페이지로 리셋
  };

  return (
    <div className="flex py-[50px] px-[195px] flex-col items-center gap-8 self-stretch">
      <p className="w-full text-center text-xl font-semibold">
        {NOTICE_TEXT[0]}
      </p>

      <div className="w-full mt-5 px-6 flex justify-between items-center rounded border-[1px] bg-gray-0 border-gray-0 focus-within:border-gray-7 focus-within:border-2">
        <Input
          type="default"
          className="w-full py-3 bg-gray-0 focus:outline-none placeholder:text-gray-3"
          onChange={handleSearchChange}
          placeholder={FAQ_TEXT[1]}
          textValue={searchTerm}
        />
        <Icons name={SearchIcon} />
      </div>

      <div className="flex flex-col items-start gap-6 self-stretch">
        <div className="flex p-3 justify-between items-center self-stretch rounded bg-white">
          <div className="flex items-center gap-9">
            <p className="text-xl">1</p>
            <p className="flex-center text-xl">새로 입고된 상품 안내</p>
            <p className="text-gray-3">2024.09.02</p>
          </div>
          <Icons name={ArrowRightIcon} />
        </div>
      </div>
    </div>
  );
}
