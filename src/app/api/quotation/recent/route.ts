import { getRecentQuotation } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const client_id = searchParams.get('client_id') || '';

  const data = await getRecentQuotation(client_id, req);
  return NextResponse.json(data);
}
