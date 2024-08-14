import { MODAL_TEXT } from '@/app/constants/order';
import { formatDate } from '@/app/utils/date';
import { formatPrice } from '@/app/utils/formatPrice';

interface QuotationTableProps {
  quotationInfo: QuotationInfoTypes;
}

const QuotationTable = ({ quotationInfo }: QuotationTableProps) => {
  return (
    <div className="w-[600px] h-[410px]">
      <div className="flex gap-x-3 text-xl font-semibold h-8 pl-10 mt-[52px]">
        <div className="w-40 text-center">{MODAL_TEXT[0]}</div>
        <div className="w-28 text-center">{MODAL_TEXT[1]}</div>
        <div className="w-[130px] text-center">{MODAL_TEXT[2]}</div>
        <div className="w-[90px] text-center">{MODAL_TEXT[3]}</div>
      </div>
      <div className="w-[602px] h-[0px] border-2 border-black" />
      <div className="flex flex-col w-[612px] h-[360px] gap-y-2 mt-2">
        {quotationInfo.products.map((itemData, index) => {
          return (
            <div key={itemData.product}>
              <div className="w-[598px] h-10 pl-2 justify-start items-center gap-x-[22px] inline-flex mb-1">
                <div className="w-[30px] text-center font-bold">{index}</div>
                <div className="w-[118px] text-center">
                  {formatDate(itemData.created_at)}
                </div>
                <div className="w-[137px] text-center text-sm">
                  {itemData.product}
                </div>
                <div className="w-[82px] text-center">{itemData.quantity}</div>
                <div className="w-[117px] text-center">
                  {formatPrice(itemData.price)}
                </div>
              </div>
              <div className="w-[612px] h-[0px] border border-black" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuotationTable;
