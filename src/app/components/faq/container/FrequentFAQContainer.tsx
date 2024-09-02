'use client';

import { ArrowRightIcon, SearchIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';
import Input from '../../common/Input';
import { callGet } from '@/app/utils/callApi';
import { useCallback, useEffect, useState } from 'react';
import { FAQ_TEXT, faqCategories } from '@/app/constants/faq';
import DetailFAQ from '../DetailFAQ';
import FAQSideBar from '../FAQSideBar';

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

  const selectContent = (faq_id: number) => {
    setSelectedId((prevId) => (prevId === faq_id ? null : faq_id));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === faqCategories[0] ||
      faq.category === selectedCategory;

    const matchesSearch = faq.question // 사용자의 검색어가 포함된 모든 FAQ출력
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 목록으로 돌아가는 핸들러 추가
  const handleBackToList = () => {
    setSelectedId(null);
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
      <div className="flex items-center gap-[18px]">
        <FAQSideBar
          categories={faqCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex w-full h-[814px] pl-[18px] flex-col items-start gap-6">
          {selectedId ? (
            // FAQ 상세 화면 렌더링
            <DetailFAQ
              item={faqs.find((faq) => faq.id === selectedId)}
              onBack={handleBackToList}
            />
          ) : (
            // FAQ 목록 화면 렌더링
            filteredFaqs.map((item) => (
              <div
                className="flex p-3 justify-between items-center self-stretch rounded bg-white hover:bg-gray-1 cursor-pointer"
                onClick={() => selectContent(item.id)}
                key={item.id}
              >
                <div className="flex w-full justify-between items-center max-w-full overflow-hidden">
                  <div className="flex items-center gap-4">
                    <p className="text-xl font-semibold text-gray-3">Q</p>
                    <span className="text-xl text-gray-4 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.question}
                    </span>
                  </div>
                  <div className="flex items-center text-xs whitespace-nowrap flex-shrink-0">
                    <Icons name={ArrowRightIcon} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
