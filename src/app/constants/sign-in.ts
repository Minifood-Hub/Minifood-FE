export const SIGNIN_TEXT = [
  '이메일',
  '비밀번호 변경',
  '비밀번호',
  '비밀번호 확인',
  '로그인',
  '회원가입',
  '거래처명',
  '거래처 주소',
];

export const SIGNIN_PLACEHOLDER = [
  'user@example.com',
  '영문, 숫자, 특수기호를 포함하는 6자 이상의 비밀번호를 입력해주세요.',
  '********',
  '지역명을 입력해주세요 예)인천 부평구, 성남시 수정구',
  '거래처명을 정확히 입력해주세요.',
  '거래처 주소를 정확히 입력해주세요.',
];

export const SIGNIN_ERROR = [
  '이메일 혹은 비밀번호를 확인해주세요.',
  '이메일과 비밀번호를 입력해주세요.',
  '오류가 발생했습니다. 잠시후 다시 시도해주세요.',
];

export const SIGNUP_ERROR = [
  '유효하지 않은 이메일 형식입니다.',
  '영문, 숫자, 특수기호를 포함하는 6자 이상의 비밀번호를 입력해주세요.',
  '비밀번호가 일치하지 않습니다.',
];

export const SIGNUP_BUTTON = ['가입', '생성', '수정', '삭제'];

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+])[A-Za-z\d!@#$%^&*()\-=_+]{6,}$/;

export const clientMapping: { [key: string]: string } = {
  region: '지역',
  name: '거래처명',
  address: '거래처주소',
};
