'use client';

import { QUOTATION_DELETE } from '@/app/constants/quotation';
import Button from '../../../common/Button';

interface DeleteQuotationModalProps {
  closeModal: () => void;
  deleteQuote: () => void;
}
const DeleteQuotationModal = ({
  closeModal,
  deleteQuote,
}: DeleteQuotationModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex-center z-50">
      <div className="flex flex-col items-center w-[420px] h-[187px] rounded bg-white p-8 gap-y-2">
        <p className="text-lg font-medium">{QUOTATION_DELETE[0]}</p>
        <p className="text-sm font-normal">{QUOTATION_DELETE[1]}</p>
        <div className="flex gap-x-6 mt-6">
          <Button
            buttonText={QUOTATION_DELETE[2]}
            type="deleteModalButton"
            onClickHandler={deleteQuote}
            className="bg-[#FC4C00] text-white"
          />
          <Button
            buttonText={QUOTATION_DELETE[3]}
            type="deleteModalButton"
            onClickHandler={closeModal}
            className="bg-white border border-[#E0E0E0]"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteQuotationModal;
