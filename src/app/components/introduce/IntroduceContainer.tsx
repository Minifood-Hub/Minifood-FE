import {
  INTRODUCE_DETAIL,
  INTRODUCE_INFO,
  INTRODUCE_TEXT,
  INTRODUCE_TITLE,
} from '@/app/constants/introduce';
import IntroduceTable from './IntroduceTable';

const IntroduceContainer = () => {
  return (
    <div className="w-full flex flex-col items-center px-[13.5%] py-10">
      <div className="text-3xl font-medium py-8">{INTRODUCE_TITLE}</div>
      <div className="w-full flex flex-col mt-8">
        <div className="text-2xl font-medium py-4">{INTRODUCE_INFO}</div>
        <div className="w-full border-b-2 border-[#333333]" />
        <div className="text py-8">
          <p>{INTRODUCE_TEXT[0]}</p>
          <p>{INTRODUCE_TEXT[1]}</p>
        </div>
        <div className="text-2xl font-medium py-4">{INTRODUCE_DETAIL}</div>
        <div className="w-full border-b-2 border-[#333333]" />
        <IntroduceTable />
      </div>
    </div>
  );
};

export default IntroduceContainer;
