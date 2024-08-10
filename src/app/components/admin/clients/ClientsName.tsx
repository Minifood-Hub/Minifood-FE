'use client';

import {
  ALERT_TEXT,
  BTN_TEXT,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { useState } from 'react';
import { callGet } from '@/app/utils/callApi';

export default function ClientsName() {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ items: ClientsNameProps[] }>({
    items: [],
  });

  const handleGetQuotations = async () => {
    if (!name) {
      alert(ALERT_TEXT[0]);
      return;
    }

    try {
      const data = await callGet(`/api/admin/clients/name/${name}`);
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  };

  const renderTable = () => {
    return (
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-table-th">{TABLE_TEXT[0]}</th>
            <th className="admin-table-th">{TABLE_TEXT[1]}</th>
            <th className="admin-table-th">{TABLE_TEXT[6]}</th>
            <th className="admin-table-th">{TABLE_TEXT[7]}</th>
          </tr>
        </thead>
        <tbody>
          {result.items.map((item: ClientsNameProps) => (
            <tr key={item.id}>
              <td className="admin-table-th">{item.id}</td>
              <td className="admin-table-th">{item.name}</td>
              <td className="admin-table-th">{item.region}</td>
              <td className="admin-table-th">{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-12">
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[8]}</p>
          <Input
            name="page"
            className="admin-input"
            type="default"
            onChange={(e) => setName(e.target.value)}
            textValue={name}
            placeholder={INPUT_TEXT[8]}
          />
        </div>

        <Button
          className="admin-btn"
          buttonText={BTN_TEXT[0]}
          type="default"
          onClickHandler={handleGetQuotations}
        />
      </div>
      <div className="w-full">{renderTable()}</div>
    </div>
  );
}
