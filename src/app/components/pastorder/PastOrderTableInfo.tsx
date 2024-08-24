import { QUOTATION_MANAGE } from '@/app/constants/quotation';
import { useModal } from '@/app/hooks/useModal';
import { callDelete } from '@/app/utils/callApi';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import DeletePastorderModal from './modal/DeletePastorderModal';

interface PastOrderTableInfoProps {
  pastorder: PastOrder;
  index: number;
}

const PastOrderTableInfo = ({ pastorder, index }: PastOrderTableInfoProps) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal, handleModalClick } = useModal(false);

  const deletePastOrder = (id: number) => {
    callDelete(`/api/past-order/delete?pastorder_id=${id}`);
    window.location.reload();
  };

  return (
    <div key={pastorder.past_order_id}>
      {isOpen && (
        <DeletePastorderModal
          closeModal={closeModal}
          deletePastorder={() => deletePastOrder(pastorder.past_order_id)}
        />
      )}
      <div className="w-full pl-1 justify-start items-center inline-flex h-[53px] text-base font-normal border-b border-b-[#E0E0E0]">
        <div className="w-[9.5%] text-center">{index + 1}</div>
        <div className="w-[65.5%] text-center">{pastorder.name}</div>
        <div className="flex gap-x-[10%] px-[5%] flex-grow">
          <Button
            buttonText={QUOTATION_MANAGE[0]}
            type="quoteTableControl"
            onClickHandler={() => console.log('여긴 조회')}
            className="border border-[#e0e0e0]"
          />
          <Button
            buttonText={QUOTATION_MANAGE[1]}
            type="quoteTableControl"
            onClickHandler={() =>
              router.push(`quotation/edit/${pastorder.past_order_id}`)
            }
            className="border border-[#e0e0e0]"
          />
          <Button
            buttonText={QUOTATION_MANAGE[2]}
            type="quoteTableControl"
            onClickHandler={openModal}
            className="bg-[#fc4c00] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PastOrderTableInfo;
