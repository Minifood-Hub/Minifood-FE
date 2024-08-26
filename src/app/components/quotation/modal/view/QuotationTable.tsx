import { MODAL_INFO } from '@/app/constants/order';
import QuotationOrderTable from './QuotationOrderTable';
import QuoteBottom from './QuoteBottom';
import { formatPrice } from '@/app/utils/formatPrice';

interface QuotationTableProps {
  quotationInfo: QuotationInfoTypes;
  isAdmin?: boolean;
  isPdfGenerating?: boolean;
}

const QuotationTable = ({
  quotationInfo,
  isAdmin,
  isPdfGenerating,
}: QuotationTableProps) => {
  return (
    <div className="flex w-full flex-col mt-5">
      <QuotationOrderTable
        quotationInfo={quotationInfo}
        isPdfGenerating={isPdfGenerating}
      />
      {isAdmin && (
        <div className="w-full flex py-4 justify-end border-b-2 border-dashed border-gray-2">
          <div className="flex justify-between w-40 text-black font-bold">
            <div>{MODAL_INFO[6]}</div>
            <div>{formatPrice(quotationInfo.total)}원</div>
          </div>
        </div>
      )}

      <div className="w-full h-8 bg-white" />
      <QuoteBottom />
    </div>
  );
};

export default QuotationTable;
