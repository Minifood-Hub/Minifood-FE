import { NextResponse } from 'next/server';

const KAKAO_OAUTH_TOKEN_API_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USER_INFO_API_URL = 'https://kapi.kakao.com/v2/user/me';

export async function POST(request: Request) {
  const { code } = await request.json();

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_KEY!,
    redirect_uri: 'http://localhost:3000/sign-in/auth',
    code,
  });

  try {
    // 카카오로부터 액세스 토큰 얻기
    const tokenResponse = await fetch(KAKAO_OAUTH_TOKEN_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error('토큰 fetch 실패');
    }

    // 카카오 사용자 정보 얻기
    const userInfoResponse = await fetch(KAKAO_USER_INFO_API_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      throw new Error('유저데이터 fetch 실패');
    }

    return NextResponse.json({
      access_token: tokenData.access_token, // 자체 토큰으로 교체하기
      user: userData,
    });
  } catch (error) {
    console.error('KaKao 로그인 에러:', error);
    return NextResponse.json(
      { error: 'Kakao login 실행 실패' },
      { status: 500 },
    );
  }
}
