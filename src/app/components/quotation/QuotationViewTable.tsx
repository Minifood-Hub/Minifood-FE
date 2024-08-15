'use client';

import { VIEW_QUOTATION_GRAPH } from '@/app/constants/quotation';
import { useUser } from '@/app/hooks/useUser';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';
import QuotationViewTableInfo from './QuotationViewTableInfo';

interface QuotationViewTableProps {
  viewType: CheckTypes;
}

const QuotationViewTable = ({ viewType }: QuotationViewTableProps) => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [quotation, setQuotation] = useState<QuotationTableInfoTypes | null>(
    null,
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(() => selected + 1);
  };
  console.log(page, '와 가져온 데이터', quotation);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/quotation?id=${user?.result.client_id}&date=${viewType}&page=${page}`;
      const data = await callGet(url);
      setQuotation(data.result);
    };
    fetchData();
  }, [user, viewType, page]);

  return (
    <div className="w-[full] h-[665px] flex flex-col items-center bg-white mt-4 relative">
      <div className="flex w-full items-center text-white text-base font-bold h-9 bg-[#55aa00]">
        <div className="w-[10.4%] text-center">{VIEW_QUOTATION_GRAPH[0]}</div>
        <div className="w-[21.4%] text-center">{VIEW_QUOTATION_GRAPH[1]}</div>
        <div className="w-[21.4%] text-center">{VIEW_QUOTATION_GRAPH[2]}</div>
        <div className="w-[21.4%] text-center">{VIEW_QUOTATION_GRAPH[3]}</div>
      </div>
      <div className="flex flex-col w-full">
        {quotation?.items.map((quoteView, index) => {
          return (
            <QuotationViewTableInfo
              quoteView={quoteView}
              index={index}
              key={quoteView.id}
            />
          );
        })}
      </div>
      <div className="absolute bottom-8">
        <Pagination
          totalPages={quotation?.total_pages || 5}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default QuotationViewTable;
