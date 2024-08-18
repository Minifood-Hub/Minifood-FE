import { callDelete } from '@/app/utils/callApi';
import Button from '../../common/Button';
import { BTN_TEXT, ALERT_TEXT } from '@/app/constants/admin';

export default function DeleteClient({ clientId }: ClientIdProps) {
  const handleDeleteClient = async () => {
    if (!clientId) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callDelete(`/api/admin/clients/${clientId}/delete`);
      alert(ALERT_TEXT[3]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <Button
        className="admin-btn border-red-1"
        buttonText={BTN_TEXT[1]}
        type="default"
        onClickHandler={handleDeleteClient}
      />
    </div>
  );
}
