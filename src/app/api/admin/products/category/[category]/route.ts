// 분류 별 물품 조회

import { getAdminProductsCategory } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { category: string } },
): Promise<NextResponse> {
  try {
    const { category } = params;
    const data = await getAdminProductsCategory(category, req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
