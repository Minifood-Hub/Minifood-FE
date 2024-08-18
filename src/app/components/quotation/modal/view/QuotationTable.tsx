import { MODAL_PRICE } from '@/app/constants/quotation';
import QuotationOrderTable from './QuotationOrderTable';
import QuoteBottom from './QuoteBottom';

interface QuotationTableProps {
  quotationInfo: QuotationInfoTypes;
}

const QuotationTable = ({ quotationInfo }: QuotationTableProps) => {
  return (
    <div className="flex w-full flex-col mt-5">
      <QuotationOrderTable quotationInfo={quotationInfo} />
      <div className="w-full flex flex-col py-4 items-end font-normal text-[#999] border-b-2 border-dashed border-gray-2">
        <div className="flex justify-between w-[360px]">
          <div>{MODAL_PRICE[0]}</div>
          <div className="text-black">{quotationInfo.total}원</div>
        </div>
        <div className="flex justify-between w-[360px]">
          <div>{MODAL_PRICE[1]}</div>
          <div className="text-black">0</div>
        </div>
        <div className="flex justify-between w-[360px]">
          <div>{MODAL_PRICE[2]}</div>
          <div className="text-black">5000원</div>
        </div>
        <div className="flex justify-between w-[360px] text-black font-bold">
          <div>{MODAL_PRICE[3]}</div>
          <div>{quotationInfo.total + 5000}원</div>
        </div>
      </div>
      <div className="w-full h-8 bg-white" />
      <QuoteBottom />
    </div>
  );
};

export default QuotationTable;
