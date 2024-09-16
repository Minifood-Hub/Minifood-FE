import { parse } from 'cookie';

let sessionTimeoutId: number | null = null;

const setSessionTimeout = (duration: number) => {
  if (sessionTimeoutId !== null) {
    clearTimeout(sessionTimeoutId);
  }

  sessionTimeoutId = window.setTimeout(() => {
    alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
    window.location.href = '/sign-in';
  }, duration - 5000); // 만료 5초 전에 알림
};

export const setTokens = (
  accessToken: string,
  refreshToken: string,
  isRefresh: boolean = false,
) => {
  try {
    const accessTokenExpires = new Date(Date.now() + 1000 * 60 * 30); // 30분
    const accessTokenExpiresUTC = accessTokenExpires.toUTCString();

    const refreshTokenExpires = new Date(Date.now() + 1000 * 60 * 120); // 120분
    const refreshTokenExpiresUTC = refreshTokenExpires.toUTCString();

    document.cookie = `accessToken=${accessToken}; expires=${accessTokenExpiresUTC}; path=/; secure; HttpOnly; SameSite=Strict`;
    document.cookie = `refreshToken=${refreshToken}; expires=${refreshTokenExpiresUTC}; path=/; secure; HttpOnly; SameSite=Strict`;

    const timeoutDuration = isRefresh
      ? 1000 * 60 * 119 + 1000 * 58
      : 1000 * 60 * 29 + 1000 * 58;
    setSessionTimeout(timeoutDuration);
  } catch (error) {
    console.error('토큰 설정 중 오류 발생:', error);
    throw error;
  }
};

export const getCookie = (req: Request, name: string) => {
  try {
    const cookieHeader = req.headers?.get('cookie');
    const cookies = parse(cookieHeader || '');
    return cookies[name];
  } catch (error) {
    throw error;
  }
};
