import { getClientPastOrder } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const clientId = params.client_id;
    const data = await getClientPastOrder(clientId, req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
