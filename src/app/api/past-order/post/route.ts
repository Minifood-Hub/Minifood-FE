import { postPastOrder } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const response = await postPastOrder(body, req);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '즐겨찾기 생성 요청 실패' });
  }
}
