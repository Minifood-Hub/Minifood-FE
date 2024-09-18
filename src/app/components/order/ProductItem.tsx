'use client';

import React, { useEffect, useState } from 'react';
import Input from '../common/Input';
import { ORDER_TEXT } from '@/app/constants/order';

export default function ProductItem({
  category,
  id,
  name,
  count,
  isAdded,
  unit,
  isSearchResult,
  onAddItem,
  onRemoveItem,
  onCountChange,
  isNew,
}: ProductItemProps) {
  const [inputState, setInputState] = useState({
    count: count?.toString() || '1',
  });

  useEffect(() => {
    setInputState((prev) => ({ ...prev, count: count?.toString() || '1' }));
  }, [count]);

  const updateCount = (newCount: string) => {
    setInputState((prev) => ({ ...prev, count: newCount }));
    onCountChange?.(id as string, newCount);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'count',
  ) => {
    let { value } = e.target;
    if (type === 'count') {
      const numericValue = parseInt(value, 10);
      if (Number.isNaN(numericValue) || numericValue <= 0) {
        value = '1';
      }
      updateCount(value);
    }
  };

  const handleButtonClick = () => {
    try {
      if (isAdded) {
        onRemoveItem?.(id as string);
      } else {
        onAddItem?.({ category, id, name, count: inputState.count, unit });
      }
    } catch (error) {
      console.error('아이템 추가 에러:', error);
    }
  };

  const handleDecrement = () => {
    if (!isSearchResult) return;
    const currentCount = parseInt(inputState.count, 10);
    if (currentCount > 1) {
      updateCount((currentCount - 1).toString());
    }
  };

  const handleIncrement = () => {
    if (!isSearchResult) return;
    const currentCount = parseInt(inputState.count, 10);
    updateCount((currentCount + 1).toString());
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
        {isSearchResult && !isNew ? (
          <>
            <button type="button" onClick={handleDecrement}>
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
            <button type="button" onClick={handleIncrement}>
              +
            </button>
          </>
        ) : (
          <span className="text-center w-full">{inputState.count}</span>
        )}
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
