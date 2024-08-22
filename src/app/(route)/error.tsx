'use client';

import { useRouter } from 'next/navigation';
import { Dialog } from '../components/common/Dialog';

export default function Error() {
  const router = useRouter();

  return (
    <div>
      <Dialog
        topText="세션이 만료되었습니다."
        subText="다시 로그인해주세요."
        BtnText="이동"
        onBtnClick={() => {
          router.push('/sign-in');
        }}
      />
    </div>
  );
}
