'use client';

import { MODAL_INFO } from '@/app/constants/order';
import { useUser } from '@/app/hooks/useUser';
import { callGet, callPatch, callPost, callPut } from '@/app/utils/callApi';
import { formatDate } from '@/app/utils/date';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../../common/Button';
import QuotationTable from '../view/QuotationTable';
import { QUOTATION_ALERT } from '@/app/constants/alert';

export default function EditQuotationModal({
  QuotationModalData,
  closeModal,
  quotationId,
  quotationName,
}: QuotationModalProps) {
  const { user } = useUser();
  const router = useRouter();
  const [detailData, setDetailData] = useState<QuotationInfoTypes | null>(null);
  const [state, setState] = useState({
    currentDate: '',
    partiValue: '',
  });
  const { currentDate, partiValue } = state;

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
    await callGet(`/api/order/quotations/${quotation_id}/total`);
  };

  useEffect(() => {
    const now = formatDate(new Date().toString());
    setState((prev) => ({ ...prev, currentDate: now }));
  }, []);

  useEffect(() => {
    const completeQuotation = async () => {
      if (currentDate && user?.result?.client_id && quotationId) {
        await createProducts();
        await updateProducts();
        await updateTotal(quotationId);
        const data = await callGet(`/api/quotation/detail?id=${quotationId}`);
        setDetailData(data.result);
      }
    };
    completeQuotation();
  }, [currentDate, user?.result?.client_id, quotationId]);

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
    router.push('/quotation');
    alert(QUOTATION_ALERT[0]);
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col w-[800px] rounded p-10 bg-gray-1 relative items-center">
        <div className="w-full flex-center bg-[#55AA00] text-white rounded h-[57px] mb-2">
          {quotationName}
        </div>
        <div className="w-full flex flex-col text-lg font-light bg-white px-6 pt-6">
          <div className="text-lg font-bold mt-3 pb-3 border-b-2 border-black">
            {MODAL_INFO[1]}
          </div>
          <div className="flex flex-col gap-y-2 mt-4 w-full pb-4 text-base font-normal text-black border-b-2 border-dashed border-gray-2 px-1">
            <div className="flex justify-between">
              <div className="text-[#999]">{MODAL_INFO[2]}</div>
              <div>(주)미니푸드</div>
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
          {detailData && <QuotationTable quotationInfo={detailData} />}
        </div>
        <div className="w-full flex gap-x-4 mt-[60px]">
          <Button
            buttonText="닫기"
            type="quoteClose"
            onClickHandler={closeModal}
          />
          <Button
            buttonText="주문확정"
            type="quoteOrder"
            onClickHandler={handleConfirmQuotation}
          />
        </div>
      </div>
    </div>
  );
}
