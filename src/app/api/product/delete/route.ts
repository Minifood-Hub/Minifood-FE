// 주문내역 삭제

import { deleteProduct } from '@/app/service/deleteRequest';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const product_id = searchParams.get('product_id') || '';

  const data = await deleteProduct(product_id, req);
  return NextResponse.json(data);
}
