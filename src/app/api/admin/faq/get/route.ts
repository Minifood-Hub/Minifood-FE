import { getFAQ } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const data = await getFAQ();
  return NextResponse.json(data);
}
