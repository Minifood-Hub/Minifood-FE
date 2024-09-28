'use client';

import { DELETE_PASTORDER } from '@/app/constants/pastorder';
import Button from '../../common/Button';

interface DeletePastorderModalProps {
  closeModal: () => void;
  deletePastorder: () => void;
}
const DeletePastorderModal = ({
  closeModal,
  deletePastorder,
}: DeletePastorderModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex-center z-50">
      <div className="flex flex-col items-center w-[420px] h-[162px] rounded bg-white p-8 gap-y-8">
        <p className="text-lg font-medium">{DELETE_PASTORDER[0]}</p>
        <div className="flex gap-x-6">
          <Button
            buttonText={DELETE_PASTORDER[1]}
            type="deleteModalButton"
            onClickHandler={deletePastorder}
            className="bg-red-2 text-white"
          />
          <Button
            buttonText={DELETE_PASTORDER[2]}
            type="deleteModalButton"
            onClickHandler={closeModal}
            className="bg-white border border-gray-1"
          />
        </div>
      </div>
    </div>
  );
};

export default DeletePastorderModal;
