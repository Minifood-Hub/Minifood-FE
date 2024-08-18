'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInButton from './common/SignInButton';
import SignInInput from './common/SignInInput';
import SignInSubTab from './SignInSubTab';
import { SingInState, ValidationType } from '@/app/_types/sign-in';
import { postLogin } from '@/app/service/postRequest';
import {
  SIGNIN_ERROR,
  SIGNIN_PLACEHOLDER,
  SIGNIN_TEXT,
} from '@/app/constants/sign-in';
import { setTokens } from '@/app/utils/setTokens';
import Image from 'next/image';

const REDIRECT_URL = 'http://localhost:3000/sign-in/auth';

export default function SignInComponents() {
  const router = useRouter();

  const [signInState, setSignInState] = useState<SingInState>({
    email: '',
    pwd: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ValidationType,
  ) => {
    const { value } = e.target;
    setSignInState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleBtnClick = async () => {
    const { email, pwd } = signInState;

    if (!email || !pwd) {
      alert(SIGNIN_ERROR[1]);
      return;
    }

    try {
      const responseData = await postLogin({ email, pwd });
      if (responseData.isSuccess) {
        setTokens(responseData.result.access_token);
        router.push('/');
      } else {
        alert(SIGNIN_ERROR[0]);
      }
    } catch (error) {
      console.error('로그인 에러 : ', error);
      alert(SIGNIN_ERROR[2]);
    }
  };

  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  console.log('카카오링크', kakaoLink);

  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SIGNIN_TEXT[0]}
        placeholder={SIGNIN_PLACEHOLDER[0]}
        type="email"
        value={signInState.email}
        onChange={(e) => handleInputChange(e, 'email')}
      />

      <SignInInput
        label={SIGNIN_TEXT[2]}
        placeholder={SIGNIN_PLACEHOLDER[2]}
        type="password"
        value={signInState.pwd}
        onChange={(e) => handleInputChange(e, 'pwd')}
      />

      <SignInButton
        onClick={handleBtnClick}
        type="button"
        text={SIGNIN_TEXT[4]}
      />

      <div
        onClick={() => {
          window.location.href = kakaoLink;
        }}
        className="cursor-pointer w-full flex-center"
      >
        <Image
          src="/images/kakao_login_medium_wide.png"
          alt="카카오 로그인"
          width={300}
          height={45}
        />
      </div>

      <SignInSubTab />
    </div>
  );
}
