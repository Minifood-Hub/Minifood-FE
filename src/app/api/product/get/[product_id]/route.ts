import { getProductDetail } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { product_id: string } },
): Promise<NextResponse> {
  const { product_id } = params;
  const data = await getProductDetail(product_id, req);
  return NextResponse.json(data);
}
