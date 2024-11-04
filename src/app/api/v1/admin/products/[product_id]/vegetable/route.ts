// 야채 물품 가격 직접 변경

import { patchAdminProductsVegetable } from '@/app/service/patchRequest';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { product_id: string } },
): Promise<NextResponse> {
  try {
    const { product_id } = params;
    const { searchParams } = new URL(req.url);
    const price = searchParams.get('price') || '';

    const data = await patchAdminProductsVegetable(product_id, price, req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
