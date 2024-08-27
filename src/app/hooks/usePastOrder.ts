import { useState, useCallback } from 'react';
import { callGet, callPost } from '@/app/utils/callApi';
import { useUser } from './useUser';

export function usePastOrder() {
  const { user } = useUser();
  const [pastOrder, setPastOrder] = useState<PastOrder[]>([]);
  const [showPastOrder, setShowPastOrder] = useState(false);

  const getPastOrder = useCallback(async () => {
    try {
      const client_id = user?.result.client_id;
      if (!client_id) return;

      const data = await callGet(`/api/order/${client_id}/get-past-order`);
      setPastOrder(data.result);
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
  }, [user?.result.client_id]);

  const toggleShowPastOrder = () => setShowPastOrder((prev) => !prev);

  const setPastOrderId = async (past_order_id: string) => {
    try {
      const data = await callGet(`/api/past-order/get/${past_order_id}`);
      if (data.isSuccess) {
        const productList = data.result.product_list.map(
          (product: QuotationItemType) => ({
            id: product.id,
            category: product.category,
            name: product.name,
            unit: product.unit,
            price: product.price,
          }),
        );
        return productList;
      }
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
    return [];
  };

  const addPastOrder = async (
    pastorderName: string,
    productIds: (string | number)[],
  ) => {
    if (!pastorderName) {
      alert('즐겨찾기 이름을 입력해주세요.');
      return;
    }
    try {
      const body = {
        client_id: user?.result.client_id,
        name: pastorderName,
        product_ids: productIds,
      };

      await callPost('/api/past-order/post', body);
      await getPastOrder();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    pastOrder,
    showPastOrder,
    getPastOrder,
    toggleShowPastOrder,
    setPastOrderId,
    addPastOrder,
  };
}
