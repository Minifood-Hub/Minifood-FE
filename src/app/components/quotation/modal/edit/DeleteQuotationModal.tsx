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
    <div className="fixed top-0 left-0 w-full h-full bg-gray-3 bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex-center flex-col w-[680px] h-[268px] rounded-[60px] bg-white">
        <div className="flex text-4xl font-bold text-[#306317]">
          {QUOTATION_DELETE[0]}
        </div>
        <div className="flex gap-x-7 mt-[52px]">
          <Button
            buttonText={QUOTATION_DELETE[1]}
            type="modalButton"
            onClickHandler={closeModal}
            className="bg-[#55aa00]"
          />
          <Button
            buttonText={QUOTATION_DELETE[2]}
            type="modalButton"
            onClickHandler={deleteQuote}
            className="bg-[#cf360c]"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteQuotationModal;
