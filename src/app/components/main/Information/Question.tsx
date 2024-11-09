import { AddIcon } from '@/app/ui/iconPath';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import Icons from '../../common/Icons';
import Link from 'next/link';

const Question = () => {
  const [isSelected, setIsSelected] = useState(0);

  const [faqs, setFaqs] = useState<FAQProps[]>([]);
  const preFaqs = faqs && Array.isArray(faqs) ? faqs.slice(0, 3) : [];

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet('/api/admin/faq/get');
      setFaqs(data.result);
    };
    fetchData();
  }, []);

  const filteredFaqs = faqs
    ?.filter((faq) => faq.category === preFaqs[isSelected]?.category)
    .slice(0, 3);

  return (
    <div className="w-[333px] h-40 p-4 py-[18px] rounded-[20px] shadow text-[#333333] overflow-hidden">
      <div className="flex justify-between mb-1 items-center">
        <div className="text-lg font-medium">FAQ</div>
        <Link href="/faq">
          <Icons className="cursor-pointer" name={AddIcon} />
        </Link>
      </div>
      <div className="flex gap-x-3">
        {preFaqs?.map((faq, i) => (
          <Button
            key={faq.id}
            buttonText={faq.category}
            type="faqButton"
            onClickHandler={() => setIsSelected(i)}
            className={isSelected === i ? 'bg-[#24c062]' : 'bg-gray-2'}
          />
        ))}
      </div>
      <div className="mt-1">
        {filteredFaqs?.map((faq) => (
          <div
            key={faq.id}
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {faq.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
