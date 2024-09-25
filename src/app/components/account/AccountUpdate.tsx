'use client';

import {
  ACCOUNT_ALERT,
  ACCOUNT_BTN_TEXT,
  ACCOUNT_GUIDE,
  ACCOUNT_PASSWORD,
  ACCOUNT_TEXT,
} from '@/app/constants/account';
import { passwordRegex } from '@/app/constants/sign-in';
import { useUser } from '@/app/hooks/useUser';
import { RightArrowIcon } from '@/app/ui/iconPath';
import { callPut } from '@/app/utils/callApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../common/Button';
import ClientInfoModal from '../common/ClientInfoModal';
import Icons from '../common/Icons';
import Input from '../common/Input';

const AccountUpdate = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [checkPW, setCheckPW] = useState('');
  const [errorType, setErrorType] = useState('');
  const router = useRouter();
  const { user } = useUser();
  const pwBody = {
    current_password: currentPW,
    new_password: newPW,
  };

  const deleteAccount = () => {
    console.log('탈퇴 로직');
  };

  const changePassword = async () => {
    if (!passwordRegex.test(currentPW)) {
      setErrorType('INVALID');
    } else if (!passwordRegex.test(newPW)) {
      setErrorType('INVALID_NEW');
    } else if (newPW === checkPW) {
      const data = await callPut('/api/account/change', pwBody);
      if (data.code === '2007') {
        setErrorType('WRONG_NOW');
      } else if (data.code === '2008') {
        setErrorType('WRONG_NEW');
      } else {
        router.push('/');
      }
    } else if (newPW !== checkPW) {
      setErrorType('INCONSISTENCY');
    }
  };

  return (
    <div className="flex flex-col gap-y-8 items-center">
      <div className="flex flex-col gap-y-2">
        <p>{ACCOUNT_TEXT[1]}</p>
        <div className="w-[600px] h-[56px] border-[1px] border-gray-1 rounded-[4px] px-6 py-1 flex items-center">
          {user?.result?.email}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex">
          <p>{ACCOUNT_PASSWORD[0]}</p>
          <div className="text-red-2 text-base font-semibold">
            *
            {errorType === 'INVALID'
              ? ` ${ACCOUNT_ALERT[1]}`
              : errorType === 'WRONG_NOW'
                ? ` ${ACCOUNT_ALERT[2]}`
                : ''}
          </div>
        </div>
        <Input
          inputType="password"
          type="account"
          onChange={(e) => setCurrentPW(e.target.value)}
          placeholder={ACCOUNT_GUIDE[0]}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex">
          <p>{ACCOUNT_PASSWORD[1]}</p>
          <div className="text-red-2 text-base font-semibold">
            *
            {errorType === 'INVALID_NEW'
              ? ` ${ACCOUNT_ALERT[1]}`
              : errorType === 'WRONG_NEW'
                ? ` ${ACCOUNT_ALERT[3]}`
                : ''}
          </div>
        </div>
        <Input
          inputType="password"
          type="account"
          onChange={(e) => setNewPW(e.target.value)}
          placeholder={ACCOUNT_GUIDE[1]}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex">
          <p>{ACCOUNT_PASSWORD[2]}</p>
          <div className="text-red-2 text-base font-semibold">
            * {errorType === 'INCONSISTENCY' ? ` ${ACCOUNT_ALERT[0]}` : ''}
          </div>
        </div>
        <Input
          inputType="password"
          type="account"
          onChange={(e) => setCheckPW(e.target.value)}
          placeholder={ACCOUNT_GUIDE[2]}
        />
      </div>
      <div>
        <Link
          href="/sign-in/client/edit"
          className="flex w-full justify-between text-[#333333] text-base font-normal mb-2"
        >
          <p className="font-semibold">{ACCOUNT_PASSWORD[3]}</p>
          <div className="flex items-center">
            {ACCOUNT_PASSWORD[4]} <Icons name={RightArrowIcon} />
          </div>
        </Link>
        <ClientInfoModal
          name={user?.result?.client_name}
          region={user?.result?.client_region}
          address={user?.result?.client_address}
          isForAccount
        />
      </div>
      <div className="flex gap-x-6 mt-8 mb-12">
        <Button
          buttonText={ACCOUNT_BTN_TEXT[1]}
          type="accountUpdate"
          onClickHandler={deleteAccount}
          className="border border-gray-1"
        />
        <Button
          buttonText={ACCOUNT_BTN_TEXT[2]}
          type="accountUpdate"
          onClickHandler={changePassword}
          className="bg-primary-3 text-white"
        />
      </div>
    </div>
  );
};

export default AccountUpdate;
