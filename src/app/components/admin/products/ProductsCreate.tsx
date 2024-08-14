import { BTN_TEXT, CATEGORY_TEXT, TABLE_TEXT } from '@/app/constants/admin';
import Button from '../../common/Button';
import { callPost } from '@/app/utils/callApi';
import { ChangeEvent, useState } from 'react';
import Input from '../../common/Input';

export default function ProdcutsCreate() {
  const [inputState, setInputState] = useState({
    category: '',
    name: '',
    unit: '',
    price: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: string,
  ) => {
    const { value } = e.target;
    setInputState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await callPost(`/api/admin/products/`, inputState);
      console.log('Response:', response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex gap-4 items-center max-w-fit">
        <p className="whitespace-nowrap">{TABLE_TEXT[8]}</p>
        <select
          className="border-2 px-2"
          onChange={(e) => handleInputChange(e, 'category')}
          value={inputState.category}
        >
          <option value={CATEGORY_TEXT[0]}>{CATEGORY_TEXT[0]}</option>
          <option value={CATEGORY_TEXT[1]}>{CATEGORY_TEXT[1]}</option>
          <option value={CATEGORY_TEXT[2]}>{CATEGORY_TEXT[2]}</option>
          <option value={CATEGORY_TEXT[3]}>{CATEGORY_TEXT[3]}</option>
        </select>
      </div>

      <div className="flex gap-4 items-center max-w-fit">
        <p className="whitespace-nowrap">{TABLE_TEXT[1]}</p>
        <Input
          className="admin-input"
          type="default"
          onChange={(e) => handleInputChange(e, 'name')}
          textValue={inputState.name}
          placeholder={TABLE_TEXT[1]}
        />
      </div>

      <div className="flex gap-4 items-center max-w-fit">
        <p className="whitespace-nowrap">{TABLE_TEXT[9]}</p>
        <Input
          className="admin-input"
          type="default"
          onChange={(e) => handleInputChange(e, 'unit')}
          textValue={inputState.unit}
          placeholder={TABLE_TEXT[9]}
        />
      </div>

      <div className="flex gap-4 items-center max-w-fit">
        <p className="whitespace-nowrap">{TABLE_TEXT[5]}</p>
        <Input
          className="admin-input"
          type="default"
          onChange={(e) => handleInputChange(e, 'price')}
          textValue={inputState.price}
          placeholder={TABLE_TEXT[5]}
        />
      </div>

      <Button
        className="admin-btn justify-end"
        buttonText={BTN_TEXT[0]}
        type="default"
        onClickHandler={handleCreate}
      />
    </div>
  );
}
