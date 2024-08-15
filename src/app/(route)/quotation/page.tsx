import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import QuotationContainer from '@/app/components/quotation/container/QuotationContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';

export default function Quotation() {
  return (
    <section>
      <div className="bg-[#FAF7F7] w-full h-screen flex flex-col relative">
        <div className="w-full flex relative h-full">
          <SideNavBar selected={SIDENAV_TEXT[2]} />
          <div className="flex-center w-full">
            <QuotationContainer />
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}
