'use client';

import { VIEW_QUOTATION_GRAPH } from '@/app/constants/quotation';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';
import QuotationViewTableInfo from './QuotationViewTableInfo';
import { useUser } from '@/app/hooks/useUser';

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

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/quotation?id=${user?.result.client_id}&date=${viewType}`;
      const data = await callGet(url);
      setQuotation(data.result);
    };
    fetchData();
  }, [user, viewType]);

  return (
    <div className="w-full h-[710px] flex flex-col items-center">
      <div className="flex w-full items-center gap-x-20 text-xl font-bold h-10 mt-12 bg-[#F0F0F0] px-3">
        <div className="w-[93px] text-center">{VIEW_QUOTATION_GRAPH[0]}</div>
        <div className="w-[101px] text-center">{VIEW_QUOTATION_GRAPH[1]}</div>
        <div className="w-[222px] text-center">{VIEW_QUOTATION_GRAPH[2]}</div>
        <div className="w-[78px] text-center">{VIEW_QUOTATION_GRAPH[3]}</div>
      </div>
      <div className="w-full h-[0px] border-2 border-black" />
      <div className="flex flex-col w-full gap-y-1 mt-1">
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
      <div className="absolute bottom-[180px]">
        <Pagination
          totalPages={quotation?.total_pages || 5}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default QuotationViewTable;
