import { AddIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';

const Announcement = () => {
  return (
    <div className="w-[333px] h-40 px-4 py-[18px] rounded-[20px] shadow text-[#333333]">
      <div className="flex justify-between mb-4 items-center">
        <div className="text-lg font-medium">공지사항</div>
        <Icons name={AddIcon} />
      </div>
      <div className="flex flex-col gap-y-1.5 text-[16px] font-normal tracking-tight">
        <div>새로 입고된 상품 안내</div>
        <div>8월 9일 시스템 점검 안내</div>
        <div>광복절 배송 안내</div>
      </div>
    </div>
  );
};

export default Announcement;
