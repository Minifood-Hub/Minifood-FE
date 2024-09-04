'use client';

import {
  ACCOUNT_BTN_TEXT,
  ACCOUNT_GUIDE,
  ACCOUNT_PASSWORD,
  ACCOUNT_TEXT,
} from '@/app/constants/account';
import { useUser } from '@/app/hooks/useUser';
import { RightArrowIcon } from '@/app/ui/iconPath';
import { useState } from 'react';
import Button from '../common/Button';
import ClientInfoModal from '../common/ClientInfoModal';
import Icons from '../common/Icons';
import Input from '../common/Input';

const AccountUpdate = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [checkPW, setCheckPW] = useState('');

  const setPasswordFunctions = [setCurrentPW, setNewPW, setCheckPW];

  const { user } = useUser();

  const deleteAccount = () => {
    console.log('탈퇴 로직');
  };

  const editAccount = () => {
    console.log('수정 로직');
  };

  return (
    <div className="flex flex-col gap-y-8 items-center">
      <div className="flex flex-col gap-y-2">
        <p>{ACCOUNT_TEXT[1]}</p>
        <Input
          type="account"
          onChange={(e) => setCurrentPW(e.target.value)}
          placeholder={ACCOUNT_TEXT[1]}
          isDisabled
          textValue={user?.result?.email}
        />
      </div>
      {ACCOUNT_GUIDE.map((guide, i) => (
        <div key={i} className="flex flex-col gap-y-2">
          <div className="flex">
            <p>{ACCOUNT_PASSWORD[i]}</p>
            <div className="text-[#fc4c00] text-base font-semibold">*</div>
          </div>
          <Input
            type="account"
            onChange={(e) => setPasswordFunctions[i](e.target.value)}
            placeholder={guide}
          />
        </div>
      ))}
      <div className="flex w-full justify-between text-[#333333] text-base font-normal">
        <p className="font-semibold">{ACCOUNT_PASSWORD[3]}</p>
        <div className="flex items-center">
          {ACCOUNT_PASSWORD[4]} <Icons name={RightArrowIcon} />
        </div>
      </div>
      <ClientInfoModal
        name={user?.result?.client_name}
        region={user?.result?.client_region}
        isForAccount
      />
      <div className="flex gap-x-6 mt-8 mb-12">
        <Button
          buttonText={ACCOUNT_BTN_TEXT[1]}
          type="accountUpdate"
          onClickHandler={deleteAccount}
          className="border border-[#e0e0e0]"
        />
        <Button
          buttonText={ACCOUNT_BTN_TEXT[2]}
          type="accountUpdate"
          onClickHandler={editAccount}
          className="bg-[#55aa00] text-white"
        />
      </div>
    </div>
  );
};

export default AccountUpdate;
