export async function callPost(endpoint: string, body: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  return response.json();
}

export async function callPatch(endpoint: string, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url, {
    method: 'PATCH',
  });

  return response.json();
}

export async function callGet(endpoint: string, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url);
  return response.json();
}

export async function callDelete(endpoint: string, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });
  return response.json();
}

export async function callPut(endpoint: string, body: any, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
}

export async function callGetBinary(endpoint: string, params?: string) {
  const url = params
    ? `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}?${params}`
    : `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('binary data fetch 실패');
  }

  // 서버 응답의 Content-Type과 Content-Disposition 헤더를 가져옴
  const contentType = response.headers.get('Content-Type') || '';
  const contentDisposition = response.headers.get('Content-Disposition') || '';

  // Content-Disposition 헤더에서 파일 이름을 추출
  const filenameMatch = contentDisposition.match(/filename="(.+?)"/);
  let filename = filenameMatch ? filenameMatch[1] : 'downloaded_file.xlsx';

  // ZIP 파일의 경우 파일 이름 확장자를 .zip으로 변경
  if (contentType.includes('application/zip')) {
    filename = filenameMatch ? filenameMatch[1] : 'downloaded_file.zip';
  }

  // 응답 본문을 binary data를 다루기 위한 Blob 객체로 변환
  const blob = await response.blob();

  // Blob 객체를 URL로 변환하여 브라우저에서 다운로드할 수 있는 링크를 생성
  const file_url = window.URL.createObjectURL(blob);
  const a = document.createElement('a'); // 다운로드 링크를 생성하기 위해 a태그를 동적으로 생성
  a.href = file_url; // Blob URL을 링크의 href 속성에 설정
  a.download = filename; // 서버에서 넘어온 파일 이름 그대로 사용

  // a 태그를 문서의 body에 추가하고, 클릭 이벤트를 트리거하여 다운로드를 시작
  document.body.appendChild(a);
  a.click();
  a.remove(); // 다운 후 a 태그를 문서에서 제거
}

export async function callPostFile(endpoint: string, formData: FormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}${endpoint}`,
    {
      method: 'POST',
      body: formData, // 요청 본문에 파일 데이터를 포함
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP callPostFile 에러 : ${response.status}`);
  }

  return response.json(); // JSON 형식으로 응답 데이터 반환
}
