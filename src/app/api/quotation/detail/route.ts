import { getQuotationDetail } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const token = getCookie(req, 'accessToken');
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || '';

  const data = await getQuotationDetail(id, token);
  return NextResponse.json(data);
}
