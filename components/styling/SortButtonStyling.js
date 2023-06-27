import { StyledText } from "./MovieDetailsStyling";
import styled from "styled-components";

export const StyledButton = styled.button`
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
  max-width: 20%;
  margin: 20px auto 0; /* Hier wird die horizontale Zentrierung mit einem oberen Abstand versehen */
  transition: margin 2.5s ease; /* Übergangseigenschaft für eine sanfte Animation hinzufügen */
`;
