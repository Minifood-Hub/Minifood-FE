import { RECOMMEND_TEXT } from '@/app/constants/main';

import CardSwiper from './CardSwiper';

function Recommend() {
  return (
    <div className="w-[1088px] h-[530px] flex flex-col items-center gap-y-6">
      <div className="text-[28px] font-medium">{RECOMMEND_TEXT[0]}</div>
      <CardSwiper />
    </div>
  );
}

export default Recommend;
