import { NextResponse } from 'next/server';
import { getQuotationTotal } from '../../../../../service/getRequest';

export async function GET(
  req: Request,
  { params }: { params: { quotation_id: string } },
): Promise<NextResponse> {
  try {
    const { quotation_id } = params;
    const data = await getQuotationTotal(quotation_id); // get추가하기
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json(
      { error: ' Internal Server Error' },
      { status: 500 },
    );
  }
}
