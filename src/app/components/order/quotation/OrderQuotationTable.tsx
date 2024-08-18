import { MODAL_TEXT } from '@/app/constants/order';

export default function QuotationTable({ quotationInfo }: QuotationTableProps) {
  return (
    <div className="w-full">
      <div className="flex gap-x-3 text-xl font-semibold pb-1 pr-4 mt-[36px] whitespace-nowrap border-black border-b-[6px]">
        <div className="w-[7%] text-center">{MODAL_TEXT[10]}</div>
        <div className="w-[7%] text-center">{MODAL_TEXT[6]}</div>
        <div className="w-[66%] text-center text-ellipsis overflow-hidden">
          {MODAL_TEXT[1]}
        </div>
        <div className="w-[7%] text-center">{MODAL_TEXT[2]}</div>
        <div className="w-[13%] text-center">{MODAL_TEXT[5]}</div>
      </div>

      <div className="flex w-full h-[288px] flex-col gap-y-2 mt-2 overflow-y-scroll overflow-x-hidden border-b-[1px]">
        {quotationInfo.map((itemData: QuotationItemType, index: number) => {
          return (
            <div
              className="gap-x-3 h-9 justify-start items-center inline-flex border-gray-3 border-b-2"
              key={itemData.id}
            >
              <div className="w-[7%] text-center">{index + 1}</div>
              <div className="w-[7%] text-center">{itemData.category}</div>
              <div className="w-[66%] text-center text-ellipsis overflow-hidden">
                {itemData.name}
              </div>
              <div className="w-[7%] text-center">{itemData.count}</div>
              <div className="w-[13%] text-center text-ellipsis overflow-hidden">
                {itemData.unit}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
