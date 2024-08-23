'use client';

import { PASTORDER_TABLE } from '@/app/constants/pastorder';
import { useModal } from '@/app/hooks/useModal';
import { useState } from 'react';
import PastorderTable from '../PastorderTable';

const PastorderContainer = () => {
  const [checkType, setCheckType] = useState<CheckTypes>('all');
  const [date, setDate] = useState<any>(new Date());
  const { isOpen, openModal, closeModal, handleModalClick } = useModal(false);

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
