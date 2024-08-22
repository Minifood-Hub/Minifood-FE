'use client';

import {
  ALERT_TEXT,
  BTN_TEXT,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { useState } from 'react';
import { callDelete, callGet, callPatch } from '@/app/utils/callApi';
import InquiryPastOrder from './InquiryPastOrder';

export default function ClientsName() {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ items: ClientsNameProps[] }>({
    items: [],
  });
  const [inputComment, setInputComment] = useState('');
  const [showPastorder, setShowPastOrder] = useState(false);

  // 거래처 조회
  const handleGetQuotations = async () => {
    if (!name) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      const data = await callGet(`/api/admin/clients/name/${name}`);
      console.log(data);
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  };

  // 특이사항 작성
  const handleSetComment = async (client_id: number) => {
    if (!inputComment) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callPatch(
        `/api/admin/clients/${client_id}/comment`,
        `input_comment=${inputComment}`,
      );
      alert(ALERT_TEXT[2]);
    } catch (error) {
      console.error(error);
    }
  };

  // 거래처 삭제
  const handleDelete = async (client_id: number) => {
    try {
      await callDelete(`/api/admin/clients/${client_id}/delete`);
      alert(ALERT_TEXT[3]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderTable = () => {
    return (
      <div className="w-full">
        <div className="flex bg-primary-1 w-full p-2 text-white font-bold">
          <div className="w-[5%]">{TABLE_TEXT[0]}</div>
          <div className="w-[15%]">{TABLE_TEXT[1]}</div>
          <div className="w-[15%]">{TABLE_TEXT[6]}</div>
          <div className="w-[25%]">{TABLE_TEXT[7]}</div>
          <div className="w-[10%] text-center">주문내역</div>
          <div className="w-[25%]">특이사항</div>
          <div className="w-[5%] text-center">삭제</div>
        </div>
        {result.items.map((item: ClientsNameProps) => (
          <>
            <div className="flex p-2 border-2" key={item.id}>
              <div className="w-[5%]">{item.id}</div>
              <div className="w-[15%]">{item.name}</div>
              <div className="w-[15%]">{item.region}</div>
              <div className="w-[25%]">{item.address}</div>
              <div className="w-[10%] cursor-pointer">
                <Button
                  type="default"
                  onClickHandler={() => setShowPastOrder((prev) => !prev)}
                  className=""
                  buttonText="조회"
                />
              </div>
              <div className="w-[25%] flex justify-between pr-4">
                <Input
                  className="border-2"
                  type="default"
                  onChange={(e) => setInputComment(e.target.value)}
                  textValue={inputComment}
                  placeholder={INPUT_TEXT[7]}
                />
                <Button
                  className="admin-btn"
                  buttonText={BTN_TEXT[0]}
                  type="default"
                  onClickHandler={() => handleSetComment(item.id)}
                />
              </div>
              <div className="w-[5%]">
                <Button
                  type="default"
                  onClickHandler={() => handleDelete(item.id)}
                  className="flex justify-center text-red-1 cursor-pointer"
                  buttonText={BTN_TEXT[1]}
                />
              </div>
            </div>
            {showPastorder && <InquiryPastOrder clientId={item.id} />}
          </>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-12">
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[8]}</p>
          <Input
            name="page"
            className="admin-input"
            type="default"
            onChange={(e) => setName(e.target.value)}
            textValue={name}
            placeholder={INPUT_TEXT[8]}
          />
        </div>

        <Button
          className="admin-btn"
          buttonText={BTN_TEXT[0]}
          type="default"
          onClickHandler={handleGetQuotations}
        />
      </div>
      <div className="w-full">{renderTable()}</div>
    </div>
  );
}
