import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Nav from '../src/components/Nav';
import EntriesProvider from '../src/providers/entriesContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <EntriesProvider>
        <Head>
          <link rel='shawnj icon' href='/images/favicon.ico' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/images/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/images/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/images/favicon-16x16.png'
          />
        </Head>
        <Nav />
        <Component {...pageProps} />
      </EntriesProvider>
    </ChakraProvider>
  );
}
