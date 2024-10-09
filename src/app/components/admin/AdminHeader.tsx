'use client';

import { ADMIN_TEXT, ALERT_TEXT } from '@/app/constants/admin';
import { useUser } from '@/app/hooks/useUser';
import { handleExtendSession } from '@/app/utils/extendSession';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminHeader({ isActive }: AdminHeaderProps) {
  const router = useRouter();
  const { user } = useUser();
  const [isAllow, setIsAllow] = useState(false);

  useEffect(() => {
    if (user) {
      if (
        user?.detail === 'Not authenticated' ||
        (user?.result && user.result.is_admin === false)
      ) {
        alert(ALERT_TEXT[6]);
        router.push('/');
      } else {
        setIsAllow(true);
      }
    }
  }, [user, router]);

  const handleActiveChange = (page: string) => {
    router.push(`?page=${page}`);
  };

  if (!isAllow) {
    return <div className="bg-white h-[2160px]" />;
  }

  return (
    <header className="bg-gray-0 px-48 py-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <Image
            src="/Images/minifood.png"
            width={120}
            height={48}
            alt="logo"
          />
        </Link>
        <div
          className={`ml-4 px-4 py-2 font-extrabold cursor-pointer ${isActive === 'quotation' ? 'bg-primary-1 text-white' : 'bg-white'}`}
          onClick={() => handleActiveChange('quotation')}
        >
          {ADMIN_TEXT[2]}
        </div>
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
          className={`px-4 py-2 font-extrabold cursor-pointer ${isActive === 'notices' ? 'bg-primary-1 text-white' : 'bg-white'}`}
          onClick={() => handleActiveChange('notices')}
        >
          {ADMIN_TEXT[3]}
        </div>
        <div
          className={`px-4 py-2 font-extrabold cursor-pointer ${isActive === 'faq' ? 'bg-primary-1 text-white' : 'bg-white'}`}
          onClick={() => handleActiveChange('faq')}
        >
          {ADMIN_TEXT[4]}
        </div>
      </div>
      <button
        className="px-4 py-2 font-extrabold bg-white"
        type="button"
        onClick={handleExtendSession}
      >
        세션 연장
      </button>
    </header>
  );
}
