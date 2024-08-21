import { postPastOrder } from '@/app/service/postRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const body = await req.json();
    const response = await postPastOrder(body, token);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('에러 : ', error);
    return NextResponse.json({ error: '주문내역 생성 요청 실패' });
  }
}
