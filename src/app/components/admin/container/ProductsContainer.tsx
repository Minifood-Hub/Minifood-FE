'use client';

import { OPTION_TEXT } from '@/app/constants/admin';
import { useState } from 'react';
import ProdcutsCategory from '../products/ProductsCategory';
import ProductsUpload from '../products/ProductsUpload';
import ProductsUpdate from '../products/ProductsUpdate';
import ProductsCreate from '../products/ProductsCreate';
import ProductsDelete from '../products/ProductsDelete';
import ProductsVegetable from '../products/ProductsVegetable';
import ProductsVegetableFile from '../products/ProductsVegetableFile';

export default function ProductsContainer() {
  const [selectedOption, setSelectedOption] = useState('productsUpload');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedOption(value);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'productsUpload':
        return <ProductsUpload />;
      case 'productsCategory':
        return <ProdcutsCategory />;
      case 'productsUpdate':
        return <ProductsUpdate />;
      case 'productsCreate':
        return <ProductsCreate />;
      case 'productsDelete':
        return <ProductsDelete />;
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
        <p>{OPTION_TEXT[9]}</p>
        <select
          className="border-2"
          name="selectedOption"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="productsUpload">{OPTION_TEXT[10]}</option>
          <option value="productsCategory">{OPTION_TEXT[11]}</option>
          <option value="productsUpdate">{OPTION_TEXT[12]}</option>
          <option value="productsCreate">{OPTION_TEXT[13]}</option>
          <option value="productsDelete">{OPTION_TEXT[14]}</option>
          <option value="productsVegetable">{OPTION_TEXT[15]}</option>
          <option value="productsVegetableFile">{OPTION_TEXT[16]}</option>
        </select>
      </div>

      {renderComponent()}
    </div>
  );
}
