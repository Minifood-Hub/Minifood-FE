import { MODAL_INFO, MODAL_TEXT } from '@/app/constants/order';
import QuoteBottom from '../../quotation/modal/view/QuoteBottom';
import { useDayOfWeek } from '@/app/hooks/useDayOfWeek';

export default function QuotationTable({
  quotationInfo,
  currentDate,
}: QuotationTableProps) {
  const totalCount = quotationInfo.reduce(
    (sum, itemData) => sum + Number(itemData.count),
    0,
  );
  const dayOfWeek = useDayOfWeek(currentDate);

  return (
    <div className="flex flex-col items-center self-stretch">
      <div className="flex h-[50px] py-3 px-0 justify-between items-center self-stretch border-b-2 border-gray-6">
        <p className="text-lg font-bold">{MODAL_TEXT[0]}</p>
        <p>
          {currentDate} ({dayOfWeek})
        </p>
      </div>
      <div className="flex py-4 px-0 flex-col gap-3 self-stretch border-b-2 border-dashed border-gray-2 mb-8">
        <div className="flex gap-1 self-stretch text-gray-4">
          <p className="w-20">{MODAL_TEXT[1]}</p>
          <p className="w-[416px]">{MODAL_TEXT[2]}</p>
          <p className="w-20">{MODAL_TEXT[3]}</p>
          <p className="w-10">{MODAL_TEXT[5]}</p>
        </div>

        <div className="max-h-32 overflow-scroll overflow-x-hidden">
          {quotationInfo.map((itemData, index) => {
            return (
              <div key={itemData.id} className="flex gap-1 text-gray-7 pb-3">
                <p className="w-20 pl-2">{index + 1}</p>
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
      <div className="w-full flex py-4 justify-end border-b-2 border-dashed border-gray-2 mb-8">
        <div className="flex justify-between w-40 text-black font-bold pr-6">
          <div>{MODAL_INFO[7]}</div>
          <div>{totalCount} 개</div>
        </div>
      </div>

      <QuoteBottom />
    </div>
  );
}
