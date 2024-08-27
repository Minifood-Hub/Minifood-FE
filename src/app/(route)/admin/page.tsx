import AdminHeader from '@/app/components/admin/AdminHeader';
import ClientContainer from '@/app/components/admin/container/ClientContainer';
import FAQContainer from '@/app/components/admin/container/FAQContainer';
import NoticesContainer from '@/app/components/admin/container/NoticesContainer';
import ProductsContainer from '@/app/components/admin/container/ProductsContainer';
import QuotationContainer from '@/app/components/admin/container/QuotationContainer';

export default function AdminPage({ searchParams }: AdminPageProps) {
  const activePage = searchParams.page || 'quotation';

  const renderActivePage = () => {
    switch (activePage) {
      case 'quotation':
        return <QuotationContainer />;
      case 'client':
        return <ClientContainer />;
      case 'product':
        return <ProductsContainer />;
      case 'notices':
        return <NoticesContainer />;
      case 'faq':
        return <FAQContainer />;
      default:
        return null;
    }
  };

  return (
    <section>
      <AdminHeader isActive={activePage} />
      <div className="bg-white w-full h-full flex relative">
        <div className="flex flex-col w-full">{renderActivePage()}</div>
      </div>
    </section>
  );
}
