import { getPastOrder } from '@/app/service/getRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { past_order_id: string } },
): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { past_order_id } = params;
    const data = await getPastOrder(past_order_id, token);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
