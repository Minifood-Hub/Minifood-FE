import { getQuotations } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { quotation_id: string } },
): Promise<NextResponse> {
  try {
    const { quotation_id } = params;
    const data = await getQuotations(quotation_id, req);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error: ', error);
    return NextResponse.json(
      { error: ' Internal Server Error' },
      { status: 500 },
    );
  }
}
