'use client';

import { VIEW_PASTORDER_TABLE } from '@/app/constants/pastorder';
import { useUser } from '@/app/hooks/useUser';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';
import PastOrderTableInfo from './PastOrderTableInfo';

interface PastorderTableProps {
  customDate?: CustomDateTypes;
}

const PastorderTable = ({ customDate }: PastorderTableProps) => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(() => selected + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/order/${user?.result.client_id}/get-past-order`;
      const data = await callGet(url);
      setPastOrders(data.result);
    };
    fetchData();
  }, [user, page, customDate]);

  return (
    <div className="w-[full] h-[665px] flex flex-col items-center bg-white mt-4 relative">
      <div className="flex w-full items-center text-white text-base font-bold h-9 bg-[#55aa00]">
        <div className="w-[9.5%] text-center">{VIEW_PASTORDER_TABLE[0]}</div>
        <div className="w-[65.5%] pl-3 py-2">{VIEW_PASTORDER_TABLE[1]}</div>
      </div>
      <div className="flex flex-col w-full">
        {pastOrders?.map((pastorder, index) => {
          return (
            <PastOrderTableInfo
              pastorder={pastorder}
              index={index}
              key={pastorder.past_order_id}
            />
          );
        })}
      </div>
      <div className="absolute bottom-8">
        <Pagination totalPages={5} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default PastorderTable;
