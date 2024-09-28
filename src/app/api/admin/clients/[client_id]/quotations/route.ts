// 거래처 견적서 조회

import { getAdminClientQuotations } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const { client_id } = params;
    const url = new URL(req.url);

    const page = url.searchParams.get('page') || '';
    const page_size = url.searchParams.get('page_size') || '';

    const data = await getAdminClientQuotations(
      client_id,
      page,
      page_size,
      req,
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
