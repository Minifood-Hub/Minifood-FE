import { BTN_TEXT, INPUT_TEXT } from '@/app/constants/admin';
import Button from '../common/Button';
import { callGetBinary } from '@/app/utils/callApi';
import { useState } from 'react';

export default function ExtractAll() {
  const [date, setDate] = useState('');

  const handleExtractTodayQuotation = async () => {
    try {
      await callGetBinary(
        `/api/admin/quotations/extracts/today`,
        `input_date=${date}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    setDate(inputDate);
  };

  return (
    <div className="flex justify-center items-center gap-4 py-4 border">
      <p className="font-bold text-lg">{INPUT_TEXT[8]}</p>
      <input
        className="w-56 h-10 border rounded px-4"
        type="date"
        onChange={handleDateChange}
        onClick={(e) => (e.target as HTMLInputElement).showPicker()}
        value={date}
        placeholder={INPUT_TEXT[3]}
      />

      <Button
        className="admin-btn"
        buttonText={BTN_TEXT[9]}
        type="default"
        onClickHandler={handleExtractTodayQuotation}
      />
    </div>
  );
}
