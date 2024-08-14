'use client';

import { useState } from 'react';
import CheckQuotation from '../clients/CheckQuotation';
import DeleteClient from '../clients/DeleteClient';
import InquiryPastOrder from '../clients/InquiryPastOrder';
import InquiryQuotation from '../clients/InquiryQuotation';
import InquiryQuotationDate from '../clients/InquiryQuotationDate';
import SetComment from '../clients/SetComment';
import SetRegion from '../clients/SetRegion';
import Input from '../../common/Input';
import { INPUT_TEXT, OPTION_TEXT } from '@/app/constants/admin';
import ClientsName from '../clients/ClientsName';
import ClientsRegion from '../clients/ClientsRegion';

export default function ClientContainer() {
  const [state, setState] = useState({
    clientId: '',
    selectedOption: 'clientsName',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderComponent = () => {
    switch (state.selectedOption) {
      case 'clientsName':
        return <ClientsName />;
      case 'clientsRegion':
        return <ClientsRegion />;
      case 'inquiryQuotation':
        return <InquiryQuotation clientId={state.clientId} />;
      case 'inquiryQuotationDate':
        return <InquiryQuotationDate clientId={state.clientId} />;
      case 'inquiryPastOrder':
        return <InquiryPastOrder clientId={state.clientId} />;
      case 'checkQuotation':
        return <CheckQuotation clientId={state.clientId} />;
      case 'setRegion':
        return <SetRegion clientId={state.clientId} />;
      case 'setComment':
        return <SetComment clientId={state.clientId} />;
      case 'deleteClient':
        return <DeleteClient clientId={state.clientId} />;
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
          value={state.selectedOption}
        >
          <option value="clientsName">{OPTION_TEXT[0]}</option>
          <option value="clientsRegion">{OPTION_TEXT[8]}</option>
          <option value="inquiryQuotation">{OPTION_TEXT[1]}</option>
          <option value="inquiryQuotationDate">{OPTION_TEXT[2]}</option>
          <option value="inquiryPastOrder">{OPTION_TEXT[3]}</option>
          <option value="checkQuotation">{OPTION_TEXT[4]}</option>
          <option value="setRegion">{OPTION_TEXT[5]}</option>
          <option value="setComment">{OPTION_TEXT[6]}</option>
          <option value="deleteClient">{OPTION_TEXT[7]}</option>
        </select>

        {state.selectedOption !== 'clientsName' &&
          state.selectedOption !== 'clientsRegion' && (
            <div className="flex gap-4">
              <p className="whitespace-nowrap">{INPUT_TEXT[0]}</p>
              <Input
                name="clientId"
                className="admin-input"
                type="default"
                onChange={handleInputChange}
                textValue={state.clientId}
                placeholder={INPUT_TEXT[1]}
              />
            </div>
          )}
      </div>

      {renderComponent()}
    </div>
  );
}
