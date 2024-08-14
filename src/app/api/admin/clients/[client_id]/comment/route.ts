// 거래처 특이사항 작성

import { NextResponse } from 'next/server';
import { patchAdminClientComment } from '@/app/service/patchRequest';

export async function PATCH(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const { client_id } = params;
    const { searchParams } = new URL(req.url);
    const input_comment = searchParams.get('input_comment') || '';

    const data = await patchAdminClientComment(client_id, input_comment);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
