'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInButton from '../common/SignInButton';
import SignInInput from '../common/SignInInput';
import {
  emailRegex,
  passwordRegex,
  SIGNIN_PLACEHOLDER,
  SIGNIN_TEXT,
  SIGNUP_BUTTON,
  SIGNUP_ERROR,
} from '@/app/constants/sign-in';
import { SignUpState, ValidationType } from '@/app/_types/sign-in';
import { callPost } from '@/app/utils/callApi';

export default function SignUpComponents() {
  const router = useRouter();

  const [formState, setFormState] = useState<SignUpState>({
    email: '',
    pwd: '',
    pwdConfirm: '',
    emailError: '',
    pwdError: '',
    pwdConfirmError: '',
  });

  const validateField = (
    type: ValidationType,
    value: string,
    password?: string,
  ) => {
    switch (type) {
      case 'email':
        if (!emailRegex.test(value)) {
          return { isValid: false, error: SIGNUP_ERROR[0] };
        }
        return { isValid: true, error: '' };
      case 'pwd':
        if (!passwordRegex.test(value)) {
          return {
            isValid: false,
            error: SIGNUP_ERROR[1],
          };
        }
        return { isValid: true, error: '' };
      case 'pwdConfirm':
        if (value !== password) {
          return { isValid: false, error: SIGNUP_ERROR[2] };
        }
        return { isValid: true, error: '' };

      default:
        return { isValid: false, error: '' };
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ValidationType,
  ) => {
    const { value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleBtnClick = async () => {
    const { email, pwd, pwdConfirm } = formState;

    const emailValidation = validateField('email', email);
    const pwdValidation = validateField('pwd', pwd);
    const pwdConfirmValidation = validateField('pwdConfirm', pwdConfirm, pwd);

    if (
      emailValidation.isValid &&
      pwdValidation.isValid &&
      pwdConfirmValidation.isValid
    ) {
      try {
        const responseData = await callPost('/api/sign-in/sign-up', {
          email,
          password: pwd,
        });

        if (responseData.code === 4003) {
          alert('이미 존재하는 사용자입니다.');
          return;
        }

        if (responseData.isSuccess) {
          router.push('/sign-in');
        } else {
          setFormState((prevState) => ({
            ...prevState,
            emailError: responseData.message,
          }));
        }
      } catch (error) {
        console.error('오류가 발생했습니다.');
      }
    } else {
      setFormState((prevState) => ({
        ...prevState,
        emailError: emailValidation.error,
        pwdError: pwdValidation.error,
        pwdConfirmError: pwdConfirmValidation.error,
      }));
    }
  };

  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SIGNIN_TEXT[0]}
        placeholder={SIGNIN_PLACEHOLDER[0]}
        type="email"
        value={formState.email}
        onChange={(e) => handleInputChange(e, 'email')}
        error={!!formState.emailError}
        errorMessage={formState.emailError}
      />
      <SignInInput
        label={SIGNIN_TEXT[2]}
        placeholder={SIGNIN_PLACEHOLDER[1]}
        type="password"
        value={formState.pwd}
        onChange={(e) => handleInputChange(e, 'pwd')}
        error={!!formState.pwdError}
        errorMessage={formState.pwdError}
      />
      <SignInInput
        label={SIGNIN_TEXT[3]}
        placeholder={SIGNIN_PLACEHOLDER[2]}
        type="password"
        value={formState.pwdConfirm}
        onChange={(e) => handleInputChange(e, 'pwdConfirm')}
        error={!!formState.pwdConfirmError}
        errorMessage={formState.pwdConfirmError}
      />

      <SignInButton
        type="button"
        text={SIGNUP_BUTTON[0]}
        onClick={handleBtnClick}
      />
    </div>
  );
}
