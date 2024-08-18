// hooks/usePastOrder.ts
import { useState, useEffect } from 'react';
import { callGet } from '@/app/utils/callApi';
import { useUser } from './useUser';

export function usePastOrder() {
  const { user } = useUser();
  const [pastOrder, setPastOrder] = useState<PastOrder[]>([]);

  const getPastOrder = async () => {
    try {
      const client_id = user?.result.client_id;
      if (!client_id) return;

      const data = await callGet(`/api/order/${client_id}/get-past-order`);
      setPastOrder(data.result);
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
  };

  useEffect(() => {
    if (user?.result?.client_id) {
      getPastOrder();
    }
  }, [user?.result?.client_id]);

  return { pastOrder, getPastOrder };
}
