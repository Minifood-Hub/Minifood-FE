'use client';

import { useUser } from '@/app/hooks/useUser';
import OrderCalendar from '../calendar/OrderCalendar';
import Reorder from '../reorder/Reorder';
import InformationContainer from './InformationContainer';

function MainContainer() {
  const { user } = useUser();
  const isCOMMON = user?.category === 'COMMON';

  return (
    <div className="flex flex-col gap-y-20 items-center relative bg-white mb-10">
      <InformationContainer />
      <OrderCalendar clientType={user?.category || 'GUEST'} />
      {isCOMMON && user?.result?.client_id && (
        <Reorder client_id={user.result.client_id} />
      )}
      {/* <Recommend /> */}
    </div>
  );
}

export default MainContainer;
