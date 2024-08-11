// 물품 추가 생성

import { postAdminProducts } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const response = await postAdminProducts(body);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('에러 : ', error);
    return NextResponse.json({ error: '물품 추가 생성 실패' });
  }
}
