import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import {
  clientStatusMapping,
  BTN_TEXT,
  INPUT_TEXT,
  TABLE_TEXT,
  ALERT_TEXT,
} from '@/app/constants/admin';
import { formatPrice } from '@/app/utils/formatPrice';
import { formatDate } from '@/app/utils/date';

export default function InquiryQuotationDate({ clientId }: ClientIdProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(formatDate(new Date().toISOString()));
  const [page, setPage] = useState('1');
  const [pageSize, setPageSize] = useState('10');
  const [result, setResult] = useState<{ result: { items: AdminItemProps[] } }>(
    { result: { items: [] } },
  );

  const handleGetQuotationsByDate = async () => {
    if (!clientId || !startDate || !endDate || !page || !pageSize) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      const data = await callGet(
        `/api/admin/clients/${clientId}/quotations/date`,
        `date_range_type=custom&start_date=${startDate}&end_date=${endDate}&page=${page}&page_size=${pageSize}`,
      );
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ result: { items: [] } });
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
          {result.result.items.map((item: AdminItemProps) => (
            <tr key={item.id}>
              <td className="admin-table-th">{item.id}</td>
              <td className="admin-table-th">{item.name}</td>
              <td className="admin-table-th">{item.created_at}</td>
              <td className="admin-table-th">{item.updated_at || 'N/A'}</td>
              <td className="admin-table-th">
                {clientStatusMapping[item.status]}
              </td>
              <td className="admin-table-th">
                {formatPrice(item.total_price)} 원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-8">
        <div className="flex gap-2 items-center">
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
          <p className="whitespace-nowrap">{INPUT_TEXT[2]}</p>
          <Input
            name="page"
            className="admin-input"
            type="default"
            onChange={(e) => setPage(e.target.value)}
            textValue={page}
            placeholder={INPUT_TEXT[2]}
          />
        </div>

        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[3]}</p>
          <Input
            name="pageSize"
            className="admin-input"
            type="default"
            onChange={(e) => setPageSize(e.target.value)}
            textValue={pageSize}
            placeholder={INPUT_TEXT[3]}
          />
        </div>

        <Button
          className="admin-btn"
          buttonText={BTN_TEXT[0]}
          type="default"
          onClickHandler={handleGetQuotationsByDate}
        />
      </div>
      {renderTable()}
    </div>
  );
}
