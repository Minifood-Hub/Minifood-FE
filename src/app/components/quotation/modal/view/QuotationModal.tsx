'use client';

import Button from '@/app/components/common/Button';
import { BUTTON_TEXT, DIALOG_TEXT, MODAL_INFO } from '@/app/constants/order';
import { callGet, callPatch } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import QuotationTable from './QuotationTable';
import { usePDF } from 'react-to-pdf';
import Icons from '@/app/components/common/Icons';
import { PhotoCameraIcon } from '@/app/ui/iconPath';
import { Dialog } from '@/app/components/common/Dialog';

interface QuotationModalProps {
  closeModal: () => void;
  id: number;
  isAdmin?: boolean;
}

const QuotationModal = ({ closeModal, id, isAdmin }: QuotationModalProps) => {
  const [detailData, setDetailData] = useState<QuotationInfoTypes | null>(null);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const [dialog, setDialog] = useState({
    open: false,
    topText: '',
    onClick: () => {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet(`/api/quotation/detail?id=${id}`);
      setDetailData(data.result);
    };
    fetchData();
  }, []);
  console.log(detailData);

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

  const patchConfirm = async () => {
    try {
      await callPatch(`/api/order/quotations/${id}/confirmation`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmQuotation = async () => {
    try {
      await patchConfirm();

      setDialog((prev) => ({
        ...prev,
        open: true,
        topText: DIALOG_TEXT[1],
        onClick: () => {
          setDialog({ open: false, topText: '', onClick: () => {} });
          closeModal();
        },
      }));
    } catch (error) {
      console.error('견적서 확정 중 오류 발생 : ', error);
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
        {!isPdfGenerating && (
          <>
            <div className="pt-8 flex justify-end items-center self-stretch">
              <button
                className="max-w-fit flex-center py-2 px-[18px] rounded bg-primary-3 gap-2"
                type="button"
                onClick={handlePDFGeneration}
              >
                <Icons name={PhotoCameraIcon} />
                <p className="font-medium text-white">PDF로 저장</p>
              </button>
            </div>
            <div className="w-full flex gap-x-4 mt-[60px]">
              <Button
                buttonText="닫기"
                type="quoteClose"
                onClickHandler={closeModal}
              />
              {detailData?.status !== 'COMPLETED' && (
                <Button
                  buttonText="주문확정"
                  type="quoteOrder"
                  onClickHandler={handleConfirmQuotation}
                />
              )}
            </div>
          </>
        )}
      </div>

      {dialog.open && (
        <Dialog
          topText={dialog.topText}
          BtnText={BUTTON_TEXT[3]}
          onBtnClick={dialog.onClick}
        />
      )}
    </div>
  );
};

export default QuotationModal;
