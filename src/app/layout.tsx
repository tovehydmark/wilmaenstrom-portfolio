import Footer from './components/Footer';
import Header from './components/Header';
import './globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Wilma Enström',
  description: 'Välkommen till min site. Här hittar du mina illustrationer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
