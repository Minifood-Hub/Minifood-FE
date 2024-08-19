import { MODAL_TEXT } from '@/app/constants/order';
import { formatPrice } from '@/app/utils/formatPrice';
import QuoteBottom from '../../quotation/modal/view/QuoteBottom';
import { useCurrentDate } from '@/app/hooks/useCurrentDate';

export default function QuotationTable({
  quotationInfo,
  total,
}: QuotationTableProps) {
  const currentDate = useCurrentDate();
  return (
    <div className="flex flex-col items-center self-stretch">
      <div className="flex h-[50px] py-3 px-0 justify-between items-center self-stretch border-b-2 border-gray-6">
        <p className="text-lg font-bold">{MODAL_TEXT[0]}</p>
        <p className="text-base">{currentDate}</p>
      </div>
      <div className="flex py-4 px-0 flex-col items-end gap-3 self-stretch border-b border-dashed border-gray-2 mb-8">
        <div className="flex-center gap-1 self-stretch text-gray-4">
          <p className="w-20">{MODAL_TEXT[1]}</p>
          <p className="w-60">{MODAL_TEXT[2]}</p>
          <p className="w-20">{MODAL_TEXT[3]}</p>
          <p className="w-[86px]">{MODAL_TEXT[4]}</p>
          <p className="w-20">{MODAL_TEXT[5]}</p>
          <p className="w-[86px]">{MODAL_TEXT[6]}</p>
        </div>

        <div className="max-h-40 overflow-scroll overflow-x-hidden">
          {quotationInfo.map((itemData, index) => {
            return (
              <div
                key={itemData.id}
                className="flex w-full items-center gap-1 self-stretch text-gray-7 pb-3"
              >
                <p className="w-[72px]">{index}</p>
                <p className="w-60 break-words whitespace-normal">
                  {itemData.name}
                </p>
                <p className="w-[88px]">{itemData.unit}</p>
                <p className="w-20">
                  {itemData.price && formatPrice(itemData.price)}
                </p>
                <p className="w-20">{itemData.count}</p>
                <p className="w-16">
                  {itemData.price && formatPrice(itemData.price)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col py-4 justify-center items-end gap-[10px] self-stretch text-[#999] border-b border-dashed border-gray-2 mb-8">
        <div className="flex w-[360px] flex-col items-start gap-3 text-center">
          <div className="flex justify-between items-center self-stretch">
            <p className="text-gray-3">과세금액</p>
            <p className="text-gray-7">135,000원</p>
          </div>
          <div className="flex justify-between items-center self-stretch">
            <p className="text-gray-3">비과세금액</p>
            <p className="text-gray-7">0원</p>
          </div>
          <div className="flex justify-between items-center self-stretch">
            <p className="text-gray-3">부가세</p>
            <p className="text-gray-7 ">15,000원</p>
          </div>
          <div className="flex justify-between items-center self-stretch font-bold text-gray-7 text-center">
            <p>총액</p>
            <p>{formatPrice(total)}원</p>
          </div>
        </div>
      </div>
      <QuoteBottom />
    </div>
  );
}
