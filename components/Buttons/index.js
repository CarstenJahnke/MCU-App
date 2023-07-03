import styled, { css, keyframes } from "styled-components";

export const Button = styled.div`
  text-align: center;
  display: flex;
  justify-content: flex-start;
`;

const fillAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
`;

export const ButtonStyle = css`
  text-align: center;
  background-image: linear-gradient(
    to bottom,
    #400000,
    #520602,
    #631104,
    #731a03,
    #842400
  );
  border-color: #d68c29;
  border-width: 0.3em;
  border-radius: 20px;
  box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.15);
  width: 100px;
  background: none;
  overflow: hidden;
  transition: background-color 0.3s, transform 0.3s;

  &:active {
    background-color: #d68c29;
    transform: scale(0.9);
    animation: ${fillAnimation} 0.3s linear forwards;
  }
`;
