import styled from "styled-components";

// Film Card
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
  margin-bottom: 10px;
  margin-right: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
  width: 250px;
`;

// Film Poster
export const StyledMovieImage = styled.div`
  display: flex;
  border-radius: 20px;
  height: 100%;
  justify-content: center;
  margin-bottom: 10px;
  width: auto;
`;

// Film Titel
export const StyledMovieTitle = styled.div`
  color: #ffb833;
  display: flex;
  font-size: 18px;
  justify-content: center;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

// Film Liste
export const MovieCardsList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-inline: 0px;
`;

// Phasen Card
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
  margin-bottom: 20px;
  overflow-x: auto; // Horizontales Scrollen in der Phasen Card
  padding: 20px;
  padding-bottom: 10px;
  width: 100%;
  .movies-container {
    // CSS-Regel für die Film Cards innerhalb der Phasen Card
    display: flex;
    flex: 1; // Gleichmäßige Verteilung des verfügbaren Platzes
  }
`;

// Phasen Titel
export const StyledPhaseHeadline = styled.div`
  color: #ffb833;
  font-size: 20px;
  margin-right: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transform: rotate(180deg); // Schriftzug wird um 180° gedreht
  writing-mode: vertical-rl; // Schriftzug wird Vertikal dargestellt
`;
