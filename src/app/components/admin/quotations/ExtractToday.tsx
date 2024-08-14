import { callGetBinary } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { ALERT_TEXT, BTN_TEXT, INPUT_TEXT } from '@/app/constants/admin';
import { formatDate } from '@/app/utils/date';

export default function ExtractToday() {
  const [inputDate, setInputDate] = useState(
    formatDate(new Date().toISOString()),
  );

  const handleCheckQuotation = async () => {
    if (!inputDate) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callGetBinary(
        `/api/admin/quotations/extracts/today`,
        `input_date=${inputDate}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-12">
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[6]}</p>
          <Input
            name="inputDate"
            className="admin-input"
            inputType="date"
            onChange={(e) => setInputDate(e.target.value)}
            textValue={inputDate}
            placeholder={INPUT_TEXT[6]}
            type="default"
          />
        </div>

        <Button
          className="admin-btn"
          buttonText={BTN_TEXT[0]}
          type="default"
          onClickHandler={handleCheckQuotation}
        />
      </div>
    </div>
  );
}
