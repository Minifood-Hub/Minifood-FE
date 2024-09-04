import {
  ACCOUNT_BTN_TEXT,
  ACCOUNT_GUIDE,
  ACCOUNT_TEXT,
} from '@/app/constants/account';
import { useUser } from '@/app/hooks/useUser';
import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

interface AccountCertificateProps {
  certifyHandler: () => void;
}

const AccountCertificate = ({ certifyHandler }: AccountCertificateProps) => {
  const [password, setPassword] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);

  const { user } = useUser();

  const confirmAccount = async () => {
    const data = await callGet(`/api/account/password?password=${password}`);
    if (data.result === true) {
      certifyHandler();
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <p>{ACCOUNT_TEXT[1]}</p>
        <Input
          type="account"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={ACCOUNT_TEXT[1]}
          isDisabled
          textValue={user?.result?.email}
        />
      </div>
      <div className="flex flex-col gap-y-2 mb-8">
        <div className="flex">
          <p>{ACCOUNT_TEXT[2]}</p>
          <div className="text-[#fc4c00] text-base font-semibold">
            {isCorrect ? '*' : '* 비밀번호가 일치하지 않습니다'}
          </div>
        </div>
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
