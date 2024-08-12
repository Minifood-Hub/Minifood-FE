'use client';

import { useUser } from '@/app/hooks/useUser';
import OrderCalendar from '../OrderCalendar';
import Recommend from '../recommend/Recommend';
import Reorder from '../Reorder';
import InformationContainer from './InformationContainer';

function MainContainer() {
  const { user } = useUser();
  const isGuest = !user?.isSuccess;

  return (
    <div className="flex flex-col gap-y-20 items-center relative bg-white">
      <InformationContainer />
      <OrderCalendar isGuest={isGuest}/>
      <div className="flex-center relative ">
        <div className={`${isGuest && 'blur-lg'}`}>
          <Reorder />
          <Recommend />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
