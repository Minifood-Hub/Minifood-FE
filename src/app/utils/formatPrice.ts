export const formatPrice = (number: number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
};
