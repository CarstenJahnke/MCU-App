import React from "react";
import styled, { keyframes } from "styled-components";

// Lade Animation (von Links nach Rechts fliegend)
const slideAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
`;


const LoadingStyle = styled.div`
  color: #ffb833;
  display: flex;
  font-size: 25px;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${({ isFadeOut }) =>
    isFadeOut ? `${fadeOutAnimation} 0.5s ease-out forwards` : ""};
`;

// Länge der Animation
const LoadingImageWrapper = styled.img`
  animation: ${slideAnimation} 3s linear;
`;

// Lade-Image
const LoadingImage = () => (
  <LoadingImageWrapper
    src={
      "https://s3.getstickerpack.com/storage/uploads/sticker-pack/marvel-studios/sticker_1.gif?b249add709bafe840effeaf012efc785"
    }
    alt={"Loading"}
    width={250}
    height={250}
  />
);

export { LoadingStyle, LoadingImage };
