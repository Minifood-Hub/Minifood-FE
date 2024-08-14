'use client';

import {
  BUTTON_TEXT,
  DIALOG_TEXT,
  MODAL_INFO,
  MODAL_TEXT,
} from '@/app/constants/order';
import { cancelIcon } from '@/app/ui/iconPath';
import { callGet, callPatch, callPost, callPut } from '@/app/utils/callApi';
import { formatDate } from '@/app/utils/date';
import { formatPrice } from '@/app/utils/formatPrice';
import { saveImage } from '@/app/utils/saveImage';
import { useUser } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import { Dialog } from '../../common/Dialog';
import Icons from '../../common/Icons';
import Input from '../../common/Input';
import LoadingIndicator from '../../common/Loading';
import QuotationTable from '../../order/quotation/OrderQuotationTable';
import QuotationSave from './QuotationSave';

export default function EditQuotationModal({
  QuotationModalData,
  closeModal,
  quotationId,
}: QuotationModalProps) {
  const { user } = useUser();
  const router = useRouter();

  const [state, setState] = useState({
    currentDate: '',
    total: 0,
    partiValue: '',
    loading: false,
  });
  const { currentDate, total, partiValue, loading } = state;
  const [dialog, setDialog] = useState({
    open: false,
    topText: '',
    onClick: () => {},
  });

  const createProducts = async () => {
    const body = QuotationModalData.filter(
      (item: any) => item.isEdited === undefined,
    ).map((item: any) => ({
      quotation_id: quotationId,
      product_id: item.id,
      quantity: item.count,
    }));
    await callPost('/api/order/quotations/products', body);
  };

  const updateProducts = async () => {
    const editedItems = QuotationModalData.filter(
      (item: any) => item.isEdited === true,
    );
    const updatePromises = editedItems.map((item: any) => {
      const body = { quantity: item.count };
      return callPut(
        `/api/quotation/put?quotation_id=${quotationId}&product_id=${item.id}`,
        body,
      );
    });

    try {
      await Promise.all(updatePromises);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTotal = async (quotation_id: string) => {
    const data = await callGet(`/api/order/quotations/${quotation_id}/total`);
    if (data.isSuccess) {
      setState((prev) => ({ ...prev, total: data.result }));
    }
  };

  useEffect(() => {
    const now = formatDate(new Date().toString());
    setState((prev) => ({ ...prev, currentDate: now }));
  }, []);

  useEffect(() => {
    const completeQuotation = async () => {
      if (currentDate && user?.result.client_id && quotationId) {
        setState((prev) => ({ ...prev, loading: true }));

        await createProducts();
        await updateProducts();
        await updateTotal(quotationId);

        setState((prev) => ({ ...prev, loading: false }));
      }
    };
    completeQuotation();
  }, [currentDate, user?.result.client_id, quotationId]);

  const patchParticulars = async () => {
    const particulars = partiValue;
    await callPatch(
      `/api/order/quotations/${quotationId}/particulars`,
      `particulars=${particulars}`,
    );
  };

  const patchConfirm = async () => {
    await callPatch(`/api/order/quotations/${quotationId}/confirmation`);
  };

  const handleConfirmQuotation = async () => {
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
                    setState((prev) => ({
                      ...prev,
                      partiValue: e.target.value,
                    }));
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
