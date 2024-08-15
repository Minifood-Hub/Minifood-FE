// 최근 구매한 물품 리스트 조회

import { getPurchaseRecent } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const data = await getPurchaseRecent(token);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
