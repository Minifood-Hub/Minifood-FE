export const QUOTATION_VIEW = ['견적서 조회'];

export const QUOTATION_VIEWTYPE = ['전체', '주간', '월간', '날짜'];

export const QUOTATION_TRANS_VIEWTYPE: Record<string, CheckTypes> = {
  전체: 'all',
  주간: 'week',
  월간: 'month',
  날짜: 'custom',
};

export const VIEW_QUOTATION_GRAPH = [
  '번호',
  '주문일자',
  '견적서 이름',
  '확정 여부',
];

export const QUOTATION_MANAGE = ['조회', '수정', '삭제', '확인', '저장'];

export const QUOTATION_DELETE = [
  '견적서를 삭제하시겠습니까?',
  '삭제시 복구는 불가능합니다',
  '삭제',
  '취소',
];
