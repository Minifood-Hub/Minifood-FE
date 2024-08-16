'use client';

import '@/app/ui/Calendar.css';
import CalendarNext from '@/app/ui/Icons/CalendarNext';
import CalendarPrev from '@/app/ui/Icons/CalendarPrev';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

const OrderCalendar = () => {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const onChangeToday = () => {
    setToday(today);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex justify-center items-center z-50">
      <Calendar
        onChange={onChangeToday}
        value={today}
        prevLabel={<CalendarPrev />}
        prev2Label={null}
        nextLabel={<CalendarNext />}
        next2Label={null}
        locale="ko-KR"
      />
    </div>
  );
};

export default OrderCalendar;
