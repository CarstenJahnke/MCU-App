import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    background-color: darkgoldenrod;
    background-image: url("https://images.pexels.com/photos/14734199/pexels-photo-14734199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: auto;
    height: auto;
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
  }
`;
