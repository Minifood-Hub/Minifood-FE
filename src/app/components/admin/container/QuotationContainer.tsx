'use client';

import { ADMIN_TEXT } from '@/app/constants/admin';
import QuotationInfo from '../quotations/Info';

export default function QuotationContainer() {
  return (
    <div className="p-8 border border-gray-2">
      <p className="text-2xl font-black p-4">{ADMIN_TEXT[2]}</p>
      <QuotationInfo />
    </div>
  );
}
