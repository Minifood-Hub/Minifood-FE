import { putPassword } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(req: Request): Promise<NextResponse> {
  const body = await req.json();

  const data = await putPassword(body, req);
  return NextResponse.json(data);
}
