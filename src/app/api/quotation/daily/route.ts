import { getDailyQuotation } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const data = await getDailyQuotation();
  return NextResponse.json(data);
}
