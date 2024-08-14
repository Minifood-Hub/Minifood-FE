import { putQuotation } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const quotation_id = Number(searchParams.get('quotation_id') || '');
    const product_id = Number(searchParams.get('product_id') || '');
    const body = await req.json();

    const data = await putQuotation(body, quotation_id, product_id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
