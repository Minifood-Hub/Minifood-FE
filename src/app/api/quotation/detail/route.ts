import { getQuotationDetail } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || '';

  const data = await getQuotationDetail(id, req);
  return NextResponse.json(data);
}
