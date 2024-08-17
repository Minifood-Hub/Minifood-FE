'use client';

import {
  BUTTON_TEXT,
  DIALOG_TEXT,
  MODAL_INFO,
  MODAL_TEXT,
} from '@/app/constants/order';
import { cancelIcon } from '@/app/ui/iconPath';
import { callGet, callPatch } from '@/app/utils/callApi';
import { formatPrice } from '@/app/utils/formatPrice';
import { saveImage } from '@/app/utils/saveImage';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../common/Button';
import { Dialog } from '../../common/Dialog';
import Icons from '../../common/Icons';
import Input from '../../common/Input';
import LoadingIndicator from '../../common/Loading';
import QuotationSave from '../../quotation/modal/QuotationSave';
import QuotationTable from './OrderQuotationTable';
import { useUser } from '@/app/hooks/useUser';

export default function QuotationModal({
  QuotationModalData,
  closeModal,
  quotationId,
  currentDate,
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
    <div className="fixed inset-0 flex-center z-50 bg-black bg-opacity-30">
      <div
        id="quotation-modal"
        className="flex flex-col w-[680px] h-[812px] rounded-3xl px-8 py-7 bg-white relative whitespace-nowrap"
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div className="self-end cursor-pointer" onClick={closeModal}>
              <Icons name={cancelIcon} />
            </div>
            <div className="w-full flex text-lg font-light">
              <span className="text-5xl font-bold mr-6">{MODAL_INFO[0]}</span>
              <div>
                <div className="flex gap-x-2">
                  <span className="font-bold">{MODAL_INFO[1]}</span>
                  <span>{currentDate}</span>
                </div>
                <div className="flex gap-x-2">
                  <span className="font-bold">{MODAL_INFO[2]}</span>
                  <span>{user?.result.email}</span>
                </div>
              </div>
            </div>

            <div className="w-full border-2 border-[#55aa00] mt-2.5" />

            <QuotationTable quotationInfo={QuotationModalData} />

            <div className="w-full mt-4 flex flex-col">
              <p>{MODAL_TEXT[7]}</p>
              <div className="flex">
                <Input
                  type="default"
                  onChange={(e) => {
                    handlePartiChange(e);
                  }}
                  className="w-full min-h-14 px-2 py-1 border-2"
                  textValue={partiValue}
                />
              </div>
            </div>

            <div className="absolute right-12 bottom-32 flex items-center font-extrabold">
              <span className="text-2xl mr-4">{MODAL_INFO[3]}</span>
              <div className="pl-4 border-double border-b-[7px] border-[#55aa00]">
                <span className="text-2xl sm:text-4xl font-bold text-end pb-1">
                  {formatPrice(total)} 원
                </span>
              </div>
            </div>
            <div className="absolute bottom-32">
              <QuotationSave onClick={saveImage} />
            </div>

            <div className="flex flex-col absolute bottom-8 right-12 w-[calc(100%-6rem)]">
              {MODAL_TEXT[8]}
              <Button
                onClickHandler={handleConfirmQuotation}
                buttonText={BUTTON_TEXT[2]}
                type="default"
                className="bg-primary-3 text-white rounded-lg whitespace-nowrap font-extrabold text-xl py-2"
                isDisabled={false}
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
