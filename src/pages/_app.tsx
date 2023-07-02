import Burger from '@/app/components/Burger';
import Menu from '@/app/components/Menu';
import RootLayout from '@/app/layout';
import { useState } from 'react';

import { Montserrat, Playfair_Display } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
export const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });
export const playfair_display = Playfair_Display({ subsets: ['latin'], display: 'swap' });

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RootLayout>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
        h1,
        h2 {
          font-family: ${playfair_display.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <div>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </RootLayout>
  );
}

export default MyApp;
