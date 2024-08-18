import { leftAngle, rightAngle } from '@/app/ui/iconPath';
import ReactPaginate from 'react-paginate';
import Icons from './Icons';

interface PaginationProps {
  totalPages: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      className="flex items-center justify-center h-[40px] w-full gap-3 text-base text-[#999] font-normal"
      previousLabel={
        <div className="ml-4">
          <Icons name={leftAngle} />
        </div>
      }
      nextLabel={
        <div className="mr-4">
          <Icons name={rightAngle} />
        </div>
      }
      pageCount={totalPages}
      onPageChange={onPageChange}
      activeClassName="active text-[#5A0] font-semibold"
    />
  );
};

export default Pagination;
