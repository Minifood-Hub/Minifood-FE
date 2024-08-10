'use client';
import { FAQ_TEXT } from '@/app/constants/main';
import { AddIcon } from '@/app/ui/iconPath';
import { useState } from 'react';
import Button from '../../common/Button';
import Icons from '../../common/Icons';

const Question = () => {
  const [isSelected, setIsSelected] = useState(0);
  return (
    <div className="w-[333px] h-40 px-4 py-[18px] rounded-[20px] shadow text-[#333333]">
      <div className="flex justify-between mb-4 items-center">
        <div className="text-lg font-medium">FAQ</div>
        <Icons name={AddIcon} />
      </div>
      <div className="flex gap-x-3">
        {FAQ_TEXT.map((text, i) => (
          <Button
            buttonText={text}
            type={'faqButton'}
            onClickHandler={() => setIsSelected(i)}
            className={isSelected === i ? 'bg-[#24c062]' : 'bg-[#b8b8b8]'}
          />
        ))}
      </div>
      <div className='mt-4'>상한 음식이 배송됐어요 어디에 문의하나요?</div>
    </div>
  );
};

export default Question;
