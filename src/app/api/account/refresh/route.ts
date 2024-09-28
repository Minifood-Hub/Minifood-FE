// 액세스 토큰 재발급

import { postRefreshToken } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const response = await postRefreshToken(body.refreshToken, req);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '리프레시 토큰 요청 실패' });
  }
}
