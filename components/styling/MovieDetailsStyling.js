import styled, { css } from "styled-components";

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
  width: 90%;
  margin-top: -10px;
`;

const StyledText = css`
  color: #ffb833;
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const StyledHeadline = styled.div`
  color: #ffb833;
  font-size: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const StyledMovieCards = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const StyledMovieImageCard = styled.div`
  ${StyledCard}
`;

export const StyledMovieImage = styled.div`
  margin: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImageWidth = 300;
export const StyledImageHeight = 400;

export const StyledMovieDescription = styled.div`
  ${StyledCard}
  ${StyledText}
`;

export const StyledMovieCharacters = styled.ul`
  ${StyledCard}
  ${StyledText}
`;

export const StyledMovieCharactersList = styled.li`
  padding-inline: 0px;
  list-style: none;
`;

export const HeadingStyledContainer = styled.div`
  background-image: linear-gradient(to bottom, #5a0000, #6b0804, #a02b00);
  color: #ffb833;
  font-size: 25px;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-color: #a3700f;
  border-bottom-style: inset;
  border-bottom-width: 5px;
  text-align: center;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
`;

export const StyledMovieReview = styled.ul`
  ${StyledCard}
  ${StyledText}
`;

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
  padding: 10%;
  width: 100%;
  margin-top: -10px;
`;
