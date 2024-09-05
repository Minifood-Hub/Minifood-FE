import AccountContainer from '@/app/components/account/AccountContainer';
import Header from '@/app/components/common/layout/Header';

const AccountPage = () => {
  return (
    <section>
      <div className="relative flex w-full min-h-screen flex-col items-center">
        <div className=" w-full shadow">
          <Header />
        </div>
        <AccountContainer />
      </div>
    </section>
  );
};

export default AccountPage;
