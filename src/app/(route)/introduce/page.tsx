import Footer from '@/app/components/common/layout/Footer';
import Header from '@/app/components/common/layout/Header';
import IntroduceContainer from '@/app/components/introduce/IntroduceContainer';

export default function TOSPage() {
  return (
    <section>
      <div className="relative flex w-full min-h-screen flex-col items-center">
        <div className="w-full">
          <Header />
          <IntroduceContainer />
        </div>
        <Footer />
      </div>
    </section>
  );
}
