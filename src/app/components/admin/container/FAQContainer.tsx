'use client';

import { ADMIN_TEXT } from '@/app/constants/admin';
import FAQGet from '../faq/FAQGet';

export default function FAQContainer() {
  return (
    <div className="p-8 border border-gray-2">
      <p className="text-2xl font-black p-4">{ADMIN_TEXT[4]}</p>
      <FAQGet />
    </div>
  );
}
