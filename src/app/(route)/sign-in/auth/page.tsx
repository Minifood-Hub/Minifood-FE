'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setTokens } from '@/app/utils/setTokens';
import { useUserStore } from '@/app/store/useStore';

function KakaoAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 사용자 정보를 가져오고 전역 상태를 업데이트
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    // URL에서 'code' 파라미터를 추출, 카카오 인증 서버가 인증 성공 후 리다이렉트할 때 제공
    const code = searchParams.get('code');

    if (code) {
      // code가 존재하면, 서버에 인증 코드를 보내 액세스 토큰을 요청합니다.
      fetch('/api/kakao-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            // 서버로부터 받은 액세스 토큰 저장
            setTokens(data.access_token, data.refresh_token);

            fetchUser();
            router.push('/');
          } else {
            // 액세스 토큰을 받지 못했다면
            router.push('/sign-in');
          }
        })
        .catch((error) => {
          router.push('/sign-in');
        });
    }
  }, [searchParams, router, fetchUser]);
  return <div>카카오 로그인 처리 중...</div>;
}

export default function KakaoAuth() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <KakaoAuthContent />
    </Suspense>
  );
}
