'use client';

import { MAIN_CALENDAR_TEXT } from '@/app/constants/main';
import CalendarNext from '@/app/ui/Icons/CalendarNext';
import CalendarPrev from '@/app/ui/Icons/CalendarPrev';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../../ui/Calendar.css';
const OrderCalendar = () => {
  const [today, setToday] = useState<Date | null>(null); // 초기값을 null로 설정

  useEffect(() => {
    setToday(new Date()); // 클라이언트에서만 현재 날짜 설정
  }, []);

  console.log(today);

  const onChangeToday = () => {
    setToday(today);
  };

  const tileContent = ({ date }: { date: Date }) => {
    const day = date.getDate(); // 날짜 숫자만 가져오기
    console.log(day);

    return <div>{day}</div>; // 날짜 숫자만 표시
  };

  if (!today) {
    return null; // 오늘 날짜가 설정될 때까지 아무것도 렌더링하지 않음
  }
  return (
    <div className="w-[1050px] flex flex-col items-center">
      <div className="text-[28px] font-medium mb-9">
        {MAIN_CALENDAR_TEXT[0]}
      </div>
      <Calendar
        onChange={onChangeToday}
        value={today}
        prevLabel={<CalendarPrev />}
        prev2Label={<CalendarPrev />}
        nextLabel={<CalendarNext />}
        next2Label={<CalendarNext />}
        locale="ko-KR"
      />
    </div>
  );
};

export default OrderCalendar;
