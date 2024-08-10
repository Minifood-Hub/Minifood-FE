'use client';

import {
  ALERT_TEXT,
  BTN_TEXT,
  INPUT_TEXT,
  REGION_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import Button from '../../common/Button';
import { useState } from 'react';
import { callGet } from '@/app/utils/callApi';

export default function ClientsRegion() {
  const [region, setRegion] = useState('');
  const [result, setResult] = useState<{ items: ClientsNameProps[] }>({
    items: [],
  });

  const handleSetRegion = async () => {
    if (!region) {
      alert(ALERT_TEXT[4]);
      return;
    }
    try {
      const data = await callGet(
        `/api/admin/clients/region`,
        `region=${region}`,
      );
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
        <select
          className="border-2 px-2"
          name="region"
          onChange={(e) => setRegion(e.target.value)}
          value={region}
        >
          <option value="">{REGION_TEXT[0]}</option>
          <option value={REGION_TEXT[1]}>{REGION_TEXT[1]}</option>
          <option value={REGION_TEXT[2]}>{REGION_TEXT[2]}</option>
          <option value={REGION_TEXT[3]}>{REGION_TEXT[3]}</option>
          <option value={REGION_TEXT[4]}>{REGION_TEXT[4]}</option>
          <option value={REGION_TEXT[5]}>{REGION_TEXT[5]}</option>
        </select>

        <Button
          className="admin-btn"
          buttonText={BTN_TEXT[0]}
          type="default"
          onClickHandler={handleSetRegion}
        />
      </div>
      <div className="w-full">{renderTable()}</div>
    </div>
  );
}
