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
    const movieFromTimeline = mcuTimeline.find((m) =>
      movieTitle.includes(m.title.toLowerCase())
    );
    return movieFromTimeline ? `(${movieFromTimeline.year})` : "";
  }
};

// MovieCards-Komponente
const MovieCards = () => {
  // Verwendung von useSWR-Hook zum Abrufen der Daten von der API
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/12179?api_key=${apikey}&language=de`,
    fetcher
  );

  // Zustandsvariablen
  const [sortOption, setSortOption] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]); // Zustand für favorisierte Filme
  const [filteredMoviesByFavourites, setFilteredMoviesByFavourites] = useState(
    []
  );
  const [sortedMovies, setSortedMovies] = useState([]);

  // Effekt-Hook zum Setzen des Ladezustands
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    handleSetSortMovies();
  }, [movies, sortOption]);

  useEffect(() => {
    updateFavouriteMoviesDisplay();
  }, [sortedMovies, showFavorites]);

  if (error) {
    return <StyledText>Daten konnten nicht abgerufen werden.</StyledText>;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!sortedMovies) {
    return <StyledText>Still Loading.</StyledText>;
  }

  // JSX-Elemente der MovieCards-Komponente
  return (
    <>
      {showQuiz ? (
        <Quiz />
      ) : (
        <>
          {/* Button zum Umschalten der Sortieroption */}
          <ButtonGeneralContainer>
            <ButtonGeneralStyle
              onClick={() => {
                setSortOption(sortOption === 1 ? 2 : 1);
              }}
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
            <MoviesByPhases
              sortedMovies={filteredMoviesByFavourites}
              toggleFavoriteMovie={toggleFavoriteMovie}
              updateFavouriteMoviesDisplay={updateFavouriteMoviesDisplay}
            />
          ) : (
            <MoviesByChronologic
              sortedMovies={filteredMoviesByFavourites}
              toggleFavoriteMovie={toggleFavoriteMovie}
              updateFavouriteMoviesDisplay={updateFavouriteMoviesDisplay}
            />
          )}
          <GlobalStyle />
        </>
      )}
    </>
  );

  function updateFavouriteMoviesDisplay() {
    setFilteredMoviesByFavourites(
      (() => {
        if (showFavorites) {
          return sortedMovies.filter((movie) => {
            const movieId = movie.id.toString();
            const favoriteMovies = localStorage
              .getItem("favorites")
              ?.includes(movieId);
            return favoriteMovies;
          });
        } else {
          return sortedMovies;
        }
      })()
    );
  }

  // Funktion zum Umschalten des Quiz anzeigen
  function handleQuizButtonClick() {
    setShowQuiz(true);
  }

  // Funktion zum Hinzufügen/Entfernen von Favoriten
  function toggleFavoriteMovie(movieId) {
    const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];

    if (favorites.includes(movieId)) {
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavoriteMovies((prevFavorites) =>
        prevFavorites.filter((movie) => movie.id !== movieId)
      ); // Entferne den Film aus der favorisierten Filme-Liste
    } else {
      const updatedFavorites = [...favorites, movieId];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      const movie = sortedMovies.find((movie) => movie.id === movieId);
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]); // Füge den Film zur favorisierten Filme-Liste hinzu
    }

    const updatedFavorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];

    setShowFavorites(updatedFavorites.length > 0);
  }

  // Funktion zum Umschalten der Favoritenanzeigen
  function toggleFavorites() {
    setShowFavorites(!showFavorites); // Toggle den Favoritenanzeigen-Status
  }

  function getSortedMoviesByPhase() {
    let filteredMovies;
    // Filtern der Filme basierend auf dem Veröffentlichungsjahr
    if (movies) {
      filteredMovies = movies.filter(
        (movie) => new Date(movie.release_date).getFullYear() >= 2008
      );
    } else {
      filteredMovies = [];
    }

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
    return sortedMoviesByPhase;
  }

  function getSortedMoviesChronologically() {
    // Sortieren der Filme chronologisch
    const sortedMoviesChronological = getSortedMoviesByPhase().sort((a, b) => {
      const movieATitle = a.title;
      const movieBTitle = b.title;

      const movieA = mcuTimeline.find((m) =>
        movieATitle.includes(m.title)
      );
      const movieB = mcuTimeline.find((m) =>
        movieBTitle.includes(m.title)
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

    return sortedMoviesChronological;
  }

  function handleSetSortMovies() {
    setSortedMovies(
      sortOption === 1
        ? getSortedMoviesByPhase()
        : getSortedMoviesChronologically()
    );
  }
};

export default MovieCards;
