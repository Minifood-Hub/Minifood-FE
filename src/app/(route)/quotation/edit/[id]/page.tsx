import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import EditQuoteContainer from '@/app/components/quotation/container/EditQuoteContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';

const QuotationEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <section>
      <div className="bg-gray-0 min-w-full h-screen flex flex-col relative">
        <div className="w-full flex relative h-full">
          <SideNavBar selected={SIDENAV_TEXT[2]} />
          <div className="flex flex-col items-center w-full">
            <EditQuoteContainer id={params.id} />
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotationEditPage;
