'use client';

import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { callPost } from '@/app/utils/callApi';
import { ALERT_TEXT, BTN_TEXT, INPUT_TEXT } from '@/app/constants/admin';

export default function NoticePost() {
  const [notice, setNotice] = useState({
    title: '',
    content: '',
  });

  const handleCheckQuotation = async () => {
    if (!notice.title || !notice.content) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callPost(`/api/admin/notices/post`, notice);
      alert(ALERT_TEXT[6]);
      setNotice({
        title: '',
        content: '',
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="flex flex-col w-1/2 gap-2">
          <p className="font-bold">{INPUT_TEXT[10]}</p>
          <Input
            name="inputDate"
            className="border-2 w-full py-2 px-4"
            onChange={(e) => setNotice({ ...notice, title: e.target.value })}
            textValue={notice.title}
            placeholder={INPUT_TEXT[10]}
            type="default"
          />
        </div>

        <div className="flex flex-col w-1/2 gap-2">
          <p className="font-bold">{INPUT_TEXT[11]}</p>
          <textarea
            value={notice.content}
            name="inputDate"
            className="border-2 w-full min-h-44 py-2 px-4"
            onChange={(e) => setNotice({ ...notice, content: e.target.value })}
            placeholder={INPUT_TEXT[11]}
          />
        </div>

        <div className="flex flex-col w-1/2">
          <Button
            className="bg-primary-4 text-white font-bold max-w-fit px-8 py-2 self-end"
            buttonText={BTN_TEXT[2]}
            type="default"
            onClickHandler={handleCheckQuotation}
          />
        </div>
      </div>
    </div>
  );
}
