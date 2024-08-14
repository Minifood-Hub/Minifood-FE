'use client';

import { usePastOrder } from '@/app/hooks/usePastOrder';
import { SearchIcon } from '@/app/ui/iconPath';
import { callDelete, callGet, callPost } from '@/app/utils/callApi';
import { useUser } from '@/app/hooks/useUser';
import { useEffect, useState } from 'react';
import {
  BUTTON_TEXT,
  categoryMapping,
  DIALOG_TEXT,
  initialOrderState,
  ORDER_TEXT,
} from '../../../constants/order';
import { Dialog } from '../../common/Dialog';
import Icons from '../../common/Icons';
import Input from '../../common/Input';
import ProductList from '../../order/ProductList';
import EditQuotationModal from '../modal/EditQuotationModal';

interface EditQuoteContainerProps {
  id: string;
}

export default function EditQuoteContainer({ id }: EditQuoteContainerProps) {
  const { user } = useUser();
  const { pastOrder, getPastOrder } = usePastOrder();

  const [state, setState] = useState<OrderState>(initialOrderState);
  const [searchResults, setSearchResults] = useState<ProductItemProps[]>([]);
  const [addedItems, setAddedItems] = useState<ProductItemProps[]>([]);
  console.log(addedItems);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet(`/api/quotation/detail?id=${id}`);
      console.log(data.result);
      console.log(id);
      setAddedItems(
        data.result.products.map((product: any, index: number) => ({
          category: categoryMapping[product.category],
          id: product.id,
          name: product.product,
          count: product.quantity,
          unit: product.unit,
          isEdited: true,
        })),
      );
    };
    fetchData();
  }, [id]);

  const setPastOrderId = async (past_order_id: string) => {
    const data = await callGet(`/api/order/get-past-order/${past_order_id}`);
    setAddedItems(data.result.product_list);
    setState((prev) => ({ ...prev, showBookmark: false }));
  };

  const handleSearch = async () => {
    if (state.search === '') return;
    const search = encodeURIComponent(state.search);
    const data = await callGet(
      `/api/order/search`,
      `name_prefix=${search}&limit=100&cached_time=300`,
    );
    setSearchResults(data.result);
  };

  const handleAddBookMark = async () => {
    if (!state.bookmarkName) return;
    const body = {
      client_id: user?.result.client_id,
      name: state.bookmarkName,
      product_ids: addedItems.map((item) => item.id),
    };
    await callPost('/api/order/post-past-order', body);
    await getPastOrder();
    setState((prev) => ({ ...prev, dialog: false, bookmarkName: '' }));
  };

  const handleAddItem = (item: ProductItemProps) => {
    setAddedItems((prevItems) => {
      return [...prevItems, { ...item, count: item.count }];
    });
  };

  const handleRemoveItem = async (itemId: string | number) => {
    const itemToRemove = addedItems.find((item) => item.id === itemId);
    if (itemToRemove?.isEdited) {
      console.log('삭제 진행');

      await callDelete(
        `/api/quotation/delete/product?quotation_id=${id}&product_id=${itemId}`,
      );
    }
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId),
    );
  };

  const handleCountChange = (itemId: string | number, count: string) => {
    setAddedItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, count } : item)),
    );
  };

  return (
    <div className="mt-14 px-24 py-2 w-full min-w-[320px] mb-40">
      <div className="flex gap-4 items-center">
        <div>
          <button
            className="bg-primary-4 self-center font-black text-white px-2 py-1 whitespace-nowrap"
            type="button"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                showBookmark: !prev.showBookmark,
              }));
            }}
          >
            {ORDER_TEXT[0]}
          </button>
          {state.showBookmark && (
            <div className="absolute flex flex-col w-auto bg-white">
              {pastOrder.map((order) => (
                <button
                  key={order.past_order_id}
                  type="button"
                  className="px-4 py-1 border-b border-gray-2 cursor-pointer  border-t-[1px] border-2 "
                  onClick={() => setPastOrderId(order.past_order_id.toString())}
                >
                  {order.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-center gap-2 bg-gray-0 border-2 border-gray-2 pr-1 focus-within:border-gray-7 focus-within:border-2">
          <Input
            textValue={state.search}
            type="search"
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            placeholder={ORDER_TEXT[1]}
            onEnterPress={handleSearch}
          />
          <Icons onClick={handleSearch} name={SearchIcon} />
        </div>
        <p className="text-sm">{ORDER_TEXT[2]}</p>
      </div>

      <ProductList
        items={searchResults}
        isSearchResult
        addedItems={addedItems}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onCountChange={handleCountChange}
      />

      <ProductList
        items={addedItems}
        isSearchResult={false}
        onRemoveItem={handleRemoveItem}
        onCountChange={handleCountChange}
      />

      <div className="w-full flex justify-end mt-4">
        <button
          onClick={() => {
            setState((prev) => ({ ...prev, quotation: true }));
          }}
          type="button"
          className="bg-primary-4 text-white text-xl px-3 py-1 font-black"
        >
          {ORDER_TEXT[4]}
        </button>
      </div>
      {state.dialog && (
        <Dialog
          isTwoButton
          topText={DIALOG_TEXT[4]}
          subText={DIALOG_TEXT[5]}
          BtnText={BUTTON_TEXT[1]}
          onSubBtnClick={() => {
            setState((prev) => ({ ...prev, dialog: false, bookmarkName: '' }));
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
        <EditQuotationModal
          closeModal={() => {
            setState((prev) => ({ ...prev, quotation: false }));
          }}
          QuotationModalData={addedItems}
          quotationId={id}
        />
      )}
    </div>
  );
}
