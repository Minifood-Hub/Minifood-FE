'use client';

import {
  ACCOUNT_BTN_TEXT,
  ACCOUNT_GUIDE,
  ACCOUNT_TEXT,
} from '@/app/constants/account';
import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const AccountUpdate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const deleteAccount = () => {
    console.log('탈퇴 로직');
  };

  const editAccount = () => {
    console.log('수정 로직');
  };

  return (
    <div className="flex flex-col gap-y-8 items-center">
      <div className="gap-y-2">
        <p>{ACCOUNT_TEXT[1]}</p>
        <Input
          type="account"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ACCOUNT_TEXT[1]}
          isDisabled
        />
      </div>
      <div className="gap-y-2">
        <p>{ACCOUNT_TEXT[2]}</p>
        <Input
          type="account"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={ACCOUNT_GUIDE[0]}
        />
      </div>
      <div className="gap-y-2">
        <p>{ACCOUNT_TEXT[2]}</p>
        <Input
          type="account"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={ACCOUNT_GUIDE[0]}
        />
      </div>
      <div className="gap-y-2">
        <p>{ACCOUNT_TEXT[2]}</p>
        <Input
          type="account"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={ACCOUNT_GUIDE[0]}
        />
      </div>
      <div className="flex gap-x-6">
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
