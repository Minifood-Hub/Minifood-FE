import { postAdminFAQ } from '@/app/service/postRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const response = await postAdminFAQ(body, req);

  return NextResponse.json(response, { status: 200 });
}
