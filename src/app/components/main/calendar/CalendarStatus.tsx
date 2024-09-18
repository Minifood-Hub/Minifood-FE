interface CalendarStatusProps {
  status: string;
  date: string;
}

const CalendarStatus = ({ status, date }: CalendarStatusProps) => {
  const statusStyle = (dailyStatus: string) => {
    switch (dailyStatus) {
      case '중':
        return '#FF9D00';
      case '상':
        return '#FF4D00';
      default:
        return '#55AA00';
    }
  };

  return (
    <div
      className="w-[38px] h-[38px] p-2.5 text-white text rounded-full"
      style={{ backgroundColor: statusStyle(status) }}
    >
      {date.slice(8, 10)}
    </div>
  );
};

export default CalendarStatus;
