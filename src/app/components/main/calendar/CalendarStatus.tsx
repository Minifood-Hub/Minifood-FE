interface CalendarStatusProps {
  status: string;
  date: string;
}

const CalendarStatus = ({ status, date }: CalendarStatusProps) => {
  const statusStyle = (status: string) => {
    switch (status) {
      case '하':
        return '#55AA00';
      case '중':
        return '#FF9D00';
      case '상':
        return '#FF4D00';
    }
  };
  return (
    <div
      className={`w-[38px] h-[38px] p-2.5 text-white rounded-full bg-[${statusStyle(status)}]`}
    >
      {date.slice(8, 10)}
    </div>
  );
};

export default CalendarStatus;
