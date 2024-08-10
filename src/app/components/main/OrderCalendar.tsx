import { MAIN_CALENDAR_TEXT } from '@/app/constants/main';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const OrderCalendar = () => {
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

  return (
    <div className="w-[1050px] flex flex-col items-center">
      <div className="text-[28px] font-medium mb-9">
        {MAIN_CALENDAR_TEXT[0]}
      </div>
      <Calendar />
    </div>
  );
};

export default OrderCalendar;
