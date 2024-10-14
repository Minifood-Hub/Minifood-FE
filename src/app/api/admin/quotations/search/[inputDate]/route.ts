import { getAdminInputDateQuotation } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { inputDate: string } },
): Promise<NextResponse> {
  try {
    const { inputDate } = params;
    const data = await getAdminInputDateQuotation(inputDate, req);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
