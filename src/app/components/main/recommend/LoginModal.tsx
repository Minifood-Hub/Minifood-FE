'use client';
import { MAIN_MODAL_TEXT } from '@/app/constants/main';
import { useRouter } from 'next/navigation';
import Button from '../../common/Button';

interface LoginModalProps {
  closeModal: () => void;
}

const LoginModal = ({ closeModal }: LoginModalProps) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex justify-center items-center z-50">
      <div className="w-[300px] h-[193px] flex-center gap-y-8 flex-col bg-white rounded">
        <div className="flex flex-col items-center text-xl font-semibold">
          <p>{MAIN_MODAL_TEXT[0]}</p>
          <p>{MAIN_MODAL_TEXT[1]}</p>
        </div>
        <div className="flex gap-x-4">
          <Button
            buttonText={MAIN_MODAL_TEXT[3]}
            type="modalClose"
            onClickHandler={closeModal}
          />
          <Button
            buttonText={MAIN_MODAL_TEXT[2]}
            type="modalLogin"
            onClickHandler={() => router.push('sign-in')}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
