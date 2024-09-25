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
import { Dialog } from '../../common/Dialog';

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
  const [dialog, setDialog] = useState(false);

  // 유효성 검사
  const validateField = (
    type: ValidationType,
    value: string,
    password?: string,
  ) => {
    switch (type) {
      case 'email': // 이메일
        if (!emailRegex.test(value)) {
          return { isValid: false, error: SIGNUP_ERROR[0] };
        }
        return { isValid: true, error: '' };
      case 'pwd': // 비밀번호
        if (!passwordRegex.test(value)) {
          return {
            isValid: false,
            error: SIGNUP_ERROR[1],
          };
        }
        return { isValid: true, error: '' };
      case 'pwdConfirm': // 비밀번호 확인
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

    setFormState((prevState) => ({
      ...prevState,
      emailError: emailValidation.error,
      pwdError: pwdValidation.error,
      pwdConfirmError: pwdConfirmValidation.error,
    }));

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

        if (responseData.isSuccess) {
          setDialog((prev) => !prev);
        } else {
          setFormState((prevState) => ({
            ...prevState,
            emailError: responseData.message,
          }));
        }
      } catch (error) {
        console.error('오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="w-full flex-center flex-col gap-8 max-w-[600px]">
      <span className="text-xl font-semibold">{SIGNIN_TEXT[5]}</span>
      <div className="flex flex-col items-start gap-8 self-stretch">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex items-start font-semibold">
            <p>{SIGNIN_TEXT[8]}</p> <p className="text-red-2">*</p>
            {formState.emailError && (
              <p className="text-red-2 pl-3">{formState.emailError}</p>
            )}
          </div>
          <SignInInput
            placeholder={SIGNIN_PLACEHOLDER[0]}
            type="email"
            value={formState.email}
            onChange={(e) => handleInputChange(e, 'email')}
            error={!!formState.emailError}
          />
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex items-start font-semibold">
            <p>{SIGNIN_TEXT[2]}</p> <p className="text-red-2">*</p>
            {formState.pwdError && (
              <p className="text-red-2 pl-3">{formState.pwdError}</p>
            )}
          </div>
          <SignInInput
            placeholder={SIGNIN_PLACEHOLDER[1]}
            type="password"
            value={formState.pwd}
            onChange={(e) => handleInputChange(e, 'pwd')}
            error={!!formState.pwdError}
          />
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex items-start font-semibold">
            <p>{SIGNIN_TEXT[3]}</p> <p className="text-red-2">*</p>
            {formState.pwdConfirmError && (
              <p className="text-red-2 pl-3">{formState.pwdConfirmError}</p>
            )}
          </div>
          <SignInInput
            placeholder={SIGNIN_PLACEHOLDER[6]}
            type="password"
            value={formState.pwdConfirm}
            onChange={(e) => handleInputChange(e, 'pwdConfirm')}
            error={!!formState.pwdConfirmError}
          />
        </div>
      </div>

      <SignInButton
        type="button"
        text={SIGNUP_BUTTON[0]}
        onClick={handleBtnClick}
      />
      {dialog && (
        <Dialog
          topText={SIGNIN_TEXT[9]}
          subText={SIGNIN_TEXT[10]}
          BtnText={SIGNUP_BUTTON[4]}
          onBtnClick={() => router.push('/sign-in')}
        />
      )}
    </div>
  );
}
