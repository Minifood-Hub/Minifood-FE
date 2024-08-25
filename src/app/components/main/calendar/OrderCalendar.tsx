'use client';

import {
  CALENDAR_ORDER_COLOR,
  CALENDAR_ORDER_TEXT,
  DAILY_QUOTATION_GUEST,
  MAIN_CALENDAR_TEXT,
} from '@/app/constants/main';
import '@/app/ui/Calendar.css';
import CalendarNext from '@/app/ui/Icons/CalendarNext';
import CalendarPrev from '@/app/ui/Icons/CalendarPrev';
import { callGet } from '@/app/utils/callApi';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import CalendarStatus from './CalendarStatus';

interface OrderCalendarProps {
  clientType: string;
}

const OrderCalendar = ({ clientType }: OrderCalendarProps) => {
  const [today, setToday] = useState<Date | null>(null);
  const [daily, setDaily] = useState<DailyQuotationTypes[]>(
    DAILY_QUOTATION_GUEST,
  );
  console.log(daily);

  const path =
    clientType === 'COMMON'
      ? '/order'
      : clientType === 'CLIENT'
        ? '/sign-in/client'
        : '/sign-in';

  useEffect(() => {
    setToday(new Date());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet('/api/quotation/daily');
      clientType === 'COMMON' && setDaily(data.result);
    };
    fetchData();
  }, [daily, clientType]);

  const onChangeToday = () => {
    setToday(today);
  };

  const getStatusForDate = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const dayStatus = daily.find((item) => item.date === formattedDate);
    return dayStatus ? dayStatus.status : null;
  };

  const getTileClassName = ({ date }: { date: Date }) => {
    const status = getStatusForDate(date);
    return clsx({
      high: status === '상',
      middle: status === '중',
      low: status === '하',
    });
  };

  const renderTileContent = ({ date, view }: { date: Date; view: string }) => {
    const status = getStatusForDate(date);
    return status ? (
      <CalendarStatus
        status={status || ''}
        date={date.toISOString().split('T')[0]}
      />
    ) : (
      <div className="text-center">
        {date.toISOString().split('T')[0].slice(8, 10)}
      </div>
    );
  };

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
            prev2Label={null}
            nextLabel={<CalendarNext />}
            next2Label={null}
            locale="ko-KR"
            tileContent={renderTileContent}
            tileClassName={getTileClassName}
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
                />
                <div className="text-lg font-normal">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link
        href={path}
        className="w-[426px] h-[46px] flex-center text-white font-medium text-lg bg-[#55AA00] rounded-[4px]"
      >
        {clientType === 'GUEST' ? MAIN_CALENDAR_TEXT[1] : MAIN_CALENDAR_TEXT[2]}
      </Link>
    </div>
  );
};

export default OrderCalendar;
