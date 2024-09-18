import { getQuotation } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';
    const date = searchParams.get('date') || '';
    const page = searchParams.get('page') || '';
    const start = searchParams.get('start') || '';
    const end = searchParams.get('end') || '';
    const data = await getQuotation(id, date, page, start, end, req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
