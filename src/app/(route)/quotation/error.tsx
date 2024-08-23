'use client';

import Button from '@/app/components/common/Button';
import Icons from '@/app/components/common/Icons';
import { cancelIcon } from '@/app/ui/iconPath';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    router.push('/login');
  }, [error]);

  return (
    <html lang="kr">
      <body>
        <div className="bg-black w-screen h-screen text-white flex flex-col justify-center items-center gap-10">
          <h2 className="text-3xl font-bold">문제가 발생했습니다.</h2>
          <Button
            type="quoteOrder"
            className="hover:bg-white"
            isDisabled={false}
            buttonText="새로고침"
            onClickHandler={() => reset()}
          />
          <Link href="/" className="flex flex-col justify-center items-center">
            홈으로 <Icons name={cancelIcon} />
          </Link>
        </div>
      </body>
    </html>
  );
}
