const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const commonHeaders = {
  'Content-Type': 'application/json',
};

const deleteRequest = async (url: string, token?: string) => {
  try {
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
export const deleteQuotation = async (id: string, token: string) => {
  const url = `${SERVER_URL}/api/v1/quotations/${id}/delete`;
  return deleteRequest(url, token);
};

// 견적서 물품 삭제
export const deleteQuoteProduct = async (
  quotation_id: string,
  product_id: string,
  token: string,
) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/${product_id}/delete`;
  return deleteRequest(url, token);
};

// 주문 내역 삭제
export const deletePastOrder = async (pastorder_id: string, token: string) => {
  const url = `${SERVER_URL}/api/v1/past-order/${pastorder_id}/delete`;
  return deleteRequest(url, token);
};

// ===== 관리자 =====
// 거래처 삭제
export const deleteAdminClient = async (client_id: string, token: string) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/delete`;
  return deleteRequest(url, token);
};

// 물품 삭제
export const deleteAdminProducts = async (
  product_id: string,
  token: string,
) => {
  const url = `${SERVER_URL}/api/v1/products/${product_id}/delete`;
  return deleteRequest(url, token);
};

// 공지사항 삭제
export const deleteAdminNotices = async (notice_id: string, token: string) => {
  const url = `${SERVER_URL}/api/v1/notices/${notice_id}`;
  return deleteRequest(url, token);
};
