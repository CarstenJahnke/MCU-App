import styled from "styled-components";
import Heading from "../Heading";

const HeadingStyledContainer = styled.div`
  background-image: linear-gradient(to bottom, #5a0000, #6b0804, #a02b00);
  color: #ffb833;
  font-size: 15px;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-color: #a3700f;
  border-bottom-style: inset;
  border-bottom-width: 5px;
  text-align: center;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
`;

export default function HeadingContainer() {
  return (
    <HeadingStyledContainer>
      <Heading>Marvelous Cinematic Unisearch</Heading>
    </HeadingStyledContainer>
  );
}
