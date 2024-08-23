import { getCookie } from '../utils/setTokens';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const headers = {
  'Content-Type': 'application/json',
};

export const putRequest = async (
  url: string,
  req: Request,
  body: any = null,
) => {
  try {
    const token = getCookie(req, 'accessToken');
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
    const url = `${SERVER_URL}/api/v1/products${product_id}/update`;
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
  req: Request,
) => {
  try {
    const url = `${SERVER_URL}/api/v1/notices/${notice_id}`;
    return await putRequest(url, req, noticeContents);
  } catch (error) {
    console.error(error);
    throw new Error('putAdminNotices 에러 발생');
  }
};

export const putAdminFAQ = async (
  faq_id: string,
  noticeContents: FAQPostTypes,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/faqs/${faq_id}`;
  return await putRequest(url, req, noticeContents);
};
