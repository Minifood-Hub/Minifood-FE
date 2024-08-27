'use client';

import { SIGNIN_TEXT } from '@/app/constants/sign-in';
import { useRouter } from 'next/navigation';

function SignInSubTab() {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          router.push('/sign-in');
        }}
        type="button"
        className="flex-center px-2 border-r border-gray-1 text-[15px]"
      >
        {SIGNIN_TEXT[0]}
      </button>

      <button
        onClick={() => {
          router.push('/sign-in/sign-up');
        }}
        type="button"
        className="flex-center px-2 text-[15px]"
      >
        {SIGNIN_TEXT[5]}
      </button>
    </div>
  );
}

export default SignInSubTab;
