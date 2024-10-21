import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import QuotationContainer from '@/app/components/quotation/container/QuotationContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';

export default function Quotation() {
  return (
    <section className="bg-[#FAF7F7] w-full h-screen flex overflow-hidden">
      <SideNavBar selected={SIDENAV_TEXT[2]} />
      <div className="w-full overflow-auto">
        <QuotationContainer />
        <Footer />
      </div>
    </section>
  );
}
