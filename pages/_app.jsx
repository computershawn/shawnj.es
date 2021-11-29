import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Nav from '../src/components/Nav';
import { StateProvider } from '../src/providers/store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
`

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
          <main>
            <Nav />
            <Component {...pageProps} />
          </main>
        </StateProvider>
      </ThemeProvider>
    </>
  )
}
