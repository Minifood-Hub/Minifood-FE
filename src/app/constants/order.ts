export const ORDER_TEXT = [
  '즐겨찾기',
  '검색어를 입력해주세요',
  "상품 검색 후 개수를 입력한 뒤에 '담기'를 눌러주세요.",
  '추가한 상품',
  '주문',
  '삭제',
  '담기',
  '즐겨찾기 추가',
];

export const PRODUCT_TEXT = ['분류', '품번', '품명', '개수', '단위', '담기'];

export const MODAL_TEXT = [
  '주문일자',
  '상품명',
  '개수',
  '총 가격',
  '사진으로 저장',
  '단위',
  '분류',
  '추가적인 문의 사항을 적어주세요',
  '견적서의 내용을 최종적으로 확인한 후 주문 확정을 눌러주세요',
  '주문 확정',
  '번호',
];

export const MODAL_INFO = ['견적서', 'Date', '구매자', '총액'];

export const DIALOG_TEXT = [
  '금일의 견적서가 이미 존재합니다.',
  '견적서가 제출되었습니다.',
  '즐겨찾기 이름을 입력해주세요',
  '거래처가 생성되지 않았습니다.',
  '즐겨찾기 이름을 적어주세요',
  '현재 추가한 상품으로 즐겨찾기가 만들어집니다',
];

export const BUTTON_TEXT = ['이동', '추가', '주문 확정', '닫기'];

export const categoryMapping: { [key: string]: string } = {
  refrigeration: '냉장',
  frozen: '냉동',
  industrial: '공산',
  vegetable: '야채',
};

export const initialOrderState: OrderState = {
  dialog: false,
  showBookmark: false,
  alert: false,
  search: '',
  bookmarkName: '',
  quotation: false,
};
