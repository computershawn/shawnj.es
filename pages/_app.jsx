import { ThemeProvider } from 'styled-components'

import { ChakraProvider } from '@chakra-ui/react'

import Nav from '../src/components/Nav';
import GlobalStyle from '../src/assets/styles';
import { StateProvider } from '../src/providers/store';

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <StateProvider>
            <Nav />
            <Component {...pageProps} />
          </StateProvider>
        </ThemeProvider>
      </ChakraProvider>
    </>
  );
}
