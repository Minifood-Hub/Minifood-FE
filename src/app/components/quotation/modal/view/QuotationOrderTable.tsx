import { MODAL_TEXT } from '@/app/constants/order';
import { formatDate } from '@/app/utils/date';
import { formatPrice } from '@/app/utils/formatPrice';

interface QuotationOrderTableProps {
  quotationInfo: QuotationInfoTypes;
}

const QuotationOrderTable = ({ quotationInfo }: QuotationOrderTableProps) => {
  return (
    <div>
      <div className="flex justify-between py-3 border-black border-b-2 px-1">
        <div className="text-lg font-bold">{MODAL_TEXT[0]}</div>
        <div className="text-base font-normal">
          {formatDate(quotationInfo.created_at)}
        </div>
      </div>
      <div className="flex gap-x-1 text-base font-normal text-[#999] pl-1 mt-4">
        <div className="w-20">{MODAL_TEXT[1]}</div>
        <div className="w-60">{MODAL_TEXT[2]}</div>
        <div className="w-20">{MODAL_TEXT[3]}</div>
        <div className="w-[86px]">{MODAL_TEXT[4]}</div>
        <div className="w-20">{MODAL_TEXT[5]}</div>
        <div className="w-[86px]">{MODAL_TEXT[6]}</div>
      </div>
      <div className="flex flex-col w-full h-28 gap-y-2 mt-2 pb-4 text-base font-normal border-b-2 border-dashed border-gray-2 mb-6 overflow-y-auto">
        {quotationInfo.products.map((itemData, index) => {
          return (
            <div key={itemData.product}>
              <div className="flex pl-2 gap-x-1">
                <div className="w-20">{index}</div>
                <div className="w-60 flex-wrap">{itemData.product}</div>
                <div className="w-20">1kg</div>
                <div className="w-[86px]">3,000</div>
                <div className="w-20">{itemData.quantity}</div>
                <div className="w-[86px]">{formatPrice(itemData.price)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuotationOrderTable;
