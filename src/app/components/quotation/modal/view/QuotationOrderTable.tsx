import { MODAL_TEXT } from '@/app/constants/order';
import { useDayOfWeek } from '@/app/hooks/useDayOfWeek';
import { formatDate } from '@/app/utils/date';

interface QuotationOrderTableProps {
  quotationInfo: QuotationInfoTypes;
  isPdfGenerating?: boolean;
}

const QuotationOrderTable = ({
  quotationInfo,
  isPdfGenerating,
}: QuotationOrderTableProps) => {
  const dayOfWeek = useDayOfWeek(quotationInfo.created_at);
  return (
    <div>
      <div className="flex justify-between py-3 border-black border-b-2 px-1">
        <div className="text-lg font-bold">{MODAL_TEXT[0]}</div>
        <div className="text-base font-normal">
          {formatDate(quotationInfo.created_at)} ({dayOfWeek})
        </div>
      </div>
      <div className="flex gap-x-1 text-base font-normal text-[#999] mt-4">
        <div className="w-20">{MODAL_TEXT[1]}</div>
        <div className="w-[420px]">{MODAL_TEXT[2]}</div>
        <div className="w-16">{MODAL_TEXT[3]}</div>
        <div className="w-16 text-center">{MODAL_TEXT[5]}</div>
      </div>
      <div
        className={`flex flex-col w-full gap-y-2 mt-2 pb-4 text-base font-normal border-b-2 border-dashed border-gray-2 mb-6 ${
          isPdfGenerating ? 'h-auto' : 'h-36 overflow-y-auto'
        }`}
      >
        {quotationInfo.products.map((itemData, index) => {
          return (
            <div key={itemData.product}>
              <div className="flex pl-1 gap-x-1 py-[1px]">
                <div className="w-20">{index + 1}</div>
                <div className="w-[420px] flex-wrap">{itemData.product}</div>
                <div className="w-20">{itemData.unit}</div>
                <div className="w-20 text-center">{itemData.quantity}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuotationOrderTable;
