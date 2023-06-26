import { createGlobalStyle, keyframes } from "styled-components";

const backgroundSlide = keyframes`
  0% {
    background-position: left;
  }
  50% {
    background-position: right;
  }
  100% {
    background-position: left;
  }
`;

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
  }
  body {
    background-color: darkgoldenrod;
    background-image: url("https://images.pexels.com/photos/14734199/pexels-photo-14734199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    width: auto;
    height: auto;
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
    animation: ${backgroundSlide} 15s linear infinite;
  }
`;

export default GlobalStyle;
