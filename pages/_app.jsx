import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

import Nav from '../src/components/Nav';
import { StateProvider } from '../src/providers/store';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <StateProvider>
          <Head>
            <link rel='shawnj icon' href='/images/favicon.ico' />
            {/* <link
              rel='apple-touch-icon'
              sizes='180x180'
              href='/images/icon.ico'
            /> */}
            {/* <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='/images/icon.ico'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='16x16'
              href='/images/icon.ico'
            /> */}
          </Head>
          <Nav />
          <Component {...pageProps} />
        </StateProvider>
      </ChakraProvider>
    </>
  );
}
