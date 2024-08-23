import { getFAQ } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const data = await getFAQ();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
