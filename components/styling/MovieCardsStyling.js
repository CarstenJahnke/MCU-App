import OverlayImage from "./check.svg";
import styled, { css } from "styled-components";

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
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
  width: 250px;
  margin-right: 10px; // Abstand zwischen den Filmen
`;

export const StyledMovieImage = styled.div`
  margin: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  // Als gesehen markiert:
  position: relative;
  ${({ isSeen }) =>
    isSeen &&
    css`
      opacity: 0.5;
      filter: grayscale(100%);
      background-image: url(${OverlayImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    `}
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
  margin-top: 20px;
`;

export const StyledPhaseHeadline = styled.div`
  color: #ffb833;
  font-size: 20px;
  margin-right: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-orientation: upright;
  writing-mode: vertical-lr;
`;

export const StyledPhaseCard = styled.div`
  background-image: linear-gradient(
    to bottom,
    #3d0000,
    #4f0603,
    #631104,
    #8f1f04,
    #a02b00
  );
  box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.15);
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  overflow-x: auto; // Horizontales Scrollen

  // CSS-Regel für den Container der Filme innerhalb der Karte
  .movies-container {
    display: flex; // Aktiviert das Flexbox-Layout
    flex: 1; // Gleichmäßige Verteilung des verfügbaren Platzes
  }
`;
