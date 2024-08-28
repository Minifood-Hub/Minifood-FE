import { getCookie } from '@/app/utils/setTokens';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const headers = {
  'Content-Type': 'application/json',
};

export const postRequest = async (
  url: string,
  body: any = null,
  req?: Request,
) => {
  try {
    let token;
    if (req) {
      token = getCookie(req, 'accessToken');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        ...(token && { 'access-token': token }),
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('요청 실패');
  }
};

// 로그인 요청
export const postLogin = async (signInContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/token`;
    const params = new URLSearchParams();
    params.append('username', signInContents.email);
    params.append('password', signInContents.pwd);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('로그인 요청 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postLogin 에러 발생');
  }
};

// user 가입
export const postSignUp = async (signUpContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/users`;
    return await postRequest(url, signUpContents);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postSignUp 에러 발생');
  }
};

// 거래처 생성
export const postClient = async (clientContents: any, req: Request) => {
  try {
    const url = `${SERVER_URL}/api/v1/clients`;
    return await postRequest(url, clientContents, req);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postClient 에러 발생');
  }
};

// 주문 내역 생성
export const postPastOrder = async (pastOrderContents: any, req: Request) => {
  try {
    const url = `${SERVER_URL}/api/v1/past-order`;
    return await postRequest(url, pastOrderContents, req);
  } catch (error) {
    console.error('에러 :', error);
    throw new Error('postPastOrder 에러 발생');
  }
};

// 견적서 생성
export const postQuotations = async (quotationContents: any, req: Request) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations`;
    return await postRequest(url, quotationContents, req);
  } catch (error) {
    console.error('에러 :', error);
    throw new Error('postQuotations 에러 발생');
  }
};

// 견적서 물품 생성
export const postQuotationsProducts = async (
  quotationContents: any,
  req: Request,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/quotations/products`;
    return await postRequest(url, quotationContents, req);
  } catch (error) {
    console.error('에러 :', error);
    throw new Error('postQuotationsProducts 에러 발생');
  }
};

// ===== 관리자 =====
// 물건 견적서 파일 업로드
export const postAdminProductsUpload = async (file: File, req: Request) => {
  try {
    const url = `${SERVER_URL}/api/v1/products/upload`;
    const formData = new FormData();
    formData.append('file', file);

    const token = getCookie(req, 'accessToken');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(token && { 'access-token': token }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('에러 상세 정보:', error);
    throw new Error('postAdminProductUpload 에러 발생');
  }
};

// 물품 추가 생성
export const postAdminProducts = async (
  productsContents: any,
  req: Request,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/products`;
    return await postRequest(url, productsContents, req);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postAdminProducts 에러 발생');
  }
};

// 공지사항 생성
export const postAdminNotices = async (noticeContents: any) => {
  try {
    const url = `${SERVER_URL}/api/v1/notices`;
    return await postRequest(url, noticeContents);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('postAdminNotices 에러 발생');
  }
};

// FAQ 생성
export const postAdminFAQ = (faqContents: FAQPostTypes) => {
  const url = `${SERVER_URL}/api/v1/faqs`;
  return postRequest(url, faqContents);
};
