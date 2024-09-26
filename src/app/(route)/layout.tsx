import type { Metadata } from 'next';
import '../ui/globals.css';
import UserProvider from '../components/common/useProvider';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Minifood',
  description: '정말 맛있는 음식과 함께, Minifood',
  icons: {
    icon: '/Images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} min-h-screen min-w-[1100px] mx-auto font-pretendard`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
