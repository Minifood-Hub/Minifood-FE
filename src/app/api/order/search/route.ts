import { NextResponse } from 'next/server';
import { getSearchProducts } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const token = getCookie(request, 'accessToken');
    const url = new URL(request.url);
    const namePrefix = url.searchParams.get('name_prefix') || '';
    const limit = url.searchParams.get('limit') || '100';

    const data = await getSearchProducts({
      namePrefix,
      limit,
      token,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
