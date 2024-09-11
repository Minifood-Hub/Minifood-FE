'use client';

import { QUOTATION_MANAGE } from '@/app/constants/quotation';
import { useModal } from '@/app/hooks/useModal';
import { callDelete, callPut } from '@/app/utils/callApi';
import { useState } from 'react';
import Button from '../common/Button';
import DeletePastorderModal from './modal/DeletePastorderModal';
import PastOrderDetail from './PastOrderDetail';
import PastOrderEdit from './PastOrderEdit';
import { PASTORDER_ALERT } from '@/app/constants/alert';

interface PastOrderTableInfoProps {
  pastorder: PastOrder;
  index: number;
}

const PastOrderTableInfo = ({ pastorder, index }: PastOrderTableInfoProps) => {
  const { isOpen, openModal, closeModal } = useModal(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productIds, setProductIds] = useState<number[]>([]); // productIds 상태 추가

  const putPastOrder = async () => {
    await callPut(
      `/api/past-order/put?pastorder_id=${pastorder.past_order_id}`,
      {
        name: pastorder.name,
        product_ids: productIds,
      },
    );
    setIsEdit(false);
    alert(PASTORDER_ALERT[1]);
  };

  const deletePastOrder = (id: number) => {
    callDelete(`/api/past-order/delete?pastorder_id=${id}`);
    window.location.reload();
  };

  const editPastOrder = () => {
    setIsEdit(!isEdit);
    setIsView(false);
  };

  const viewPastOrder = () => {
    setIsView(!isView);
    setIsEdit(false);
  };

  return (
    <div key={pastorder.past_order_id}>
      {isOpen && (
        <DeletePastorderModal
          closeModal={closeModal}
          deletePastorder={() => deletePastOrder(pastorder.past_order_id)}
        />
      )}
      <div className="w-full justify-start items-center inline-flex h-[53px] text-base font-normal border-b border-b-[#E0E0E0]">
        <div className="w-[9.5%] text-center">{index + 1}</div>
        <div className="w-[65.5%] pl-3">{pastorder.name}</div>
        {isEdit ? (
          <div className="flex flex-row-reverse pl-[5%] gap-x-[10%] px-[5%] flex-grow">
            <Button
              buttonText={QUOTATION_MANAGE[4]}
              type="quoteTableControl"
              onClickHandler={putPastOrder}
              className="bg-[#55AA00] text-white"
            />
            <Button
              buttonText={QUOTATION_MANAGE[3]}
              type="quoteTableControl"
              onClickHandler={() => setIsEdit(false)}
              className="border border-[#e0e0e0]"
            />
          </div>
        ) : (
          <div className="flex gap-x-[10%] px-[5%] flex-grow">
            <Button
              buttonText={isView ? QUOTATION_MANAGE[3] : QUOTATION_MANAGE[0]}
              type="quoteTableControl"
              onClickHandler={viewPastOrder}
              className="border border-[#e0e0e0]"
            />
            <Button
              buttonText={QUOTATION_MANAGE[1]}
              type="quoteTableControl"
              onClickHandler={editPastOrder}
              className="border border-[#e0e0e0]"
            />
            <Button
              buttonText={QUOTATION_MANAGE[2]}
              type="quoteTableControl"
              onClickHandler={openModal}
              className="bg-[#fc4c00] text-white"
            />
          </div>
        )}
      </div>
      {isView && <PastOrderDetail pastorderId={pastorder.past_order_id} />}
      {isEdit && (
        <PastOrderEdit
          pastorderId={pastorder.past_order_id}
          setProductIds={setProductIds}
        />
      )}
    </div>
  );
};

export default PastOrderTableInfo;
