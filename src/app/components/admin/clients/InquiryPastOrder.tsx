import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Button from '../../common/Button';
import { ALERT_TEXT, BTN_TEXT, TABLE_TEXT } from '@/app/constants/admin';

export default function InquiryPastOrder({ clientId }: ClientIdProps) {
  const [result, setResult] = useState<{ result: AdminItemProps[] }>({
    result: [],
  });

  const handleGetPastOrders = async () => {
    if (!clientId) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      const data = await callGet(`/api/order/${clientId}/get-past-order`);
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ result: [] });
    }
  };

  const renderTable = () => {
    return (
      <table className="admin-table max-w-fit">
        <thead>
          <tr>
            <th className="admin-table-th">{TABLE_TEXT[0]}</th>
            <th className="admin-table-th">{TABLE_TEXT[1]}</th>
          </tr>
        </thead>
        <tbody>
          {result.result.map((item: AdminItemProps) => (
            <tr key={item.past_order_id}>
              <td className="admin-table-th">{item.past_order_id}</td>
              <td className="admin-table-th">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <Button
        className="admin-btn"
        buttonText={BTN_TEXT[0]}
        type="default"
        onClickHandler={handleGetPastOrders}
      />
      {renderTable()}
    </div>
  );
}
