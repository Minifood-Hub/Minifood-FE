import {
  ALERT_TEXT,
  BTN_TEXT,
  CATEGORY_TEXT,
  mapCategoryToEnglish,
  TABLE_TEXT,
} from '@/app/constants/admin';
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
    // 사용자가 분류를 선택하지 않았을 경우 업로드를 막음
    if (inputState.category === CATEGORY_TEXT[0]) {
      alert('분류를 선택해 주세요.');
      return;
    }

    // 카테고리를 영어로 변환
    const englishCategory = mapCategoryToEnglish[inputState.category];

    const postData = {
      ...inputState,
      category: englishCategory,
    };

    try {
      await callPost(`/api/admin/products`, postData);
      alert(ALERT_TEXT[10]);

      setInputState({
        category: '',
        name: '',
        unit: '',
        price: '',
      });
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
          {CATEGORY_TEXT.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
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
