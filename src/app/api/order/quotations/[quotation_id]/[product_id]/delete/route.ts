// 견적서 물품 삭제

import { deleteQuoteProduct } from '@/app/service/deleteRequest';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { quotation_id: string; product_id: string } },
): Promise<NextResponse> {
  try {
    const { quotation_id, product_id } = params;

    const data = await deleteQuoteProduct(quotation_id, product_id, req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
