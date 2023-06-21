import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    background-color: #6b6b6b;
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
  }
`;
