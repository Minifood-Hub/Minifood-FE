import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import EditQuoteContainer from '@/app/components/quotation/container/EditQuoteContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';

const QuotationEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <section className="bg-[#FAF7F7] w-full h-screen flex overflow-hidden">
      <SideNavBar selected={SIDENAV_TEXT[2]} />
      <div className="w-full overflow-auto">
        <EditQuoteContainer id={params.id} />
        <Footer />
      </div>
    </section>
  );
};

export default QuotationEditPage;
