import { BTN_TEXT } from '@/app/constants/admin';
import Button from '../../common/Button';
import { callPost } from '@/app/utils/callApi';

export default function ProductsCreate() {
  // let file;
  const handleCreate = async () => {
    try {
      // const data = await callPost(`/`, file);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex gap-4 border-2 p-8">
      <Button
        className="admin-btn"
        buttonText={BTN_TEXT[0]}
        type="default"
        onClickHandler={handleCreate}
      />
    </div>
  );
}
