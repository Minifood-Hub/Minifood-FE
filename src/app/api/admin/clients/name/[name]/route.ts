// 거래처 명으로 조회

import { getAdminClientName } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { name: string } },
): Promise<NextResponse> {
  try {
    const { name } = params;
    const data = await getAdminClientName(name);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
