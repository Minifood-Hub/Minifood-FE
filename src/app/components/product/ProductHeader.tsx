'use client';

import { PRODUCT_HEADER } from '@/app/constants/product';
import { useState } from 'react';
import Icons from '../common/Icons';
import Input from '../common/Input';
import { SearchProductIcon } from '@/app/ui/iconPath';

const ProductHeader = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold ">{PRODUCT_HEADER[0]}</p>
        <div className="flex items-center relative">
          <Input
            textValue={searchText}
            type="searchProduct"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={PRODUCT_HEADER[1]}
          />
          <Icons name={SearchProductIcon} className="absolute right-6 top-3" />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
