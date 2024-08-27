'use client';

import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { callPost } from '@/app/utils/callApi';
import { ALERT_TEXT, BTN_TEXT, FAQ_CATEGORY } from '@/app/constants/admin';
import { useRouter } from 'next/navigation';

export default function FAQPost() {
  const router = useRouter();
  const [faq, setFAQ] = useState({
    category: '',
    question: '',
    answer: '',
  });

  const handlePostFAQ = async () => {
    if (
      !faq.category ||
      faq.category === '분류 선택' ||
      !faq.question ||
      !faq.answer
    ) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callPost(`/api/admin/faq/post`, faq);
      alert(ALERT_TEXT[6]);
      window.location.reload();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 border-2 p-8 w-full">
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="flex flex-col w-1/2 gap-2">
          <p className="font-bold">카테고리</p>
          <select
            className="border-2 w-full py-2 px-4"
            value={faq.category}
            onChange={(e) => setFAQ({ ...faq, category: e.target.value })}
          >
            {FAQ_CATEGORY.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-1/2 gap-2">
          <p className="font-bold">질문</p>
          <Input
            className="border-2 w-full py-2 px-4"
            onChange={(e) => setFAQ({ ...faq, question: e.target.value })}
            textValue={faq.question}
            placeholder="질문"
            type="default"
          />
        </div>

        <div className="flex flex-col w-1/2 gap-2">
          <p className="font-bold">답변</p>
          <textarea
            value={faq.answer}
            className="border-2 w-full min-h-44 py-2 px-4"
            onChange={(e) => setFAQ({ ...faq, answer: e.target.value })}
            placeholder="답변"
          />
        </div>

        <div className="flex flex-col w-1/2">
          <Button
            className="bg-primary-3 text-white font-bold max-w-fit px-8 py-2 self-end"
            buttonText={BTN_TEXT[2]}
            type="default"
            onClickHandler={handlePostFAQ}
          />
        </div>
      </div>
    </div>
  );
}
