import Footer from '../components/common/layout/Footer';
import Header from '../components/common/layout/Header';
import MainContainer from '../components/main/container/MainContainer';

export default function MainPage() {
  return (
    <section>
      <div className="relative flex w-full min-h-screen flex-col items-center">
        <div className="mb-[200px] w-full">
          <Header />
          <MainContainer />
        </div>
        <Footer />
      </div>
    </section>
  );
}
