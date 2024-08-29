import { PASTORDER_DETAIL } from '@/app/constants/pastorder';
import { TrashBinIcon } from '@/app/ui/iconPath';
import { callGet, callPost } from '@/app/utils/callApi';
import { useEffect, useState } from 'react';
import Icons from '../common/Icons';

interface PastOrderEditProps {
  pastorderId: number;
  pastorderName: string;
}

const PastOrderEdit = ({ pastorderId, pastorderName }: PastOrderEditProps) => {
  const [products, setProducts] = useState<PastOrderProduct[]>([]);
  const productIds = products.map((product) => product.id);

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

  const putPastOrder = async () => {
    await callPost(`/api/past-order/edit?${pastorderId}`, {
      name: pastorderName,
      product_ids: productIds,
    });
  };

  return (
    <div className="w-full flex flex-col text-[#333333] bg-[#FCFCFC]">
      <div className="flex h-[47px] items-center text-sm font-bold">
        <div className="w-[9.1%]  text-center">{PASTORDER_DETAIL[0]}</div>
        <div className="w-[18.6%]  pl-[14px]">{PASTORDER_DETAIL[1]}</div>
        <div className="w-[49.1%]  pl-[14px]">{PASTORDER_DETAIL[2]}</div>
        <div className="w-[11.4%] text-center">{PASTORDER_DETAIL[3]}</div>
        <div className="w-[11.4%] text-center">{PASTORDER_DETAIL[5]}</div>
      </div>
      {products.map((product, i) => (
        <div
          className="w-full flex h-[54px] items-center text-base font-normal"
          key={product.id}
        >
          <div className="w-[9.1%] text-center">{product.category}</div>
          <div className="w-[18.6%] pl-[14px]">{i + 1}</div>
          <div className="w-[49.1%] pl-[14px]">{product.name}</div>
          <div className="w-[11.4%] text-center">{product.unit}</div>
          <div className="w-[11.4%] text-center">
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
