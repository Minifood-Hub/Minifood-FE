'use client';

import { PASTORDER_TABLE } from '@/app/constants/pastorder';
import PastorderTable from '../PastorderTable';

const PastorderContainer = () => {
  return (
    <div className="w-full flex justify-center pt-[100px]">
      <div className="w-[77%] flex flex-col">
        <div className="flex w-full items-end">
          <p className="text-2xl font-bold ">{PASTORDER_TABLE[0]}</p>
        </div>
        <PastorderTable />
      </div>
    </div>
  );
};

export default PastorderContainer;
