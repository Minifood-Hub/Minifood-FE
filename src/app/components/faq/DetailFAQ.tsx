import { GoBackIcon } from '@/app/ui/iconPath';
import Icons from '../common/Icons';

interface DetailFAQProps {
  item: FAQProps | undefined;
  onBack: () => void;
}

export default function DetailFAQ({ item, onBack }: DetailFAQProps) {
  return (
    <div className="flex w-full pl-[18px] flex-col items-start gap-6 self-stretch">
      <div onClick={onBack} className="flex items-center gap-1 cursor-pointer">
        <Icons name={GoBackIcon} />
        <p>목록으로</p>
      </div>

      <div className="flex h-56 flex-col items-start gap-2 self-stretch">
        <div className="flex p-3 items-center gap-[21px] self-stretch">
          <div className="flex items-center gap-4">
            <p>Q</p>

            <p className="text-xl">{item?.question}</p>
          </div>
        </div>

        <div className="flex py-8 px-4 flex-col items-start gap-6 flex-1 self-stretch border-y border-gray-1 whitespace-pre-wrap">
          {item?.answer}
        </div>
      </div>
    </div>
  );
}
