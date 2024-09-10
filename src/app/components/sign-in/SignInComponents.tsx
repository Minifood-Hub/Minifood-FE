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
import { useUserStore } from '@/app/store/useStore';

const REDIRECT_URL = 'http://localhost:3000/sign-in/auth';

export default function SignInComponents() {
  const router = useRouter();

  const [signInState, setSignInState] = useState<SingInState>({
    email: '',
    pwd: '',
  });
  const [errorState, setErrorState] = useState('');

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

  const fetchUser = useUserStore((state) => state.fetchUser);

  const handleBtnClick = async () => {
    const { email, pwd } = signInState;

    if (!email || !pwd) {
      setErrorState(SIGNIN_ERROR[1]);
      return;
    }

    try {
      const responseData = await postLogin({ email, pwd });

      if (responseData.isSuccess) {
        setTokens(
          responseData.result.access_token,
          responseData.result.refresh_token,
        );
        setErrorState('');
        await fetchUser();
        router.push('/');
      } else {
        setErrorState(SIGNIN_ERROR[0]);
      }
    } catch (error) {
      console.error('로그인 에러 : ', error);
      setErrorState(SIGNIN_ERROR[2]);
    }
  };

  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  return (
    <div className="w-full flex-center flex-col gap-8 max-w-[600px]">
      <span className="text-xl font-semibold">{SIGNIN_TEXT[4]}</span>
      <div className="flex flex-col items-end gap-4 self-stretch">
        <SignInInput
          placeholder={SIGNIN_PLACEHOLDER[0]}
          type="email"
          value={signInState.email}
          onChange={(e) => handleInputChange(e, 'email')}
        />

        <SignInInput
          placeholder={SIGNIN_PLACEHOLDER[2]}
          type="password"
          value={signInState.pwd}
          onChange={(e) => handleInputChange(e, 'pwd')}
        />

        <SignInSubTab />
      </div>

      <div className="flex w-[600px] flex-col items-center gap-[10px]">
        {errorState && <p className="text-red-1">{errorState}</p>}

        <SignInButton
          onClick={handleBtnClick}
          type="button"
          text={SIGNIN_TEXT[4]}
        />

        <span className="text-center text-sm leading-5">또는</span>

        <div
          onClick={() => {
            window.location.href = kakaoLink;
          }}
          className="cursor-pointer w-full flex-center"
        >
          <Image
            src="/images/kakao_login.png"
            alt="카카오 로그인"
            width={600}
            height={45}
          />
        </div>
      </div>
    </div>
  );
}
