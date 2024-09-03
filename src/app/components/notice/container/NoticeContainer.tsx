'use client';

import { NOTICE_TEXT } from '@/app/constants/notice';
import Input from '../../common/Input';
import { useCallback, useEffect, useState } from 'react';
import { FAQ_TEXT } from '@/app/constants/faq';
import { ArrowRightIcon, SearchIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';
import { callGet } from '@/app/utils/callApi';
import Pagination from '../../common/Pagination';
import { formatDate } from '@/app/utils/date';
import DetailNotice from '../DetailNotice';

export default function MainNoticeContainer() {
  const [notices, setNotices] = useState<NoticeProps[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(() => selected + 1);
  };

  const handleGetFAQ = useCallback(async () => {
    try {
      const data = await callGet(`/api/admin/notices/get`);
      setNotices(data.result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleGetFAQ();
  }, [page]);

  const selectContent = (faq_id: number) => {
    setSelectedId((prevId) => (prevId === faq_id ? null : faq_id));
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title // 사용자의 검색어가 포함된 모든 FAQ 출력
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // 현재 페이지에 해당하는 FAQ만 표시
  const displayedNotices = filteredNotices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // 검색어 변경 시 페이지를 첫 페이지로 리셋
  };

  // 목록으로 돌아가는 핸들러 추가
  const handleBackToList = () => {
    setSelectedId(null);
  };

  return (
    <div className="flex py-[50px] px-[195px] flex-col items-center gap-8 self-stretch">
      <p className="w-full text-center text-xl font-semibold">
        {NOTICE_TEXT[0]}
      </p>

      <div className="w-full mt-5 px-6 flex justify-between items-center rounded border-[1px] bg-gray-0 border-gray-0 focus-within:border-gray-7 focus-within:border-2">
        <Input
          type="default"
          className="w-full py-3 bg-gray-0 focus:outline-none placeholder:text-gray-3"
          onChange={handleSearchChange}
          placeholder={FAQ_TEXT[1]}
          textValue={searchTerm}
        />
        <Icons name={SearchIcon} />
      </div>

      <div className="flex w-full h-[814px] pl-[18px] flex-col items-start gap-6">
        {selectedId ? (
          // Notices 상세 화면 렌더링
          <DetailNotice
            item={notices.find((notice) => notice.id === selectedId)}
            onBack={handleBackToList}
          />
        ) : (
          // Notices 목록 화면 렌더링
          displayedNotices.map((item, index) => (
            <div
              className="flex p-3 justify-between items-center self-stretch rounded bg-white hover:bg-gray-1 cursor-pointer"
              onClick={() => selectContent(item.id)}
              key={item.id}
            >
              <div className="flex w-full justify-between items-center max-w-full overflow-hidden">
                <div className="flex items-center gap-4">
                  <p className="text-xl font-semibold text-gray-3">
                    {index + 1}
                  </p>
                  <span className="text-xl text-gray-4 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </span>
                  <p>{formatDate(item.created_at || item.updated_at)}</p>
                </div>
                <div className="flex items-center text-xs whitespace-nowrap flex-shrink-0">
                  <Icons name={ArrowRightIcon} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination onPageChange={handlePageChange} totalPages={totalPages} />
    </div>
  );
}
