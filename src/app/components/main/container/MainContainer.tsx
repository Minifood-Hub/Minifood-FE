'use client';

import { useUser } from '@/app/hooks/useUser';
import OrderCalendar from '../calendar/OrderCalendar';
import Recommend from '../recommend/Recommend';
import Reorder from '../reorder/Reorder';
import InformationContainer from './InformationContainer';

function MainContainer() {
  const { user } = useUser();
  const isGuest = !user?.isSuccess;

  return (
    <div className="flex flex-col gap-y-20 items-center relative bg-white">
      <InformationContainer />
      <OrderCalendar isGuest={isGuest} />
      {!isGuest && <Reorder />}
      <Recommend />
    </div>
  );
}

export default MainContainer;
