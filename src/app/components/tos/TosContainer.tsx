import { TERMS_OF_USE, TOS_TITLE } from '@/app/constants/tos';

const TosContainer = () => {
  return (
    <div className="w-full flex flex-col items-center p-8">
      <div className="text-3xl font-medium py-8">{TOS_TITLE}</div>
      <div className=" p-4 flex w-[85%] max-w-[1230px] text-sm font-light border-2 border-zinc-300 whitespace-pre-line">
        {TERMS_OF_USE}
      </div>
    </div>
  );
};

export default TosContainer;
