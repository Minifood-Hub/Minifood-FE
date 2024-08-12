'use client';

import {
  CALENDAR_ORDER_COLOR,
  CALENDAR_ORDER_TEXT,
  MAIN_CALENDAR_TEXT,
} from '@/app/constants/main';
import '@/app/ui/Calendar.css';
import CalendarNext from '@/app/ui/Icons/CalendarNext';
import CalendarPrev from '@/app/ui/Icons/CalendarPrev';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

interface OrderCalendarProps {
  isGuest: boolean;
}

const OrderCalendar = ({ isGuest }: OrderCalendarProps) => {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const onChangeToday = () => {
    setToday(today);
  };

  if (!today) {
    return null;
  }
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-[28px] font-medium mb-3">
        {MAIN_CALENDAR_TEXT[0]}
      </div>
      <div className="w-full bg-[#F7FEFB] py-6 flex justify-center mb-8">
        <div className="flex gap-x-6 items-center">
          <Calendar
            onChange={onChangeToday}
            value={today}
            prevLabel={<CalendarPrev />}
            prev2Label={<CalendarPrev />}
            nextLabel={<CalendarNext />}
            next2Label={<CalendarNext />}
            locale="ko-KR"
          />
          <div className="flex flex-col gap-y-8">
            {CALENDAR_ORDER_TEXT.map((text, i) => (
              <div
                className="flex w-[334px] h-[52px] px-6 py-3 gap-x-6 shadow bg-white rounded-[8px]"
                key={text}
              >
                <div
                  className="rounded-full w-7 h-7"
                  style={{ backgroundColor: CALENDAR_ORDER_COLOR[i] }}
                ></div>
                <div className="text-lg font-normal">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link
        href={isGuest ? '/sign-in' : '/order'}
        className="w-[426px] h-[46px] flex-center text-white font-medium text-lg bg-[#55AA00] rounded-[4px]"
      >
        {isGuest ? MAIN_CALENDAR_TEXT[1] : MAIN_CALENDAR_TEXT[2]}
      </Link>
    </div>
  );
};

export default OrderCalendar;
