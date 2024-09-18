import { getCookie } from '@/app/utils/setTokens';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;
const commonHeaders = {
  'Content-Type': 'application/json',
};

const getRequest = async (url: string, req?: Request) => {
  try {
    let token;
    if (req) {
      token = getCookie(req, 'accessToken');
    }

    const headers = token
      ? { ...commonHeaders, 'access-token': token }
      : { ...commonHeaders };

    const response = await fetch(url, { headers });
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

// JSON 형식이 아닌 바이너리 데이터를 처리하는 함수
const getBinaryRequest = async (url: string, req?: Request) => {
  try {
    const headers: Record<string, string> = {};

    // token이 존재하면 access-token 키를 추가

    if (req) {
      const token = getCookie(req, 'accessToken');
      if (token) {
        headers['access-token'] = token;
      }
    }
    const response = await fetch(url, { headers });

    // 응답이 성공적일 경우 처리
    if (response.ok) {
      const contentType = response.headers.get('Content-Type');

      // Content-Type 헤더를 통해 ZIP 파일인지 확인
      if (contentType && contentType.includes('application/zip')) {
        return await response.blob(); // ZIP 파일인 경우 Blob으로 처리
      }

      // ZIP 파일이 아닌 바이너리 데이터도 Blob으로 반환
      return await response.blob();
    }

    throw new Error('binary data fetch 실패');
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

// 내 정보 조회
export const getUsers = async (req: Request) => {
  const url = `${SERVER_URL}/api/v1/users/me`;
  return getRequest(url, req);
};

// 상품 검색
export const getSearchProducts = async (
  { namePrefix, limit }: searchProductsProps,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/products/search/recent?name_prefix=${namePrefix}&limit=${limit}`;
  return getRequest(url, req);
};

// 최근 구매한 물품 리스트 조회
export const getPurchaseRecent = async (req: Request) => {
  const url = `${SERVER_URL}/api/v1/products/search/purchases/recent?limit=100`;
  return getRequest(url, req);
};

// 견적서 정보 조회
export const getQuotations = async (quotation_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}`;
  return getRequest(url, req);
};

// 즐겨찾기 상세 불러오기
export const getPastOrder = async (past_order_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/past-order/${past_order_id}`;
  return getRequest(url, req);
};

// 합계 금액 업데이트
export const getQuotationTotal = async (quotation_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotation_id}/total`;
  return getRequest(url, req);
};

// 거래처 주문 내역 조회(URL 캐시 버스팅 사용)
export const getClientPastOrder = async (client_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/past-order?_t=${Date.now()}`;
  return getRequest(url, req);
};

export const getQuotation = async (
  client_id: string,
  date: string,
  page: string,
  start: string,
  end: string,
  req: Request,
) => {
  const url =
    date === 'all'
      ? `${SERVER_URL}/api/v1/clients/${client_id}/quotations?page=${page}&page_size=10`
      : `${SERVER_URL}/api/v1/clients/${client_id}/quotations/date?date_range_type=${date}&page=${page}&page_size=10${
          start && end ? `&start_date=${start}&end_date=${end}` : ''
        }`;
  return getRequest(url, req);
};

export const getQuotationDetail = async (quotationId: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/quotations/${quotationId}`;
  return getRequest(url, req);
};

// ===== 관리자 =====
// 모든 거래처 조회
export const getAdminClientAll = async (req: Request) => {
  const url = `${SERVER_URL}/api/v1/clients/all?_t=${Date.now()}`;
  return getRequest(url, req);
};

// 거래처 명으로 조회
export const getAdminClientName = async (name: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/clients/name/${name}?_t=${Date.now()}`;
  return getRequest(url, req);
};

// 거래처 지역으로 조회
export const getAdminClientRegion = async (region: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/clients/region?region=${region}`;
  return getRequest(url, req);
};

// 거래처 견적서 조회
export const getAdminClientQuotations = async (
  client_id: string,
  page: string,
  page_size: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/quotations?page=${page}&page_size=${page_size}`;
  return getRequest(url, req);
};

// 거래처 견적서 기간에 따른 조회
export const getAdminClientQuotationsDate = async (
  client_id: string,
  date_range_type: string,
  start_date: string,
  end_date: string,
  page: string,
  page_size: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/quotations/date?date_range_type=${date_range_type}&start_date=${start_date}&end_date=${end_date}&page=${page}&page_size=${page_size}`;
  return getRequest(url, req);
};

// 거래처 주문 내역 조회
export const getAdminClientPastOrder = async (
  client_id: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/past-order`;
  return getRequest(url, req);
};

// 거래처 해당 날짜 견적서 제출 여부 파악
export const getAdminClientCheck = async (
  client_id: string,
  input_date: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/check?input_date=${input_date}`;
  return getRequest(url, req);
};

// 분류 별 물품 조회
export const getAdminProductsCategory = async (
  category: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/products/${category}?_t=${Date.now()}`;
  return getRequest(url, req);
};

// 견적서 정보 조회
export const getAdminQuotationsInfo = async (
  start: string,
  end: string,
  query: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/quotations/search/info?start=${start}&end=${end}&query=${query}`;
  return getRequest(url, req);
};

// 견적서 excel 파일로 추출
export const getAdminQuotationsExtract = async (
  quotation_id: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/quotations/extract/${quotation_id}`;
  return getBinaryRequest(url, req);
};

// 오늘 날짜의 모든 견적서 excel 파일로 추출
export const getAdminQuotationsExtractsToday = async (
  input_date: string,
  req: Request,
) => {
  const url = `${SERVER_URL}/api/v1/quotations/extracts/today?input_date=${input_date}`;
  return getBinaryRequest(url, req);
};

// 모든 공지사항 조회
export const getAdminNotices = async () => {
  const url = `${SERVER_URL}/api/v1/notices?_t=${Date.now()}`;
  return getRequest(url);
};

// 공지사항 조회
export const getAdminNoticesId = async (notice_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/notices/${notice_id}?_t=${Date.now()}`;
  return getRequest(url, req);
};

// FAQ 조회
export const getFAQ = async () => {
  const url = `${SERVER_URL}/api/v1/faqs?_t=${Date.now()}`;
  return getRequest(url);
};

// FAQ 상세조회
export const getFAQId = async (faq_id: string) => {
  const url = `${SERVER_URL}/api/v1/faqs/${faq_id}?_t=${Date.now()}`;
  return getRequest(url);
};

// 최근 견적서 조회
export const getRecentQuotation = async (client_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/clients/${client_id}/recent/purchase`;
  return getRequest(url, req);
};

// 일별 견적서 통계 조회
export const getDailyQuotation = async () => {
  const url = `${SERVER_URL}/api/v1/statistics/daily-quotation-totals`;
  return getRequest(url);
};

export const getProducts = async (req: Request) => {
  const url = `${SERVER_URL}/api/v1/custom-products`;
  return getRequest(url, req);
};

export const getProductDetail = async (product_id: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/custom-products/${product_id}`;
  return getRequest(url, req);
};

export const getCheckPassword = async (password: string, req: Request) => {
  const url = `${SERVER_URL}/api/v1/users/me/password/check?password=${password}`;
  return getRequest(url, req);
};
