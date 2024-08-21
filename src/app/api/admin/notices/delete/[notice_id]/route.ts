// 공지사항 삭제

import { deleteAdminNotices } from '@/app/service/deleteRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { notice_id: string } },
): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { notice_id } = params;

    const data = await deleteAdminNotices(notice_id, token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
