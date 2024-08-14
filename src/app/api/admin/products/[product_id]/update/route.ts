// 물품 수정

import { putUpdateProducts } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { product_id: string } },
): Promise<NextResponse> {
  try {
    const { product_id } = params;
    console.log(product_id);
    const body = await req.json();

    const response = await putUpdateProducts(body, product_id);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
