import { apikey } from "../../pages/_app";
import { mcuPhases } from "../Phases";
import { mcuTimeline } from "../MCUTimeline";
import { MoviesByPhases } from "../SortByPhases";
import { MoviesByChronologic } from "../SortByChronologic";
import { StyledText } from "../styling/MovieDetailsStyling";
import { ButtonGeneralStyle } from "../Buttons/ButtonGeneralStyle";
import GlobalStyle from "../../styles";
import LoadingScreen from "../LoadingScreen";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { ButtonGeneralContainer } from "../Buttons/ButtonGeneralContainer";
import Quiz from "../Quiz";

// Funktion zum Abrufen der Daten von der API
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

// Funktion zum Abrufen des Jahres eines Films basierend auf der Option (1 für Release-Jahr, 2 für chronologisches Jahr)
export const getMovieYearFromTimeline = (movie, option) => {
  if (option === 1) {
    return `(${new Date(movie.release_date).getFullYear()})`;
  } else {
    const movieTitle = movie.title ? movie.title.toLowerCase() : "";
    const movieFromTimeline = mcuTimeline.find((movie) =>
      movieTitle.includes(movie.title.toLowerCase())
    );
    return movieFromTimeline ? `(${movieFromTimeline.year})` : "";
  }
};

// MovieCards-Komponente
const MovieCards = () => {
  // Verwendung von useSWR-Hook zum Abrufen der Daten von der API
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/8258181?api_key=${apikey}&language=de`,
    fetcher
  );

  // Zustandsvariablen
  const [sortOption, setSortOption] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false); // Zustand zur Speicherung des Favoritenanzeigen-Status
  const [showQuiz, setShowQuiz] = useState(false);

  // Effekt-Hook zum Setzen des Ladezustands
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return <StyledText>Daten konnten nicht abgerufen werden.</StyledText>;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Filtern der Filme basierend auf dem Veröffentlichungsjahr
  const filteredMovies = movies
    ? movies.filter(
        (movie) => new Date(movie.release_date).getFullYear() >= 2008
      )
    : [];

  // Sortieren der Filme nach Phasen
  const sortedMoviesByPhase = [];
  mcuPhases.forEach((phase) => {
    const moviesInPhase = filteredMovies
      .filter((movie) => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear >= phase.startYear && releaseYear <= phase.endYear;
      })
      .sort((a, b) => {
        const releaseYearA = new Date(a.release_date).getFullYear();
        const releaseYearB = new Date(b.release_date).getFullYear();
        return releaseYearA - releaseYearB;
      });

    sortedMoviesByPhase.push(...moviesInPhase);
  });

  // Sortieren der Filme chronologisch
  const sortedMoviesChronological = sortedMoviesByPhase.sort((a, b) => {
    const movieATitle = a.title;
    const movieBTitle = b.title;

    const movieA = mcuTimeline.find((movie) =>
      movieATitle.includes(movie.title)
    );
    const movieB = mcuTimeline.find((movie) =>
      movieBTitle.includes(movie.title)
    );

    if (movieA && movieB) {
      return movieA.year.localeCompare(movieB.year);
    } else if (movieA) {
      return -1;
    } else if (movieB) {
      return 1;
    } else {
      return 0;
    }
  });

  // Sortieren der Filme basierend auf der gewählten Option
  const sortedMovies =
    sortOption === 1 ? sortedMoviesByPhase : sortedMoviesChronological;

  // Funktion zum Umschalten der Favoritenanzeigen
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites); // Toggle den Favoritenanzeigen-Status
  };

  // Funktion zum Umschalten des Quiz anzeigen
  const handleQuizButtonClick = () => {
    setShowQuiz(true);
  };

  if (showQuiz) {
    return <Quiz />;
  }

  // Filtern der Filme basierend auf den Favoriten
  const filteredMoviesByFavorites = showFavorites
    ? sortedMovies.filter((movie) => {
        const movieId = movie.id.toString();
        return localStorage.getItem("favorites")?.includes(movieId);
      })
    : sortedMovies;

  // JSX-Elemente der MovieCards-Komponente
  return (
    <>
      {/* Button zum Umschalten der Sortieroption */}
      <ButtonGeneralContainer>
        <ButtonGeneralStyle
          onClick={() => setSortOption(sortOption === 1 ? 2 : 1)}
        >
          {sortOption === 1 ? "Chronologie" : "Phasen"}
        </ButtonGeneralStyle>
        {/* Button zum Umschalten der Favoritenanzeigen */}
        <ButtonGeneralStyle onClick={toggleFavorites}>
          {showFavorites ? "Alle Filme" : "Favoriten"}
        </ButtonGeneralStyle>
        {/* Button zum Anzeigen des Quiz */}
        <ButtonGeneralStyle onClick={handleQuizButtonClick}>
          Quiz
        </ButtonGeneralStyle>
      </ButtonGeneralContainer>
      {/* Anzeige der Filme basierend auf der Sortieroption */}
      {sortOption === 1 ? (
        <MoviesByPhases sortedMovies={filteredMoviesByFavorites} />
      ) : (
        <MoviesByChronologic sortedMovies={filteredMoviesByFavorites} />
      )}
      <GlobalStyle />
    </>
  );
};

export default MovieCards;
