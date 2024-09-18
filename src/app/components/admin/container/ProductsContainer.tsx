'use client';

import { OPTION_TEXT } from '@/app/constants/admin';
import { useState } from 'react';
import ProdcutsCategory from '../products/ProductsCategory';
import ProductsUpload from '../products/ProductsUpload';
import ProductsCreate from '../products/ProductsCreate';
import ProductsVegetable from '../products/ProductsVegetable';
import ProductsVegetableFile from '../products/ProductsVegetableFile';

export default function ProductsContainer() {
  const [selectedOption, setSelectedOption] = useState('productsCategory');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedOption(value);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'productsCategory':
        return <ProdcutsCategory />;
      case 'productsUpload':
        return <ProductsUpload />;
      case 'productsCreate':
        return <ProductsCreate />;
      case 'productsVegetable':
        return <ProductsVegetable />;
      case 'productsVegetableFile':
        return <ProductsVegetableFile />;
      default:
        return null;
    }
  };
  return (
    <div className="p-8 border border-gray-2">
      <div className="flex items-center gap-4 h-16 border-2 px-4 mb-8">
        <p>{OPTION_TEXT[2]}</p>
        <select
          className="border-2"
          name="selectedOption"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="productsCategory">{OPTION_TEXT[4]}</option>
          <option value="productsUpload">{OPTION_TEXT[3]}</option>
          <option value="productsCreate">{OPTION_TEXT[5]}</option>
          <option value="productsVegetable">{OPTION_TEXT[6]}</option>
          <option value="productsVegetableFile">{OPTION_TEXT[7]}</option>
        </select>
      </div>

      {renderComponent()}
    </div>
  );
}
