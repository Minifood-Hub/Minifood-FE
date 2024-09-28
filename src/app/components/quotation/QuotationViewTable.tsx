'use client';

import { VIEW_QUOTATION_GRAPH } from '@/app/constants/quotation';
import { useUser } from '@/app/hooks/useUser';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';
import QuotationViewTableInfo from './QuotationViewTableInfo';

interface QuotationViewTableProps {
  viewType: CheckTypes;
  customDate?: CustomDateTypes;
}

const QuotationViewTable = ({
  viewType,
  customDate,
}: QuotationViewTableProps) => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [quotation, setQuotation] = useState<QuotationTableInfoTypes | null>(
    null,
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(() => selected + 1);
  };
  const completedQuotation = quotation?.items || [];

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.result?.client_id) {
        return;
      }
      const url = customDate
        ? `/api/quotation?id=${user.result.client_id}&date=${viewType}&page=${page}&start=${customDate.startDate}&end=${customDate.endDate}`
        : `/api/quotation?id=${user.result.client_id}&date=${viewType}&page=${page}`;
      const data = await callGet(url);

      setQuotation(data.result);
    };
    fetchData();
  }, [user, viewType, page, customDate]);

  return (
    <div className="w-[full] h-[665px] flex flex-col items-center bg-white mt-4 relative">
      <div className="flex w-full items-center text-white font-bold h-9 bg-primary-3">
        <div className="w-[9.6%] text-center">{VIEW_QUOTATION_GRAPH[0]}</div>
        <div className="w-[25.5%] text-center">{VIEW_QUOTATION_GRAPH[1]}</div>
        <div className="w-[25.5%] text-center">{VIEW_QUOTATION_GRAPH[2]}</div>
        <div className="w-[13.5%] text-center">{VIEW_QUOTATION_GRAPH[3]}</div>
      </div>
      <div className="flex flex-col w-full">
        {viewType === 'custom' && quotation === null ? (
          <div className="w-full h-full flex-center mt-[300px] text-3xl font-semibold">
            날짜를 선택해주세요 📆
          </div>
        ) : (
          completedQuotation.map((quoteView, index) => {
            return (
              <QuotationViewTableInfo
                quoteView={quoteView}
                index={index}
                key={quoteView.id}
              />
            );
          })
        )}
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
