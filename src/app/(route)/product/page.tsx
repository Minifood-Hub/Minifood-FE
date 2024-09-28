'use client';

import Footer from '@/app/components/common/layout/Footer';
import SideNavBar from '@/app/components/common/layout/SideNavBar';
import ProductContainer from '@/app/components/product/container/ProductContainer';
import { SIDENAV_TEXT } from '@/app/constants/common';
import { usePathname, useRouter } from 'next/navigation';

export default function Product() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/product') {
    router.push('/');
  } else {
    return (
      <section>
        <div className="bg-[#white] w-full h-screen flex flex-col relative">
          <div className="w-full flex relative h-full">
            <SideNavBar selected={SIDENAV_TEXT[3]} />
            <div className="flex flex-col items-center w-full">
              <ProductContainer />
              <Footer />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
