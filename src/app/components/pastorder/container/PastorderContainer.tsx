'use client';

import { PASTORDER_TABLE } from '@/app/constants/pastorder';
import PastorderTable from '../PastorderTable';
import Link from 'next/link';

const PastorderContainer = () => {
  return (
    <div className="w-full flex justify-center pt-[100px]">
      <div className="w-[77%] flex flex-col">
        <div className="flex w-full justify-between">
          <p className="text-2xl font-bold ">{PASTORDER_TABLE[0]}</p>
          <Link
            href="/pastorder/new"
            className="h-9 px-6 py-3 bg-[#55aa00] rounded justify-center items-center gap-2.5 inline-flex"
          >
            <div className="text-center text-white text-base font-medium font-['Pretendard Variable'] tracking-tight">
              {PASTORDER_TABLE[1]}
            </div>
          </Link>
        </div>
        <PastorderTable />
      </div>
    </div>
  );
};

export default PastorderContainer;
