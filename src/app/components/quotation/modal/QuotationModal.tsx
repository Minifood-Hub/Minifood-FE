'use client';

import { MODAL_INFO } from '@/app/constants/order';
import { QuotationModalData } from '@/app/constants/test';
import { cancelIcon } from '@/app/ui/iconPath';
import { callGet } from '@/app/utils/callApi';
import { formatDate } from '@/app/utils/date';
import { formatPrice } from '@/app/utils/formatPrice';
import { useEffect, useState } from 'react';
import Icons from '../../common/Icons';
import QuotationSave from './QuotationSave';
import QuotationTable from './QuotationTable';

interface QuotationModalProps {
  closeModal: () => void;
  id: number;
}

const QuotationModal = ({ closeModal, id }: QuotationModalProps) => {
  const [detailData, setDetailData] = useState<QuotationInfoTypes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet(`/api/quotation/detail?id=${id}`);
      setDetailData(data.result);
    };
    fetchData();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col w-[680px] h-[780px] rounded-3xl px-8 py-7 bg-white relative">
        <div
          className="flex flex-row-reverse w-full cursor-pointer"
          onClick={closeModal}
        >
          <Icons name={cancelIcon} />
        </div>
        <div className="w-full h-[50px] flex text-lg font-light">
          <div className="text-5xl font-bold mr-6">{MODAL_INFO[0]}</div>
          <div className="flex gap-x-12 mt-6">
            <div className="flex gap-x-2">
              <div className="font-bold">{MODAL_INFO[1]}</div>
              <div>{formatDate(detailData?.created_at || '')}</div>
            </div>
            <div className="flex gap-x-2">
              <div className="font-bold">{MODAL_INFO[2]}</div>
              <div>{QuotationModalData.name}</div>
            </div>
          </div>
        </div>
        <div className="border-w-[600px] h-[0px] border-2 border-[#55aa00] mt-2.5" />
        {detailData && <QuotationTable quotationInfo={detailData} />}
        <div className="w-[310px] h-14 items-center absolute right-12 bottom-12 flex text-black font-extrabold">
          <div className="w-[62px] text-3xl mt-2.5">{MODAL_INFO[3]}</div>
          <div className="flex flex-col w-[250px] h-14 items-center gap-y-1">
            <div className="w-[238px] h-[50px] text-black text-5xl font-bold text-center">
              {formatPrice(detailData?.total || 0)}원
            </div>
            <div className="w-full border-[1.5px] border-[#55aa00]" />
            <div className="w-full border-[1.5px] border-[#55aa00]" />
          </div>
        </div>
        <div className="absolute left-8 bottom-6">
          <QuotationSave onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default QuotationModal;
