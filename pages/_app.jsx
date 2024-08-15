import { ChakraProvider } from '@chakra-ui/react'

import Nav from '../src/components/Nav';
import { StateProvider } from '../src/providers/store';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <StateProvider>
          <Nav />
          <Component {...pageProps} />
        </StateProvider>
      </ChakraProvider>
    </>
  );
}
