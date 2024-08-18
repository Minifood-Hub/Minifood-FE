// 견적서 정보 조회

import { getAdminQuotationsInfo } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const start = url.searchParams.get('start') || '';
    const end = url.searchParams.get('end') || '';
    const query = url.searchParams.get('query') || '';

    const data = await getAdminQuotationsInfo(start, end, query);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
