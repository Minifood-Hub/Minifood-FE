import { getQuotations } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { quotation_id: string } },
): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { quotation_id } = params;
    const data = await getQuotations(quotation_id, token);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json(
      { error: ' Internal Server Error' },
      { status: 500 },
    );
  }
}
