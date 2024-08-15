import { getQuotation } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';
    const date = searchParams.get('date') || '';
    const page = searchParams.get('page') || '';
    const data = await getQuotation(id, date, page, token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
