import { getCheckPassword } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get('password') || '';

  const encodedPwd = encodeURIComponent(password);

  const data = await getCheckPassword(encodedPwd, req);
  return NextResponse.json(data);
}
