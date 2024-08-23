import { putAdminFAQ } from '@/app/service/putRequest';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { faq_id: string } },
): Promise<NextResponse> {
  const { faq_id } = params;
  const body = await req.json();
  
  const response = await putAdminFAQ(faq_id, body, req);
  return NextResponse.json(response, { status: 200 });
}
