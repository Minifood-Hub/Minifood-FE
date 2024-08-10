'use client';

import { OPTION_TEXT } from '@/app/constants/admin';
import { useState } from 'react';
import Extract from '../quotations/Extract';

export default function QuotationContainer() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedOption(value);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'info':
        return <div />;
      case 'extract':
        return <Extract />;
      case 'extractToday':
        return <div />;
      default:
        return null;
    }
  };
  return (
    <div className="p-8 border border-gray-2">
      <div className="flex items-center gap-4 h-16 border-2 px-4 mb-8">
        <p>{OPTION_TEXT[0]}</p>
        <select
          className="border-2"
          name="selectedOption"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="">{OPTION_TEXT[0]}</option>
          <option value="info">{OPTION_TEXT[13]}</option>
          <option value="extract">{OPTION_TEXT[14]}</option>
          <option value="extractToday">{OPTION_TEXT[15]}</option>
        </select>
      </div>

      {renderComponent()}
    </div>
  );
}
