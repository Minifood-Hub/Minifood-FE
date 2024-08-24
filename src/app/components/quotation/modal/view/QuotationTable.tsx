import { MODAL_INFO } from '@/app/constants/order';
import QuotationOrderTable from './QuotationOrderTable';
import QuoteBottom from './QuoteBottom';

interface QuotationTableProps {
  quotationInfo: QuotationInfoTypes;
}

const QuotationTable = ({ quotationInfo }: QuotationTableProps) => {
  return (
    <div className="flex w-full flex-col mt-5">
      <QuotationOrderTable quotationInfo={quotationInfo} />
      <div className="w-full flex py-4 justify-end border-b-2 border-dashed border-gray-2">
        <div className="flex justify-between w-40 text-black font-bold">
          <div>{MODAL_INFO[6]}</div>
          <div>{quotationInfo.total}개</div>
        </div>
      </div>
      <div className="w-full h-8 bg-white" />
      <QuoteBottom />
    </div>
  );
};

export default QuotationTable;
