import { putUpdateClient } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { client_id: string } },
): Promise<NextResponse> {
  try {
    const { client_id } = params;
    const body = await req.json();

    const response = await putUpdateClient(body, client_id, req);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
