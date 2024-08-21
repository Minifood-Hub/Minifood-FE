import { deleteQuoteProduct } from '@/app/service/deleteRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { searchParams } = new URL(req.url);
    const quotation_id = searchParams.get('quotation_id') || '';
    const product_id = searchParams.get('product_id') || '';

    const data = await deleteQuoteProduct(quotation_id, product_id, token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
