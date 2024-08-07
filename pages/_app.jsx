import { ThemeProvider } from 'styled-components'
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
      <ThemeProvider theme={theme}>
        <StateProvider>
          {/* <main> */}
          <Nav />
          <Component {...pageProps} />
          {/* </main> */}
        </StateProvider>
      </ThemeProvider>
    </>
  );
}
