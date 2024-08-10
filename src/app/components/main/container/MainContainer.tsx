'use client';

import { WELCOME_TEXT } from '@/app/constants/main';
import { useUser } from '@/app/hooks/useUser';
import Link from 'next/link';
import Recommend from '../recommend/Recommend';
import Reorder from '../Reorder';
import InformationContainer from './InformationContainer';
import OrderCalendar from '../OrderCalendar';

function MainContainer() {
  const { user } = useUser();
  const isGuest = !user?.isSuccess;

  return (
    <div className="flex flex-col gap-y-20 items-center relative">
      <InformationContainer />
      <OrderCalendar />
      <div className="flex-center relative ">
        <div className={`${isGuest && 'blur-lg'}`}>
          <Reorder />
          <Recommend />
          <Link
            href="/order"
            className="w-[680px] h-[60px] flex items-center justify-center text-white text-2xl bg-[#55AA00] rounded-[50px] shadow-md shadow-slate-400"
          >
            {WELCOME_TEXT[4]}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
