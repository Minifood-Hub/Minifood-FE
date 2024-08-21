// 물품 삭제

import { deleteAdminProducts } from '@/app/service/deleteRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { product_id: string } },
): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { product_id } = params;

    const data = await deleteAdminProducts(product_id, token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
