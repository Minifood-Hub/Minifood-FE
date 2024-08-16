import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { ALERT_TEXT, BTN_TEXT, INPUT_TEXT } from '@/app/constants/admin';
import { callDelete } from '@/app/utils/callApi';

export default function NoticeDelete() {
  const [notice_id, setNotice_id] = useState('');

  const handleDelete = async () => {
    if (!notice_id) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      const test = await callDelete(`/api/admin/notices/delete/${notice_id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex gap-4 border-2 p-8">
      <div className="flex gap-4 items-center">
        <p className="whitespace-nowrap">{INPUT_TEXT[12]}</p>
        <Input
          name="inputComment"
          className="admin-input"
          type="default"
          onChange={(e) => setNotice_id(e.target.value)}
          textValue={notice_id}
          placeholder={INPUT_TEXT[12]}
        />
      </div>

      <Button
        className="admin-btn border-red-1"
        buttonText={BTN_TEXT[0]}
        type="default"
        onClickHandler={handleDelete}
      />
    </div>
  );
}
