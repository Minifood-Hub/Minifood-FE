import { CUSTOMER_SERVICE_TEXT } from '@/app/constants/main';

const CustomerService = () => {
  return (
    <div className="w-[333px] h-40 px-4 py-[18px] rounded-[20px] shadow text-[#333333]">
      <div className="flex justify-between mb-4 items-center">
        <div className="text-lg font-medium">고객센터</div>
      </div>
      <div className="flex flex-col gap-y-1.5 tracking-tight">
        {CUSTOMER_SERVICE_TEXT.map((text) => (
          <div key={text}>{text}</div>
        ))}
      </div>
    </div>
  );
};

export default CustomerService;
