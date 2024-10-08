// 거래처 특이사항 작성

import { patchAdminClientComment } from '@/app/service/patchRequest';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const { client_id } = params;
    const { searchParams } = new URL(req.url);
    const input_comment = searchParams.get('input_comment') || '';

    const data = await patchAdminClientComment(client_id, input_comment, req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
