import { NextResponse } from 'next/server';
import { postSignUp } from '@/app/service/postRequest';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const response = await postSignUp(body);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('에러 : ', error);
    return NextResponse.json({ error: '가입 요청 실패' });
  }
}
//  Next.js의 API 라우트에서는 명명된 export를 사용해야 함
