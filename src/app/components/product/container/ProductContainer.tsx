'use client'

import ProductHeader from '../ProductHeader';

const ProductContainer = () => {
const [productType,setProductType] = useState<>

  return (
    <div className="w-full flex justify-center pt-[100px]">
      <div className="w-[77%] flex flex-col">
        <ProductHeader />
      </div>
    </div>
  );
};

export default ProductContainer;
