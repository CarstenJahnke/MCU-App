import styled, { css } from "styled-components";
// Styling auf der Movie Details Page

// Allgemeines Styling, welches nachfolgend öfter Verwendung findet
const StyledCard = css`
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
  padding: 10%;
  margin-top: -10px;
  width: 90%;
`;

// Allgemeines Text Styling, welches nachfolgend öfter Verwendung findet
const StyledText = css`
  color: #ffb833;
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

// Card Bezeichnungen (Titel der Cards)
export const StyledHeadline = styled.div`
  color: #ffb833;
  font-size: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

// Cards (Anordnung)
export const StyledMovieCards = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// Poster Card
export const StyledMovieImageCard = styled.div`
  ${StyledCard}
`;

// Poster Image
export const StyledMovieImage = styled.div`
  align-items: center;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

// Poster Maße
export const StyledImageWidth = 300;
export const StyledImageHeight = 400;

// Beschreibung
export const StyledMovieDescription = styled.div`
  ${StyledCard}
  ${StyledText}
`;

// Charaktere
export const StyledMovieCharacters = styled.ul`
  ${StyledCard}
  ${StyledText}
`;

// Charaktere (Liste)
export const StyledMovieCharactersList = styled.li`
  list-style: none;
  padding-inline: 0px;
`;

// Film Titel Styling im Header
export const HeadingStyledContainer = styled.div`
  background-image: linear-gradient(to bottom, #5a0000, #6b0804, #a02b00);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-style: inset;
  border-bottom-width: 5px;
  border-color: #a3700f;
  color: #ffb833;
  font-size: 25px;
  padding: 20px;
  text-align: center;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
`;

// Review Styling
export const StyledMovieReview = styled.ul`
  ${StyledCard}
  ${StyledText}
`;

// Zurück-Button Styling
export const StyledButton = styled.button`
  ${StyledText}
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
  margin-top: -10px;
  padding: 10%;
  text-align: center;
  width: 100%;
`;
