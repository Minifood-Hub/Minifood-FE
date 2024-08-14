import {
  ALERT_TEXT,
  BTN_TEXT,
  clientStatusMapping,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { formatNumber } from '@/app/utils/formatPrice';
import { formatDate } from '@/app/utils/date';

export default function QuotationInfo() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(formatDate(new Date().toISOString()));
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ items: AdminItemProps[] }>({
    items: [],
  });

  const handleGetQuotations = async () => {
    if (!startDate || !endDate || !query) {
      alert(ALERT_TEXT[0]);
      return;
    }

    try {
      const data = await callGet(
        `/api/admin/quotations/search/info`,
        `start=${startDate}&end=${endDate}&query=${query}`,
      );
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  };

  const renderTable = () => {
    return (
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-table-th">{TABLE_TEXT[0]}</th>
            <th className="admin-table-th">{TABLE_TEXT[1]}</th>
            <th className="admin-table-th">{TABLE_TEXT[2]}</th>
            <th className="admin-table-th">{TABLE_TEXT[3]}</th>
            <th className="admin-table-th">{TABLE_TEXT[4]}</th>
            <th className="admin-table-th">{TABLE_TEXT[5]}</th>
          </tr>
        </thead>
        <tbody>
          {result.items.map((item: AdminItemProps) => (
            <tr key={item.id}>
              <td className="admin-table-th">{item.id}</td>
              <td className="admin-table-th">{item.name}</td>
              <td className="admin-table-th">{item.created_at}</td>
              <td className="admin-table-th">{item.updated_at || 'N/A'}</td>
              <td className="admin-table-th">
                {clientStatusMapping[item.status]}
              </td>
              <td className="admin-table-th">
                {formatNumber(item.total_price)} 원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-12">
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[4]}</p>
          <Input
            name="startDate"
            className="admin-input"
            inputType="date"
            type="default"
            onChange={(e) => setStartDate(e.target.value)}
            textValue={startDate}
            placeholder={INPUT_TEXT[4]}
          />
        </div>

        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[5]}</p>
          <Input
            name="endDate"
            className="admin-input"
            inputType="date"
            type="default"
            onChange={(e) => setEndDate(e.target.value)}
            textValue={endDate}
            placeholder={INPUT_TEXT[5]}
          />
        </div>

        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[8]}</p>
          <Input
            name="query"
            className="admin-input"
            type="default"
            onChange={(e) => setQuery(e.target.value)}
            textValue={query}
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
