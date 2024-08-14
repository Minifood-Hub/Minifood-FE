'use client';

import { useState } from 'react';
import Input from '../common/Input';
import { ORDER_TEXT } from '@/app/constants/order';

export default function ProductItem({
  category,
  id,
  name,
  count,
  isAdded,
  unit,
  onAddItem,
  onRemoveItem,
  onCountChange,
}: ProductItemProps) {
  const [inputState, setInputState] = useState({
    count: count || '1',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: any,
  ) => {
    let { value } = e.target;
    if (type === 'count') {
      const numericValue = parseInt(value, 10);
      if (Number.isNaN(numericValue) || numericValue <= 0) {
        value = '1'; // 0 이하의 값일 경우 1로 설정
      }
      onCountChange?.(id as string, value); // ?.를 써서 정의되지 않을 경우 호출 안하게(if문 사용 대신)
    }
    setInputState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleButtonClick = () => {
    if (isAdded) {
      onRemoveItem?.(id as string); // 함수가 정의 된 경우에만 호출
    } else {
      onAddItem?.({ category, id, name, count: inputState.count, unit });
    }
  };

  return (
    <div className="flex items-center self-stretch text-gray-7 border-b-[1px] border-gray-1 py-2">
      <div className="flex-center w-[89px] py-2 px-[14px] self-stretch text-ellipsis whitespace-nowrap">
        {category}
      </div>
      <div className="flex items-center w-[119px] py-2 px-[14px] self-stretch text-ellipsis whitespace-nowrap">
        {id}
      </div>
      <div className="flex items-center w-[416px] py-2 px-[14px] self-stretch overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </div>
      <div className="flex items-center w-[110px] py-2 px-[14px] justify-center self-stretch overflow-hidden text-ellipsis whitespace-nowrap">
        {unit}
      </div>
      <div className="flex items-center justify-between w-[110px] py-2 px-5 self-stretch">
        <button type="button" onClick={() => {}}>
          -
        </button>
        <Input
          className="min-w-fit w-full bg-white px-[14px] text-center"
          placeholder="1"
          textValue={inputState.count || '1'}
          type="count"
          inputType="text"
          onChange={(e) => handleInputChange(e, 'count')}
        />
        <button type="button" onClick={() => {}}>
          +
        </button>
      </div>
      <div className="w-[110px] items-center px-[14px] flex justify-center">
        <button
          type="button"
          className={`${isAdded ? 'bg-white text-gray-6 border-[1px] border-gray-1' : 'bg-primary-3 text-white border-[1px] border-primary-3'} py-2 px-[18px] rounded-[4px] `}
          onClick={handleButtonClick}
        >
          {isAdded ? ORDER_TEXT[5] : ORDER_TEXT[6]}
        </button>
      </div>
    </div>
  );
}
