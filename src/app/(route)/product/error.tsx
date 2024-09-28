'use client';

import { Dialog } from '@/app/components/common/Dialog';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  return (
    <div>
      <Dialog
        topText="상품구매 관련 오류가 발생했습니다."
        subText="다시 로그인해주세요."
        BtnText="이동"
        onBtnClick={() => {
          router.push('/sign-in');
        }}
      />
    </div>
  );
}
