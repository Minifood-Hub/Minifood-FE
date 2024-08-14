// 거래처 삭제

import { NextResponse } from 'next/server';
import { deleteAdminClient } from '@/app/service/deleteRequest';

export async function DELETE(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const { client_id } = params;

    const data = await deleteAdminClient(client_id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
