import { PERSONAL_TEXT, PERSONAL_TITLE } from '@/app/constants/personal';

const PersonalContainer = () => {
  return (
    <div className="w-full flex flex-col items-center p-8">
      <div className="text-3xl font-medium py-8">{PERSONAL_TITLE}</div>
      <div className=" p-4 flex w-[85%] max-w-[1230px] text-sm font-light border-2 border-zinc-300 whitespace-pre-line mb-10">
        {PERSONAL_TEXT}
      </div>
    </div>
  );
};

export default PersonalContainer;
