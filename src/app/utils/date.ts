import { DAYS_OF_WEEEK } from '../constants/common';

export const formatDate = (isoDate: any) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDay = (isoDate: any) => {
  const date = new Date(isoDate);
  const weekday = date.getDay();
  return DAYS_OF_WEEEK[weekday];
};

export const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}년${month}월${day}일${hours}시${minutes}분`;
};
