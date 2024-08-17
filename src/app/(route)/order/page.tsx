import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import OrderContainer from '@/app/components/order/container/OrderContainer';
import TopBar from '@/app/components/order/TopBar';
import { SIDENAV_TEXT } from '@/app/constants/common';

export default function Order() {
  return (
    <section>
      <div className="bg-white w-full h-full flex relative">
        {/* 네비게이션 바 */}
        <SideNavBar selected={SIDENAV_TEXT[0]} />

        {/* 탑바 */}
        <TopBar />
        <div className="flex flex-col w-full">
          {/* 메인 컨테이너 */}
          <OrderContainer />

          <Footer />
        </div>
      </div>
    </section>
  );
}
