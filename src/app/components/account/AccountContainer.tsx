import { ACCOUNT_TEXT } from '@/app/constants/account';
import AccountUpdate from './AccountUpdate';

const AccountContainer = () => {
  return (
    <div className="flex flex-col items-center gap-y-8">
      <p className="text-xl font-semibold mt-[50px]">{ACCOUNT_TEXT[0]}</p>
      {/* <AccountCertificate /> */}
      <AccountUpdate />
    </div>
  );
};

export default AccountContainer;
