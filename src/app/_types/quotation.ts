interface ProductsTypes {
  id: number;
  category: string;
  product: string;
  unit: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

interface QuotationInfoTypes {
  products: ProductsTypes[];
  name: string;
  total: number;
  status?: string;
  created_at: string;
  updated_at: string;
}

interface QuotationViewInfoTypes {
  id: number;
  name: string;
  total_price: number;
  created_at: string;
  updated_at: string;
}

type CheckTypes = 'all' | 'week' | 'month' | 'custom';

interface ItemsTypes {
  id: number;
  name: string;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface QuotationTableInfoTypes {
  items: ItemsTypes[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface CustomDateTypes {
  startDate: string;
  endDate: string;
}

interface RecentQuotationTypes {
  products: string[];
  date: string;
}

interface DailyQuotationTypes {
  date: string;
  status: string;
}
