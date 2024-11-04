import { getFAQId } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { faq_id: string } },
): Promise<NextResponse> {
  const { faq_id } = params;
  try {
    const data = await getFAQId(faq_id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
