import { setTokens } from '@/app/utils/setTokens';

export const handleExtendSession = async (): Promise<void> => {
  // 쿠키에서 리프레시 토큰을 가져옴
  const cookies = document.cookie.split(';');
  const refreshToken = cookies
    .find((cookie) => cookie.trim().startsWith('refreshToken='))
    ?.split('=')[1];

  try {
    const response = await fetch('/api/account/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const newAccessToken = responseData.result.access_token;
      const newAccessRefreshToken = responseData.result.refresh_token;

      // 새로운 액세스 토큰을 쿠키에 저장
      if (refreshToken) {
        setTokens(newAccessToken, newAccessRefreshToken, true);
      }

      alert('세션이 연장되었습니다.');
    }
  } catch (error) {
    console.error('세션 연장 에러:', error);
    alert('세션 연장 중 오류가 발생했습니다.');
  }
};
