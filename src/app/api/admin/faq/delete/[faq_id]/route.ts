import { deleteAdminNotices } from '@/app/service/deleteRequest';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { faq_id: string } },
): Promise<NextResponse> {
  try {
    const { faq_id } = params;
    const data = await deleteAdminNotices(faq_id, req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('Internal Server Error');
  }
}
