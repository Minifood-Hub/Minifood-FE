import { callPatch } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { BTN_TEXT, ALERT_TEXT, INPUT_TEXT } from '@/app/constants/admin';

export default function SetComment({ clientId }: ClientIdProps) {
  const [inputComment, setInputComment] = useState('');

  const handleSetComment = async () => {
    if (!clientId || !inputComment) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callPatch(
        `/api/admin/clients/${clientId}/comment`,
        `input_comment=${inputComment}`,
      );
      alert(ALERT_TEXT[2]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-4 border-2 p-8">
      <div className="flex gap-4 items-center">
        <p className="whitespace-nowrap">{INPUT_TEXT[7]}</p>
        <Input
          name="inputComment"
          className="admin-input"
          type="default"
          onChange={(e) => setInputComment(e.target.value)}
          textValue={inputComment}
          placeholder={INPUT_TEXT[7]}
        />
      </div>

      <Button
        className="admin-btn"
        buttonText={BTN_TEXT[0]}
        type="default"
        onClickHandler={handleSetComment}
      />
    </div>
  );
}
