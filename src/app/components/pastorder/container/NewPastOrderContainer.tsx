'use client';

import { usePastOrder } from '@/app/hooks/usePastOrder';
import { useUser } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BUTTON_TEXT, DIALOG_TEXT, ORDER_TEXT } from '../../../constants/order';
import Button from '../../common/Button';
import { Dialog } from '../../common/Dialog';
import ProductList from '../../order/ProductList';
import SearchComponent from '../../order/Search';
import { PASTORDER_ALERT } from '@/app/constants/alert';

export default function NewPastOrderContainer() {
  const router = useRouter();
  const { user } = useUser(); // 커스텀 훅에서 user 가져오기
  const { addPastOrder } = usePastOrder();

  const [orderState, setOrderState] = useState<OrderState>({
    createPastorder: false,
    pastorderName: '',
    search: '',
    showQuot: false,
  });

  const [searchResults, setSearchResults] = useState<ProductItemProps[]>([]);
  const [addedItems, setAddedItems] = useState<ProductItemProps[]>([]); // 추가한 상품
  const [dialogState, setDialogState] = useState({
    open: false,
    topText: '',
    BtnText: '',
    onBtnClick: () => {},
  });

  useEffect(() => {
    // 4005 상태 시 거래처 생성으로 이동
    if (user && !user.isSuccess && user.code === '4005') {
      setDialogState(() => ({
        open: true,
        topText: DIALOG_TEXT[3],
        BtnText: BUTTON_TEXT[0],
        onBtnClick: () => {
          setOrderState((prev) => ({ ...prev, open: false }));
          router.push('/sign-in/client');
        },
      }));
    }
  }, [user]);

  // 검색 결과 저장
  const handleSearchResultsUpdate = (results: ProductItemProps[]) => {
    setSearchResults(results);
  };

  // 즐겨찾기 추가
  const handleAddPastOrder = async () => {
    await addPastOrder(
      orderState.pastorderName,
      addedItems.map((item) => item.id),
    );
    setOrderState((prev) => ({
      ...prev,
      createPastorder: false,
      pastorderName: '',
    }));
    router.push('/pastorder');
    alert(PASTORDER_ALERT[0]);
  };

  // 상품 추가
  const handleAddItem = async (item: ProductItemProps) => {
    setAddedItems((prevItems) => [...prevItems, item]);
  };

  // 상품 삭제
  const handleRemoveItem = async (product_id: string | number) => {
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.id !== product_id),
    );
  };

  // 주문 시작하기 버튼
  return (
    <section className="flex-center flex-col w-full px-0 py-[100px] gap-[10px] self-stretch">
      <div className="flex flex-col mx-auto items-end gap-3 self-stretch w-[960px]">
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="flex justify-end self-stretch">
              <SearchComponent
                onSearchResultsUpdate={handleSearchResultsUpdate}
              />
            </div>
            <ProductList
              isNew
              items={searchResults}
              isSearchResult
              addedItems={addedItems}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <ProductList
            items={addedItems}
            isSearchResult={false}
            onRemoveItem={handleRemoveItem}
          />
        </div>
        <div className="flex items-center">
          <Button
            onClickHandler={() => {
              if (addedItems.length > 0) {
                setOrderState((prev) => ({ ...prev, createPastorder: true }));
              }
            }}
            type="default"
            className={`order-btn py-3 px-6  ${
              addedItems.length === 0
                ? 'bg-gray-2 text-white'
                : 'bg-primary-4 text-white '
            }`}
            buttonText={ORDER_TEXT[7]}
          />
        </div>
      </div>
      {dialogState.open && (
        <Dialog
          topText={dialogState.topText}
          BtnText={dialogState.BtnText}
          onBtnClick={dialogState.onBtnClick}
        />
      )}

      {orderState.createPastorder && (
        <Dialog
          isTwoButton
          topText={DIALOG_TEXT[4]}
          subText={DIALOG_TEXT[5]}
          BtnText={BUTTON_TEXT[1]}
          onSubBtnClick={() => {
            setOrderState((prev) => ({
              ...prev,
              createPastorder: false,
              pastorderName: '',
            })); // 다이얼로그를 닫을 때 입력값 초기화
          }}
          onBtnClick={handleAddPastOrder}
          hasInput
          value={orderState.pastorderName}
          onChange={(e) =>
            setOrderState((prev) => ({
              ...prev,
              pastorderName: e.target.value.slice(0, 10), // 10자 제한
            }))
          }
        />
      )}
    </section>
  );
}
