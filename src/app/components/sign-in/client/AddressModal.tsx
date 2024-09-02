import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import Button from '../../common/Button';
import { SIGNUP_BUTTON } from '@/app/constants/sign-in';

interface AddressModalProps {
  onSelectAddress: (address: string) => void;
  onClose: () => void;
}

export default function AddressModal({
  onSelectAddress,
  onClose,
}: AddressModalProps) {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    // data.addressType이 R(도로명 주소)일 경우 추가 주소 정보 처리
    if (data.addressType === 'R') {
      // data.bname(법정동 명칭)이 빈 문자열이 아닐 경우
      if (data.bname !== '') {
        // extraAddress 변수에 법정동 명칭을 추가
        extraAddress += data.bname;
      }

      // data.buildingName(건물 명칭)이 빈 문자열이 아닐 경우
      if (data.buildingName !== '') {
        // extraAddress에 이미 법정동 명칭이 있으면 ', 건물명칭' 형식으로 추가
        // 그렇지 않으면 그냥 건물 명칭만 추가
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    onSelectAddress(fullAddress);
  };

  return (
    <div className="fixed inset-0 flex-center z-50 bg-black bg-opacity-30">
      <div className="flex w-[686px] h-auto p-12 flex-col items-end rounded bg-white shadow-xl">
        <DaumPostcode
          style={{ height: '512px', width: '100%' }}
          onComplete={handleComplete}
        />
        <Button
          type="default"
          onClickHandler={onClose}
          className="max-w-fit mt-8 px-6 py-2 bg-primary-3 text-white rounded"
          buttonText={SIGNUP_BUTTON[6]}
        />
      </div>
    </div>
  );
}
