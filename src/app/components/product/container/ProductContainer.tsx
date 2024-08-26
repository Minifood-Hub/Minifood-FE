'use client';

import { PRODUCT_CATEGORY } from '@/app/constants/product';
import { useState } from 'react';
import ProductHeader from '../ProductHeader';
import ProductsTable from '../ProductsTable';

const ProductContainer = () => {
  const [productType, setProductType] = useState<ProductTypes>('전체');
  const isSelected = (type: ProductTypes) => {
    return productType === type && 'text-[#5A0]';
  };
  console.log(isSelected, productType);

  return (
    <div className="w-full flex justify-center pt-[100px]">
      <div className="w-[77%] flex flex-col gap-y-8">
        <ProductHeader />
        <div className="flex w-full border border-[#E0E0E0] rounded-[4px] flex-wrap gap-x-[18px] py-8 gap-y-8 font-normal text-xl">
          {PRODUCT_CATEGORY.map((type: ProductTypes, i) => (
            <div
              className={`w-[234px] h-6 flex-center ${isSelected(type)} cursor-pointer`}
              key={type}
              onClick={() => setProductType(type)}
            >
              {type}
            </div>
          ))}
        </div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default ProductContainer;
