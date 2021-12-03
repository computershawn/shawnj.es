import { createGlobalStyle } from 'styled-components'

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

export default GlobalStyle;
