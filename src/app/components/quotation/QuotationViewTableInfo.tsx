import { QUOTATION_MANAGE } from '@/app/constants/quotation';
import { useModal } from '@/app/hooks/useModal';
import { callDelete } from '@/app/utils/callApi';
import { formatDate } from '@/app/utils/date';
import { formatPrice } from '@/app/utils/formatPrice';
import { useRouter } from 'next/navigation';
import DeleteQuotationModal from './modal/DeleteQuotationModal';
import QuotationModal from './modal/QuotationModal';

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
      <div className="w-full pl-1 justify-start items-center gap-x-[20px] inline-flex h-[48px] text-lg">
        <div className="w-[108px] text-center">{index + 1}</div>
        <div className="w-[200px] text-center">
          {formatDate(quoteView.created_at)}
        </div>
        <div className="w-[250px] text-center">
          {formatDate(quoteView.updated_at)}
        </div>
        <div className="w-[170px] text-center">
          {formatPrice(quoteView.total_price)}원
        </div>
        <div
          className="w-[42px] text-center cursor-pointer font-bold"
          onClick={openModal}
        >
          {QUOTATION_MANAGE[0]}
        </div>
        <div
          className="w-[42px] text-center cursor-pointer font-bold text-primary-4"
          onClick={() => router.push(`quotation/edit/${quoteView.id}`)}
        >
          {QUOTATION_MANAGE[1]}
        </div>
        <div
          className="w-[42px] text-center cursor-pointer font-bold text-red-1"
          onClick={openDeleteModal}
        >
          {QUOTATION_MANAGE[2]}
        </div>
      </div>
      <div className="w-full h-[0px] border border-black" />
    </div>
  );
};

export default QuotationViewTableInfo;
