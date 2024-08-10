// 오늘 날짜의 모든 견적서 excel 파일로 추출

import { getAdminQuotationsExtractsToday } from '@/app/service/getRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const input_date = url.searchParams.get('input_date') || '';

    const data = await getAdminQuotationsExtractsToday(input_date);

    // Blob 타입의 데이터를 ArrayBuffer로 변환하여 바이너리 데이터를 얻음
    const fileBuffer = await data.arrayBuffer();
    const file = new Uint8Array(fileBuffer); // Uint8Array로 변환

    // 원본 파일의 이름을 서버에서 받아옴
    const contentDisposition = data.type; // 서버에서 넘어온 Content-Disposition 헤더 사용

    // NextResponse 객체를 생성하여 클라이언트로 파일을 전송
    return new NextResponse(file, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': contentDisposition, // 서버에서 받은 파일 이름을 그대로 사용
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
