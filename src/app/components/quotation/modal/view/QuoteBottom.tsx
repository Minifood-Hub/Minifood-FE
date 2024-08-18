import { HalfCircleIcon } from '@/app/ui/iconPath';
import Icons from '../../../common/Icons';

const QuoteBottom = () => {
  return (
    <div className="flex gap-x-8">
      {Array.from({ length: 11 }).map((_, index) => (
        <div key={index}>
          <Icons name={HalfCircleIcon} />
        </div>
      ))}
    </div>
  );
};

export default QuoteBottom;
