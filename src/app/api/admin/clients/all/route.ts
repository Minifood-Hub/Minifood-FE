// 모든 거래처 정보 조회

import { getAdminClientAll } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const data = await getAdminClientAll(req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: '모든 거래처 정보 조회 오류' },
      { status: 500 },
    );
  }
}
