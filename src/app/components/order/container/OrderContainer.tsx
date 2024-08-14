'use client';

import { useEffect, useState } from 'react';
import Input from '../../common/Input';
import { SearchIcon } from '@/app/ui/iconPath';
import {
  BUTTON_TEXT,
  categoryMapping,
  DIALOG_TEXT,
  ORDER_TEXT,
} from '../../../constants/order';
import Icons from '../../common/Icons';
import { Dialog } from '../../common/Dialog';
import { callGet, callPost } from '@/app/utils/callApi';
import { useRouter } from 'next/navigation';
import { usePastOrder } from '@/app/hooks/usePastOrder';
import ProductList from '../ProductList';
import QuotationModal from '../quotation/OrderQuotationModal';
import { useUser } from '@/app/hooks/useUser';
import Button from '../../common/Button';

export default function OrderContainer() {
  const router = useRouter();
  const { user } = useUser(); // 커스텀 훅에서 user 가져오기
  const { pastOrder, getPastOrder } = usePastOrder(); // 커스텀 훅에서 즐겨찾기 가져오기

  const [state, setState] = useState<OrderState>({
    dialog: false,
    showBookmark: false,
    alert: false,
    search: '',
    bookmarkName: '',
    quotation: false,
  });
  const [searchResults, setSearchResults] = useState<ProductItemProps[]>([]); // 검색 결과
  const [addedItems, setAddedItems] = useState<ProductItemProps[]>([]); // 추가한 상품

  console.log(searchResults);

  useEffect(() => {
    // 4005 상태 시 거래처 생성으로 이동
    if (user && !user.isSuccess && user.code === '4005') {
      setState((prev) => ({ ...prev, alert: true }));
    }
  }, [user]);

  // 즐겨 찾기에서 불러온 상품을 추가한 상품에 저장
  const setPastOrderId = async (past_order_id: string) => {
    try {
      const data = await callGet(`/api/order/get-past-order/${past_order_id}`);
      if (data.isSuccess) {
        const productList = data.result.product_list.map(
          (product: QuotationItemType) => ({
            id: product.id,
            category: categoryMapping[product.category],
            name: product.name,
            unit: product.unit,
            price: product.price,
          }),
        );
        setAddedItems(productList);
        setState((prev) => ({ ...prev, showBookmark: false }));
      }
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof OrderState,
  ) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const search = state.search ? encodeURIComponent(state.search) : '""';
      const data = await callGet(
        `/api/order/search`,
        `name_prefix=${search}&limit=100`,
      );
      setSearchResults(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBookMark = async () => {
    if (!state.bookmarkName) {
      alert(DIALOG_TEXT[2]);
      return;
    }
    try {
      const body = {
        client_id: user?.result.client_id,
        name: state.bookmarkName,
        product_ids: addedItems.map((item) => item.id),
      };

      await callPost('/api/order/post-past-order', body);

      await getPastOrder();
      setState((prev) => ({ ...prev, dialog: false, bookmarkName: '' }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = (item: ProductItemProps) => {
    setAddedItems((prevItems) => {
      return [...prevItems, { ...item, count: item.count }];
    });
  };

  const handleRemoveItem = (id: string | number) => {
    setAddedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCountChange = (id: string | number, count: string) => {
    setAddedItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, count } : item)),
    );
  };
  return (
    <section className="flex-center flex-col w-full px-0 py-[60px] gap-[10px] self-stretch">
      <div className="flex flex-col mx-auto items-end gap-3 self-stretch w-[960px]">
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="flex justify-between items-start self-stretch">
              <div className="relative flex h-9 items-center gap-3">
                <Button
                  className="order-btn border-[1px] border-gray-1 bg-white font-medium"
                  type="default"
                  onClickHandler={() => {
                    setState((prev) => ({
                      ...prev,
                      showBookmark: !prev.showBookmark,
                    }));
                  }}
                  buttonText={ORDER_TEXT[0]}
                />
                <Button
                  className="order-btn bg-primary-3 font-medium text-white"
                  type="default"
                  onClickHandler={() => {
                    setState((prev) => ({
                      ...prev,
                      showBookmark: !prev.showBookmark,
                    }));
                  }}
                  buttonText="최근 주문내역"
                />
                {state.showBookmark && (
                  <div className="absolute top-9 flex flex-col bg-white rounded-[4px]">
                    {pastOrder.map((order) => (
                      <Button
                        key={order.past_order_id}
                        type="default"
                        className="px-4 py-2 first:rounded-t-[4px] last:rounded-b-[4px] border-b border-gray-2 cursor-pointer border-t-[1px] border-[1px]"
                        onClickHandler={() =>
                          setPastOrderId(order.past_order_id.toString())
                        }
                        buttonText={order.name}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between px-6 w-[513px] bg-white border-[1px] border-gray-1 rounded-[4px] focus-within:border-gray-7 focus-within:border-[1px]">
                <Input
                  textValue={state.search}
                  type="search"
                  onChange={(e) => handleInputChange(e, 'search')}
                  placeholder={ORDER_TEXT[1]}
                  onEnterPress={handleSearch}
                />
                <Icons onClick={handleSearch} name={SearchIcon} />
              </div>
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
            onCountChange={handleCountChange}
          />
        </div>

        <div className="flex items-center gap-6">
          <Button
            onClickHandler={() => {
              setState((prev) => ({ ...prev, dialog: true }));
            }}
            type="default"
            className="order-btn border-[1px] py-3 px-6 border-gray-1 bg-white"
            buttonText={ORDER_TEXT[7]}
          />

          <Button
            onClickHandler={() => {
              setState((prev) => ({ ...prev, quotation: true }));
            }}
            type="default"
            className="order-btn py-3 px-6 text-white bg-primary-3"
            buttonText={ORDER_TEXT[4]}
          />
        </div>
      </div>
      {state.alert && (
        <Dialog
          topText={DIALOG_TEXT[3]}
          BtnText={BUTTON_TEXT[0]}
          onBtnClick={() => {
            setState((prev) => ({ ...prev, alert: false }));
            router.push('/sign-in/client');
          }}
        />
      )}
      {state.dialog && (
        <Dialog
          isTwoButton
          topText={DIALOG_TEXT[4]}
          subText={DIALOG_TEXT[5]}
          BtnText={BUTTON_TEXT[1]}
          onSubBtnClick={() => {
            setState((prev) => ({ ...prev, dialog: false, bookmarkName: '' })); // 다이얼로그를 닫을 때 입력값 초기화
          }}
          onBtnClick={handleAddBookMark}
          hasInput
          value={state.bookmarkName}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              bookmarkName: e.target.value.slice(0, 10), // 10자 제한
            }))
          }
        />
      )}

      {state.quotation && (
        <QuotationModal
          QuotationModalData={addedItems}
          closeModal={() => {
            setState((prev) => ({ ...prev, quotation: false }));
          }}
        />
      )}
    </section>
  );
}
