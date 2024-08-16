'use client';

import {
  ALERT_TEXT,
  BTN_TEXT,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import { useState } from 'react';
import { callGet } from '@/app/utils/callApi';
import Input from '../../common/Input';
import Button from '../../common/Button';

export default function NoticeGetId() {
  const [id, setId] = useState('');
  const [result, setResult] = useState<NoticeProps | null>(null);

  const handleGetNotice = async () => {
    const notice_id = Number(id);
    if (!Number.isInteger(notice_id) || notice_id <= 0) {
      alert(ALERT_TEXT[0]);
      return;
    }

    try {
      const response = await callGet(`/api/admin/notices/get/${notice_id}`);
      if (response.isSuccess && response.result) {
        setResult(response.result);
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error(error);
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex gap-4 items-center">
        <p className="whitespace-nowrap">{INPUT_TEXT[12]}</p>
        <Input
          className="admin-input max-w-fit"
          type="default"
          onChange={(e) => setId(e.target.value)}
          textValue={id}
          placeholder={INPUT_TEXT[12]}
        />
        <Button
          className="admin-btn"
          buttonText={BTN_TEXT[0]}
          type="default"
          onClickHandler={handleGetNotice}
        />
      </div>

      {result && (
        <div
          className="flex flex-col w-full px-4 py-2 border-[1px] border-gray-7 cursor-pointer"
          key={result.id}
        >
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-4 text-ellipsis">
              <p className="text-gray-2">{result.id}</p>
              <p className="font-bold text-xl">{result.title}</p>
            </div>
            <div className="flex gap-2">
              <p>
                {TABLE_TEXT[2]}: {result.created_at}
              </p>
              <p>
                {TABLE_TEXT[3]}: {result.updated_at ? result.updated_at : 'N/A'}
              </p>
            </div>
          </div>

          <div className="bg-gray-0 border-t-[1px] border-gray-4 mt-4 px-2 py-4">
            <p className="text-ellipsis">{result.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
