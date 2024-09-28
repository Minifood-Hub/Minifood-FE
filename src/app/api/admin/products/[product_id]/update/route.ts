// 물품 수정

import { putUpdateProducts } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { product_id: string } },
): Promise<NextResponse> {
  try {
    const { product_id } = params;
    const body = await req.json();

    const response = await putUpdateProducts(body, product_id, req);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
