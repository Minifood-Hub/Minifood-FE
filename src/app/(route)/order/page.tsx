import SideNavBar from '@/app/components/common/layout/SideNavBar';
import OrderContainer from '@/app/components/order/container/OrderContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';

export default function Order() {
  return (
    <section className="bg-[#FAF7F7] min-w-full h-screen flex relative">
      {/* 네비게이션 바 */}
      <SideNavBar selected={SIDENAV_TEXT[0]} />

      {/* 메인 컨테이너 */}
      <OrderContainer />
    </section>
  );
}
