'use client';

import { useUser } from '@/app/hooks/useUser';
import OrderCalendar from '../calendar/OrderCalendar';
import Recommend from '../recommend/Recommend';
import Reorder from '../reorder/Reorder';
import InformationContainer from './InformationContainer';

function MainContainer() {
  const { user } = useUser();
  const isCOMMON = user?.category === 'COMMON';

  return (
    <div className="flex flex-col mt-[88px] gap-y-20 items-center relative bg-white">
      <InformationContainer />
      <OrderCalendar clientType={user?.category || 'GUEST'} />
      {isCOMMON && <Reorder client_id={user.result.client_id} />}
      <Recommend />
    </div>
  );
}

export default MainContainer;
