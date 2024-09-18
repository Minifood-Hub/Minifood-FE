import { MODAL_INFO } from '@/app/constants/order';
import { formatPrice } from '@/app/utils/formatPrice';
import QuotationOrderTable from './QuotationOrderTable';
import QuoteBottom from './QuoteBottom';

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
  let total = 0;
  quotationInfo.products.forEach((product) => {
    total += product.quantity;
  });
  return (
    <div className="flex w-full flex-col mt-5">
      <QuotationOrderTable
        quotationInfo={quotationInfo}
        isPdfGenerating={isPdfGenerating}
      />

      <div className="w-full flex py-4 justify-end border-b-2 border-dashed border-gray-2">
        <div className="flex justify-between gap-3 w-40 text-black font-bold pr-6 whitespace-nowrap">
          {isAdmin ? (
            <>
              <div>{MODAL_INFO[6]}</div>
              <div>{formatPrice(quotationInfo.total)}원</div>
            </>
          ) : (
            <>
              <div>{MODAL_INFO[7]}</div>
              <div>{total} 개</div>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-8 bg-white" />
      <QuoteBottom />
    </div>
  );
};

export default QuotationTable;
