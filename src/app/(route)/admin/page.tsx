import AdminHeader from '@/app/components/admin/AdminHeader';
import ClientContainer from '@/app/components/admin/container/ClientContainer';
import ProductsContainer from '@/app/components/admin/container/ProductsContainer';
import QuotationContainer from '@/app/components/admin/container/QuotationContainer';

export default function AdminPage({ searchParams }: AdminPageProps) {
  const activePage = searchParams.page || 'client';

  const renderActivePage = () => {
    switch (activePage) {
      case 'client':
        return <ClientContainer />;
      case 'product':
        return <ProductsContainer />;
      case 'quotation':
        return <QuotationContainer />;
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
