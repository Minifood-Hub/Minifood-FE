import { getAdminNoticesId } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { notice_id: string } },
): Promise<NextResponse> {
  try {
    const noticeId = Number(params.notice_id);
    if (!Number.isInteger(noticeId) || noticeId <= 0) {
      return NextResponse.json(
        { error: 'Invalid notice ID. Must be a positive integer.' },
        { status: 400 },
      );
    }
    const data = await getAdminNoticesId(noticeId.toString());
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
