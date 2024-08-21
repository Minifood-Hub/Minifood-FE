// 거래처 삭제

import { NextResponse } from 'next/server';
import { deleteAdminClient } from '@/app/service/deleteRequest';
import { getCookie } from '@/app/utils/setTokens';

export async function DELETE(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { client_id } = params;

    const data = await deleteAdminClient(client_id, token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
