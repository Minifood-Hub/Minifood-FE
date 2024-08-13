export const ADMIN_TEXT = ['거래처', ' 상품', '견적서'];

export const OPTION_TEXT = [
  '거래처 명으로 조회',
  '거래처 견적서 조회',
  '거래처 견적서 기간에 따른 조회',
  '거래처 주문 내역 조회',
  '거래처 해당 날짜 견적서 제출 여부 파악',
  '거래처 지역 선택',
  '거래처 특이사항 작성',
  '거래처 삭제',
  '거래처 지역으로 조회',
  '옵션을 선택해 주세요',
  '물건 견적서 파일 업로드',
  '분류 별 물품 조회',
  '물품 수정',
  '물품 추가 생성',
  '물품 삭제',
  '야채 물품 가격 직접 변경',
  '야채 물품 가격 엑셀 파일로 변경',
  '견적서 정보 조회',
  '견적서 excel 파일로 추출',
  '오늘 날짜의 모든 견적서 excel 파일로 추출',
];

export const INPUT_TEXT = [
  '거래처 id',
  '거래처 아이디 입력',
  '페이지',
  '페이지 크기',
  '시작 날짜',
  '종료 날짜',
  '날짜 입력',
  '특이사항 입력',
  '거래처 명',
  '물품 번호',
  '',
  '',
  '',
  '',
  '견적서 id',
];

export const BTN_TEXT = ['실행', '삭제'];

export const TABLE_TEXT = [
  '번호',
  '이름',
  '생성일',
  '수정일',
  '상태',
  '가격',
  '지역',
  '주소',
  '분류',
  '단위',
];

export const ALERT_TEXT = [
  '모든 입력 필드를 채워주세요.',
  '해당 거래처의 지역이 변경되었습니다.',
  '특이사항이 저장되었습니다.',
  '거래처가 삭제되었습니다.',
  '지역을 선택해주세요.',
];

export const REGION_TEXT = [
  '지역을 선택해주세요',
  '노원',
  '의정부',
  '강남',
  '건대',
  '신촌',
];

export const CATEGORY_TEXT = ['냉동', '냉장', '공산', '채소'];

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
