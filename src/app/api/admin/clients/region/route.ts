// 거래처 지역으로 조회

import { NextResponse } from 'next/server';
import { getAdminClientRegion } from '@/app/service/getRequest';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const region = url.searchParams.get('region') || '';

    const data = await getAdminClientRegion(region);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
