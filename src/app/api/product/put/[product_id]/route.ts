import { putProduct } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const product_id = searchParams.get('product_id') || '0';
  const body = await req.json();

  const data = await putProduct(product_id, body, req);
  return NextResponse.json(data);
}
