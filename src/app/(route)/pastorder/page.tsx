import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import PastorderContainer from '@/app/components/pastorder/container/PastorderContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';

export default function Quotation() {
  return (
    <section className="bg-[#FAF7F7] w-full h-screen flex">
      <SideNavBar selected={SIDENAV_TEXT[1]} />
      <div className="w-full overflow-auto">
        <PastorderContainer />
        <Footer />
      </div>
    </section>
  );
}
