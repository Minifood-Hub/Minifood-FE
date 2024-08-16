'use client';

import { NOTICE_OPTION_TEXT, OPTION_TEXT } from '@/app/constants/admin';
import { useState } from 'react';
import NoticePost from '../notices/NoticePost';
import NoticeGet from '../notices/NoticeGet';
import NoticeGetId from '../notices/NoticeGetId';
import NoticePut from '../notices/NoticePut';
import NoticeDelete from '../notices/NoticeDelete';

export default function NoticesContainer() {
  const [selectedOption, setSelectedOption] = useState('noticePost');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedOption(value);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'noticePost':
        return <NoticePost />;
      case 'noticeGet':
        return <NoticeGet />;
      case 'noticeGetId':
        return <NoticeGetId />;
      case 'noticePut':
        return <NoticePut />;
      case 'noticeDelete':
        return <NoticeDelete />;
      default:
        return null;
    }
  };
  return (
    <div className="p-8 border border-gray-2">
      <div className="flex items-center gap-4 h-16 border-2 px-4 mb-8">
        <p>{OPTION_TEXT[9]}</p>
        <select
          className="border-2"
          name="selectedOption"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="noticePost">{NOTICE_OPTION_TEXT[0]}</option>
          <option value="noticeGet">{NOTICE_OPTION_TEXT[1]}</option>
          <option value="noticeGetId">{NOTICE_OPTION_TEXT[2]}</option>
          <option value="noticePut">{NOTICE_OPTION_TEXT[3]}</option>
          <option value="noticeDelete">{NOTICE_OPTION_TEXT[4]}</option>
        </select>
      </div>

      {renderComponent()}
    </div>
  );
}
