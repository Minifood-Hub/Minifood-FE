import Header from '@/app/components/common/layout/Header';
import FrequentFAQContainer from '@/app/components/faq/container/FrequentFAQContainer';

export default function FAQ() {
  return (
    <section>
      <div className="shadow-lg">
        <Header />
      </div>
      <FrequentFAQContainer />
    </section>
  );
}
