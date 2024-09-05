export const ADMIN_TEXT = ['거래처', ' 상품', '견적서', '공지사항', 'FAQ'];

export const OPTION_TEXT = [
  '거래처 명으로 조회',
  '거래처 지역으로 조회',
  '옵션을 선택해 주세요',
  '물건 견적서 파일 업로드',
  '분류 별 물품 조회',
  '물품 추가 생성', // 5
  '야채 물품 가격 직접 변경',
  '야채 물품 가격 엑셀 파일로 변경',
];

export const INPUT_TEXT = [
  '시작 날짜',
  '종료 날짜',
  '특이사항 입력',
  '거래처 명',
  '물품 번호',
  '제목', // 5
  '내용',
  '공지사항 id',
  '종료 날짜의 모든 견적서 excel 파일로 추출',
  'FAQ id',
];

export const BTN_TEXT = [
  '실행',
  '삭제',
  '생성',
  '수정',
  '검색',
  '취소', // 5
  '저장',
  '작성',
  '조회',
];

export const TABLE_TEXT = [
  '번호',
  '이름',
  '생성일',
  '수정일',
  '상태',
  '가격', // 5
  '지역',
  '주소',
  '분류',
  '단위',
  'excel로 추출', // 10
  '주문내역',
  '특이사항',
  '추출',
];

export const ALERT_TEXT = [
  '모든 입력 필드를 채워주세요.',
  '해당 거래처의 지역이 변경되었습니다.',
  '특이사항이 저장되었습니다.',
  '지역을 선택해주세요.',
  '파일을 선택해주세요.',
  '정상적으로 제출되었습니다.', // 5
  '접근 권한이 없습니다.',
  '가격이 변경되었습니다.',
  '파일이 성공적으로 업로드되었습니다.',
  '파일 업로드 중 오류가 발생했습니다.',
  '물품이 생성되었습니다.',
];

export const REGION_TEXT = [
  '지역 선택',
  '노원',
  '의정부',
  '강남',
  '건대',
  '신촌',
];

export const CATEGORY_TEXT = ['분류 선택', '냉동', '냉장', '공산', '채소'];

export const FAQ_CATEGORY = ['분류 선택', '상품', '배송', '결제'];

export const DIALOG_TEXT = [
  '삭제시 복구는 불가능합니다',
  '공지사항을 삭제하시겠습니까?',
  '거래처를 삭제하시겠습니까?',
];

export const clientStatusMapping: { [key: string]: string } = {
  COMPLETED: '제출됨',
  CREATED: '생성-미제출',
  NONE: '미제출',
};

export const mapCategoryToEnglish: { [key: string]: string } = {
  냉동: 'frozen',
  냉장: 'refrigeration',
  공산: 'industrial',
  채소: 'vegetable',
};
