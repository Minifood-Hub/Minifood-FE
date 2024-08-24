interface AdminHeaderProps {
  isActive: string;
}

interface AdminPageProps {
  searchParams: { page: string };
}

interface ClientIdProps {
  clientId: string;
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

interface FAQProps {
  category: string;
  question: string;
  answer: string;
  id: number;
  created_at: string;
  updated_at: string;
}

interface FAQPostTypes {
  category: string;
  question: string;
  answer: string;
}
