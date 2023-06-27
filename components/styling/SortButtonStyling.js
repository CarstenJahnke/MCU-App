import styled from "styled-components";
import { StyledText } from "./MovieDetailsStyling";

export const SortButton = styled.button`
  ${StyledText}
  text-align: center;
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
  padding: 10px;
  width: 100%;
  margin-top: 30px;
`;

export default SortButton;
