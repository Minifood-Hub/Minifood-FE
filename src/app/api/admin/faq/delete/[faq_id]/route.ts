import { deleteAdminFAQ } from '@/app/service/deleteRequest';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { faq_id: string } },
): Promise<NextResponse> {
  try {
    const { faq_id } = params;

    const data = await deleteAdminFAQ(faq_id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('인터넷 서버 에러');
  }
}
