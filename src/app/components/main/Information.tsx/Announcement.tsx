import { MAIN_INFORMATION } from '@/app/constants/main';
import { AddIcon } from '@/app/ui/iconPath';
import { callGet } from '@/app/utils/callApi';
import { shortenText } from '@/app/utils/shortenText';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icons from '../../common/Icons';

const Announcement = () => {
  const [notices, setNotices] = useState<NoticeProps[]>([]);
  const preNotices = notices.slice(0, 3);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet('/api/admin/notices/get');
      setNotices(data.result);
    };
    fetchData();
  }, []);

  return (
    <Link href="/notice">
      <div className="w-[333px] h-40 px-4 py-[18px] rounded-[20px] shadow text-[#333333]">
        <div className="flex justify-between mb-4 items-center">
          <div className="text-lg font-medium">{MAIN_INFORMATION[0]}</div>
          <Icons name={AddIcon} className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-y-1.5 text-[16px] font-normal tracking-tight">
          {preNotices.map((notice, index) => (
            <div key={notice.id}>{shortenText(notice.title, 15)}</div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Announcement;
