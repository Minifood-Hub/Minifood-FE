import { parse } from 'cookie';

export const setTokens = (accessToken: string, refreshToken: string) => {
  try {
    const accessTokenExpires = new Date(Date.now() + 1000 * 60 * 30);
    const accessTokenExpiresUTC = accessTokenExpires.toUTCString();

    const refreshTokenExpires = new Date(Date.now() + 1000 * 60 * 120);
    const refreshTokenExpiresUTC = refreshTokenExpires.toUTCString();

    // secure 속성을 추가하여 HTTPS 연결에서만 전송되도록
    document.cookie = `accessToken=${accessToken}; expires=${accessTokenExpiresUTC}; path=/; secure;`;
    document.cookie = `refreshToken=${refreshToken}; expires=${refreshTokenExpiresUTC}; path=/; secure;`;

    setTimeout(
      () => {
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/sign-in';
      },
      1000 * 60 * 29 + 1000 * 58,
    ); // 29분 58초
  } catch (error) {
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
