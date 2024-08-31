import {
  OrderIcon,
  ProductsIcon,
  QuotationIcon,
  SelectedOrderIcon,
  SelectedProductsIcon,
  SelectedQuotationIcon,
  SelectedStarIcon,
  StarIcon,
} from '@/app/ui/iconPath';

export const HEADER_TEXT = ['주문생성', '즐겨찾기', '견적서', '상품조회'];

export const HEADER_PATH = ['/order', '/pastorder', '/quotation', '/product'];

export const HEADER_PATH_GUEST = [
  '/sign-in',
  '/sign-in',
  '/sign-in',
  '/product',
];

export const HEADER_PROFILE = [
  '거래처 생성',
  '거래처 조회',
  '거래처 수정',
  '거래처 미생성',
  '로그아웃',
];

export const HEADER_SIGNUP = ['회원가입', '로그인'];

export const HEADER_SIGNUP_PATH = ['/sign-in/sign-up', '/sign-in'];

export const FOOTER_TEXT = [
  '이용약관',
  '개인정보처리방침',
  '책임의 한계와 법적고지 ',
  '고객센터',
  'JMF',
  'Copyright',
  '©JMF Corp.',
  'All Rights Reserved',
  'Contributors',
];

export const CONTRIBUTORS = ['YPYP', 'KimGorok', 'Minkyu'];

export const SIDENAV_TEXT = ['주문생성', '즐겨찾기', '견적서', '상품조회'];

export const SIDENAV_ICONS = [OrderIcon, StarIcon, QuotationIcon, ProductsIcon];

export const SELECTED_SIDENAV_ICONS = [
  SelectedOrderIcon,
  SelectedStarIcon,
  SelectedQuotationIcon,
  SelectedProductsIcon,
];

export const SIDENAV_PATH = ['/order', '/pastorder', '/quotation', '/product'];

export const DAYS_OF_WEEEK = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
  '일요일',
];

export const DAYS_OF_WEEK_SHORTEN = ['월', '화', '수', '목', '금', '토', '일'];
