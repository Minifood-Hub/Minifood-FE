import { ChangeEvent, useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import {
  ALERT_TEXT,
  BTN_TEXT,
  CATEGORY_TEXT,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import { callPut } from '@/app/utils/callApi';

export default function ProductsUpdate() {
  const [productId, setProductId] = useState('');
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

  const handleUpdate = async () => {
    if (!productId) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      const response = await callPut(
        `/api/admin/products/${productId}/update`,
        inputState,
      );
      console.log('Response:', response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex gap-4 items-center border-b-2 pb-4">
        <p className="whitespace-nowrap">{INPUT_TEXT[9]}</p>
        <Input
          name="inputComment"
          className="admin-input max-w-fit"
          type="default"
          onChange={(e) => setProductId(e.target.value)}
          textValue={productId}
          placeholder={INPUT_TEXT[9]}
        />
      </div>

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
        onClickHandler={handleUpdate}
      />
    </div>
  );
}
