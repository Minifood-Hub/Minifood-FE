'use client';

import { REORDER_TEXT } from '@/app/constants/main';
import { ReorderData } from '@/app/constants/test';
import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Button from '../../common/Button';

function Reorder() {
  const [recent, setRecent] = useState<RecentQuotationTypes | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet('/api/admin/notices/get');
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
          <div className="flex flex-col gap-y-4">
            {ReorderData.map((item, i) => (
              <div
                key={item.item}
                className="flex justify-between w-full py-4 px-6 h-[81px] bg-white items-center"
              >
                <div className="flex flex-col gap-y-1.5 text-base font-normal">
                  <p>{item.date}</p>
                  <p>{item.item}</p>
                </div>
                <Button
                  buttonText={REORDER_TEXT[2]}
                  type="reorder"
                  onClickHandler={() =>
                    console.log('다시 주문하러 이동하는 로직')
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reorder;
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
