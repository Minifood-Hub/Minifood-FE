'use client';

import { REORDER_TEXT } from '@/app/constants/main';
import { callGet } from '@/app/utils/callApi';
import { shortenText } from '@/app/utils/shortenText';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ReorderProps {
  client_id: number;
}

export default function Reorder({ client_id }: ReorderProps) {
  const [recent, setRecent] = useState<RecentQuotationTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet(
        `/api/quotation/recent?client_id=${client_id}`,
      );
      setRecent(data.result);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-[421px] flex flex-col items-center py-6 bg-[#f7f7f7]">
      <div className="w-[1050px] flex flex-col">
        <div className="text-xl font-semibold">{REORDER_TEXT[0]}</div>
        <div className="text-base font-normal">{REORDER_TEXT[1]}</div>
        <div className="flex flex-col gap-y-2 mb-[18px] mt-6">
          <div className="flex flex-col gap-y-2 items-center justify-center">
            {recent?.length === 0 ? (
              <div className="text-3xl font-semibold pt-20">
                {REORDER_TEXT[3]}
              </div>
            ) : (
              recent?.map((quotations, i) => (
                <div
                  key={quotations.date}
                  className="flex justify-between w-full py-4 px-6 h-[81px] bg-white items-center"
                >
                  <div className="flex flex-col gap-y-1.5 text-base font-normal">
                    <p>{quotations.date}</p>
                    <p>{shortenText(quotations.products.join(','), 45)}</p>
                  </div>
                  <Link
                    className="w-[111px] h-[39px] bg-[#55aa00] rounded text-white text-base font-normal flex-center"
                    href="/order"
                  >
                    {REORDER_TEXT[2]}
                  </Link>
                </div>
              ))
            )}
            <Link
              className="flex w-full justify-end text-sm cursor-pointer"
              href="/order"
            >
              {REORDER_TEXT[4]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
