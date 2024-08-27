'use client';

import { ADMIN_TEXT, ALERT_TEXT } from '@/app/constants/admin';
import QuotationInfo from '../quotations/Info';
import { useUser } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QuotationContainer() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.result && user.result.is_admin === false) {
      alert(ALERT_TEXT[8]);
      router.push('/');
    }
  }, [user, router]);
  return (
    <div className="p-8 border border-gray-2">
      <p className="text-2xl font-black p-4">{ADMIN_TEXT[2]}</p>
      <QuotationInfo />
    </div>
  );
}
