import { patchQuotationConfirm } from '@/app/service/patchRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { quotation_id: string } },
): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { quotation_id } = params;

    const data = await patchQuotationConfirm({
      quotation_id,
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
