import Footer from '@/app/components/common/layout/Footer';
import Header from '@/app/components/common/layout/Header';
import PersonalContainer from '@/app/components/personal/PersonalContainer';

const PersonalInfoPage = () => {
  return (
    <section>
      <div className="relative flex w-full min-h-screen flex-col items-center">
        <div className="w-full">
          <Header />
          <PersonalContainer />
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default PersonalInfoPage;
