import Header from '@/app/components/common/layout/Header';

export const metadata = {
  title: '로그인',
  description: 'Minifood 로그인 페이지',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="shadow-lg">
        <Header />
      </div>
      {children}
    </div>
  );
}
