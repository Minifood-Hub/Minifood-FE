import { getDailyQuotation } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const data = await getDailyQuotation(req);
  return NextResponse.json(data);
}
