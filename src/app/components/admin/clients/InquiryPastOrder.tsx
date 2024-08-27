import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';

export default function InquiryPastOrder({ clientId }: ClientIdProps) {
  const [result, setResult] = useState<{ result: AdminItemProps[] }>({
    result: [],
  });

  const handleGetPastOrders = async () => {
    try {
      const data = await callGet(`/api/order/${clientId}/get-past-order`);
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ result: [] });
    }
  };

  useEffect(() => {
    handleGetPastOrders();
  }, [clientId]);

  const renderTable = () => {
    return (
      <div className="w-1/2 mx-auto border-2">
        <div className="flex bg-primary-1 w-full p-2 text-white font-bold">
          <div className="w-[30%]">번호</div>
          <div className="w-[70%]">이름</div>
        </div>
        {result.result.map((item: AdminItemProps) => (
          <div
            className="flex p-2 border-b-2 last:border-none"
            key={item.past_order_id}
          >
            <div className="w-[30%] border-r-2 last:border-none">
              {item.past_order_id}
            </div>
            <div className="w-[70%]">{item.name}</div>
          </div>
        ))}
      </div>
    );
  };

  return <div className="p-8">{renderTable()}</div>;
}
