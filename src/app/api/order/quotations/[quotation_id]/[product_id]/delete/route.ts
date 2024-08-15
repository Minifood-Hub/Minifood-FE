import { deleteQuotationProduct } from '@/app/service/deleteRequest';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { quotation_id: string; product_id: string } },
): Promise<NextResponse> {
  try {
    const { quotation_id, product_id } = params;

    const data = await deleteQuotationProduct(quotation_id, product_id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
