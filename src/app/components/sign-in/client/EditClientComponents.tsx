'use client';

import { ClientState, ValidationClientType } from '@/app/_types/sign-in';
import {
  clientMapping,
  SIGNIN_TEXT,
  SIGNIN_PLACEHOLDER,
  SIGNUP_BUTTON,
} from '@/app/constants/sign-in';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SignInButton from '../common/SignInButton';
import SignInInput from '../common/SignInInput';
import { useUser } from '@/app/hooks/useUser';

export default function EditClientComponents() {
  const router = useRouter();
  const { user } = useUser();

  const [formState, setFormState] = useState<ClientState>({
    name: '',
    address: '',
    nameError: '',
    addressError: '',
    isBtnActive: false,
  });

  const validateField = (type: ValidationClientType, value: string) => {
    if (!value.trim()) {
      return `${clientMapping[type]}을(를) 입력해주세요.`;
    }
    return '';
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ValidationClientType,
  ) => {
    const { value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [type]: value,
      [`${type}Error`]: validateField(type, value),
    }));
  };

  const handlePutClient = async () => {
    try {
      const body = {
        name: formState.name,
        address: formState.address,
      };
      const response = await fetch(
        `/api/sign-in/client/${user?.result.client_id}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBtnClick = () => {
    const nameError = validateField('name', formState.name);
    const addressError = validateField('address', formState.address);

    if (nameError || addressError) {
      setFormState((prevState) => ({
        ...prevState,
        nameError,
        addressError,
        isBtnActive: false,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        nameError: '',
        addressError: '',
        isBtnActive: true,
      }));
      handlePutClient();
      router.push('/');
    }
  };

  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SIGNIN_TEXT[6]}
        placeholder={SIGNIN_PLACEHOLDER[4]}
        type="text"
        value={formState.name}
        onChange={(e) => handleInputChange(e, 'name')}
        error={!!formState.nameError}
        errorMessage={formState.nameError}
      />
      <SignInInput
        label={SIGNIN_TEXT[7]}
        placeholder={SIGNIN_PLACEHOLDER[5]}
        type="text"
        value={formState.address}
        onChange={(e) => handleInputChange(e, 'address')}
        error={!!formState.addressError}
        errorMessage={formState.addressError}
      />

      <SignInButton
        type="button"
        text={SIGNUP_BUTTON[2]}
        onClick={handleBtnClick}
      />
    </div>
  );
}
