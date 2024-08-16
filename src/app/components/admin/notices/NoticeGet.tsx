'use client';

import { TABLE_TEXT } from '@/app/constants/admin';
import { useEffect, useState } from 'react';
import { callGet } from '@/app/utils/callApi';

export default function NoticeGet() {
  const [result, setResult] = useState<{ items: NoticeProps[] }>({
    items: [],
  });
  const [selectedId, setSelectedId] = useState<number | null>(null); // 선택된 항목의 ID를 저장하는 상태

  const handleGetNotice = async () => {
    try {
      const data = await callGet(`/api/admin/notices/get`);
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  };

  useEffect(() => {
    handleGetNotice();
  }, []);

  const toggleContent = (id: number) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      {result.items.map((item) => (
        <div
          className="flex flex-col w-full px-4 py-2 border-[1px] border-gray-7 cursor-pointer"
          key={item.id}
          onClick={() => toggleContent(item.id)}
        >
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-4 text-ellipsis">
              <p className="text-gray-2">{item.id}</p>
              <p className="font-bold text-xl">{item.title}</p>
            </div>
            <div className="flex gap-2">
              <p>
                {TABLE_TEXT[2]}: {item.created_at}
              </p>
              <p>
                {TABLE_TEXT[3]}: {item.updated_at}
              </p>
              <p className="self-end">↓</p>
            </div>
          </div>

          {selectedId === item.id && (
            <div className="bg-gray-0 border-t-[1px] border-gray-4 mt-4 px-2 py-4">
              <p className="text-ellipsis">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
