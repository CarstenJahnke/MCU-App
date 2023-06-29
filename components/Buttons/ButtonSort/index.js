import styled from "styled-components";
import { StyledText } from "../../styling/MovieDetailsStyling";
import { ButtonStyle } from "..";

export const ButtonSortStyle = styled.button`
  ${StyledText}
  ${ButtonStyle}
  background-image: linear-gradient(
    to bottom,
    #5a0000,
    #6b0804,
    #7d1405,
    #8f1f04,
    #a02b00
  );
  border-radius: 20px;
  box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.15);
  margin-bottom: -10px;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
`;

export default ButtonSortStyle;
