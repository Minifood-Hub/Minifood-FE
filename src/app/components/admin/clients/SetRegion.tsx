import { callPatch } from '@/app/utils/callApi';
import { useState } from 'react';
import Button from '../../common/Button';
import { BTN_TEXT, ALERT_TEXT, REGION_TEXT } from '@/app/constants/admin';

export default function SetRegion({ clientId }: ClientIdProps) {
  const [region, setRegion] = useState('');

  const handleSetRegion = async () => {
    if (!clientId || !region) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callPatch(
        `/api/admin/clients/${clientId}/region`,
        `region=${region}`,
      );
      alert(ALERT_TEXT[1]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-4 border-2 p-8">
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
  );
}
