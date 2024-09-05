import { getCookie } from '../utils/setTokens';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const headers = {
  'Content-Type': 'application/json',
};

export const putRequest = async (
  url: string,
  req?: Request,
  body: any = null,
) => {
  try {
    let token;
    if (req) {
      token = getCookie(req, 'accessToken');
    }
    const response = await fetch(url, {
      method: 'PUT',
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

// 거래처 수정
export const putUpdateClient = async (
  clientContents: any,
  client_id: string,
  req: Request,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/clients/${client_id}/update`;
    return await putRequest(url, req, clientContents);
  } catch (error) {
    console.error('에러 : ', error);
    throw new Error('putUpdateClient 에러 발생');
  }
};

export const putQuotation = async (
  quantity: number,
  quotation_id: number,
  product_id: number,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/${product_id}`;
  return putRequest(url, req, quantity);
};

export const putPastOrder = async (
  pastorder_id: number,
  pastOrderData: PastOrder,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/past-order/${pastorder_id}/update`;
  return putRequest(url, req, pastOrderData);
};

// ===== 관리자 =====
// 물품 수정
export const putUpdateProducts = async (
  productContents: any,
  product_id: string,
  req: Request,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/products/${product_id}/update`;
    return await putRequest(url, req, productContents);
  } catch (error) {
    console.error(error);
    throw new Error('putUpdateProducts 에러 발생');
  }
};

// 공지사항 수정
export const putAdminNotices = async (
  notice_id: string,
  noticeContents: any,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/notices/${notice_id}`;
    return await putRequest(url, undefined, noticeContents);
  } catch (error) {
    console.error(error);
    throw new Error('putAdminNotices 에러 발생');
  }
};

// FAQ 수정
export const putAdminFAQ = (faq_id: string, noticeContents: FAQPostTypes) => {
  const url = `${SERVER_URL}/api/v1/faqs/${faq_id}`;
  return putRequest(url, undefined, noticeContents);
};

export const putProduct = async (
  product_id: string,
  product: ProductTypes,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/custom-products/${product_id}/update`;
  return putRequest(url, req, product);
};

export const putPassword = async (
  passwords: ChangePasswordTypes,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/users/me/password`;
  return putRequest(url, req, passwords);
};
