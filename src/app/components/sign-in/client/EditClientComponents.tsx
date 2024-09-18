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
import { useUserStore } from '@/app/store/useStore';
import { Dialog } from '../../common/Dialog';
import Button from '../../common/Button';
import AddressModal from './AddressModal';

export default function EditClientComponents() {
  const router = useRouter();
  const { user } = useUser();
  const fetchUser = useUserStore((state) => state.fetchUser);

  const [formState, setFormState] = useState<ClientState>({
    name: '',
    address: '',
    detail: '',
    nameError: '',
    addressError: '',
    isBtnActive: false,
  });
  const [dialog, setDialog] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

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
        address: `${formState.address} ${formState.detail}`,
      };
      const response = await fetch(
        `/api/sign-in/client/${user?.result?.client_id}/update`,
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

  const handleBtnClick = async () => {
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
      // 서버 처리 시간을 고려한 지연 추가
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      await fetchUser();
      setDialog((prev) => !prev);
    }
  };
  const handleAddressSelect = (address: string) => {
    setFormState((prevState) => ({
      ...prevState,
      address,
      addressError: validateField('address', address),
    }));
    setIsAddressModalOpen(false); // 주소 모달 닫기
  };

  return (
    <div className="w-full flex-center flex-col gap-8 max-w-[600px]">
      <span className="text-xl font-semibold">{SIGNIN_TEXT[13]}</span>
      <div className="flex flex-col items-start gap-8 self-stretch">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex items-start font-semibold">
            <p>{SIGNIN_TEXT[6]}</p> <p className="text-[#FC4C00]">*</p>
            {formState.nameError && (
              <p className="text-[#FC4C00] pl-3">{formState.nameError}</p>
            )}
          </div>
          <SignInInput
            placeholder={SIGNIN_PLACEHOLDER[4]}
            type="text"
            value={formState.name}
            onChange={(e) => handleInputChange(e, 'name')}
            error={!!formState.nameError}
          />
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex items-start font-semibold">
            <p>{SIGNIN_TEXT[7]}</p> <p className="text-[#FC4C00]">*</p>
            {formState.addressError && (
              <p className="text-[#FC4C00] pl-3">{formState.addressError}</p>
            )}
          </div>
          <div className="flex items-center gap-2 self-stretch">
            <SignInInput
              className="w-full"
              placeholder={SIGNIN_PLACEHOLDER[5]}
              type="text"
              value={formState.address}
              onChange={(e) => handleInputChange(e, 'address')}
              error={!!formState.addressError}
              onFocus={() => setIsAddressModalOpen(true)}
            />

            <Button
              type="default"
              className="max-w-fit h-14 py-3 px-6 flex-center rounded bg-primary-3 text-white text-lg font-medium"
              buttonType="button"
              buttonText={SIGNUP_BUTTON[7]}
              onClickHandler={() => setIsAddressModalOpen(true)}
            />
          </div>

          <SignInInput
            className="w-full"
            placeholder={SIGNIN_PLACEHOLDER[7]}
            type="text"
            value={formState.detail}
            onChange={(e) => handleInputChange(e, 'detail')}
            error={!!formState.addressError}
          />
        </div>
      </div>

      <SignInButton
        type="button"
        text={SIGNUP_BUTTON[2]}
        onClick={handleBtnClick}
      />

      {isAddressModalOpen && (
        <AddressModal
          onSelectAddress={handleAddressSelect}
          onClose={() => setIsAddressModalOpen(false)}
        />
      )}

      {dialog && (
        <Dialog
          topText={SIGNIN_TEXT[14]}
          BtnText={SIGNUP_BUTTON[5]}
          onBtnClick={() => router.push('/')}
        />
      )}
    </div>
  );
}
