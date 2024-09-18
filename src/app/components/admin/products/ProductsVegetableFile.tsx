import { ALERT_TEXT, BTN_TEXT } from '@/app/constants/admin';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function ProductsVegetableFile() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert(ALERT_TEXT[4]);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/products/vegetable/file', {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      alert(ALERT_TEXT[8]);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
      alert(ALERT_TEXT[9]);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-4 border-2 p-8">
      <Input
        type="default"
        inputType="file"
        accept=".xlsx"
        className="max-w-fit"
        onChange={handleFileChange}
      />
      <Button
        className="admin-btn"
        buttonText={BTN_TEXT[0]}
        buttonType="submit"
        type="default"
        onClickHandler={() => {}}
      />
    </form>
  );
}
