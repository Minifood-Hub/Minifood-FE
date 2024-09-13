import { useEffect, useState } from 'react';

export function useResponsiveHeight(
  threshold: number,
  smallHeightClass: string,
  largeHeightClass: string,
) {
  const [heightClass, setHeightClass] = useState(largeHeightClass);

  useEffect(() => {
    const updateHeightClass = () => {
      if (window.innerHeight <= threshold) {
        setHeightClass(smallHeightClass);
      } else {
        setHeightClass(largeHeightClass);
      }
    };

    // 컴포넌트가 마운트될 때와 창 크기 변경 시 높이 업데이트
    updateHeightClass();

    window.addEventListener('resize', updateHeightClass);

    // 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', updateHeightClass);
  }, [threshold, smallHeightClass, largeHeightClass]);

  return heightClass;
}
