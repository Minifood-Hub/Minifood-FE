import { patchQuotationParticulars } from '@/app/service/patchRequest';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { quotation_id: string } },
): Promise<NextResponse> {
  try {
    const { quotation_id } = params;
    const { searchParams } = new URL(req.url);
    const particulars = searchParams.get('particulars') || '';

    const data = await patchQuotationParticulars({
      quotation_id,
      particulars,
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
