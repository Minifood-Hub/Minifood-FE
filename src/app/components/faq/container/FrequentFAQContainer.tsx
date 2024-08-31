'use client';

import { ArrowDownIcon, SearchIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';
import Input from '../../common/Input';
import { callGet } from '@/app/utils/callApi';
import { useCallback, useEffect, useState } from 'react';
import { formatDate } from '@/app/utils/date';
import { FAQ_TEXT, faqCategories } from '@/app/constants/faq';

export default function FrequentFAQContainer() {
  const [faqs, setFaqs] = useState<FAQProps[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    faqCategories[0],
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleGetFAQ = useCallback(async () => {
    try {
      const data = await callGet(`/api/admin/faq/get`);
      setFaqs(data.result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleGetFAQ();
  }, []);

  const toggleContent = (faq_id: number) => {
    setSelectedId((prevId) => (prevId === faq_id ? null : faq_id));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === faqCategories[0] ||
      faq.category === selectedCategory;

    const matchesSearch = faq.question // 사용자가 입력한 검색어가 포함된 FAQ 출력
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full h-full flex-shrink-0 px-[195px]">
      <p className="w-full text-center text-xl font-semibold pt-11">
        {FAQ_TEXT[0]}
      </p>
      <div className="mt-5 px-6 flex justify-between items-center rounded border-[1px] bg-gray-0 border-gray-0 focus-within:border-gray-7 focus-within:border-2">
        <Input
          type="default"
          className="w-full py-3 bg-gray-0 focus:outline-none placeholder:text-gray-3"
          onChange={handleSearchChange}
          placeholder={FAQ_TEXT[1]}
          textValue={searchTerm}
        />
        <Icons name={SearchIcon} />
      </div>
      <div className="mt-[31px] mb-12 flex w-40 h-[814px] py-6 px-[18px] flex-col gap-[18px] rounded-lg bg-gray-0">
        <div className="flex w-[124px] flex-col items-start gap-[18px]">
          {faqCategories.map((category) => (
            <div
              key={category}
              className={`flex w-full p-3 items-center rounded ${
                selectedCategory === category
                  ? 'bg-primary-3 text-white'
                  : 'bg-gray-0 text-gray-7'
              } text-center text-lg font-semibold cursor-pointer`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {filteredFaqs.map((item) => (
        <div
          className="flex flex-col w-full px-4 py-2 border-[1px] border-gray-7"
          key={item.id}
        >
          <div
            className="flex w-full justify-between items-center cursor-pointer max-w-full overflow-hidden"
            onClick={() => toggleContent(item.id)}
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <p className="text-gray-2 flex-shrink-0">{item.id}</p>
              <p className="text-gray-7">{item.category} |</p>
              <span className="font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                {item.question}
              </span>
            </div>
            <div className="flex gap-2 items-center text-xs whitespace-nowrap flex-shrink-0">
              <p>{formatDate(item.updated_at || item.created_at)}</p>
              <p
                className={`${selectedId === item.id ? 'transform rotate-180' : ''}`}
              >
                <Icons name={ArrowDownIcon} />
              </p>
            </div>
          </div>
          {selectedId === item.id && (
            <div className="mt-4 p-4 bg-gray-0 rounded-md">
              <p className="text-gray-7">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
