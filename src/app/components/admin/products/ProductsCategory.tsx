import {
  ALERT_TEXT,
  BTN_TEXT,
  CATEGORY_TEXT,
  mapCategoryToEnglish,
  TABLE_TEXT,
} from '@/app/constants/admin';
import { callDelete, callGet, callPut } from '@/app/utils/callApi';
import { ChangeEvent, useState } from 'react';
import Button from '../../common/Button';
import { formatPrice } from '../../../utils/formatPrice';
import { categoryMapping } from '@/app/constants/order';
import Input from '../../common/Input';

export default function ProductsCategory() {
  const [category, setCategory] = useState(CATEGORY_TEXT[0]);
  const [result, setResult] = useState<{ items: ProductProps[] }>({
    items: [],
  });
  const [isEdit, setIsEdit] = useState<number | null>(null);

  const [inputState, setInputState] = useState({
    category: '',
    name: '',
    unit: '',
    price: 0,
  });

  // input onChange
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

  // 카테고리별 물품 가져오기
  const handleSetCategory = async () => {
    try {
      const data = await callGet(
        `/api/admin/products/category/${mapCategoryToEnglish[category]}`,
      );
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  };

  // 수정 버튼 클릭
  const handleEditClick = (item: ProductProps) => {
    setIsEdit(item.id);
    setInputState({
      category: categoryMapping[item.category],
      name: item.name,
      unit: item.unit,
      price: item.price,
    });
  };

  // 저장 버튼 클릭
  const handleUpdate = async (product_id: number) => {
    // 모든 input 필드가 비어있지 않은지 확인
    if (
      Object.values(inputState).some((value) => value === '' || value === 0)
    ) {
      alert(ALERT_TEXT[0]);
      return;
    }

    try {
      const updatedData = {
        ...inputState,
        category:
          Object.keys(categoryMapping).find(
            (key) => categoryMapping[key] === inputState.category,
          ) || inputState.category,
      };
      await callPut(`/api/admin/products/${product_id}/update`, updatedData);
      setIsEdit(null);
      await handleSetCategory();
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제 버튼 클릭
  const handleDelete = async (product_id: number) => {
    try {
      await callDelete(`/api/admin/products/${product_id}/delete`);
      setIsEdit(null);

      await handleSetCategory();
    } catch (error) {
      console.error(error);
    }
  };

  // 렌더링 테이블
  const renderTable = () => {
    return (
      <div className="w-full">
        <div className="flex bg-primary-1 w-full p-2 text-white font-bold">
          <div className="w-[5%]">{TABLE_TEXT[0]}</div>
          <div className="w-[10%]">{TABLE_TEXT[8]}</div>
          <div className="w-[45%] ">{TABLE_TEXT[1]}</div>
          <div className="w-[10%]">{TABLE_TEXT[9]}</div>
          <div className="w-[10%]">{TABLE_TEXT[5]}</div>
          <div className="w-[10%] text-center">{BTN_TEXT[3]}</div>
          <div className="w-[10%] text-center">{BTN_TEXT[1]}</div>
        </div>
        {result.items.map((item: ProductProps) => (
          <div className="flex p-2 border-2" key={item.id}>
            <div className="w-[5%]">{item.id}</div>
            <div className="w-[10%]">
              {isEdit === item.id ? (
                <select
                  className="border-2 px-2"
                  onChange={(e) => handleInputChange(e, 'category')}
                  value={inputState.category}
                >
                  {CATEGORY_TEXT.map((text, index) => (
                    <option key={index} value={text}>
                      {text}
                    </option>
                  ))}
                </select>
              ) : (
                categoryMapping[item.category]
              )}
            </div>
            <div className="w-[45%]">
              {isEdit === item.id ? (
                <Input
                  type="default"
                  className="border-2 px-2"
                  textValue={inputState.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                />
              ) : (
                item.name
              )}
            </div>
            <div className="w-[10%]">
              {isEdit === item.id ? (
                <Input
                  type="default"
                  className="border-2 px-2"
                  textValue={inputState.unit}
                  onChange={(e) => handleInputChange(e, 'unit')}
                />
              ) : (
                item.unit
              )}
            </div>
            <div className="w-[10%]">
              {isEdit === item.id ? (
                <Input
                  type="default"
                  className="border-2 px-2"
                  textValue={inputState.price}
                  onChange={(e) => handleInputChange(e, 'price')}
                />
              ) : (
                formatPrice(item.price)
              )}
            </div>
            <div className="w-[10%] flex justify-center">
              {isEdit === item.id ? (
                <div className="flex justify-center gap-4">
                  <Button
                    onClickHandler={() => {
                      setIsEdit(null);
                    }}
                    className="admin-btn bg-gray-2"
                    buttonText={BTN_TEXT[5]}
                    type="default"
                  />

                  <Button
                    type="default"
                    onClickHandler={() => handleUpdate(item.id)}
                    className="admin-btn"
                    buttonText={BTN_TEXT[6]}
                  />
                </div>
              ) : (
                <Button
                  type="default"
                  onClickHandler={() => handleEditClick(item)}
                  className="admin-btn"
                  buttonText={BTN_TEXT[3]}
                />
              )}
            </div>
            <div className="w-[10%] flex justify-center">
              <Button
                type="default"
                onClickHandler={() => handleDelete(item.id)}
                className="bg-red-1 admin-btn"
                buttonText={BTN_TEXT[1]}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-12">
        <select
          className="border-2 px-2"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          {CATEGORY_TEXT.map((text, index) => (
            <option key={index} value={text}>
              {text}
            </option>
          ))}
        </select>

        <Button
          className="admin-btn"
          buttonText={BTN_TEXT[0]}
          type="default"
          onClickHandler={handleSetCategory}
        />
      </div>
      {renderTable()}
    </div>
  );
}
