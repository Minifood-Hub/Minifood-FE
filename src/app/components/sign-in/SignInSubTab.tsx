'use client';

import { SIGNIN_TEXT } from '@/app/constants/sign-in';
import { useRouter } from 'next/navigation';

function SignInSubTab() {
  const router = useRouter();
  return (
    <div className="flex gap-5">
      <button
        onClick={() => {
          router.push('/sign-in');
        }}
        type="button"
        className="text-gray-5 text-sm font-light"
      >
        {SIGNIN_TEXT[0]}
      </button>
      <p className="text-sm">|</p>
      <button
        onClick={() => {
          router.push('/sign-in/sign-up');
        }}
        type="button"
        className="text-gray-5 text-sm font-light"
      >
        {SIGNIN_TEXT[5]}
      </button>
    </div>
  );
}

export default SignInSubTab;
