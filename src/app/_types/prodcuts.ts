type ProductCategory = '전체' | '야채' | '냉동' | '냉장' | '공산제품';

interface ProductTypes {
  name: string;
  image_url: string;
  description: string;
  category: string;
  unit: string;
  price: number;
}
