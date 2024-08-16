'use client';

import {
  QUOTATION_TRANS_VIEWTYPE,
  QUOTATION_VIEW,
  QUOTATION_VIEWTYPE,
} from '@/app/constants/quotation';
import { useModal } from '@/app/hooks/useModal';
import { useState } from 'react';
import QuotationCalendar from '../QuotationCalendar';
import QuotationViewTable from '../QuotationViewTable';

const QuotationContainer = () => {
  const [checkType, setCheckType] = useState<CheckTypes>('all');
  const { isOpen, openModal, closeModal, handleModalClick } = useModal(false);
  console.log(isOpen, 'status');

  const bg = (checked: CheckTypes) =>
    checkType === checked ? 'bg-[#55aa00]' : 'bg-[#b8b8b8]';

  const selectCheckType = (type: string) => {
    setCheckType(QUOTATION_TRANS_VIEWTYPE[type]);
    if (type === QUOTATION_VIEWTYPE[3]) openModal();
  };
  return (
    <div className="w-full flex justify-center pt-[152px]">
      {isOpen && <QuotationCalendar />}
      <div className="w-[77%] flex flex-col">
        <div className="flex w-full justify-between items-end">
          <p className="text-2xl font-bold ">{QUOTATION_VIEW[0]}</p>
          <div className="flex text-white text-base font-medium gap-x-4">
            {QUOTATION_VIEWTYPE.map((type, index) => (
              <div
                key={type}
                className={`quotation-table-btn ${bg(QUOTATION_TRANS_VIEWTYPE[type])}`}
                onClick={() => selectCheckType(type)}
              >
                {QUOTATION_VIEWTYPE[index]}
              </div>
            ))}
          </div>
        </div>
        <QuotationViewTable viewType={checkType} />
      </div>
    </div>
  );
};

export default QuotationContainer;
