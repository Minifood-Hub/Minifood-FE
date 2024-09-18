import { ALERT_TEXT, BTN_TEXT, DIALOG_TEXT } from '@/app/constants/admin';
import { callDelete, callPut } from '@/app/utils/callApi';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useState } from 'react';
import { Dialog } from '../../common/Dialog';

export default function NoticesPut({
  editingId,
  selectedId,
  editNotice,
  setEditingId,
  setEditNotice,
  handleGetNotice,
  item,
}: NoticePutProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      alert(ALERT_TEXT[5]);
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
      await handleGetNotice(); // 삭제 후 새로 불러오기
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };
  return (
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
              <p className="font-bold min-h-44 whitespace-pre-wrap">
                {item.content}
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
            editingId === item.id
              ? () => setEditingId(null)
              : () => setIsDialogOpen(true)
          }
        />

        <Button
          className="bg-primary-3 text-white font-bold max-w-fit px-8 py-2 self-end"
          buttonText={editingId === item.id ? BTN_TEXT[6] : BTN_TEXT[3]}
          type="default"
          onClickHandler={
            editingId === item.id
              ? handleEditSave
              : () => handleEdit(item.id, item.title, item.content)
          }
        />

        {isDialogOpen && (
          <Dialog
            topText={DIALOG_TEXT[1]}
            subText={DIALOG_TEXT[0]}
            BtnText={BTN_TEXT[1]}
            isWarn
            onBtnClick={handleDelete}
            isTwoButton
            onSubBtnClick={() => setIsDialogOpen(false)}
          />
        )}
      </div>
    </>
  );
}
