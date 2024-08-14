// 거래처 해당 날짜 견적서 제출 여부 파악

import { NextResponse } from 'next/server';
import { getAdminClientCheck } from '@/app/service/getRequest';

export async function GET(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const { client_id } = params;
    const url = new URL(req.url);
    const input_date = url.searchParams.get('input_date') || '';

    const data = await getAdminClientCheck(client_id, input_date);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
