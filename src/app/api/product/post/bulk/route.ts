import { postProductBulk } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const response = await postProductBulk(body, req);

  return NextResponse.json(response);
}
