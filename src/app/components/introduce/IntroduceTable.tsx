import {
  INTRODUCE_DETAIL_KEY,
  INTRODUCE_DETAIL_VALUE,
} from '@/app/constants/introduce';

const IntroduceTable = () => {
  return (
    <div className="flex flex-col w-full pb-10">
      {INTRODUCE_DETAIL_KEY.map((text, i) => (
        <div className="flex w-full border-b-2 border-[##e5e5e5]" key={text}>
          <div className="flex-center w-[180px] h-[60px] bg-[#E0E0E0]">
            {text}
          </div>
          <div className="flex items-center px-4">
            {INTRODUCE_DETAIL_VALUE[i]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntroduceTable;
