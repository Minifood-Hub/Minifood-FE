'use client';

import Button from '@/app/components/common/Button';
import { MODAL_INFO } from '@/app/constants/order';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import QuotationTable from './QuotationTable';
import { usePDF } from 'react-to-pdf';

interface QuotationModalProps {
  closeModal: () => void;
  id: number;
  isAdmin?: boolean;
}

const QuotationModal = ({ closeModal, id, isAdmin }: QuotationModalProps) => {
  const [detailData, setDetailData] = useState<QuotationInfoTypes | null>(null);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet(`/api/quotation/detail?id=${id}`);
      setDetailData(data.result);
    };
    fetchData();
  }, []);

  const { toPDF, targetRef } = usePDF({
    filename: 'JMF견적서.pdf',
    page: { format: 'A4' },
    method: 'save',
  });

  const handlePDFGeneration = async () => {
    const setPdfGenerating = async (value: boolean) => {
      await new Promise((resolve) => {
        setIsPdfGenerating(value);
        setTimeout(resolve, 0);
      });
    };

    await setPdfGenerating(true);
    try {
      toPDF();
    } finally {
      await setPdfGenerating(false); // 오류가 발생해도 항상 끝나고 isPdfGenerating는 false로
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex justify-center items-center z-50">
      <div
        ref={targetRef}
        className="flex flex-col w-[800px] h-auto rounded p-10 bg-gray-1 relative items-center"
      >
        <div className="w-full flex-center bg-[#55AA00] text-white rounded h-[57px] mb-2">
          {detailData?.name}
        </div>
        <div className="w-full flex flex-col text-lg font-light bg-white px-6 pt-6">
          <div className="text-lg font-bold mt-3 pb-3 border-b-2 border-black">
            {MODAL_INFO[1]}
          </div>
          <div className="flex flex-col gap-y-2 mt-4 w-full pb-4 text-base font-normal text-black border-b-2 border-dashed border-gray-2 px-1">
            <div className="flex justify-between">
              <div className="text-[#999]">{MODAL_INFO[2]}</div>
              <div>(주)JMF</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[#999]">{MODAL_INFO[3]}</div>
              <div>333-22-55555</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[#999]">{MODAL_INFO[4]}</div>
              <div>서울시 어쩌구 어디로 888 1층</div>
            </div>
          </div>
          {detailData && (
            <QuotationTable
              quotationInfo={detailData}
              isAdmin={isAdmin}
              isPdfGenerating={isPdfGenerating}
            />
          )}
        </div>
        <div className="w-full flex gap-x-4 mt-[60px]">
          <Button
            buttonText="닫기"
            type="quoteClose"
            onClickHandler={closeModal}
          />
          {!isAdmin && (
            <Button
              buttonText="주문확정"
              type="quoteOrder"
              onClickHandler={closeModal}
            />
          )}
          <Button
            buttonText="PDF 저장"
            type="quoteOrder"
            onClickHandler={handlePDFGeneration}
          />
        </div>
      </div>
    </div>
  );
};

export default QuotationModal;
