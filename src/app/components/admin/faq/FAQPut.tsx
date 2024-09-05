import React from 'react';
import { ALERT_TEXT, BTN_TEXT, FAQ_CATEGORY } from '@/app/constants/admin';
import { callDelete, callPut } from '@/app/utils/callApi';
import Button from '../../common/Button';
import Input from '../../common/Input';

export default function FAQPut({
  editingId,
  selectedId,
  editFAQ,
  setEditFAQ,
  setEditingId,
  handleGetFAQ,
  item,
}: FAQPutProps) {
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
              <p className="font-bold min-h-44 whitespace-pre-wrap">
                {item.answer}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          className={`${editingId === item.id ? 'bg-gray-2' : 'bg-red-1'} text-white font-bold max-w-fit px-8 py-2 self-end`}
          buttonText={editingId === item.id ? BTN_TEXT[5] : BTN_TEXT[1]}
          type="default"
          onClickHandler={
            editingId === item.id ? () => setEditingId(null) : handleDelete
          }
        />
        <Button
          className="bg-primary-3 text-white font-bold max-w-fit px-8 py-2 self-end"
          buttonText={editingId === item.id ? BTN_TEXT[6] : BTN_TEXT[3]}
          type="default"
          onClickHandler={
            editingId === item.id
              ? handleEditSave
              : () =>
                  handleEdit(item.id, item.category, item.question, item.answer)
          }
        />
      </div>
    </>
  );
}
