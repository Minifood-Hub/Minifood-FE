// 거래처 지역 선택

import { NextResponse } from 'next/server';
import { patchAdminClientRegion } from '@/app/service/patchRequest';

export async function PATCH(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const { client_id } = params;
    const { searchParams } = new URL(req.url);
    const region = searchParams.get('region') || '';

    const data = await patchAdminClientRegion(client_id, region);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
