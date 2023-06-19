import Burger from '@/app/components/Burger';
import Menu from '@/app/components/Menu';
import RootLayout from '@/app/layout';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RootLayout>
      <Component {...pageProps} />
      <div>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </RootLayout>
  );
}

export default MyApp;
