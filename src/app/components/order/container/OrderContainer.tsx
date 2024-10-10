'use client';

import { usePastOrder } from '@/app/hooks/usePastOrder';
import { useUser } from '@/app/hooks/useUser';
import { callDelete, callGet, callPost } from '@/app/utils/callApi';
import { useRouter } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import { BUTTON_TEXT, DIALOG_TEXT, ORDER_TEXT } from '../../../constants/order';
import Button from '../../common/Button';
import { Dialog } from '../../common/Dialog';
import OrderStart from '../OrderStart';
import ProductList from '../ProductList';
import QuotationModal from '../quotation/OrderQuotationModal';
import SearchComponent from '../Search';

export default function OrderContainer() {
  const router = useRouter();
  const { user, isLoading } = useUser(); // 커스텀 훅에서 user 가져오기
  const {
    pastOrder,
    showPastOrder,
    toggleShowPastOrder,
    setPastOrderId,
    addPastOrder,
    getPastOrder,
  } = usePastOrder();

  const [orderState, setOrderState] = useState<OrderState>({
    createPastorder: false,
    pastorderName: '',
    search: '',
    showQuot: false,
  });
  const [isOrderStarted, setIsOrderStarted] = useState(false);

  const [searchResults, setSearchResults] = useState<ProductItemProps[]>([]);
  const [addedItems, setAddedItems] = useState<ProductItemProps[]>([]); // 추가한 상품
  const [quotationId, setQuotationId] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState({
    open: false,
    topText: '',
    BtnText: '',
    onBtnClick: () => {},
  });
  const [orderDate, setOrderDate] = useState('');

  // 견적서 생성
  const createQuotations = async () => {
    if (!user?.result?.client_id) return null;
    try {
      const body = {
        client_id: user?.result.client_id,
        input_date: orderDate,
        status: 'CREATED',
      };
      const response = await callPost('/api/order/quotations', body);
      if (response.code === '4003') {
        setDialogState(() => ({
          open: true,
          topText: DIALOG_TEXT[0],
          BtnText: BUTTON_TEXT[0],
          onBtnClick: () => {
            setOrderState((prev) => ({ ...prev, open: false }));
            router.push('/quotation');
          },
        }));
      }
      if (response.isSuccess && response.result) {
        return response.result.id;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

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

  useEffect(() => {
    if (!isOrderStarted) return; // 주문 시작하기 버튼을 누르기 전
    if (isLoading) return; // 로딩 중일 때는 아무 작업도 하지 않음
    if (!user || !user.result) {
      setDialogState(() => ({
        open: true,
        topText: DIALOG_TEXT[6],
        BtnText: BUTTON_TEXT[0],
        onBtnClick: () => {
          setOrderState((prev) => ({ ...prev, open: false }));
          router.push('/sign-in');
        },
      }));
      return;
    }

    const completeQuotation = async () => {
      if (user?.result?.client_id) {
        try {
          const id = await createQuotations();
          if (id) {
            setQuotationId(id); // id 설정
          }
        } catch (error) {
          console.error('견적서 생성 중 오류 발생 : ', error);
        }
      }
    };
    completeQuotation();
    getPastOrder();
  }, [isLoading, user?.result?.client_id, isOrderStarted]);

  // 검색 결과 저장
  const handleSearchResultsUpdate = (results: ProductItemProps[]) => {
    setSearchResults(results);
  };

  // 상품 추가
  const handleAddItem = async (item: ProductItemProps) => {
    try {
      const body = {
        quotation_id: quotationId,
        product_id: item.id,
        quantity: item.count || 1,
      };
      await callPost('/api/order/quotations/products', [body]);
      // 상품을 추가한 후 addedItems 상태 업데이트
      setAddedItems((prevItems) => {
        // 이미 존재하는 아이템이 아닐 경우에만 추가
        if (!prevItems.some((prevItem) => prevItem.id === item.id)) {
          return [...prevItems, { ...item, count: item.count || 1 }];
        }
        return prevItems;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 즐겨 찾기에서 불러온 상품을 추가한 상품에 저장
  const handleSetPastOrderId = async (past_order_id: string) => {
    const productList = await setPastOrderId(past_order_id);

    // 중복을 제거하고 새로운 상품만 addedItems에 추가
    setAddedItems((prevItems) => {
      // productList에서 새로운 아이템만 필터링
      const newItems = productList.filter(
        (newItem: { id: string }) =>
          !prevItems.some((prevItem) => prevItem.id === newItem.id), // 각 새 아이템에 대해, 이미 존재하는 아이템이 없는지 확인
      );
      return [...prevItems, ...newItems];
    });

    // 새로 추가된 상품만 견적서에 추가
    await Promise.all(
      productList.map(async (item: ProductItemProps) => {
        // 현재 아이템이 이미 addedItems에 존재하는지 확인
        if (!addedItems.some((addedItem) => addedItem.id === item.id)) {
          await handleAddItem(item);
        }
      }),
    );

    toggleShowPastOrder();
  };

  // 최근 구매한 물품 리스트 조회
  const setRecentProducts = async () => {
    try {
      const data = await callGet(`/api/order/search/recent`);
      if (data.isSuccess) {
        const productList = data.result.map((product: QuotationItemType) => ({
          id: product.id,
          category: product.category,
          name: product.name,
          unit: product.unit,
          price: product.price,
        }));
        setSearchResults(productList);
      }
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
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
  };

  // 상품 삭제
  const handleRemoveItem = async (product_id: string | number) => {
    await callDelete(
      `/api/order/quotations/${quotationId}/${product_id}/delete`,
    );
    // 상품 삭제 후 addedItems 상태 업데이트
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.id !== product_id),
    );
  };

  // 개수 변경 함수
  const handleCountChange = (id: string | number, count: string) => {
    setAddedItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, count } : item)),
    );
  };

  // 주문 시작하기 버튼
  if (!isOrderStarted) {
    return (
      <OrderStart
        onStartOrder={() => setIsOrderStarted(true)}
        onDateChange={(date: SetStateAction<string>) => setOrderDate(date)}
        orderDate={orderDate}
      />
    );
  }
  return (
    <section className="flex-center flex-col w-full h-full px-0 gap-[10px] self-stretch">
      <div className="flex flex-col mx-auto items-end gap-3 self-stretch w-[960px]">
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="flex justify-between items-start self-stretch">
              <div className="relative flex h-9 items-center gap-3">
                <Button
                  className="order-btn border-[1px] border-gray-1 bg-white font-medium"
                  type="default"
                  onClickHandler={toggleShowPastOrder}
                  buttonText={ORDER_TEXT[0]}
                />
                <Button
                  className="order-btn bg-primary-3 font-medium text-white"
                  type="default"
                  onClickHandler={setRecentProducts}
                  buttonText={ORDER_TEXT[10]}
                />
                {showPastOrder && (
                  <div className="absolute top-9 flex flex-col bg-white rounded-[4px]">
                    {pastOrder?.map((order) => (
                      <Button
                        key={order.past_order_id}
                        type="default"
                        className="px-4 py-2 first:rounded-t-[4px] last:rounded-b-[4px] border-b border-gray-2 cursor-pointer border-t-[1px] border-[1px]"
                        onClickHandler={() =>
                          handleSetPastOrderId(order.past_order_id.toString())
                        }
                        buttonText={order.name}
                      />
                    ))}
                  </div>
                )}
              </div>
              {/* 검색창 */}
              <SearchComponent
                onSearchResultsUpdate={handleSearchResultsUpdate}
              />
            </div>
            <ProductList
              items={searchResults}
              isSearchResult
              addedItems={addedItems}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onCountChange={handleCountChange}
            />
          </div>

          <ProductList
            items={addedItems}
            isSearchResult={false}
            onRemoveItem={handleRemoveItem}
          />
        </div>

        <div className="flex items-center gap-6">
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
                : 'bg-white border-[1px] border-gray-1'
            }`}
            buttonText={ORDER_TEXT[7]}
          />

          <Button
            onClickHandler={() => {
              if (addedItems.length > 0) {
                setOrderState((prev) => ({ ...prev, showQuot: true }));
              }
            }}
            type="default"
            className={`order-btn py-3 px-6 text-white ${
              addedItems.length === 0 ? 'bg-gray-2' : 'bg-primary-3'
            }`}
            buttonText={ORDER_TEXT[4]}
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

      {orderState.showQuot && (
        <QuotationModal
          QuotationModalData={addedItems}
          closeModal={() => {
            setOrderState((prev) => ({ ...prev, showQuot: false }));
          }}
          quotationId={quotationId}
          currentDate={orderDate}
        />
      )}
    </section>
  );
}
