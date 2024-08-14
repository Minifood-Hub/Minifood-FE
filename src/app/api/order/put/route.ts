import { putPastOrder } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const pastorder_id = Number(searchParams.get('pastorder_id') || '');
    const body = await req.json();

    const data = await putPastOrder(pastorder_id, body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
