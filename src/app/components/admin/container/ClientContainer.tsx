'use client';

import { useState } from 'react';
import { OPTION_TEXT } from '@/app/constants/admin';
import ClientsName from '../clients/ClientsName';
import ClientsRegion from '../clients/ClientsRegion';
import EntireClients from '../clients/EntireClients';

export default function ClientContainer() {
  const [state, setState] = useState('clientsAll');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setState(value);
  };

  const renderComponent = () => {
    switch (state) {
      case 'clientsAll':
        return <EntireClients />;
      case 'clientsName':
        return <ClientsName />;
      case 'clientsRegion':
        return <ClientsRegion />;
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
          onChange={handleSelectChange}
          value={state}
        >
          <option value="clientsAll">{OPTION_TEXT[8]}</option>
          <option value="clientsName">{OPTION_TEXT[0]}</option>
          <option value="clientsRegion">{OPTION_TEXT[1]}</option>
        </select>
      </div>

      {renderComponent()}
    </div>
  );
}
