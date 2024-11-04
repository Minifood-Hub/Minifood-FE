// 공지사항 생성

import { postAdminNotices } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const response = await postAdminNotices(body);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '공지사항 생성 실패' });
  }
}
