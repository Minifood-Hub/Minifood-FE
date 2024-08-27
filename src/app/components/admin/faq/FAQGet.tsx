'use client';

import {
  ALERT_TEXT,
  BTN_TEXT,
  FAQ_CATEGORY,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import { useCallback, useEffect, useState } from 'react';
import { callDelete, callGet, callPut } from '@/app/utils/callApi';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Icons from '../../common/Icons';
import { ArrowDownIcon } from '@/app/ui/iconPath';
import FAQPost from './FAQPost';

export default function FAQGet() {
  const [inputId, setInputId] = useState('');
  const [result, setResult] = useState<{ items: FAQProps[] }>({
    items: [],
  });
  const [selectedId, setSelectedId] = useState<number | null>(null); // 선택된 항목의 ID를 저장하는 상태
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFAQ, setEditFAQ] = useState({
    category: '',
    question: '',
    answer: '',
  });
  const [isPost, setIsPost] = useState(false);

  const handleGetFAQ = useCallback(async () => {
    try {
      const data = await callGet(`/api/admin/faq/get`);
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  }, []);

  useEffect(() => {
    handleGetFAQ();
  }, []);

  const handleSearchFAQ = async () => {
    const faq_id = Number(inputId);
    if (!Number.isInteger(faq_id) || faq_id <= 0) {
      handleGetFAQ();
      return;
    }

    try {
      const response = await callGet(`/api/admin/faq/get/${faq_id}`);

      if (response.isSuccess && response.result) {
        setResult({ items: [response.result] }); // result 객체를 배열로 감싸 items 속성에 할당
      } else {
        setResult({ items: [] });
      }
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  };

  // FAQ 하나씩 토글
  const toggleContent = (faq_id: number) => {
    setSelectedId((prevId) => (prevId === faq_id ? null : faq_id));
    setEditingId(null); // 새로운 항목을 열 때 편집 모드 초기화
  };

  // FAQ 수정모드
  const handleEdit = (
    faq_id: number,
    category: string,
    question: string,
    answer: string,
  ) => {
    setEditingId(faq_id);
    setEditFAQ({
      category,
      question,
      answer,
    });
  };

  // 수정사항 저장
  const handleEditSave = async () => {
    if (
      !editFAQ.category ||
      editFAQ.category === '분류 선택' ||
      !editFAQ.question ||
      !editFAQ.answer
    ) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callPut(`/api/admin/faq/put/${selectedId}`, editFAQ);
      alert(ALERT_TEXT[6]);
      setEditFAQ({
        category: '',
        question: '',
        answer: '',
      });
      setEditingId(null);
      await handleGetFAQ(); // 저장 후 새로 불러오기
    } catch (error) {
      console.error(error);
    }
  };

  // FAQ 삭제
  const handleDelete = async () => {
    try {
      await callDelete(`/api/admin/faq/delete/${selectedId}`);
      alert(ALERT_TEXT[7]);
      await handleGetFAQ(); // 삭제 후 새로 불러오기
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 border-2 p-8">
      {isPost ? (
        <FAQPost />
      ) : (
        <>
          <div className="flex w-full justify-start items-center gap-4">
            <p>{INPUT_TEXT[9]}</p>
            <Input
              type="default"
              className="max-w-fit border-2 px-4 py-2"
              textValue={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <Button
              type="default"
              className="py-2 admin-btn"
              onClickHandler={handleSearchFAQ}
              buttonText={BTN_TEXT[4]}
            />
          </div>
          {result.items.map((item) => (
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
                  <p>
                    {TABLE_TEXT[2]}: {item.created_at}
                  </p>
                  <p>
                    {TABLE_TEXT[3]}:{item.updated_at ? item.updated_at : '없음'}
                  </p>
                  <p
                    className={`${selectedId === item.id ? 'transform rotate-180' : ''}`}
                  >
                    <Icons name={ArrowDownIcon} />
                  </p>
                </div>
              </div>

              {selectedId === item.id && (
                <>
                  <div className="border-t-[1px] border-gray-4 mt-4 px-2 py-4 flex flex-col gap-4">
                    {editingId === item.id ? (
                      <>
                        <select
                          className="font-bold border p-2"
                          value={editFAQ.category}
                          onChange={(e) =>
                            setEditFAQ((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                        >
                          {FAQ_CATEGORY.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <Input
                          type="default"
                          className="font-bold border p-2"
                          textValue={editFAQ.question}
                          onChange={(e) =>
                            setEditFAQ((prev) => ({
                              ...prev,
                              question: e.target.value,
                            }))
                          }
                        />
                        <textarea
                          className="border-2 py-2 px-4 font-bold min-h-44"
                          value={editFAQ.answer}
                          onChange={(e) =>
                            setEditFAQ((prev) => ({
                              ...prev,
                              answer: e.target.value,
                            }))
                          }
                        />
                      </>
                    ) : (
                      <>
                        <p className="border font-bold p-2">{item.question}</p>
                        <div className="border-2 py-2 px-4">
                          <p className="font-bold min-h-44">{item.answer}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      className={`${editingId === item.id ? 'bg-gray-2' : 'bg-red-1'} text-white font-bold max-w-fit px-8 py-2 self-end`}
                      buttonText={
                        editingId === item.id ? BTN_TEXT[5] : BTN_TEXT[1]
                      }
                      type="default"
                      onClickHandler={
                        editingId === item.id
                          ? () => setEditingId(null)
                          : handleDelete
                      }
                    />

                    <Button
                      className="bg-primary-3 text-white font-bold max-w-fit px-8 py-2 self-end"
                      buttonText={
                        editingId === item.id ? BTN_TEXT[6] : BTN_TEXT[3]
                      }
                      type="default"
                      onClickHandler={
                        editingId === item.id
                          ? handleEditSave
                          : () =>
                              handleEdit(
                                item.id,
                                item.category,
                                item.question,
                                item.answer,
                              )
                      }
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </>
      )}

      <Button
        className={`text-white font-bold max-w-fit px-8 py-2 self-end ${isPost ? 'bg-gray-2' : 'bg-primary-3'}`}
        buttonText={isPost ? BTN_TEXT[5] : BTN_TEXT[7]}
        type="default"
        onClickHandler={() => {
          setIsPost((prev) => !prev);
        }}
      />
    </div>
  );
}
