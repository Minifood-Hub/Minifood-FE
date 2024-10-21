import { postClient } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const response = await postClient(body, req);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '가입 요청 실패' });
  }
}
