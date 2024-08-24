'use client';

import {
  ALERT_TEXT,
  BTN_TEXT,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import { useCallback, useEffect, useState } from 'react';
import { callDelete, callGet, callPut } from '@/app/utils/callApi';
import Button from '../../common/Button';
import Input from '../../common/Input';
import NoticePost from './NoticePost';
import Icons from '../../common/Icons';
import { ArrowDownIcon } from '@/app/ui/iconPath';

export default function NoticeGet() {
  const [inputId, setInputId] = useState('');
  const [result, setResult] = useState<{ items: NoticeProps[] }>({
    items: [],
  });
  const [selectedId, setSelectedId] = useState<number | null>(null); // 선택된 항목의 ID를 저장하는 상태
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNotice, setEditNotice] = useState({
    title: '',
    content: '',
  });
  const [isPost, setIsPost] = useState(false);

  const handleGetNotice = useCallback(async () => {
    try {
      const data = await callGet(`/api/admin/notices/get`);
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  }, []);

  useEffect(() => {
    handleGetNotice();
  }, []);

  const handleSearchNotice = async () => {
    const notice_id = Number(inputId);
    if (!Number.isInteger(notice_id) || notice_id <= 0) {
      handleGetNotice();
      return;
    }

    try {
      const response = await callGet(`/api/admin/notices/get/${notice_id}`);

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

  // 공지 하나씩 토글
  const toggleContent = (notice_id: number) => {
    setSelectedId((prevId) => (prevId === notice_id ? null : notice_id));
    setEditingId(null); // 새로운 항목을 열 때 편집 모드 초기화
  };

  // 공지사항 수정모드
  const handleEdit = (notice_id: number, title: string, content: string) => {
    setEditingId(notice_id);
    setEditNotice({
      title,
      content,
    });
  };

  // 수정사항 저장
  const handleEditSave = async () => {
    if (!editNotice.title || !editNotice.content) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callPut(`/api/admin/notices/put/${selectedId}`, editNotice);
      alert(ALERT_TEXT[6]);
      setEditNotice({
        title: '',
        content: '',
      });
      setEditingId(null);
      await handleGetNotice(); // 저장 후 새로 불러오기
    } catch (error) {
      console.error(error);
    }
  };

  // 공지사항 삭제
  const handleDelete = async () => {
    try {
      await callDelete(`/api/admin/notices/delete/${selectedId}`);
      alert(ALERT_TEXT[7]);
      await handleGetNotice(); // 삭제 후 새로 불러오기
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 border-2 p-8">
      {isPost ? (
        <NoticePost />
      ) : (
        <>
          <div className="flex w-full justify-start items-center gap-4">
            <p>{INPUT_TEXT[12]}</p>
            <Input
              type="default"
              className="max-w-fit border-2 px-4 py-2"
              textValue={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <Button
              type="default"
              className="py-2 admin-btn"
              onClickHandler={handleSearchNotice}
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
                  <span className="font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
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
                        <Input
                          type="default"
                          className="font-bold border p-2"
                          textValue={editNotice.title}
                          onChange={(e) =>
                            setEditNotice((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                        <textarea
                          className="border-2 py-2 px-4 font-bold min-h-44"
                          value={editNotice.content}
                          onChange={(e) =>
                            setEditNotice((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                        />
                      </>
                    ) : (
                      <>
                        <p className="border font-bold p-2">{item.title}</p>
                        <div className="border-2 py-2 px-4">
                          <p className="font-bold min-h-44">{item.content}</p>
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
                          : () => handleEdit(item.id, item.title, item.content)
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
