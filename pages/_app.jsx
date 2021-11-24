/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import theme from '../theme'
import Nav from '../src/components/nav'
import { StateProvider } from '../src/providers/store';

export default function App({ Component, pageProps }) {
  const mainStyle = {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <ThemeProvider theme={theme}>
      <StateProvider>
        <main style={mainStyle}>
          <Nav />
          <Component {...pageProps} />
        </main>
      </StateProvider>
    </ThemeProvider>
  )
}
