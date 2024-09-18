import React, { useState } from 'react';
import {
  ALERT_TEXT,
  BTN_TEXT,
  DIALOG_TEXT,
  INPUT_TEXT,
  REGION_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { callDelete, callGet, callPatch } from '@/app/utils/callApi';
import InquiryPastOrder from './InquiryPastOrder';
import { Dialog } from '../../common/Dialog';

export default function ClientsName() {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ items: ClientsNameProps[] }>({
    items: [],
  });
  const [inputComment, setInputComment] = useState('');
  const [showPastOrder, setShowPastOrder] = useState<number | null>(null);
  const [isEditRegion, setIsEditRegion] = useState<number | null>(null);
  const [region, setRegion] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState<number | null>(null); // 삭제할 client_id 상태

  // 거래처 조회
  const handleGetClients = async () => {
    if (!name) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      const data = await callGet(`/api/admin/clients/name/${name}`);
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  };

  // 지역 선택 및 저장
  const handleSetRegion = async (client_id: number) => {
    try {
      await callPatch(
        `/api/admin/clients/${client_id}/region`,
        `region=${region}`,
      );
      alert(ALERT_TEXT[1]);
      setIsEditRegion(null);
      await handleGetClients();
    } catch (error) {
      console.error(error);
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
  const handleDelete = async () => {
    if (deleteClientId !== null) {
      try {
        await callDelete(`/api/admin/clients/${deleteClientId}/delete`);
        await handleGetClients();
      } catch (error) {
        console.error(error);
      } finally {
        setIsDialogOpen(false);
      }
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
          <div className="w-[10%] text-center">{TABLE_TEXT[11]}</div>
          <div className="w-[25%]">{TABLE_TEXT[12]}</div>
          <div className="w-[5%] text-center">{BTN_TEXT[1]}</div>
        </div>
        {result.items.map((item: ClientsNameProps) => (
          <React.Fragment key={item.id}>
            <div className="flex p-2 border-2">
              <div className="w-[5%]">{item.id}</div>
              <div className="w-[15%]">{item.name}</div>
              <div className="w-[15%]">
                {isEditRegion === item.id ? (
                  <div className="flex items-center">
                    <select
                      className="border-2"
                      onChange={(e) => setRegion(e.target.value)}
                      value={region}
                    >
                      {REGION_TEXT.map((text) => (
                        <option key={text} value={text}>
                          {text}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClickHandler={() => handleSetRegion(item.id)}
                      className="ml-2 admin-btn"
                      type="default"
                      buttonText={BTN_TEXT[6]}
                    />
                  </div>
                ) : (
                  <>
                    {item.region}
                    <Button
                      onClickHandler={() => {
                        setIsEditRegion(item.id);
                        setRegion(item.region);
                      }}
                      className="px-2 ml-4 admin-btn"
                      type="default"
                      buttonText={REGION_TEXT[0]}
                    />
                  </>
                )}
              </div>
              <div className="w-[25%]">{item.address}</div>
              <div className="w-[10%] flex justify-center">
                <Button
                  type="default"
                  onClickHandler={() =>
                    setShowPastOrder((prev) =>
                      prev === item.id ? null : item.id,
                    )
                  }
                  className="admin-btn"
                  buttonText={BTN_TEXT[8]}
                />
              </div>
              <div className="w-[25%] flex justify-between pr-6">
                <Input
                  className="border-2"
                  type="default"
                  onChange={(e) => setInputComment(e.target.value)}
                  textValue={inputComment}
                  placeholder={INPUT_TEXT[2]}
                />
                <Button
                  className="admin-btn"
                  buttonText={BTN_TEXT[0]}
                  type="default"
                  onClickHandler={() => handleSetComment(item.id)}
                />
              </div>
              <div className="w-[5%] flex justify-center">
                <Button
                  type="default"
                  onClickHandler={() => {
                    setDeleteClientId(item.id);
                    setIsDialogOpen(true); // 다이얼로그 열기
                  }}
                  className="bg-red-1 admin-btn"
                  buttonText={BTN_TEXT[1]}
                />
              </div>
            </div>
            {showPastOrder === item.id && (
              <InquiryPastOrder clientId={item.id} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-12">
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[3]}</p>
          <Input
            name="page"
            className="admin-input"
            type="default"
            onChange={(e) => setName(e.target.value)}
            textValue={name}
            placeholder={INPUT_TEXT[3]}
          />
        </div>

        <Button
          className="admin-btn"
          buttonText={BTN_TEXT[4]}
          type="default"
          onClickHandler={handleGetClients}
        />
      </div>
      <div className="w-full">{renderTable()}</div>

      {/* 삭제 확인 다이얼로그 */}
      {isDialogOpen && (
        <Dialog
          topText={DIALOG_TEXT[2]}
          BtnText={BTN_TEXT[1]}
          isWarn
          onBtnClick={handleDelete} // 삭제 실행
          isTwoButton
          onSubBtnClick={() => setIsDialogOpen(false)} // 다이얼로그 닫기
        />
      )}
    </div>
  );
}
