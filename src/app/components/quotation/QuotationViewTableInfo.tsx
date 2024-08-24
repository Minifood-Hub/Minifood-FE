import { QUOTATION_MANAGE } from '@/app/constants/quotation';
import { useModal } from '@/app/hooks/useModal';
import { callDelete } from '@/app/utils/callApi';
import { formatDate } from '@/app/utils/date';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import DeleteQuotationModal from './modal/edit/DeleteQuotationModal';
import QuotationModal from './modal/view/QuotationModal';

interface QuotationViewTableInfoProps {
  quoteView: QuotationViewInfoTypes;
  index: number;
}

const QuotationViewTableInfo = ({
  quoteView,
  index,
}: QuotationViewTableInfoProps) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal, handleModalClick } = useModal(false);
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal(false);

  const deleteQuotation = (id: number) => {
    callDelete(`/api/quotation/delete?id=${id}`);
    window.location.reload();
  };

  return (
    <div key={quoteView.id}>
      {isOpen && <QuotationModal closeModal={closeModal} id={quoteView.id} />}
      {isDeleteModalOpen && (
        <DeleteQuotationModal
          closeModal={closeDeleteModal}
          deleteQuote={() => deleteQuotation(quoteView.id)}
        />
      )}
      <div className="w-full pl-1 justify-start items-center inline-flex h-[53px] text-base font-normal border-b border-b-[#E0E0E0]">
        <div className="w-[10.4%] text-center">{index + 1}</div>
        <div className="w-[32%] text-center">
          {formatDate(quoteView.created_at)}
        </div>
        <div className="w-[32%] text-center">{quoteView.name}</div>
        <div className="flex gap-x-[10%] px-[5%] flex-grow">
          <Button
            buttonText={QUOTATION_MANAGE[0]}
            type="quoteTableControl"
            onClickHandler={openModal}
            className="border border-[#e0e0e0]"
          />
          <Button
            buttonText={QUOTATION_MANAGE[1]}
            type="quoteTableControl"
            onClickHandler={() => router.push(`quotation/edit/${quoteView.id}`)}
            className="border border-[#e0e0e0]"
          />
          <Button
            buttonText={QUOTATION_MANAGE[2]}
            type="quoteTableControl"
            onClickHandler={openDeleteModal}
            className="bg-[#fc4c00] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default QuotationViewTableInfo;
