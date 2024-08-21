'use client';

import {
  BUTTON_TEXT,
  DIALOG_TEXT,
  MODAL_INFO,
  MODAL_TEXT,
} from '@/app/constants/order';
import { callGet, callPatch } from '@/app/utils/callApi';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../common/Button';
import { Dialog } from '../../common/Dialog';
import Input from '../../common/Input';
import LoadingIndicator from '../../common/Loading';
import QuotationTable from './OrderQuotationTable';
import { useUser } from '@/app/hooks/useUser';

export default function QuotationModal({
  QuotationModalData,
  closeModal,
  quotationId,
}: QuotationModalProps) {
  const { user } = useUser();
  const router = useRouter();

  const [state, setState] = useState({
    total: 0,
    partiValue: '',
    loading: false,
  });
  const { total, partiValue, loading } = state;
  const [dialog, setDialog] = useState({
    open: false,
    topText: '',
    onClick: () => {},
  });

  // 견적서 합계 금액 업데이트
  const updateTotal = async (quotation_id: string) => {
    try {
      const data = await callGet(`/api/order/quotations/${quotation_id}/total`);
      console.log(quotation_id);
      console.log(data);
      if (data.isSuccess) {
        setState((prev) => ({ ...prev, total: data.result }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 견적서 완성
  useEffect(() => {
    const completeQuotation = async () => {
      if (quotationId) {
        setState((prev) => ({ ...prev, loading: true }));
        try {
          await updateTotal(quotationId);
        } catch (error) {
          console.error('견적서 생성 중 오류 발생 : ', error);
        } finally {
          setState((prev) => ({ ...prev, loading: false })); // 로딩 종료
        }
      }
    };
    completeQuotation();
  }, []);

  // 견적서 특이사항 작성 onChange
  const handlePartiChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parti = e.target.value;
    setState((prev) => ({ ...prev, partiValue: parti }));
  };

  // 견적서 특이사항 작성
  const patchParticulars = async () => {
    try {
      const particulars = partiValue;
      await callPatch(
        `/api/order/quotations/${quotationId}/particulars`,
        `particulars=${particulars}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 견적서 작성 확정
  const patchConfirm = async () => {
    try {
      await callPatch(`/api/order/quotations/${quotationId}/confirmation`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmQuotation = async () => {
    try {
      await patchParticulars();
      await patchConfirm();

      setDialog((prev) => ({
        ...prev,
        open: true,
        topText: DIALOG_TEXT[1],
        onClick: () => {
          setDialog({ open: false, topText: '', onClick: () => {} });
          router.push('/quotation');
        },
      }));
    } catch (error) {
      console.error('견적서 확정 중 오류 발생 : ', error);
    }
  };

  return (
    <div className="fixed inset-0 flex-center bg-gray-3 bg-opacity-70 z-50">
      <div
        id="quotation-modal"
        className="flex flex-col w-[800px] max-h-screen items-start rounded p-10 gap-[60px] bg-gray-1 whitespace-nowrap overflow-y-auto"
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="flex-center py-[18px] px-6 gap-[10px] self-stretch rounded bg-primary-3 text-white text-lg font-bold">
                {MODAL_INFO[0]}
              </div>
              <div className="flex flex-col items-center gap-8 self-stretch bg-white px-6 pt-6">
                <div className="flex flex-col items-center self-stretch border-b border-dashed border-gray-3">
                  <div className="flex py-3 px-0 items-center gap-[10px] self-stretch">
                    <span className="text-gray-7 text-lg font-bold">
                      {MODAL_INFO[1]}
                    </span>
                  </div>
                  <div className="flex py-4 px-0 flex-col items-start gap-2 self-stretch">
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-gray-4 text-center">판매자상호</p>
                      <p className="text-gray-6">JMF(주)</p>
                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-gray-4 text-center">상업자등록번호</p>
                      <p className="text-gray-6">333-22-55555</p>
                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-gray-4 text-center">주소</p>
                      <p className="text-gray-6">
                        {user?.result.client_region}
                      </p>
                    </div>
                  </div>
                </div>
                <QuotationTable quotationInfo={QuotationModalData} />
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 self-stretch">
              <p className="font-medium">{MODAL_TEXT[7]}</p>
              <Input
                type="default"
                onChange={(e) => {
                  handlePartiChange(e);
                }}
                className="flex py-4 px-6 items-start gap-[10px] self-stretch rounded border border-gray-2 bg-white"
                textValue={partiValue}
              />
            </div>

            <div className="flex items-center gap-4 self-stretch">
              <Button
                buttonText="닫기"
                type="default"
                className="flex-center py-3 px-6 gap-[10px] rounded border border-gray-2 bg-white font-normal"
                onClickHandler={closeModal}
              />
              <Button
                onClickHandler={handleConfirmQuotation}
                buttonText={BUTTON_TEXT[2]}
                type="default"
                className="flex-center py-3 px-6 gap-[10px] rounded border bg-primary-3 font-normal text-white"
              />
            </div>

            {dialog.open && (
              <Dialog
                topText={dialog.topText}
                BtnText={BUTTON_TEXT[3]}
                onBtnClick={dialog.onClick}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
