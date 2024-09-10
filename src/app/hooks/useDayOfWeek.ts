export const useDayOfWeek = (dateString: string | undefined) => {
  if (!dateString) return ''; // 입력된 날짜가 없으면 빈 문자열 반환

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);
};
