import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 알림의 속성을 지정합니다 따로 원하는 크기 혹은 속성이 있는 경우 따로 추가
const commonOptions: any = {
  theme: 'light',
  closeOnClick: true,
  autoClose: 1800,
  position: 'top-center',
  style: { fontSize: 16, color: 'black', fontFamily: 'Pretendard' },
};

// theme: 색상테마 라이트, 다크버전 존재
// closeOnClick : 알림 클릭 시 닫힐지 여부
// autoClose : 자동 알림 삭제 시간
// position : 알림 위치
// style : 개별 style 속성
// 나머지 속성들은 toastify 공식문서 참고 바랍니다!

const testAlert = () => {
  toast.info('테스트 알림입니다!', {
    icon: () => '🔑',
    ...commonOptions,
  });
};
const testAlert2 = () => {
  toast.error('테스트 알림입니다2!', {
    ...commonOptions,
  });
};

/*
위와 같이 원하는 알림 속성 지정 후 아래 export에 해당 알림 이름 등록
success, info, error, warning, warn;
icon엔 알림창 옆에 표시될 이모지를 입력해줍니다 미입력시 toast속성에 맞는 기본 이모지가 들어갑니다.
총 다음과 같은 toast 속성이 존재하며 속성에 따라 알림 progressbar 및 메인 색상이 달라집니다.
*/

export { testAlert, testAlert2 };
