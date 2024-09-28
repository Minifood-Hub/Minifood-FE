import { categoryMapping } from '@/app/constants/order';
import { PASTORDER_DETAIL } from '@/app/constants/pastorder';
import { TrashBinIcon } from '@/app/ui/iconPath';
import { callGet } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import Icons from '../common/Icons';

interface PastOrderEditProps {
  pastorderId: number;
  setProductIds: (ids: number[]) => void;
}

const PastOrderEdit = ({ pastorderId, setProductIds }: PastOrderEditProps) => {
  const [products, setProducts] = useState<PastOrderProduct[]>([]);
  useEffect(() => {
    const productIds = products?.map((product) => product.id);
    setProductIds(productIds);
  }, [products, setProductIds]);

  const deleteItem = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await callGet(`/api/past-order/get/${pastorderId}`);
      setProducts(data.result.product_list);
    };
    fetchData();
  }, [pastorderId]);

  return (
    <div className="w-full flex flex-col text-[#333333] bg-[#FCFCFC]">
      <div className="flex h-[47px] items-center text-sm font-bold">
        <div className="w-[9.1%]  text-center">{PASTORDER_DETAIL[0]}</div>
        <div className="w-[18.6%]  pl-[14px]">{PASTORDER_DETAIL[1]}</div>
        <div className="w-[49.1%]  pl-[14px]">{PASTORDER_DETAIL[2]}</div>
        <div className="w-[11.4%] text-center">{PASTORDER_DETAIL[3]}</div>
        <div className="w-[11.4%] text-center">{PASTORDER_DETAIL[5]}</div>
      </div>
      {products?.map((product, i) => (
        <div className="w-full flex h-[54px] items-center" key={product.id}>
          <div className="w-[9.1%] text-center">
            {categoryMapping[product.category]}
          </div>
          <div className="w-[18.6%] pl-[14px]">{i + 1}</div>
          <div className="w-[49.1%] pl-[14px]">{product.name}</div>
          <div className="w-[11.4%] text-center">{product.unit}</div>
          <div className="w-[11.4%] flex-center">
            <Icons
              name={TrashBinIcon}
              className="cursor-pointer"
              onClick={() => deleteItem(product.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastOrderEdit;
