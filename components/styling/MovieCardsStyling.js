import styled from "styled-components";

export const StyledMovieCard = styled.div`
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
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  width: 250px;
`;

export const StyledMovieImage = styled.div`
  border-radius: 20px;
  display: flex;
  width: auto;
  height: 100%;
  justify-content: center;
  margin-bottom: 10px;
`;

export const StyledMovieTitle = styled.div`
  color: #ffb833;
  display: flex;
  font-size: 18px;
  justify-content: center;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const MovieCardsList = styled.ul`
  padding-inline: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
