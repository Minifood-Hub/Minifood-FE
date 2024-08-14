import { deleteQuoteProduct } from '@/app/service/deleteRequest';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const quotation_id = Number(searchParams.get('quotation_id') || '');
    const product_id = Number(searchParams.get('product_id') || '');

    const data = await deleteQuoteProduct(quotation_id, product_id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
