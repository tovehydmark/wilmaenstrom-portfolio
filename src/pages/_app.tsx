import Burger from '@/app/components/Burger';
import Menu from '@/app/components/Menu';
import RootLayout from '@/app/layout';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { Session } from 'next-auth';

export const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });
export const playfair_display = Playfair_Display({ subsets: ['latin'], display: 'swap' });

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: {
    session: Session;
  };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RootLayout>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
        h1,
        h2,
        h3 {
          font-family: ${playfair_display.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <div>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </RootLayout>
  );
}

export default MyApp;
