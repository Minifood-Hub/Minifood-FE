import { putAdminNotices } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { notice_id: string } },
): Promise<NextResponse> {
  try {
    const { notice_id } = params;
    const body = await req.json();

    const response = await putAdminNotices(notice_id, body);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
