'use client';

import { AddIcon } from '@/app/ui/iconPath';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import Icons from '../../common/Icons';

const Question = () => {
  const [isSelected, setIsSelected] = useState(0);

  const [faqs, setFaqs] = useState<FAQProps[]>([]);
  const preFaqs = faqs.slice(0, 3);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet('/api/admin/faq/get');
      setFaqs(data.result);
    };
    fetchData();
  }, []);

  return (
    <div className="w-[333px] h-40 px-4 py-[18px] rounded-[20px] shadow text-[#333333]">
      <div className="flex justify-between mb-4 items-center">
        <div className="text-lg font-medium">FAQ</div>
        <Icons name={AddIcon} />
      </div>
      <div className="flex gap-x-3">
        {preFaqs.map((faq, i) => (
          <Button
            key={faq.id}
            buttonText={faq.category}
            type="faqButton"
            onClickHandler={() => setIsSelected(i)}
            className={isSelected === i ? 'bg-[#24c062]' : 'bg-[#b8b8b8]'}
          />
        ))}
      </div>
      <div className="mt-4">{faqs[0] && faqs[0].question}</div>
    </div>
  );
};

export default Question;
