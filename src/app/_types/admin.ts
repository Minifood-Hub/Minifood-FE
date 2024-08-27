interface AdminHeaderProps {
  isActive: string;
}

interface AdminPageProps {
  searchParams: { page: string };
}

interface ClientIdProps {
  clientId: string | number;
}

interface ClientsNameProps {
  id: number;
  name: string;
  region: string;
  address: string;
}

interface NoticeProps {
  title: string;
  content: string;
  id: number;
  created_at: string;
  updated_at: string | null;
}

interface FAQProps {
  category: string;
  question: string;
  answer: string;
  id: number;
  created_at: string;
  updated_at: string | null;
}

interface FAQPutProps {
  editingId: number | null;
  selectedId: number | null;
  editFAQ: {
    category: string;
    question: string;
    answer: string;
  };
  setEditFAQ: React.Dispatch<
    React.SetStateAction<{
      category: string;
      question: string;
      answer: string;
    }>
  >;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  handleGetFAQ: () => Promise<void>;
  item: {
    id: number;
    category: string;
    question: string;
    answer: string;
  };
}

interface ProductProps {
  id: number;
  category: string;
  name: string;
  unit: string;
  price: number;
}

interface AdminItemProps {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
  status: string;
  total_price: number;
}

interface AdminItemProps {
  past_order_id: number;
  name: string;
}

interface CheckQuotationResult {
  client_id: number;
  status: boolean;
}

interface FAQPostTypes {
  category: string;
  question: string;
  answer: string;
}
