'use client';

import { ACCOUNT_TEXT } from '@/app/constants/account';
import { useState } from 'react';
import AccountCertificate from './AccountCertificate';
import AccountUpdate from './AccountUpdate';

const AccountContainer = () => {
  const [certificated, setCertificated] = useState(false);

  const certifyHandler = () => {
    setCertificated(true);
  };
  return (
    <div className="flex flex-col items-center gap-y-8">
      <p className="text-xl font-semibold mt-[50px]">{ACCOUNT_TEXT[0]}</p>
      {certificated ? (
        <AccountUpdate />
      ) : (
        <AccountCertificate certifyHandler={certifyHandler} />
      )}
    </div>
  );
};

export default AccountContainer;
