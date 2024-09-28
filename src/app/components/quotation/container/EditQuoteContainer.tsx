'use client';

import { SearchIcon } from '@/app/ui/iconPath';
import { callDelete, callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import {
  categoryMapping,
  initialEditOrderState,
  ORDER_TEXT,
} from '../../../constants/order';
import Button from '../../common/Button';
import Icons from '../../common/Icons';
import Input from '../../common/Input';
import ProductList from '../../order/ProductList';
import EditQuotationModal from '../modal/edit/EditQuotationModal';

interface EditQuoteContainerProps {
  id: string;
}

export default function EditQuoteContainer({ id }: EditQuoteContainerProps) {
  const [editState, setEditState] = useState<EditOrderState>(
    initialEditOrderState,
  );
  const [searchResults, setSearchResults] = useState<ProductItemProps[]>([]);
  const [addedItems, setAddedItems] = useState<ProductItemProps[]>([]);
  const [quotationName, setQuotationName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet(`/api/quotation/detail?id=${id}`);
      setAddedItems(
        data.result.products.map((product: any) => ({
          category: categoryMapping[product.category],
          id: product.id,
          name: product.product,
          count: product.quantity,
          unit: product.unit,
          isEdited: true,
        })),
      );
      setQuotationName(data.result.name);
    };
    fetchData();
  }, [id]);

  const handleSearch = async () => {
    if (editState.search === '') return;
    const search = encodeURIComponent(editState.search);
    const data = await callGet(
      `/api/order/search`,
      `name_prefix=${search}&limit=100`,
    );
    setSearchResults(data.result);
  };

  const handleAddItem = (item: ProductItemProps) => {
    setAddedItems((prevItems) => {
      return [...prevItems, { ...item, count: item.count }];
    });
  };

  const handleRemoveItem = async (itemId: string | number) => {
    const itemToRemove = addedItems.find((item) => item.id === itemId);
    if (itemToRemove?.isEdited) {
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
    <section className="flex-center flex-col w-full px-0 pt-[100px] gap-[10px] self-stretch">
      <div className="flex flex-col mx-auto items-end gap-3 self-stretch w-[960px]">
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="flex justify-between items-start self-stretch">
              <div className="flex items-center justify-between px-6 w-[513px] bg-white border-[1px] border-gray-1 rounded-[4px] focus-within:border-gray-7 focus-within:border-[1px]">
                <Input
                  textValue={editState.search}
                  type="search"
                  onChange={(e) =>
                    setEditState((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
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
          />
        </div>
        <div className="flex items-center">
          <Button
            onClickHandler={() => {
              if (addedItems.length > 0) {
                setEditState((prev) => ({ ...prev, quotation: true }));
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
      {editState.quotation && (
        <EditQuotationModal
          QuotationModalData={addedItems}
          closeModal={() => {
            setEditState((prev) => ({ ...prev, quotation: false }));
          }}
          quotationId={id}
          quotationName={quotationName}
        />
      )}
    </section>
  );
}
