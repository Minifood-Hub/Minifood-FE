import { getAdminNoticesId } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { notice_id: string } },
): Promise<NextResponse> {
  try {
    const noticeId = Number(params.notice_id);

    const data = await getAdminNoticesId(noticeId.toString(), req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
