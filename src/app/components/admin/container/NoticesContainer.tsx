'use client';

import { ADMIN_TEXT } from '@/app/constants/admin';
import NoticeGet from '../notices/NoticeGet';

export default function NoticesContainer() {
  return (
    <div className="p-8 border border-gray-2">
      <p className="text-2xl font-black p-4">{ADMIN_TEXT[3]}</p>
      <NoticeGet />
    </div>
  );
}
