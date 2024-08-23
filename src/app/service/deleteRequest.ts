import { getCookie } from '../utils/setTokens';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const commonHeaders = {
  'Content-Type': 'application/json',
};

const deleteRequest = async (url: string, req: Request) => {
  try {
    const token = getCookie(req, 'accessToken');
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...commonHeaders, ...(token && { 'access-token': token }) },
    });
    return await response.json();
  } catch (err) {
    throw err;
  }
};

// 견적서 삭제
export const deleteQuotation = async (id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/quotations/${id}/delete`;
  return deleteRequest(url, req);
};

// 견적서 물품 삭제
export const deleteQuoteProduct = async (
  quotation_id: string,
  product_id: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/${product_id}/delete`;
  return deleteRequest(url, req);
};

// 주문 내역 삭제
export const deletePastOrder = async (pastorder_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/past-order/${pastorder_id}/delete`;
  return deleteRequest(url, req);
};

// ===== 관리자 =====
// 거래처 삭제
export const deleteAdminClient = async (client_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/delete`;
  return deleteRequest(url, req);
};

// 물품 삭제
export const deleteAdminProducts = async (product_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/products/${product_id}/delete`;
  return deleteRequest(url, req);
};

// 공지사항 삭제
export const deleteAdminNotices = async (notice_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/notices/${notice_id}`;
  return deleteRequest(url, req);
};
