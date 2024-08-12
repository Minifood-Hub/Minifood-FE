import { BTN_TEXT, INPUT_TEXT } from '@/app/constants/admin';
import Button from '../../common/Button';
import { callPostFile } from '@/app/utils/callApi';
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
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const data = await callPostFile(
        `/api/admin/products/vegetable/file`,
        formData,
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-4 border-2 p-8">
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
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
