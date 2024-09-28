import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import PastorderContainer from '@/app/components/pastorder/container/PastorderContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';

export default function Quotation() {
  return (
    <section>
      <div className="bg-[#FAF7F7] w-full h-screen flex flex-col">
        <div className="w-full flex relative h-full">
          <SideNavBar selected={SIDENAV_TEXT[1]} />
          <div className="flex flex-col items-center w-full">
            <PastorderContainer />
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}
