import { NextResponse } from 'next/server';
import { getQuotationTotal } from '../../../../../service/getRequest';
import { getCookie } from '@/app/utils/setTokens';

export async function GET(
  req: Request,
  { params }: { params: { quotation_id: string } },
): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { quotation_id } = params;
    const data = await getQuotationTotal(quotation_id, token); // get추가하기
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json(
      { error: ' Internal Server Error' },
      { status: 500 },
    );
  }
}
