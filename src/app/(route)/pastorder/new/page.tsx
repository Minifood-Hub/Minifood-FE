import SideNavBar from '@/app/components/common/layout/SideNavBar';
import NewPastOrderContainer from '@/app/components/pastorder/container/NewPastOrderContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';

export default function NewPastOrder() {
  return (
    <section className="bg-gray-0 min-w-full h-screen flex relative">
      <SideNavBar selected={SIDENAV_TEXT[1]} />
      <NewPastOrderContainer />
    </section>
  );
}
