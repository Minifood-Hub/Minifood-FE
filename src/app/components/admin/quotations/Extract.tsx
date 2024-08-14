import Input from '../../common/Input';
import Button from '../../common/Button';
import { useState } from 'react';
import { ALERT_TEXT, BTN_TEXT, INPUT_TEXT } from '@/app/constants/admin';
import { callGetBinary } from '@/app/utils/callApi';

export default function Extract() {
  const [quotationId, setQuotationId] = useState('');

  const handleExtractQuotation = async () => {
    if (!quotationId) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callGetBinary(`/api/admin/quotations/extract/${quotationId}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex gap-4 border-2 p-8">
      <div className="flex gap-4 items-center">
        <p className="whitespace-nowrap">{INPUT_TEXT[14]}</p>
        <Input
          name="inputComment"
          className="admin-input"
          type="default"
          onChange={(e) => setQuotationId(e.target.value)}
          textValue={quotationId}
          placeholder={INPUT_TEXT[14]}
        />
      </div>

      <Button
        className="admin-btn"
        buttonText={BTN_TEXT[0]}
        type="default"
        onClickHandler={handleExtractQuotation}
      />
    </div>
  );
}
