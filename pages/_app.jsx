import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Nav from '../src/components/Nav';
import { StateProvider } from '../src/providers/store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', Helvetica, Arial, sans-serif;
  }

  p, h1, h2, h3, h4, h5, h6 {
    line-height: 1.4rem;
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
