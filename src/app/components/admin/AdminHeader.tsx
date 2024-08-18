'use client';

import { ADMIN_TEXT } from '@/app/constants/admin';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AdminHeader({ isActive }: AdminHeaderProps) {
  const router = useRouter();

  const handleActiveChange = (page: string) => {
    router.push(`?page=${page}`);
  };

  return (
    <header className="bg-gray-0 p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <div
          className={`px-4 py-2 font-extrabold cursor-pointer ${isActive === 'client' ? 'bg-primary-1 text-white' : 'bg-white'}`}
          onClick={() => handleActiveChange('client')}
        >
          {ADMIN_TEXT[0]}
        </div>
        <div
          className={`px-4 py-2 font-extrabold cursor-pointer ${isActive === 'product' ? 'bg-primary-1 text-white' : 'bg-white'}`}
          onClick={() => handleActiveChange('product')}
        >
          {ADMIN_TEXT[1]}
        </div>
        <div
          className={`px-4 py-2 font-extrabold cursor-pointer ${isActive === 'quotation' ? 'bg-primary-1 text-white' : 'bg-white'}`}
          onClick={() => handleActiveChange('quotation')}
        >
          {ADMIN_TEXT[2]}
        </div>
      </div>
    </header>
  );
}
