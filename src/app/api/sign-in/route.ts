import { postLogin } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

// 클라이언트로부터 로그인 요청을 처리하는 함수
export async function POST(request: Request) {
  // 요청 본문을 JSON으로 파싱
  const content = await request.json();
  try {
    // postLogin 함수를 호출하여 로그인 요청을 서버에 보냄
    const data = await postLogin(content);

    // 서버 응답의 헤더에서 액세스 토큰과 리프레시 토큰을 가져옴
    const access = data?.headers.get('authorization');
    // 액세스 토큰이 존재하는 경우
    if (access) {
      return NextResponse.json({ access });
    }
    throw new Error('액세스 토큰 응답 없음');
  } catch (error) {
    throw new Error('데이터 접근 실패');
  }
}
