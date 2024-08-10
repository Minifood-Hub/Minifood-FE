import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import {
  ALERT_TEXT,
  BTN_TEXT,
  clientStatusMapping,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import { formatDate } from '@/app/utils/date';

export default function CheckQuotation({ clientId }: ClientIdProps) {
  const [inputDate, setInputDate] = useState(
    formatDate(new Date().toISOString()),
  );
  const [result, setResult] = useState<{ result: CheckQuotationResult | null }>(
    { result: null },
  );

  const handleCheckQuotation = async () => {
    if (!clientId || !inputDate) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      const data = await callGet(
        `/api/admin/clients/${clientId}/check`,
        `input_date=${inputDate}`,
      );
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ result: null });
    }
  };

  const renderTable = () => {
    if (!result.result) return null;
    return (
      <table className="admin-table max-w-fit">
        <thead>
          <tr>
            <th className="admin-table-th">{TABLE_TEXT[0]}</th>
            <th className="admin-table-th">{TABLE_TEXT[4]}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="admin-table-th">{result.result.client_id}</td>
            <td className="admin-table-th">
              {result.result.status
                ? clientStatusMapping.COMPLETED
                : clientStatusMapping.NONE}
            </td>
          </tr>
        </tbody>
      </table>
    );
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
      {renderTable()}
    </div>
  );
}
