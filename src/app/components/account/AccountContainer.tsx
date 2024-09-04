'use client';

import { ACCOUNT_GUIDE, ACCOUNT_TEXT } from '@/app/constants/account';
import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const AccountContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const confirmAccount = () => {
    console.log('확인 로직');
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      <p className="text-xl font-semibold mt-[50px]">{ACCOUNT_TEXT[0]}</p>
      <div className="gpa-y-2">
        <p>{ACCOUNT_TEXT[1]}</p>
        <Input
          type="account"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ACCOUNT_TEXT[1]}
          isDisabled
        />
      </div>
      <div className="gpa-y-2 mb-8">
        <p>{ACCOUNT_TEXT[2]}</p>
        <Input
          type="account"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={ACCOUNT_TEXT[3]}
        />
      </div>
      <Button
        buttonText={ACCOUNT_GUIDE[3]}
        type="accountConfirm"
        onClickHandler={confirmAccount}
      />
    </div>
  );
};

export default AccountContainer;
