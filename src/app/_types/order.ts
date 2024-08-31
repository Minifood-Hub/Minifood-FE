interface OrderState {
  createPastorder: boolean;
  pastorderName: string;
  search: string;
  showQuot: boolean;
}

interface UserResult {
  client_id: number;
  email: string;
  id: number;
  is_active: boolean;
  is_admin?: boolean;
  client_name?: string;
  client_region: string;
}

interface User {
  isSuccess?: boolean;
  code: string;
  message: string;
  category: string;
  result?: UserResult;
  detail?: string;
}

interface searchProductsProps {
  namePrefix: string;
  limit: string;
}

interface PastOrder {
  past_order_id: number;
  name: string;
}

interface QuotationItemType {
  id: string | number;
  category: string;
  name: string;
  count?: string | number;
  unit: string;
  price?: number;
  created_at?: string;
}

interface QuotationTableProps {
  quotationInfo: QuotationItemType[];
}

interface ProductItemProps extends QuotationItemType {
  isAdded?: boolean;
  isEdited?: boolean;
  unit: string;
  isSearchResult?: boolean;
  onAddItem?: (item: ProductItemProps) => void;
  onRemoveItem?: (id: string | number) => void;
  onCountChange?: (id: string | number, value: string) => void;
}

interface ProductListProps {
  items: ProductItemProps[];
  isSearchResult: boolean;
  addedItems?: ProductItemProps[];
  onAddItem?: (item: ProductItemProps) => void;
  onRemoveItem: (id: string | number) => void;
  onCountChange?: (id: string | number, value: string) => void;
}

interface QuotationModalProps {
  QuotationModalData: ProductItemProps[];
  closeModal: () => void;
  quotationId?: string | null;
  currentDate?: string;
  quotationName?: string;
}

interface EditOrderState {
  bookmark: boolean;
  showBookmark: boolean;
  search: string;
  bookmarkName: string;
  dialog: boolean;
  quotation: boolean;
}
