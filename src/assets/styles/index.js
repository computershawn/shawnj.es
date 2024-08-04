import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', Helvetica, Arial, sans-serif;
    background-color: #FDFDFD;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100vh;
  }
`

export default GlobalStyle;
