import { postProduct } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const response = await postProduct(body, req);

  return NextResponse.json(response);
}
