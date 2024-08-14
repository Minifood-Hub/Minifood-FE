interface OrderState {
  dialog: boolean;
  showBookmark: boolean;
  alert: boolean;
  search: string;
  bookmarkName: string;
  quotation: boolean;
}

interface UserResult {
  client_id: number;
  email: string;
  id: number;
  is_active: boolean;
}

interface User {
  isSuccess: boolean;
  code: string;
  message: string;
  category: string;
  result: UserResult;
}

interface searchProductsProps {
  namePrefix: string;
  limit: string;
  cachedTime: string;
  token: string;
}

interface PastOrder {
  past_order_id: number;
  name: string;
}

interface QuotationItemType {
  id?: string | number;
  category: string;
  name: string;
  count?: string | number;
  unit: string;
  price?: string;
}

interface QuotationTableProps {
  quotationInfo: QuotationItemType[];
}

interface ProductItemProps extends QuotationItemType {
  isAdded?: boolean;
  isEdited?: boolean;
  unit: string;
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

interface quotationIdProps {
  quotation_id: string;
}

interface patchQuotationPartiProps extends quotationIdProps {
  particulars: string;
}

interface QuotationModalProps {
  QuotationModalData: ProductItemProps[];
  closeModal: () => void;
  quotationId?: string;
}
