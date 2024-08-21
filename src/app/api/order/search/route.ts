import { NextResponse } from 'next/server';
import { getSearchProducts } from '@/app/service/getRequest';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const namePrefix = url.searchParams.get('name_prefix') || '';
    const limit = url.searchParams.get('limit') || '100';

    const data = await getSearchProducts(
      {
        namePrefix,
        limit,
      },
      req,
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
