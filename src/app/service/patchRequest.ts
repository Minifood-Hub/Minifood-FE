const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const patchRequest = async (url: string) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`patch 데이터 fetch 실패: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`Response data: ${JSON.stringify(data)}`);
  return data;
};

// 견적서 작성 확정
export const patchQuotationConfirm = async ({
  quotation_id,
}: quotationIdProps) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/confirmation`;
    return await patchRequest(url);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchQuotationConfirm 에러 발생');
  }
};

// 견적서 특이사항 작성
export const patchQuotationParticulars = async ({
  quotation_id,
  particulars,
}: patchQuotationPartiProps) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/particulars?particulars=${particulars}`;
    return await patchRequest(url);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchQuotationParticulars 에러 발생');
  }
};

// ===== 관리자 =====
// 거래처 지역 선택
export const patchAdminClientRegion = async (
  client_id: string,
  region: string,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/clients/${client_id}/region?region=${region}`;
    return await patchRequest(url);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchAdminClientRegion 에러 발생');
  }
};

// 거래처 특이사항 작성
export const patchAdminClientComment = async (
  client_id: string,
  input_comment: string,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/clients/${client_id}/comment?input_comment=${input_comment}`;
    return await patchRequest(url);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchAdminClientComment 에러 발생');
  }
};

// 야채 물품 가격 직접 변경
export const patchAdminProductsVegetable = async (
  product_id: string,
  price: string,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/products/${product_id}/vegetable?price=${price}`;
    return await patchRequest(url);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchAdminProductsVegetable 에러 발생');
  }
};

// 야채 물품 가격 엑셀 파일로 변경
export const patchAdminProductsVegetableFile = async (file: File) => {
  try {
    const url = `${SERVER_URL}/api/v1/products/vegetable/file`;
    const formData = new FormData();
    formData.append('file', file); // FormData 객체에 파일 추가

    const response = await fetch(url, {
      method: 'PATCH',
      body: formData, // 요청 본문에 파일 데이터를 포함 FormData 객체 사용
    });

    const responseText = await response.text(); // 응답 본문을 텍스트로 읽음
    console.log('서버 응답 :', response.status, responseText);

    if (!response.ok) {
      throw new Error(`서버 응답 오류: ${response.status} ${responseText}`);
    }

    return JSON.parse(responseText); // 응답 데이터를 JSON으로 파싱하여 반환
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('patchAdminProductsVegetableFile 에러 발생');
  }
};
