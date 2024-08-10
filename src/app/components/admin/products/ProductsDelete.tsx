import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { ALERT_TEXT, BTN_TEXT, INPUT_TEXT } from '@/app/constants/admin';
import { callDelete } from '@/app/utils/callApi';

export default function ProductsDelete() {
  const [productId, setProductId] = useState('');

  const handleDelete = async () => {
    if (!productId) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      // await callDelete();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex gap-4 border-2 p-8">
      <div className="flex gap-4 items-center">
        <p className="whitespace-nowrap">{INPUT_TEXT[9]}</p>
        <Input
          name="inputComment"
          className="admin-input"
          type="default"
          onChange={(e) => setProductId(e.target.value)}
          textValue={productId}
          placeholder={INPUT_TEXT[9]}
        />
      </div>

      <Button
        className="admin-btn border-red-1"
        buttonText={BTN_TEXT[0]}
        type="default"
        onClickHandler={handleDelete}
      />
    </div>
  );
}
