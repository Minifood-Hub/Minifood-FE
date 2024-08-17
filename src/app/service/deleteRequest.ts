const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;

const commonHeaders = {
  'Content-Type': 'application/json',
};

const deleteRequest = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: commonHeaders,
    });
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const deleteQuotation = async (id: string) => {
  const url = `${SERVER_URL}/api/v1/quotations/${id}/delete`;
  return deleteRequest(url);
};

// 견적서 물품 삭제
export const deleteQuoteProduct = async (
  quotation_id: string,
  product_id: string,
) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/${product_id}/delete`;
  return deleteRequest(url);
};

export const deletePastOrder = async (pastorder_id: string) => {
  const url = `${SERVER_URL}/api/v1/past-order/${pastorder_id}/delete`;
  return deleteRequest(url);
};


// ===== 관리자 =====
// 거래처 삭제
export const deleteAdminClient = async (client_id: string) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/delete`;
  return deleteRequest(url);
};

// 물품 삭제
export const deleteAdminProducts = async (product_id: string) => {
  const url = `${SERVER_URL}/api/v1/products/${product_id}/delete`;
  return deleteRequest(url);
};
