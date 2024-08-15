import { useEffect, useState } from 'react';
import { formatDate } from '@/app/utils/date';

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = formatDate(now.toISOString());
    setCurrentDate(formattedDate);
  }, []);

  return currentDate;
};
