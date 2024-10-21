import { getUsers } from '@/app/service/getRequest';

import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const data = await getUsers(req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '인터넷 서버 에러' }, { status: 500 });
  }
}
