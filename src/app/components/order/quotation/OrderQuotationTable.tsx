import { MODAL_TEXT } from '@/app/constants/order';
import QuoteBottom from '../../quotation/modal/view/QuoteBottom';
import { useCurrentDate } from '@/app/hooks/useCurrentDate';

export default function QuotationTable({ quotationInfo }: QuotationTableProps) {
  const currentDate = useCurrentDate();
  return (
    <div className="flex flex-col items-center self-stretch">
      <div className="flex h-[50px] py-3 px-0 justify-between items-center self-stretch border-b-2 border-gray-6">
        <p className="text-lg font-bold">{MODAL_TEXT[0]}</p>
        <p className="text-base">{currentDate}</p>
      </div>
      <div className="flex py-4 px-0 flex-col gap-3 self-stretch border-b border-dashed border-gray-2 mb-8">
        <div className="flex gap-1 self-stretch text-gray-4">
          <p className="w-20">{MODAL_TEXT[1]}</p>
          <p className="w-[416px]">{MODAL_TEXT[2]}</p>
          <p className="w-20">{MODAL_TEXT[3]}</p>
          <p className="w-10">{MODAL_TEXT[5]}</p>
        </div>

        <div className="max-h-40 overflow-scroll overflow-x-hidden">
          {quotationInfo.map((itemData, index) => {
            return (
              <div key={itemData.id} className="flex gap-1 text-gray-7 pb-3">
                <p className="w-20 pl-2">{index}</p>
                <p className="w-[416px] break-words whitespace-normal">
                  {itemData.name}
                </p>
                <p className="w-20">{itemData.unit}</p>
                <p className="w-10">{itemData.count}</p>
              </div>
            );
          })}
        </div>
      </div>

      <QuoteBottom />
    </div>
  );
}
