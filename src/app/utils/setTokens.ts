import { parse } from 'cookie';

export const setTokens = (accessToken: string) => {
  try {
    const accessTokenExpires = new Date(Date.now() + 1000 * 60 * 3000);
    const accessTokenExpiresUTC = accessTokenExpires.toUTCString();

    document.cookie = `accessToken=${accessToken}; expires=${accessTokenExpiresUTC}; path=/;`;
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
