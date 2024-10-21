// 최근 구매한 물품 리스트 조회

import { getPurchaseRecent } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const data = await getPurchaseRecent(req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
