import { deletePastOrder } from '@/app/service/deleteRequest';
import { getCookie } from '@/app/utils/setTokens';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const token = getCookie(req, 'accessToken');
    const { searchParams } = new URL(req.url);
    const pastorder_id = searchParams.get('pastorder_id') || '';

    const data = await deletePastOrder(pastorder_id, token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
