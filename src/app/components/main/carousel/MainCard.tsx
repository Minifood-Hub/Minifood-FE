import { CUSTOM_MAINCARD_TEXT } from '@/app/constants/custom';

function MainCard() {
  return (
    <div className="flex flex-col w-full h-[360px] rounded-[4px] bg-gradient-to-t from-[#fee3c7] to-[#f7d4b4]">
      <p>{CUSTOM_MAINCARD_TEXT[0].firstline}</p>
      <p>{CUSTOM_MAINCARD_TEXT[1].secondlinre}</p>
    </div>
  );
}

export default MainCard;
