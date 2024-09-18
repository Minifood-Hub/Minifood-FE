import { getProducts } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const data = await getProducts(req);
  return NextResponse.json(data);
}
