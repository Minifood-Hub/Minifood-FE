'use client';

import '@/app/ui/Calendar_small.css';
import { WhiteCloseIcon } from '@/app/ui/iconPath';
import CalendarNext from '@/app/ui/Icons/CalendarNext';
import CalendarPrev from '@/app/ui/Icons/CalendarPrev';
import { Dispatch } from 'react';
import Calendar from 'react-calendar';
import Icons from '../common/Icons';

interface QuotationCalendarProps {
  closeModal: () => void;
  date: any;
  setDate: Dispatch<any>;
}

const QuotationCalendar = ({
  date,
  setDate,
  closeModal,
}: QuotationCalendarProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex relative">
        <Calendar
          onChange={setDate}
          selectRange
          value={date}
          prevLabel={<CalendarPrev />}
          prev2Label={null}
          nextLabel={<CalendarNext />}
          next2Label={null}
          locale="ko-KR"
        />
        <div
          className="absolute w-6 h-6 flex-center right-6 top-[18px] bg-[#71B033] rounded-[50px] cursor-pointer"
          onClick={closeModal}
        >
          <Icons name={WhiteCloseIcon} />
        </div>
      </div>
    </div>
  );
};

export default QuotationCalendar;
