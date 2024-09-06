import Input from '../common/Input';
import Button from '../common/Button';
import { BUTTON_TEXT } from '@/app/constants/order';
import { useCurrentDate } from '@/app/hooks/useCurrentDate';

interface OrderStartProps {
  onStartOrder: () => void;
  orderDate: string;
  onDateChange: (date: string) => void;
}

export default function OrderStart({
  onStartOrder,
  orderDate,
  onDateChange,
}: OrderStartProps) {
  const currentDate = useCurrentDate();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    onDateChange(date); // 부모 컴포넌트로 날짜 전달
  };

  const handleButtonClick = () => {
    if (!orderDate) {
      alert('주문 날짜를 선택해주세요.');
    } else {
      onStartOrder();
    }
  };

  return (
    <div className="flex-center flex-col w-full px-0 self-stretch gap-12">
      <div className="">
        <span className="font-bold">주문 날짜를 입력해주세요</span>
        <input
          className="w-full h-10 border rounded px-4"
          type="date"
          value={orderDate}
          onChange={handleDateChange}
          onClick={(e) => (e.target as HTMLInputElement).showPicker()} // input 전체를 클릭하면 날짜 선택기 호출
          min={currentDate}
        />
        {orderDate && (
          <div className="font-bold pt-2">선택 날짜 : {orderDate}</div>
        )}
      </div>

      <Button
        className="h-min py-2 mb-16 admin-btn"
        type="default"
        onClickHandler={handleButtonClick}
        buttonText={BUTTON_TEXT[4]}
      />
    </div>
  );
}
