import { GoBackIcon } from '@/app/ui/iconPath';
import Icons from '../common/Icons';
import { formatDate } from '@/app/utils/date';

interface DetailNoticeProps {
  item: NoticeProps | undefined;
  onBack: () => void;
}

export default function DetailNotice({ item, onBack }: DetailNoticeProps) {
  return (
    <div className="flex w-full flex-col items-start gap-6 self-stretch">
      <div
        onClick={onBack}
        className="flex items-center gap-1 self-stretch cursor-pointer"
      >
        <Icons name={GoBackIcon} />
        <p>목록으로</p>
      </div>

      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="flex p-3 items-center self-stretch">
          <div className="flex items-center gap-9">
            <p className="text-xl text-gray-6">{item?.title}</p>
            <p className="text-gray-4">
              {formatDate(item?.created_at || item?.updated_at)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex py-8 px-4 flex-col items-start gap-6 self-stretch border-t border-b border-gray-1">
        {item?.content}
      </div>
    </div>
  );
}
