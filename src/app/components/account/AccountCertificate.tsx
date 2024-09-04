import {
  ACCOUNT_BTN_TEXT,
  ACCOUNT_GUIDE,
  ACCOUNT_TEXT,
} from '@/app/constants/account';
import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const AccountCertificate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const confirmAccount = () => {
    console.log('확인 로직');
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="gap-y-2">
        <p>{ACCOUNT_TEXT[1]}</p>
        <Input
          type="account"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ACCOUNT_TEXT[1]}
          isDisabled
        />
      </div>
      <div className="gap-y-2 mb-8">
        <p>{ACCOUNT_TEXT[2]}</p>
        <Input
          type="account"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={ACCOUNT_GUIDE[0]}
        />
      </div>
      <Button
        buttonText={ACCOUNT_BTN_TEXT[0]}
        type="accountConfirm"
        onClickHandler={confirmAccount}
      />
    </div>
  );
};

export default AccountCertificate;
