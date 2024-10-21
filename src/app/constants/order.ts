export const ORDER_TEXT = [
  '즐겨찾기',
  '검색어를 입력해주세요',
  "상품을 검색하고 개수를 입력한 뒤에 '담기' 버튼을 눌러주세요.",
  '추가한 상품',
  '주문하기',
  '삭제', // 5
  '담기',
  '즐겨찾기 추가',
  '검색된 상품이 없습니다.',
  '추가된 상품이 아직 없습니다.',
  '최근 주문내역',
];

export const PRODUCT_TEXT = ['분류', '품번', '품명', '단위', '개수', '담기'];

export const MODAL_TEXT = [
  '주문목록',
  '번호',
  '상품명',
  '단위',
  '단가',
  '수량', // 5
  '가격',
  '문의사항',
  '거래명세표의 내용을 최종적으로 확인한 후 주문 확정을 눌러주세요',
  '주문 확정',
  '번호',
];

export const MODAL_INFO = [
  'Minifood 거래명세표',
  '상점정보',
  '판매자상호',
  '상업자등록번호',
  '주소',
  '주문목록', // 5
  '합계',
  '총 수량',
];

export const DIALOG_TEXT = [
  '해당 날짜의 거래명세표가 이미 존재합니다.',
  '거래명세표가 제출되었습니다.',
  '즐겨찾기 이름을 입력해주세요',
  '거래처가 생성되지 않았습니다.',
  '즐겨찾기 이름을 적어주세요',
  '현재 추가한 상품으로 즐겨찾기가 만들어집니다', // 5
  '세션이 만료되었습니다. 다시 로그인해주세요.',
  '거래명세표를 최종적으로 확정하시겠습니까?',
];

export const BUTTON_TEXT = [
  '이동',
  '추가',
  '주문 확정',
  '닫기',
  '주문 시작하기',
  '확정', // 5
];

export const categoryMapping: { [key: string]: string } = {
  refrigeration: '냉장',
  frozen: '냉동',
  industrial: '공산',
  vegetable: '야채',
};

export const initialEditOrderState = {
  bookmark: false,
  showBookmark: false,
  search: '',
  bookmarkName: '',
  quotation: false,
  dialog: false,
  currentDate: '',
};
