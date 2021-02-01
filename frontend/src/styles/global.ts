import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    
    box-sizing: border-box;
  }

  body, html, #root {
    height: 100%;
    background: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Condensed', serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`;
