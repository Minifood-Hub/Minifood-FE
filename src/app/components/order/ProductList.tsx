import React from 'react';
import ProductItem from './ProductItem';
import {
  PRODUCT_TEXT,
  ORDER_TEXT,
  categoryMapping,
} from '../../constants/order';

export default function ProductList({
  items,
  isSearchResult,
  addedItems,
  onAddItem,
  onRemoveItem,
  onCountChange,
}: ProductListProps) {
  return (
    <div className="flex flex-col h-[350px] items-start self-stretch border-[1px] border-gray-1 bg-white">
      {isSearchResult ? (
        <div className="flex items-center self-stretch whitespace-nowrap bg-primary-3 text-white">
          <div className="flex w-[7%] py-2 px-3 justify-center items-end gap-[10px] font-bold">
            {PRODUCT_TEXT[0]}
          </div>
          <div className="flex w-[7%] py-2 px-3 justify-center items-end gap-[10px] font-bold">
            {PRODUCT_TEXT[1]}
          </div>
          <div className="flex w-[49%] py-2 px-3 justify-start items-end gap-[10px] font-bold">
            {PRODUCT_TEXT[2]}
          </div>
          <div className="flex w-[10%] py-2 px-3 justify-center items-end gap-[10px] font-bold">
            {PRODUCT_TEXT[3]}
          </div>
          <div className="flex w-[19%] py-2 px-3 justify-center items-end gap-[10px] font-bold">
            {PRODUCT_TEXT[4]}
          </div>
          <div className="flex w-[8%] py-2 px-3 justify-center items-end gap-[10px] font-bold">
            {PRODUCT_TEXT[5]}
          </div>
        </div>
      ) : (
        <div className="flex text-white font-black px-4 py-1">
          {ORDER_TEXT[3]}
        </div>
      )}

      <div className="flex flex-col py-2 px-[14px] gap-[10px] h-full self-stretch whitespace-nowrap overflow-scroll">
        {items.map((item) => (
          <ProductItem
            key={item.id}
            category={
              isSearchResult ? categoryMapping[item.category] : item.category
            }
            id={item.id}
            name={item.name}
            isAdded={
              isSearchResult
                ? !!addedItems?.find((addedItem) => addedItem.id === item.id)
                : true
            }
            unit={item.unit}
            count={!isSearchResult ? item.count || '1' : undefined}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onCountChange={onCountChange}
          />
        ))}
      </div>
    </div>
  );
}
