import { PASTORDER_DETAIL } from '@/app/constants/pastorder';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';

interface PastOrderDetailProps {
  pastorderId: number;
}

const PastOrderDetail = ({ pastorderId }: PastOrderDetailProps) => {
  const [pastOrders, setPastOrders] = useState<PastOrderProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet(`/api/past-order/get/${pastorderId}`);
      setPastOrders(data.result.product_list);
    };
    fetchData();
  }, [pastorderId]);

  return (
    <div className="w-full flex flex-col text-[#333333] bg-[#FCFCFC]">
      <div className="flex h-[47px] items-center text-sm font-bold">
        <div className="w-[9.1%]  text-center">{PASTORDER_DETAIL[0]}</div>
        <div className="w-[18.6%]  pl-[14px]">{PASTORDER_DETAIL[1]}</div>
        <div className="w-[49.1%]  pl-[14px]">{PASTORDER_DETAIL[2]}</div>
        <div className="w-[11.4%] text-center">{PASTORDER_DETAIL[3]}</div>
        <div className="w-[11.4%] text-center">{PASTORDER_DETAIL[4]}</div>
      </div>
      {pastOrders.map((pastOrder, i) => (
        <div
          className="w-full flex h-[54px] items-center text-base font-normal"
          key={pastOrder.id}
        >
          <div className="w-[9.1%] text-center">{pastOrder.category}</div>
          <div className="w-[18.6%] pl-[14px]">{i + 1}</div>
          <div className="w-[49.1%] pl-[14px]">{pastOrder.name}</div>
          <div className="w-[11.4%] text-center">{pastOrder.unit}</div>
          <div className="w-[11.4%] text-center">1</div>
        </div>
      ))}
    </div>
  );
};

export default PastOrderDetail;
